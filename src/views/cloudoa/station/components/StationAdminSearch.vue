<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input
        v-model="queryParams.stationName"
        placeholder="油气站名称/简称"
        size="small"
        style="width: 100%"
      ></el-input>
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.stationState"
        placeholder="油气站状态"
        size="small"
        style="width: 100%"
      >
        <el-option v-for="item in states" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-input
        v-model="queryParams.managerName"
        placeholder="主管名称"
        size="small"
        style="width: 100%"
      ></el-input>
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.isPrintTicket"
        placeholder="是否打印小票"
        size="small"
        style="width: 100%"
      >
        <el-option v-for="item in print" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from "@/components/SearchContainer";
  import SearchContainerItem from "@/components/SearchContainerItem";

  export default {
    name: "StationAdminSearch",
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        queryParams: {
          limit: 20,
          page: 1
        },
        states: [
          {
            id: 1,
            name: "已启用"
          },
          {
            id: 0,
            name: "已停用"
          }
        ],
        print: [
          {
            id: 1,
            name: "是"
          },
          {
            id: 0,
            name: "否"
          }
        ],
        stationValue: "",
        stateValue: ""
      };
    },
    methods: {
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit("search", queryParams);
      },
      handleAllReset() {
        this.queryParams = {};
        this.$emit("reset", this.queryParams);
        this.handleDataSearch();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }
</style>
