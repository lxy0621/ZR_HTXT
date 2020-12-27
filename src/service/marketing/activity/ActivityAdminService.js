import * as activity from "@/net/http/modules/activity";

/**
 * 活动管理服务
 */
export class ActivityAdminService {
  constructor() {
  }

  /**
   * 分页查询活动
   */
  pagingActivities(param) {
    return new Promise((resolve, reject) => {
      try {
        activity.pagingActivities(param).then(function (res) {
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
  findActivityGroups(param) {
    return new Promise((resolve, reject) => {
      try {
        activity.findActivityGroups(param).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 创建活动
   */
  addActivity(param) {
    return new Promise((resolve, reject) => {
      try {
        activity.addActivity(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改活动
   */
  updateActivity(param) {
    return new Promise((resolve, reject) => {
      try {
        activity.updateActivity(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除活动
   */
  deleteActivity(param) {
    return new Promise((resolve, reject) => {
      try {
        activity.deleteActivity(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改活动状态
   */
  editActivityState(param) {
    return new Promise((resolve, reject) => {
      try {
        activity.editActivityState(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 活动用户--下拉框
   */
  getUserScopeRuleSelect() {
    return new Promise((resolve, reject) => {
      try {
        activity.getUserScopeRuleSelect().then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 卡类型
   */
  getCardMetaSelect() {
    return new Promise((resolve, reject) => {
      try {
        activity.getCardMetaSelect().then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 导出EXCEL文件
   */
  exportData(data) {
    return new Promise((resolve, reject) => {
      try {
        activity.exportData(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

    /**
   * 活动数据统计页面顶端top数据获取
   */
  getActDataPageTop(data) {
    return new Promise((resolve, reject) => {
      try {
        activity.getActDataPageTop(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
    /**
   * 活动数据统计页面折线数据获取
   */
  getActPageDataTrend(data) {
    return new Promise((resolve, reject) => {
      try {
        activity.getActPageDataTrend(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
      /**
   * 活动明细数据分页查询
   */
  pagingActDetailData(data) {
    return new Promise((resolve, reject) => {
      try {
        activity.pagingActDetailData(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }
};

