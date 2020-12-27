import * as rechargeApply from "@/net/http/modules/rechargeApply";

/**
 * 充值订单
 */
export class RechargeApplyService {
  constructor() {
  }

  /**
   * 枚举列表
   */
  enumList(params){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeApply.enumList(params).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /********* 卡片统计方法 ***********/
  /**
   * 按钮数据查询 - 充值订单管理页
   */
  searchBtnData(queryParams){
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeApply.searchBtnData(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }


  /********* 分页列表方法 ***********/
  /**
   * 分页查询 - 充值订单管理页
   */
  pageList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeApply.pageList(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  // 审核通过
  acceptAudit(data,id) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeApply.acceptAudit(data,id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  // 审核不通过
  rejecAudit(data,id) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeApply.rejecAudit(data,id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
