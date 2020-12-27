/* jshint esversion: 6 */
/*
 * 菜单管理模块
 */
// {
//   'id': 2,
//   'name': '首页',
//   'url': '/',
//   'icon': 'el-icon-news',
//   'children': []
// },

// 获取导航菜单树
export function findNavTree() {
  const navTreeData = {
    'code': 200,
    'msg': null,
    'data': [{
      'id': 2,
      'name': '交易中心',
      'url': null,
      'perm': 'index:trans',
      'children': [{
        'id': 201,
        'name': '会员充值',
        'url': null,
        'children': [{
          'id': 20101,
          'name': '充值订单管理',
          'url': '/trade/recharge/orders/management',
          'weight': 3
        }, {
          'id': 20102,
          'name': '人工充值审核表',
          'url': '/trade/recharge/orders/manualRecharge',
          'weight': 3
        }]
      }, {
        'id': 202,
        'name': '会员消费',
        'url': null,
        'children': [{
          'id': 2020101,
          'name': '消费订单总表',
          'url': '/trade/expense/orders/expenseTotal',
          'weight': 3
        }]
      }, {
        'id': 204,
        'name': '非会员消费',
        'url': null,
        'children': [{
          'id': '20401',
          'name': '直付订单总表',
          'url': '/trade/nonmember/direct/directOrder'
        }, {
          'id': '20402',
          'name': '代收款订单总表',
          'url': '/trade/nonmember/agent/agentOrder'
        }, {
          'id': '20403',
          'name': '收银台订单总表',
          'url': '/trade/nonmember/cashier/cashierOrder'
        }]
      }, {
        'id': 203,
        'name': '产品管理',
        'url': null,
        'children': [{
          'id': 20301,
          'name': '调整价格',
          'url': '/trade/product/prices',
        }]
      }],
    }, {
      'id': 3,
      'name': '会员中心',
      'url': null,
      'children': [{
        'id': 301,
        'name': '电子会员管理',
        'url': null,
        'children': [{
          'id': 30101,
          'name': '会员总表信息',
          'url': '/member/electron/members',
        }]
      }, {
        'id': 302,
        'name': '综合查询',
        'url': null,
        'children': [{
          'id': 30201,
          'name': '车辆绑定查询',
          'url': '/member/integration/cars',
        }, {
          'id': 30202,
          'name': '会员卡查询',
          'url': '/member/integration/cards',
        }]
      },
        /*{
               'id': 303,
               'name': '数据分析',
               'url': null,
               'children': [{
                 'id': 30301,
                 'name': '按注册时间分析',
                 'url': '/member/analysis/regDate',
               }, {
                 'id': 30302,
                 'name': '按会员类型分析',
                 'url': '/member/analysis/mbrType',
               }]
             }*/
      ]
    }, {
      'id': 4,
      'name': '营销中心',
      'url': null,
      'children': [{
        'id': 401,
        'name': '小程序管理',
        'url': null,
        'children': [{
          'id': 40101,
          'name': '推荐位管理',
          'url': '/marketing/mini/recommendPositions',
        },
          /*{
                   'id': 40102,
                   'name': '模块设置',
                   'url': '/marketing/mini/modules',
                 },*/
          {
            'id': 40103,
            'name': '配置记录',
            'url': '/marketing/mini/banners',
          }
        ]
      },
        {
          'id': 402,
          'name': '营销工具管理',
          'url': null,
          'children': [{
            'id': 40201,
            'name': '优惠券管理',
            'url': '/marketing/tools/CouponAdmin',
          }, {
            'id': 40204,
            'name': '新建优惠券',
            'url': '/marketing/tools/CouponAdd',
            'visible': 0,
          }, {
            'id': 40205,
            'name': '修改优惠券',
            'url': '/marketing/tools/CouponUpdate',
            'visible': 0,
          }, {
            'id': 40206,
            'name': '优惠券数据',
            'url': '/marketing/tools/CouponData',
            'visible': 0,
          }, {
            'id': 40207,
            'name': '红包管理',
            'url': '/marketing/tools/PacketAdmin',
          }, {
            'id': 40208,
            'name': '红包数据',
            'url': '/marketing/tools/PacketData',
            'visible': 0,
          },
            {
              'id': 40209,
              'name': '修改红包',
              'url': '/marketing/tools/PacketUpdate',
              'visible': 0,
            },
            {
              'id': 40210,
              'name': '新增红包',
              'url': '/marketing/tools/PacketAdd',
              'visible': 0,
            }]
        },
        {
          'id': 403,
          'name': '营销活动管理',
          'url': null,
          'children': [{
            'id': 40301,
            'name': '活动管理',
            'url': '/marketing/activity/ActivityAdmin',
          }, {
            'id': 40302,
            'name': '新建活动',
            'url': '/marketing/activity/ActivityAdd',
            'visible': 0,
          }, {
            'id': 40303,
            'name': '修改活动',
            'url': '/marketing/activity/ActivityUpdate',
            'visible': 0,
          }, {
            'id': 40305,
            'name': '活动数据',
            'url': '/marketing/activity/ActivityData',
            'visible': 0,
          }, {
            'id': 40306,
            'name': '会员日管理',
            'url': '/marketing/activity/VipdayAdmin',
          }, {
            'id': 40307,
            'name': '新建会员日',
            'url': '/marketing/activity/VipdayAdd',
            'visible': 0,
          }, {
            'id': 40308,
            'name': '修改会员日',
            'url': '/marketing/activity/VipdayUpdate',
            'visible': 0,
          }
          ]
        },
        {
          'id': 404,
          'name': '积分商城',
          'url': null,
          'children': [{
            'id': '40401',
            'name': '商城商品',
            'url': '/marketing/mall/product',
          }, {
            'id': '40402',
            'name': '积分兑换订单',
            'url': 'marketing/mall/order',
          }]
        }
      ]
    }, {
      'id': 5,
      'name': '财务中心',
      'url': null,
      'children': [{
        'id': 501,
        'name': '配置管理',
        'url': null,
        'children': [{
          'id': 50101,
          'name': '支付配置管理',
          'url': '/finance/config/pay',
        }]
      }, {
        'id': 502,
        'name': '财务核账',
        'url': null,
        'children': [{
          'id': 50201,
          'name': '设备核账',
          'url': '/finance/check/device',
        }, {
          'id': 50202,
          'name': '充值交易流水',
          'url': '/finance/check/recharge',
        }]
      },
        /*{
               'id': 503,
               'name': '财务报表',
               'url': null,
             }*/
      ]
    }, {
      'id': 8,
      'name': '数据中心',
      'url': null,
      'children': [{
        'id': 801,
        'name': '充值报表',
        'url': null,
        'children': [{
          'id': 80101,
          'name': '充值订单日报',
          'url': '/trade/recharge/report/day',
          'weight': 2
        }, {
          'id': 80102,
          'name': '充值订单周报',
          'url': '/trade/recharge/report/week',
          'weight': 2
        }, {
          'id': 80103,
          'name': '充值订单月报',
          'url': '/trade/recharge/report/month',
          'weight': 2
        }, {
          'id': 80104,
          'name': '充值订单季报',
          'url': '/trade/recharge/report/quarter',
          'weight': 2
        }, {
          'id': 80105,
          'name': '充值订单年报',
          'url': '/trade/recharge/report/year',
          'weight': 2
        }],
      }, {
        'id': 802,
        'name': '消费报表',
        'url': null,
        'children': [{
          'id': 80201,
          'name': '消费订单日报',
          'url': '/trade/expense/report/day',
          'weight': 2
        }, {
          'id': 80202,
          'name': '消费订单周报',
          'url': '/trade/expense/report/week',
          'weight': 2
        }, {
          'id': 80203,
          'name': '消费订单月报',
          'url': '/trade/expense/report/month',
          'weight': 2
        }, {
          'id': 80204,
          'name': '消费订单季报',
          'url': '/trade/expense/report/quarter',
          'weight': 2
        }, {
          'id': 80205,
          'name': '消费订单年报',
          'url': '/trade/expense/report/year',
          'weight': 2
        }],
      }]
    }, {
      'id': 6,
      'name': '云办公',
      'url': null,
      'children': [{
        'id': 601,
        'name': '组织',
        'url': null,
        'children': [{
          'id': 60101,
          'name': '部门管理',
          'url': '/cloudoa/org/departments'
        }, {
          'id': 60102,
          'name': '员工管理',
          'url': '/cloudoa/org/employees'
        }, {
          'id': 60103,
          'name': '角色管理',
          'url': '/cloudoa/org/roles'
        }]
      }, {
        'id': 602,
        'name': '油气站配置',
        'url': null,
        'children': [{
          'id': 60201,
          'name': '油气站管理',
          'url': '/cloudoa/station/stationAdmin'
        }, {
          'id': 60202,
          'name': '代收二维码配置',
          'url': '/cloudoa/station/agentQRCode',
          'visible': 0,
        }]
      }]
    }, {
      'id': 7,
      'name': '系统',
      'url': null,
      'children': [{
        'id': 701,
        'name': '配置管理',
        'url': null,
        'children': [{
          'id': 70101,
          'name': '菜单管理',
          'url': '/system/config/menus'
        }]
      }, {
        'id': 702,
        'name': '油机配置',
        'url': null,
        'children': [{
          'id': 70201,
          'name': '油机管理',
          'url': '/system/station/oilMachines',
        }, {
          'id': 70202,
          'name': '油枪总表',
          'url': '/system/station/oilGuns',
        }, {
          'id': 70203,
          'name': '品牌管理',
          'url': '/system/station/machineBrands',
        }]
      }, {
        'id': 703,
        'name': 'POS管理',
        'url': null,
        'children': [{
          'id': 70301,
          'name': '设备管理',
          'url': '/system/pos/devices',
        }, {
          'id': 70302,
          'name': '设备状态',
          'url': '/system/pos/status',
        }]
      },
        {
          'id': 704,
          'name': '系统日志',
          'url': null,
          'children': [{
            'id': 70401,
            'name': 'POS日志',
            'url': '/system/logs/pos',
          }, {
            'id': 70402,
            'name': '中台日志',
            'url': '/system/logs/admin',
          }, {
            'id': 70403,
            'name': '员工操作日志',
            'url': '/system/logs/event',
          }, {
            'id': 70404,
            'name': '小程序日志',
            'url': '/system/logs/mini',
          }]
        },
        {
          'id': 705,
          'name': '标签管理',
          'url': null,
          'children': [{
            'id': 70501,
            'name': '标签组',
            'url': '/system/tag/groups'
          }, {
            'id': 70502,
            'name': '标签管理',
            'url': '/system/tag/tags'
          }]
        },
        {
          'id': 706,
          'name': '小票机配置',
          'url': null,
          'children': [{
            'id': 70601,
            'name': '小票机管理',
            'url': '/system/ticket/configure'
          }]
        },
        {
          'id': 707,
          'name': 'APK管理',
          'url': null,
          'children': [{
            'id': 70701,
            'name': '应用管理',
            'url': '/system/app/AppAdmin'
          }, {
            'id': 70705,
            'name': '创建应用',
            'url': '/system/app/AppCreate',
            'visible': 0,
          }, {
            'id': 70706,
            'name': '编辑应用',
            'url': '/system/app/AppUpdate',
            'visible': 0,
          }, {
            'id': 70702,
            'name': '发布版本',
            'url': '/system/app/ApkPublish',
            'visible': 0,
          }, {
            'id': 70703,
            'name': '编辑版本',
            'url': '/system/app/ApkEdit',
            'visible': 0,
          }, {
            'id': 70704,
            'name': '应用详情',
            'url': '/system/app/AppDetail',
            'visible': 0,
          }]
        },
        /*, {
          'id': 706,
          'name': '系统服务',
          'url': null,
          'children': [{
            'id': 70601,
            'name': '业务状态',
            'url': '/system/service/bizStatus'
          }]
        }*/
      ]
    }]
  };
  return {
    url: 'menu/findNavTree',
    type: 'get',
    data: navTreeData
  };
}

export function setParentName(data) {
  if (data == null) {
    return;
  }
  let len = data.length;
  for (let i = 0; i < len; i++) {
    let menu = data[i];
    menu.parentName = 'menu' + menu.parentId;
    if (menu.children != null) {
      setParentName(menu.children);
    }
  }
}
