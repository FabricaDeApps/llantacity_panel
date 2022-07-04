import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonAlerts } from '../../common-alerts';
import { ConstantServiceProvider } from '../constant-service/constant-service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantServiceProvider, private handleErrors: CommonAlerts) {
  }

  getMenuDinamico(): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "menu/", this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
}
