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
      <el-table-column type="selection" width="40" style="text-align: center">
      </el-table-column>
      <el-table-column fixed prop="handle" label="操作" fixed align="center" width="130">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleDetail(scope.row)" size="small">详情&ensp;</el-link>
          <el-link type="primary" :underline="false" @click="handleData(scope.row)" size="small" v-if="scope.row.batchState != 1">数据&ensp;</el-link>
          <el-link type="primary" :underline="false" @click="updateCouponBatchInline(scope.row)" size="small" v-if="scope.row.batchState == 1">修改&ensp;</el-link>
          <el-link type="danger" :underline="false" @click="deleteCouponBatchInline(scope.row)" size="small" v-if="scope.row.batchState == 1">删除&ensp;</el-link>
          <!--<el-link type="danger" :underline="false" @click="handleCloseCoupon(scope.row)" size="small" v-if="scope.row.batchState == 2">关闭&ensp;</el-link>
          <el-link type="success" :underline="false" @click="handleStartCoupon(scope.row)" size="small" v-if="scope.row.batchState == 1">开启&ensp;</el-link>
          <el-link type="success" :underline="false" @click="handleEnableCoupon(scope.row)" size="small" v-if="scope.row.batchState == 4">启用&ensp;</el-link>
          <el-link type="danger" :underline="false" @click="handleFinishCoupon(scope.row)" size="small" v-if="scope.row.batchState == 3">结束&ensp;</el-link>-->
        </template>
      </el-table-column>
      <el-table-column prop="batchStateDesc" label="优惠券状态" align="center" min-width="90"></el-table-column>
      <el-table-column prop="batchNo" label="优惠券批次号" align="center" min-width="135"></el-table-column>
      <el-table-column prop="batchName" label="优惠券批次名" align="center" min-width="130"></el-table-column>
      <el-table-column prop="couponName" label="优惠券名称" align="center" min-width="120">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleDetail(scope.row)" size="small">{{scope.row.couponName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="couponTypeDesc" label="优惠券类型" align="center" min-width="90"></el-table-column>
      <el-table-column prop="money" label="优惠金额" align="center" min-width="90">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold">{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠券有效期" align="center" min-width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.validateRuleType === 1">领取当日起 {{scope.row.validateDays}} 天内可用</span>
          <span v-if="scope.row.validateRuleType === 2">领取次日起 {{scope.row.validateDays}} 天内可用</span>
          <span v-if="scope.row.validateRuleType === 3">{{formatDate(scope.row.fromDate)}}~{{formatDate(scope.row.toDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="consumeMoney" label="使用门槛" align="center" min-width="150">
        <template slot-scope="scope">
          <span v-html="scope.row.consumeMoney !== undefined && scope.row.consumeMoney === 0 ? '无门槛' : '消费满' + scope.row.consumeMoney + '元'"></span>
        </template>
      </el-table-column>
      <el-table-column prop="remainCount" label="剩余量" align="center" min-width="80">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{ scope.row.remainderCount === undefined ? '--' : scope.row.remainderCount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="usedCount" label="已领量" align="center" min-width="80">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{ scope.row.drawedCount === undefined ? '--' : scope.row.drawedCount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalCount" label="发放总量" align="center" min-width="80">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{ scope.row.totalLimit === undefined ? '--' : scope.row.totalLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="skuNameDisplay" label="适用油品" align="center" min-width="160">
        <template slot-scope="scope">
          <el-tag size="mini" v-for="item in (scope.row.skuNames !== undefined ? scope.row.skuNames.split(',') : [])" :key="item" style="margin-right: 3px;">{{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="活动ID:活动名称" align="center" min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.activityId === undefined">未关联</span>
          <router-link v-else class="el-link el-link--primary" :to="{ path: '/marketing/activity/ActivityAdmin', query: { id: scope.row.activityId } }" type="primary" :underline="false" size="small">{{scope.row.activityId + ':' + scope.row.activityName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="创建人 / 创建时间" align="center" min-width="210">
        <template slot-scope="scope">
          <span>{{ scope.row.creatorName }} / {{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人 / 更新时间" align="center" min-width="210">
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

    <el-dialog :visible.sync="detailDialog" width="55%">
      <div>
        <el-tabs v-model="active">
          <el-tab-pane label="优惠券详情" name="first">
            <div class="title">基本信息</div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="item-label">优惠券批次号：</div>
                <div class="item-content">{{ currentRow.batchNo }}</div>
              </el-col>
              <el-col :span="12">
                <div class="item-label">优惠券批次名：</div>
                <div class="item-content">{{ currentRow.batchName }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="item-label">优惠券名称：</div>
                <div class="item-content">{{ currentRow.couponName }}</div>
              </el-col>
              <el-col :span="12">
                <div class="item-label">优惠券类型：</div>
                <div class="item-content">{{ currentRow.couponTypeDesc }}</div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class="title">使用规则</div>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="item-label">有效期：</div>
                <div class="item-content">
                  <span v-if="currentRow.validateRuleType === 1">领取当日起 {{currentRow.validateDays}} 天内可用</span>
                  <span v-if="currentRow.validateRuleType === 2">领取次日起 {{currentRow.validateDays}} 天内可用</span>
                  <span v-if="currentRow.validateRuleType === 3">{{formatDate(currentRow.fromDate)}}~{{formatDate(currentRow.toDate)}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item-label">适用油品：</div>
                <div class="item-content">
                  <el-tag size="small" v-for="item in (currentRow.skuNames !== undefined ? currentRow.skuNames.split(',') : [])" :key="item" style="margin-right: 3px;">{{ item }}</el-tag>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="item-label">使用门槛：</div>
                <div class="item-content">
                  <span v-html="currentRow.consumeMoney !== undefined && currentRow.consumeMoney === 0 ? '无门槛' : '消费满' + currentRow.consumeMoney + '元'"></span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="item-label">优惠金额：</div>
                <div class="item-content">{{ currentRow.money }}</div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="item-label">使用说明：</div>
                <div class="item-content">{{ currentRow.memo }}</div>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class="title">领用详情</div>
            <el-row :gutter="10">
              <el-col :span="8">
                <div class="item-label">发放总量：</div>
                <div class="item-content">{{ currentRow.totalLimit === undefined ? '--' : currentRow.totalLimit }}</div>&ensp;张
              </el-col>
              <el-col :span="8">
                <div class="item-label">已领量：</div>
                <div class="item-content">{{ currentRow.drawedCount === undefined ? '--' : currentRow.drawedCount }}</div>&ensp;张
              </el-col>
              <el-col :span="8">
                <div class="item-label">剩余量：</div>
                <div class="item-content">{{ currentRow.remainderCount === undefined ? '--' : currentRow.remainderCount }}</div>&ensp;张
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <div style="display: inline-block;float: left">
          <el-button size="medium" type="primary" @click="updateCouponBatch" v-if="currentRow.batchState == 1">修 改</el-button>
          <el-button size="medium" type="danger" @click="deleteCouponBatch" v-if="currentRow.batchState == 1">删 除</el-button>
        </div>
        <el-button size="medium" @click="detailDialog = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {CouponAdminService} from "@/service/marketing/tools/CouponAdminService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "CouponAdminTable",
    data() {
      return {
        couponAdminService: null,
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        currentRow: {},
        tableLoading: false,
        couponState: [],
        couponType: [],
        detailDialog: false,
        active: 'first',
      };
    },
    mounted() {
      this.couponAdminService = new CouponAdminService();
      this.getList(this.queryParams);

      if (undefined != this.$route.query.id) {
        let id = this.$route.query.id;
        let row = {
          id: id,
        };
        this.handleDetail(row);
      }
    },
    methods: {
      formatDate(time) {
        return formatter.formatDate(time);
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {
        this.tableLoading = true;
        queryParams.page = undefined != queryParams.page ? this.queryParams.page : 1;
        queryParams.limit = undefined != queryParams.limit ? this.queryParams.limit : 30;
        this.queryParams = queryParams;

        this.couponAdminService.pagingCouponBatch(queryParams)
          .then(response => {
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
        let param = {
          id: row.id,
        };
        const that = this;
        this.couponAdminService.pagingCouponBatch(param)
          .then(response => {
            if (response.rows.length > 0) {
              that.currentRow = response.rows !== undefined ? response.rows[0] : [];
              this.detailDialog = true;
            } else {
              this.$alert('优惠券不存在', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          });
      },
      handleData(row) {
        this.$router.push({
          path: "/marketing/tools/CouponData",
          query: {
            data: row,
          }
        });
      },
      handleCloseCoupon(row) {
        this.$confirm('确定关闭此优惠券吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          const param = {
            id: row.id,
            batchState: 4, // 优惠券状态: 已关闭
          };
          this.couponAdminService.updateCouponBatchState(param).then(response => {
            if (response.success) {
              this.$message({
                message: '关闭优惠券成功',
                type: 'success'
              });
              this.getList(this.queryParams);
              this.$emit('refreshCouponGroups', this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: 'error'
              });
            }
          })
        });
      },
      handleStartCoupon(row) {
        this.$confirm('开启该优惠券后将不能进行 修改 和 删除 操作?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          const param = {
            id: row.id,
            batchState: 2, // 优惠券状态: 进行中
          };
          this.couponAdminService.updateCouponBatchState(param).then(response => {
            if (response.success) {
              this.$message({
                message: '开启优惠券成功',
                type: 'success'
              });
              this.getList(this.queryParams);
              this.$emit('refreshCouponGroups', this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: 'error'
              });
            }
          })
        });
      },
      handleEnableCoupon(row) {
        this.$confirm('确定启用该优惠券吗?', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          const param = {
            id: row.id,
            batchState: 2, // 优惠券状态: 进行中
          };
          this.couponAdminService.updateCouponBatchState(param).then(response => {
            if (response.success) {
              this.$message({
                message: '启用优惠券成功',
                type: 'success'
              });
              this.getList(this.queryParams);
              this.$emit('refreshCouponGroups', this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          })
        });
      },
      handleFinishCoupon(row) {
        this.$confirm('确定结束此优惠券吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          const param = {
            id: row.id,
            batchState: 3, // 优惠券状态: 已结束
          };
          this.couponAdminService.updateCouponBatchState(param).then(response => {
            if (response.success) {
              this.$message({
                message: '结束优惠券成功',
                type: 'success'
              });
              this.getList(this.queryParams);
              this.$emit('refreshCouponGroups', this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: 'error'
              });
            }
          })
        });
      },
      updateCouponBatchInline(row) {
        this.currentRow = row;
        // 修改活动
        this.updateCouponBatch();
      },
      updateCouponBatch() {
        this.$router.push({
          name: "修改优惠券",
          params: {...this.currentRow},
        });
      },
      deleteCouponBatchInline(row) {
        this.currentRow = row;
        // 删除活动
        this.deleteCouponBatch();
      },
      deleteCouponBatch() {
        this.$confirm('确定删除此优惠券吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          this.couponAdminService.deleteCouponBatch(this.currentRow.id).then(response => {
            if (response.success) {
              this.$message({
                message: '删除优惠券成功',
                type: 'success'
              });

              this.detailDialog = false;
              this.getList(this.queryParams);
              this.$emit('refreshCouponGroups', this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: 'error'
              });
            }
          })
        });
      },
      exportData(queryParams) {
        this.queryParams = queryParams;
        this.couponAdminService.exportData(this.queryParams).then(response => {
          if (response.success) {
            window.location.href = response.data;
          } else {
            this.$message({
              message: response.message,
              type: 'error'
            });
          }
        });
      }
    }
  };
</script>
<style lang="scss">
  .title {
    flex: auto;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.75);
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5715;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 15px;
  }

  .item-label {
    display: inline-block;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 2.2;
    text-align: start;
  }

  .item-content {
    display: inline-block;
    flex: 1 1;
    color:#409EFF;
    font-size: 14px;
    line-height: 2.2;
  }
</style>
