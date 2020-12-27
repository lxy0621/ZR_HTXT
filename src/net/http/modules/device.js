/* jshint esversion: 6 */
import axios from '../axios';

// 分页查询
export const pagingDevices = (data) => {
  return axios({
    url: '/pos/device/pagingDevices',
    method: 'post',
    data
  });
};

// 添加设备
export const createDevice = (data) => {
  return axios({
    url: '/pos/device/createDevice',
    method: 'post',
    data
  });
};

// 修改设备
export const updateDevice = (data) => {
  return axios({
    url: '/pos/device/updateDevice',
    method: 'post',
    data
  });
};

// 删除设备
export const deleteDevices = (data) => {
  return axios({
    url: '/pos/device/deleteDevices',
    method: 'post',
    data
  });
};

// 启用设备
export const enableDevice = (deviceId) => {
  return axios({
    url: '/pos/device/enableDevice/' + deviceId,
    method: 'post'
  });
};

// 停用设备
export const disableDevice = (deviceId) => {
  return axios({
    url: '/pos/device/disableDevice/' + deviceId,
    method: 'post'
  });
};

// 分页查询
export const pagingDeviceStatus = (data) => {
  return axios({
    url: '/pos/device/pagingDeviceStatus',
    method: 'post',
    data
  });
};
