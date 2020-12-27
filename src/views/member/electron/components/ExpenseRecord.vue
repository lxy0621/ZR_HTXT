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
      <el-table-column label="序号" align="center" width="60">
        <template slot-scope="scope">
          <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cardNo" label="会员卡" align="center" min-width="100"></el-table-column>
      <el-table-column prop="money" label="消费金额（元）" align="center" min-width="110">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.money === 0 ? '0' : formatNumber(scope.row.money)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="moeny" label="实际支付金额（元）" align="center" min-width="130">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.money === 0 ? '0' : formatNumber(scope.row.money)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="employeeName" label="加油员" align="center" min-width="80"></el-table-column>
      <el-table-column prop="stationName" label="油/气站" align="center" min-width="210"></el-table-column>
      <el-table-column label="油机/油枪" align="center" min-width="90">
        <template slot-scope="scope">
          {{scope.row.oilMachineNo + '-' + scope.row.oilGunNo}}
        </template>
      </el-table-column>
      <el-table-column prop="productSkuName" label="油/气品" align="center" min-width="70"></el-table-column>
      <el-table-column prop="payGroud" label="支付方式" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-for="item in payGround" :value="item.value" :key="item.value">{{'' + scope.row.payGround === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="invoice" label="发票状态" align="center" min-width="70">
        <template slot-scope="scope">
          <span v-for="item in invoicedState" :value="item.value" :key="item.value">{{'' + scope.row.invoiced === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="transTime" label="支付时间" align="center" min-width="135"></el-table-column>
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
    name: "ExpenseRecord",
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
        payGround: [],
        invoicedState: [],
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
          enumKey: "payGround",
          enumValue: "EnumPayGround",
        }, {
          enumKey: "invoicedState",
          enumValue: "EnumInvoicedState",
        }];
        this.commonService.findEnumExcludeAll('station', param).then(response => {
          that.payGround = response.payGround;
          that.invoicedState = response.invoicedState;
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
        this.memberService.pageExpenseOrdersByMemberId(this.queryParams)
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
