import * as vipDay from "@/net/http/modules/vipDay";

/**
 * 会员日管理
 */
export class VipDayAdminService {
  constructor() {
  }

  /**
   * 会员日管理主页面下拉框获取
   */
  findEnumExcludeAll(param) {
    return new Promise((resolve, reject) => {
      try {
        vipDay.findEnumExcludeAll(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * 会员日管理主页面-选项卡信息获取
  */
  findMemFestivalConfigGroups(param) {
    return new Promise((resolve, reject) => {
      try {
        vipDay.findMemFestivalConfigGroups(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * 会员日管理主页面-分页查询
  */
  pagingActMemFestivalConfigs(param) {
    return new Promise((resolve, reject) => {
      try {
        vipDay.pagingActMemFestivalConfigs(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * 会员日管理主页面-数据导出
  */
  exportMemFestivalConfigQueryData(param) {
    return new Promise((resolve, reject) => {
      try {
        vipDay.exportMemFestivalConfigQueryData(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * 所有活动的下拉框--新建会员日有使用到
  */
  getActivitySelect() {
    return new Promise((resolve, reject) => {
      try {
        vipDay.getActivitySelect().then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * 新建会员日
  */
  addMemFestivalConfig(param) {
    return new Promise((resolve, reject) => {
      try {
        vipDay.addMemFestivalConfig(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * 修改会员日
  */
 updateMemFestivalConfig(param) {
    return new Promise((resolve, reject) => {
      try {
        vipDay.updateMemFestivalConfig(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * 删除会员日
  */
 deleteMemFestivalConfig(param) {
    return new Promise((resolve, reject) => {
      try {
        vipDay.deleteMemFestivalConfig(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
  * 会员日状态修改
  */
 editMemFestivalConfigState(param) {
    return new Promise((resolve, reject) => {
      try {
        vipDay.editMemFestivalConfigState(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
