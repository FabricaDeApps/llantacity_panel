import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit, ChangeDetectorRef,
  Component,

  OnDestroy,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from '../../clases/EncrDecrService';
import { CommonAlerts } from '../../common-alerts';
import { ConstantServiceProvider } from '../../providers/constant-service/constant-service';
import { MenuItems } from '../../shared/menu-items/menu-items';
declare var $: any
/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit, OnInit {
  mobileQuery: MediaQueryList;
  commercePayment: string
  historyPayment: History[] = []
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public cookieService: CookieService,
    public menuItems: MenuItems, public toastr: ToastrManager,
    public dialog: MatDialog,
    private common: CommonAlerts, private EncrDecr: EncrDecrService, private ConstantService: ConstantServiceProvider
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    $('#logoHeader').attr('src', this.decriptValue('logo'));    
    $('#nameCliente').text(this.decriptValue('cliente'));
  }


  decriptValue(value: any) {
    var decrypted = this.EncrDecr.get(this.ConstantService.encript, this.cookieService.get(value).toString());
    return decrypted.toString();
  }
}
