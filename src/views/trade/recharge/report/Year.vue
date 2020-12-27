<template>
  <div>
    <el-card>
      <year-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <year-search-btn-groups @search="searchMarketCollectRecordList" ref="groups_panel"></year-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="rechargeDimensionExport">导出数据
          </button>
        </div>
      </div>
      <year-table ref='table_panel'></year-table>
    </el-card>
  </div>
</template>

<script>
  import YearSearch from "./components/YearSearch";
  import YearTable from "./components/YearTable";
  import YearSearchBtnGroups from "./components/YearSearchBtnGroups";

  export default {
    name: "Year",
    components: {
      YearSearch,
      YearTable,
      YearSearchBtnGroups,
    },
    data() {
      return {
        queryParams: {
          stations: null, // 油站
          moneyType: 1, // 金额类型

          rechargeDateStart: null,
          rechargeDateEnd: null,
          minChargeMoney: null,
          maxChargeMoney: null
        }
      };
    },
    methods: {
      searchMarketCollectRecordList(queryParams) {
        this.queryParams.rechargeDateStart = queryParams.rechargeDateStart;
        this.queryParams.rechargeDateEnd = queryParams.rechargeDateEnd;
        this.queryParams.station = queryParams.station;
        this.queryParams.moneyType = queryParams.moneyType;
        this.queryParams.minChargeMoney = queryParams.minChargeMoney;
        this.queryParams.maxChargeMoney = queryParams.maxChargeMoney;
        this.queryParams.page = 1;
        this.queryParams.limit = 30;
        this.$refs.table_panel.getDataList(this.queryParams);
        this.$refs.groups_panel.initsearchBtnData(this.queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.queryParams = {
          station: null, // 油站
          moneyType: null, // 金额类型
          rechargeDateStart: null,
          rechargeDateEnd: null,
          minChargeMoney: null,
          maxChargeMoney: null,
          page: 1,
          limit: 30,
        }
      },
      rechargeDimensionExport() {
        this.$refs.table_panel.rechargeDimensionExport(this.queryParams);
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
