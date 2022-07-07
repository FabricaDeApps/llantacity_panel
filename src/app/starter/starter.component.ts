import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { EncrDecrService } from '../clases/EncrDecrService';
import { CommonAlerts } from '../common-alerts';
import { ConstantServiceProvider } from '../providers/constant-service/constant-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
declare var $: any
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  message: any;
  conversionOutput: string;
  isLoading: boolean = false

  constructor(public fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService, private commonAlerts: CommonAlerts,
    public toastr: ToastrManager, private EncrDecr: EncrDecrService, private constantService: ConstantServiceProvider,
    private loginService: LoginServiceProvider) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    $("#layout").removeClass("page-wrapper");
    $("#layout").addClass("page-start");
    this.cookieService.deleteAll();
    this.userForm.reset();
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }


  login() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.loadSpinner()
    var param = {
      email: this.userForm.value.email,
      password: this.userForm.value.password
    };
    let body = JSON.stringify(param);
    this.loginService.loginUsers(body).subscribe(
      response => {
        if (response.header.code == 200) {
          console.warn(response.data)
          if (response.data.type.toString() == "SuperAdmin") {
            console.warn("aqui")
            var logo = this.EncrDecr.set(this.constantService.encript, 'assets/images/logo.png')
            var cliente = this.EncrDecr.set(this.constantService.encript, 'LlantaCity Administrador')
            this.setearDatos(response, logo, cliente)            
            this.router.navigate(['/tires']);
            this.addOrRemoveClass()
          } 
        } else {
          this.commonAlerts.showWarnning(response.header.message)
        }
      },
      (error) => {
        console.log("eeror>>", error);
        this.commonAlerts.showToastError(error);
      }
    )
    this.terminateSpinner()
  }


  setearDatos(response: any, logo: any, cliente: any) {
    this.cookieService.set('logo', logo)
    this.cookieService.set('cliente', cliente)
    this.cookieService.set('isLogin', "true");
    var hashUser = this.EncrDecr.set(this.constantService.encript, response.data.hash_admin);
    this.cookieService.set('hashUser', hashUser);
    var rolEncrypted = this.EncrDecr.set(this.constantService.encript, response.data.type.toString());
    this.cookieService.set('rol', rolEncrypted)
  }

  addOrRemoveClass() {
    $("#layout").removeClass("page-start");
    $("#layout").addClass("page-wrapper");
  }
}
