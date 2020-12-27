/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找订单
export const pagingOrders = (data) => {
	return axios({
		url: '/mall/order/pagingOrders',
		method: 'post',
		data
	});
};

// 查询订单商品
export const pagingOrderProducts = (data) => {
	return axios({
		url: '/mall/order/pagingOrderProducts',
		method: 'post',
    data
	});
};

// 保存订单备注
export const saveMallOrderMemo = (data) => {
  return axios({
    url: '/mall/order/saveMallOrderMemo',
    method: 'post',
    data
  });
};
