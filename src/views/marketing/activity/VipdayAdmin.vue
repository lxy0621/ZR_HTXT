<template>
  <div>
    <el-card>
      <vipday-search @search="searchVipDayData" @reset="resetAllParamsAndData" ref="search_panel"></vipday-search>
      <vipday-search-btn-groups @search="searchVipDayListFromGroups" ref="search_btn"></vipday-search-btn-groups>
      <div class="opration-btn">
        <div>
          <button
            type="button"
            v-waves
            class="el-button el-button--primary el-button--small"
            @click="handleVipAdd()"
          >新建会员日</button>
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
      <vipday-table ref="table" @refreshVipDayGroups="refreshVipDayGroups"></vipday-table>
    </el-card>
  </div>
</template>

<script>
import VipdayTable from "./components/VipdayTable";
import VipdaySearch from "./components/VipdaySearch";
import VipdaySearchBtnGroups from "./components/VipdaySearchBtnGroups";

export default {
  name: "VipdayAdmin",
  components: {
    VipdaySearch,
    VipdaySearchBtnGroups,
    VipdayTable
  },
  data() {
    return {
      queryParams: {}
    };
  },
  methods: {
    searchVipDayData(queryParams) {
      this.queryParams = queryParams;
      this.$refs.search_btn.onActive = [null, null];
      this.$refs.search_btn.totalActive = true;
      this.$refs.search_btn.findVipDayGroups(queryParams);
      this.$refs.table.getList(queryParams);
    },
    resetAllParamsAndData(queryParams) {
      this.$refs.search_btn.onActive = [null, null];
      this.$refs.search_btn.totalActive = true;
      this.$refs.search_btn.findVipDayGroups(queryParams);
      this.queryParams = {};
      this.$refs.table.getList(queryParams);
    },
    searchVipDayListFromGroups(queryParams) {
      this.queryParams = queryParams;
      this.$refs.table.getList(queryParams);
    },
    handleVipAdd() {
      this.$router.push("./VipdayAdd");
    },
    refreshVipDayGroups(queryParam) {
      delete this.queryParams.stateCard;
      this.$refs.search_btn.onActive = [null, null];
      this.$refs.search_btn.totalActive = true;
      this.$refs.search_btn.findVipDayGroups(queryParam);
    },
    exportData() {
      this.$refs.table.exportData(this.queryParams);
    }
  }
};
</script>

<style scoped>
.opration-btn {
  margin: 10px 0 0 0;
  display: flex;
  justify-content: space-between;
}
</style>
