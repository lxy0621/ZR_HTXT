/* jshint esversion: 6 */
import axios from '../axios';

// 保存
export const getAllStation = () => {
	return axios({
		url: '/dashboard/getAllStation',
		method: 'get'
	});
};

// 保存
export const topData = () => {
	return axios({
		url: '/dashboard/topData',
		method: 'post'
	});
};


//仪表盘下面图表数据
export const getEchertData =(data)=>{
  return axios ({
    url:'/dashboard/getStatsTrend',
    method:'post',
    data
  });
};
