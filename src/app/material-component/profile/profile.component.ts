import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EncrDecrService } from '../../clases/EncrDecrService';
import { CommonAlerts } from '../../common-alerts';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { MustMatch } from '../../_helpers/must-match.validator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any
  formUser: FormGroup;
  passFormUser: FormGroup;
  isLoading: boolean = false
  hashUser: any

  @ViewChild('spinner', { static: true }) spinerDialog: TemplateRef<any>;
  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;
  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
    private comonAlerts: CommonAlerts,
    private EncrDecr: EncrDecrService, private loginService: LoginServiceProvider) {
    this.formUser = this.fb.group({
      email: ['', [Validators.maxLength(255), Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      name: ['', [Validators.maxLength(250), Validators.required]],
      lastName: ['', [Validators.maxLength(250), Validators.required]],
    })
    this.passFormUser = this.fb.group({
      password: ['', [Validators.required, Validators.maxLength(200)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  ngOnInit() {
    this.hashUser = this.EncrDecr.decriptValue("hashUser");
    this.getUserById()
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  getUserById() {
    this.loadSpinner()
    this.loginService.getUserById(this.hashUser).subscribe((response: any) => {
      if (response.header.code == 200) {
        this.user = response.data;
        this.formUser.controls['email'].setValue(this.user.email)
        this.formUser.controls['name'].setValue(this.user.name)
        this.formUser.controls['lastName'].setValue(this.user.lastName)
      } else {
        this.comonAlerts.showWarnning(response.header.message)
      }
    }, (error) => {
      this.comonAlerts.showToastError(error)
    });
    this.terminateSpinner()
  }

  updateUser() {
    if (!this.formUser.valid) {
      return;
    }
    this.loadSpinner()
    var params = {
      email: this.formUser.value.email,
      name: this.formUser.value.name,
      lastName: this.formUser.value.lastName
    }
    let bodyUpdate = JSON.stringify(params);
    this.loginService.updateUsers(this.hashUser, bodyUpdate).subscribe((response: any) => {
      if (response.header.code == 200) {
        this.comonAlerts.showSuccess(response.header.message)
        this.getUserById()
      } else {
        this.comonAlerts.showWarnning(response.header.message)
      }
      this.terminateSpinner()
    }, (error) => {
      this.comonAlerts.showToastError(error)
      this.terminateSpinner()
    });
  }

  changePasswordUser() {
    if (!this.passFormUser.valid) {
      return;
    }
    this.loadSpinner()
    var params = {
      hash: this.hashUser,
      password: this.passFormUser.value.confirmPassword
    }
    let body = JSON.stringify(params);
    this.loginService.changePassword(body).subscribe((response: any) => {
      if (response.header.code == 200) {
        this.comonAlerts.showSuccess(response.header.message)
        this.passFormUser.reset();
      } else {
        this.comonAlerts.showWarnning(response.header.message)
      }
      this.terminateSpinner()
    }, (error) => {
      this.comonAlerts.showToastError(error)
      this.terminateSpinner()
    });

  }
}
