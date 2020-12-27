import * as common from "@/net/http/modules/common";

/**
 * 公共服务
 */
export class CommonService {
  constructor() {
  }

  /**
   * 查找包含"全部"的枚举值
   */
  findEnumIncludeAll(module, param) {
    return new Promise((resolve, reject) => {
      try {
        common.findEnumIncludeAll(module, param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 查找不包含"全部"的枚举值
   */
  findEnumExcludeAll(module, param) {
    return new Promise((resolve, reject) => {
      try {
        common.findEnumExcludeAll(module, param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
