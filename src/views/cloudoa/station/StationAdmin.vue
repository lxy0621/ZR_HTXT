<template>
  <div>
    <el-card>
      <station-admin-search @search="searchOilGasSataionList" @reset="resetAllParamsAndData" ref="search_panel"></station-admin-search>
      <station-admin-table ref="table"></station-admin-table>
    </el-card>
  </div>
</template>

<script>
  import StationAdminSearch from "./components/StationAdminSearch";
  import StationAdminTable from "./components/StationAdminTable";

  export default {
    name: "StationAdmin",
    components: {
      StationAdminSearch,
      StationAdminTable
    },
    data() {
      return {
        queryParams: {}
      };
    },
    methods: {
      searchOilGasSataionList(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData() {
        this.queryParams = {};
        this.$emit("reset", this.queryParams);
      }
    }
  };
</script>

<style>
</style>
