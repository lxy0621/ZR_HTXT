<template>
  <div class="container">
      <!-- 头部区域 -->
      <header-bar :navTree="navTree"></header-bar>
      <!-- 主内容区域 -->
      <main-content />
  </div>
</template>

<script>
import HeaderBar from "@/views/HeaderBar"
import MainContent from "@/views/MainContent"
import {setDynamicMenuAndRoute} from '@/router'
import {menuService} from "@/service/system/MenuService.js"

export default {
  components:{
    HeaderBar,
    MainContent
  },
  data() {
    return {
      navTree : []
    }
  },
  beforeCreate() {
    let _this = this;
    menuService.loadMenu().then(function(menuData) {
      if (menuData === '该用户未分配角色') {
        _this.$notify.error({
          title: '错误',
          message: '该用户未分配角色'
        });
      } else {
        //更新菜单
        _this.navTree = menuData;
      }

      //更新路由信息
      //setDynamicMenuAndRoute(menuData);
    });
  }
};
</script>
