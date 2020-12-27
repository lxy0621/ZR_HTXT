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
          <span style="color: #484a4d;">元&emsp;返&ensp;</span>
          <el-input-number :controls="false" :precision="2" :min="0.01" :max="100000.00" v-model="item.giftMoney"></el-input-number>
          <span style="color: #484a4d;">&ensp;元&ensp;</span>
          <div style="display: inline-block; height: 30px; vertical-align: middle;">
            <i class="el-icon-circle-plus" @click="addActivityRule" style="font-size: 16pt;color: #409EFF;" v-if="activityForm.rcRuleAddUpdateDTOs.length < 12"></i>&ensp;
            <i class="el-icon-remove" @click="delActivityRule(index)" style="font-size: 16pt;color: #F56C6C;" v-if="activityForm.rcRuleAddUpdateDTOs.length > 1 || activityForm.rcRuleAddUpdateDTOs.length == 12"></i>
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
      <el-input type="textarea" size="medium" v-model="activityForm.memo" style="width: 90%">
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
      <p>最多可配置12条规则，充值金额最大10万元，充值金额必须大于返现金额，且充值金额和赠送金额均大于0元</p>
      <h4><span>※&ensp;</span>充值次数</h4>
      <p>选择为有限时，必须填写可充值的最大次数（1次~10000次）</p>
      <h4></h4>
    </div>
  </div>
</template>

<script>
import {ActivityAdminService} from "@/service/marketing/activity/ActivityAdminService";
import {CommonService} from "@/service/common/CommonService";
import {OilGunService} from "@/service/system/station/OilGunService";

export default {
  name: "RechargeCashBackRule",
  props: ['oper', 'parentForm'],
  data() {
    return {
      activityForm: {
        cardTypeArr: [],
        joinLimit: undefined,
        limits: undefined,
        payChannelArr: [],
        rcRuleAddUpdateDTOs: [{rechargeMoneyDown: undefined, giftMoney: undefined}],
        memo: undefined,
      },
      payChannels: [],
      cardTypes: [],
    }
  },
  mounted() {
    this.activityAdminService = new ActivityAdminService();
    this.initSelectData();
    this.stationList();
    this.activityForm = Object.assign(this.activityForm, this.parentForm);
  },
  methods: {
    initSelectData() {
      const that = this;

      const param2 = [{
        enumKey: "rechargeType",
        enumValue: "EnumRechargeType",
      }];
      new CommonService().findEnumExcludeAll('member', param2).then(response => {
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
      this.activityForm.rcRuleAddUpdateDTOs.push({rechargeMoneyDown: undefined, giftMoney: undefined});
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
        if (rules[i].rechargeMoneyDown == undefined || rules[i].giftMoney == undefined || rules[i].rechargeMoneyDown == 0.00 || rules[i].giftMoney == 0.00) {
          this.$message({
            message: '请完善活动规则金额配置',
            type: 'warning'
          });
          return false;
          break;
        }
        if (rules[i].rechargeMoneyDown < rules[i].giftMoney) {
          this.$message({
            message: '返现金额不得大于充满金额',
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
        rcRuleAddUpdateDTOs: [{rechargeMoneyDown: undefined, giftMoney: undefined}],
        memo: undefined,
      };
    }
  }
}
</script>

<style scoped>
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
