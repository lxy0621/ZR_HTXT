<template>
  <div>
    <el-card>
      <price-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel" />
      <div class="opration-btn">
        <div>
          <button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleAdd()">添加价格</button>
        </div>
        <div>
<!--          <button type="button" v-waves class="el-button el-button&#45;&#45;default el-button&#45;&#45;small">导出数据-->
<!--          </button>-->
        </div>
      </div>
      <price-table ref="table_panel"></price-table>
    </el-card>
  </div>
</template>

<script>
  import PriceSearch from "./components/PricesSearch";
  import PriceTable from "./components/PricesTable";

  export default {
    name: "Price",
    components: {
      PriceSearch,
      PriceTable
    },
    data() {
      return {
        queryParams: {
          state: '1',
          stationIds: [],
          productId: null,
          productSkuId: null,
          startDate: null
        }
      };
    },
    methods: {
      searchMarketCollectRecordList(param) {
        if (param[1] == 'search') { // 搜索按钮查询
          this.queryParams.state = param[0].state;
          this.queryParams.stationIds = param[0].stationIds;
          this.queryParams.productId = param[0].productId;
          this.queryParams.productSkuId = param[0].productSkuId;
          this.queryParams.startDate = param[0].startDate;
          this.queryParams.endDate = param[0].endDate;
          this.queryParams.page = 1;
          this.queryParams.limit = 30;
        }

        this.$refs.table_panel.getDataList(this.queryParams);
        // debugger
      },
      // 重置
      resetAllParamsAndData(queryParams) {
        this.queryParams = {
          state: '2',
          stationIds: [],
          productId: null,
          productSkuId: null,
          endDate: null,
          startDate: null,
          page: 1,
          limit: 30,
        };
      },
      handleClick(tab, event) {
      },
      handleAdd() {
        this.$refs.table_panel.handleEdit('add');
      }
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
