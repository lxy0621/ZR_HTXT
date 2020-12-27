export function Statistics(){
  const data = {
    'code': 200,
    'msg': null,
    'data':{
      'type':'充值返现',
      'name':'活动一',
      'time':'2020-09-30',
      'user':'小程序会员',
      'state':'进行中',
      'totalNumber':138,
      'totalFreq':21,
      'totalMoney':8176,
      'totalBack':3000,
      'averMoney':99,
      'averBack':21,
      'averBack2':19
    }
  };
  return {
    url: 'activity/Statistics',
    type: 'post',
    data: data,
  };
}