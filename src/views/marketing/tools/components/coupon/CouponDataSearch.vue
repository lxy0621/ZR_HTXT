<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.unionQuery" placeholder="会员ID/昵称/姓名" size="small" style="width: 100%"></el-input>
    </search-container-item>
    <search-container-item>
      <el-input v-model="queryParams.mobile" placeholder="会员手机号" size="small" style="width: 100%"></el-input>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.couponState" placeholder="优惠券类型" size="small" style="width:100%;" multiple clearable>
        <el-option v-for="item in couponState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-select v-model="queryParams.dateType" placeholder="时间类型" size="small" style="width:100%;">
            <el-option :key="1" label="领取时间" :value="1"></el-option>
            <el-option :key="2" label="核销时间" :value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期"
                          end-placeholder="结束日期" style="width:100%;" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-row>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from "@/components/SearchContainer";
  import SearchContainerItem from "@/components/SearchContainerItem";
  import {CommonService} from "@/service/common/CommonService";
  import {OilGunService} from "@/service/system/station/OilGunService";

  export default {
    name: "CouponDataSearch",
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        dateRange: [],
        couponState: [],
        queryParams: {
          page: 1,
          limit: 30
        }
      };
    },
    mounted() {
      this.initSelectData();

      if (this.$route.query.data !== undefined) {
        this.queryParams.couponBatchId = this.$route.query.couponBatchId;
      }
    },
    methods: {
      initSelectData() {
        const that = this;

        const param = [{
          enumKey: "couponState",
          enumValue: "EnumCouponState",
        }];
        new CommonService().findEnumExcludeAll('activity.coupon', param).then(response => {
          that.couponState = response.couponState;
        });
      },
      handleDataSearch() {
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.dateFrom = this.dateRange[0];
          this.queryParams.dateTo = this.dateRange[1];
        }

        this.queryParams.memberId = this.queryParams.unionQuery;
        this.queryParams.memberName = this.queryParams.unionQuery;
        this.queryParams.nickname = this.queryParams.unionQuery;
        delete this.queryParams.unionQuery;

        const queryParams = Object.assign({}, this.queryParams);
        this.$emit("search", queryParams);
      },
      handleAllReset() {
        this.queryParams = {
          couponBatchId: this.$route.query.couponBatchId,
        };
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
