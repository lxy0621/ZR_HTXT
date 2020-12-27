<template>
  <div id="main-container" class="main-container">
    <!-- 标签页 -->
    <div class="tab-container">
      <el-tabs class="tabs" v-model="mainTabsActiveName" :closable="true" type="card" @tab-click="selectedTabHandle" @tab-remove="removeTabHandle">
        <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
          <div style="font-size:20px;width:50px;">
            <span class="el-icon-arrow-down"></span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签</el-dropdown-item>
            <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tab-pane v-for="item in mainTabs" :key="item.name" :label="item.name" :name="item.name">
          <span slot="label">
            <i class="fa fa-circle" aria-hidden="true" style="margin: 0 5px 0 -10px;font-size: 12px;"></i>
            <span class="tabs-item">{{item.name}}</span>
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="main-content">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
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
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle(tab) {
      tab = this.mainTabs.filter(item => item.name === tab.name);
      if (tab.length >= 1) {
        this.$router.push({ name: tab[0].name });
      }
    },
    // tabs, 删除tab
    removeTabHandle(tabName) {
      this.mainTabs = this.mainTabs.filter(item => item.name !== tabName);
      if (this.mainTabs.length >= 1) {
        // 当前选中tab被删除
        if (tabName === this.mainTabsActiveName) {
          this.$router.push(
            { name: this.mainTabs[this.mainTabs.length - 1].name },
            () => {
              this.mainTabsActiveName = this.$route.name;
            }
          );
        }
      } else {
        this.$router.push("/");
      }
    },
    // tabs, 关闭当前
    tabsCloseCurrentHandle() {
      this.removeTabHandle(this.mainTabsActiveName);
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle() {
      this.mainTabs = this.mainTabs.filter(
        item => item.name === this.mainTabsActiveName
      );
    },
    // tabs, 关闭全部
    tabsCloseAllHandle() {
      this.mainTabs = [];
      this.$router.push("/");
    },
    // tabs, 刷新当前
    tabsRefreshCurrentHandle() {
      var tempTabName = this.mainTabsActiveName;
      this.removeTabHandle(tempTabName);
      this.$nextTick(() => {
        this.$router.push({ name: tempTabName });
      });
    }
  }
};
</script>

<style scoped lang="scss">
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.main-container {
  position: absolute;
  top: 40px;
  left: 1px;
  right: 1px;
  bottom: 0px;
  // background: rgba(56, 5, 114, 0.5);
  .tabs-item {
    font-size: 12px;
  }
  .tabs {
    position: fixed;
    top: 40px;
    left: 0;
    right: 49px;
    padding-left: 0px;
    padding-right: 2px;
    z-index: 1020;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: rgb(255, 253, 255);
    border-color: rgba(200, 206, 206, 0.5);
    // border-left-width: 1px;
    // border-left-style: solid;
    border-bottom-width: 0px;
    border-bottom-style: solid;
  }
  .tabs-tools {
    position: fixed;
    top: 39px;
    right: 0;
    z-index: 1020;
    height: 39px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    border-color: rgba(200, 206, 206, 0.5);
    border-left-width: 1px;
    border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-top-width: 1px;
    border-top-style: solid;
    background: rgba(255, 255, 255, 1);
  }
  .tabs-tools:hover {
    background: #f6f6f6;
  }
  .main-content {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    // background: rgba(209, 212, 212, 0.5);
  }
}
.position-left {
  left: 200px;
}
</style>
