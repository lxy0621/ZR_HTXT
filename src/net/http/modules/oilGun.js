/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找油枪信息
export const pagingOilGuns = (params) => {
	return axios({
		url: '/oil/gun/pagingOilGuns',
		method: 'post',
		params
	});
};

// 添加油枪
export const createOilGun = (data) => {
	return axios({
		url: '/oil/gun/createOilGun',
		method: 'post',
		data
	});
};

// 修改油枪
export const updateOilGun = (data) => {
	return axios({
		url: '/oil/gun/updateOilGun',
		method: 'post',
		data
	});
};

// 删除油枪
export const deleteOilGuns = (data) => {
	return axios({
		url: '/oil/gun/deleteOilGuns',
		method: 'post',
		data
	});
};

// 据油枪ID查询油枪信息
export const getOilGunById = (oilGunId) => {
	return axios({
		url: '/oil/gun/getOilGunById/' + oilGunId,
		method: 'post',
	});
};

// 油品类型列表
export const productSkuList = () => {
  return axios({
    url: '/oil/gun/productSkuList',
    method: 'post'
  });
};

// 油站列表
export const stationList = () => {
  return axios({
    url: '/oil/machine/stationList',
    method: 'post'
  });
};

// 油机列表
export const machineList = () => {
  return axios({
    url: '/oil/gun/machineList',
    method: 'post'
  });
};

// 根据站点id获取站点下油机信息
export const getMachineListByStationId = (stationId) => {
  return axios({
    url: '/oil/gun/getMachineListByStationId/'+stationId,
    method: 'post'
  });
};

// 根据站点ID获取油枪下拉列表
export const selectGunsByStationIds = (data) => {
  return axios({
    url: '/oil/gun/selectGunsByStationIds',
    method: 'post',
    data,
  });
}

// 根据站点id获取站点下员工信息
export const getEmployeeListByStationId = (stationId) => {
  return axios({
    url: '/oil/gun/getEmployeeListByStationId/'+stationId,
    method: 'post'
  });
};
