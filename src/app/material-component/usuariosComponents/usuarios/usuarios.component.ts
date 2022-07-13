import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EncrDecrService } from '../../../clases/EncrDecrService';
import { Admin } from '../../../clases/interfaces';
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
  usuarios: Admin[] = []

  limit: number = 10;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 20];

  public displayedColumns = ['email', 'usuario', 'rol', 'action'];
  constructor(private common: CommonAlerts, private userService: UsersService, private router: Router,
    private constantService: ConstantServiceProvider,
    private encrDecript: EncrDecrService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllAdmins(1, this.limit)
  }

  goToEditUser(hashAdmin: any) {
    this.router.navigate(['/usuarios/editar/' + hashAdmin])
  }

  getAllAdmins(page: any, maxResults: any) {
    var param = {
      page: page,
      limit: maxResults
    }
    let body = JSON.stringify(param);
    this.loadSpinner()
    this.userService.getAllAdmins(body).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.totalLength = response.data.pagination.total;
          this.usuarios = response.data.users
          this.isLoaded = true;
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

  openDialogDelete(element: Admin): void {
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
        this.deleteAdmin(element.hash_admin)
      }
    });
  }

  deleteAdmin(hashAdmin: any) {
    this.loadSpinner()
    this.userService.deleteAdmin(hashAdmin).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.common.showSuccess(response.header.message)
          this.getAllAdmins(this.pageIndex + 1, this.limit)
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

  dialogChangeStatusUsuario(event: any, usuario: Admin): void {
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
        this.updateStatusUsuario(usuario.hash_admin, event.checked)
      } else {
        this.getAllAdmins(this.pageIndex + 1, this.limit)
      }
    });
  }

  updateStatusUsuario(hashUser: any, checked: boolean) {
    this.loadSpinner()
    var params = {
      hash_admin: hashUser,
      active: checked
    }
    let body = JSON.stringify(params);
    this.userService.changeStatus(body).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.common.showSuccess(response.header.message)
        } else {
          this.common.showWarnning(response.header.message)
        }
        this.getAllAdmins(this.pageIndex + 1, this.limit)
        this.terminateSpinner()
      }, (error) => {
        this.common.showToastError(error)
        this.terminateSpinner()
      }
    )
  }

  changePage(event: any) {
    this.getAllAdmins(event.pageIndex + 1, event.pageSize);
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
  }


  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

}
