import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Injectable()
export class CommonAlerts {
  constructor(private _snackBar: MatSnackBar, private toastr: ToastrManager) { }


  showToastError(error: any, position: any = 'top-center') {
    this._snackBar.open(error, "Ok", {
      duration: 2000,
      panelClass: ['snackbarerror']
    });
  }

  showSuccess(meesage: any, position: any = 'top-center') {
    this._snackBar.open(meesage, "Ok", {
      duration: 2000,
      panelClass: ['snackbarsuccess']
    });
  }

  
  showWarnning(meesage: any, position: any = 'top-center') {
    this._snackBar.open(meesage, "Ok", {
      duration: 2000,
      panelClass: ['snackbarwarn']
    });
  }

  showWarnningDuration(meesage: any, position: any = 'top-center') {
    this._snackBar.open(meesage, "Ok", {
      panelClass: ['snackbarwarn']
    });
  }


  handleError(error) {
    let errorMessage = '';    
    if (error instanceof HttpErrorResponse) {      
          if(error.error.header === undefined){                    
            errorMessage = "Error interno: " + error.message;
            return throwError(errorMessage)
          } else{            
            errorMessage = error.error.header.message;
            console.warn(errorMessage)
            return throwError(errorMessage);
          }        
    }
    if (error.error instanceof ErrorEvent) {
      // client-side error      
      errorMessage = `Error: ${error.error.message}`;
      return throwError(errorMessage);
    }  
  }
}
