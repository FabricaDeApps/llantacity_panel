import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { EncrDecrService } from '../../clases/EncrDecrService';
import { Admin } from '../../clases/interfaces';
import { CommonAlerts } from '../../common-alerts';
import { UsersService } from '../../providers/users-service/users.service';
import { MustMatch } from '../../_helpers/must-match.validator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Admin
  formUser: FormGroup;
  passFormUser: FormGroup;
  isLoading: boolean = false
  hashUser: any

  @ViewChild('spinner', { static: true }) spinerDialog: TemplateRef<any>;
  @ViewChild(FormGroupDirective, { static: true }) formDirective: FormGroupDirective;
  constructor(public fb: FormBuilder,
    public dialog: MatDialog,
    private comonAlerts: CommonAlerts,
    private EncrDecr: EncrDecrService, private usersService: UsersService) {
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
    this.getUserByHash()
  }

  loadSpinner(): void {
    this.isLoading = true;
  }

  terminateSpinner(): void {
    setTimeout(() => this.isLoading = false, 500);
  }

  getUserByHash() {
    this.loadSpinner()
    this.usersService.findAdminByHash(this.hashUser).subscribe((response: any) => {
      if (response.header.code == 200) {
        this.user = response.data[0];
        this.formUser.controls['email'].setValue(this.user.email)
        this.formUser.controls['name'].setValue(this.user.name)
        this.formUser.controls['lastName'].setValue(this.user.last_name)
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
      last_name: this.formUser.value.lastName,
      type: this.user.type
    }
    params["hash_admin"] = this.hashUser;
    let bodyUpdate = JSON.stringify(params);    
    this.usersService.updateAdmin(bodyUpdate).subscribe((response: any) => {
      if (response.header.code == 200) {
        this.comonAlerts.showSuccess(response.header.message)
        this.getUserByHash()
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
      hash_admin: this.hashUser,
      new_password: this.passFormUser.value.confirmPassword
    }
    let body = JSON.stringify(params);
    this.usersService.changePassword(body).subscribe((response: any) => {
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
