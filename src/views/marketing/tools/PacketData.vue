<template>
  <div>
    <!-- <el-button type="primary" @click="tolook">查看</el-button> -->
    <el-card class="card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据统计" name="first">
          <div>
            <packet-data-statistics></packet-data-statistics>
          </div>
        </el-tab-pane>
        <el-tab-pane label="领取列表" name="second">
          <packet-recive-search
            @search="searchPacketList"
            @reset="resetAllParamsAndData"
            ref="search_panel"
          ></packet-recive-search>
          <packet-recive-list ref="table"></packet-recive-list>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import PacketDataStatistics from "./components/packet/PacketDataStatistics";
import PacketReciveList from "./components/packet/PacketReciveList";
import PacketReciveSearch from "./components/packet/PacketReciveSearch";
export default {
  name: "PacketData",
  components: {
    PacketDataStatistics,
    PacketReciveList,
    PacketReciveSearch
  },
  data() {
    return {
      activeName: "first",
      queryParams: {}
    };
  },
  methods: {
    searchPacketList(queryParams) {
      this.$refs.table.loadPacketReciveData(queryParams);
    },
    resetAllParamsAndData() {
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
    handleClick() {}
  }
};
</script>

<style scoped>
.card {
  margin: 10px;
}
</style>
