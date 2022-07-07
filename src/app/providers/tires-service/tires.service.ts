import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonAlerts } from '../../common-alerts';
import { ConstantServiceProvider } from '../constant-service/constant-service';

@Injectable({
  providedIn: 'root'
})
export class TiresService {

  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantServiceProvider, private handleErrors: CommonAlerts) {
  }

  uploadExcelTires(formData: FormData): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "tires/importTires", formData, this.constantServiceProvider.getHeadersImage()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

}
