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
    { link: "usuarios", name: 'Usuarios Admin', type: 'link', icon: 'group', rol: 'SuperAdmin', active: true },
  ]
  constructor() {
  }

  getMenuitem(): Menu[] {
    return this.menu;
  }
}
