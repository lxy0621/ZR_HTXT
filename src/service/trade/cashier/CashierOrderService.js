import * as cashierOrder from "@/net/http/modules/cashierOrder";

/**
 * 收银台订单管理
 */
export class CashierOrderService {
  constructor() {
  }

  /**
   * 分页查询收银台订单
   */
  pagingCashierOrders(param) {
    return new Promise((resolve, reject) => {
      try {
        cashierOrder.pagingCashierOrders(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 选项卡分组数据查询
   */
  findCashierOrderGroups(data) {
    return new Promise((resolve, reject) => {
      try {
        cashierOrder.findCashierOrderGroups(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 收银台订单删除
   */
  deleteCashierOrder(data) {
    return new Promise((resolve, reject) => {
      try {
        cashierOrder.deleteCashierOrder(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
