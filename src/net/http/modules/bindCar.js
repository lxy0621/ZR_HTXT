/* jshint esversion: 6 */
import axios from '../axios';

// 分页查询
export const bindCarList = (data) => {
	return axios({
		url: '/bindCar/bindCarList',
		method: 'post',
		data
	});
};

// 选项卡
export const bindCarGroupData = (data) => {
	return axios({
		url: '/bindCar/bindCarGroupData',
		method: 'post',
		data
	});
};