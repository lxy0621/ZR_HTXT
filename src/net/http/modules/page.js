/* jshint esversion: 6 */
import axios from '../axios';

/*
 * 页面管理模块
 */
// 分页查询页面
export function pagingPages(data) {
  return axios({
    url: '/page/pagingPages',
    method: 'post',
    data
  });
}

// 创建页面
export const createPage = (data) => {
  return axios({
    url: '/page/createPage',
    method: 'post',
    data
  });
};

// 修改页面
export function updatePage(data) {
  return axios({
    url: '/page/updatePage',
    method: 'post',
    data
  });
}

// 删除页面
export function deletePages(data) {
  return axios({
    url: '/page/deletePages',
    method: 'post',
    data
  });
}
