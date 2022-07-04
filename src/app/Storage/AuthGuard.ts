import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from '../clases/EncrDecrService';
import { ConstantServiceProvider } from '../providers/constant-service/constant-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService,
    private EncrDecr: EncrDecrService, private apiConf: ConstantServiceProvider) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var decrypted = this.decriptValue('rol');
    const currentUser = decrypted;
    // check if route is restricted by role
    if (!this.cookieService.check('isLogin') || (route.data.expectedRol && route.data.expectedRol.indexOf(currentUser) === -1)) {
      // role not authorised so redirect to home page
      this.router.navigate(['/login']);
      return false;
    }

    // authorised so return true
    return true;

  }

  decriptValue(value: any) {
    var decrypted = this.EncrDecr.get(this.apiConf.encript, this.cookieService.get(value).toString());
    return decrypted.toString();
  }
}