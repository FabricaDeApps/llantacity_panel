import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonAlerts } from '../../common-alerts';
import { ConstantServiceProvider } from '../constant-service/constant-service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantServiceProvider, private handleErrors: CommonAlerts) {
  }

  addProduct(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "tires/add", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  updateProduct(body: any): Observable<any> {
    return this.httpClient.put(this.constantServiceProvider.server + "tires/update", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  searchProduct(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "tires/searchProducts", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getAllProducts(body: any): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "tires/getAll", body, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getProductByHash(sku: any): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "tires/getProduct" + sku, this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
}
