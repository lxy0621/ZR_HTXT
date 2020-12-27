<template>
  <div>
    <el-card>
      <app-admin-search
        @search="searchMarketCollectRecordList"
        @reset="resetAllParamsAndData"
        ref="search_panel"
      />
      <app-admin-table ref="table"></app-admin-table>
    </el-card>
  </div>
</template>

<script>
  import AppAdminSearch from "./components/AppAdminSearch";
  import AppAdminTable from "./components/AppAdminTable";

  export default {
    name: "AppAdmin",
    components: {
      AppAdminSearch,
      AppAdminTable,
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
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.$refs.table.getList(queryParams);
      },
    }
  }
</script>

<style scoped>
</style>
