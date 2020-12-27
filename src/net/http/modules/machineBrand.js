/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找油机品牌信息
export const pagingMachineBrands = (data) => {
	return axios({
		url: '/machine/brand/pagingMachineBrands',
		method: 'post',
		data
	});
};

// 添加油机品牌
export const createMachineBrand = (data) => {
	return axios({
		url: '/machine/brand/createMachineBrand',
		method: 'post',
		data
	});
};

// 修改油机品牌
export const updateMachineBrand = (data) => {
	return axios({
		url: '/machine/brand/updateMachineBrand',
		method: 'post',
		data
	});
};

// 删除油机品牌
export const deleteMachineBrands = (data) => {
	return axios({
		url: '/machine/brand/deleteMachineBrands',
		method: 'post',
		data
	});
};

// 查询单条油机品牌信息
export const getMachineBrandById = (machineBrandId) => {
	return axios({
		url: '/machine/brand/getMachineBrandById/' + machineBrandId,
		method: 'post',
	});
};
