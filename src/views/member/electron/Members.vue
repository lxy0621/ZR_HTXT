<template>
  <div>
    <el-card>
      <members-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <members-search-btn-groups @search="searchMarketCollectRecordListFromGroups"
                                 ref="search_btn"></members-search-btn-groups>
      <!--
      <div class="opration-btn">
        <div></div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small">导出数据</button>
        </div>
      </div>
      -->
      <members-table ref="table" style="margin-top: 15px;"></members-table>
    </el-card>
  </div>
</template>

<script>
  import MembersSearch from "./components/MembersSearch";
  import MembersTable from "./components/MembersTable";
  import MembersSearchBtnGroups from "./components/MembersSearchBtnGroups";

  export default {
    name: "Members",
    components: {
      MembersSearch,
      MembersTable,
      MembersSearchBtnGroups
    },
    data() {
      return {
        multipleSelection: [],
        activeName: "first"
      };
    },
    methods: {
      searchMarketCollectRecordList(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findMemberGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      searchMarketCollectRecordListFromGroups(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findMemberGroups(queryParams);
        this.$refs.table.getList(queryParams);
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
