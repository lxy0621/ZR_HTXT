<template>
  <div>
    <el-card>
      <cashier-order-search @search="searchCashierOrderList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <cashier-order-search-btn-groups @search="searchCashierOrderListFromGroups" ref="search_btn"></cashier-order-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportData">导出数据</button>
        </div>
      </div>
      <cashier-order-table ref="table" style="margin-top: 15px; margin-bottom: 50px;"></cashier-order-table>
    </el-card>
  </div>
</template>

<script>
  import CashierOrderSearch from "@/views/trade/nonmember/cashier/components/CashierOrderSearch";
  import CashierOrderSearchBtnGroups from "@/views/trade/nonmember/cashier/components/CashierOrderSearchBtnGroups";
  import CashierOrderTable from "@/views/trade/nonmember/cashier/components/CashierOrderTable";

  export default {
    name: "CashierOrder",
    components: {
      CashierOrderSearch,
      CashierOrderSearchBtnGroups,
      CashierOrderTable,
    },
    data() {
      return {
        queryParams: {}
      }
    },
    methods: {
      searchCashierOrderList(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findCashierOrderGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      searchCashierOrderListFromGroups(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findCashierOrderGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      exportData() {
        this.$refs.table.exportData(this.queryParams);
      },
    }
  }
</script>

<style scoped>
  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
