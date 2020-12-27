/* jshint esversion: 6 */
import Mock from 'mockjs';
import {baseUrl} from '@/config/net';
import * as login from './modules/login';
import * as user from './modules/user';
import * as menu from './modules/menu';
import * as activity from './modules/activity';
import * as coupon from './modules/coupon';
import * as apk from './modules/apk';
import * as directOrder from './modules/directOrder';
import * as cashierOrder from './modules/cashierOrder';
import * as agentOrder from './modules/agentOrder';

// 1. 开启/关闭[所有模块]拦截, 通过调[openMock参数]设置.
// 2. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 3. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
let openMock = true;
// let openMock = false
// fnCreate(login, openMock);
fnCreate(user, openMock);
fnCreate(menu, openMock);
// 活动管理
// fnCreate(activity, openMock);
// 优惠券管理
// fnCreate(coupon, openMock);
// APK
// fnCreate(apk, openMock);
// 直付订单
fnCreate(directOrder, openMock);
// 收银台订单
fnCreate(cashierOrder, openMock);
// 代记账订单
fnCreate(agentOrder, openMock);

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate(mod, isOpen = true) {
  if (isOpen) {
    for (let key in mod) {
      ((res) => {
        if (res.isOpen !== false) {
          let url = baseUrl;
          if (!url.endsWith("/")) {
            url = url + "/";
          }
          if (res.url != undefined && res.url.startsWith("/")) {
            res.url = res.url.substring(1, res.url.length);
          }
          url = url + res.url;
          Mock.mock(new RegExp(url), res.type, (opts) => {
            opts['data'] = opts.body ? JSON.parse(opts.body) : null;
            delete opts.body;
            return res.data;
          });
        }
      })(mod[key]() || {});
    }
  }
}

