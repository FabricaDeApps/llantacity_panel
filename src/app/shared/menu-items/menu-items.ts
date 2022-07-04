import { Injectable } from '@angular/core';
import * as menu from "../../../assets/json/menu.json";
import { CommonAlerts } from '../../common-alerts';
import { MenuService } from '../../providers/menu-service/menu.service';
export interface Menu {
  link: string;
  name: string;
  type: string;
  icon: string;
  rol: string;
  active: boolean;
}

const MENUITEMS = (menu as any).default;

@Injectable()
export class MenuItems {
  menu: Menu[] = []
  constructor(private menuService: MenuService, private common: CommonAlerts){
    this.getMenuDinamico()
  }

  /* getMenuitem(): Menu[] {
    return MENUITEMS;
  } */

  getMenuitem(): Menu[] {
    return this.menu;
  }

  getMenuDinamico() {
    this.menuService.getMenuDinamico().subscribe(
      (response) => {
        if (response.header.code == 200) {      
          this.menu = response.data
        } else {
          this.common.showWarnning(response.header.message)
        }
      }, (error) => {
        this.common.showToastError(error)
      }
    )
  }

}
