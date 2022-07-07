import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { CurrencyInputMaskDirective } from '../clases/currency-input-mask.directive';
import { ProfileComponent } from './profile/profile.component';
import { LoadingComponent } from '../loading';
import { UsuariosComponent } from './usuariosComponents/usuarios/usuarios.component';
import { ActionsUsuariosComponent } from './usuariosComponents/actions-usuarios/actions-usuarios.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TiresExcelComponent } from './tires-excel/tires-excel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    CdkTableModule
  ],
  entryComponents: [],
  declarations: [
    CurrencyInputMaskDirective,
    ProfileComponent, LoadingComponent, UsuariosComponent,
    ActionsUsuariosComponent,
    TiresExcelComponent
  ],
  exports: [
    LoadingComponent, RouterModule, NgxSpinnerModule
  ]
})

export class MaterialComponentsModule { }