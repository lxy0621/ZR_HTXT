import * as menu from "@/net/http/modules/menu";

/**
 * 菜单服务
 */
export class MenuService {
  constructor() {
  }

  /**
   * 查询菜单树
   */
  findMenuTree(param) {
    return new Promise((resolve, reject) => {
      try {
        menu.findMenuTree(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 添加菜单
   */
  createMenu(param) {
    return new Promise((resolve, reject) => {
      try {
        menu.createMenu(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改菜单
   */
  updateMenu(param) {
    return new Promise((resolve, reject) => {
      try {
        menu.updateMenu(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除菜单
   */
  deleteMenu(menuId) {
    return new Promise((resolve, reject) => {
      try {
        menu.deleteMenu(menuId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
