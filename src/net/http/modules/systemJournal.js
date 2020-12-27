/* jshint esversion: 6 */
import axios from '../axios';

//中台系统日志
export const ZTJournal = (data) => {
    return axios({
        url: '/log/pagingAdminLog',
        method: 'post',
        data
    });
};
//小程序日志
export const XCXJournal = (data) => {
    return axios({
        url: '/log/pagingMiniLog',
        method: 'post',
        data
    });
};
//POS日志
export const POSJournal = (data) => {
    return axios({
        url: '/log/pagingPosLog',
        method: 'post',
        data
    });
};
//员工操作日志
// export const ZTJournal = (data) => {};