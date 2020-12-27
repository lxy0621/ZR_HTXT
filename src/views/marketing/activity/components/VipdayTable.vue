<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-top:10px;margin-bottom:40px"
    >
      <el-table-column type="selection" width="40" style="text-align: center"></el-table-column>
      <el-table-column type="handle" label="操作" fixed align="center" width="200">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="handleDetail(scope.row)"
            size="small"
          >详情&ensp;
          </el-link>
          <el-link
            type="primary"
            :underline="false"
            @click="handleData(scope.row)"
            size="small"
            v-if="scope.row.state != 1"
          >数据&ensp;
          </el-link>
          <el-link
            type="success"
            :underline="false"
            @click="handleStart(scope.row)"
            size="small"
            v-if="scope.row.state == 1"
          >开始&ensp;
          </el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="handleClose(scope.row)"
            size="small"
            v-if="scope.row.state == 2"
          >关闭&ensp;
          </el-link>
          <el-link
            type="warning"
            :underline="false"
            @click="handleRestart(scope.row)"
            size="small"
            v-if="scope.row.state == 4"
          >启用&ensp;
          </el-link>
          <el-link
            type="primary"
            :underline="false"
            @click="updateVipDay(scope.row)"
            size="small"
            v-if="scope.row.state == 1"
          >修改&ensp;
          </el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="deleteVipDay(scope.row)"
            size="small"
            v-if="scope.row.state == 1"
          >删除
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="stateDisplay" label="会员日状态" align="center" min-width="100"></el-table-column>
      <el-table-column prop="id" label="会员日ID" align="center" min-width="100"></el-table-column>
      <el-table-column prop="name" label="会员日名称" align="center" min-width="150"></el-table-column>
      <el-table-column prop="dateDisplay" label="会员日有效期" align="center" min-width="270">
        <template slot-scope="scope">
          <span>{{ scope.row.fromDate }}&nbsp;至&nbsp;{{ scope.row.toDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="loopIntervalDisplay" label="会员日规则" align="center" min-width="180"></el-table-column>
      <el-table-column prop="activityName" label="活动ID:活动名称" align="center" min-width="180">
        <template slot-scope="scope">
          <router-link
            class="el-link el-link--primary"
            type="primary"
            :underline="false"
            @click="handleDetail(scope.row)"
            :to="{ path: '/marketing/activity/ActivityAdmin', query: { id: scope.row.activityId }}"
            size="small"
          >{{ scope.row.activityId === undefined || scope.row.activityName === undefined ? '--:--' : scope.row.activityId +':'+ scope.row.activityName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="activityMetaName" label="活动类型" align="center" min-width="120"></el-table-column>
      <el-table-column prop="activityUser" label="参与人数" align="center" min-width="80">
        <template slot-scope="scope">
          <span
            style="color: #409EFF; font-weight: bold"
          >{{scope.row.activityUser !== undefined ? scope.row.activityUser : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creatorName" label="创建人/创建时间" align="center" min-width="215">
        <template slot-scope="scope">
          <span>{{ scope.row.creatorName }}&nbsp;/&nbsp;{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatorName" label="更新人/更新时间" align="center" min-width="215">
        <template slot-scope="scope">
          <span>{{ scope.row.updatorName }}&nbsp;/&nbsp;{{ scope.row.updatedAt }}</span>
        </template>
      </el-table-column>
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
    <!-- 详情框 -->
    <el-dialog :visible.sync="detailDialog" width="50%">
      <el-tabs v-model="active">
        <el-tab-pane label="会员日详情" name="first">
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">会员日ID：</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content-left">{{detailData.id}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">会员日名称：</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content-left">{{detailData.name}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">会员日有效期：</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content-left">{{ detailData.fromDate }}至{{ detailData.toDate }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">会员日规则：</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content-left">{{ detailData.loopIntervalDisplay }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">关联活动：</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content-left">{{ detailData.activityName }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <div class="grid-content-right">备注：</div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content-left">{{ detailData.memo }}</div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="detailDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {VipDayAdminService} from "@/service/marketing/activity/VipDayAdminService";

  export default {
    name: "VipdayTable",
    data() {
      return {
        vipDayAdminService: null,
        tableData: [],
        currentPage: 0,
        total: 0,
        pageSize: 0,
        detailDialog: false,
        judge: undefined,
        detailData: {
          id: undefined,
          name: undefined,
          fromDate: undefined,
          toDate: undefined,
          loopIntervalDisplay: undefined,
          activityName: undefined,
          memo: undefined
        },
        //分页参数
        queryParams: {
          page: 1,
          limit: 30
        },
        active: "first"
      };
    },
    mounted() {
      this.vipDayAdminService = new VipDayAdminService();
      this.getList(this.queryParams);

      if (undefined != this.$route.query.id) {
        let id = this.$route.query.id;
        let queryParams = {
          id: id
        };
        let that = this;
        this.vipDayAdminService
          .pagingActMemFestivalConfigs(queryParams)
          .then(response => {
            if (response.data.rows.length > 0) {
              let row = response.data.rows[0];
              that.handleDetail(row);
            } else {
              this.$alert("会员日不存在", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                }
              });
            }
          });
      }
    },
    methods: {
      getList(queryParams) {
        queryParams.page =
          undefined != queryParams.page ? this.queryParams.page : 1;
        queryParams.limit =
          undefined != queryParams.limit ? this.queryParams.limit : 30;
        this.queryParams = queryParams;
        this.vipDayAdminService
          .pagingActMemFestivalConfigs(queryParams)
          .then(response => {
            this.tableData = response.data.rows;
            this.total = parseInt(response.data.total);
          });
      },
      handleSizeChange() {
      },
      handleCurrentChange() {
      },
      //详情
      handleDetail(row) {
        this.judge = row.state;
        this.detailData.id = row.id;
        this.detailData.name = row.name;
        this.detailData.fromDate = row.fromDate;
        this.detailData.toDate = row.toDate;
        this.detailData.loopIntervalDisplay = row.loopIntervalDisplay;
        this.detailData.activityName = row.activityName;
        this.detailData.activityId = row.activityId;
        this.detailData.intervals = row.intervals.split(",");
        this.detailData.loopType = String(row.loopType);
        this.detailData.memo = row.memo;
        this.detailDialog = true;
      },
      //数据
      handleData(row) {
        this.$router.push({
          path: "/marketing/activity/ActivityData",
          query: {
            id: row.activityId,
            activityMetaCode: row.activityMetaCode
          }
        });
      },
      handleStart(row) {
        this.$confirm("开启该会员日后将不再进行 修改 和 删除 操作", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = {
              id: parseInt(row.id),
              state: 2
            };
            this.vipDayAdminService
              .editMemFestivalConfigState(params)
              .then(response => {
                if (response.success == true) {
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  this.getList(this.queryParams);
                  this.$emit("refreshVipDayGroups", this.queryParams);
                } else {
                  this.$message({
                    message: response.message,
                    type: "warning"
                  });
                }
              });
          })
          .catch(() => {
          });
      },
      handleClose(row) {
        this.$confirm("确定要关闭该活动吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = {
              id: parseInt(row.id),
              state: 4
            };
            this.vipDayAdminService
              .editMemFestivalConfigState(params)
              .then(response => {
                if (response.success == true) {
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  this.getList(this.queryParams);
                  this.$emit("refreshVipDayGroups", this.queryParams);
                } else {
                  this.$message({
                    message: response.message,
                    type: "warning"
                  });
                }
              });
          })
          .catch(() => {
          });
      },
      handleRestart(row) {
        this.$confirm("确定要启用该活动吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let params = {
              id: parseInt(row.id),
              state: 2
            };
            this.vipDayAdminService
              .editMemFestivalConfigState(params)
              .then(response => {
                if (response.success == true) {
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  this.getList(this.queryParams);
                  this.$emit("refreshVipDayGroups", this.queryParams);
                } else {
                  this.$message({
                    message: response.message,
                    type: "warning"
                  });
                }
              });
          })
          .catch(() => {
          });
      },
      // 修改
      updateVipDay(row) {
        this.$router.push({
          path: "./VipdayUpdate",
          query: {
            data: row
          }
        });
      },
      // 删除
      deleteVipDay(row) {
        let id = row.id;
        this.$confirm("确定要删除该会员日吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.vipDayAdminService
              .deleteMemFestivalConfig({id})
              .then(response => {
                if (response.success == true) {
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  this.detailDialog = false;
                  this.getList(this.queryParams);
                  this.$emit("refreshVipDayGroups", this.queryParams);
                } else {
                  this.$message({
                    message: response.message,
                    type: "warning"
                  });
                  this.detailDialog = false;
                  this.getList(this.queryParams);
                }
              });
          })
          .catch(() => {
          });
      },
      exportData(queryParams) {
        this.queryParams = queryParams;
        this.vipDayAdminService.exportMemFestivalConfigQueryData(this.queryParams)
          .then(response => {
            window.location.href = response.data;
          });
      }
    }
  };
</script>
<style lang="scss">
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
</style>
