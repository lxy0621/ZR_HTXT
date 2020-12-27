/* jshint esversion: 6 */
import axios from '../axios';

/*
 * 角色管理模块
 */
// 添加角色
export const createRole = (data) => {
  return axios({
    url: '/role/createRole',
    method: 'post',
    data
  });
};

// 修改角色
export const updateRole = (data) => {
  return axios({
    url: '/role/updateRole',
    method: 'post',
    data
  });
};

// 删除角色
export const deleteRoles = (data) => {
  return axios({
    url: '/role/deleteRoles',
    method: 'post',
    data,
  });
};

// 启用角色
export const enableRole = (roleId) => {
  return axios({
    url: '/role/enableRole/' + roleId,
    method: 'post',
  });
};

// 停用角色
export const disableRole = (roleId) => {
  return axios({
    url: '/role/disableRole/' + roleId,
    method: 'post',
  });
};

// 分页查询
export const pagingRoles = (data) => {
  return axios({
    url: '/role/pagingRoles',
    method: 'post',
    data
  });
};

// 查询角色
export const findRoles = () => {
  return axios({
    url: '/role/findRoles',
    method: 'get'
  });
}

// 获得权限树
export const getPermissionTree = () => {
  return axios({
    url: '/role/getPermissionTree',
    method: 'post',
  });
};

// 配置权限
export function configPermissions(data) {
  return axios({
    url: '/role/configPermissions',
    method: 'post',
    data
  });
}

// 获取用户已有权限
export function getRolePermissions(roleId) {
  return axios({
    url: '/role/getRolePermissions/' + roleId,
    method: 'post',
  });
}
