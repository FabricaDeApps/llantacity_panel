import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewElementComponent } from '../../../add-new-element/add-new-element.component';
import { EncrDecrService } from '../../../clases/EncrDecrService';
import { Admin, Ruteo } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ConstantServiceProvider } from '../../../providers/constant-service/constant-service';
import { UsersService } from '../../../providers/users-service/users.service';

@Component({
  selector: 'app-actions-usuarios',
  templateUrl: './actions-usuarios.component.html',
  styleUrls: ['./actions-usuarios.component.css']
})
export class ActionsUsuariosComponent implements OnInit {
  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;
  formUsuario: FormGroup;
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
    this.formUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(250)]],
      lastName: ['', [Validators.required, Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.maxLength(200)]]
    })
  }

  checkTypeRoute() {
    this.activeRoute.data.subscribe((ruteo: Ruteo) => {
      if (ruteo.ruta == "editar") {
        this.isUpdate = true;
        this.titulo = 'Editar Usuario'
        this.subtitulo = "Aquí puedes editar los datos del usuario."
        this.botonAccion = 'Editar'
        this.hashAdmin = this.activeRoute.snapshot.params['hashAdmin']
        this.disableValidators("password")
        this.getUsuarioById()
      } else {
        if (ruteo.ruta == "nuevo") {
          this.isUpdate == false;
          this.titulo = 'Añadir Usuario'
          this.subtitulo = 'Aquí puedes crear tantos usuarios desees.'
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
    if (!this.formUsuario.valid) {
      return;
    }
    this.loadSpinner()
    var params = {
      name: this.formUsuario.value.name,
      last_name: this.formUsuario.value.lastName,
      email: this.formUsuario.value.email,
      password: this.formUsuario.value.email,
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
          this.formUsuario.controls['name'].setValue(this.usuario.name);
          this.formUsuario.controls['lastName'].setValue(this.usuario.last_name);
          this.formUsuario.controls['email'].setValue(this.usuario.email);
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
    this.formUsuario.reset()
    this.formDirective.resetForm()
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  disableValidators(validators: any) {
    this.formUsuario.get(validators).clearValidators();
    this.formUsuario.get(validators).updateValueAndValidity();
  }

  addValidators(validators: any) {
    this.formUsuario.get(validators).setValidators([Validators.required]);
    this.formUsuario.get(validators).updateValueAndValidity();
  }
}
