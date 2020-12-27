<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.name" placeholder="设备名称" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.staStationId" placeholder="授权部门" size="small" style="width: 100%">
        <el-option v-for="item in stationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.enabled" placeholder="设备可用状态" size="small" style="width: 100%">
        <el-option v-for="item in deviceEnabled" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {CommonService} from "@/service/common/CommonService";

  export default {
    name: 'DevicesSearch',
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        queryParams: {},
        stationList: [],
        deviceEnabled: [],
      };
    },
    mounted() {
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "deviceEnabled",
          enumValue: "EnumDeviceEnabled",
        }];
        const that = this;
        new CommonService().findEnumIncludeAll('pos', param).then(response => {

          that.deviceEnabled = response.deviceEnabled;
        })
      },
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        this.queryParams = {};
        this.$emit('reset', this.queryParams);
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
