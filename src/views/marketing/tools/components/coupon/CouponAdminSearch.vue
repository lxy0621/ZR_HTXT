<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.unionQuery" placeholder="优惠券批次号/批次名/名称" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.couponBatchState" placeholder="优惠券状态" size="small" style="width:100%;" multiple clearable>
        <el-option v-for="item in couponBatchState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.couponType" placeholder="优惠券类型" size="small" style="width:100%;" multiple clearable>
        <el-option v-for="item in couponType" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-select v-model="queryParams.dateType" placeholder="时间类型" size="small" style="width:100%;">
            <el-option :key="1" label="创建时间" value="1"></el-option>
            <el-option :key="2" label="更新时间" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期"
                          end-placeholder="结束日期" style="width:100%;" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-row>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.skuIds" placeholder="适用油品" size="small" style="width: 100%" multiple clearable>
        <el-option v-for="item in skuId" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import searchContainerItem from '@/components/SearchContainerItem.vue';
  import {CommonService} from "@/service/common/CommonService";
  import {OilGunService} from '@/service/system/station/OilGunService.js';

  const getDefaultQueryParams = () => ({
    unionQuery: undefined,
    batchName: undefined,
    couponName: undefined,
    batchNo: undefined,
    couponBatchState: undefined,
    couponBatchStateCard: undefined,
    couponType: undefined,
    couponTypeCard: undefined,
    dateType: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    skuIds: undefined,
    page: 1,
    limit: 30,
  });

  export default {
    name: 'CouponAdminSearch',
    components: {
      SearchContainer,
      searchContainerItem
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        couponBatchState: [],
        couponType: [],
        couponDateType: [],
        skuId: [],
        dateRange: undefined,
      };
    },
    mounted() {
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const that = this;

        const param = [{
          enumKey: "couponBatchState",
          enumValue: "EnumCouponBatchState",
        }, {
          enumKey: "couponType",
          enumValue: "EnumCouponType",
        }, {
          enumKey: "couponDateType",
          enumValue: "EnumCouponValidateRuleType",
        }];
        new CommonService().findEnumExcludeAll('activity.coupon', param).then(response => {
          that.couponBatchState = response.couponBatchState;
          that.couponType = response.couponType;
          that.couponDateType = response.couponDateType;
        });

        new OilGunService().productSkuList().then(response => {
          for (let i = 0; i < response.length; i++) {
            that.skuId.push({value: response[i].id, key: response[i].name});
          }
        });
      },
      handleDataSearch() {
        this.queryParams.batchName = this.queryParams.unionQuery === '' || this.queryParams.unionQuery === undefined ? '' : this.queryParams.unionQuery;
        this.queryParams.batchNo = this.queryParams.unionQuery === '' || this.queryParams.unionQuery === undefined ? '' : this.queryParams.unionQuery;
        this.queryParams.couponName = this.queryParams.unionQuery === '' || this.queryParams.unionQuery === undefined ? '' : this.queryParams.unionQuery;
        delete this.queryParams.unionQuery;

        if (this.queryParams.dateType == undefined && this.dateRange != undefined && this.dateRange != null) {
          this.$message({
            message: '请选择时间类型查询条件',
            type: 'warning'
          });
          return false;
        }
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.dateFrom = this.dateRange[0];
          this.queryParams.dateTo = this.dateRange[1];
        }
        if (null === this.dateRange) {
          this.queryParams.dateFrom = undefined;
          this.queryParams.dateTo = undefined;
        }
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        this.queryParams = {
          page: 1,
          limit: 30,
        };
        this.dateRange = undefined;
        this.$emit('reset', this.queryParams);
      },
    }
  };
</script>
