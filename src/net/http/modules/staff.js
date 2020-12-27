/* jshint esversion: 6 */
import axios from '../axios';
// 查找组织架构树
export const findStaffData = (params) => {
    return axios({
        url: '/staff/findStaffData',
        method: 'get',
        params
    });
};