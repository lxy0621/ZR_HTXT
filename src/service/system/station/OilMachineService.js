import * as oilMachine from "@/net/http/modules/oilMachine";

/**
 * 油机
 */
export class OilMachineService {
  constructor() {
  }

  /**
   * 分页查询
   */
  pagingOilMachines(param) {
    return new Promise((resolve, reject) => {
      try {
        oilMachine.pagingOilMachines(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 保存油机
   */
  createOilMachine(data) {
    return new Promise((resolve, reject) => {
      try {
        oilMachine.createOilMachine(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改油机
   */
  updateOilMachine(data) {
    return new Promise((resolve, reject) => {
      try {
        oilMachine.updateOilMachine(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除油机
   */
  deleteOilMachines(data) {
    return new Promise((resolve, reject) => {
      try {
        oilMachine.deleteOilMachines(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 据油机ID查询油机
   */
  getOilMachineById(data) {
    return new Promise((resolve, reject) => {
      try {
        oilMachine.getOilMachineById(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 油站列表
   */
  stationList(params) {
    return new Promise((resolve, reject) => {
      try {
        oilMachine.stationList(params).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 获取品牌列表
   */
  machineBrandList(params) {
    return new Promise((resolve, reject) => {
      try {
        oilMachine.machineBrandList(params).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
}
