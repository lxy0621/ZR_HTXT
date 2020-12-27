<template>
  <div>
    <el-card class="container">
      <cars-search @search="bindCarList" @rest="bindCarList"></cars-search>
      <cars-search-btn-group ref="search" @search="bindCarListFromGroups"></cars-search-btn-group>
      <el-row class="static">
        <el-button style="float:right" size="small">导出数据</el-button>
      </el-row>
      <cars-table ref="table"></cars-table>
    </el-card>
  </div>
</template>

<script>
  import CarsSearch from './components/CarsSearch';
  import CarsSearchBtnGroup from './components/CarsSearchBtnGroup';
  import CarsTable from './components/CarsTable';

  export default {
    name: 'Cars',
    components: {
      CarsSearch,
      CarsSearchBtnGroup,
      CarsTable
    },
    data() {
      return {};
    },
    methods: {
      bindCarList(queryParams) {
        this.$refs.search.onActive = [null, null];
        this.$refs.search.totalActive = true;
        this.$refs.table.bindCarList(queryParams);
        this.$refs.search.bindCarGroupData(queryParams);
      },
      bindCarListFromGroups(queryParams) {
        this.$refs.table.bindCarList(queryParams);
      }
    }
  };
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .search-value {
    width: 100%;
  }

  .search-button {
    margin-top: 10px;
  }

  .static {
    margin-bottom: 10px;
  }

  .el-button {
    width: 80px;
    height: 32px;
    text-align: center;
  }
</style>
