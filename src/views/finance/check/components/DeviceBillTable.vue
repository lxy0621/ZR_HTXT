<template>
  <div style="margin-top: 10px;">
    <!--表格内容栏-->
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="tableData" size="mini" border
              ref="multipleTable"
              tooltip-effect="dark" style="width: 100%; margin-bottom: 40px;" @selection-change="handleSelectionChange"
              v-loading='dataListLoading'>
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="120">
        <template slot-scope="scope">
          <router-link type="primary" style="color:#409EFF; text-decoration-line: none;"
                       :to="{path:'/trade/expense/orders/expenseTotal',query:{transTime:scope.row.transTime,orgEmployeeId:scope.row.orgEmployeeId}}">
            收款明细
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="序号" width="100" align="center">
        <template slot-scope="scope">
          <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="employeeName" label="加油员姓名" min-width="120" align="center"></el-table-column>
      <el-table-column prop="totalMoney" label="应收总金额（元）" align="center" min-width="120">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.totalMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalPayMoney" label="实收总金额（元）" align="center" min-width="120">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.totalPayMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalGift" label="优惠总金额（元）" align="center" min-width="120">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.totalGift)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalNums" label="单数" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{scope.row.totalNums}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="transTime" label="班次日期" align="center" min-width="120">
        <template slot-scope="scope">
          {{scope.row.transTime.substring(0,10)}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="fixed-bottom-page" small :current-page="pageIndex" :page-sizes="[30, 50, 100, 200]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="totalPage" @size-change="sizeChangeHandle"
                   @current-change="currentChangeHandle"></el-pagination>
  </div>
</template>

<script>
  import {ExpenseOrderService} from '@/service/trade/expense/ExpenseOrderService.js';
  import * as formatter from "@/utils/formatter";

  export default {
    name: "DeviceBillTable",
    data() {
      return {
        expenseOrderService: null,
        pageIndex: 1,
        pageSize: 30,
        totalPage: 0,
        dataListLoading: false,
        tableData: [],
        dataForm: {},
      };
    },
    mounted() {
      this.expenseOrderService = new ExpenseOrderService();
      this.getDataList(this.dataForm);
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      getDataList(params) {
        this.dataForm = params;
        this.dataListLoading = true;
        this.dataForm.page = this.pageIndex;
        this.dataForm.limit = this.pageSize;
        debugger
        this.expenseOrderService.pageDeviceData(this.dataForm).then(response => {
          this.tableData = response.rows;
          this.totalPage = parseInt(response.total);
          this.dataListLoading = false;
        });
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList(this.dataForm);
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val;
        this.getDataList(this.dataForm);
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
  };
</script>
<style lang="scss">
</style>
