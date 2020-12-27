<template>
  <div>
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      v-loading="tableLoading"
    >
      <el-table-column type="selection" width="40" style="text-align: center"></el-table-column>
      <el-table-column prop="handle" label="操作" fixed align="center" width="120">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleDetail(scope.row)" size="small">详情&ensp;</el-link>
          <el-link type="danger" :underline="false" @click="handleRefund(scope.row)" size="small" v-if="scope.row.orderState != '2'">退款&ensp;</el-link>
          <el-link type="danger" :underline="false" @click="handleDelete(scope.row)" size="small">删除</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="orderStateDesc" label="订单状态" align="center" min-width="80"></el-table-column>
      <el-table-column prop="outTradeNo" label="订单号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="stationName" label="油/气站" align="center" min-width="170"></el-table-column>
      <el-table-column prop="gunNo" label="枪号" align="center" min-width="70"></el-table-column>
      <el-table-column prop="productSkuName" label="油/气品类" align="center" min-width="80"></el-table-column>
      <el-table-column prop="operatorName" label="操作员" align="center" min-width="90"></el-table-column>
      <el-table-column prop="employeeName" label="收款员" align="center" min-width="90"></el-table-column>
      <el-table-column prop="money" label="收款金额（元）" align="center" min-width="110">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold">{{formatNumber(scope.row.money)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center" min-width="140"></el-table-column>
      <el-table-column prop="tradeFlowNo" label="交易流水号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="payResultDesc" label="支付状态" align="center" min-width="90"></el-table-column>
      <el-table-column prop="tradedAt" label="收款时间" align="center" min-width="140"></el-table-column>
      <el-table-column prop="refundStateDesc" label="退款状态" align="center" min-width="90"></el-table-column>
      <el-table-column prop="refundedAt" label="退款时间" align="center" min-width="140"></el-table-column>
    </el-table>
    <el-pagination
      class="fixed-bottom-page"
      small
      :current-page="queryParams.page"
      :page-sizes="[30, 50, 100, 200]"
      :page-size="queryParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <!--订单详情-->
    <el-drawer :visible.sync="detailDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">订单详情</span>
      <div style="margin-top: 20px;">
        <span>订单信息</span>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单状态</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.orderStateDesc }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.outTradeNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">创建时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.createdAt }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">交易流水号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.tradeFlowNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付状态</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.payResultDesc }}</div>
          </el-col>
        </el-row>
        <!-- 订单状态：已完成 -->
        <template v-if="detailData.orderState === 2">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">收款时间</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">收款时间</div>
            </el-col>
          </el-row>
          <!-- 退款状态: 全部退款 -->
          <template v-if="detailData.refundState === 3">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content-right">退款状态</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content-left">{{ detailData.refundStateDesc }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content-right">退款金额</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content-left">{{ detailData.refundMoney }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content-right">操作人</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content-left">{{ detailData.operator }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content-right">退款时间</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content-left">{{ detailData.refundedAt }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content-right">备注</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content-left">{{ detailData.memo }}</div>
              </el-col>
            </el-row>
          </template>
        </template>
        <!-- 订单状态：已关闭 -->
        <template v-if="detailData.orderState === 3">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">操作人</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">系统自动关闭</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">关闭时间</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ detailData.closedAt }}</div>
            </el-col>
          </el-row>
        </template>
        <el-divider></el-divider>
        <span>基本信息</span>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气站</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.stationName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">枪号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.gunNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气品类</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.productSkuName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">操作员</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.operatorName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款员</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ detailData.employeeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{ formatNumber(detailData.money) }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">非平台收款</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款对象</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">非会员</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款方式</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">站内快捷（直）付</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: center; margin-top: 20px;">
            <el-button @click="handleDetailClose" size="medium" style="width: 100%;">关 闭</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <!--退款-->
    <el-drawer :visible.sync="refundDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">订单详情</span>
      <div style="margin-top: 20px;">
        <span>订单信息</span>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单状态</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.orderStateDesc }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.outTradeNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">创建时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.createdAt }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">交易流水号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.tradeFlowNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付状态</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.payResultDesc }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">退款状态</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.refundStateDesc }}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <span>基本信息</span>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气站</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.stationName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">枪号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.gunNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气品类</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.productSkuName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">操作员</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.operatorName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款员</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ refundData.employeeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{ formatNumber(refundData.money) }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">非平台收款</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款对象</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">非会员</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款方式</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">站内快捷(直)付</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">退款金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold;">{{ formatNumber(refundData.money) }}</span>&ensp;元
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">备注</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <el-input type="textarea" :rows="3" size="medium" v-model="refundData.memo" style="width: 100%" maxlength="200" show-word-limit>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="text-align: center; margin-top: 20px;">
          <el-col :span="12">
            <el-button @click="handleRefundClose" size="medium" style="width: 100%;">取 消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click="handleRefundSubmit" type="primary" size="medium" style="width: 100%;">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {DirectOrderService} from '@/service/trade/direct/DirectOrderService.js';
  import * as formatter from "@/utils/formatter";

  export default {
    name: "DirectOrderTable",
    data() {
      return {
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        tableLoading: false,
        directOrderService: null,
        detailData: {},
        detailDrawer: false,
        refundData: {
          memo: undefined,
        },
        refundDrawer: false,
      }
    },
    mounted() {
      this.directOrderService = new DirectOrderService();
      this.getList(this.queryParams);
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      getList(queryParams) {
        this.tableLoading = true;
        queryParams.page = undefined != queryParams.page ? this.queryParams.page : 1;
        queryParams.limit = undefined != queryParams.limit ? this.queryParams.limit : 30;
        this.queryParams = queryParams;
        this.directOrderService.pagingDirectOrders(this.queryParams)
          .then(response => {
            this.tableData = response.rows;
            this.total = parseInt(response.total);
            this.tableLoading = false;
          });
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      handleSizeChange(val) {
        this.queryParams.limit = val;
        this.getList(this.queryParams);
      },
      handleCurrentChange(val) {
        this.queryParams.page = val;
        this.getList(this.queryParams);
      },
      handleDetail(row) {
        this.detailData = row;
        this.detailDrawer = true;
      },
      handleDetailClose() {
        this.detailData = {};
        this.detailDrawer = false;
      },
      handleRefund(row) {
        this.refundData = row;
        this.refundDrawer = true
      },
      handleRefundSubmit() {
        let refundForm = {
          id: this.refundData.id,
          memo: this.refundData.memo,
        }
        this.directOrderService.refundDirectOrder(refundForm).then(response => {
          if (response.success) {
            this.$message({
              message: response.message,
              type: "success"
            });
            this.getList(this.queryParams);
            this.refundDrawer = false;
          } else {
            this.$message({
              message: response.message,
              type: "error"
            });
          }
        });
      },
      handleRefundClose() {
        this.refundData = {};
        this.refundDrawer = false;
      },
      handleDelete(row) {
        this.$confirm('确定删除该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.directOrderService.deleteDirectOrder(row.id)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList(this.queryParams);
              } else {
                this.$message({
                  message: response.message,
                  type: 'error'
                });
              }
            });
        }).catch(() => {
        });
      },
    }
  }
</script>

<style scoped>
  .grid-content-right {
    min-height: 26px;
    line-height: 26px;
    text-align: right;
    font-weight: bold;
    color: #919191;
    font-size: 12px;
  }

  .grid-content-left {
    min-height: 26px;
    line-height: 26px;
    text-align: left;
    font-size: 12px;
  }
</style>
