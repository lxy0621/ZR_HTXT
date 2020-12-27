/* jshint esversion: 6 */
import axios from '../axios';
// 查找组织架构树
export const findOrganizationTree = (params) => {
    return axios({
        url: '/organization/findOrganizationTree',
        method: 'get',
        params
    });
};