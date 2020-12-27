<template>
  <div class="container">
    <el-card class="card">
      <div class="content">
        <el-steps :active="active" align-center>
          <el-step title="基本信息" icon="el-icon-edit"></el-step>
          <el-step title="活动规则" icon="el-icon-setting"></el-step>
          <el-step title="完成" icon="el-icon-star-off"></el-step>
        </el-steps>
        <div class="form">
          <el-form :model="activityForm" ref="activityForm" label-width="90px" size="medium">
            <template v-if="active == 1">
              <el-form-item label="活动类型" class="required" prop="activityMetaCode">
                <el-select v-model="activityForm.activityMetaCode" placeholder="请选择活动类型" style="width: 90%" @change="handleActivityMetaCodeChange(activityForm.activityMetaCode)" disabled>
                  <el-option v-for="item in activityTypes" :key="item.value" :label="item.key"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动名称" class="required" prop="name">
                <el-input v-model="activityForm.name" style="width: 90%"></el-input>
              </el-form-item>
              <el-form-item label="活动时间" class="required" prop="dateRangeType">
                <template>
                  <el-radio-group v-model="activityForm.dateRangeType" disabled="true">
                    <el-radio label="3" value="3">会员日</el-radio>
                    <el-radio label="1" value="1">时间段&ensp;
                      <div style="display: inline-block;width: 300px" v-if="activityForm.dateRangeType == '1'">
                        <el-date-picker v-model="activityTimeRange" size="medium" :picker-options="pickerOption"
                                        type="daterange" range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期" style="width:100%;" format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                      </div>
                    </el-radio>
                  </el-radio-group>
                </template>
              </el-form-item>
              <el-form-item label="活动用户" class="required" prop="userScopeType">
                <el-radio-group v-model="activityForm.userScopeType">
                  <el-radio label="1" :disabled="activityForm.activityMetaCode === 'REFRESHMAN_REDPACKET' || activityForm.activityMetaCode === 'REFRESHMAN_COUPON'">所有用户</el-radio>
                  <el-radio label="2">新用户</el-radio>
                  <el-radio label="3" :disabled="activityForm.activityMetaCode === 'REFRESHMAN_REDPACKET' || activityForm.activityMetaCode === 'REFRESHMAN_COUPON'">指定用户&ensp;
                    <div style="display: inline-block;width: 243px" v-if="activityForm.userScopeType == '3'">
                      <el-select v-model="activityForm.userScopeRuleId" placeholder="请选择用户组" size="medium">
                        <el-option v-for="item in userScopeRuleIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </div>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button style="margin-top: 12px;" @click="cancel">取消</el-button>
                <el-button type="primary" style="margin-top: 12px;" @click="next()">下一步</el-button>
              </el-form-item>
              <el-divider></el-divider>
              <div class="desc">
                <h3>说明</h3>
                <h4><span>※&ensp;</span>活动时间</h4>
                <p>同一种活动类型且活动时间为时间段类型的，同一时间段只能有一个活动是待开始或者进行中状态</p>
                <h4><span>※&ensp;</span>活动用户</h4>
                <p>选择指定用户时，必须选择用户群体</p>
                <h4></h4>
              </div>
            </template>
            <template v-if="active == 2">
              <!-- 充值返现 -->
              <recharge-cash-back-rule ref="rechargeCashBackRule" @before="before" @submit="submit" :parentForm="activityForm" :oper="oper" v-if="activityForm.activityMetaCode === 'RECHARGE_CASH'"></recharge-cash-back-rule>
              <!-- 充值返券 -->
              <recharge-coupon-back-rule ref="rechargeCouponBackRule" @before="before" @submit="submit" :parentForm="activityForm" :oper="oper" v-if="activityForm.activityMetaCode === 'RECHARGE_COUPON'"></recharge-coupon-back-rule>
              <!-- 消费返券 -->
              <consume-coupon-back-rule ref="consumeCouponBackRule" @before="before" @submit="submit" :parentForm="activityForm" :oper="oper" v-if="activityForm.activityMetaCode === 'CONSUME_COUPON'"></consume-coupon-back-rule>
              <!-- 消费返现 -->
              <consume-cash-back-rule ref="consumeCashBackRule" @before="before" @submit="submit" :parentForm="activityForm" :oper="oper" v-if="activityForm.activityMetaCode === 'CONSUME_CASH'"></consume-cash-back-rule>
              <!-- 新人红包 -->
              <refresh-man-red-packet-rule ref="consumeCashBackRule" @before="before" @submit="submit" :parentForm="activityForm" :oper="oper" v-if="activityForm.activityMetaCode === 'REFRESHMAN_REDPACKET'"></refresh-man-red-packet-rule>
              <!-- 新人送券 -->
              <refresh-man-coupon-rule ref="refreshManCouponRule" @before="before" @submit="submit" :parentForm="activityForm" :oper="oper" v-if="activityForm.activityMetaCode === 'REFRESHMAN_COUPON'"></refresh-man-coupon-rule>
            </template>
          </el-form>
          <div v-if="active == 3" style="text-align: center;">
            <template v-if="result.success">
              <i class="el-icon-success" style="font-size: 80pt;color: #67C23A;"></i>
              <br><br>
              <div style="font-size: 25pt;">修改成功</div>
              <div>
                <el-button type="primary" style="margin-top: 12px;" size="medium" @click="close">关&ensp;闭</el-button>
              </div>
            </template>
            <template v-else>
              <i class="el-icon-error" style="font-size: 80pt;color: #F56C6C;"></i>
              <br><br>
              <div style="font-size: 25pt;">修改失败</div>
              <div style="font-size: 14px; color: #999999; margin-top: 10px;"><i class="el-icon-warning" style="color: #F56C6C"></i>&ensp;{{result.msg}}</div>
              <div>
                <el-button style="margin-top: 12px;" size="medium" @click="first">重新编辑</el-button>
                <el-button type="primary" style="margin-top: 12px;" size="medium" @click="close">关&ensp;闭</el-button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {ActivityAdminService} from "@/service/marketing/activity/ActivityAdminService";
  import {CommonService} from "@/service/common/CommonService";
  import {closeCurrentTabAndToTab} from "@/utils/iframe";
  import RechargeCashBackRule from "./components/RechargeCashBack/RechargeCashBackRule";
  import RechargeCouponBackRule from "./components/RechargeCouponBack/RechargeCouponBackRule";
  import ConsumeCouponBackRule from "./components/ConsumeCouponBack/ConsumeCouponBackRule";
  import ConsumeCashBackRule from './components/ConsumeCashBack/ConsumeCashBackRule';
  import RefreshManRedPacketRule from './components/RefreshManRedPacket/RefreshManRedPacketRule';
  import RefreshManCouponRule from './components/RefreshManCoupon/RefreshManCouponRule';

  export default {
    name: "ActivityUpdate",
    components: {
      RechargeCashBackRule,
      RechargeCouponBackRule,
      ConsumeCouponBackRule,
      ConsumeCashBackRule,
      RefreshManRedPacketRule,
      RefreshManCouponRule,
    },
    data() {
      return {
        oper: 'UPDATE', // 修改活动
        activityAdminService: undefined,
        activityTypes: [],
        activityForm: {
          id: undefined,
          activityMetaCode: undefined,
          name: undefined,
          dateRangeType: undefined,
          startTime: undefined,
          endTime: undefined,
          userScopeType: undefined,
          userScopeRuleId: undefined,
        },
        activityTime: undefined,
        activityTimeRange: undefined,
        userScopeType: undefined,
        userScopeRuleIds: [],
        pickerOption: {
          disabledDate(time) {
            let times = Date.now() - 24 * 60 * 60 * 1000;
            return time.getTime() < times;
          }
        },
        active: 1,
        result: {
          success: undefined,
          msg: undefined,
        },
      };
    },
    mounted() {
      this.activityAdminService = new ActivityAdminService();
      this.initSelectData();

      if ({} != this.$route.params) {
        debugger
        const param = this.$route.params;
        this.activityForm = {
          id: param.id,
          activityMetaCode: param.activityMetaCode,
          name: param.name,
          dateRangeType: '' + param.dateRangeType,
          userScopeType: '' + param.userScopeType,
          userScopeRuleId: param.userScopeType == 3 ? '' + param.userScopeRuleId : undefined,
          cardTypeArr: param.cardTypeArr,
          joinLimit: param.joinLimit == 0 ? '' + param.joinLimit : '1',
          limits: param.joinLimit == 0 ? undefined : param.joinLimit,
          payChannelArr: param.payChannelArr,
          payGroundArr: param.payGrounds !== undefined ? param.payGrounds.split(',') : [],
          productSkuArr: param.productSkus !== undefined ? param.productSkus.split(',') : [],
          stationIdArr: param.stationIds !== undefined ? param.stationIds.split(',') : [],
          memo: param.memo,
        };
        if (param.dateRangeType == 1) {
          this.activityTimeRange = [param.startTime, param.endTime];
        }
        {
          let rcRuleAddUpdateDTOs = [];
          if (param.activityMetaCode === 'RECHARGE_CASH') {
            // 充值返现
            rcRuleAddUpdateDTOs = new Array(param.rcRuleVO != undefined ? param.rcRuleVO.length : 0);
            const temp = param.rcRuleVO;

            for (let i in temp) {
              rcRuleAddUpdateDTOs[i] = {
                rechargeMoneyDown: temp[i].rechargeMoneyDown,
                giftMoney: temp[i].giftMoney,
              };
            }
          } else if (param.activityMetaCode === 'RECHARGE_COUPON') {
            // 充值返券
            rcRuleAddUpdateDTOs = new Array(param.rechargeCouponRuleList != undefined ? param.rechargeCouponRuleList.length : 0);
            const temp = param.rechargeCouponRuleList;

            for (let i in temp) {
              rcRuleAddUpdateDTOs[i] = {
                rechargeMoneyDown: temp[i].rechargeRangeDown,
                couponBatchId: temp[i].couponBatchId,
                couponName: temp[i].couponName,
              };
            }
          } else if (param.activityMetaCode === 'CONSUME_COUPON') {
            // 消费返券
            rcRuleAddUpdateDTOs = new Array(param.consumeCouponRuleList != undefined ? param.consumeCouponRuleList.length : 0);
            const temp = param.consumeCouponRuleList;

            for (let i in temp) {
              rcRuleAddUpdateDTOs[i] = {
                rechargeMoneyDown: temp[i].rangeDown,
                couponBatchId: temp[i].couponBatchId,
                couponName: temp[i].couponName,
              };
            }
          } else if (param.activityMetaCode === 'CONSUME_CASH') {
            // 消费返现
            rcRuleAddUpdateDTOs = new Array(param.consumeRedpacketRuleList != undefined ? param.consumeRedpacketRuleList.length : 0);
            const temp = param.consumeRedpacketRuleList;

            for (let i in temp) {
              rcRuleAddUpdateDTOs[i] = {
                rechargeMoneyDown: temp[i].rangeDown,
                rpBatchId: temp[i].rpBatchId,
                redPacketName: temp[i].redPacketName,
              };
            }
          } else if (param.activityMetaCode === 'REFRESHMAN_REDPACKET') {
            // 新人红包
            rcRuleAddUpdateDTOs = new Array(param.freshmanRedpacketRuleList != undefined ? param.freshmanRedpacketRuleList.length : 0);
            const temp = param.freshmanRedpacketRuleList;

            for (let i in temp) {
              rcRuleAddUpdateDTOs[i] = {
                rpBatchId: temp[i].rpBatchId,
                redPacketName: temp[i].redPacketName,
              };
            }
          } else if (param.activityMetaCode === 'REFRESHMAN_COUPON') {
            // 新人送券
            rcRuleAddUpdateDTOs = new Array(param.freshmanCouponRuleList != undefined ? param.freshmanCouponRuleList.length : 0);
            const temp = param.freshmanCouponRuleList;

            for (let i in temp) {
              rcRuleAddUpdateDTOs[i] = {
                couponBatchId: temp[i].couponBatchId,
                couponName: temp[i].couponName,
              };
            }
          }

          this.activityForm.rcRuleAddUpdateDTOs = rcRuleAddUpdateDTOs;
        }
      }
    },
    methods: {
      initSelectData() {
        const that = this;

        const param1 = [{
          enumKey: "activityType",
          enumValue: "EnumActivityMetaCode",
        }];
        new CommonService().findEnumExcludeAll('activity', param1).then(response => {
          that.activityTypes = response.activityType;
        });

        // 指定活动用户下拉框
        this.activityAdminService.getUserScopeRuleSelect().then(response => {
          that.userScopeRuleIds = response;
        });
      },
      cancel() {
        closeCurrentTabAndToTab('活动管理');
      },
      before() {
        if (this.active-- < 2) this.active = 0;
      },
      first() {
        this.active = 1;
        this.$forceUpdate();
      },
      next() {
        if (this.activityForm.activityMetaCode == undefined) {
          this.$message({
            message: '活动类型不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.name == undefined || this.activityForm.name === '') {
          this.$message({
            message: '活动名称不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.name.length > 20) {
          this.$message({
            message: '活动名称不能超过20字',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.dateRangeType == undefined) {
          this.$message({
            message: '活动时间不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.dateRangeType == 1 && this.activityTimeRange == undefined) {
          this.$message({
            message: '活动时间段配置不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.userScopeType == undefined) {
          this.$message({
            message: '活动用户不能为空',
            type: 'warning'
          });
          return false;
        }
        if (this.activityForm.userScopeType == 3 && this.activityForm.userScopeRuleId == undefined) {
          this.$message({
            message: '活动用户-指定用户不能为空',
            type: 'warning'
          });
          return false;
        }
        // 活动时间: 时间段
        if (this.activityForm.dateRangeType == 1) {
          this.activityForm.startTime = this.activityTimeRange[0] + ' 00:00:00';
          this.activityForm.endTime = this.activityTimeRange[1] + ' 23:59:59';
        } else {
          delete this.activityForm.startTime;
          delete this.activityForm.endTime;
        }

        this.active++;
      },
      submit(result) {
        this.result = result;
        this.active++;
      },
      close() {
        closeCurrentTabAndToTab('活动管理');
      },
      handleActivityMetaCodeChange(activityMetaCode) {
        if (activityMetaCode === 'REFRESHMAN_REDPACKET' || activityMetaCode === 'REFRESHMAN_COUPON') {
          this.activityForm.userScopeType = '2';
        } else {
          this.activityForm.userScopeType = undefined;
        }
      },
    }
  }
</script>

<style scoped>
  .container {
    padding: 10px;
    background-color: #fcfcfc;
  }

  .card {
    vertical-align: middle;
    height: 100%;
  }

  .content {
    width: 800px;
    margin: 50px auto;
  }

  .form {
    width: 700px;
    margin: 50px auto;
  }

  .desc {
    width: 100%;
    padding: 0 50px;
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

  .required > .el-form-item__label::before {
    padding-top: 5px;
    content: "* ";
    color: red;
  }
</style>
