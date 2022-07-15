import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommonAlerts } from "../../common-alerts";
import { ConstantServiceProvider } from "../constant-service/constant-service";

@Injectable()
export class LoginServiceProvider {

    constructor(public httpClient: HttpClient, private constantServiceProvider: ConstantServiceProvider, private handleErrors: CommonAlerts) {
    }

    loginUsers(body: any): Observable<any> {
        return this.httpClient.post(this.constantServiceProvider.server + "admin/login", body, this.constantServiceProvider.getHeadersNew()).pipe(
            catchError(this.handleErrors.handleError)
        );
    }   
}