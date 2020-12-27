/* jshint esversion: 6 */
import axios from '../axios';

// 枚举列表
export const enumList = (params) => {
  return axios({
    url: '/productPrice/enumList',
    method: 'get',
    params: params
  });
};

// 查询所有可用的加油站信息
export const queryAllStations = () => {
  return axios({
    url: '/productPrice/queryAllStations',
    method: 'get'
  });
};

// 所有下拉列表数据
export const findAllProducts = () => {
  return axios({
    url: '/productPrice/findAllProducts',
    method: 'get'
  });
};

// 查询所有油品 -- 根据产品ID
export const findProductSkuByProduct = (productId) => {
  return axios({
    url: '/productPrice/findSkuByProduct/' + productId,
    method: 'post'
  });
};

/********* 分页列表方法 ***********/
// 分页查询 - 管理页
export const pageList = (data) => {
  return axios({
    url: '/productPrice/pageList',
    method: 'post',
    data
  });
};

export const deletePrice = (id) => {
  return axios({
    url: '/productPrice/deletePrice/' + id,
    method: 'delete'
  });
}

export const usePrice = (id) => {
  return axios({
    url: '/productPrice/usePrice/' + id,
    method: 'post'
  });
};

export const unUsing = (id) => {
  return axios({
    url: '/productPrice/unUsing/' + id,
    method: 'post'
  });
};


export const updData = (data, id) => {
  return axios({
    url: '/productPrice/updData/' + id,
    method: 'put',
    data
  });
}

export const saveData = (data) => {
  return axios({
    url: '/productPrice/saveData',
    method: 'post',
    data
  });
}
