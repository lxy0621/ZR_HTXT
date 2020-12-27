/* jshint esversion: 6 */
import axios from '../axios';

// 枚举列表
export const enumList = (params) => {
    return axios({
        url: '/payChannelConfig/enumList',
        method: 'get',
        params: params
    });
};

// 分页查询
export const pageList = (data) => {
    return axios({
        url: '/payChannelConfig/pageList',
        method: 'post',
        data
    });
};

// 保存
export const save = (data) => {
    return axios({
        url: '/payChannelConfig/save',
        method: 'post',
        data
    });
};
// 修改
export const update = (data,id) => {
    return axios({
        url: '/payChannelConfig/update/'+id,
        method: 'put',
        data
    });
};
// 删除
export const delOne = (data) => {
    return axios({
        url: '/payChannelConfig/delete/'+data,
        method: 'delete',
    });
};
// 起用
export const enableConfig = (id) => {
    return axios({
        url: '/payChannelConfig/'+id+'/enableConfig',
        method: 'post',
    });
};
// 停用
export const disableConfig = (id) => {
    return axios({
        url: '/payChannelConfig/'+id+'/disableConfig',
        method: 'post',
    });
};
