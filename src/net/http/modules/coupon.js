/* jshint esversion: 6 */
import axios from '../axios';

// 分页查询优惠券
export const pagingCouponBatch = (data) => {
  return axios({
    url: '/act/coupon/pagingCouponBatch',
    method: 'post',
    data
  });
};

// 选项卡分组数据查询
export const groupByBatchState = (data) => {
  return axios({
    url: '/act/coupon/groupByBatchState',
    method: 'post',
    data
  });
};

// 创建优惠券
export const createCouponBatch = (data) => {
  return axios({
    url: '/act/coupon/createCouponBatch',
    method: 'post',
    data
  });
};

// 修改优惠券
export const updateCouponBatch = (data) => {
  return axios({
    url: '/act/coupon/updateCouponBatch',
    method: 'post',
    data
  });
};

// 删除优惠券
export const deleteCouponBatch = (couponBatchId) => {
  return axios({
    url: '/act/coupon/deleteCouponBatch/' + couponBatchId,
    method: 'post',
  });
};

// 修改优惠券状态
export const updateCouponBatchState = (data) => {
  return axios({
    url: '/act/coupon/updateCouponBatchState',
    method: 'post',
    data
  });
};

// 优惠券实体信息查询
export const pagingCoupons = (data) => {
  return axios({
    url: '/act/coupon/pagingCoupons',
    method: 'post',
    data
  });
};

// 优惠券状态数量统计
export const couponBatchStats = (data) => {
  return axios({
    url: '/act/coupon/couponBatchStats',
    method: 'post',
    data
  });
};

// 卡券核销数据统计
export const statsGroupByConsumeDate = (data) => {
  return axios({
    url: '/act/coupon/statsGroupByConsumeDate',
    method: 'post',
    data
  });
};

// 卡券发放数据统计
export const statsGroupByDrawDate = (data) => {
  return axios({
    url: '/act/coupon/statsGroupByDrawDate',
    method: 'post',
    data
  });
};

// 导出数据
export const exportData = (data) => {
  return axios({
    url: '/act/coupon/couponBatchExport2Excel',
    method: 'post',
    data
  });
};

// 优惠券批次列表（活动用）
export const couponBatchList = (data) => {
  return axios({
    url: '/act/coupon/couponBatchList',
    method: 'post',
    data
  });
};
