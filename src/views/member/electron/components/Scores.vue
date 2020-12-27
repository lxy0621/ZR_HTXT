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
      <el-table-column prop="id" label="订单号" align="center" min-width="80"></el-table-column>
      <el-table-column label="积分" align="center" min-width="80">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;" v-if="scope.row.changeType === 1">{{'+ ' + scope.row.changedScore}}</span>
          <span style="color: goldenrod; font-weight: bold;" v-if="scope.row.changeType === 2">{{'- ' + scope.row.changedScore}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="afterScore" label="积分余额" align="center" min-width="100"></el-table-column>
      <el-table-column prop="createdAt" label="交易时间" align="center" min-width="120"></el-table-column>
      <el-table-column prop="memo" label="备注" align="center" min-width="120"></el-table-column>
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

  export default {
    name: "Scores",
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
        this.memberService.pageScoreLogsByMemberId(this.queryParams)
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
