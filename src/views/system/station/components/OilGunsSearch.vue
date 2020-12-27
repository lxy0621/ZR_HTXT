<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-select
        v-model="queryParams.stationId"
        placeholder="油站名称"
        @change="selectMachineByStationId(queryParams.stationId)"
        size="small"
        style="width: 100%"
      >
        <el-option label="全部" value></el-option>
        <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.oilMachineId"
        placeholder="油机名称"
        size="small"
        style="width: 100%"
      >
        <el-option label="全部" value></el-option>
        <el-option v-for="item in machines" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.productSkuId"
        placeholder="油品类型"
        size="small"
        style="width: 100%"
      >
        <el-option label="全部" value></el-option>
        <el-option v-for="item in productSkus" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
  import {OilGunService} from "@/service/system/station/OilGunService.js";

  const getDefaultQueryParams = () => ({
    stationId: undefined,
    oilMachineId: undefined,
    productSkuId: undefined,
    dateRange: [],
    startTime: undefined,
    endTime: undefined,
    page: 1,
    limit: 30,
  });

  export default {
    name: "OilGunsSearch",
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        oilGunService: undefined,
        queryParams: getDefaultQueryParams(),
        productSkus: [],
        stations: [],
        machines: [],
        dateRange: []
      };
    },
    created() {
      this.queryParams.stationId = this.$route.query.id;
    },
    mounted() {
      this.oilGunService = new OilGunService();
      this.productSkuList();
      this.stationList();
    },
    updated() {
      if (this.$route.query.id !== undefined) {
        this.handleDataSearch();
      }
    },
    methods: {
      stationList() {
        const that = this;
        this.oilGunService.stationList().then(response => {
          that.stations = response;
        });
      },
      productSkuList() {
        const that = this;
        this.oilGunService.productSkuList().then(response => {
          that.productSkus = response;
        });
      },
      machineList() {
        this.oilGunService.machineList().then(response => {
          this.machines = response;
        });
      },
      selectMachineByStationId(stationId) {
        const that = this;
        that.machines = [];
        that.queryParams.oilMachineId = undefined;
        this.oilGunService.getMachineListByStationId(stationId).then(response => {
          that.machines = response;
        });
      },
      handleDataSearch() {
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.startTime = this.dateRange[0];
          this.queryParams.endTime = this.dateRange[1];
        }
        if (null === this.dateRange) {
          this.queryParams.startTime = undefined;
          this.queryParams.endTime = undefined;
        }
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit("search", queryParams);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.dateRange = [];
        this.machines = [];
        this.$emit("reset", queryParams);
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
