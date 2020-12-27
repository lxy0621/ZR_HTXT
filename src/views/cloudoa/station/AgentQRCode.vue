<template>
  <div>
    <el-card>
      <agent-qrcode-search @search="searchAgentQRCodeList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportData">导出数据
          </button>
        </div>
      </div>
      <agent-qrcode-table ref="table" style="margin-top: 15px; margin-bottom: 50px;"></agent-qrcode-table>
    </el-card>
  </div>
</template>

<script>
import AgentQRCodeSearch from "./components/AgentQRCodeSearch";
import AgentQRCodeTable from "./components/AgentQRCodeTable";

export default {
  name: "AgentQRCode",
  components: {
    AgentQRCodeSearch,
    AgentQRCodeTable,
  },
  data() {
    return {
      queryParams: {}
    }
  },
  methods: {
    searchAgentQRCodeList(queryParams) {
      this.$refs.table.getList(queryParams);
    },
    resetAllParamsAndData(queryParams) {
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
