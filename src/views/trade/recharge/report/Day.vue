<template>
  <div>
    <el-card>
      <day-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <day-search-btn-groups @search="searchMarketCollectRecordList" ref="groups_panel"></day-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="rechargeDimensionExport">导出数据
          </button>
        </div>
      </div>
      <day-table ref='table_panel'></day-table>
    </el-card>
  </div>
</template>

<script>
  import DaySearch from "./components/DaySearch";
  import DayTable from "./components/DayTable";
  import DaySearchBtnGroups from "./components/DaySearchBtnGroups";

  export default {
    name: "Day",
    components: {
      DaySearch,
      DayTable,
      DaySearchBtnGroups,
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
        if (null != queryParams.rechargeDate && undefined != queryParams.rechargeDate) {
          this.queryParams.rechargeDateStart = queryParams.rechargeDate[0];
          this.queryParams.rechargeDateEnd = queryParams.rechargeDate[1];
        }
        if (null === queryParams.rechargeDate) {
          this.queryParams.rechargeDateStart = undefined;
          this.queryParams.rechargeDateEnd = undefined;
        }
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
