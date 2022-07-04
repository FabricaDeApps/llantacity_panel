import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EncrDecrService } from '../../../clases/EncrDecrService';
import { Clientes, Users } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { ConstantServiceProvider } from '../../../providers/constant-service/constant-service';
import { UsersService } from '../../../providers/users-service/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  isLoading: boolean = false;
  isLoaded: boolean = false;
  clientes: Clientes[] = []
  isLoadedCliente: boolean = false;
  usuarios: Users[] = []
  hashClient: any = ''
  idClient: any = ''
  nameClient: any


  public displayedColumns = ['email', 'usuario', 'rol', 'action'];
  constructor(private common: CommonAlerts, private userService: UsersService, private router: Router,
    private constantService: ConstantServiceProvider,
    private encrDecript: EncrDecrService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    if (this.encrDecript.decriptValue('idClient') !== this.constantService.encriptClient) {
      this.loadSpinner()
      this.hashClient = this.encrDecript.decriptValue('hashClient');
      this.idClient = this.encrDecript.decriptValue('idClient');
      this.nameClient = this.encrDecript.decriptValue('nameClient');
      this.getAllUsersByIdClient(this.idClient)
    }
  }

  goToEditUser(hashAdmin: any) {
    this.router.navigate(['/usuarios/editar/' + hashAdmin])
  }

  getAllUsersByIdClient(idClient: any) {
    this.loadSpinner()
    this.userService.getAllUsersByIdClient(idClient).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.isLoaded = true;
          this.usuarios = response.data
        } else {
          this.common.showWarnning(response.header.message)
        }
      }, (error) => {
        this.common.showToastError(error)
      });
    this.terminateSpinner()
  }

  cleanData() {
    this.isLoaded = false;
    this.usuarios = []
  }

  openDialogDelete(element: Users): void {
    const title = element.email
    const message = `¿Estás seguro de eliminar el usuario?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      panelClass: ['animate__animated', 'animate__fadeInDownBig'],
      data: {
        tittle: title,
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.deleteUsuario(element.hashAdmin)
      }
    });
  }

  deleteUsuario(hashUser: any) {
    this.loadSpinner()
    this.userService.deleteUser(hashUser).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.common.showSuccess(response.header.message)
          this.getAllUsersByIdClient(this.idClient)
        } else {
          this.common.showWarnning(response.header.message)
        }
        this.terminateSpinner()
      }, (error) => {
        this.common.showToastError(error)
        this.terminateSpinner()
      }
    )
  }

  dialogChangeStatusUsuario(event: any, usuario: Users): void {
    const title = usuario.email
    const message = `¿Estas seguro de cambiar el estatus del usuario?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '500px',
      panelClass: ['animate__animated', 'animate__fadeInDownBig'],
      data: {
        tittle: title,
        message: message
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.updateStatusUsuario(usuario.hashAdmin, event.checked)
      } else {
        this.getAllUsersByIdClient(this.idClient)
      }
    });
  }

  updateStatusUsuario(hashUser: any, checked: boolean) {
    this.loadSpinner()
    var params = {
      hash: hashUser,
      status: checked
    }
    let body = JSON.stringify(params);
    this.userService.updateStatus(body).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.common.showSuccess(response.header.message)
          this.getAllUsersByIdClient(this.idClient)
        } else {
          this.common.showWarnning(response.header.message)
          this.getAllUsersByIdClient(this.idClient)
        }
        this.terminateSpinner()
      }, (error) => {
        this.common.showToastError(error)
        this.terminateSpinner()
      }
    )
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

}
