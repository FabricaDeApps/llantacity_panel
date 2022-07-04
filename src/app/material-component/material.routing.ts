import { Routes } from '@angular/router';
import { AuthGuard } from '../Storage/AuthGuard';
import { ActionsClientesComponent } from './clientesComponents/actions-clientes/actions-clientes.component';
import { ClientesComponent } from './clientesComponents/clientes/clientes.component';
import { ProfileComponent } from './profile/profile.component';
import { ActionsUsuariosComponent } from './usuariosComponents/actions-usuarios/actions-usuarios.component';
import { UsuariosComponent } from './usuariosComponents/usuarios/usuarios.component';

export const MaterialRoutes: Routes = [
  {
    path: 'clientes',

    children: [

      { path: '', component: ClientesComponent, canActivate: [AuthGuard], data: { expectedRol: ['SuperAdmin'] } },
      { path: 'editar/:hash_client', component: ActionsClientesComponent, data: { ruta: 'editar', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] },
      { path: 'nuevo', component: ActionsClientesComponent, data: { ruta: 'nuevo', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'usuarios',

    children: [

      { path: '', component: UsuariosComponent, canActivate: [AuthGuard], data: { expectedRol: ['SuperAdmin'] } },
      { path: 'editar/:hashAdmin', component: ActionsUsuariosComponent, data: { ruta: 'editar', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] },
      { path: 'nuevo', component: ActionsUsuariosComponent, data: { ruta: 'nuevo', expectedRol: ['SuperAdmin'] }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
    , data: { ruta: 'editar', expectedRol: ['Cliente', 'SuperAdmin'] }, canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
