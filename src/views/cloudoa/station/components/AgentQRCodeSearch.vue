<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.qrcode" placeholder="收款二维码号" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.qrcodeState" placeholder="收款二维码状态" size="small" style="width:100%;" multiple
                 clearable>
        <el-option v-for="item in qrcodeState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.stationIds" placeholder="油/气站"
                 @change="handleChangeStation(queryParams.stationIds)" size="small" style="width:100%;" multiple
                 clearable collapse-tags>
        <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-row :gutter="5">
        <el-col :span="6">
          <el-select v-model="queryParams.searchDateType" placeholder="时间类型" size="small" style="width:100%;">
            <el-option v-for="item in searchDateType" :key="item.value" :label="item.key"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="18">
          <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期"
                          end-placeholder="结束日期" style="width:100%;" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-row>
    </search-container-item>
  </search-container>
</template>

<script>
import SearchContainer from '@/components/SearchContainer';
import SearchContainerItem from '@/components/SearchContainerItem.vue';
import {StationService} from '@/service/system/station/StationService.js';

const getDefaultQueryParams = () => ({
  qrcode: undefined,
  qrcodeState: [],
  searchDateType: undefined,
  startTime: undefined,
  endTime: undefined,
  stationIds: [],
  page: 1,
  limit: 30,
});

export default {
  name: "AgentQRCodeSearch",
  components: {
    SearchContainer,
    SearchContainerItem,
  },
  data() {
    return {
      queryParams: getDefaultQueryParams(),
      stations: [],
      qrcodeState: [],
      searchDateType: [],
      dateRange: [],
    }
  },
  mounted() {
    this.initSelectData();
    this.initStations();
  },
  methods: {
    initSelectData() {
      const that = this;

      that.qrcodeState = [{
        value: '1',
        key: '已启用'
      }, {
        value: '0',
        key: '已停用',
      }]

      that.searchDateType = [{
        value: '1',
        key: '绑定时间'
      }, {
        value: '2',
        key: '更新时间',
      }];
    },
    initStations() {
      const that = this;
      new StationService().selectStations().then(response => {
        that.stations = response.data;
      });
    },
    handleChangeStation(stationIds) {
      const that = this;
      new OilGunService().selectGunsByStationIds(stationIds).then(response => {
        that.stationGuns = response.data;
      });
    },
    handleDataSearch() {
      if (this.dateRange.length !== 0 && this.dateRange !== null && this.queryParams.searchDateType === '') {
        this.$message({
          message: '请选择时间类型',
          type: 'warning'
        });
        return;
      }
      if (undefined != this.dateRange && this.dateRange.length > 0) {
        this.queryParams.startTime = this.dateRange[0];
        this.queryParams.endTime = this.dateRange[1];
      }
      if (null === this.dateRange) {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }
      const queryParams = Object.assign({}, this.queryParams);
      this.$emit('search', queryParams);
    },
    handleAllReset() {
      this.queryParams = {
        page: 1,
        limit: 30,
      };
      this.dateRange = [];
      this.$emit('reset', this.queryParams);
    },
  }
}
</script>

<style scoped>

</style>
