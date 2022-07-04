import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from '../../../clases/EncrDecrService';
import { Clientes } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { ClientesService } from '../../../providers/clientes-service/clientes.service';
import { ConstantServiceProvider } from '../../../providers/constant-service/constant-service';
declare var $: any

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  instructores: any[] = []
  isLoading: boolean = false;
  isLoaded: boolean = false;
  clientes: Clientes[] = []
  serverImages: any

  public displayedColumns = ['image', 'name', 'global', 'action'];
  constructor(private common: CommonAlerts, private clientesService: ClientesService, private encrDecrip: EncrDecrService,
    public dialog: MatDialog, private constantService: ConstantServiceProvider,
    private cookieService: CookieService) {
    this.serverImages = constantService.serverImages
  }

  ngOnInit() {
    $('#logoHeader').attr('src', this.encrDecrip.decriptValue('logo'));
    $('#nameCliente').text(this.encrDecrip.decriptValue('cliente'));
    this.getAllClientes()
  }

  getAllClientes() {
    this.loadSpinner()
    this.clientesService.getAllClientes().subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.clientes = response.data;
          this.isLoaded = true;
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


  checkClientGlobal(cliente: Clientes) {
    if (this.encrDecrip.decriptValue('idClient') == cliente.idClient) {
      return true;
    } else {
      return false;
    }
  }

  setearClienteGlobal(cliente: Clientes) {
    this.loadSpinner()
    this.cookieService.set("idClient", this.encrDecrip.set(this.constantService.encript, cliente.idClient.toString()));
    this.cookieService.set("hashClient", this.encrDecrip.set(this.constantService.encript, cliente.hash_client.toString()));
    this.cookieService.set("nameClient", this.encrDecrip.set(this.constantService.encript, cliente.client.toString()));
    this.common.showSuccess("Se selecciono como global el cliente.")
    this.terminateSpinner()
  }


  openDialogGlobalClient(cliente: Clientes): void {
    const title = cliente.client
    const message = `¿Estas seguro de seleccionar como global el cliente?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      panelClass: ['animate__animated', 'animate__slideInUp'],
      data: {
        tittle: title,
        message: message
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.setearClienteGlobal(cliente)
      } else {
        this.getAllClientes()
      }
    });
  }


  openDialogDelete(element: Clientes): void {
    const title = element.client
    const message = `¿Estás seguro de eliminar el cliente?`;

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
        var evaluationLocal = this.encrDecrip.decriptValue('idClient')
        if (evaluationLocal == element.idClient) {
          this.cookieService.set("idClient", this.encrDecrip.set(this.constantService.encript, this.constantService.encriptClient));
          this.cookieService.set("hashClient", this.encrDecrip.set(this.constantService.encript, this.constantService.encriptClient));
          this.cookieService.delete('nameClient')
        }
        this.deleteCliente(element.hash_client)
      }
    });
  }

  deleteCliente(hash_client: any) {
    this.loadSpinner()
    this.clientesService.deleteClient(hash_client).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.common.showSuccess(response.header.message)
          this.getAllClientes()
        } else {
          this.common.showWarnning(response.header.message)
          this.getAllClientes()
        }
        this.terminateSpinner()
      }, (error) => {
        this.common.showToastError(error)
        this.terminateSpinner()
      }
    )
  }

  dialogChangeStatusCliente(event: any, cliente: Clientes): void {
    const title = cliente.client
    const message = `¿Estas seguro de cambiar el estatus del cliente?`;

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
        this.updateStatusCliente(cliente.hash_client, event.checked)
      } else {
        this.getAllClientes()
      }
    });
  }

  updateStatusCliente(hash_client: any, checked: boolean) {
    this.loadSpinner()
    var params = {
      hash_client: hash_client,
      status: checked
    }
    let body = JSON.stringify(params);
    this.clientesService.changeStatus(body).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.common.showSuccess(response.header.message)
          this.getAllClientes()
        } else {
          this.common.showWarnning(response.header.message)
          this.getAllClientes()
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
