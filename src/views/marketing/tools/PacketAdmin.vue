<template>
  <div>
    <el-card>
      <packet-admin-search
        @search="searchPacketList"
        @reset="resetAllParamsAndData"
        ref="search_panel"
      />
      <packet-admin-search-btn-groups @search="searchPacketListFromGroups" ref="search_btn"></packet-admin-search-btn-groups>
      <div class="opration-btn">
        <div>
          <button
            type="button"
            v-waves
            class="el-button el-button--primary el-button--small"
            @click="handleAPacketAdd"
          >新建红包</button>
        </div>
        <div>
          <button
            type="button"
            v-waves
            class="el-button el-button--default el-button--small"
            @click="exportData"
          >导出数据</button>
        </div>
      </div>
      <packet-admin-table @ ref="table" @refreshPacketGroups="refreshPacketGroups"></packet-admin-table>
    </el-card>
  </div>
</template>

<script>
import PacketAdminSearch from "./components/packet/PacketAdminSearch";
import PacketAdminTable from "./components/packet/PacketAdminTable";
import PacketAdminSearchBtnGroups from "./components/packet/PacketAdminSearchBtnGroups";
import { RedPacketAdminService } from "@/service/marketing/tools/RedPacketAdminService";
export default {
  name: "PacketAdmin",
  components: {
    PacketAdminSearch,
    PacketAdminTable,
    PacketAdminSearchBtnGroups
  },
  data() {
    return {
      dialogFormVisible: false,
      queryParams: {},
      form: {
        batchNo: undefined,
        redPacketName: undefined,
        batchName: undefined,
        money: undefined,
        totalCount: undefined,
        memo: undefined
      },
      activeName: "first",
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.redPacketAdminService = new RedPacketAdminService();
  },
  methods: {
    searchPacketList(queryParams) {
      this.$refs.search_btn.onActive = [null, null];
      this.$refs.search_btn.totalActive = true;
      this.$refs.search_btn.findAllGroups(queryParams);
      this.$refs.table.getList(queryParams);
    },
    resetAllParamsAndData(queryParams) {
      this.$refs.search_btn.onActive = [null, null];
      this.$refs.search_btn.totalActive = true;
      this.$refs.search_btn.findAllGroups(queryParams);
      this.queryParams = {};
      this.$refs.table.getList(queryParams);
    },
    searchPacketListFromGroups(queryParams) {
      this.queryParams = queryParams;
      this.$refs.table.getList(queryParams);
    },
    refreshPacketGroups(queryParam) {
      delete this.queryParams.groupByBatchState;
      this.$refs.search_btn.onActive = [null, null];
      this.$refs.search_btn.totalActive = true;
      this.$refs.search_btn.findAllGroups(queryParam);
    },
    handleAPacketAdd() {
      this.$router.push("./PacketAdd");
    },
    exportData() {
      this.$refs.table.exportData(this.queryParams);
    }
  }
};
</script>

<style scoped>
.opration-btn {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
