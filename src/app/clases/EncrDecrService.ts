import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ConstantServiceProvider } from '../providers/constant-service/constant-service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {
  constructor(private apiConf: ConstantServiceProvider, private cookieService: CookieService) { }
 
  //The set method is use for encrypt the value.
  set(keys, value){
    return CryptoJS.AES.encrypt(value, keys);
  }

  //The get method is use for decrypt the value.
  get(keys, value){
    var decrypted = CryptoJS.AES.decrypt(value, keys);
    return decrypted.toString(CryptoJS.enc.Utf8);    
  }

  decriptValue(key: any) {
    var decrypted = this.get(this.apiConf.encript, this.cookieService.get(key).toString());
    return decrypted.toString();
  }
}