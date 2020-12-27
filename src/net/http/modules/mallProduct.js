/* jshint esversion: 6 */
import axios from '../axios';

// 分页查找商品
export const pagingProducts = (data) => {
	return axios({
		url: '/mall/product/pagingProducts',
		method: 'post',
		data
	});
};

// 添加商品
export const createProduct = (data) => {
	return axios({
		url: '/mall/product/createProduct',
		method: 'post',
		data
	});
};

// 修改商品
export const updateProduct = (data) => {
	return axios({
		url: '/mall/product/updateProduct',
		method: 'post',
		data
	});
};

// 删除商品
export const deleteProducts = (data) => {
	return axios({
		url: '/mall/product/deleteProducts',
		method: 'post',
		data
	});
};

// 查询单条商品
export const getProductById = (productId) => {
	return axios({
		url: '/mall/product/getProductById/' + productId,
		method: 'post',
	});
};

// 获取商品分类
export const getCategorySelect = () => {
  return axios({
    url: '/mall/product/getCategorySelect',
    method: 'post',
  });
};

// 上架商品
export const onShelf = (productId) => {
  return axios({
    url: '/mall/product/onShelf/' + productId,
    method: 'post',
  });
};

// 下架商品
export const offShelf = (productId) => {
  return axios({
    url: '/mall/product/offShelf/' + productId,
    method: 'post',
  });
};
