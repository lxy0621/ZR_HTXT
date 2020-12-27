<template>
  <div class="headbar" :style="{'background':themeColor}">
    <div class="logo">
      <img style="width:110px;margin-top: -5px;" :src="logoUrl" @click="$router.push('/')" alt />
    </div>
    <!-- 导航菜单 -->
    <span class="navbar">
      <menu-tree :menu="navTree"></menu-tree>
    </span>
    <!-- 工具栏 -->
    <span class="toolbar">
      <el-menu class="el-menu-demo" :background-color="themeColor" :text-color="themeColor" :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="6" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info">
            {{user.name}}
            <img :src="avartar" />
            <i class="fa fa-caret-down" aria-hidden="true" style="font-size: 20px;color: #fff;vertical-align: sub;margin-left: 5px;"></i>
          </span>
          <el-popover ref="popover-personal" placement="bottom-start" trigger="hover" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MenuTree from "@/components/MenuTree";
import PersonalPanel from "@/views/user/PersonalPanel";
import mock from "@/mock/index";

export default {
  components: {
    PersonalPanel,
    MenuTree
  },
  props: {
    navTree: Array
  },
  data() {
    return {
      noticeMark: 6,
      appDrawer: false,
      noticeDrawer: false,
      user: {
        name: 'admin',
        avatar: "",
        role: "超级管理员",
      },
      logoUrl: require("@/assets/logo.svg"),
      avartar: require("@/assets/login/avatar.jpg"),
      visible: false,
      _route: ""
    };
  },
  methods: {
    openWindow(url) {
      window.open(url);
    },
    // 路由操作处理
    handleRoute(route) {
      this._route = route;
      // tab标签页选中, 如果不存在则先添加
      let tab = this.mainTabs.filter(item => item.name === route.name)[0];
      if (!tab) {
        tab = {
          name: route.name,
          title: route.name,
          icon: route.meta.icon,
          url: route.url
        };
        this.mainTabs = this.mainTabs.concat(tab);
      }
      this.mainTabsActiveName = tab.name;
    }
  },
  mounted() {
    this.sysName = "Kitty Platform";
    let user = localStorage.getItem("user");
    if (user) {
      this.user.name = user;
      this.user.avatar = require("@/assets/login/avatar.jpg");
    }
  },
  watch: {
    $route: "handleRoute"
  },
  created() {
    this.handleRoute(this.$route);
  },
  computed: {
    ...mapState({
      themeColor: state => state.app.themeColor
    }),
    mainTabs: {
      get() {
        return this.$store.state.tab.mainTabs;
      },
      set(val) {
        this.$store.commit("updateMainTabs", val);
      }
    },
    mainTabsActiveName: {
      get() {
        return this.$store.state.tab.mainTabsActiveName;
      },
      set(val) {
        this.$store.commit("updateMainTabsActiveName", val);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.badge-mark {
  position: absolute;
  top: 6px;
  right: 2px;
}
.el-button {
  border: none;
}
.el-menu-item * {
  vertical-align: inherit;
}
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  height: 42px;
  line-height: 42px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 0px;
  border-left-style: solid;
}
.logo {
  width: 130px;
  height: 42px;
  line-height: 42px;
  color: #fff;
  font-size: 14px;
  padding: 6px 10px;
  box-sizing: border-box;
}
.el-menu-item {
  height: 42px !important;
  line-height: 42px !important;
  border: none !important;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.header-menu-popover {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px;
}
.hamburg,
.navbar,
.logo {
  float: left;
}
.toolbar {
  float: right;
}
.lang-item {
  font-size: 16px;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
}
.lang-item:hover {
  font-size: 18px;
  background: #b0d6ce4d;
}
.user-info {
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.user-info img {
  width: 24px;
  height: 24px;
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  float: left;
}
.badge {
  line-height: 18px;
}
.position-left {
  left: 200px;
}
.el-menu-item:hover {
  border-bottom-color: #1e9fff;
}
.drawer-title {
  margin: 0;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #f1f1f1;
}
.notice-card-content {
  display: flex;
  margin-bottom: 15px;
  i {
    margin-top: 10px;
    color: #ff6c65;
  }
}
.notice-card-content > div {
  width: 100%;
  margin-left: 10px;
  background: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px 2px #eee;
  p {
    line-height: 16px;
    margin: 5px 0;
  }
  .notice-title {
    color: #1e9fff;
    font-weight: 600;
  }
  .notice-date {
    color: #999;
  }
}
</style>
<style>
.el-drawer__body {
  overflow: auto;
}
.badge-mark .el-badge__content {
  height: 14px;
  line-height: 14px;
  padding: 0 4px;
}
</style>

