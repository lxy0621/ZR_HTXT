<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#404643"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-submenu v-for="(item, temp) in menu" :index="''+item.id" :key="item.id">
        <template slot="title">{{ item.name }}</template>
        <el-submenu v-for="nav in item.children" :index="''+nav.id" :key="nav.id">
          <template slot="title">{{ nav.name }}</template>
          <el-menu-item
            v-for="navItem in nav.children"
            index="''+navItem.id"
            :key="navItem.id"
            :span="6"
            @click="handleRoute(navItem)"
            v-if="navItem.visible !== 0"
          >
            {{ navItem.name }}
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import {getIFrameUrl, getIFramePath, uniqObjInArray} from "@/utils/iframe";

  export default {
    name: "MenuTree",
    props: {
      menu: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        activeIndex: ''+1,
        clientHeight: "",
        visibleArr: [false, false, false, false, false]
      };
    },
    computed: {
      ...mapState({
        themeColor: state => state.app.themeColor
      })
    },
    methods: {
      // 重新计算窗口高度
      changeFixed(clientHeight) {
        if (this.$refs.page) {
          this.$refs.page.style.minHeight = clientHeight - 100 + "px";
        }
      },
      handleRoute(menu) {
        for (var i = 0; i < this.visibleArr.length; i++) {
          this.$set(this.visibleArr, i, false);
        }
        // 如果是嵌套页面，转换成iframe的path
        let path = getIFramePath(menu.url);
        if (!path) {
          path = menu.url;
        }
        // 通过菜单URL跳转至指定路由
        this.$router.push("/" + path);
      }
    },
    watch: {
      clientHeight() {
        this.changeFixed(this.clientHeight);
      }
    },
    mounted() {
      //获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}` - 100;
      let that = this;
      window.onresize = function () {
        this.clientHeight = `${document.documentElement.clientHeight}`;
        if (that.$refs.page) {
          that.$refs.page.style.minHeight = clientHeight - 100 + "px";
        }
      };
    }
  };
</script>
<style lang="scss">
  .el-menu-demo {
    height: 42px;
  }

  .el-menu-demo .el-submenu {
    height: 42px;
  }
</style>


