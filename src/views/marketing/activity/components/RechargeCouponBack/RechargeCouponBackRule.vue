<template>
  <div>
    <el-form-item label="卡类型" class="required" prop="cardTypeArr">
      <el-checkbox-group v-model="activityForm.cardTypeArr" size="medium">
        <el-checkbox v-for="item in cardTypes" :label="item.id" :key="item.value" :value="item.value">{{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="活动规则" class="required" prop="rcRuleAddUpdateDTOs">
      <template>
        <div v-for="(item, index) in activityForm.rcRuleAddUpdateDTOs" :key="index" style="margin-bottom: 10px;">
          <span style="color: #484a4d;">充满&ensp;</span>
          <el-input-number :controls="false" :precision="2" :min="0.01" :max="100000.00" v-model="item.rechargeMoneyDown"></el-input-number>&ensp;
          <span style="color: #484a4d;">元&emsp;送优惠券&ensp;<el-link type="primary" :underline="false" @click="showCouponDialog(index)" size="small">{{item.couponName}}</el-link></span>
          <div style="display: inline-block; height: 30px; vertical-align: middle;">
            <i class="el-icon-circle-plus" @click="addActivityRule" style="font-size: 16pt;color: #409EFF;" v-if="activityForm.rcRuleAddUpdateDTOs.length < 12"></i>&ensp;
            <i class="el-icon-remove" @click="delActivityRule(index)" style="font-size: 16pt;color: #F56C6C;"
               v-if="activityForm.rcRuleAddUpdateDTOs.length > 1 || activityForm.rcRuleAddUpdateDTOs.length == 12"></i>
          </div>
        </div>
      </template>
    </el-form-item>
    <el-form-item label="充值次数" class="required" prop="joinLimit" style="margin-top: -10px;">
      <el-radio-group v-model="activityForm.joinLimit" size="medium">
        <el-radio label="0">不限</el-radio>
        <el-radio label="1">有限&ensp;
          <div style="display: inline-block;" v-if="activityForm.joinLimit == '1'">
            <el-input-number v-model="activityForm.limits" placeholder="请输入次数" :min="1" :max="10000" :precision="0" :controls="false" style="width: 60%;">
            </el-input-number>&ensp;次
          </div>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="充值渠道" class="required" prop="payChannelArr">
      <el-checkbox-group v-model="activityForm.payChannelArr">
        <el-checkbox v-for="item in payChannels" :label="item.value" :key="item.value" :value="item.value">
          {{ item.key }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" :rows="3" size="medium" v-model="activityForm.memo" style="width: 90%" maxlength="500" show-word-limit>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
      <el-button type="primary" style="margin-top: 12px;" @click="submit('activityForm')">提交</el-button>
    </el-form-item>
    <el-divider></el-divider>
    <div class="desc">
      <h3>说明</h3>
      <h4><span>※&ensp;</span>活动规则</h4>
      <p>最多可配置12条规则，充值金额最大10万元</p>
      <h4><span>※&ensp;</span>充值次数</h4>
      <p>选择为有限时，必须填写可充值的最大次数（1次~10000次）</p>
    </div>

    <el-dialog :visible.sync="couponDialog" width="1000px" title="选择优惠券">
      <el-tabs v-model="active">
        <el-tab-pane label="选择优惠券" name="first">
          <div>
            <el-input v-model="queryParams.unionQuery" placeholder="优惠券名称/批次名/批次号" size="small" style="width: 260px;"/>&ensp;
            <el-button size="small" type="primary" @click="searchCoupons">查 询</el-button>
            <el-button size="small" @click="resetCoupons">重 置</el-button>
          </div>
          <div style="margin-top: 10px;width: 100%">
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
              <el-table-column type="selection" width="40" style="text-align: center"></el-table-column>
              <el-table-column prop="batchNo" label="优惠券批次号" align="center" min-width="120"></el-table-column>
              <el-table-column prop="batchName" label="优惠券批次名" align="center" min-width="120"></el-table-column>
              <el-table-column prop="couponName" label="优惠券名称" align="center" min-width="120"></el-table-column>
              <el-table-column prop="couponTypeDesc" label="优惠券类型" align="center" min-width="80"></el-table-column>
              <el-table-column prop="money" label="优惠金额" align="center" min-width="70">
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
              <el-table-column prop="consumeMoney" label="使用门槛" align="center" min-width="120">
                <template slot-scope="scope">
                  <span v-html="scope.row.consumeMoney !== undefined && scope.row.consumeMoney === 0 ? '无门槛' : '消费满' + scope.row.consumeMoney + '元'"></span>
                </template>
              </el-table-column>
              <el-table-column prop="remainCount" label="剩余量" align="center" min-width="60">
                <template slot-scope="scope">
                  <span style="color: #409EFF; font-weight: bold;">{{ scope.row.remainderCount === undefined ? '--' : scope.row.remainderCount }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      <span slot="footer" class="dialog-footer">
        <div>
          <el-button size="medium" @click="couponDialog = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="confirmCoupon">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {ActivityAdminService} from "@/service/marketing/activity/ActivityAdminService";
  import {CouponAdminService} from "@/service/marketing/tools/CouponAdminService";
  import {CommonService} from "@/service/common/CommonService";
  import {OilGunService} from "@/service/system/station/OilGunService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "RechargeCouponBackRule",
    props: ['oper', 'parentForm'],
    data() {
      return {
        activityForm: {
          cardTypeArr: [],
          joinLimit: undefined,
          limits: undefined,
          payChannelArr: [],
          rcRuleAddUpdateDTOs: [{rechargeMoneyDown: undefined, couponBatchId: undefined, couponName: '选择优惠券'}],
          memo: undefined,
        },
        couponDialog: false,
        payChannels: [],
        cardTypes: [],
        active: 'first',
        currentRuleIndex: undefined,
        selectRows: [],
        tableData: [],
        pageIndex: 1,
        pageSize: 30,
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
          related: 0,
          couponBatchState: [1],
          unionQuery: undefined,
        },
      }
    },
    mounted() {
      this.activityAdminService = new ActivityAdminService();
      this.initSelectData();
      this.stationList();
      this.activityForm = Object.assign(this.activityForm, this.parentForm);
    },
    methods: {
      formatDate(time) {
        return formatter.formatDate(time);
      },
      initSelectData() {
        const that = this;

        const param = [{
          enumKey: "rechargeType",
          enumValue: "EnumRechargeType",
        }];
        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.payChannels = response.rechargeType;
        });

        // 卡类型
        this.activityAdminService.getCardMetaSelect().then(response => {
          that.cardTypes = response;
        });
      },
      stationList() {
        new OilGunService().stationList().then(response => {
          this.stations = response;
        });
      },
      addActivityRule() {
        this.activityForm.rcRuleAddUpdateDTOs.push({rechargeMoneyDown: undefined, couponBatchId: undefined, couponName: '选择优惠券'});
        this.$forceUpdate();
      },
      delActivityRule(index) {
        this.activityForm.rcRuleAddUpdateDTOs.splice(index, 1);
        this.$forceUpdate();
      },
      before() {
        this.$emit('before');
      },
      submit() {
        if (this.activityForm.cardTypeArr == undefined || this.activityForm.cardTypeArr.length == 0) {
          this.$message({
            message: '卡类型不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.rcRuleAddUpdateDTOs == undefined) {
          this.$message({
            message: '活动规则不能为空',
            type: 'warning'
          });
          return false;
        }
        const rules = this.activityForm.rcRuleAddUpdateDTOs;
        for (let i = 0; i < rules.length; i++) {
          if (rules[i].rechargeMoneyDown == undefined || rules[i].couponBatchId == undefined || rules[i].rechargeMoneyDown == 0.00 || rules[i].couponBatchId == '') {
            this.$message({
              message: '请完善活动规则配置',
              type: 'warning'
            });
            return false;
            break;
          }
        }
        if (this.activityForm.joinLimit == undefined) {
          this.$message({
            message: '充值次数不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.joinLimit == '1' && (this.activityForm.limits == '' || this.activityForm.limits == undefined)) {
          this.$message({
            message: '充值次数不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.payChannelArr == undefined || this.activityForm.payChannelArr.length == 0) {
          this.$message({
            message: '充值渠道不能为空',
            type: 'warning'
          });
          return false;
        }

        if (this.activityForm.memo !== undefined && this.activityForm.memo.length > 500) {
          this.$message({
            message: '备注不能超过500字',
            type: 'warning'
          });
          return false;
        }

        // 活动用户
        if (this.activityForm.userScopeType != 3) {
          delete this.activityForm.userScopeRuleId;
        }
        // 充值次数: 无限
        if (this.activityForm.joinLimit != 0) {
          this.activityForm.joinLimit = this.activityForm.limits;
        }
        delete this.activityForm.limits;

        if (this.oper === 'ADD') {
          this.activityAdminService.addActivity(this.activityForm)
            .then(response => {
              let result = {
                success: undefined,
                msg: undefined,
              }
              if (response.success === true) {
                result.success = true;
                this.resetActivityForm();
              } else {
                result = {
                  success: false,
                  msg: response.message,
                };
              }
              // 调用父页面提交
              this.$emit('submit', result);
            });
        } else {
          this.activityAdminService.updateActivity(this.activityForm)
            .then(response => {
              let result = {
                success: undefined,
                msg: undefined,
              }
              if (response.success === true) {
                result.success = true;
                this.resetActivityForm();
              } else {
                result = {
                  success: false,
                  msg: response.message,
                };
              }
              // 调用父页面提交
              this.$emit('submit', result);
            });
        }
      },
      resetActivityForm() {
        this.activityForm = {
          cardTypeArr: [],
          joinLimit: undefined,
          limits: undefined,
          payChannelArr: [],
          rcRuleAddUpdateDTOs: [{rechargeMoneyDown: undefined, couponBatchId: undefined, couponName: '选择优惠券'}],
          memo: undefined,
        };
      },
      showCouponDialog(index) {
        this.currentRuleIndex = index;
        this.couponDialog = true;

        this.queryParams = {
          page: 1,
          limit: 30,
          related: 0,
          couponBatchState: [1],
          unionQuery: undefined,
        };
        this.getList();
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      searchCoupons() {
        this.getList();
      },
      resetCoupons() {
        this.queryParams = {
          page: 1,
          limit: 30,
          related: 0,
          couponBatchState: [1],
          unionQuery: undefined,
        };
        this.getList();
      },
      confirmCoupon() {
        if (this.selectRows.length === 0 || this.selectRows.length > 1) {
          this.$message({
            message: '请选择一条优惠券记录',
            type: 'warning'
          });
          return false;
        }
        this.activityForm.rcRuleAddUpdateDTOs[this.currentRuleIndex].couponName = this.selectRows[0].couponName;
        this.activityForm.rcRuleAddUpdateDTOs[this.currentRuleIndex].couponBatchId = this.selectRows[0].id;
        this.couponDialog = false;
      },
      getList() {
        new CouponAdminService().couponBatchList(this.queryParams)
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
  }
</script>

<style scoped>
  .page {
    background: #ebebeb;
    text-align: right;
    padding: 6px;
  }

  .desc {
    width: 100%;
    padding: 0 20px;
    color: rgba(0,0,0,.45);
  }

  .desc h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
    font-weight: 500;
  }

  .desc h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
  }

  .desc p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
</style>
