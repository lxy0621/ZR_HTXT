<template>
  <div style="margin-top: 10px;">
    <!--表格内容栏-->
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="tableData" size="mini" border ref="multipleTable"
      tooltip-effect="dark" style="width: 100%; margin-bottom: 40px;" @selection-change="handleSelectionChange" v-loading='dataListLoading'>
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="100">
        <template slot-scope="scope">
          <router-link tag="span" type="primary" class="pan-btn blue-btn pan-btn-100" :to="{path:'/trade/recharge/orders/management',query:{dateNo:scope.row.dateNo}}">
            <span style="color:#409EFF;cursor:pointer;">查看明细</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="序号" align="center" width="80">
        <template slot-scope="scope">
          <span>{{(pageIndex - 1) * pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="充值单数" align="center" width="80">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{scope.row.totalCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalRecharge" label="充值总金额（元）" align="center" min-width="150">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.totalRechargeMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalGift" label="赠送总金额（元）" align="center" min-width="160">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold">{{formatNumber(scope.row.totalGiftMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalRechargeUp" label="线上充值总数（元 / 单）" align="center" min-width="160">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.atlMoney)}}</span>
          <span> / </span>
          <span style="color: #1e9fff; font-weight: bold;">{{scope.row.atlCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalRechargeDown" label="线下充值总数（元 / 单）" align="center" min-width="160">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.btlMoney)}}</span>
          <span> / </span>
          <span style="color: #1e9fff; font-weight: bold;">{{scope.row.btlCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dateNo" label="充值日期" align="center" min-width="120"></el-table-column>
    </el-table>
    <el-pagination class="fixed-bottom-page" small :current-page="pageIndex" :page-sizes="[30, 50, 100, 200]" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="totalPage" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"></el-pagination>
    </div>
</template>

<script>
  import {RechargeOrderService} from '@/service/trade/recharge/RechargeOrderService';
  import * as formatter from "@/utils/formatter";

  export default {
    name: "RechargeTable",
    data() {
      return {
        rechargeOrderService:null,
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
      this.getDataList(this.dataForm)
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
        this.rechargeOrderService.pageDeviceList(this.dataForm).then(response => {
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
