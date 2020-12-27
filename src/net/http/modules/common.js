/* jshint esversion: 6 */
import axios from '../axios';

/*
 * 公共枚举/字典数据获取
 */
// 包含"全部"的枚举
export const findEnumIncludeAll = (module, data) => {
  return axios({
    url: '/common/findEnumIncludeAll/' + module,
    method: 'post',
    data
  });
};

// 不包含"全部"的枚举
export const findEnumExcludeAll = (module, data) => {
  return axios({
    url: '/common/findEnumExcludeAll/' + module,
    method: 'post',
    data
  });
};

// 包含"全部"的字典
export const findDictIncludeAll = (data) => {
  return axios({
    url: '/common/findDictIncludeAll',
    method: 'post',
    data
  });
};

// 不包含"全部"的字典
export const findDictExcludeAll = (data) => {
  return axios({
    url: '/common/findDictExcludeAll',
    method: 'post',
    data
  });
};
