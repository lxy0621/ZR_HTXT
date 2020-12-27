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
      style="width: 100%; margin-bottom: 40px;"
      @selection-change="handleSelectionChange"
      v-loading="tableLoading"
    >
      <el-table-column type="selection" width="40" style="text-align: center"></el-table-column>
      <el-table-column prop="handle" label="操作" fixed align="center" width="180">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="handleDetail(scope.row)"
            size="small"
          >详情&ensp;</el-link>
          <el-link
            type="primary"
            :underline="false"
            @click="handleData(scope.row)"
            size="small"
            v-if="scope.row.batchState != 1"
          >数据&ensp;</el-link>
          <el-link
            type="primary"
            :underline="false"
            @click="updatePacket(scope.row)"
            v-if="scope.row.batchState == 1"
            size="small"
          >修改&ensp;</el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="deletePacket(scope.row)"
            v-if="scope.row.batchState == 1"
            size="small"
          >删除&ensp;</el-link>
          <!-- <el-link
            type="success"
            :underline="false"
            @click="handleStartPacket(scope.row)"
            v-if="scope.row.batchState == 1"
            size="small"
          >开启</el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="handleEndPacket(scope.row)"
            v-if="scope.row.batchState == 2"
            size="small"
          >关闭</el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="handleRestartPacket(scope.row)"
            v-if="scope.row.batchState == 3"
            size="small"
          >启用</el-link>-->
        </template>
      </el-table-column>
      <el-table-column prop="batchStateDisplay" label="红包状态" align="center"></el-table-column>
      <el-table-column prop="batchNo" label="红包批次号" align="center" width="180"></el-table-column>
      <el-table-column prop="redPacketName" label="红包名称" align="center" width="200"></el-table-column>
      <el-table-column prop="batchName" label="红包批次名称" align="center" width="200"></el-table-column>
      <el-table-column prop="money" label="红包金额" align="center">
        <template slot-scope="scope">
          <span
            style="color: red; font-weight: bold;"
          >{{ scope.row.money === undefined ? '--' : scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalCount" label="红包个数" align="center">
        <template slot-scope="scope">
          <span
            style="color: #409EFF; font-weight: bold;"
          >{{ scope.row.totalCount === undefined ? '--' : scope.row.totalCount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="usedCount" label="已发放" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold">{{ scope.row.usedCount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="surplusCount" label="剩余量" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold">{{ scope.row.surplusCount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityId" label="活动ID:活动名称" align="center" width="180">
        <template slot-scope="scope">
          <router-link
            class="el-link el-link--primary"
            type="primary"
            :underline="false"
            @click="handleDetail(scope.row)"
            :to="{ path: '/marketing/activity/ActivityAdmin', query: { id: scope.row.activityId }}"
            size="small"
          >{{ scope.row.activityId === undefined || scope.row.activityName === undefined ? '--:--' : scope.row.activityId +':'+ scope.row.activityName }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="creatorName" label="创建人/创建时间" align="center" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.creatorName }} / {{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="更新人/更新时间" align="center" width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.updatorName }} / {{ scope.row.updatedAt }}</span>
        </template>
      </el-table-column>
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
    <!-- 红包详情弹出框 -->
    <el-dialog title="提示" :visible.sync="detailDialog" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="红包详情" name="first">
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">红包名称：</div>
            </el-col>
            <el-col :span="14">
              <span class="grid-content-left">{{ this.message.redPacketName }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">红包批次号：</div>
            </el-col>
            <el-col :span="14">
              <span class="grid-content-left">{{ this.message.batchNo }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">红包批次名称：</div>
            </el-col>
            <el-col :span="14">
              <span class="grid-content-left">{{ this.message.batchName }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">红包金额：</div>
            </el-col>
            <el-col :span="14">
              <span class="grid-content-left">{{ this.message.money }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">红包个数：</div>
            </el-col>
            <el-col :span="14">
              <span class="grid-content-left">{{ this.message.totalCount }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">备注：</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content-left">{{ this.message.memo }}</div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="detailDialog = false" style="float: right;">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { RedPacketAdminService } from "@/service/marketing/tools/RedPacketAdminService";

export default {
  name: "PacketAdminTable",
  data() {
    return {
      redPacketAdminService: null,
      selectRows: [],
      tableData: [],
      message: {
        id: undefined,
        packetName: undefined,
        batchNo: undefined,
        packetType: undefined,
        amount: undefined,
        number: undefined,
        remarks: "-",
        batchState: undefined
      },
      total: 0,
      queryParams: {
        page: 1,
        limit: 30
      },
      currentRow: {},
      tableLoading: false,
      activityState: [],
      activityType: [],
      userScopeType: [],
      detailDialog: false,
      activeName: "first",
      detailType: undefined
    };
  },
  mounted() {
    this.redPacketAdminService = new RedPacketAdminService();
    // wuchao 活动跳转到红包详情
    if (undefined != this.$route.query.id) {
      let id = this.$route.query.id;
      let row = {
        id: id
      };
      this.handleDetail(row);
    }
    this.getList(this.queryParams);
  },
  methods: {
    handleSelectionChange() {},
    getList(params) {
      params.page == undefined
        ? (params.page = 1)
        : (params.page = this.queryParams.page);
      params.limit == undefined
        ? (params.limit = 30)
        : (params.limit = this.queryParams.limit);
      this.queryParams = params;
      this.redPacketAdminService
        .pagingRpBatches(this.queryParams)
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
    handleDetail(row) {
      const that = this;
      this.redPacketAdminService.getRpBatch(row.id).then(response => {
        if (response.data != undefined) {
          that.message = response.data;
          this.detailDialog = true;
        } else {
          this.$alert("红包不存在", "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      });
    },
    handleData(row) {
      this.$router.push({
        path: "./PacketData",
        query: {
          data: row
        }
      });
    },
    // handleClosePacket(row) {},
    // handleEndPacket(row) {
    //   let params = {
    //     batchId: parseInt(row.id),
    //     batchState: 3
    //   };
    //   this.$confirm("确定要关闭该红包吗？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.redPacketAdminService
    //         .updateRpBatchState(params)
    //         .then(response => {
    //           if (response.success == true) {
    //             this.$message({
    //               message: response.message,
    //               type: "success"
    //             });
    //             this.getList(this.queryParams);
    //           } else {
    //             this.$message({
    //               message: response.message,
    //               type: "error"
    //             });
    //           }
    //         });
    //     })
    //     .catch(() => {});
    // },
    // handleStartPacket(row) {
    //   let params = {
    //     batchId: parseInt(row.id),
    //     batchState: 2
    //   };
    //   this.$confirm("确定要开启该红包吗？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.redPacketAdminService
    //         .updateRpBatchState(params)
    //         .then(response => {
    //           if (response.success == true) {
    //             this.$message({
    //               message: response.message,
    //               type: "success"
    //             });
    //             this.getList(this.queryParams);
    //           } else {
    //             this.$message({
    //               message: response.message,
    //               type: "error"
    //             });
    //           }
    //         });
    //     })
    //     .catch(() => {});
    // },
    // handleRestartPacket(row) {
    //   let params = {
    //     batchId: parseInt(row.id),
    //     batchState: 2
    //   };
    //   this.$confirm("确定要启用该红包吗？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.redPacketAdminService
    //         .updateRpBatchState(params)
    //         .then(response => {
    //           if (response.success == true) {
    //             this.$message({
    //               message: response.message,
    //               type: "success"
    //             });
    //             this.getList(this.queryParams);
    //           } else {
    //             this.$message({
    //               message: response.message,
    //               type: "error"
    //             });
    //           }
    //         });
    //     })
    //     .catch(() => {});
    // },
    //修改
    updatePacket(row) {
      this.$router.push({
        path: "/marketing/tools/PacketUpdate",
        query: {
          data: row
        }
      });
    },
    //删除
    deletePacket(row) {
      this.$confirm("确定要删除该红包吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.redPacketAdminService.deleteRpBatch(row.id).then(response => {
            if (response.success == true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.detailDialog = false;
              this.getList(this.queryParams);
              this.$emit("refreshPacketGroups", this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    exportData(queryParams) {
      this.queryParams = queryParams;
      this.redPacketAdminService
        .exportRpBatch2Excel(this.queryParams)
        .then(response => {
          window.location.href = response.data;
        });
    }
  }
};
</script>
<style lang="scss">
.el-dialog {
  padding-bottom: 40px;

  .grid-content-right {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    text-align: right;
    font-weight: bold;
    color: #48576a;
  }

  .grid-content-left {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    text-align: left;
  }
}
</style>
