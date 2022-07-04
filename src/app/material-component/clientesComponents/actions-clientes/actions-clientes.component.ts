import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AddNewElementComponent } from '../../../add-new-element/add-new-element.component';
import { Clientes, Ruteo } from '../../../clases/interfaces';
import { CommonAlerts } from '../../../common-alerts';
import { ClientesService } from '../../../providers/clientes-service/clientes.service';
import { ConstantServiceProvider } from '../../../providers/constant-service/constant-service';
import { ElementRef } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-actions-clientes',
  templateUrl: './actions-clientes.component.html',
  styleUrls: ['./actions-clientes.component.css']
})
export class ActionsClientesComponent implements OnInit {
  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;
  formCliente: FormGroup;
  isLoading: boolean = false;
  isUpdate: boolean = false;
  hashClient: any
  //textos
  titulo: string
  subtitulo: string
  botonAccion: string

  base64ImageFile: any;
  imageLogo: string;
  cliente: Clientes
  serverImages: any

  draged: boolean = false;
  latitude: number = 19.4978;
  longitude: number = -99.1269;
  zoom: number = 8;
  address: string = '';
  private geoCoder;
  @ViewChild('search', {static: true}) public searchElementRef: ElementRef;
  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private activeRoute: ActivatedRoute, private router: Router, private comonAlerts: CommonAlerts,
    private clientesService: ClientesService, private constantService: ConstantServiceProvider, private ngZone: NgZone) {
    this.serverImages = constantService.serverImages;
    this.validateFormulario()
  }

  ngOnInit() {
    this.loadPlaces()
    this.checkTypeRoute()
  }

  validateFormulario() {
    this.formCliente = this.fb.group({
      cliente: ['', [Validators.required, Validators.maxLength(200)]],
      name: ['', [Validators.maxLength(200)]],
      lastName: ['', [Validators.maxLength(200)]],
      email: ['', [Validators.maxLength(255), Validators.email]],
      email2: ['', [Validators.maxLength(255), Validators.email]],
      email3: ['', [Validators.maxLength(255), Validators.email]],
      email4: ['', [Validators.maxLength(255), Validators.email]],      
      phone: ['', [Validators.pattern(/^[0-9]*$/), Validators.maxLength(10), Validators.minLength(10)]],
    })
  }

  checkTypeRoute() {
    this.activeRoute.data.subscribe((ruteo: Ruteo) => {
      if (ruteo.ruta == "editar") {
        this.isUpdate = true;
        this.titulo = 'Editar Cliente'
        this.subtitulo = "Aquí puedes editar los datos del cliente."
        this.botonAccion = 'Editar'
        this.hashClient = this.activeRoute.snapshot.params['hash_client']
        this.getClienteById()
        this.zoom = 17;
      } else {
        if (ruteo.ruta == "nuevo") {
          this.isUpdate == false;
          this.titulo = 'Añadir Cliente'
          this.subtitulo = 'Aquí puedes crear tantos clientes como desees.'
          this.botonAccion = 'Añadir'
          this.zoom = 8;
        } else {
          this.goToListClientes()
        }

      }
    }
    );
  }

  onUpdateFileChange(event: any) {
    let file = (<HTMLInputElement>document.getElementById('imageUpload')).files[0];
    let that = this;
    if (file != null) {
      var t = file.type.split('/')[0].toLowerCase();
      if (t != "image") {
        that.comonAlerts.showToastError('Por favor seleccione un archivo de imagen válido');
        $("#imageUpload").val('');
        this.terminateSpinner()
        return;
      }
    }
    if (this.isUpdate) {
      if (file == null) {
        this.comonAlerts.showWarnning("Adjunta un logotipo.")
        return;
      }
      let formData;
      formData = new FormData();
      formData.append('file', file);
      this.clientesService.updateLogotipo(this.hashClient, formData).subscribe((response: any) => {
        if (response.header.code == 200) {
          this.comonAlerts.showSuccess(response.header.message)
          this.getClienteById()
        } else {
          this.comonAlerts.showWarnning(response.header.message)
        }
        this.terminateSpinner()
      }, (error) => {
        this.comonAlerts.showToastError(error)
        this.terminateSpinner()
      });
    } else {
      var promise = this.encodeImagetoBase64(file);
      let toArray = file.name.split(".");
      //let that = this;
      promise.then(function (result) {
        that.imageLogo = "data:image/" + toArray[1] + ";base64," + result.toString().split(',')[1]
      });

    }
  }

  encodeImagetoBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }


  addOrUpdateCliente() {
    if (!this.formCliente.valid) {
      return;
    }
    if(!this.isUpdate){
      if(this.draged == false){
        this.comonAlerts.showWarnning("Mueve el pin rojo para definir exactamente tu ubicación");
        return;
      }
    }
    let file = (<HTMLInputElement>document.getElementById('imageUpload')).files[0];
    if (file == null && !this.isUpdate) {
      this.comonAlerts.showWarnning("El logotipo es requerido.")
      return;
    }
    this.loadSpinner()
    if (this.isUpdate) {
      var params = {
        hash_client: this.hashClient,
        client: this.formCliente.value.cliente,
        name: this.formCliente.value.name,
        lastName: this.formCliente.value.lastName,
        email: this.formCliente.value.email,
        email2: this.formCliente.value.email2,
        email3: this.formCliente.value.email3,
        email4: this.formCliente.value.email4,
        phone: this.formCliente.value.phone,
        latitude: this.latitude,
        longitude: this.longitude
      }
      let bodyUpdate = JSON.stringify(params);
      this.clientesService.updateCliente(bodyUpdate).subscribe((response: any) => {
        if (response.header.code == 200) {
          this.comonAlerts.showSuccess(response.header.message)
          this.goToListClientes()
        } else {
          this.comonAlerts.showWarnning(response.header.message)
        }
        this.terminateSpinner()
      }, (error) => {
        this.comonAlerts.showToastError(error)
        this.terminateSpinner()
      });
    } else {
      let formData;
      formData = new FormData();
      formData.append('file', file);
      formData.append('name', this.formCliente.value.name)
      formData.append('lastName', this.formCliente.value.lastName)
      formData.append('email', this.formCliente.value.email),
      formData.append('email2', this.formCliente.value.email2),
      formData.append('email3', this.formCliente.value.email3),
      formData.append('email4', this.formCliente.value.email4),
      formData.append('phone', this.formCliente.value.phone)
      formData.append('latitude', this.latitude)
      formData.append('longitude', this.longitude)
      this.clientesService.addCliente(this.formCliente.value.cliente, formData).subscribe((response: any) => {
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
    const subtitle = 'Puedes crear más o ver a tus clientes.'
    const message = `HAS CREADO UN NUEVO CLIENTE`;
    const acceptButton = 'Cliente'
    const spanAcept = 'Añadir otro'
    const cancellButton = 'Clientes'
    const spanCancell = 'Ver'
    const textTooltip = 'Ver Clientes'

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
        this.goToListClientes()
      }
    });
  }

  getClienteById() {
    this.loadSpinner()
    this.clientesService.getClientById(this.hashClient).subscribe(
      (response) => {
        if (response.header.code == 200) {
          this.cliente = response.data;
          var nocache = new Date().getTime();          
          this.imageLogo = this.serverImages + this.hashClient + "/" + this.cliente.logo + '?' + nocache;
          this.formCliente.controls['cliente'].setValue(this.cliente.client);
          this.formCliente.controls['name'].setValue(this.cliente.name)
          this.formCliente.controls['lastName'].setValue(this.cliente.lastName)
          this.formCliente.controls['email'].setValue(this.cliente.email)
          this.formCliente.controls['email2'].setValue(this.cliente.email2)
          this.formCliente.controls['email3'].setValue(this.cliente.email3)
          this.formCliente.controls['email4'].setValue(this.cliente.email4)
          this.formCliente.controls['phone'].setValue(this.cliente.phone)  
          this.latitude = Number(this.cliente.latitude)
          this.longitude = Number(this.cliente.longitude)
          var that = this
          setTimeout(function(){
            that.getAddress(Number(that.cliente.latitude), Number(that.cliente.longitude));
          },500);          
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


  goToListClientes() {
    this.router.navigate(['/clientes'])
  }

  resetData() {
    $("#imageUpload").val('');
    this.imageLogo = ""
    this.formCliente.reset()
    this.formDirective.resetForm()
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  loadPlaces() {
    this.loadSpinner()
    //load Places Autocomplete
    /* this.mapsAPILoader.load().then(async () => {
      this.geoCoder = new google.maps.Geocoder;
  
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 17;
          this.getAddress(this.latitude, this.longitude)
        });
      });
    }); */
    var that = this
    setTimeout(function(){
      that.terminateSpinner()      
    },1000);
  }

  getAddress(latitude, longitude) {    
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          console.warn('No results found')
        }
      } else {
        console.warn('Geocoder failed due to: ' + status)
      }
    });
  }

  markerDragEnd($event: MouseEvent) {
    this.draged = true;
    /* this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng; */
    this.getAddress(this.latitude, this.longitude);
  }


  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  disableValidators(validators: any) {
    this.formCliente.get(validators).clearValidators();
    this.formCliente.get(validators).updateValueAndValidity();
  }

  addValidators(validators: any) {
    this.formCliente.get(validators).setValidators([Validators.required]);
    this.formCliente.get(validators).updateValueAndValidity();
  }
}
