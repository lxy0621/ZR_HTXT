/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找员工信息
export const pagingEmployees = (data) => {
	return axios({
		url: '/org/employee/pagingEmployees',
		method: 'post',
		data
	});
};

// 据部门ID分页查找员工信息
export const pagingEmployeesByDepartmentId = (data) => {
	return axios({
		url: '/org/employee/pagingEmployeesByDepartmentId',
		method: 'post',
		data
	});
};

// 员工信息保存
export const createEmployee = (data) => {
	return axios({
		url: '/org/employee/createEmployee',
		method: 'post',
		data
	});
};

// 员工信息修改
export const updateEmployee = (data) => {
	return axios({
		url: '/org/employee/updateEmployee',
		method: 'post',
		data
	});
};

// 员工信息删除
export const deleteEmployees = (data) => {
	return axios({
		url: '/org/employee/deleteEmployees',
		method: 'post',
		data
	});
};

// 重置密码
export const resetPassword = (data) => {
  return axios({
    url: '/org/employee/resetPassword',
    method: 'post',
    data
  });
};

// 开通账户信息
export const openEmployeeAccount = (data) => {
	return axios({
		url: '/org/employee/openEmployeeAccount',
		method: 'post',
		data
	});
};

// 查询单条员工信息
export const getEmployeeById = (id) => {
	return axios({
		url: '/org/employee/getEmployeeById/'+id,
		method: 'post'
	});
};

// 获取部门树
export const departmentTree = (data) => {
	return axios({
		url: '/department/deptTree',
		method: 'post',
		data
	});
};
