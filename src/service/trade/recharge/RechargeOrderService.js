import * as rechargeOrder from "@/net/http/modules/rechargeOrder";
import * as rechargeApply from "@/net/http/modules/rechargeApply";

/**
 * 充值订单
 */
export class RechargeOrderService {
  constructor() {
  }

  /**
   * 枚举列表
   */
  enumList(params) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.enumList(params).then(function (res) {
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
  searchBtnData(queryParams) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.searchBtnData(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 按钮数据查询 - day
   */
  searchDayBtnData(queryParams) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.searchDayBtnData(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 按钮数据查询 - week
   */
  searchWeekBtnData(queryParams) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.searchWeekBtnData(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 按钮数据查询 - month
   */
  searchMonthBtnData(queryParams) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.searchMonthBtnData(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 按钮数据查询 - quarter
   */
  searchQuarterBtnData(queryParams) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.searchQuarterBtnData(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 按钮数据查询 - year
   */
  searchYearBtnData(queryParams) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.searchYearBtnData(queryParams).then(function (res) {
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
  pagingRechargeOrders(data) {
    return new Promise((resolve, reject) => {
      try {
        rechargeOrder.pagingRechargeOrders(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 分页查询 - day
   */
  pageDayList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.pageDayList(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 分页查询 - week
   */
  pageWeekList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.pageWeekList(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 分页查询 - month
   */
  pageMonthList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.pageMonthList(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 分页查询 - quarter
   */
  pageQuarterList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.pageQuarterList(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 分页查询 - year
   */
  pageYearList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.pageYearList(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }


  /********* 财务合账方法 ***********/
  /**
   * 按钮数据查询 - 充值订单管理页
   */
  searchDeviceCardData(queryParams) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.searchDeviceBtnData(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 分页查询 - 财务合账
   */
  pageDeviceList(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.pageDeviceList(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 导出数据 - 总充值订单管理页
   */
  rechargeOrderExport(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      try {
        rechargeOrder.rechargeOrderExport(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 导出EXCEL文件
   */
  rechargeDimensionExport(data) {
    return new Promise((resolve, reject) => {
      try {
        rechargeOrder.rechargeDimensionExport(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 撤销线下充值订单
   */
  repealRechargeOrder(data, id) {
    return new Promise((resolve, reject) => {
      try {
        rechargeOrder.repealRechargeOrder(data, id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 退款充值订单
   */
  refundRechargeOrder(data, id) {
    return new Promise((resolve, reject) => {
      try {
        rechargeOrder.refundRechargeOrder(data, id).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 据订单ID查询退款记录
   */
  getRefundInfoByRechargeOrderId(rechargeOrderId) {
    return new Promise((resolve, reject) => {
      try {
        rechargeOrder.getRefundInfoByRechargeOrderId(rechargeOrderId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 据订单ID查询撤销记录
   */
  getRepealInfoByRechargeOrderId(rechargeOrderId) {
    return new Promise((resolve, reject) => {
      try {
        rechargeOrder.getRepealInfoByRechargeOrderId(rechargeOrderId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
