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
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="140">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="handleUnbindCar(scope.row)">解除绑定</el-link>&ensp;
          <el-link type="primary" :underline="false" size="small" @click="handleExpenseRecord(scope.row)">消费记录</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="plateNo" label="车牌号" min-width="180" align="center"></el-table-column>
      <el-table-column prop="cardNo" label="会员卡号" align="center" min-width="180"></el-table-column>
      <el-table-column prop="boundTime" label="绑定时间" align="center" min-width="180"></el-table-column>
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
  import {RoleService} from "@/service/cloudoa/org/RoleService";

  export default {
    name: "BoundCars",
    data() {
      return {
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        memberService: null,
      };
    },
    mounted() {
      this.memberService = new MemberService();
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {
        if (queryParams.memberId !== undefined) {
          this.queryParams.memberId = queryParams.memberId;
        }
        this.memberService.pageBoundCarsByMemberId(this.queryParams)
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
      handleUnbindCar(row) {
        this.$confirm('确定解绑此车辆吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // 解绑车辆
          let param = {
            id: row.id
          }
          this.memberService.unbindCar(param)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: "success"
                });
                this.getList(this.queryParams);
              } else {
                this.$message({
                  message: response.message,
                  type: "warning"
                });
              }
            });
        }).catch(() => {
        });
      },
      handleExpenseRecord(row) {
        let param = {
          memberId: this.queryParams.memberId,
        }
        this.$emit('expenseRecord', param);
      },
      closeDialog() {
        this.$emit('closeCheckDialog', false);
      }
    },
  };
</script>
<style lang="scss" scoped>
  .dialog-title {
    line-height: 30px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 10px;
  }

  .el-input {
    width: 350px;
  }

  .el-form-item {
    margin-top: 6px;
  }

  .page {
    background: #ebebeb;
    text-align: right;
    padding: 6px;
  }

  .closeBtn {
    margin-top: 10px !important;
  }
</style>
