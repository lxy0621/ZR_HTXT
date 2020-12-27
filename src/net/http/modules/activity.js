/* jshint esversion: 6 */
import axios from '../axios';

// 分页查询活动
export const pagingActivities = (data) => {
  return axios({
    url: '/activity/pagingActivities',
    method: 'post',
    data
  });
};

// 选项卡分组数据查询
export const findActivityGroups = (data) => {
  return axios({
    url: '/activity/findActivityGroups',
    method: 'post',
    data
  });
};

// 创建活动
export const addActivity = (data) => {
  return axios({
    url: '/activity/addActivity',
    method: 'post',
    data
  });
};

// 修改活动
export const updateActivity = (data) => {
  return axios({
    url: '/activity/updateActivity',
    method: 'post',
    data
  });
};

// 删除活动
export const deleteActivity = (data) => {
  return axios({
    url: '/activity/deleteActivity',
    method: 'post',
    data
  });
};

// 修改活动状态
export const editActivityState = (data) => {
  return axios({
    url: '/activity/editActivityState',
    method: 'post',
    data
  });
};

// 活动用户-下拉框
export const getUserScopeRuleSelect = () => {
  return axios({
    url: '/activity/getUserScopeRuleSelect',
    method: 'post',
  });
};

// 卡类型
export const getCardMetaSelect = () => {
  return axios({
    url: '/card/getCardMetaSelect',
    method: 'post',
  });
};

// 导出数据
export const exportData = (data) => {
  return axios({
    url: '/activity/exportActivityQueryData',
    method: 'post',
    data
  });
};

// 活动数据统计页面顶端top数据获取

export const getActDataPageTop = (data) => {
  return axios({
    url: '/activity/getActDataPageTop',
    method: 'post',
    data
  });
};

// 活动数据统计页面折线数据获取

export const getActPageDataTrend = (data) => {
  return axios({
    url: '/activity/getActPageDataTrend',
    method: 'post',
    data
  });
};

// 活动明细数据分页查询

export const pagingActDetailData = (data) => {
  return axios({
    url: '/activity/pagingActDetailData',
    method: 'post',
    data
  });
};