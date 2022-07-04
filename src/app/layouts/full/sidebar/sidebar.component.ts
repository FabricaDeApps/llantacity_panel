import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,

  OnDestroy
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from '../../../clases/EncrDecrService';
import { ConstantServiceProvider } from '../../../providers/constant-service/constant-service';
import { MenuItems } from '../../../shared/menu-items/menu-items';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  entra: boolean = false;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public cookieService: CookieService,
    public menuItems: MenuItems, private apiConf: ConstantServiceProvider, private EncrDecr: EncrDecrService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  decriptValueRol() {
    var decrypted = this.EncrDecr.get(this.apiConf.encript, this.cookieService.get('rol').toString());
    return decrypted.toString();
  }

  checkRol(menuitem: any) {    
    var trimRol = menuitem.rol.trim();
    var roles = trimRol.toString().split(",");
    for (let index = 0; index < roles.length; index++) {
      const rol = roles[index];  
      if (this.decriptValueRol() == rol){
        return true;
      }  
    }   
  }
}
