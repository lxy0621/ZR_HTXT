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
      <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="productCount" label="兑换数量" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{scope.row.productCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unitScore" label="单品积分" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{scope.row.unitScore}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalScore" label="消费总积分" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{scope.row.totalScore}}</span>
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
  </div>
</template>

<script>
  import {OrderService} from "@/service/marketing/mall/OrderService";

  export default {
    name: "OrderProductRecord",
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
        orderService: null,
      };
    },
    mounted() {
      this.orderService = new OrderService();
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {
        if (queryParams.orderId !== undefined) {
          this.queryParams.orderId = queryParams.orderId;
        }
        this.orderService.pagingOrderProducts(this.queryParams)
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
