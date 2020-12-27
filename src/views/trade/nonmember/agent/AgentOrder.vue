<template>
  <div>
    <el-card>
      <agent-order-search @search="searchAgentOrderList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <agent-order-search-btn-groups @search="searchAgentOrderListFromGroups" ref="search_btn"></agent-order-search-btn-groups>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportData">导出数据</button>
        </div>
      </div>
      <agent-order-table ref="table" style="margin-top: 15px; margin-bottom: 50px;"></agent-order-table>
    </el-card>
  </div>
</template>

<script>
  import AgentOrderSearch from "@/views/trade/nonmember/agent/components/AgentOrderSearch";
  import AgentOrderSearchBtnGroups from "@/views/trade/nonmember/agent/components/AgentOrderSearchBtnGroups";
  import AgentOrderTable from "@/views/trade/nonmember/agent/components/AgentOrderTable";

  export default {
    name: "AgentOrder",
    components: {
      AgentOrderSearch,
      AgentOrderSearchBtnGroups,
      AgentOrderTable,
    },
    data() {
      return {
        queryParams: {}
      }
    },
    methods: {
      searchAgentOrderList(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findAgentOrderGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      searchAgentOrderListFromGroups(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findAgentOrderGroups(queryParams);
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
