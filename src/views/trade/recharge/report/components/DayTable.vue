<template>
  <div>
    <!--表格内容栏-->
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="tableData" size="mini" border
              ref="multipleTable"
              tooltip-effect="dark" style="width: 100%; margin-bottom: 40px;" @selection-change="handleSelectionChange"
              v-loading='dataListLoading'>
      <el-table-column type="selection" width="40" style="text-align: center;">
      </el-table-column>
      <el-table-column prop="" label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalRecharge" label="充值总金额（元）" align="center" min-width="150" sortable>
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.totalRecharge)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalGift" label="赠送总金额（元）" align="center" min-width="150" sortable>
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.totalGift)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalNums" label="总订单数" align="center" min-width="100">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold">{{scope.row.totalNums}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rechargeDateStart" label="日期" align="center" min-width="120">
        <template slot-scope="scope">
          {{scope.row.rechargeDateStart.substring(0,10)}}
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
  import {RechargeOrderService} from '@/service/trade/recharge/RechargeOrderService';
  import * as formatter from "@/utils/formatter";

  export default {
    name: "DayTable",
    data() {
      return {
        pageIndex: 1,
        pageSize: 30,
        totalPage: 0,
        dataListLoading: false,
        tableData: [],
        dataForm: {},
      };
    },
    mounted() {
      this.rechargeOrderService = new RechargeOrderService();
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
        this.rechargeOrderService.pageDayList(this.dataForm).then(response => {
          this.tableData = response.rows;
          this.totalPage = parseInt(response.total);
          this.dataListLoading = false
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
      rechargeDimensionExport(queryParams) {
        queryParams.exportFlag = 0;
        this.rechargeOrderService.rechargeDimensionExport(queryParams).then(response => {
          window.location.href = response.data;
        })
      }
    }
  };
</script>
<style lang="scss">
</style>
