import * as agentOrder from "@/net/http/modules/agentOrder";

/**
 * 代记账订单管理
 */
export class AgentOrderService {
  constructor() {
  }

  /**
   * 分页查询代记账订单
   */
  pagingAgentOrders(param) {
    return new Promise((resolve, reject) => {
      try {
        agentOrder.pagingAgentOrders(param).then(function (res) {
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
  findAgentOrderGroups(data) {
    return new Promise((resolve, reject) => {
      try {
        agentOrder.findAgentOrderGroups(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 代记账订单完成
   */
  finishAgentOrder(data) {
    return new Promise((resolve, reject) => {
      try {
        agentOrder.finishAgentOrder(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 代记账订单关闭
   */
  closeAgentOrder(data) {
    return new Promise((resolve, reject) => {
      try {
        agentOrder.closeAgentOrder(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 代记账订单删除
   */
  deleteAgentOrder(data) {
    return new Promise((resolve, reject) => {
      try {
        agentOrder.deleteAgentOrder(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}
