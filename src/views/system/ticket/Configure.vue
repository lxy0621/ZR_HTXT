<template>
  <div>
    <el-card>
      <configure-Search
        @search="searchTicketConfigureList"
        @reset="resetAllParamsAndData"
        ref="search_panel"
      ></configure-Search>
      <div class="opration-btn">
        <div>
          <button
            type="button"
            v-waves
            class="el-button el-button--primary el-button--small"
            @click="handleAdd()"
          >添加小票机</button>
        </div>
      </div>
      <configure-table ref="table"></configure-table>
    </el-card>
  </div>
</template>

<script>
import ConfigureSearch from "./components/ConfigureSearch";
import ConfigureTable from "./components/ConfigureTable";
export default {
  name: "Configure",
  components: {
    ConfigureSearch,
    ConfigureTable
  },
  data() {
    return {
      queryParams: {}
    };
  },
  methods: {
    searchTicketConfigureList(queryParams) {
      this.$refs.table.getList(queryParams);
    },
    resetAllParamsAndData() {
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
    handleAdd() {
      this.$refs.table.addForm = {};
      this.$refs.table.machineAddDialogVisible = true;
    }
  }
};
</script>

<style>
.opration-btn {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
