import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EncrDecrService } from '../../clases/EncrDecrService';
import { Proveedores } from '../../clases/interfaces';
import { CommonAlerts } from '../../common-alerts';
import { ProveedoresService } from '../../providers/proveedores-service/proveedores.service';
import { TiresService } from '../../providers/tires-service/tires.service';
import { Download } from '../../_helpers/download';
declare var $: any
@Component({
  selector: 'app-tires-excel',
  templateUrl: './tires-excel.component.html',
  styleUrls: ['./tires-excel.component.css']
})
export class TiresExcelComponent implements OnInit {
  isLoading: boolean = false
  isLoadFile: boolean = false
  isSelectProveedor: boolean = false
  download$: Observable<Download>;
  proveedor: Proveedores
  proveedores: Proveedores[] = []
  constructor(private comonAlerts: CommonAlerts,
    private tiresService: TiresService,
    private encrDecrip: EncrDecrService,
    private datePipe: DatePipe,
    private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    $('#logoHeader').attr('src', this.encrDecrip.decriptValue('logo'));
    $('#nameCliente').text(this.encrDecrip.decriptValue('cliente'));
    this.getProveedoresActives()
  }

  getProveedoresActives() {
    this.loadSpinner()
    this.proveedoresService.getAllProveedores().subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.proveedores = response.data
        } else {
          this.comonAlerts.showWarnning(response.header.message)
        }
        this.terminateSpinner()
      }, (error) => {
        this.comonAlerts.showToastError(error)
        this.terminateSpinner()
      }
    )
  }


  selectProveedor(proveedor: Proveedores) {
    this.proveedor = proveedor
    this.isSelectProveedor = true
  }


  onChangeFileInput(): void {
    let file = (<HTMLInputElement>document.getElementById('excel')).files[0];
    $("#fileName").text(file.name);
    this.isLoadFile = true
  }


  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  uploadFile() {
    this.loadSpinner()
    let file = (<HTMLInputElement>document.getElementById('excel')).files[0];
    let formData;
    formData = new FormData();
    if (file != null) {
      formData.append('file', file);
    } else {
      this.comonAlerts.showWarnning("El archivo Excel es requerido...")
      this.terminateSpinner()
      return
    }
    this.tiresService.uploadExcelTires(formData).subscribe((response: any) => {
      if (response.header.code == 200) {
        this.comonAlerts.showSuccess(response.header.message)
        this.resetData()
        this.terminateSpinner()
      } else {
        this.comonAlerts.showWarnningDuration(response.header.message)
        this.resetData()
        this.terminateSpinner()
      }
    }, (error) => {
      this.comonAlerts.showToastError(error)
      this.resetData()
      this.terminateSpinner()
    });
  }

  resetData() {
    this.isLoadFile = false
    $("#excel").val(null);
    $("#fileName").text('Ningún archivo seleccionado.');
  }


  getExcel() {
    this.loadSpinner()
    this.tiresService.getDateActual().subscribe((response: any) => {
      if (response.header.code == 200) {
        this.download$ = this.tiresService.download("LlantaCity_" + this.proveedor.nombreComercial.replace(" ", "") + "_" + response.data.fecha, this.proveedor.idProveedor);
        this.terminateSpinner()
      } else {
        this.comonAlerts.showWarnning(response.header.message)
        this.terminateSpinner()
      }

    }, (error) => {
      this.comonAlerts.showToastError(error)
      this.terminateSpinner()
    });

  }

}
