import * as app from "@/net/http/modules/app";

/**
 * 应用管理
 */
export class AppAdminService {
  constructor() {
  }

  /**
   * 分页查询APK应用
   */
  queryApks(param) {
    return new Promise((resolve, reject) => {
      try {
        app.queryApks(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 创建APK信息
   */
  createApk(param) {
    return new Promise((resolve, reject) => {
      try {
        app.createApk(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 编辑APK信息
   */
  updateApk(param) {
    return new Promise((resolve, reject) => {
      try {
        app.updateApk(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 分页查询版本历史信息
   */
  queryHistApks(param) {
    return new Promise((resolve, reject) => {
      try {
        app.queryHistApks(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 查询单个APK历史版本
   */
  getApkHistory(id) {
    return new Promise((resolve, reject) => {
      try {
        app.getApkHistory(id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 查询单个APK对象
   */
  getApk(id) {
    return new Promise((resolve, reject) => {
      try {
        app.getApk(id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 提交新版本信息
   */
  release(data) {
    return new Promise((resolve, reject) => {
      try {
        app.release(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
