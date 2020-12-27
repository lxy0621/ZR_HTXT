/* jshint esversion: 6 */
import axios from '../axios';

/*
 * 部门管理模块
 */
// 保存部门
export const save = (data) => {
    return axios({
        url: '/department/save',
        method: 'post',
        data
    });
};
// 修改部门
export const update = (data,id) => {
    return axios({
        url: '/department/update/'+id,
        method: 'put',
        data
    });
};
// 保存油站
export const saveStation = (data) => {
    return axios({
        url: '/department/saveStation',
        method: 'post',
        data
    });
};
// 修改油站
export const updateStation = (data,id) => {
    return axios({
        url: '/department/updateStation/'+id,
        method: 'put',
        data
    });
};
// 删除
export const delOne = (data) => {
    return axios({
        url: '/department/delete/'+data,
        method: 'delete',
    });
};
// 起用
export const enableDepartment = (id) => {
    return axios({
        url: '/department/'+id+'/enableDepartment',
        method: 'post',
    });
};
// 停用
export const disableDepartment = (id) => {
    return axios({
        url: '/department/'+id+'/disableDepartment',
        method: 'post',
    });
};
// 部门树查询
export const deptTree = (data) => {
    return axios({
        url: '/department/deptTree',
        method: 'post',
        data
    });
};
// 查询列表 - 条件查询
export const dataList = (data) => {
    return axios({
        url: '/department/dataList',
        method: 'post',
        data
    });
};

// 枚举列表
export const enumList = (params) => {
    return axios({
        url: '/department/enumList',
        method: 'get',
        params: params
    });
};

// 员工列表 -- 下拉选择使用
export const employeesList = () => {
    return axios({
        url: '/department/employeesList',
        method: 'get'
    });
};

/*
// 查询角色菜单集合
export const findRoleMenus = (params) => {
    return axios({
        url: '/role/findRoleMenus',
        method: 'get',
        params
    });
};
// 保存角色菜单集合
export const saveRoleMenus = (data) => {
    return axios({
        url: '/role/saveRoleMenus',
        method: 'post',
        data
    });
};
 */
