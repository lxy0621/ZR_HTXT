<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom: 40px;"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" style="text-align: center" width="40"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="180">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="handleOrderDetail(scope.row)">详情</el-link>&ensp;
          <el-link type="primary" :underline="false" size="small" @click="handleOrderMemo(scope.row)">备注</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" label="订单号" align="center"></el-table-column>
      <el-table-column prop="memberNickname" label="会员昵称" align="center"></el-table-column>
      <el-table-column prop="memberMobile" label="会员手机号" align="center"></el-table-column>
      <el-table-column prop="productCount" label="兑换商品数" align="center"></el-table-column>
      <el-table-column prop="totalScore" label="消费积分" align="center"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" align="center">
        <template slot-scope="scope">
          <span v-for="item in orderState" :value="item.value" :key="item.value">{{'' + scope.row.orderState === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="订单时间" align="center"></el-table-column>
      <el-table-column prop="memo" label="备注" align="center"></el-table-column>
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

    <!-- 订单详情 -->
    <el-dialog title="提示" :visible.sync="orderProductDialogVisible" width="60%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="订单商品" name="first">
          <order-product-record ref="orderProduct"></order-product-record>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" style="text-align: right;">
				<el-button size="medium" @click="orderProductDialogVisible = false">关 闭</el-button>
			</span>
    </el-dialog>

    <!-- 订单备注 -->
    <el-dialog title="提示" :visible.sync="memoDialogVisible" width="30%" center>
      <el-tabs v-model="memoTab">
        <el-tab-pane label="填写备注" name="first">
          <el-form ref="form" label-width="100px" :model="memoForm" size="small">
            <el-form-item prop="name" label="备注"><el-input type="textarea" size="small" v-model="memoForm.memo"></el-input></el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="memoDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="saveMemo">确 定</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
  import {OrderService} from '@/service/marketing/mall/OrderService';
  import {CommonService} from "@/service/common/CommonService";
  import OrderProductRecord from "@/views/marketing/mall/components/OrderProductRecord";

  export default {
    name: 'ProductTable',
    components: {OrderProductRecord},
    data() {
      return {
        orderService: undefined,
        selectRows: [],
        loading: false,
        tableData: [],
        total: 0,
        orderProductDialogVisible: false,
        queryParams: {
          page: 1,
          limit: 30
        },
        orderState: [],
        activeName: 'first',
        memoDialogVisible: false,
        memoForm: {
          memo: undefined,
        },
        memoTab: 'first',
      };
    },
    mounted() {
      this.orderService = new OrderService();
      this.initSelectData();
      this.getList(this.queryParams);
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "orderState",
          enumValue: "EnumMallOrderState",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('mall', param).then(response => {
          that.orderState = response.orderState;
        });
      },
      getList(params) {
        this.loading = true;
        if (undefined != params.page) {
          params.page = this.queryParams.page;
        } else {
          params.page = 1;
        }
        if (undefined != params.limit) {
          params.limit = this.queryParams.limit;
        } else {
          params.limit = 30;
        }
        this.queryParams = params;
        this.orderService.pagingOrders(params).then(response => {
          this.tableData = response.rows;
          this.total = parseInt(response.total);
          this.loading = false;
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
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      handleOrderDetail(row) {
        let queryParams = {
          orderId: row.id,
          page: 1,
          limit: 30,
        };
        let _this = this;
        setTimeout(() => {
          _this.$refs.orderProduct.getList(queryParams);
        }, 10)
        this.orderProductDialogVisible = true;
      },
      handleOrderMemo(row) {
        this.memoForm = {
          id: row.id,
          memo: row.memo,
        }
        this.memoDialogVisible = true;
      },
      saveMemo() {
        this.orderService.saveMallOrderMemo(this.memoForm).then(response => {
          if (response.success === true) {
            this.$message({
              message: response.message,
              type: "success"
            });
            this.getList(this.queryParams);
            this.memoDialogVisible = false;
          } else {
            this.$message({
              message: response.message,
              type: "warning"
            });
          }
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
