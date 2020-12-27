/* jshint esversion: 6 */
import axios from '../axios';

// 油站列表
export const pagingStation = (data) => {
  return axios({
    url: '/station/pagingStation',
    method: 'post',
    data
  });
};

// 油站下拉框
export const selectStations = () => {
  return axios({
    url: '/station/selectStations',
    method: 'get',
  });
};
