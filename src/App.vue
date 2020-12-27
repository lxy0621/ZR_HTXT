<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    methods: {}
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    text-align: left;
    color: #484a4d;
    /* background:  #b6bbbb21; */
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }

  .onActiv {
    position: relative;
  }

  .onActiv:after {
    position: absolute;
    left: -1px;
    bottom: -1px;
    height: 3px;
    right: -1px;
    content: " ";
    background: #409eff;
  }

  .el-submenu__title {
    height: 42px !important;
    line-height: 42px !important;
    border-bottom-color: #404643 !important;
  }

  .search-btn-group-con-title em {
    position: absolute;
    top: 5px;
    left: 5px;
    height: 8px;
    width: 8px;
    border-radius: 4px;
    background: #fff;
  }

  .el-table .cell .el-link {
    font-size: 12px !important;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }
</style>
