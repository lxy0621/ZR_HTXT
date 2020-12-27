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
      <el-table-column prop="action" label="操作" fixed align="center" width="140">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="handleRechargeRecord(scope.row)">充值记录
          </el-link>&ensp;
          <el-link type="primary" :underline="false" size="small" @click="handleExpenseRecord(scope.row)">消费记录</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cardNo" label="会员卡号" min-width="90" align="center"></el-table-column>
      <el-table-column prop="cardType" label="会员卡类型" align="center" min-width="90">
        <template slot-scope="scope">
          <span v-for="item in cardType" :value="item.value" :key="item.value">{{'' + scope.row.cardType === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalBalance" label="当前余额（元）" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.totalBalance === undefined || scope.row.totalBalance === 0 ? '0' : formatNumber(scope.row.totalBalance)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalRechargeMoney" label="现金余额（元）" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.cashBalance === undefined || scope.row.cashBalance === 0 ? '0' : formatNumber(scope.row.cashBalance)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="giftBalance" label="赠送余额（元）" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.giftBalance === undefined || scope.row.giftBalance === 0 ? '0' : formatNumber(scope.row.giftBalance)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rechargeCount" label="充值次数" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color: #1e9fff; font-weight: bold;">{{scope.row.rechargeCount === undefined || scope.row.rechargeCount === 0 ? '0' : scope.row.rechargeCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expenseCount" label="消费次数" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color: #1e9fff; font-weight: bold;">{{scope.row.expenseCount === undefined || scope.row.expenseCount === 0 ? '0' : scope.row.expenseCount}}</span>
        </template>
      </el-table-column>
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
    name: "ECards",
    data() {
      return {
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        cardType: [],
        memberService: null,
      };
    },
    mounted() {
      this.memberService = new MemberService();
      this.initSelectData();
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      initSelectData() {
        const param = [{
          enumKey: "cardType",
          enumValue: "EnumCardType",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.cardType = response.cardType;
        })
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {
        if (queryParams.memberId !== undefined) {
          this.queryParams.memberId = queryParams.memberId;
        }
        this.memberService.pageCardsByMemberId(this.queryParams)
          .then(response => {
            this.tableData = response.rows;
            this.total = parseInt(response.total);
          });
      },
      handleSizeChange(val) {
        this.queryParams.limit = val;
        this.getList(this.queryParams);
      },
      handleCurrentChange(val) {
        this.queryParams.page = val;
        this.getList(this.queryParams);
      },
      handleRechargeRecord(row) {
        let param = {
          memberId: this.queryParams.memberId,
          cardId: row.id,
        }
        this.$emit('rechargeRecord', param);
      },
      handleExpenseRecord(row) {
        let param = {
          memberId: this.queryParams.memberId,
          cardId: row.id,
        }
        this.$emit('expenseRecord', param);
      },
      closeDialog() {
        this.$emit('closeCheckDialog', false);
      }
    },
  };
</script>
<style lang="scss">
  .page {
    background-color: #efefef;
    text-align: right;
    padding: 4px;
  }

  .closeBtn {
    margin-top: 10px !important;
  }
</style>
