<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-top:20px;margin-bottom:40px"
    >
      <el-table-column type="selection" width="40" style="text-align: center"></el-table-column>
      <el-table-column prop="memberId" label="会员id" align="center" width="90"></el-table-column>
      <el-table-column prop="svipDesc" label="会员等级" align="center"></el-table-column>
      <el-table-column prop="nickname" label="会员昵称" align="center" width="110"></el-table-column>
      <el-table-column prop="memerName" label="姓名" align="center">-</el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center" width="110"></el-table-column>
      <el-table-column prop="couponNo" label="优惠券码" align="center" width="110"></el-table-column>
      <el-table-column prop="couponState" label="优惠券状态" align="center" width="110">
        <template slot-scope="scope">
          <span v-for="item in couponState" :value="item.value" :key="item.value">{{'' + scope.row.payState === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityName" label="活动名称" align="center" width="110"></el-table-column>
      <el-table-column prop="activityMetaCodeDesc" label="活动类型" align="center" width="110"></el-table-column>
      <el-table-column prop="" label="领取时间" align="center" width="110"></el-table-column>
      <el-table-column prop="consumeTime" label="核销时间" align="center" width="110"></el-table-column>
      <el-table-column prop="orderNo" label="订单号" align="center" width="110"></el-table-column>
      <el-table-column prop="orderMoney" label="消费金额" align="center" width="110"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="fixed-bottom-page"
      small
      :current-page="this.currentPage"
      :page-sizes="[30, 50, 100, 200]"
      :page-size="queryParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
  import {CouponAdminService} from "@/service/marketing/tools/CouponAdminService";
  import {CommonService} from "@/service/common/CommonService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "CouponDataTable",
    data() {
      return {
        couponAdminService: undefined,
        tableData: [],
        currentPage: 0,
        total: 0,
        pageSize: 0,
        queryParams: {
          page: 1,
          limit: 30
        },
        couponState: [],
      };
    },
    mounted() {
      this.couponAdminService = new CouponAdminService();
      this.initSelectData();

      if (this.$route.query.data !== undefined) {
        this.queryParams.couponBatchId = this.$route.query.data.id;
        this.getList(this.queryParams);
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
      getList(params) {
        debugger
        params.page == undefined ? (params.page = 1) : (params.page = this.queryParams.page);
        params.limit == undefined ? (params.limit = 30) : (params.limit = this.queryParams.limit);

        this.queryParams = params;
        this.couponAdminService.pagingCoupons(this.queryParams)
          .then(response => {
            this.tableData = response.rows;
            this.total = parseInt(response.total);
          });
      },
      handleSizeChange(val) {
        this.queryParams.limit = val;
        this.loadRechargeData(this.queryParams);
      },
      handleCurrentChange(val) {
        this.queryParams.page = val;
        this.loadRechargeData(this.queryParams);
      },
      formatNumber(num) {
        return formatter.formatNumber(num);
      }
    }
  };
</script>
<style lang="scss"></style>
