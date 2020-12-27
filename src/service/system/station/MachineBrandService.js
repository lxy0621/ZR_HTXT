import * as machineBrand from "@/net/http/modules/machineBrand";

/**
 * 油机品牌
 */
export class MachineBrandService {
  constructor() {
  }

  /**
   * 分页查询油机品牌
   */
  pagingMachineBrands(param) {
    return new Promise((resolve, reject) => {
      try {
        machineBrand.pagingMachineBrands(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 添加油机品牌
   */
  createMachineBrand(data) {
    return new Promise((resolve, reject) => {
      try {
        machineBrand.createMachineBrand(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改油机品牌
   */
  updateMachineBrand(data) {
    return new Promise((resolve, reject) => {
      try {
        machineBrand.updateMachineBrand(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除油机品牌
   */
  deleteMachineBrands(data) {
    return new Promise((resolve, reject) => {
      try {
        machineBrand.deleteMachineBrands(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 据ID查询油机品牌
   */
  getMachineBrandById(machineBrandId) {
    return new Promise((resolve, reject) => {
      try {
        machineBrand.getMachineBrandById(machineBrandId).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
