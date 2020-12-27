/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找应用
export const queryApks = (data) => {
	return axios({
		url: '/system/apk/queryApks',
		method: 'post',
		data
	});
};

// 创建APK信息
export const createApk = (data) => {
  return axios({
    url: '/system/apk/createApk',
    method: 'post',
    data
  });
};

// 更新APK信息
export const updateApk = (data) => {
  return axios({
    url: '/system/apk/updateApk',
    method: 'post',
    data
  });
};

// 分页查询版本历史信息
export const queryHistApks = (data) => {
  return axios({
    url: '/system/apk/queryHistApks',
    method: 'post',
    data
  });
};

// 查询单个APK历史版本
export const getApkHistory = (id) => {
  return axios({
    url: '/system/apk/getApkHistory/' + id,
    method: 'get',
  });
};

// 查询单个APK对象信息
export const getApk = (id) => {
  return axios({
    url: '/system/apk/getApk/' + id,
    method: 'get',
  });
};

// 提交新版本信息
export const release = (data) => {
  return axios({
    url: '/system/apk/release',
    method: 'post',
    data
  });
};
