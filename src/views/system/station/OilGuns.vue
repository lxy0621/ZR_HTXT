<template>
  <div>
    <el-card>
      <oil-guns-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <oil-guns-table ref="table"></oil-guns-table>
    </el-card>
  </div>
</template>

<script>
  import OilGunsSearch from './components/OilGunsSearch';
  import OilGunsTable from './components/OilGunsTable';

  export default {
    name: "OilGuns",
    components: {
      OilGunsSearch,
      OilGunsTable
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
