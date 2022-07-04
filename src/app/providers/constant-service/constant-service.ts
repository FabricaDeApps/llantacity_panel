import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ConstantServiceProvider {
  server = 'https://experco.agency:8081/' + 'api/v1/';
  encript = "experoagency2021panelangular";
  serverImages = "https://experco.agency/ExpercoApi/files/images/"
  urlEncuestas = "https://mimenu.experco.agency/#/habitacion/"
  encriptClient = "expercoagencydevelop2021clientesencriptados";
  constructor() {
    console.log('Hello ConstantServiceProvider Provider');
  }

  getHeadersImage() {
    let httpHeaders = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5pbmlzdHJhZG9yU29mdGNydWQyMDIwOmFkbWluaXN0cmFkb3Jzb2Z0Y3J1ZDUyNzUyMTk5NA==')
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
      .set('Authorization', 'Basic YWRtaW5pbmlzdHJhZG9yU29mdGNydWQyMDIwOmFkbWluaXN0cmFkb3Jzb2Z0Y3J1ZDUyNzUyMTk5NA==')
      .set('Content-Type', 'application/json');
    let options = {
      headers: httpHeaders
    };
    return options;
  }

}