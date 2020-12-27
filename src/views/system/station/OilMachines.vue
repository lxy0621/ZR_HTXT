<template>
  <div>
    <el-card>
      <oil-machines-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <oil-machines-table ref="table"></oil-machines-table>
    </el-card>
  </div>
</template>

<script>
  import OilMachinesSearch from './components/OilMachinesSearch';
  import OilMachinesTable from './components/OilMachinesTable';

  export default {
    name: "OilMachines",
    components: {
      OilMachinesSearch,
      OilMachinesTable
    },
    data() {
      return {
        queryParams: {
        }
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
