/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找油机
export const pagingOilMachines = (data) => {
	return axios({
		url: '/oil/machine/pagingOilMachines',
		method: 'post',
		data
	});
};

// 添加油机
export const createOilMachine = (data) => {
	return axios({
		url: '/oil/machine/createOilMachine',
		method: 'post',
		data
	});
};

// 修改油机
export const updateOilMachine = (data) => {
	return axios({
		url: '/oil/machine/updateOilMachine',
		method: 'post',
		data
	});
};

// 删除油机
export const deleteOilMachines = (data) => {
	return axios({
		url: '/oil/machine/deleteOilMachines',
		method: 'post',
		data
	});
};

// 据Id查询油机
export const getOilMachineById = (oilMachineId) => {
	return axios({
		url: '/oil/machine/getOilMachineById/' + oilMachineId,
		method: 'post',
	});
};

// 查找油站
export const stationList = () => {
	return axios({
		url: '/oil/machine/stationList',
		method: 'post',
	});
};

// 品牌列表
export const machineBrandList = () => {
  return axios({
    url: '/oil/machine/machineBrandList',
    method: 'post'
  });
};
