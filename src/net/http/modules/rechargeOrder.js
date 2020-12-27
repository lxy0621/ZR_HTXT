/* jshint esversion: 6 */
import axios from '../axios';

// 枚举列表
export const enumList = (params) => {
  return axios({
    url: '/rechargeOrder/enumList',
    method: 'get',
    params: params
  });
};

/********* 卡片统计方法 ***********/
// 按钮统计数据 - 充值订单管理页
export const searchBtnData = (data) => {
  return axios({
    url: '/rechargeOrder/searchBtnData',
    method: 'post',
    data
  });
};

// 按钮统计数据 - day
export const searchDayBtnData = (data) => {
  return axios({
    url: '/rechargeOrder/searchDayBtnData',
    method: 'post',
    data
  });
};
// 按钮统计数据 - week
export const searchWeekBtnData = (data) => {
  return axios({
    url: '/rechargeOrder/searchWeekBtnData',
    method: 'post',
    data
  });
};
// 按钮统计数据 - month
export const searchMonthBtnData = (data) => {
  return axios({
    url: '/rechargeOrder/searchMonthBtnData',
    method: 'post',
    data
  });
};
// 按钮统计数据 - quarter
export const searchQuarterBtnData = (data) => {
  return axios({
    url: '/rechargeOrder/searchQuarterBtnData',
    method: 'post',
    data
  });
};
// 按钮统计数据 - year
export const searchYearBtnData = (data) => {
  return axios({
    url: '/rechargeOrder/searchYearBtnData',
    method: 'post',
    data
  });
};

/********* 分页列表方法 ***********/
// 分页查询 - 管理页
export const pagingRechargeOrders = (data) => {
  return axios({
    url: '/rechargeOrder/pagingRechargeOrders',
    method: 'post',
    data
  });
};

// 分页查询 - day
export const pageDayList = (data) => {
  return axios({
    url: '/rechargeOrder/pageDayList',
    method: 'post',
    data
  });
};
// 分页查询 - week
export const pageWeekList = (data) => {
  return axios({
    url: '/rechargeOrder/pageWeekList',
    method: 'post',
    data
  });
};
// 分页查询 - month
export const pageMonthList = (data) => {
  return axios({
    url: '/rechargeOrder/pageMonthList',
    method: 'post',
    data
  });
};
// 分页查询 - quarter
export const pageQuarterList = (data) => {
  return axios({
    url: '/rechargeOrder/pageQuarterList',
    method: 'post',
    data
  });
};
// 分页查询 - year
export const pageYearList = (data) => {
  return axios({
    url: '/rechargeOrder/pageYearList',
    method: 'post',
    data
  });
};


/********* 财务合账 ***********/
// 按钮统计数据 - 卡片统计
export const searchDeviceBtnData = (data) => {
  return axios({
    url: '/rechargeOrder/searchDeviceBtnData',
    method: 'post',
    data
  });
};

// 分页查询 - 财务合账
export const pageDeviceList = (data) => {
  return axios({
    url: '/rechargeOrder/pageDeviceList',
    method: 'post',
    data
  });
};

// 总充值订单导出
export const rechargeOrderExport = (data) => {
  return axios({
    url: '/rechargeOrder/rechargeOrderExport',
    method: 'post',
    data
  });
};

/**
 * 各维度充值订单导出
 */
export const rechargeDimensionExport = (data) => {
  return axios({
    url: '/rechargeOrder/rechargeDimensionExport',
    method: 'post',
    data
  });
};

/**
 * 撤销充值订单
 */
export const repealRechargeOrder = (data, id) => {
  return axios({
    url: '/rechargeOrder/repealRechargeOrder/' + id,
    method: 'post',
    data
  });
};

/**
 * 退款充值订单
 */
export const refundRechargeOrder = (data, id) => {
  return axios({
    url: '/rechargeOrder/refundRechargeOrder/' + id,
    method: 'post',
    data
  });
};

/**
 * 撤销充值订单（按订单ID）
 */
export const getRepealInfoByRechargeOrderId = (rechargeOrderId) => {
  return axios({
    url: '/rechargeOrder/getRepealInfoByRechargeOrderId/' + rechargeOrderId,
    method: 'post',
  });
};

/**
 * 退款充值订单（按订单ID）
 */
export const getRefundInfoByRechargeOrderId = (rechargeOrderId) => {
  return axios({
    url: '/rechargeOrder/getRefundInfoByRechargeOrderId/' + rechargeOrderId,
    method: 'post',
  });
};
