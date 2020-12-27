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
      <el-table-column prop="svip" label="会员等级" align="center">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.svip == 0">非SVIP</el-tag>
          <el-tag size="small" v-if="scope.row.svip == 1">等级1</el-tag>
          <el-tag size="small" v-if="scope.row.svip == 2">等级2</el-tag>
          <el-tag size="small" v-if="scope.row.svip == 3">等级3</el-tag>
          <el-tag size="small" v-if="scope.row.svip == 4">等级4</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="会员昵称" align="center" width="110"></el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center" width="110"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center">-</el-table-column>
      <el-table-column prop="cardType" label="卡类型" align="center">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.cardType == 1">个人卡</el-tag>
          <el-tag size="small" v-if="scope.row.cardType == 2">副卡</el-tag>
          <el-tag size="small" v-if="scope.row.cardType == 3">主卡</el-tag>
          <el-tag size="small" v-if="scope.row.cardType == 4">车队卡</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="cardNo" label="会员卡号" align="center" width="110"></el-table-column>
      <el-table-column prop="consumeMoney" label="消费金额（元）" align="center" width="120">
        <template slot-scope="scope">
          <span style="font-weight: bold; color: red;">{{formatNumber(scope.row.consumeMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="actualPayMoney" label="实际消费" align="center" width="110">
        <template slot-scope="scope">
          <span style="font-weight: bold; color: red;">{{formatNumber(scope.row.actualPayMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="couponName" label="优惠券" align="center" width="110"></el-table-column>
      <el-table-column prop="couponId" label="优惠券码" align="center" width="160"></el-table-column>
      <el-table-column prop="outTradeNo" label="订单号" align="center" width="160"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" align="center">
        <template slot-scope="scope">
          <span
            v-for="item in orderStates"
            :value="item.value"
            :key="item.value"
          >{{'' + scope.row.orderState === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="payGroundDisplay" label="收款方式" align="center" width="100"></el-table-column>
      <el-table-column prop="employeeName" label="加油员" align="center" width="100"></el-table-column>
      <el-table-column prop="paidTime" label="消费时间" align="center" width="140"></el-table-column>
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
  name: "ConsumeCouponBackTable",
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
      this.loadConsumeCouponBackData(this.queryParams);
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
    loadConsumeCouponBackData(params) {
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
      this.loadConsumeCouponBackData(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.loadConsumeCouponBackData(this.queryParams);
    },
    formatNumber(num) {
      return formatter.formatNumber(num);
    }
  }
};
</script>
<style lang="scss"></style>
