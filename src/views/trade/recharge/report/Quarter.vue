<template>
  <div>
    <el-card>
      <quarter-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <quarter-search-btn-groups @search="searchMarketCollectRecordList" ref="groups_panel"></quarter-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="rechargeDimensionExport">导出数据
          </button>
        </div>
      </div>
      <quarter-table ref='table_panel'></quarter-table>
    </el-card>
  </div>
</template>

<script>
  import QuarterSearch from "./components/QuarterSearch";
  import QuarterTable from "./components/QuarterTable";
  import QuarterSearchBtnGroups from "./components/QuarterSearchBtnGroups";

  export default {
    name: "Quarter",
    components: {
      QuarterSearch,
      QuarterTable,
      QuarterSearchBtnGroups,
    },
    data() {
      return {
        queryParams: {
          stations: null, // 油站
          moneyType: 1, // 金额类型

          rechargeDateStart: null,
          rechargeDateEnd: null,
          rechargeDateSta: '',
          rechargeDateEn: '',
          minChargeMoney: null,
          maxChargeMoney: null
        }
      };
    },
    methods: {
      searchMarketCollectRecordList(queryParams) {
        this.queryParams.rechargeDateSta = queryParams.rechargeDateSta;
        this.queryParams.rechargeDateEn = queryParams.rechargeDateEn;
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
          rechargeDateSta: '',
          rechargeDateEn: '',
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
