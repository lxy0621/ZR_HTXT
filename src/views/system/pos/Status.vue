<template>
  <div>
    <el-card>
      <!--<status-search></status-search>-->
      <status-table></status-table>
    </el-card>
  </div>
</template>

<script>
  import StatusSearch from "./components/StatusSearch";
  import StatusTable from "./components/StatusTable";

  export default {
    name: "Status",
    components: {
      StatusSearch,
      StatusTable
    },
    data() {
      return {
        queryParams: {}
      };
    },
  };
</script>

<style scoped>
</style>
