import * as payChannelConfig from "@/net/http/modules/payChannelConfigp";

/**
 * 充值订单
 */
export class PayChannelConfigService {
  constructor() {
  }

  /**
   * 枚举列表
   */
  enumList(params){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        payChannelConfig.enumList(params).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 分页查询
   */
  pageList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        payChannelConfig.pageList(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除
   */
  delete(id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        payChannelConfig.delOne(id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 起用
   */
  enableConfig(id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        payChannelConfig.enableConfig(id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
  /**
   * 停用
   */
  disableConfig(id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        payChannelConfig.disableConfig(id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 保存
   */
  savePayConfig(data){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        payChannelConfig.save(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 修改
   */
  updatePayConfig(data,id){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        payChannelConfig.update(data,id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

}
