<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      v-loading="tableLoading"
      style="width: 100%;margin-top:20px;margin-bottom:40px"
    >
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="name" label="设备名称" align="center" min-width="160"></el-table-column>
      <el-table-column prop="deviceUuid" label="设备UUID" align="center" min-width="120"></el-table-column>
      <el-table-column prop="stationName" label="授权部门" align="center" min-width="220"></el-table-column>
      <el-table-column prop="stateDisplay" label="当前状态" align="center" min-width="90"></el-table-column>
      <el-table-column prop="lastOnlineTime" label="最后心跳时间" align="center" min-width="140"></el-table-column>
    </el-table>
    <!-- 分页 -->
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
  </div>
</template>

<script>
import {DeviceService} from "@/service/system/device/DeviceService";

export default {
  name: "StatusTable",
  data() {
    return {
      deviceService: undefined,
      tableData: [],
      total: 0,
      queryParams: {
        page: 1,
        limit: 30
      },
      tableLoading: false,
    };
  },
  mounted() {
    this.deviceService = new DeviceService();
    this.getList(this.queryParams);
  },
  methods: {
    getList(params) {
      this.tableLoading = true;
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
      this.deviceService.pagingDeviceStatus(params).then(response => {
        this.tableData = response.rows;
        this.total = parseInt(response.total);
        this.tableLoading = false;
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
  }
};
</script>
<style lang="scss"></style>
