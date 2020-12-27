import * as permission from "@/net/http/modules/permission";

/**
 * 权限服务
 */
export class PermissionService {
  constructor() {
  }

  /**
   * 分页查询权限
   */
  pagingPermissions(param) {
    return new Promise((resolve, reject) => {
      try {
        permission.pagingPermissions(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 添加权限
   */
  createPermission(param) {
    return new Promise((resolve, reject) => {
      try {
        permission.createPermission(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改权限
   */
  updatePermission(param) {
    return new Promise((resolve, reject) => {
      try {
        permission.updatePermission(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除权限
   */
  deletePermissions(param) {
    return new Promise((resolve, reject) => {
      try {
        permission.deletePermissions(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
