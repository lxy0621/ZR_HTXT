/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找收银台订单
export const pagingCashierOrders = (data) => {
	return axios({
		url: '/order/cashier/pagingCashierOrders',
		method: 'post',
		data
	});
};

// 查询收银台订单分组
export const findCashierOrderGroups = (data) => {
  return axios({
    url: '/order/cashier/findCashierOrderGroups',
    method: 'post',
    data
  });
};

// 收银台订单删除
export const deleteCashierOrder = (data) => {
  return axios({
    url: '/order/cashier/deleteCashierOrder',
    method: 'post',
    data
  });
};

