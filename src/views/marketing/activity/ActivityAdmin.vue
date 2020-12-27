<template>
  <div>
    <el-card>
      <activity-admin-search
        @search="searchMarketCollectRecordList"
        @reset="resetAllParamsAndData"
        ref="search_panel"
      />
      <activity-admin-search-btn-groups @search="searchMarketCollectRecordListFromGroups" ref="search_btn"></activity-admin-search-btn-groups>
      <div class="opration-btn">
        <div>
          <button
            type="button"
            v-waves
            class="el-button el-button--primary el-button--small"
            @click="handleActivityAdd()"
          >新建活动
          </button>
        </div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportData">导出数据</button>
        </div>
      </div>
      <activity-admin-table ref="table" @refreshActivityGroups="refreshActivityGroups"></activity-admin-table>
    </el-card>
  </div>
</template>

<script>
  import ActivityAdminSearch from "./components/ActivityAdminSearch";
  import ActivityAdminTable from "./components/ActivityAdminTable";
  import ActivityAdminSearchBtnGroups from "./components/ActivityAdminSearchBtnGroups";

  export default {
    name: "ActivityAdmin",
    components: {
      ActivityAdminSearch,
      ActivityAdminTable,
      ActivityAdminSearchBtnGroups,
    },
    data() {
      return {
        queryParams: {},
        multipleSelection: [],
      };
    },
    methods: {
      searchMarketCollectRecordList(queryParams) {
        this.queryParams = queryParams;

        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findActivityGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      searchMarketCollectRecordListFromGroups(queryParams) {
        this.queryParams = queryParams;
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findActivityGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      handleActivityAdd() {
        this.$router.push({
          path: "/marketing/activity/ActivityAdd",
        });
      },
      exportData() {
        this.$refs.table.exportData(this.queryParams);
      },
      refreshActivityGroups(queryParam) {
        delete this.queryParams.stateCard;
        delete this.queryParams.metaCodeCard;
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findActivityGroups(queryParam);
      }
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
