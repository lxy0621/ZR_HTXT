/* jshint esversion: 6 */
import axios from '../axios';

// 红包批次详情
export const getRpBatch = (batchId) => {
  return axios({
    url: '/act/rp/getRpBatch/' + batchId,
    method: 'get',
  });
};

// 红包批次列表查询
export const pagingRpBatches = (data) => {
  return axios({
    url: '/act/rp/pagingRpBatches',
    method: 'post',
    data
  });
};

//红包状态统计查询
export const groupByRpBatchState = (data) => {
  return axios({
    url: '/act/rp/groupByRpBatchState',
    method: 'post',
    data
  });
};

// 新建红包批次
export const createRpBatch = (data) => {
  return axios({
    url: '/act/rp/createRpBatch',
    method: 'post',
    data
  });
};

// 编辑红包批次
export const updateRpBatch = (data) => {
  return axios({
    url: '/act/rp/updateRpBatch',
    method: 'post',
    data
  });
};

// 红包批次状态修改
export const updateRpBatchState = (data) => {
  return axios({
    url: '/act/rp/updateRpBatchState',
    method: 'post',
    data
  });
};

// 红包批次状态删除
export const deleteRpBatch = (batchId) => {
  return axios({
    url: '/act/rp/deleteRpBatch/' + batchId,
    method: 'post'
  });
};

// 卡券批次导出为Excel文件
export const exportRpBatch2Excel = (data) => {
  return axios({
    url: '/act/rp/exportRpBatch2Excel',
    method: 'post',
    data
  });
};

// 红包批次统计查询
export const rpBatchStats = (data) => {
  return axios({
    url: '/act/rp/rpBatchStats',
    method: 'post',
    data
  });
};

// 红包图表统计查询
export const redPacketStats = (data) => {
  return axios({
    url: '/act/rp/redPacketStats',
    method: 'post',
    data
  });
};

// 红包实体数据查询
export const pagingRedPackages = (data) => {
  return axios({
    url: '/act/rp/pagingRedPackages',
    method: 'post',
    data
  });
};

// 红包批次状态查询枚举
export const getRpBatchQueryState = () => {
  return axios({
    url: '/act/rp/getRpBatchQueryState',
    method: 'get'
  });
};

// 红包批次列表查询（活动用）
export const rpBatchList = (data) => {
  return axios({
    url: '/act/rp/rpBatchList',
    method: 'post',
    data
  });
};
