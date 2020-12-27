/* jshint esversion: 6 */
import axios from '../axios';

//分页查找小票机
export const ticketMachineList = (data) => {
    return axios({
        url: '/station/printer/pagingTicketPrinter',
        method: 'post',
        data
    });
};

//新增 / 修改小票机
export const editTicketMachine = (data) => {
    return axios({
        url: '/station/printer/updateTicketPrinter',
        method: 'post',
        data
    });
};
//启用 / 禁用小票机
export const enabled = (data) => {
    return axios({
        url: '/station/printer/updateTicketPrinterEnabled',
        method: 'post',
        data
    });
};
//删除
export const machineDelete = (id) => {
        return axios({
            url: '/station/printer/deleteTicketPrinter/' + id,
            method: 'post'
        })
    }
    //查询
export const getTicketPrinterQueryEnums = () => {
    return axios({
        url: '/station/printer/getTicketPrinterQueryEnums',
        method: 'post'
    })
}