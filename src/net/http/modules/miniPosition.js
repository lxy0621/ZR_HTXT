/* jshint esversion: 6 */
import axios from '../axios';

/*
 * 小程序推荐位
 */
// 分页查询
export const pagingRecommendPositions = (data) => {
  return axios({
    url: '/mini/recommendPosition/pagingRecommendPositions',
    method: 'post',
    data
  });
};

// 新增推荐位
export const createRecommendPosition = (data) => {
  return axios({
    url: '/mini/recommendPosition/createRecommendPosition',
    method: 'post',
    data
  });
};

// 修改推荐位
export const updateRecommendPosition = (data) => {
  return axios({
    url: '/mini/recommendPosition/updateRecommendPosition',
    method: 'post',
    data
  });
};

// 删除推荐位
export const deleteRecommendPositions = (data) => {
  return axios({
    url: '/mini/recommendPosition/deleteRecommendPositions',
    method: 'post',
    data,
  });
};

// 启用
export const enableRecommendPosition = (recommendPositionId) => {
  return axios({
    url: '/mini/recommendPosition/enableRecommendPosition/' + recommendPositionId,
    method: 'post',
  });
};

// 停用
export const disableRecommendPosition = (recommendPositionId) => {
  return axios({
    url: '/mini/recommendPosition/disableRecommendPosition/' + recommendPositionId,
    method: 'post',
  });
};

// 获取小程序AppId
export function getMiniAppSelect() {
  return axios({
    url: '/mini/recommendPosition/getMiniAppSelect',
    method: 'post',
  });
}
