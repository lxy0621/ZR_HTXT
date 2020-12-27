<template>
  <div :v-model="memberInfo">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">ID</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberInfo.id}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberInfo.nickname}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">SVIP</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span v-for="item in memberSVIP" :value="item.value" :key="item.value">{{'' + memberInfo.svip === item.value ? item.key : ''}}</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">姓名</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberInfo.name}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberInfo.mobile}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">会员类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span v-for="item in memberType" :value="item.value" :key="item.value">{{'' + memberInfo.memberType === item.value ? item.key : ''}}</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="10" :model="form">
      <el-col :span="24">
        <el-row :gutter="40">
          <el-col :span="4">
            <div class="grid-content-right"><span style="color: red">* </span>会员卡</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content-left">
              <el-radio-group v-model="form.cardId" style="height:80px;">
                <el-radio v-for="(item, index) in memberCards" :label="item.id" :key="item.id">
                  <div :style="card" style="position:relative; top:-27px; margin-top: 30px;">
                    <div style="color: #ffffff; height: 26px; font-size: 12px;">
                      <div style="display: inline-block; text-align: left;">
                        {{item.cardName}}
                      </div>
                      <div style="display: inline-block; text-align: right; float: right">
                        <span v-for="i in cardType" :value="i.value" :key="i.value">{{'' + item.cardType === i.value ? i.key : ''}}</span>
                      </div>
                    </div>
                    <div style="text-align: center; color: #f1f1f1; height: 28px; font-size: 12px;">余额:<span style="font-size: 16px;"> ￥{{item.totalBalance}}</span></div>
                    <div style="text-align: left; color: #ffffff; font-size: 12px;">会员卡号: {{item.cardNo}}</div>
                  </div>
                </el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="4">
            <div class="grid-content-right"><span style="color: red">* </span>支付渠道</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content-left">
              <el-radio-group v-model="form.rechargeType">
                <el-radio v-for="item in rechargeType" :key="item.value" :label="item.value">{{item.key}}</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right"><span style="color: red">* </span>实充金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <template v-if="form.rechargeType === '7'">
                <el-input-number size="mini" value="0.00" :precision=2 :min=0 :max="100000" class="money-input" style="width: 100%" disabled></el-input-number>
              </template>
              <template v-else>
                <el-input-number size="mini" v-model="form.rechargeMoney" :precision=2 :min=0 :max="100000" class="money-input" style="width: 100%"></el-input-number>
              </template>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">赠送金额</div>
          </el-col>
          <el-col :span="16" style="margin-left:-20px;">
            <div class="grid-content-left">
              <el-input-number size="mini" v-model="form.giftMoney" :precision=2 :min=0 :max="100000" class="money-input" style="width: 100%"></el-input-number>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-row :gutter="40">
          <el-col :span="4">
            <div class="grid-content-right">备注</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content-left">
              <el-input placeholder="请填写备注" v-model="form.memo" size="small" style="width: 100%" type="textarea"
                        :rows="3"/>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" align="center" style="margin-top: 20px;">
        <el-button @click="handleCancel('form')" size="medium" style="width: 80px;">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')" size="medium" style="width: 80px;">提 交</el-button>
      </el-col>
    </el-row>
    <el-dialog title="人工充值信息确认" width="25%" :visible.sync="rechargeAffirmDialogVisible" :close-on-click-modal=false center append-to-body>
      <div style="text-align: center; font-size: 16px; font-weight: bold;">人工充值信息确认</div>
      <el-divider></el-divider>
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left">{{memberInfo.nickname}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left">{{memberInfo.mobile}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">SVIP</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left">
              <span v-for="item in memberSVIP" :value="item.value" :key="item.value">{{'' + memberInfo.svip === item.value ? item.key : ''}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">会员类型</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left">
              <span v-for="item in memberType" :value="item.value" :key="item.value">{{'' + memberInfo.memberType === item.value ? item.key : ''}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">会员卡号</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left">
              <span v-for="item in memberCards" :label="item.id" :key="item.id">{{'' + form.cardId === item.id ? item.cardNo : ''}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">支付渠道</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left">
              <span v-for="item in rechargeType" :value="item.value" :key="item.value">{{'' + form.rechargeType === item.value ? item.key : ''}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">实充金额</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left" style="font-weight: bold; color: red;">{{formatNumber(form.rechargeMoney)}} 元</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">赠送金额</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left" style="font-weight: bold; color: red;">{{formatNumber(form.giftMoney)}} 元</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content-right">备注</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content-left">{{form.memo}}</div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeAffirmDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAffirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {MemberService} from "@/service/member/MemberService";
  import {CommonService} from "@/service/common/CommonService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "ManualRecharge",
    data() {
      return {
        memberInfo: {},
        memberCards: [],
        memberId: '',
        memberService: null,
        memberType: [],
        memberSVIP: [],
        cardType: [],
        rechargeType: [],
        form: {
          cardId: undefined,
          rechargeType: undefined,
          rechargeMoney: undefined,
          giftMoney: undefined,
          memo: undefined,
        },
        rechargeAffirmDialogVisible: false,
        card: {
          backgroundImage: 'url(' + require('@/assets/cards/blue.png') + ')',
          backgroundSize: '150px',
          borderRadius: '3px',
          width: '150px',
          height: '65px',
          display: 'inline-grid',
          padding: '5px',
        }
      };
    },
    created() {
      this.memberService = new MemberService();
      this.initSelectData();
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      initSelectData() {
        const that = this;
        const param = [{
          enumKey: "memberType",
          enumValue: "EnumMemberType",
        }, {
          enumKey: "memberSVIP",
          enumValue: "EnumMemberSVIP",
        }, {
          enumKey: "cardType",
          enumValue: "EnumCardType",
        }, {
          enumKey: "rechargeType",
          enumValue: "EnumRechargeType",
        }];
        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.memberType = response.memberType;
          that.memberSVIP = response.memberSVIP;
          that.cardType = response.cardType;
          that.rechargeType = response.rechargeType;
        });
      },
      loadMemberInfo(memberId) {
        if (memberId !== undefined) {
          this.memberId = memberId;
        }
        this.memberInfo = {};
        // 会员基本信息
        this.memberService.getMemberInfoByMemberId(memberId)
          .then(response => {
            this.memberInfo = response;
          });
        // 会员卡信息
        this.memberService.getMemberCardsByMemberId(memberId)
          .then(response => {

            this.memberCards = response;
          });
      },
      handleCancel(form) {
        this.form = {};
        this.$emit('closeManualRechargeDialog', false);
      },
      handleSubmit(form) {
        if (this.form.cardId === undefined) {
          this.$message({
            message: '会员卡不能为空',
            type: "warning"
          });
          return;
        }
        if (this.form.rechargeType === undefined) {
          this.$message({
            message: '支付渠道不能为空',
            type: "warning"
          });
          return;
        }
        if (this.form.rechargeType === '7') {
          this.form.rechargeMoney = 0.00;
          if (this.form.giftMoney === undefined || this.form.giftMoney <= 0) {
            this.$message({
              message: '赠送金额必须大于0',
              type: "warning"
            });
            return;
          }
        } else {
          if (this.form.rechargeMoney === undefined || this.form.rechargeMoney <= 0) {
            this.$message({
              message: '实充金额必须大于0',
              type: "warning"
            });
            return;
          }
        }

        this.rechargeAffirmDialogVisible = true;
      },
      handleAffirm() {
        this.form.memberId = this.memberId;


        // 人工充值
        this.memberService.rechargeByManual(this.form)
          .then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.form = {};
              this.$emit('closeManualRechargeDialog', false);
            } else {
              this.$message({
                message: response.message,
                type: "warning"
              });
            }
          });
        this.rechargeAffirmDialogVisible=false;
      }
    },
  };
</script>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .grid-content-right {
    border-radius: 4px;
    min-height: 28px;
    line-height: 28px;
    text-align: right;
    font-weight: bold;
    color: #919191;
  }

  .grid-content-left {
    border-radius: 4px;
    min-height: 28px;
    line-height: 28px;
    text-align: left;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .money-input >>> .el-input__inner {
    font-size: 18px;
    font-weight: bold;
    color: red;
  }

</style>
