import * as role from "@/net/http/modules/role";

/**
 * 角色
 */
export class RoleService {
  constructor() {
  }

  /**
   * 分页查询
   */
  pagingRoles(param) {
    return new Promise((resolve, reject) => {
      try {
        role.pagingRoles(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 添加角色
   */
  createRole(param) {
    return new Promise((resolve, reject) => {
      try {
        role.createRole(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改角色
   */
  updateRole(param) {
    return new Promise((resolve, reject) => {
      try {
        role.updateRole(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除角色
   */
  deleteRoles(param) {
    return new Promise((resolve, reject) => {
      try {
        role.deleteRoles(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 启用角色
   */
  enableRole(roleId) {
    return new Promise((resolve, reject) => {
      try {
        role.enableRole(roleId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 停用角色
   */
  disableRole(roleId) {
    return new Promise((resolve, reject) => {
      try {
        role.disableRole(roleId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 获得权限树表格
   */
  getPermissionTree() {
    return new Promise((resolve, reject) => {
      try {
        role.getPermissionTree().then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 配置权限
   */
  configPermissions(data) {
    return new Promise((resolve, reject) => {
      try {
        role.configPermissions(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  // 获取用户已有权限
  getRolePermissions(roleId) {
    return new Promise((resolve, reject) => {
      try {
        role.getRolePermissions(roleId).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
