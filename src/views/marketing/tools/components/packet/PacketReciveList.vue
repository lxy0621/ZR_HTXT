<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-top:20px;margin-bottom:40px"
    >
      <el-table-column prop="memberNo" label="会员编号" align="center"></el-table-column>
      <el-table-column prop="svipDisplay" label="会员类型" align="center"></el-table-column>
      <el-table-column prop="svip" label="会员等级" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
      <el-table-column prop="memberName" label="会员姓名" align="center">-</el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="createdAt" label="发放时间" align="center"></el-table-column>
      <el-table-column prop="usedStateDisplay" label="领取状态" align="center" width="120"></el-table-column>
      <el-table-column prop="usedTime" label="领取时间" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="fixed-bottom-page"
      small
      :current-page="this.currentPage"
      :page-sizes="[30, 50, 100, 200]"
      :page-size="queryParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { RedPacketAdminService } from "@/service/marketing/tools/RedPacketAdminService";
export default {
  name: "PacketReciveList",
  data() {
    return {
      tableData: [],
      currentPage: 0,
      total: 0,
      pageSize: 0,
      //分页参数
      queryParams: {
        batchId: undefined,
        page: 1,
        limit: 30
      }
    };
  },
  mounted() {
    this.redPacketAdminService = new RedPacketAdminService();
    if (this.$route.query.data !== undefined) {
      this.queryParams.batchId = parseInt(this.$route.query.data.id);
    }
    this.loadPacketReciveData(this.queryParams);
  },
  methods: {
    loadPacketReciveData(params) {
      params.page == undefined
        ? (params.page = 1)
        : (params.page = this.queryParams.page);
      params.limit == undefined
        ? (params.limit = 30)
        : (params.limit = this.queryParams.limit);
      this.queryParams = params;
      this.redPacketAdminService
        .pagingRedPackages(this.queryParams)
        .then(response => {
          this.tableData = response.rows;
          this.total = parseInt(response.total);
        });
    },
    handleSizeChange(val) {
      this.queryParams.limit = val;
      this.loadPacketReciveData(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.loadPacketReciveData(this.queryParams);
    }
  }
};
</script>
<style lang="scss"></style>
