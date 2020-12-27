/* jshint esversion: 6 */
import axios from '../axios';

// 分页查询广告图
export const pagingBanners = (data) => {
  return axios({
    url: '/mini/banner/pagingBanners',
    method: 'post',
    data
  });
};

// 创建广告图
export const createBanner = (data) => {
  return axios({
    url: '/mini/banner/createBanner',
    method: 'post',
    data
  });
};

// 修改广告图
export const updateBanner = (data) => {
  return axios({
    url: '/mini/banner/updateBanner',
    method: 'post',
    data
  });
};


// 删除广告图
export const deleteBanners = (data) => {
  return axios({
    url: '/mini/banner/deleteBanners',
    method: 'post',
    data,
  });
};

// 启用
export const enableBanner = (bannerId) => {
  return axios({
    url: '/mini/banner/enableBanner/' + bannerId,
    method: 'post',
  });
};

// 停用
export const disableBanner = (bannerId) => {
  return axios({
    url: '/mini/banner/disableBanner/' + bannerId,
    method: 'post',
  });
};
