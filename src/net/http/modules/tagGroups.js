/* jshint esversion: 6 */
import axios from '../axios';

// 分页查询
export const pagingTagGroups = (data) => {
	return axios({
		url: '/tagGroups/pagingTagGroups',
		method: 'post',
		data
	});
};

// 批量删除
export const batchDelete = (data) => {
	return axios({
		url: '/tagGroups/deleteTagGroups',
		method: 'post',
		data
	});
};

// 保存数据
export const saveGroups = (data) => {
	return axios({
		url: '/tagGroups/createTagGroups',
		method: 'post',
		data
	});
};

// 修改数据
export const updateTagGroups = (data) => {
	return axios({
		url: '/tagGroups/updateTagGroups',
		method: 'post',
		data
	});
};

// 启用
export const enable = (id) => {
	return axios({
		url: '/tagGroups/enableTagGroups/'+id,
		method: 'post'
	});
};

// 停用
export const disable = (id) => {
	return axios({
		url: '/tagGroups/disableTagGroups/'+id,
		method: 'post'
	});
};

// 所有有效的标签组
export const findAllGroups = () => {
	return axios({
		url: '/tagGroups/findAllGroups',
		method: 'get'
	});
};