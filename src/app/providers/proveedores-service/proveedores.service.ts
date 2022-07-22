import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonAlerts } from '../../common-alerts';
import { ConstantServiceProvider } from '../constant-service/constant-service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantServiceProvider, private handleErrors: CommonAlerts) {
  }

  getAllProveedores(): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "proveedor/findAll", this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getProveedorById(idProveedor: any): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "proveedor/findById/" + idProveedor, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getAllProveedoresPagination(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "proveedor/getAllPagination", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  addProveedor(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "proveedor/add", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  updateProveedor(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "proveedor/update", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  changeStatus(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "proveedor/changeStatus", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  deleteProveedor(idProveedor: any): Observable<any> {
    return this.httpClient.delete(this.constantServiceProvider.server + "proveedor/delete/" + idProveedor, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
}
