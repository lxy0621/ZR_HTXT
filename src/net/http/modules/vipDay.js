/* jshint esversion: 6 */
import axios from '../axios';

// 会员日管理主页面下拉框获取
export const findEnumExcludeAll = (data) => {
  return axios({
    url: '/common/findEnumExcludeAll/activity',
    method: 'post',
    data
  });
};

// 会员日管理主页面-选项卡信息获取
export const findMemFestivalConfigGroups = (data) => {
  return axios({
    url: '/festival/findMemFestivalConfigGroups',
    method: 'post',
    data
  });
};

// 会员日管理主页面-分页查询
export const pagingActMemFestivalConfigs = (data) => {
  return axios({
    url: '/festival/pagingActMemFestivalConfigs',
    method: 'post',
    data
  });
};

// 会员日管理主页面-数据导出
export const exportMemFestivalConfigQueryData = (data) => {
  return axios({
    url: '/festival/exportMemFestivalConfigQueryData',
    method: 'post',
    data
  });
};

// 所有活动的下拉框--新建会员日有使用到
export const getActivitySelect = () => {
  return axios({
    url: '/activity/getActivitySelect',
    method: 'post'
  });
};

// 新建会员日
export const addMemFestivalConfig = (data) => {
  return axios({
    url: '/festival/addMemFestivalConfig',
    method: 'post',
    data
  });
};

// 修改会员日
export const updateMemFestivalConfig = (data) => {
  return axios({
    url: '/festival/updateMemFestivalConfig',
    method: 'post',
    data
  });
};

// 删除会员日
export const deleteMemFestivalConfig = (data) => {
  return axios({
    url: '/festival/deleteMemFestivalConfig',
    method: 'post',
    data
  });
};

//会员日状态修改
export const editMemFestivalConfigState = (data) => {
  return axios({
    url: '/festival/editMemFestivalConfigState',
    method: 'post',
    data
  });
};