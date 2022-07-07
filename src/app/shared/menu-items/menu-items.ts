import { Injectable } from '@angular/core';
export interface Menu {
  link: string;
  name: string;
  type: string;
  icon: string;
  rol: string;
  active: boolean;
}

@Injectable()
export class MenuItems {
  menu: Menu[] = [
    { link: "tires", name: 'Llantas', type: 'link', icon: 'minor_crash', rol: 'SuperAdmin', active: true },
    { link: "dashboard", name: 'Inicio', type: 'link', icon: 'dashboard', rol: 'SuperAdmin', active: true },
    { link: "clientes", name: 'Clientes', type: 'link', icon: 'contacts', rol: 'SuperAdmin', active: true }]
  constructor() {
  }

  getMenuitem(): Menu[] {
    return this.menu;
  }
}
