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
      <el-table-column prop="handle" label="操作" fixed align="center" width="160">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleDetail(scope.row)" size="small">详情&ensp;</el-link>
          <el-link type="primary" :underline="false" @click="handleData(scope.row)" size="small" v-if="scope.row.state != '1'">数据&ensp;</el-link>
          <el-link type="danger" :underline="false" @click="handleCloseActivity(scope.row)" size="small" v-if="scope.row.state == 2 && scope.row.dateRangeType != 3">关闭</el-link>
          <el-link type="success" :underline="false" @click="handleEnableActivity(scope.row)" size="small" v-if="scope.row.state == 4 && scope.row.dateRangeType != 3">启用</el-link>
          <el-link type="success" :underline="false" @click="handleStartActivity(scope.row)" size="small" v-if="scope.row.state == 1 && scope.row.dateRangeType != 3">开始&ensp;</el-link>
          <el-link type="primary" :underline="false" @click="updateActivityInline(scope.row)" size="small" v-if="scope.row.state == 1">修改&ensp;</el-link>
          <el-link type="danger" :underline="false" @click="deleteActivityInline(scope.row)" size="small" v-if="scope.row.state == 1">删除</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="stateDisplay" label="活动状态" align="center" min-width="90"></el-table-column>
      <el-table-column prop="id" label="活动ID" align="center" min-width="80"></el-table-column>
      <el-table-column prop="activityMetaCodeDisplay" label="活动类型" align="center" min-width="90"></el-table-column>
      <el-table-column prop="name" label="活动名称" align="center" min-width="200">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="handleDetail(scope.row)"
            size="small"
          >{{scope.row.name}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="活动时间" align="center" min-width="270">
        <template slot-scope="scope">
          <template v-if="scope.row.dateRangeType === 3">
            会员日:
            <template v-if="scope.row.memberFestivalConfigId === undefined">未关联</template>
            <template v-else>
              <router-link
                class="el-link el-link--primary"
                :to="{ path: '/marketing/activity/VipdayAdmin', query: { id: scope.row.memberFestivalConfigId } }"
                type="primary"
                :underline="false"
                size="small"
              >{{scope.row.dateRangeTypeDisplay}}
              </router-link>
            </template>
          </template>
          <template v-else>{{scope.row.dateRangeTypeDisplay}}</template>
        </template>
      </el-table-column>
      <el-table-column prop="userScopeTypeDisplay" label="活动用户" align="center" min-width="90"></el-table-column>
      <el-table-column prop="activityRuleDisplay" label="活动规则" align="center" min-width="250">
        <template slot-scope="scope">
          <template v-if="scope.row.activityMetaCode === 'RECHARGE_CASH'">
            <span v-html="scope.row.activityRuleDisplay.replace(/\n/g,'<br/>')"></span>
          </template>
          <template v-if="scope.row.activityMetaCode === 'RECHARGE_COUPON'">
            <template v-for="item in scope.row.rechargeCouponRuleList">
              <span>充值满{{item.rechargeRangeDown}}</span>&nbsp;返
              <router-link class="el-link el-link--primary" :to="{ path: '/marketing/tools/CouponAdmin', query: { id: item.couponBatchId } }" type="primary" :underline="false" size="small">
                {{ item.couponName }}
              </router-link>
              <br/>
            </template>
          </template>
          <template v-if="scope.row.activityMetaCode === 'CONSUME_COUPON'">
            <template v-for="item in scope.row.consumeCouponRuleList">
              <span>消费满{{item.rangeDown}}</span>&nbsp;返
              <router-link class="el-link el-link--primary" :to="{ path: '/marketing/tools/CouponAdmin', query: { id: item.couponBatchId } }" type="primary" :underline="false" size="small">
                {{ item.couponName }}
              </router-link>
              <br/>
            </template>
          </template>
          <template v-if="scope.row.activityMetaCode === 'CONSUME_CASH'">
            <template v-for="item in scope.row.consumeRedpacketRuleList">
              <span>消费满{{item.rangeDown}}</span>&nbsp;送
              <router-link class="el-link el-link--primary" :to="{ path: '/marketing/tools/PacketAdmin', query: { id: item.rpBatchId } }" type="primary" :underline="false" size="small">
                {{ item.redPacketName }}
              </router-link>
              <br/>
            </template>
          </template>
          <template v-if="scope.row.activityMetaCode === 'REFRESHMAN_REDPACKET'">
            <template v-for="item in scope.row.freshmanRedpacketRuleList">
              送
              <router-link class="el-link el-link--primary" :to="{ path: '/marketing/tools/PacketAdmin', query: { id: item.rpBatchId } }" type="primary" :underline="false" size="small">
                {{ item.redPacketName }}
              </router-link>
              <br/>
            </template>
          </template>
          <template v-if="scope.row.activityMetaCode === 'REFRESHMAN_COUPON'">
            <template v-for="item in scope.row.freshmanCouponRuleList">
              送
              <router-link class="el-link el-link--primary" :to="{ path: '/marketing/tools/CouponAdmin', query: { id: item.couponBatchId } }" type="primary" :underline="false" size="small">
                {{ item.couponName }}
              </router-link>
              <br/>
            </template>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="activityUser" label="参与人数" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{scope.row.activityUser == undefined ? '--' : scope.row.activityUser}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人 / 创建时间" align="center" min-width="220">
        <template slot-scope="scope">
          <span>{{ scope.row.creatorName }} / {{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人 / 更新时间" align="center" min-width="220">
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

    <el-dialog :visible.sync="detailDialog" width="50%">
      <!-- 充值返现 -->
      <recharge-cash-back-detail ref="rechargeCashBackDetail" v-if="detailType === 'RECHARGE_CASH'"></recharge-cash-back-detail>
      <!-- 充值返券 -->
      <recharge-coupon-back-detail ref="rechargeCouponBackDetail" v-if="detailType === 'RECHARGE_COUPON'"></recharge-coupon-back-detail>
      <!-- 消费返现 -->
      <consume-cash-back-detail ref="consumeCashBackDetail" v-if="detailType === 'CONSUME_CASH'"></consume-cash-back-detail>
      <!-- 消费返券 -->
      <consume-coupon-back-detail ref="consumeCouponBackDetail" v-if="detailType === 'CONSUME_COUPON'"></consume-coupon-back-detail>
      <!-- 新人红包 -->
      <refresh-man-red-packet-detail ref="refreshManRedPacketDetail" v-if="detailType === 'REFRESHMAN_REDPACKET'"></refresh-man-red-packet-detail>
      <!-- 新人送券 -->
      <refresh-man-coupon-detail ref="refreshManCouponDetail" v-if="detailType === 'REFRESHMAN_COUPON'"></refresh-man-coupon-detail>

      <span slot="footer">
        <div style="display: inline-block;float: left">
          <el-button size="medium" type="primary" @click="updateActivity" v-if="currentRow.state == 1">修 改</el-button>
          <el-button size="medium" type="danger" @click="deleteActivity" v-if="currentRow.state == 1">删 除</el-button>
        </div>
        <el-button size="medium" @click="detailDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {ActivityAdminService} from "@/service/marketing/activity/ActivityAdminService";
  import RechargeCashBackDetail from "./RechargeCashBack/RechargeCashBackDetail";
  import RechargeCouponBackDetail from "./RechargeCouponBack/RechargeCouponBackDetail";
  import ConsumeCouponBackDetail from "./ConsumeCouponBack/ConsumeCouponBackDetail";
  import ConsumeCashBackDetail from "./ConsumeCashBack/ConsumeCashBackDetail";
  import RefreshManCouponDetail from "./RefreshManCoupon/RefreshManCouponDetail";
  import RefreshManRedPacketDetail from "./RefreshManRedPacket/RefreshManRedPacketDetail";

  export default {
    name: "ActivityAdminTable",
    components: {
      RechargeCashBackDetail,
      RechargeCouponBackDetail,
      ConsumeCouponBackDetail,
      ConsumeCashBackDetail,
      RefreshManCouponDetail,
      RefreshManRedPacketDetail
    },
    data() {
      return {
        activityAdminService: null,
        selectRows: [],
        tableData: [],
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
        detailType: undefined
      };
    },
    mounted() {
      this.activityAdminService = new ActivityAdminService();
      this.getList(this.queryParams);

      if (undefined != this.$route.query.id) {
        let id = this.$route.query.id;
        let queryParams = {
          id: id
        };
        let that = this;
        this.activityAdminService.pagingActivities(queryParams).then(response => {
          if (response.rows.length > 0) {
            let row = response.rows[0];
            that.handleDetail(row);
          } else {
            this.$alert('活动不存在', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        });
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {
        this.tableLoading = true;
        queryParams.page = undefined != queryParams.page ? this.queryParams.page : 1;
        queryParams.limit = undefined != queryParams.limit ? this.queryParams.limit : 30;
        this.queryParams = queryParams;

        this.activityAdminService.pagingActivities(queryParams).then(response => {
          debugger
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
      handleDetail(row) {
        let _this = this;

        switch (row.activityMetaCode) {
          // 充值返现
          case "RECHARGE_CASH":
            setTimeout(() => {
              _this.$refs.rechargeCashBackDetail.initDetail(row);
            }, 200);
            break;
          // 充值返券
          case "RECHARGE_COUPON":
            setTimeout(() => {
              _this.$refs.rechargeCouponBackDetail.initDetail(row);
            }, 200);
            break;
          // 消费返现
          case "CONSUME_CASH":
            setTimeout(() => {
              _this.$refs.consumeCashBackDetail.initDetail(row);
            }, 200);
            break;
          // 消费返券
          case "CONSUME_COUPON":
            setTimeout(() => {
              _this.$refs.consumeCouponBackDetail.initDetail(row);
            }, 200);
            break;
          // 新人红包
          case "REFRESHMAN_REDPACKET":
            setTimeout(() => {
              _this.$refs.refreshManRedPacketDetail.initDetail(row);
            }, 200);
            break;
          // 新人送券
          case "REFRESHMAN_COUPON":
            setTimeout(() => {
              _this.$refs.refreshManCouponDetail.initDetail(row);
            }, 200);
            break;
        }

        this.detailType = row.activityMetaCode;
        this.currentRow = row;
        this.detailDialog = true;
      },
      handleData(row) {
        this.$router.push({
          path: "/marketing/activity/ActivityData",
          query: {
            id: row.id,
            activityMetaCode: row.activityMetaCode
          }
        });
      },
      handleCloseActivity(row) {
        this.$confirm("确定关闭此活动吗？(关闭后可再次启用)", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          const param = {
            id: row.id,
            state: 4 // 活动状态: 已关闭
          };
          this.activityAdminService.editActivityState(param).then(response => {
            if (response.success) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.getList(this.queryParams);
              this.$emit("refreshActivityGroups", this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: "error"
              });
            }
          });
        });
      },
      handleStartActivity(row) {
        this.$confirm("开始活动后将不能再进行 修改 和 删除 操作", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          const param = {
            id: row.id,
            state: 2 // 活动状态: 进行中
          };
          this.activityAdminService.editActivityState(param).then(response => {
            if (response.success) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.getList(this.queryParams);
              this.$emit("refreshActivityGroups", this.queryParams);
            } else {
              this.$message({
                message: "开始活动失败: " + response.message,
                type: "error"
              });
            }
          });
        });
      },
      handleEnableActivity(row) {
        this.$confirm("确定启用该活动吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          const param = {
            id: row.id,
            state: 2 // 活动状态: 进行中
          };
          this.activityAdminService.editActivityState(param).then(response => {
            if (response.success) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.getList(this.queryParams);
              this.$emit("refreshActivityGroups", this.queryParams);
            } else {
              this.$message({
                message: "启用活动失败: " + response.message,
                type: "error"
              });
            }
          });
        });
      },
      updateActivityInline(row) {
        this.currentRow = row;
        // 修改活动
        this.updateActivity();
      },
      updateActivity() {
        this.$router.push({
          name: "修改活动",
          params: {...this.currentRow}
        });
      },
      deleteActivityInline(row) {
        this.currentRow = row;
        // 删除活动
        this.deleteActivity();
      },
      deleteActivity() {
        this.$confirm("确定删除此活动吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          const param = {
            id: this.currentRow.id
          };
          this.activityAdminService.deleteActivity(param).then(response => {
            if (response.success) {
              this.$message({
                message: response.message,
                type: "success"
              });

              this.detailDialog = false;
              this.getList(this.queryParams);
              this.$emit("refreshActivityGroups", this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: "error"
              });
            }
          });
        });
      },
      exportData(queryParams) {
        this.queryParams = queryParams;
        this.activityAdminService.exportData(this.queryParams).then(response => {
          window.location.href = response.data;
        });
      }
    }
  };
</script>
<style lang="scss">
</style>
