import * as coupon from "@/net/http/modules/coupon";
import de from "element-ui/src/locale/lang/de";

/**
 * 优惠券管理服务
 */
export class CouponAdminService {
  constructor() {
  }

  /**
   * 分页查询优惠券批次列表
   */
  pagingCouponBatch(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.pagingCouponBatch(param).then(function (res) {
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
  groupByBatchState(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.groupByBatchState(param).then(function(res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 创建优惠券
   */
  createCouponBatch(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.createCouponBatch(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改优惠券
   */
  updateCouponBatch(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.updateCouponBatch(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 删除优惠券
   * @param couponBatchId
   * @returns {Promise<unknown>}
   */
  deleteCouponBatch(couponBatchId) {
    return new Promise((resolve, reject) => {
      try {
        coupon.deleteCouponBatch(couponBatchId).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 修改优惠券状态
   */
  updateCouponBatchState(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.updateCouponBatchState(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 优惠券实体信息查询
   * @param param
   * @returns {Promise<unknown>}
   */
  pagingCoupons(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.pagingCoupons(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 优惠券状态数量统计
   * @param param
   * @returns {Promise<unknown>}
   */
  couponBatchStats(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.couponBatchStats(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 卡券核销数据统计
   * @param param
   * @returns {Promise<unknown>}
   */
  statsGroupByConsumeDate(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.statsGroupByConsumeDate(param).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 卡券发放数据统计
   * @param param
   * @returns {Promise<unknown>}
   */
  statsGroupByDrawDate(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.statsGroupByDrawDate(param).then(function (res) {
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
  exportData(data) {
    return new Promise((resolve, reject) => {
      try {
        coupon.exportData(data).then(function (res) {
          resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  /**
   * 优惠券批次列表（活动用）
   */
  couponBatchList(param) {
    return new Promise((resolve, reject) => {
      try {
        coupon.couponBatchList(param).then(function (res) {
          resolve(res.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
