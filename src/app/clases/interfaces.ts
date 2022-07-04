import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InterfacesService {
}

export interface ModalCreate {
  subtitle: string
  message: string
  buttonAccept: string
  buttonCancell: string
  spanAcept: string
  spanCancell: string
  textTooltip: string
}


export interface Clientes {
  active: boolean
  client: string
  email: any
  email2: any
  email3: any
  email4: any
  idClient: any
  hash_client: any
  isDeleted: boolean
  lastName: any
  logo: string
  name: string
  phone: any
  latitude: any
  longitude: any
}

export interface ClientValet {
  id_client: string
  client: string
  name: string
  lastName: string
  email: string
  email2: string
  email3: string
  email4: string
  phone: string
  logo: string
}

export interface Users {
  active: boolean
  created: string
  email: string
  hashAdmin: string
  idAdmin: any
  idClient: any
  isConfirmed: boolean
  lastName: string
  name: string
  id_rol: string
  rolName: string
}

export interface Ruteo {
  ruta: string
}


export interface Roles {
  id_rol: any
  is_active: any
  is_deleted: any
  rol: string
}

export interface Rooms {
  hash_room: string
  id_client: any
  id_room: any
  is_active: any
  is_deleted: any
  room: string
}

export interface MenuDatabase {
  hash_client: string
  hash_menu: string
  id_menu: any
  is_deleted: any
  menu_db: string
}
