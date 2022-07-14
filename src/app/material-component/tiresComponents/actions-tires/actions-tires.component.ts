import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewElementComponent } from '../../../add-new-element/add-new-element.component';
import { Productos, Proveedores, Ruteo } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ProductosService } from '../../../providers/productos-service/productos.service';
import { ProveedoresService } from '../../../providers/proveedores-service/proveedores.service';

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
  sku_producto: any
  producto: Productos
  proveedores: Proveedores[] = []
  //textos
  titulo: string
  subtitulo: string
  botonAccion: string

  isFavorite: boolean = false;

  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private activeRoute: ActivatedRoute, private router: Router,
    private comonAlerts: CommonAlerts,
    private productsService: ProductosService,
    private proveedoresService: ProveedoresService) {
    this.validateFormulario()
  }

  ngOnInit() {
    this.getProveedoresActives()
    this.checkTypeRoute()
  }

  setIsFavorite(ev: any) {
    if (ev == true) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
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
      indiceCarga: ['', [Validators.required, Validators.maxLength(11), Validators.pattern(/^([0-9])*$/)]],
      indiceVel: ['', [Validators.required, Validators.maxLength(200)]],
      aplicacion: ['', [Validators.required, Validators.maxLength(200)]],
      charge: ['', [Validators.maxLength(200)]],
      homologacion: ['', [Validators.maxLength(200)]],
      costo: ['', [Validators.required, Validators.maxLength(10)]],
      existencia: ['', [Validators.required, Validators.maxLength(11), Validators.pattern(/^([0-9])*$/)]],
      idProveedor: ['', [Validators.required]],
      pesoVolumetrico: ['', [Validators.maxLength(200)]],
      temperatura: ['', [Validators.maxLength(200)]],
      traccion: ['', [Validators.maxLength(200)]],
      treadwear: ['', [Validators.maxLength(200)]],
      estilo: ['', [Validators.maxLength(200)]],
      caracteristica: ['', [Validators.maxLength(200)]],
      tipoIdentificacion: ['', [Validators.maxLength(200)]],
      numeroIdentificacion: ['', [Validators.maxLength(11), Validators.pattern(/^([0-9])*$/)]],
      garantiaAnos: ['', [Validators.maxLength(11), Validators.pattern(/^([0-9])*$/)]],
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
        this.titulo = 'Editar Producto'
        this.subtitulo = "Aquí puedes editar los datos del producto."
        this.botonAccion = 'Editar'
        this.sku_producto = this.activeRoute.snapshot.params['sku']
        this.getProductoBySku()
      } else {
        if (ruteo.ruta == "nuevo") {
          this.isUpdate == false;
          this.titulo = 'Añadir Producto'
          this.subtitulo = 'Aquí puedes crear tantos productos desees.'
          this.botonAccion = 'Añadir'
        } else {
          this.goToListProductos()
        }

      }
    }
    );
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


  addOrUpdateProducto() {
    if (!this.formProducto.valid) {
      return;
    }
    this.loadSpinner()
    var params = {
      codigo: this.formProducto.value.codigo,
      categoria: this.formProducto.value.categoria,
      marca: this.formProducto.value.marca,
      ancho: this.formProducto.value.ancho,
      alto: this.formProducto.value.alto,
      rin: this.formProducto.value.rin,
      diseno: this.formProducto.value.diseno,
      clasZR: this.formProducto.value.clasZR,
      indiceCarga: this.formProducto.value.indiceCarga,
      indiceVel: this.formProducto.value.indiceVel,
      aplicacion: this.formProducto.value.aplicacion,
      charge: this.formProducto.value.charge,
      homologacion: this.formProducto.value.homologacion,
      costo: this.formProducto.value.costo,
      existencia: this.formProducto.value.existencia,
      idProveedor: this.formProducto.value.idProveedor,
      pesoVolumetrico: this.formProducto.value.pesoVolumetrico,
      temperatura: this.formProducto.value.temperatura,
      traccion: this.formProducto.value.traccion,
      treadwear: this.formProducto.value.treadwear,
      estilo: this.formProducto.value.estilo,
      caracteristica: this.formProducto.value.caracteristica,
      tipoIdentificacion: this.formProducto.value.tipoIdentificacion,
      numeroIdentificacion: this.formProducto.value.numeroIdentificacion,
      garantiaAnos: this.formProducto.value.garantiaAnos,
      paisEnvio: this.formProducto.value.paisEnvio,
      tipoVehiculo: this.formProducto.value.tipoVehiculo,
      descripcionCorta: this.formProducto.value.descripcionCorta,
      diametroTotal: this.formProducto.value.diametroTotal,
      altoTotal: this.formProducto.value.altoTotal,
      isFavorite: this.isFavorite
    }
    if (this.isUpdate) {
      params["sku"] = this.sku_producto;
      let bodyUpdate = JSON.stringify(params);
      this.productsService.updateProduct(bodyUpdate).subscribe((response: any) => {
        if (response.header.code == 200) {
          this.comonAlerts.showSuccess(response.header.message)
          this.goToListProductos()
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
      this.productsService.addProduct(body).subscribe((response: any) => {
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
    const subtitle = 'Puedes crear más o ver a tus productos.'
    const message = `HAS CREADO UN NUEVO PRODUCTO`;
    const acceptButton = 'Producto'
    const spanAcept = 'Añadir otro'
    const cancellButton = 'Productos'
    const spanCancell = 'Ver'
    const textTooltip = 'Ver Productos'

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
        this.goToListProductos()
      }
    });
  }

  getProductoBySku() {
    this.loadSpinner()
    this.productsService.getProductByHash(this.sku_producto).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.producto = response.data.tire;
          this.formProducto.controls['codigo'].setValue(this.producto.codigo);
          this.formProducto.controls['categoria'].setValue(this.producto.categoria);
          this.formProducto.controls['marca'].setValue(this.producto.marca);
          this.formProducto.controls['ancho'].setValue(this.producto.ancho);
          this.formProducto.controls['alto'].setValue(this.producto.alto);
          this.formProducto.controls['rin'].setValue(this.producto.rin);
          this.formProducto.controls['diseno'].setValue(this.producto.diseno);
          this.formProducto.controls['clasZR'].setValue(this.producto.clasZR);
          this.formProducto.controls['indiceCarga'].setValue(this.producto.indiceCarga);
          this.formProducto.controls['indiceVel'].setValue(this.producto.indiceVel);
          this.formProducto.controls['aplicacion'].setValue(this.producto.aplicacion);
          this.formProducto.controls['charge'].setValue(this.producto.charge);
          this.formProducto.controls['homologacion'].setValue(this.producto.homologacion);
          this.formProducto.controls['costo'].setValue(this.producto.costo);
          this.formProducto.controls['existencia'].setValue(this.producto.existencia);
          this.formProducto.controls['idProveedor'].setValue(this.producto.idProveedor);
          this.formProducto.controls['pesoVolumetrico'].setValue(this.producto.pesoVolumetrico);
          this.formProducto.controls['temperatura'].setValue(this.producto.temperatura);
          this.formProducto.controls['traccion'].setValue(this.producto.traccion);
          this.formProducto.controls['treadwear'].setValue(this.producto.treadwear);
          this.formProducto.controls['estilo'].setValue(this.producto.estilo);
          this.formProducto.controls['caracteristica'].setValue(this.producto.caracteristica);
          this.formProducto.controls['tipoIdentificacion'].setValue(this.producto.tipoIdentificacion);
          this.formProducto.controls['numeroIdentificacion'].setValue(this.producto.numeroIdentificacion);
          this.formProducto.controls['garantiaAnos'].setValue(this.producto.garantiaAnos);
          this.formProducto.controls['paisEnvio'].setValue(this.producto.paisEnvio);
          this.formProducto.controls['tipoVehiculo'].setValue(this.producto.tipoVehiculo);
          this.formProducto.controls['descripcionCorta'].setValue(this.producto.descripcionCorta);
          this.formProducto.controls['diametroTotal'].setValue(this.producto.diametroTotal);
          this.formProducto.controls['altoTotal'].setValue(this.producto.altoTotal);
          if (this.producto.isFavorite == true) {
            this.isFavorite = true;
          } else {
            this.isFavorite = false;
          }
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


  goToListProductos() {
    this.router.navigate(['/productos'])
  }

  resetData() {
    this.isFavorite = false
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
