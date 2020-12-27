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
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cardNo" label="会员卡号" align="center"></el-table-column>
      <el-table-column prop="rechargeMoney" label="扣款金额（元）" align="center">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.rebateMoney === undefined || scope.row.rebateMoney === 0 ? '0' : formatNumber(scope.row.rebateMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rechargeMoney" label="扣款充值金额（元）" align="center">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.rechargeMoney === undefined || scope.row.rechargeMoney === 0 ? '0' : formatNumber(scope.row.rechargeMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="giftMoney" label="扣款赠送金额（元）" align="center">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.giftMoney === undefined || scope.row.giftMoney === 0 ? '0' : formatNumber(scope.row.giftMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rebateType" label="扣款类型" align="center">
        <template slot-scope="scope">
          <span v-for="item in rebateType" :value="item.value" :key="item.value">{{'' + scope.row.rebateType === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rebateDate" label="扣款时间" align="center"></el-table-column>
      <el-table-column prop="operatorName" label="操作员工" align="center" width="100"></el-table-column>
      <el-table-column prop="memo" label="备注" align="center" width="150"></el-table-column>
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
    name: "RebateRecord",
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
        rebateType: [],
        memberService: null,
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
          enumKey: "rebateType",
          enumValue: "EnumBalanceType",
        }];
        this.commonService.findEnumExcludeAll('member', param).then(response => {
          that.rebateType = response.rebateType;
        });
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {
        if (queryParams.memberId !== undefined) {
          this.queryParams.memberId = queryParams.memberId;
        }
        this.memberService.pageRebateOrdersByMemberId(this.queryParams)
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
