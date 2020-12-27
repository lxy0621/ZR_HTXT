import * as directOrder from "@/net/http/modules/directOrder";

/**
 * 直付订单管理
 */
export class DirectOrderService {
  constructor() {
  }

  /**
   * 分页查询直付订单
   */
  pagingDirectOrders(param) {
    return new Promise((resolve, reject) => {
      try {
        directOrder.pagingDirectOrders(param).then(function (res) {
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
  findDirectOrderGroups(data) {
    return new Promise((resolve, reject) => {
      try {
        directOrder.findDirectOrderGroups(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 直付订单退款
   */
  refundDirectOrder(data) {
    return new Promise((resolve, reject) => {
      try {
        directOrder.refundDirectOrder(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 直付订单删除
   */
  deleteDirectOrder(data) {
    return new Promise((resolve, reject) => {
      try {
        directOrder.deleteDirectOrder(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
