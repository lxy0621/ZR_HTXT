<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.outTradeNo" placeholder="订单号" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.orderState" placeholder="订单状态" size="small" style="width:100%;" multiple clearable>
        <el-option v-for="item in orderState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.isConfirmed" placeholder="是否确认" size="small" style="width:100%;" multiple clearable>
        <el-option v-for="item in confirms" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-row :gutter="5">
        <el-col :span="6">
          <el-select v-model="queryParams.searchDateType" placeholder="时间类型" size="small" style="width:100%;">
            <el-option v-for="item in searchDateType" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="18">
          <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-row>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.stationIds" placeholder="油/气站" @change="handleChangeStation(queryParams.stationIds)" size="small" style="width:100%;" multiple clearable collapse-tags>
        <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.gunIds" placeholder="枪号" size="small" style="width:100%;" multiple clearable collapse-tags>
        <el-option-group v-for="item in stationGuns" :key="item.station" :label="item.station">
          <el-option v-for="item in item.guns" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-option-group>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.productSkuIds" placeholder="油/气品" size="small" style="width:100%;" multiple clearable>
        <el-option v-for="item in productSkus" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem.vue';
  import {CommonService} from "@/service/common/CommonService";
  import {StationService} from '@/service/system/station/StationService.js';
  import {OilGunService} from '@/service/system/station/OilGunService.js';

  const getDefaultQueryParams = () => ({
    outTradeNo: undefined,
    orderState: [],
    orderStateCard: undefined,
    isConfirmed: undefined,
    searchDateType: undefined,
    startTime: undefined,
    endTime: undefined,
    stationIds: [],
    gunIds: [],
    productSkuIds: [],
    page: 1,
    limit: 30,
  });

  export default {
    name: "CashierOrderSearch",
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        stations: [],
        stationGuns: [],
        productSkus: [],
        orderState: [],
        confirms: [],
        searchDateType: [],
        dateRange: [],
      }
    },
    mounted() {
      this.initSelectData();
      this.initStations();
      this.initProductSkus();
    },
    methods: {
      initSelectData() {
        const that = this;
        const param = [{
          enumKey: "orderState",
          enumValue: "EnumRechargeOrderState",
        }];

        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.orderState = response.orderState;

          that.queryParams.orderState = ['1', '2'];
        });

        that.searchDateType = [{
          value: '1',
          key: '创建时间'
        }, {
          value: '2',
          key: '收款时间',
        }, {
          value: '3',
          key: '退款时间',
        }];

        that.confirms = [{
          value: '1',
          key: '是',
        }, {
          value: '0',
          key: '否',
        }]
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
      initProductSkus() {
        const that = this;
        new OilGunService().productSkuList().then(response => {
          that.productSkus = response;
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
