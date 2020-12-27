// 获取活动列表
export function pagingActivities(param) {
  const data = {
    'code': 200,
    'msg': null,
    'data': {
      'rows': [{
        'id': 1,
        'activityState': 1,
        'activityType': 1,
        'name': '活动1',
        'activityTime': '2020-09-01 ~ 2020-12-31',
        'userScopeType': 1,
        'activityRule': '充100反5,充500反20',
        'joins': 50,
        'creatorName': '吴彦祖',
        'createdAt': '2020-08-23 12:32:50'
      }, {
        'id': 2,
        'activityState': 2,
        'activityType': 3,
        'name': '活动1',
        'activityTime': '2020-09-01 ~ 2020-12-31',
        'userScopeType': 1,
        'activityRule': '充100反5,充500反20',
        'joins': 50,
        'creatorName': '吴彦祖',
        'createdAt': '2020-08-23 12:32:50'
      }, {
        'id': 3,
        'activityState': 3,
        'activityType': 1,
        'name': '活动1',
        'activityTime': '2020-09-01 ~ 2020-12-31',
        'userScopeType': 1,
        'activityRule': '充100反5,充500反20',
        'joins': 50,
        'creatorName': '吴彦祖',
        'createdAt': '2020-08-23 12:32:50'
      }, {
        'id': 4,
        'activityState': 4,
        'activityType': 1,
        'name': '活动1',
        'activityTime': '2020-09-01 ~ 2020-12-31',
        'userScopeType': 1,
        'activityRule': '充100反5,充500反20',
        'joins': 50,
        'creatorName': '吴彦祖',
        'createdAt': '2020-08-23 12:32:50'
      }, {
        'id': 5,
        'activityState': 3,
        'activityType': 1,
        'name': '活动1',
        'activityTime': '2020-09-01 ~ 2020-12-31',
        'userScopeType': 1,
        'activityRule': '充100反5,充500反20',
        'joins': 50,
        'creatorName': '吴彦祖',
        'createdAt': '2020-08-23 12:32:50'
      }],
      'total': 5
    }
  };
  return {
    url: 'activity/pagingActivities',
    type: 'post',
    data: data,
  };
};

// 选项卡分组数据查询
export function findActivityGroups(param) {
  const data = {
    'code': 200,
    'msg': null,
    'data': {
      'activityData': {
        'state1': 12,
        'state2': 19,
        'state3': 9,
        'state4': 5,
      }
    }
  };
  return {
    url: 'activity/findActivityGroups',
    type: 'post',
    data: data
  };
};

// 添加活动
export function addActivity(param) {
    return {
      url: 'activity/addActivity',
      type: 'post',
      data: {
        code: 200,
        success: true,
        message: '新建活动成功',
      },
    };
};

// 修改活动
export function updateActivity(param) {
  return {
    url: 'activity/updateActivity',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '修改活动成功',
    },
  };
};

// 删除活动
export function deleteActivity(activityId) {
  return {
    url: 'activity/deleteActivity',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '删除活动成功',
    },
  };
};

// 启用活动
export function enableActivity(activityId) {
  return {
    url: 'activity/enableActivity',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '启用活动成功',
    },
  };
};

// 关闭活动
export function closeActivity(activityId) {
  return {
    url: 'activity/closeActivity',
    type: 'post',
    data: {
      code: 200,
      success: true,
      message: '关闭活动成功',
    },
  };
};
