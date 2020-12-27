<template>
  <div>
    <el-card>
      <order-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <div class="opration-btn">
        <div>
        </div>
      </div>
      <order-table ref="table"></order-table>
    </el-card>
  </div>
</template>

<script>
  import OrderSearch from './components/OrderSearch';
  import OrderTable from './components/OrderTable';

  export default {
    name: "Product",
    components: {
      OrderSearch,
      OrderTable
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
