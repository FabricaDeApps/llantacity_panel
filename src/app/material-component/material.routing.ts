import { Routes } from '@angular/router';
import { AuthGuard } from '../Storage/AuthGuard';
import { ProfileComponent } from './profile/profile.component';
import { TiresExcelComponent } from './tires-excel/tires-excel.component';
import { ActionsUsuariosComponent } from './usuariosComponents/actions-usuarios/actions-usuarios.component';
import { UsuariosComponent } from './usuariosComponents/usuarios/usuarios.component';

export const MaterialRoutes: Routes = [
  {
    path: 'usuarios',

    children: [

      { path: '', component: UsuariosComponent, canActivate: [AuthGuard], data: { expectedRol: ['SuperAdmin'] } },
      { path: 'editar/:hashAdmin', component: ActionsUsuariosComponent, data: { ruta: 'editar', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] },
      { path: 'nuevo', component: ActionsUsuariosComponent, data: { ruta: 'nuevo', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'tires',
    component: TiresExcelComponent
    , data: { expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent
    , data: { ruta: 'editar', expectedRol: ['Cliente', 'SuperAdmin'] }, canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
