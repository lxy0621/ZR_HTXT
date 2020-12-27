// 获取直付订单列表
export function pagingDirectOrders(param) {
  const data = {
    'code': 200,
    'msg': null,
    'data': {
      'rows': [{
        'id': 1,
        'orderStateDesc': '进行中',
        'outTradeNo': '20201125-142356',
        'stationName': '中国燃气东风路CNG加气站',
        'gunNo': '1号枪',
        'productSkuName': 'CNG',
        'operatorName': '张小斐',
        'employeeName': '吴彦祖',
        'money': '59.8',
        'createdAt': '2020-11-23 12:32:50',
        'tradeFlowNo': '1927172-91982',
        'payResultDesc': '进行中',
        'tradedAt': null,
        'refundStateDesc': '无',
        'refundedAt': null,
      }, {
        'id': 2,
        'orderStateDesc': '已完成',
        'outTradeNo': '20201123-113226',
        'stationName': '中国燃气东风路CNG加气站',
        'gunNo': '2号枪',
        'productSkuName': 'CNG',
        'operatorName': '王菲',
        'employeeName': '成龙',
        'money': '35.69',
        'createdAt': '2020-11-23 11:23:50',
        'tradeFlowNo': '1927172-91122',
        'payResultDesc': '已完成',
        'tradedAt': null,
        'refundStateDesc': '无',
        'refundAt': null,
      }, {
        'id': 3,
        'orderStateDesc': '已关闭',
        'outTradeNo': '20201122-101226',
        'stationName': '中国燃气东风路CNG加气站',
        'gunNo': '2号枪',
        'productSkuName': 'CNG',
        'operatorName': '小毛',
        'employeeName': '成龙',
        'money': '55.69',
        'createdAt': '2020-11-23 11:23:50',
        'tradeFlowNo': '1927172-91122',
        'payResultDesc': '支付失败',
        'tradedAt': null,
        'refundStateDesc': '无',
        'refundAt': null,
      }],
      'total': 3
    }
  };
  return {
    url: '/order/direct/pagingDirectOrders',
    type: 'post',
    data: data,
  };
};

// 选项卡分组数据查询
export function findDirectOrderGroups(param) {
  const data = {
    'code': 200,
    'msg': null,
    'data': {
      'total': 35,
      'orderState': {
        'RUNNING': 12,
        'FINISHED': 19,
        'CLOSED': 9,
      },
      'payState': {
        'RUNNING': 6,
        'FINISHED': 5,
        'CLOSED': 12,
      }
    }
  };
  return {
    url: '/order/direct/findDirectOrderGroups',
    type: 'post',
    data: data
  };
};

// 直付订单退款
export function refundDirectOrder(param) {
  return {
    url: '/order/direct/refundDirectOrder',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '订单退款成功',
    },
  };
};

// 直付订单删除
export function deleteDirectOrder(param) {
  return {
    url: '/order/direct/deleteDirectOrder',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '订单删除成功',
    },
  };
};
