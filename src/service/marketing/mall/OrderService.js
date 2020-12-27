import * as mallOrder from "@/net/http/modules/mallOrder";

/**
 * 商品
 */
export class OrderService {
  constructor() {
  }

  /**
   * 分页查询商品
   */
  pagingOrders(param) {
    return new Promise((resolve, reject) => {
      try {
        mallOrder.pagingOrders(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 据订单ID查询订单商品
   */
  pagingOrderProducts(orderId) {
    return new Promise((resolve, reject) => {
      try {
        mallOrder.pagingOrderProducts(orderId).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 备注
   */
  saveMallOrderMemo(data) {
    return new Promise((resolve, reject) => {
      try {
        mallOrder.saveMallOrderMemo(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
}
