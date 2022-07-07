import { Component, OnInit } from '@angular/core';
import { CommonAlerts } from '../../common-alerts';
import { TiresService } from '../../providers/tires-service/tires.service';
declare var $: any
@Component({
  selector: 'app-tires-excel',
  templateUrl: './tires-excel.component.html',
  styleUrls: ['./tires-excel.component.css']
})
export class TiresExcelComponent implements OnInit {
  isLoading: boolean = false
  isLoadFile: boolean = false
  constructor(private comonAlerts: CommonAlerts, private tiresService: TiresService) { }

  ngOnInit() {
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
        this.comonAlerts.showWarnning(response.header.message)
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
}
