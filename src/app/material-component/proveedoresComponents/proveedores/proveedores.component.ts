import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Admin, Proveedores } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { ProveedoresService } from '../../../providers/proveedores-service/proveedores.service';
import { MustMatch } from '../../../_helpers/must-match.validator';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  isLoading: boolean = false;
  isLoaded: boolean = false;
  proveedores: Proveedores[] = []

  limit: number = 10;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 20];
  passForm: FormGroup;
  hashAdmin: any
  emailAdmin: any
  public displayedColumns = ['name', 'razon', 'action'];
  constructor(private common: CommonAlerts, private proveedoresService: ProveedoresService, private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) {
    this.passForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  ngOnInit() {
    this.getAllProveedores(1, this.limit)
  }

  goToEditProveedor(idProveedor: any) {
    this.router.navigate(['/proveedores/editar/' + idProveedor])
  }

  openDialogChangePass(user: Admin, templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      disableClose: true,
      width: '800px',
      panelClass: ['animate__animated', 'animate__fadeInDownBig']
    });
    this.hashAdmin = user.hash_admin
    this.emailAdmin = user.email
    this.passForm.reset();
  }

  getAllProveedores(page: any, maxResults: any) {
    var param = {
      page: page,
      limit: maxResults
    }
    let body = JSON.stringify(param);
    this.loadSpinner()
    this.proveedoresService.getAllProveedoresPagination(body).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.totalLength = response.data.pagination.total;
          this.proveedores = response.data.proveedores          
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
    this.proveedores = []
  }


  openDialogDelete(element: Proveedores): void {
    const title = element.nombreComercial
    const message = `¿Estás seguro de eliminar el proveedor?`;

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
        this.deleteProveedor(element.idProveedor)
      }
    });
  }

  deleteProveedor(idProveedor: any) {
    this.loadSpinner()
    this.proveedoresService.deleteProveedor(idProveedor).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.common.showSuccess(response.header.message)
          this.getAllProveedores(this.pageIndex + 1, this.limit)
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

  dialogChangeStatus(event: any, proveedor: Proveedores): void {
    const title = proveedor.nombreComercial
    const message = `¿Estas seguro de cambiar el estatus del proveedor?`;

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
        this.updateStatusProveedor(proveedor.idProveedor, event.checked)
      } else {
        this.getAllProveedores(this.pageIndex + 1, this.limit)
      }
    });
  }

  updateStatusProveedor(idProveedor: any, checked: boolean) {
    this.loadSpinner()
    var params = {
      idProveedor: idProveedor,
      active: checked
    }
    let body = JSON.stringify(params);
    this.proveedoresService.changeStatus(body).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.common.showSuccess(response.header.message)
        } else {
          this.common.showWarnning(response.header.message)
        }
        this.getAllProveedores(this.pageIndex + 1, this.limit)
        this.terminateSpinner()
      }, (error) => {
        this.common.showToastError(error)
        this.terminateSpinner()
      }
    )
  }

  changePage(event: any) {
    this.getAllProveedores(event.pageIndex + 1, event.pageSize);
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
