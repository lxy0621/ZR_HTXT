/* jshint esversion: 6 */
import axios from '../axios';

/*
 * 会员管理模块
 */
// 分页查询
export const pagingMembers = (data) => {
	return axios({
		url: '/member/pagingMembers',
		method: 'post',
		data
	});
};

// 选项卡分组数据查询
export const findMemberGroups = (data) => {
	return axios({
		url: '/member/findMemberGroups',
		method: 'post',
		data
	});
};

// 查询会员详细信息
export function getMemberInfoByMemberId(memberId) {
  return axios({
    url: '/member/getMemberInfoByMemberId/' + memberId,
    method: 'post',
  });
}

// 查询会员微信数据
export function getMemberWechatByMemberId(memberId) {
  return axios({
    url: '/member/getMemberWechatByMemberId/' + memberId,
    method: 'post',
  });
}

// 修改会员信息
export function updateMember(data) {
  return axios({
    url: '/member/updateMember',
    method: 'post',
    data
  });
}

// 会员卡数据查询
export function pageCardsByMemberId(data) {
	return axios({
		url: '/member/pageCardsByMemberId',
		method: 'post',
		data
	});
}

// 车辆绑定查询
export function pageBoundCarsByMemberId(data) {
	return axios({
		url: '/member/pageBoundCarsByMemberId',
		method: 'post',
		data
	});
}

// 消费记录查询
export function pageExpenseOrdersByMemberId(data) {
	return axios({
		url: '/member/pageExpenseOrdersByMemberId',
		method: 'post',
		data
	});
}

// 充值记录查询
export function pageRechargeOrdersByMemberId(data) {
	return axios({
		url: '/member/pageRechargeOrdersByMemberId',
		method: 'post',
		data
	});
}

// 退款记录查询
export function pageRefundOrdersByMemberId(data) {
  return axios({
    url: '/member/pageRefundOrdersByMemberId',
    method: 'post',
    data
  });
}

// 撤销记录查询
export function pageRepealOrdersByMemberId(data) {
  return axios({
    url: '/member/pageRepealOrdersByMemberId',
    method: 'post',
    data
  });
}

// 人工扣款记录查询
export function pageRebateOrdersByMemberId(data) {
  return axios({
    url: '/member/pageRebateOrdersByMemberId',
    method: 'post',
    data
  });
}

// 积分记录查询
export function pageScoreLogsByMemberId(data) {
	return axios({
		url: '/member/pageScoreLogsByMemberId',
		method: 'post',
		data
	});
}

// 绑定车辆
export function bindCar(data) {
  return axios({
    url: '/member/bindCar',
    method: 'post',
    data
  });
}

// 解绑车辆
export function unbindCar(data) {
  return axios({
    url: '/member/unbindCar',
    method: 'post',
    data
  });
}

// 获取会员卡
export function getMemberCardsByMemberId(memberId) {
  return axios({
    url: '/member/getMemberCardsByMemberId/' + memberId,
    method: 'post',
  });
}

// 人工充值
export function rechargeByManual(data) {
  return axios({
    url: '/member/rechargeByManual',
    method: 'post',
    data
  });
}

// 获得卡信息
export function getCardByCardId(cardId) {
  return axios({
    url: '/member/getCardByCardId/' + cardId,
    method: 'post',
  });
}

// 人工扣款
export function rebateByManual(data) {
  return axios({
    url: '/member/rebateByManual',
    method: 'post',
    data
  });
}

// 获得标签下拉框数据
export function getTagsSelect() {
  return axios({
    url: '/member/getTagsSelect',
    method: 'post',
  });
}

// 打印会员二维码
export function printMemberQRCode(memberId) {
  return axios({
    url: '/member/printMemberQRCode/' + memberId,
    method: 'post',
  });
}
