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

  getAllUsersByIdClient(idClient: any): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "users/findByIdClient/" + idClient, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  updateStatus(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "users/status", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  deleteUser(hashAdmin: any): Observable<any> {
    return this.httpClient.delete(this.constantServiceProvider.server + "users/delete/" + hashAdmin, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getUserById(hashAdmin: any): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "users/" + hashAdmin, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  addUser(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "users/add", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  updateUser(body: any, hashAdmin: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "users/update/" + hashAdmin, body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
}
