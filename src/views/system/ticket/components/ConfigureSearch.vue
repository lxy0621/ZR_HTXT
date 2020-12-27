<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input
        v-model="queryParams.stationName"
        placeholder="部门名称"
        size="small"
        style="width: 100%"
      ></el-input>
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.onlineStatus"
        placeholder="小票机在线状态"
        size="small"
        style="width: 100%"
      >
        <el-option
          v-for="item in onlineStatuses"
          :key="item.status_value"
          :label="item.status_name"
          :value="item.status_value"
        ></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.enabledState"
        placeholder="小票机状态"
        size="small"
        style="width: 100%"
      >
        <el-option
          v-for="item in enabledStates"
          :key="item.state_value"
          :label="item.state_name"
          :value="item.state_value"
        ></el-option>
      </el-select>
    </search-container-item>

    <search-container-item>
      <el-date-picker
        size="small"
        value-format="yyyy-MM-dd"
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="初始添加日期"
        end-placeholder="最后添加日期"
        style="width: 100%"
      ></el-date-picker>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from "@/components/SearchContainer";
  import SearchContainerItem from "@/components/SearchContainerItem";
  import {TicketService} from "@/service/system/ticket/TicketAdminService";

  export default {
    name: "ConfigureSearch",
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        queryParams: {
          limit: 20,
          page: 1
        },
        enabledStates: [],
        onlineStatuses: [],
        stationValue: "",
        stateValue: "",
        dateRange: [],
        service: null
      };
    },
    created() {
      if (this.$route.query.name !== undefined) {
        this.queryParams.stationName = this.$route.query.name;
      }
    },
    mounted() {
      this.service = new TicketService();
      this.queryEnums();
    },
    updated() {
      if (this.$route.query.name !== undefined) {
        this.handleDataSearch();
      }
    },
    methods: {
      queryEnums() {
        this.service.getTicketPrinterQueryEnums().then(response => {
          this.enabledStates = response.data.enabledStates;
          this.onlineStatuses = response.data.onlineStatuses;
        });
      },
      handleDataSearch() {
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.startDate = this.dateRange[0];
          this.queryParams.endDate = this.dateRange[1];
        }
        if (null === this.dateRange) {
          this.queryParams.startDate = undefined;
          this.queryParams.endDate = undefined;
        }
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit("search", queryParams);
      },
      handleAllReset() {
        this.queryParams = {};
        this.dateRange = [];
        this.$emit("reset", this.queryParams);
        this.handleDataSearch();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }
</style>
