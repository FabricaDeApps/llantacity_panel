import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewElementComponent } from '../../../add-new-element/add-new-element.component';
import { Proveedores, Ruteo } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ProveedoresService } from '../../../providers/proveedores-service/proveedores.service';

@Component({
  selector: 'app-actions-proveedores',
  templateUrl: './actions-proveedores.component.html',
  styleUrls: ['./actions-proveedores.component.css']
})
export class ActionsProveedoresComponent implements OnInit {
  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;
  formProveedor: FormGroup;
  isLoading: boolean = false;
  isUpdate: boolean = false;
  idProveedor: any
  proveedor: Proveedores
  //textos
  titulo: string
  subtitulo: string
  botonAccion: string

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private activeRoute: ActivatedRoute, private router: Router,
    private comonAlerts: CommonAlerts, private proveedoresService: ProveedoresService) {
    this.validateFormulario()
  }

  ngOnInit() {
    this.checkTypeRoute()
  }

  validateFormulario() {
    this.formProveedor = this.fb.group({
      razonSocial: ['', [Validators.required, Validators.maxLength(200)]],
      nombreComercial: ['', [Validators.required, Validators.maxLength(200)]],
      direccion: ['', [Validators.maxLength(200)]],
      municipio: ['', [Validators.maxLength(200)]],
      estado: ['', [Validators.maxLength(200)]],
      email: ['', [Validators.maxLength(200), Validators.email]],
      paginaWeb: ['', [Validators.maxLength(200)]],
      telefono: ['', [Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]],
      ciudad: ['', [Validators.maxLength(200)]],
      rfc: ['', [Validators.maxLength(200)]],
      contacto: ['', [Validators.maxLength(200)]],
    })
  }

  checkTypeRoute() {
    this.activeRoute.data.subscribe((ruteo: Ruteo) => {
      if (ruteo.ruta == "editar") {
        this.isUpdate = true;
        this.titulo = 'Editar Proveedor'
        this.subtitulo = "Aquí puedes editar los datos del proveedor."
        this.botonAccion = 'Editar'
        this.idProveedor = this.activeRoute.snapshot.params['idProveedor']
        this.getProveedorById()
      } else {
        if (ruteo.ruta == "nuevo") {
          this.isUpdate == false;
          this.titulo = 'Añadir Proveedor'
          this.subtitulo = 'Aquí puedes crear tantos proveedores desees.'
          this.botonAccion = 'Añadir'
        } else {
          this.goToListProveedores()
        }

      }
    }
    );
  }


  addOrUpdateProveedor() {
    if (!this.formProveedor.valid) {
      return;
    }
    this.loadSpinner()
    var params = {
      razonSocial: this.formProveedor.value.razonSocial,
      nombreComercial: this.formProveedor.value.nombreComercial,
      direccion: this.formProveedor.value.direccion,
      municipio: this.formProveedor.value.municipio,
      estado: this.formProveedor.value.estado,
      email: this.formProveedor.value.email,
      paginaWeb: this.formProveedor.value.paginaWeb,
      telefono: this.formProveedor.value.telefono,
      ciudad: this.formProveedor.value.ciudad,
      rfc: this.formProveedor.value.rfc,
      contacto: this.formProveedor.value.contacto
    }
    if (this.isUpdate) {
      params["idProveedor"] = this.idProveedor;
      let bodyUpdate = JSON.stringify(params);
      this.proveedoresService.updateProveedor(bodyUpdate).subscribe((response: any) => {
        if (response.header.code == 200) {
          this.comonAlerts.showSuccess(response.header.message)
          this.goToListProveedores()
        } else {
          this.comonAlerts.showWarnning(response.header.message)
        }
        this.terminateSpinner()
      }, (error) => {
        this.comonAlerts.showToastError(error)
        this.terminateSpinner()
      });
    } else {
      let body = JSON.stringify(params);
      this.proveedoresService.addProveedor(body).subscribe((response: any) => {
        if (response.header.code == 200) {
          this.confirmNewElement();
        } else {
          this.comonAlerts.showWarnning(response.header.message)
        }
        this.terminateSpinner()
      }, (error) => {
        this.comonAlerts.showToastError(error)
        this.terminateSpinner()
      });
    }
  }

  confirmNewElement(): void {
    const subtitle = 'Puedes crear más o ver a tus proveedores.'
    const message = `HAS CREADO UN NUEVO PROVEEDOR`;
    const acceptButton = 'Proveedor'
    const spanAcept = 'Añadir otro'
    const cancellButton = 'Proveedores'
    const spanCancell = 'Ver'
    const textTooltip = 'Ver Proveedores'

    const dialogRef = this.dialog.open(AddNewElementComponent, {
      disableClose: true,
      width: window.innerWidth + 'px', maxHeight: window.innerHeight + 'px',
      panelClass: ['animate__animated', 'animate__fadeInDownBig'],
      data: {
        subtitle: subtitle,
        message: message,
        buttonAccept: acceptButton,
        spanAcept: spanAcept,
        buttonCancell: cancellButton,
        spanCancell: spanCancell,
        textTooltip: textTooltip
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.resetData()
      } else {
        this.goToListProveedores()
      }
    });
  }

  getProveedorById() {
    this.loadSpinner()
    this.proveedoresService.getProveedorById(this.idProveedor).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.proveedor = response.data;
          this.formProveedor.controls['razonSocial'].setValue(this.proveedor.razonSocial);
          this.formProveedor.controls['nombreComercial'].setValue(this.proveedor.nombreComercial);
          this.formProveedor.controls['direccion'].setValue(this.proveedor.direccion);
          this.formProveedor.controls['municipio'].setValue(this.proveedor.municipio);
          this.formProveedor.controls['estado'].setValue(this.proveedor.estado);
          this.formProveedor.controls['email'].setValue(this.proveedor.email);
          this.formProveedor.controls['paginaWeb'].setValue(this.proveedor.paginaWeb);
          this.formProveedor.controls['telefono'].setValue(this.proveedor.telefono);
          this.formProveedor.controls['ciudad'].setValue(this.proveedor.ciudad);
          this.formProveedor.controls['rfc'].setValue(this.proveedor.rfc);
          this.formProveedor.controls['contacto'].setValue(this.proveedor.contacto);
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


  goToListProveedores() {
    this.router.navigate(['/proveedores'])
  }

  resetData() {
    this.formProveedor.reset()
    this.formDirective.resetForm()
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  disableValidators(validators: any) {
    this.formProveedor.get(validators).clearValidators();
    this.formProveedor.get(validators).updateValueAndValidity();
  }

  addValidators(validators: any) {
    this.formProveedor.get(validators).setValidators([Validators.required]);
    this.formProveedor.get(validators).updateValueAndValidity();
  }
}
