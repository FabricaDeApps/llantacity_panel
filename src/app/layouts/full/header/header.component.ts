import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { EncrDecrService } from '../../../clases/EncrDecrService';
import { ConstantServiceProvider } from '../../../providers/constant-service/constant-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent implements OnInit{
  version : string = ''
  constructor(public cookieService: CookieService,  private router: Router, private EncrDecr: EncrDecrService,
  private ConstantService: ConstantServiceProvider) {          
   
  }
  ngOnInit(): void {
   
  }
  
  goToProfile(){
    this.router.navigate(['profile'])
  }

  decriptValue(value: any) {
    var decrypted = this.EncrDecr.get(this.ConstantService.encript, this.cookieService.get(value).toString());
    return decrypted.toString();
  }


  cerrarSesion(){
    this.router.navigate(['login'])
  }
}
