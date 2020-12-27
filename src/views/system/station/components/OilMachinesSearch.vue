<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-select
        v-model="queryParams.machineBrandId"
        placeholder="加油/气品牌名"
        size="small"
        style="width: 100%"
      >
        <el-option v-for="item in machineBrands" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.stationId"
        placeholder="油站名称"
        size="small"
        style="width: 100%"
      >
        <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-date-picker
        size="small"
        value-format="yyyy-MM-dd"
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 100%"
      ></el-date-picker>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from "@/components/SearchContainer";
  import SearchContainerItem from "@/components/SearchContainerItem";
  import {OilMachineService} from "@/service/system/station/OilMachineService";

  const getDefaultQueryParams = () => ({
    machineBrandId: "",
    stationId: "",
    dateRange: [],
    startTime: undefined,
    endTime: undefined,
    page: 1,
    limit: 30,
  });

  export default {
    name: "OilMachinesSearch",
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        oilMachineService: undefined,
        queryParams: getDefaultQueryParams(),
        machineBrands: [],
        stations: [],
        dateRange: []
      };
    },
    created() {
      if (this.$route.query.id !== undefined) {
        this.queryParams.stationId = this.$route.query.id;
      }
    },
    mounted() {
      this.oilMachineService = new OilMachineService();
      this.machineBrandList();
      this.stationList();
    },
    updated() {
      if (this.$route.query.id !== undefined) {
        this.handleDataSearch();
      }
    },
    methods: {
      machineBrandList() {
        this.oilMachineService.machineBrandList().then(response => {
          this.machineBrands = response;
        });
      },
      stationList() {
        this.oilMachineService.stationList().then(response => {
          this.stations = response;
        });
      },
      handleDataSearch() {
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.startTime = this.dateRange[0];
          this.queryParams.endTime = this.dateRange[1];
        }
        if (null === this.dateRange) {
          this.queryParams.startTime = null;
          this.queryParams.endTime = null;
        }
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit("search", queryParams);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.dateRange = [];
        this.$emit("reset", queryParams);
        this.handleDataSearch();
      }
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
