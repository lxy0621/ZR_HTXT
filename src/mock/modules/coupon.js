// 获取优惠券列表
export function pagingCoupons(param) {
  const data = {
    'code': 200,
    'msg': null,
    'data': {
      'rows': [{
        'id': 1,
        'state': '1',
        'stateDisplay': '待开启',
        'batchId': 10,
        'batchName': '批次1',
        'name': '优惠券1',
        'couponType': 1,
        'couponTypeDisplay': '满减券',
        'money': 200,
        'dateRangeTypeDisplay': '2020-09-01至2020-12-31',
        'consumeMoneyDisplay': '消费满500元',
        'remainCount': 90,
        'usedCount': 120,
        'totalCount': 210,
        'consumeCount': 1,
        'skuNameDisplay': ['CNG', '92#汽油'],
        'creatorName': '吴彦祖',
        'createdAt': '2020-08-23 12:32:50',
        'updatorName': '毛晓彤',
        'updatedAt': '2020-11-25 11:28:50',
      }, {
        'id': 2,
        'state': '2',
        'batchId': 10,
        'batchName': '批次1',
        'stateDisplay': '启用中',
        'name': '优惠券2',
        'couponType': 1,
        'couponTypeDisplay': '满减券',
        'money': 600,
        'dateRangeTypeDisplay': '2020-10-01至2020-10-07',
        'consumeMoneyDisplay': '消费满1200元',
        'remainCount': 100,
        'usedCount': 120,
        'totalCount': 220,
        'consumeCount': 1,
        'skuNameDisplay': ['92#汽油'],
        'creatorName': '吴彦祖',
        'createdAt': '2020-09-23 12:32:50',
        'updatorName': '贾静雯',
        'updatedAt': '2020-11-25 11:28:50',
      }, {
        'id': 3,
        'state': '3',
        'batchId': 10,
        'batchName': '批次1',
        'stateDisplay': '已关闭',
        'name': '优惠券3',
        'couponType': 1,
        'couponTypeDisplay': '满减券',
        'money': 500,
        'dateRangeTypeDisplay': '2020-11-01至2020-11-31',
        'consumeMoneyDisplay': '消费满800元',
        'remainCount': 1000,
        'usedCount': 120,
        'totalCount': 1120,
        'consumeCount': 10,
        'skuNameDisplay': ['-35#柴油', '92#汽油'],
        'creatorName': '吴彦祖',
        'createdAt': '2020-10-23 12:32:50',
        'updatorName': '周杰伦',
        'updatedAt': '2020-11-25 11:28:50',
      }, {
        'id': 4,
        'state': '4',
        'batchId': 10,
        'batchName': '批次1',
        'stateDisplay': '已结束',
        'name': '优惠券4',
        'couponType': 1,
        'couponTypeDisplay': '满减券',
        'money': 600,
        'dateRangeTypeDisplay': '2020-12-01至2020-12-31',
        'consumeMoneyDisplay': '消费满500元',
        'remainCount': 10,
        'usedCount': 10,
        'totalCount': 20,
        'consumeCount': 8,
        'skuNameDisplay': ['0#柴油', '92#汽油'],
        'creatorName': '吴彦祖',
        'createdAt': '2020-11-23 12:32:50',
        'updatorName': '刘德华',
        'updatedAt': '2020-11-25 11:28:50',
      }],
      'total': 4
    }
  };
  return {
    url: 'coupon/pagingCoupons',
    type: 'post',
    data: data,
  };
};

// 选项卡分组数据查询
export function findCouponGroups(param) {
  const data = {
    'code': 200,
    'msg': null,
    'data': {
      'total': 12,
      'couponState': {
        'TO_BEGIN': 99,
        'ONGOING': 1,
        'EXPIRED': 4,
        'CLOSED': 5,
      },
      'couponType': {
        'REDUCE': 12,
      }
    }
  };
  return {
    url: 'coupon/findCouponGroups',
    type: 'post',
    data: data
  };
};

// 添加优惠券
export function addCoupon(param) {
    return {
      url: 'coupon/addCoupon',
      type: 'post',
      data: {
        code: 200,
        success: true,
        message: '新建优惠券成功',
      },
    };
};

// 修改优惠券
export function updateCoupon(param) {
  return {
    url: 'coupon/updateCoupon',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '修改优惠券成功',
    },
  };
};

// 删除优惠券
export function deleteCoupon(couponId) {
  return {
    url: 'coupon/deleteCoupon',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '删除优惠券成功',
    },
  };
};

// 修改优惠券状态
export function editCouponState(param) {
  return {
    url: 'coupon/editCouponState',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '关闭优惠券成功',
    },
  };
};
