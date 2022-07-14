import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewElementComponent } from '../../../add-new-element/add-new-element.component';
import { EncrDecrService } from '../../../clases/EncrDecrService';
import { Admin, Ruteo } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ConstantServiceProvider } from '../../../providers/constant-service/constant-service';
import { UsersService } from '../../../providers/users-service/users.service';

@Component({
  selector: 'app-actions-tires',
  templateUrl: './actions-tires.component.html',
  styleUrls: ['./actions-tires.component.css']
})
export class ActionsTiresComponent implements OnInit {
  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;
  formProducto: FormGroup;
  isLoading: boolean = false;
  isUpdate: boolean = false;
  hashAdmin: any
  usuario: Admin
  //textos
  titulo: string
  subtitulo: string
  botonAccion: string

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private activeRoute: ActivatedRoute, private router: Router,
    private comonAlerts: CommonAlerts, private encrDecript: EncrDecrService, private usersService: UsersService,
    private constantService: ConstantServiceProvider) {
    this.validateFormulario()
  }

  ngOnInit() {
    this.checkTypeRoute()
  }

  validateFormulario() {
    this.formProducto = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(200)]],
      categoria: ['', [Validators.required, Validators.maxLength(200)]],
      marca: ['', [Validators.required, Validators.maxLength(200)]],
      ancho: ['', [Validators.required, Validators.maxLength(200)]],
      alto: ['', [Validators.required, Validators.maxLength(200)]],
      rin: ['', [Validators.required, Validators.maxLength(200)]],
      diseno: ['', [Validators.required, Validators.maxLength(200)]],
      clasZR: ['', [Validators.maxLength(200)]],
      indiceCarga: ['', [Validators.required, Validators.maxLength(11)]],
      indiceVel: ['', [Validators.required, Validators.maxLength(200)]],
      aplicacion: ['', [Validators.required, Validators.maxLength(200)]],
      charge: ['', [Validators.maxLength(200)]],
      homologacion: ['', [Validators.maxLength(200)]],
      costo: ['', [Validators.required, Validators.maxLength(10)]],
      existencia: ['', [Validators.required, Validators.maxLength(11)]],
      idProveedor: ['', [Validators.required]],
      pesoVolumetrico: ['', [Validators.maxLength(200)]],
      temperatura: ['', [Validators.maxLength(200)]],
      traccion: ['', [Validators.maxLength(200)]],
      treadwear: ['', [Validators.maxLength(200)]],
      estilo: ['', [Validators.maxLength(200)]],
      caracteristica: ['', [Validators.maxLength(200)]],
      tipoIdentificacion: ['', [Validators.maxLength(200)]],
      numeroIdentificacion: ['', [Validators.maxLength(11)]],
      garantiaAnos: ['', [Validators.maxLength(11)]],
      paisEnvio: ['', [Validators.maxLength(200)]],
      tipoVehiculo: ['', [Validators.maxLength(200)]],
      descripcionCorta: ['', [Validators.maxLength(600)]],
      diametroTotal: ['', [Validators.maxLength(200)]],
      altoTotal: ['', [Validators.maxLength(200)]],
      isFavorite: [false],
    })
  }

  checkTypeRoute() {
    this.activeRoute.data.subscribe((ruteo: Ruteo) => {
      if (ruteo.ruta == "editar") {
        this.isUpdate = true;
        this.titulo = 'Editar Productos'
        this.subtitulo = "Aquí puedes editar los datos del producto."
        this.botonAccion = 'Editar'
        this.hashAdmin = this.activeRoute.snapshot.params['hashAdmin']
        this.disableValidators("password")
        this.getUsuarioById()
      } else {
        if (ruteo.ruta == "nuevo") {
          this.isUpdate == false;
          this.titulo = 'Añadir Producto'
          this.subtitulo = 'Aquí puedes crear tantos productos desees.'
          this.botonAccion = 'Añadir'
          this.addValidators("password")
        } else {
          this.goToListUsuarios()
        }

      }
    }
    );
  }


  addOrUpdateUsuario() {
    if (!this.formProducto.valid) {
      return;
    }
    this.loadSpinner()
    var params = {
      name: this.formProducto.value.name,
      last_name: this.formProducto.value.lastName,
      email: this.formProducto.value.email,
      password: this.formProducto.value.email,
      type: 'Admin'
    }
    if (this.isUpdate) {
      delete params['password'];
      params["hash_admin"] = this.hashAdmin;
      let bodyUpdate = JSON.stringify(params);
      this.usersService.updateAdmin(bodyUpdate).subscribe((response: any) => {
        if (response.header.code == 200) {
          this.comonAlerts.showSuccess(response.header.message)
          this.goToListUsuarios()
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
      this.usersService.addAdmin(body).subscribe((response: any) => {
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
    const subtitle = 'Puedes crear más o ver a tus usuarios.'
    const message = `HAS CREADO UN NUEVO USUARIO`;
    const acceptButton = 'Usuario'
    const spanAcept = 'Añadir otro'
    const cancellButton = 'Usuarios'
    const spanCancell = 'Ver'
    const textTooltip = 'Ver Usuarios'

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
        this.goToListUsuarios()
      }
    });
  }

  getUsuarioById() {
    this.loadSpinner()
    this.usersService.findAdminByHash(this.hashAdmin).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.usuario = response.data[0];
          this.formProducto.controls['name'].setValue(this.usuario.name);
          this.formProducto.controls['lastName'].setValue(this.usuario.last_name);
          this.formProducto.controls['email'].setValue(this.usuario.email);
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


  goToListUsuarios() {
    this.router.navigate(['/usuarios'])
  }

  resetData() {
    this.formProducto.reset()
    this.formDirective.resetForm()
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  disableValidators(validators: any) {
    this.formProducto.get(validators).clearValidators();
    this.formProducto.get(validators).updateValueAndValidity();
  }

  addValidators(validators: any) {
    this.formProducto.get(validators).setValidators([Validators.required]);
    this.formProducto.get(validators).updateValueAndValidity();
  }
}
