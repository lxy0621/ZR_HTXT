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
      <el-table-column prop="memberId" label="会员ID" align="center" width="90"></el-table-column>
      <el-table-column prop="memberType" label="会员类型" align="center">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.memberType == 1">个人</el-tag>
          <el-tag size="small" v-if="scope.row.memberType == 2">企业</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="svip" label="会员等级" align="center">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.memberType == 0">非超级会员</el-tag>
          <el-tag size="small" v-if="scope.row.memberType == 1">一级会员</el-tag>
          <el-tag size="small" v-if="scope.row.memberType == 2">二级会员</el-tag>
          <el-tag size="small" v-if="scope.row.memberType == 2">三级会员</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center">-</el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="couponName" label="优惠券" align="center"></el-table-column>
      <el-table-column prop="couponId" label="优惠券码" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="发放时间" align="center" width="160"></el-table-column>
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
import { ActivityAdminService } from "@/service/marketing/activity/ActivityAdminService";
import { CommonService } from "@/service/common/CommonService";
import { RechargeOrderService } from "@/service/trade/recharge/RechargeOrderService";
import * as formatter from "@/utils/formatter";

export default {
  name: "RefreshManCouponTable",
  data() {
    return {
      activityAdminService: undefined,
      tableData: [],
      currentPage: 0,
      total: 0,
      pageSize: 0,
      queryParams: {
        page: 1,
        limit: 30
      },
      payStates: [],
      orderStates: [],
      refundStates: []
    };
  },
  mounted() {
    this.activityAdminService = new ActivityAdminService();
    this.initSelectData();
    if (this.$route.query !== undefined) {
      this.queryParams.id = parseInt(this.$route.query.id);
      this.loadRefreshManCouponData(this.queryParams);
    }
  },
  methods: {
    initSelectData() {
      const that = this;
      const param = [
        {
          enumKey: "payStates",
          enumValue: "EnumRechargePayState"
        },
        {
          enumKey: "orderStates",
          enumValue: "EnumRechargeOrderState"
        },
        {
          enumKey: "refundStates",
          enumValue: "EnumRefundState"
        }
      ];

      new CommonService().findEnumIncludeAll("member", param).then(response => {
        that.payStates = response.payStates;
        that.orderStates = response.orderStates;
        that.refundStates = response.refundStates;
      });
    },
    loadRefreshManCouponData(params) {
      params.page == undefined
        ? (params.page = 1)
        : (params.page = this.queryParams.page);
      params.limit == undefined
        ? (params.limit = 30)
        : (params.limit = this.queryParams.limit);
      this.queryParams = params;
      this.activityAdminService
        .pagingActDetailData(this.queryParams)
        .then(response => {
          this.tableData = response.data.rows;
          this.total = parseInt(response.data.total);
        });
    },
    handleSizeChange(val) {
      this.queryParams.limit = val;
      this.loadRefreshManCouponData(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.loadRefreshManCouponData(this.queryParams);
    },
    formatNumber(num) {
      return formatter.formatNumber(num);
    }
  }
};
</script>
<style lang="scss"></style>
