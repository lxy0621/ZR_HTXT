/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找直付订单
export const pagingDirectOrders = (data) => {
	return axios({
		url: '/order/direct/pagingDirectOrders',
		method: 'post',
		data
	});
};

// 查询直付订单分组
export const findDirectOrderGroups = (data) => {
  return axios({
    url: '/order/direct/findDirectOrderGroups',
    method: 'post',
    data
  });
};

// 直付订单退款
export const refundDirectOrder = (data) => {
  return axios({
    url: '/order/direct/refundDirectOrder',
    method: 'post',
    data
  });
};

// 直付订单删除
export const deleteDirectOrder = (data) => {
  return axios({
    url: '/order/direct/deleteDirectOrder',
    method: 'post',
    data
  });
};

