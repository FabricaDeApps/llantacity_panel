import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InterfacesService {
}

export interface Proveedores {
  idProveedor: any
  razonSocial: string
  nombreComercial: string
  direccion: string
  municipio: string
  estado: string
  email: string
  paginaWeb: string
  telefono: string
  ciudad: string
  rfc: string
  contacto: string
  active: any
}

export interface Productos {
  idTire: any
  keyLlantacity: string
  codigo: string
  categoria: string
  marca: string
  ancho: string
  alto: string
  rin: string
  diseno: string
  clasZR: string
  indiceCarga: any
  indiceVel: string
  aplicacion: string
  charge: any
  homologacion: any
  costo: any,
  existencia: any
  image: string
  active: boolean
  isFavorite: boolean
  createdTime: string
  idProveedor: any
  pesoVolumetrico: string
  temperatura: any
  traccion: any
  treadwear: any
  estilo: any
  caracteristica: any
  tipoIdentificacion: any
  numeroIdentificacion: any
  garantiaAnos: any
  paisEnvio: any
  tipoVehiculo: any
  video: any
  descripcionCorta: any
  diametroTotal: any
  altoTotal: any
  id_woocommerce: any
  last_update_woocommerce: string
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

export interface Admin {
  id_admin: any
  hash_admin: string
  name: string
  last_name: string
  email: string
  active: boolean
  created_date: string
  modified_date: string
  is_deleted: boolean
  type: string
}

export interface Ruteo {
  ruta: string
}
