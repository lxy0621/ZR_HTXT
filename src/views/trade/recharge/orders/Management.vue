<template>
  <div>
    <el-card>
      <management-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <management-search-btn-groups @search="searchMarketCollectRecordList" ref="groups_panel"></management-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small"
                  @click="rechargeOrderExport">导出数据
          </button>
        </div>
      </div>
      <management-table ref='table_panel'></management-table>
    </el-card>
  </div>
</template>

<script>
  import ManagementSearch from "./components/ManagementSearch";
  import ManagementTable from "./components/ManagementTable";
  import ManagementSearchBtnGroups from "./components/ManagementSearchBtnGroups";

  export default {
    name: "Management",
    components: {
      ManagementSearch,
      ManagementTable,
      ManagementSearchBtnGroups,
    },
    data() {
      return {
        queryParams: {
          memberKey: '',
          orderType: null,
          rechargeDateStart: null,
          rechargeDateEnd: null,
          rechargeType: null,
          rechargePosition: null,
          minChargeMoney: null,
          maxChargeMoney: null,
          payState: null,
          orderState: null,
          refundState: null,

          orderType1: null,
          isCounton: null,
          rechargeType1: null
        }
      };
    },
    methods: {
      searchMarketCollectRecordList(param) {
        if (param[1] == 'search') { // 搜索按钮查询
          this.$refs.groups_panel.onActive = [null, null];
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
          this.queryParams.orderType = param[0].orderType;
          this.queryParams.rechargeType = param[0].rechargeType;
          this.queryParams.rechargePosition = param[0].rechargePosition;
          this.queryParams.minChargeMoney = param[0].minChargeMoney;
          this.queryParams.maxChargeMoney = param[0].maxChargeMoney;
          this.queryParams.payState = param[0].payState;
          this.queryParams.orderState = param[0].orderState;
          this.queryParams.refundState = param[0].refundState;
          delete this.queryParams.orderType1;
          delete this.queryParams.isCounton;
          delete this.queryParams.rechargeType1;
          this.queryParams.page = 1;
          this.queryParams.limit = 30;

          this.$refs.groups_panel.initsearchBtnData(this.queryParams);
          this.$refs.table_panel.getList(this.queryParams);
        } else if (param[1] == 'group') {
          this.queryParams.orderType1 = param[0].orderType1;
          this.queryParams.isCounton = param[0].isCounton;
          this.queryParams.rechargeType1 = param[0].rechargeType1;
          this.queryParams.page = 1;
          this.queryParams.limit = 30;
          this.$refs.table_panel.getList(this.queryParams);
        }
      },
      resetAllParamsAndData(queryParams) {
        this.$refs.groups_panel.onActive = [null, null];
        this.$refs.groups_panel.totalActive = true;
        this.queryParams = {
          memberKey: '',
          orderType: null,
          payState: null,
          orderState: null,
          refundState: null,
          rechargeDateStart: null,
          rechargeDateEnd: null,
          rechargeType: null,
          rechargePosition: null,
          minChargeMoney: null,
          maxChargeMoney: null,
          orderType1: null,
          isCounton: null,
          rechargeType1: null,
          page: 1,
          limit: 30,
        };
      },
      rechargeOrderExport() {
        this.$refs.table_panel.rechargeOrderExport(this.queryParams);
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
