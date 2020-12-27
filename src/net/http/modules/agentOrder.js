/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找代记账订单
export const pagingAgentOrders = (data) => {
	return axios({
		url: '/order/agent/pagingAgentOrders',
		method: 'post',
		data
	});
};

// 查询代记账订单分组
export const findAgentOrderGroups = (data) => {
  return axios({
    url: '/order/agent/findAgentOrderGroups',
    method: 'post',
    data
  });
};

// 代记账订单完成
export const finishAgentOrder = (data) => {
  return axios({
    url: '/order/agent/finishAgentOrder',
    method: 'post',
    data
  });
};

// 代记账订单关闭
export const closeAgentOrder = (data) => {
  return axios({
    url: '/order/agent/closeAgentOrder',
    method: 'post',
    data
  });
};

// 代记账订单删除
export const deleteAgentOrder = (data) => {
  return axios({
    url: '/order/agent/deleteAgentOrder',
    method: 'post',
    data
  });
};

