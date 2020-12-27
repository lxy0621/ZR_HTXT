<template>
  <div>
    <el-card>
      <direct-order-search @search="searchDirectOrderList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <direct-order-search-btn-groups @search="searchDirectOrderListFromGroups" ref="search_btn"></direct-order-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportData">导出数据</button>
        </div>
      </div>
      <direct-order-table ref="table" style="margin-top: 15px; margin-bottom: 50px;"></direct-order-table>
    </el-card>
  </div>
</template>

<script>
  import DirectOrderSearch from "@/views/trade/nonmember/direct/components/DirectOrderSearch";
  import DirectOrderSearchBtnGroups from "@/views/trade/nonmember/direct/components/DirectOrderSearchBtnGroups";
  import DirectOrderTable from "@/views/trade/nonmember/direct/components/DirectOrderTable";

  export default {
    name: "DirectOrder",
    components: {
      DirectOrderSearch,
      DirectOrderSearchBtnGroups,
      DirectOrderTable,
    },
    data() {
      return {
        queryParams: {}
      }
    },
    methods: {
      searchDirectOrderList(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findDirectOrderGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      searchDirectOrderListFromGroups(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findDirectOrderGroups(queryParams);
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
