/* jshint esversion: 6 */
export default {
    state: {
        // 主入口标签页
        mainTabs: [{
            "id": 0,
            "name": "仪表盘",
            "url": "/",
            "icon": 'el-icon-news',
        }],
        // 当前标签页名
        mainTabsActiveName: '仪表盘',
    },
    mutations: {
        updateMainTabs(state, tabs) {
            state.mainTabs = tabs;
        },
        updateMainTabsActiveName(state, name) {
            state.mainTabsActiveName = name;
        }
    }
};
