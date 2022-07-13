import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonAlerts } from '../../common-alerts';
import { ConstantServiceProvider } from '../constant-service/constant-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantServiceProvider, private handleErrors: CommonAlerts) {
  }

  getAllAdmins(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "admin/getAll", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  addAdmin(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "admin/add", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  updateAdmin(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "admin/update", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  changePassword(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "admin/changePassword", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  deleteAdmin(hashAdmin: any): Observable<any> {
    return this.httpClient.delete(this.constantServiceProvider.server + "admin/delete/" + hashAdmin, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  findAdminByHash(hashAdmin: any): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "admin/findByHash/" + hashAdmin, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
  
  changeStatus(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "admin/changeStatus", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
}
