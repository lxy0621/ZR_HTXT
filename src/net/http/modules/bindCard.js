/* jshint esversion: 6 */
import axios from '../axios';

// 会员卡
export const memberCardList = (data) => {
	return axios({
		url: '/card/memberCardList',
		method: 'post',
		data
	});
};

// 选项卡
export const memberCardGroupData = (data) => {
	return axios({
		url: '/card/memberCardGroupData',
		method: 'post',
		data
	});
};
