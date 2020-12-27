import {findNavTree} from '@/mock/modules/menu.js'
import * as menu from '@/net/http/modules/menu.js'

/**
 *
 */
class MenuService {
  constructor() {
  }

  /**
   * 加载菜单树
   */
  loadMenu() {
    let _this = this;
    return new Promise((resolve, reject) => {
      menu.findNavTree().then(function (res) {
        resolve(_this.trimMenuData(res.data));
      });
    })
  }

  /**
   * 如果菜单的path第一个字符是'/',则去掉
   * @param {*} menuList
   */
  trimMenuData(menuList) {
    let temp = [];

    for (let i = 0; i < menuList.length; i++) {
      if (menuList[i].children && menuList[i].children.length >= 1) {
        temp = temp.concat(menuList[i].children);
      } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
        menuList[i].url = menuList[i].url.replace(/^\//, '');
      }
    }

    if (temp.length >= 1) {
      this.trimMenuData(temp);
    }

    return menuList;
  }
}

export const menuService = new MenuService();
