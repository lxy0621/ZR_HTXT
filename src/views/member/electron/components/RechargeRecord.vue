<template>
  <div>
    <!--表格内容栏-->
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column label="序号" min-width="60" align="center">
        <template slot-scope="scope">
          <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cardNo" label="会员卡号" align="center" min-width="100"></el-table-column>
      <el-table-column prop="cardType" label="会员卡类型" align="center" min-width="80">
        <template slot-scope="scope">
          <span v-for="item in cardType" :value="item.value" :key="item.value">{{'' + scope.row.cardType === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rechargeMoney" label="充值金额（元）" min-width="100" align="center">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.rechargeMoney === undefined || scope.row.rechargeMoney === 0 ? '0' : formatNumber(scope.row.rechargeMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="giftMoney" label="赠送金额（元）" min-width="100" align="center">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.giftMoney === undefined || scope.row.giftMoney === 0 ? '0' : formatNumber(scope.row.giftMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="线上/线下" align="center" min-width="70">
        <template slot-scope="scope">
          {{scope.row.orderType === 1 ? '线上' : '线下'}}
        </template>
      </el-table-column>
      <el-table-column prop="payState" label="支付状态" align="center" min-width="70">
        <template slot-scope="scope">
          <span v-for="item in payState" :value="item.value" :key="item.value">{{'' + scope.row.payState === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态" align="center" min-width="70">
        <template slot-scope="scope">
          <span v-for="item in orderState" :value="item.value" :key="item.value">{{'' + scope.row.orderState === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="refundState" label="退款状态" align="center" min-width="70">
        <template slot-scope="scope">
          <span v-for="item in refundState" :value="item.value" :key="item.value">{{'' + scope.row.refundState === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rechargeType" label="支付渠道" align="center" min-width="70">
        <template slot-scope="scope">
          <span v-for="item in rechargeType" :value="item.value" :key="item.value">{{'' + scope.row.rechargeType === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rechargeDate" label="支付时间" align="center" min-width="130"></el-table-column>
    </el-table>
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[30, 50, 100, 200]"
      :current-page="queryParams.page"
      :page-size="queryParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <div style="text-align: right">
      <el-button size="medium" @click="closeDialog" class="closeBtn">关 闭</el-button>
    </div>
  </div>
</template>

<script>
  import {MemberService} from "@/service/member/MemberService";
  import {CommonService} from "@/service/common/CommonService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "RechargeRecord",
    data() {
      return {
        selectRows: [],
        tableData: [],
        pageIndex: 1,
        pageSize: 30,
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        cardType: [],
        rechargeType: [],
        payState: [],
        orderState: [],
        refundState:  [],
        memberService: null,
        commonService: null,
      };
    },
    mounted() {
      this.memberService = new MemberService();
      this.commonService = new CommonService();
      this.initSelectData();
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      initSelectData() {
        const that = this;
        const param = [{
          enumKey: "rechargeType",
          enumValue: "EnumRechargeType",
        }, {
          enumKey: "cardType",
          enumValue: "EnumCardType",
        }, {
          enumKey: "payState",
          enumValue: "EnumRechargePayState",
        }, {
          enumKey: "orderState",
          enumValue: "EnumRechargeOrderState",
        }, {
          enumKey: "refundState",
          enumValue: "EnumRefundState",
        }];
        this.commonService.findEnumExcludeAll('member', param).then(response => {
          that.rechargeType = response.rechargeType;
          that.cardType = response.cardType;
          that.payState = response.payState;
          that.orderState = response.orderState;
          that.refundState = response.refundState;
        });
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {

        if (queryParams.memberId !== undefined) {
          this.queryParams.memberId = queryParams.memberId;
        }
        if (queryParams.cardId !== undefined) {
          this.queryParams.cardId = queryParams.cardId;
        } else {
          delete this.queryParams.cardId;
        }
        this.memberService.pageRechargeOrdersByMemberId(this.queryParams)
          .then(response => {
            this.tableData = response.rows;
            this.total = parseInt(response.total);
          });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.queryParams.limit = val;
        this.getList(this.queryParams);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.queryParams.page = val;
        this.getList(this.queryParams);
      },
      closeDialog() {
        this.$emit('closeCheckDialog', false);
      }
    }
  };
</script>
<style lang="scss">
  .page {
    background: #ebebeb;
    text-align: right;
    padding: 6px;
  }

  .closeBtn {
    margin-top: 10px !important;
  }
</style>
