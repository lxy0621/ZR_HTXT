<template>
  <div>
    <el-card>
      <machine-brands-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <machine-brands-table ref="table"></machine-brands-table>
    </el-card>
  </div>
</template>

<script>
  import MachineBrandsSearch from './components/MachineBrandsSearch';
  import MachineBrandsTable from './components/MachineBrandsTable';

  export default {
    name: "MachineBrands",
    components: {
      MachineBrandsSearch,
      MachineBrandsTable
    },
    data() {
      return {
        queryParams: {}
      };
    },
    methods: {
      searchMarketCollectRecordList(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData() {
        this.queryParams = {};
        this.$refs.table.getList(this.queryParams);
      },
    }
  };
</script>

<style lang="scss">
  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
