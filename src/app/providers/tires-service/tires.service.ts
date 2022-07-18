import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonAlerts } from '../../common-alerts';
import { Download, download } from '../../_helpers/download';
import { SAVER, Saver } from '../../_helpers/saver.provider';
import { ConstantServiceProvider } from '../constant-service/constant-service';

@Injectable({
  providedIn: 'root'
})
export class TiresService {

  constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantServiceProvider, 
    private handleErrors: CommonAlerts, 
    @Inject(SAVER) private save: Saver) {
  }

  uploadExcelTires(formData: FormData): Observable<any> {
    return this.httpClient.post(this.constantServiceProvider.server + "tires/importTires", formData, this.constantServiceProvider.getHeadersImage()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }

  getDateActual(): Observable<any> {
    return this.httpClient.get(this.constantServiceProvider.server + "tires/getDate", this.constantServiceProvider.getHeadersNew()).pipe(
      catchError(this.handleErrors.handleError)
    );
  }
  
  download(filename?: string, idProveedor?: any): Observable<Download> {
    const headers = new HttpHeaders().set('Authorization', 'Basic TExBTlRBQ0lUWURFVkVMT1BNRU5UMjAyMkBGQUIjQVAyMjpMTEFOVEFDSVRZREVWRUxPUE1FTlQyMDIyQEZBQiNBUDIyTDgyU0FMM1hT');
    return this.httpClient
      .get(
        this.constantServiceProvider.server + "tires/getExcelTires/" + idProveedor,         
        {
          headers: headers,
          reportProgress: true,
          observe: 'events',
          responseType: 'blob'
        }
      )
      .pipe(download(blob => this.save(blob, filename)));
  }

}
