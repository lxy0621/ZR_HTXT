import * as expenseReport from "@/net/http/modules/expenseReport";

/**
 * 消费订单
 */
export class ExpenseReportService {
	constructor() {}

	/**
	 * 查询所有可用的加油站信息
	 */
	queryAllStations() {
		return new Promise((resolve, reject) => {
			try {
				expenseReport.queryAllStations().then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

	/**
	 * 消费订单日报数据查询
	 */
	pagingOrderDayReport(data) {
		return new Promise((resolve, reject) => {
			try {
				expenseReport.pagingOrderDayReport(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

	/**
	 * 消费订单日报分组查询
	 */
	findGroupOrderDayReport(data) {
		return new Promise((resolve, reject) => {
			try {
				expenseReport.findGroupOrderDayReport(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

  /**
   * 导出消费订单日报表
   */
  exportOrderDayReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.exportOrderDayReport(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 消费订单周报数据查询
   */
  pagingOrderWeekReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.pagingOrderWeekReport(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 消费订单周报分组查询
   */
  findGroupOrderWeekReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.findGroupOrderWeekReport(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 导出消费订单周报表
   */
  exportOrderWeekReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.exportOrderWeekReport(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

	/**
	 * 消费订单月报数据查询
	 */
	pagingOrderMonthReport(data) {
		return new Promise((resolve, reject) => {
			try {
				expenseReport.pagingOrderMonthReport(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

	/**
	 * 消费订单月报分组查询
	 */
	findGroupOrderMonthReport(data) {
		return new Promise((resolve, reject) => {
			try {
				expenseReport.findGroupOrderMonthReport(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

  /**
   * 导出消费订单月报表
   */
  exportOrderMonthReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.exportOrderMonthReport(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 消费订单季报数据查询
   */
  pagingOrderQuarterReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.pagingOrderQuarterReport(data).then(function(res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 消费订单季报分组查询
   */
  findGroupOrderQuarterReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.findGroupOrderQuarterReport(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 导出消费订单季报表
   */
  exportOrderQuarterReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.exportOrderQuarterReport(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
	 * 消费订单年报数据查询
	 */
	pagingOrderYearReport(data) {
		return new Promise((resolve, reject) => {
			try {
				expenseReport.pagingOrderYearReport(data).then(function(res) {
					resolve(res.data);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

	/**
	 * 消费订单年报分组查询
	 */
	findGroupOrderYearReport(data) {
		return new Promise((resolve, reject) => {
			try {
				expenseReport.findGroupOrderYearReport(data).then(function(res) {
					resolve(res);
				});
			} catch (error) {
				reject(error);
			}
		})
	}

  /**
   * 导出消费订单年报表
   */
  exportOrderYearReport(data) {
    return new Promise((resolve, reject) => {
      try {
        expenseReport.exportOrderYearReport(data).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

}
