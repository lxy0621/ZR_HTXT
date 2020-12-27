/* jshint esversion: 6 */
import axios from '../axios';

// 枚举列表
export const enumList = (params) => {
    return axios({
        url: '/rechargeApply/enumList',
        method: 'get',
        params: params
    });
};

/********* 卡片统计方法 ***********/
// 按钮统计数据 - 充值订单管理页
export const searchBtnData = (data) => {
    return axios({
        url: '/rechargeApply/searchBtnData',
        method: 'post',
        data
    });
};

/********* 分页列表方法 ***********/
// 分页查询 - 管理页
export const pageList = (data) => {
    return axios({
        url: '/rechargeApply/pageList',
        method: 'post',
        data
    });
};

export const acceptAudit = (data,id) => {
    return axios({
        url: '/rechargeApply/acceptAudit/'+id,
        method: 'put',
        data
    });
};

export const rejecAudit = (data,id) => {
    return axios({
        url: '/rechargeApply/rejecAudit/'+id,
        method: 'put',
        data
    });
};
