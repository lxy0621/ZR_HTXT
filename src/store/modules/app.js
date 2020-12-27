/* jshint esversion: 6 */
export default {
    state: {
        appName: "Kitty Platform", // 应用名称
        themeColor: "#404643", // 主题颜色
        menuRouteLoaded: false // 菜单和路由是否已经加载
    },
    getters: {},
    mutations: {
        setThemeColor(state, themeColor) { // 改变主题颜色
            state.oldThemeColor = state.themeColor;
            state.themeColor = themeColor;
        },
        menuRouteLoaded(state, menuRouteLoaded) { // 改变菜单和路由的加载状态
            state.menuRouteLoaded = menuRouteLoaded;
        }
    },
    actions: {}
};
