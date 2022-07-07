import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ConstantServiceProvider {
  server = 'https://llantacity.mx:8083/' + 'api/v1/';
  encript = "llantacitypanelangular2022";
  serverImages = "https://experco.agency/ExpercoApi/files/images/"
  urlEncuestas = "https://mimenu.experco.agency/#/habitacion/"
  encriptClient = "expercoagencydevelop2021clientesencriptados";  
  constructor() {
    console.log('Hello ConstantServiceProvider Provider');
  }

  getHeadersImage() {
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Basic TExBTlRBQ0lUWURFVkVMT1BNRU5UMjAyMkBGQUIjQVAyMjpMTEFOVEFDSVRZREVWRUxPUE1FTlQyMDIyQEZBQiNBUDIyTDgyU0FMM1hT')
      .set('Access-Control-Allow-Origin', '*');
    let options = {
      headers: httpHeaders
    };
    return options;
  }

  getHeadersNew() {
    let httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', 'Basic TExBTlRBQ0lUWURFVkVMT1BNRU5UMjAyMkBGQUIjQVAyMjpMTEFOVEFDSVRZREVWRUxPUE1FTlQyMDIyQEZBQiNBUDIyTDgyU0FMM1hT')
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return options;
  }

}