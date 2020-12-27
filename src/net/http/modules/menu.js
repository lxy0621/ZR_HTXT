/* jshint esversion: 6 */
import axios from '../axios';

/*
 * 菜单管理模块
 */
// 查询菜单树
export function findMenuTree() {
  return axios({
    url: '/menu/findMenuTree',
    method: 'post',
  });
}

// 创建菜单
export const createMenu = (data) => {
  return axios({
    url: '/menu/createMenu',
    method: 'post',
    data
  });
};

// 修改菜单
export function updateMenu(data) {
  return axios({
    url: '/menu/updateMenu',
    method: 'post',
    data
  });
}

// 删除菜单
export function deleteMenu(menuId) {
  return axios({
    url: '/menu/deleteMenu/' + menuId,
    method: 'post',
  });
}

// 查找导航菜单树
export const findNavTree = () => {
  return axios({
    url: '/menu/findNavTree',
    method: 'get',
  });
};
