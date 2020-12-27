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
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="280">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="adminEngine(scope.row)">管理油机&ensp;</el-link>
          <el-link type="success" :underline="false" size="small" @click="adminOilGun(scope.row)">管理油枪&ensp;</el-link>
          <el-link type="warning" :underline="false" size="small" @click="adminTicket(scope.row)">管理小票机&ensp;</el-link>
          <el-link type="danger" :underline="false" size="small" @click="configAgentQRCode(scope.row)" >代收二维码</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="stationName" min-width="250" label="油气站名称" align="center"></el-table-column>
      <el-table-column prop="departmentViewName" label="油气站简称" align="center" min-width="250"></el-table-column>
      <el-table-column prop="managerEmployeeName" label="主管名称" align="center" min-width="120"></el-table-column>
      <el-table-column prop="stationStateDispaly" label="部门状态" align="center" min-width="100"></el-table-column>
      <el-table-column prop="oilMachineNum" label="油机数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="oilGunNum" label="油枪数量" align="center" min-width="100"></el-table-column>
      <el-table-column prop="isPrintTicket" label="油站是否打印票" align="center" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.isPrintTicket == '0'">否</span>
          <span v-if="scope.row.isPrintTicket == '1'">是</span>
        </template>
      </el-table-column>
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
  import {StationService} from "@/service/system/station/StationService";

  export default {
    name: "StationAdminTable",
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 0,
        pageSize: 0,
        //分页参数
        queryParams: {
          page: 1,
          limit: 30
        },
        //弹窗控制参数
        machineUpdateDialogVisible: false,
        activeName: "first",
        //修改参数
        updateForm: {
          stationName: undefined,
          machineId: undefined,
          machineState: [
            {
              id: 1,
              name: "已启用"
            },
            {
              id: 2,
              name: "已停用"
            }
          ],
          machineStateValue: ""
        },
        formLabelWidth: "120px"
      };
    },
    mounted() {
      this.station = new StationService();
      this.getList(this.queryParams);
    },
    methods: {
      //获取列表
      getList(params) {
        params.page == undefined
          ? (params.page = 1)
          : (params.page = this.queryParams.page);
        params.limit == undefined
          ? (params.limit = 30)
          : (params.limit = this.queryParams.limit);
        this.queryParams = params;
        this.station.pagingStation(params).then(response => {
          this.total = parseInt(response.total);
          this.tableData = response.rows;
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
      adminEngine(row) {
        let stationId = row.stationId;
        this.$router.push({
          path: "/system/station/oilMachines",
          query: {id: stationId}
        });
      },
      adminOilGun(row) {
        let stationId = row.stationId;
        this.$router.push({
          path: "/system/station/oilGuns",
          query: {id: stationId}
        });
      },
      adminTicket(row) {
        let stationName = row.stationName;
        this.$router.push({
          path: "/system/ticket/configure",
          query: {name: stationName}
        });
      },
      configAgentQRCode(row) {
        this.$router.push({
          path: "/cloudoa/station/agentQRCode",
          query: {id: row.stationId}
        });
      }
    }
  };
</script>
<style lang="scss"></style>
