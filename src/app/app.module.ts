
import { CurrencyPipe, DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePy from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatPaginatorIntl } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { AddNewElementComponent } from './add-new-element/add-new-element.component';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { EncrDecrService } from './clases/EncrDecrService';
import { InterfacesService } from './clases/interfaces';
import { CommonAlerts } from './common-alerts';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DemoMaterialModule } from './demo-material-module';
import { getSpanishPaginatorIntl } from './language-spanish';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { ConstantServiceProvider } from './providers/constant-service/constant-service';
import { LoginServiceProvider } from './providers/login-service/login-service';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { AuthGuard } from './Storage/AuthGuard';
import { TransfereService } from '../transfereService';
import { SAVER, getSaver } from './_helpers/saver.provider';


registerLocaleData(localePy, 'es');
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    ConfirmDialogComponent,
    AddNewElementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(),
    NoopAnimationsModule, MatButtonModule, MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {provide: SAVER, useFactory: getSaver},
    CurrencyPipe,
    ConstantServiceProvider, DatePipe, LoginServiceProvider, AuthGuard, CommonAlerts, CookieService,
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }, { provide: LocationStrategy, useClass: HashLocationStrategy },
    EncrDecrService, InterfacesService, TransfereService
  ],
  entryComponents: [ConfirmDialogComponent, AddNewElementComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
