import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Admin, Productos } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { ProductosService } from '../../../providers/productos-service/productos.service';

@Component({
  selector: 'app-tires',
  templateUrl: './tires.component.html',
  styleUrls: ['./tires.component.css']
})
export class TiresComponent implements OnInit {
  isLoading: boolean = false;
  isLoaded: boolean = false;
  productos: Productos[] = []

  limit: number = 10;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 20];

  public displayedColumns = ['key', 'marca', 'proporcion', 'existencia', 'action'];
  constructor(private common: CommonAlerts, private productosService: ProductosService, private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllProductos(1, this.limit)
  }

  goToEditProduct(element: Productos) {
    this.router.navigate(['/productos/editar/' + element.idTire + "-" + element.keyLlantacity])
  }

  getAllProductos(page: any, maxResults: any) {
    var param = {
      page: page,
      limit: maxResults
    }
    let body = JSON.stringify(param);
    this.loadSpinner()
    this.productosService.getAllProducts(body).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.totalLength = response.data.pagination.total;
          this.productos = response.data.tires
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
    this.productos = []
  }

  dialogChangeStatus(event: any, producto: Productos): void {
    const title = producto.keyLlantacity
    const message = `¿Estas seguro de cambiar el estatus del producto?`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '500px',
      panelClass: ['animate__animated', 'animate__fadeInDownBig'],
      data: {
        tittle: title,
        subtitle: producto.marca + " " + producto.ancho + " / " + producto.alto + " / R" + producto.rin,
        message: message
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.updateStatusProducto(producto.idTire + "-" + producto.keyLlantacity, event.checked)
      } else {
        this.getAllProductos(this.pageIndex + 1, this.limit)
      }
    });
  }

  updateStatusProducto(sku: any, checked: boolean) {
    this.loadSpinner()
    var params = {
      sku: sku,
      active: checked
    }
    let body = JSON.stringify(params);
     this.productosService.changeStatus(body).subscribe(
       (response) => {
         if (response.header.code == 200) {
           this.common.showSuccess(response.header.message)
         } else {
           this.common.showWarnning(response.header.message)
         }
         this.getAllProductos(this.pageIndex + 1, this.limit)
         this.terminateSpinner()
       }, (error) => {
         this.common.showToastError(error)
         this.terminateSpinner()
       }
     )
  }

  changePage(event: any) {
    this.getAllProductos(event.pageIndex + 1, event.pageSize);
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
