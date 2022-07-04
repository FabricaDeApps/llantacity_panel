import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonAlerts } from '../../common-alerts';
import { ConstantServiceProvider } from '../constant-service/constant-service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantServiceProvider, private handleErrors: CommonAlerts) {
  }

  getAllClientes(): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "client/", this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getClientById(idClient: any): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "client/" + idClient, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  addCliente(cliente: any, formData: FormData): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "client/add/" + cliente, formData, this.constantServiceProvider.getHeadersImage()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  updateCliente(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "client/update/", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  changeStatus(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "client/status", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  deleteClient(hash_client: any): Observable<any> {
    return this.httpClient.delete(this.constantServiceProvider.server + "client/delete/" + hash_client, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  updateLogotipo(hashClient: any, formData: FormData): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "client/modifyImagen/" + hashClient, formData, this.constantServiceProvider.getHeadersImage()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
}
