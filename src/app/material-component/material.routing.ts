import { Routes } from '@angular/router';
import { AuthGuard } from '../Storage/AuthGuard';
import { ProfileComponent } from './profile/profile.component';
import { ActionsProveedoresComponent } from './proveedoresComponents/actions-proveedores/actions-proveedores.component';
import { ProveedoresComponent } from './proveedoresComponents/proveedores/proveedores.component';
import { TiresExcelComponent } from './tires-excel/tires-excel.component';
import { ActionsTiresComponent } from './tiresComponents/actions-tires/actions-tires.component';
import { TiresComponent } from './tiresComponents/tires/tires.component';
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
    path: 'productos',
    children: [
      { path: '', component: TiresComponent, canActivate: [AuthGuard], data: { expectedRol: ['SuperAdmin'] } },
      { path: 'editar/:sku', component: ActionsTiresComponent, data: { ruta: 'editar', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] },
      { path: 'nuevo', component: ActionsTiresComponent, data: { ruta: 'nuevo', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'proveedores',
    children: [
      { path: '', component: ProveedoresComponent, canActivate: [AuthGuard], data: { expectedRol: ['SuperAdmin'] } },
      { path: 'editar/:idProveedor', component: ActionsProveedoresComponent, data: { ruta: 'editar', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] },
      { path: 'nuevo', component: ActionsProveedoresComponent, data: { ruta: 'nuevo', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] }
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
