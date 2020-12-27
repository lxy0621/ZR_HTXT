import * as expenseOrder from "@/net/http/modules/expenseOrder";

/**
 * 消费订单
 */
export class ExpenseOrderService {
  constructor() {
  }

  /**
   * 按钮数据查询
   */
  pagingExpenseOrder(queryParams) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.pagingExpenseOrder(queryParams).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 按钮数据查询
   */
  findAllTypeListForExpense() {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.findAllTypeListForExpense().then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 选项卡数据查询
   */
  expenseGroupsData(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.expenseGroupsData(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 开票
   */
  takeTicket(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.takeTicket(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 设备合账 卡片统计 - huangdi
   */
  searchDeviceCardData(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.searchDeviceCardData(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 设备合账 分页查询 - huangdi
   */
  pageDeviceData(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.pageDeviceData(data).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 导出EXCEL文件
   */
  expenseExport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.expenseExport(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 根据油机筛选油枪
   */
  getGunsNoByMachinesId(machineId) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.getGunsNoByMachinesId(machineId).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 补打小票
   */
  printingTicket(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.printingTicket(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 备注
   */
  saveMemo(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseOrder.saveMemo(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

}
