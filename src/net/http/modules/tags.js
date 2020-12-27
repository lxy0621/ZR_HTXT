/* jshint esversion: 6 */
import axios from '../axios';

// 分页查询
export const pagingTags = (data) => {
	return axios({
		url: '/tags/pagingTags',
		method: 'post',
		data
	});
};

// 批量删除
export const batchDelete = (data) => {
	return axios({
		url: '/tags/deleteTags',
		method: 'post',
		data
	});
};

// 保存数据
export const saveTags = (data) => {
	return axios({
		url: '/tags/createTags',
		method: 'post',
		data
	});
};

// 修改数据
export const updateTags = (data) => {
	return axios({
		url: '/tags/updateTags',
		method: 'post',
		data
	});
};
