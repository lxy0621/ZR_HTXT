/* jshint esversion: 6 */
import axios from '../axios';

// 查询所有可用的加油站信息
export const queryAllStations = () => {
	return axios({
		url: '/expenseReport/queryAllStations',
		method: 'get'
	});
};

// 消费订单日报数据
export const pagingOrderDayReport = (data) => {
	return axios({
		url: '/expenseReport/pagingOrderDayReport',
		method: 'post',
		data
	});
};

// 消费订单日报分组
export const findGroupOrderDayReport = (data) => {
	return axios({
		url: '/expenseReport/findGroupOrderDayReport',
		method: 'post',
		data
	});
};

// 消费订单日报导出
export const exportOrderDayReport = (data) => {
  return axios({
    url: '/expenseReport/exportOrderDayReport',
    method: 'post',
    data
  });
}

// 消费订单周报数据
export const pagingOrderWeekReport = (data) => {
  return axios({
    url: '/expenseReport/pagingOrderWeekReport',
    method: 'post',
    data
  });
};

// 消费订单周报分组
export const findGroupOrderWeekReport = (data) => {
  return axios({
    url: '/expenseReport/findGroupOrderWeekReport',
    method: 'post',
    data
  });
};

// 消费订单周报导出
export const exportOrderWeekReport = (data) => {
  return axios({
    url: '/expenseReport/exportOrderWeekReport',
    method: 'post',
    data
  });
}

// 消费订单月报数据
export const pagingOrderMonthReport = (data) => {
	return axios({
		url: '/expenseReport/pagingOrderMonthReport',
		method: 'post',
		data
	});
};

// 消费订单月报分组
export const findGroupOrderMonthReport = (data) => {
	return axios({
		url: '/expenseReport/findGroupOrderMonthReport',
		method: 'post',
		data
	});
};

// 消费订单月报导出
export const exportOrderMonthReport = (data) => {
  return axios({
    url: '/expenseReport/exportOrderMonthReport',
    method: 'post',
    data
  });
}

// 消费订单季报数据
export const pagingOrderQuarterReport = (data) => {
  return axios({
    url: '/expenseReport/pagingOrderQuarterReport',
    method: 'post',
    data
  });
};

// 消费订单季报分组
export const findGroupOrderQuarterReport = (data) => {
  return axios({
    url: '/expenseReport/findGroupOrderQuarterReport',
    method: 'post',
    data
  });
};

// 消费订单季报导出
export const exportOrderQuarterReport = (data) => {
  return axios({
    url: '/expenseReport/exportOrderQuarterReport',
    method: 'post',
    data
  });
}


// 消费订单年报数据
export const pagingOrderYearReport = (data) => {
	return axios({
		url: '/expenseReport/pagingOrderYearReport',
		method: 'post',
		data
	});
};

// 消费订单年报分组
export const findGroupOrderYearReport = (data) => {
	return axios({
		url: '/expenseReport/findGroupOrderYearReport',
		method: 'post',
		data
	});
};

// 消费订单年报导出
export const exportOrderYearReport = (data) => {
  return axios({
    url: '/expenseReport/exportOrderYearReport',
    method: 'post',
    data
  });
}
