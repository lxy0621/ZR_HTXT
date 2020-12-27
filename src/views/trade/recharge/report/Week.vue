<template>
  <div>
    <el-card>
      <week-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <week-search-btn-groups @search="searchMarketCollectRecordList" ref="groups_panel"></week-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="rechargeDimensionExport">导出数据
          </button>
        </div>
      </div>
      <week-table ref='table_panel'></week-table>
    </el-card>
  </div>
</template>

<script>
  import WeekSearch from "./components/WeekSearch";
  import WeekTable from "./components/WeekTable";
  import WeekSearchBtnGroups from "./components/WeekSearchBtnGroups";

  export default {
    name: "Week",
    components: {
      WeekSearch,
      WeekTable,
      WeekSearchBtnGroups,
    },
    data() {
      return {
        queryParams: {
          stations: null, // 油站
          moneyType: 1, // 金额类型

          rechargeDateStart: '',
          rechargeDateEnd: '',
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
          rechargeDateStart: '',
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
