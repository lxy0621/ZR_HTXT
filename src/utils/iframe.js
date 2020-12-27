/* jshint esversion: 6 */
/**
 * 嵌套页面IFrame模块
 */
import store from '@/store/index';
import router from '@/router';
import {baseUrl} from '@/config/net';

/**
 * 嵌套页面URL地址
 * @param {*} url
 */
export function getIFramePath(url) {
  //console.log("getIFramePath:" + url);
  let iframeUrl = '';
  if (/^iframe:.*/.test(url)) {
    iframeUrl = url.replace('iframe:', '');
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url.replace('http://', '');
    if (iframeUrl.indexOf(":") != -1) {
      iframeUrl = iframeUrl.substring(iframeUrl.lastIndexOf(":") + 1);
    }
  }
  return iframeUrl;
}

/**
 * 嵌套页面路由路径
 * @param {*} url
 */
export function getIFrameUrl(url) {
  let iframeUrl = '';
  if (/^iframe:.*/.test(url)) {
    iframeUrl = baseUrl + url.replace('iframe:', '');
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url;
  }
  return iframeUrl;
}


//对象数组的去重
export function uniqObjInArray(objarray) {
  let len = objarray.length;
  let tempJson = {};
  let res = [];
  for (let i = 0; i < len; i++) {
    //取出每一个对象
    tempJson[JSON.stringify(objarray[i])] = true;
  }
  let keyItems = Object.keys(tempJson);
  for (let j = 0; j < keyItems.length; j++) {
    res.push(JSON.parse(keyItems[j]));
  }
  return res;
}

// 关闭当前Tab
export function closeCurrentTab() {
  let mainTabs = store.state.tab.mainTabs;
  let mainTabsActiveName = store.state.tab.mainTabsActiveName;
  store.commit('updateMainTabs', mainTabs.filter(item => item.name !== mainTabsActiveName));
  if (mainTabs.length >= 1) {
    // 当前选中tab被删除
    router.push(
      {name: store.state.tab.mainTabs[store.state.tab.mainTabs.length - 1].name},
      () => {
        store.commit('updateMainTabsActiveName', store.state.tab.mainTabs[store.state.tab.mainTabs.length - 1].name);
      }
    );
  }
}

// 关闭当前Tab,并跳转到某个页面
export function closeCurrentTabAndToTab(toTabName) {
  let mainTabs = store.state.tab.mainTabs;
  let mainTabsActiveName = store.state.tab.mainTabsActiveName;
  store.commit('updateMainTabs', mainTabs.filter(item => item.name !== mainTabsActiveName));
  if (mainTabs.length >= 1) {
    // 当前选中tab被删除
    router.push(
      {name: toTabName},
      () => {
        store.commit('updateMainTabsActiveName', toTabName);
      }
    );
  }
}

// 关闭当前Tab
export function closeTabByName(name) {
  let mainTabs = store.state.tab.mainTabs;
  store.commit('updateMainTabs', mainTabs.filter(item => item.name !== name));
  if (mainTabs.length >= 1) {
    // 当前选中tab被删除
    router.push(
      {name: store.state.tab.mainTabs[store.state.tab.mainTabs.length - 1].name},
      () => {
        store.commit('updateMainTabsActiveName', store.state.tab.mainTabs[store.state.tab.mainTabs.length - 1].name);
      }
    );
  }
}
