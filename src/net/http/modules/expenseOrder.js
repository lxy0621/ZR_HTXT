/* jshint esversion: 6 */
import axios from '../axios';

// 分页查询
export const pagingExpenseOrder = (data) => {
    return axios({
        url: '/expenseOrder/pagingExpenseOrder',
        method: 'post',
        data
    });
};

// 所有下拉列表数据
export const findAllTypeListForExpense = () => {
    return axios({
        url: '/expenseOrder/findAllTypeListForExpense',
        method: 'get'
    });
};

// 选项卡数据查询
export const expenseGroupsData = (data) => {
    return axios({
        url: '/expenseOrder/expenseGroupsData',
        method: 'post',
        data
    });
};

// 更新发票状态
export const takeTicket = (data) => {
    return axios({
        url: '/expenseOrder/takeTicket',
        method: 'post',
        data
    });
};

// 设备合账 卡片统计 - huangdi
export const searchDeviceCardData = (data) => {
    return axios({
        url: '/expenseOrder/searchDeviceCardData',
        method: 'post',
        data
    });
};

// 设备合账 分页查询 - huangdi
export const pageDeviceData = (data) => {
    return axios({
        url: '/expenseOrder/pageDeviceList',
        method: 'post',
        data
    });
};

// 导出EXCEL文件
export const expenseExport = (data) => {
    return axios({
        url: '/expenseOrder/expenseExport',
        method: 'post',
        data
    });
};

// 根据油机筛选油枪
export const getGunsNoByMachinesId = (machineId) => {
    return axios({
        url: '/expenseOrder/getGunsNoByMachinesId/' + machineId,
        method: 'post',
    });
};

// 补打小票
export const printingTicket = (data) => {
    return axios({
        url: '/expenseOrder/repairPrintTicket',
        method: 'post',
        data
    });
};

// 备注
export const saveMemo = (data) => {
  return axios({
    url: '/expenseOrder/saveMemo',
    method: 'post',
    data
  });
};
