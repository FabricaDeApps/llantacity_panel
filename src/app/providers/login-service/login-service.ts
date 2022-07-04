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
        return this.httpClient.post(this.constantServiceProvider.server + "users/login", body, this.constantServiceProvider.getHeadersNew()).pipe(
            catchError(this.handleErrors.handleError)
        );
    }

    getUserById(hashUser: string): Observable<any> {
        return this.httpClient.get(this.constantServiceProvider.server + "users/" + hashUser, this.constantServiceProvider.getHeadersNew()).pipe(
            catchError(this.handleErrors.handleError)
        );
    }

    updateUsers(hashUser: any, body: any): Observable<any> {
        return this.httpClient.put(this.constantServiceProvider.server + "users/update/" + hashUser, body, this.constantServiceProvider.getHeadersNew()).pipe(
            catchError(this.handleErrors.handleError)
        );
    }

    changePassword(body: any): Observable<any> {
        return this.httpClient.put(this.constantServiceProvider.server + "users/changePassword", body, this.constantServiceProvider.getHeadersNew()).pipe(
            catchError(this.handleErrors.handleError)
        );
    }
}