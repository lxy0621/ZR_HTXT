/* jshint esversion: 6 */
import axios from '../axios';

/*
 * 权限管理模块
 */
// 分页查询权限
export function pagingPermissions(data) {
  return axios({
    url: '/permission/pagingPermissions',
    method: 'post',
    data
  });
}

// 创建权限
export const createPermission = (data) => {
  return axios({
    url: '/permission/createPermission',
    method: 'post',
    data
  });
};

// 修改权限
export function updatePermission(data) {
  return axios({
    url: '/permission/updatePermission',
    method: 'post',
    data
  });
}

// 删除权限
export function deletePermissions(data) {
  return axios({
    url: '/permission/deletePermissions',
    method: 'post',
    data
  });
}
