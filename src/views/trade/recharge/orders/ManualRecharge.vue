<template>
  <div>
    <el-card>
      <manual-recharge-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <manual-recharge-search-btn-groups @search="searchMarketCollectRecordList" ref="groups_panel"></manual-recharge-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small">导出数据
          </button>
        </div>
      </div>
      <manual-recharge-table ref="table_panel"></manual-recharge-table>
    </el-card>
  </div>
</template>

<script>
  import ManualRechargeSearch from "./components/ManualRechargeSearch";
  import ManualRechargeTable from "./components/ManualRechargeTable";
  import ManualRechargeSearchBtnGroups from "./components/ManualRechargeSearchBtnGroups";

  export default {
    name: "ManualRecharge",
    components: {
      ManualRechargeSearch,
      ManualRechargeTable,
      ManualRechargeSearchBtnGroups
    },
    data() {
      return {
        queryParams: {
          memberKey: '',
          applyStates: null,
          rechargeDateStart: null,
          rechargeDateEnd: null,
          minChargeMoney: null,
          maxChargeMoney: null,

          applyState: null,
          isCounton: null
        }
      };
    },
    methods: {
      searchMarketCollectRecordList(param) {
        if (param[1] == 'search') { // 搜索按钮查询
          this.$refs.groups_panel.onActive = [null,null];
          this.$refs.groups_panel.totalActive = true;
          // 处理时间
          if (null != param[0].rechargeDate && undefined != param[0].rechargeDate) {
            this.queryParams.rechargeDateStart = param[0].rechargeDate[0];
            this.queryParams.rechargeDateEnd = param[0].rechargeDate[1];
          }
          if (null === param[0].rechargeDate) {
            this.queryParams.rechargeDateStart = undefined;
            this.queryParams.rechargeDateEnd = undefined;
          }
          this.queryParams.memberKey = param[0].memberKey;
          this.queryParams.applyStates = param[0].applyStates;
          this.queryParams.minChargeMoney = param[0].minChargeMoney;
          this.queryParams.maxChargeMoney = param[0].maxChargeMoney;
          this.queryParams.applyState = null;
          this.queryParams.isCounton = null;
          this.queryParams.page = 1;
          this.queryParams.limit = 30;

          this.$refs.groups_panel.initsearchBtnData(this.queryParams);
        } else if (param[1] == 'group') {
          this.queryParams.applyState = param[0].applyState;
          this.queryParams.isCounton = param[0].isCounton;
          this.queryParams.page = 1;
          this.queryParams.limit = 30;
        }

        this.$refs.table_panel.getDataList(this.queryParams);
      },
      // 重置
      resetAllParamsAndData(queryParams) {
        this.$refs.groups_panel.onActive = [null,null];
        this.$refs.groups_panel.totalActive = true;
        this.queryParams = {
          memberKey: '',
          applyStates: null,
          rechargeDateStart: null,
          rechargeDateEnd: null,
          minChargeMoney: null,
          maxChargeMoney: null,

          applyState: null,
          isCounton: null,
          page: 1,
          limit: 30,
        };
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
