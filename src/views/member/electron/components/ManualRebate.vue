<template>
  <div style="margin-top: 20px;">
    <el-row :gutter="10">
      <el-col :span="24">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberInfo.id}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberInfo.nickname}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberInfo.mobile}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <el-select v-model="form.cardId" placeholder="请选择会员卡" size="mini" @change="handleChangeCard" style="width:80%;">
                <el-option v-for="item in memberCards" :key="item.id" :label="item.cardNo" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <template v-if="cardInfo.cardType !== undefined">
                <span v-for="item in cardType" :value="item.value" :key="item.value">{{'' + cardInfo.cardType === item.value ? item.key : ''}}</span>
              </template>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">总余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold;" v-if="cardInfo.totalBalance !== undefined">
                {{formatNumber(cardInfo.totalBalance)}} 元
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">现金余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold;" v-if="cardInfo.cashBalance !== undefined">
                {{formatNumber(cardInfo.cashBalance)}} 元
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">赠送金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold;" v-if="cardInfo.giftBalance !== undefined">
                {{formatNumber(cardInfo.giftBalance)}} 元
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right"><span style="color: red;">*</span> 扣款账户</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <el-radio-group v-model="form.balanceFlag">
                <el-radio :label="1">当前余额</el-radio>
                <el-radio :label="2">现金余额</el-radio>
                <el-radio :label="3">赠送余额</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right"><span style="color: red;">*</span> 扣款金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <el-input-number size="mini" v-model="form.rebateMoney" controls-position="right" :precision=2 :min=0 :max=cardInfo.totalBalance style="width: 80%;"></el-input-number>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right"><span style="color: red;">*</span> 备注</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.memo" style="width: 80%;font-size: 9pt;"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" align="center" style="margin-top: 10px;">
            <el-button @click="handleCancel('form')" size="medium" style="width: 100%;">取 消</el-button>
          </el-col>
          <el-col :span="12" align="center" style="margin-top: 10px;">
            <el-button type="primary" @click="handleSubmit('form')" size="medium" style="width: 100%;">提 交</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {MemberService} from "@/service/member/MemberService";
  import {CommonService} from "@/service/common/CommonService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "ManualRebate",
    data() {
      return {
        memberInfo: {},
        cardInfo: {
          cardType: undefined,
          totalBalance: undefined,
          cashBalance: undefined,
          giftBalance: undefined,
        },
        memberCards: [],
        memberType: [],
        memberService: null,
        form: {
          cardId: undefined,
          balanceFlag: 1,
          rebateMoney: undefined,
          memo: '',
        },
      };
    },
    created() {
      this.memberService = new MemberService();
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const that = this;
        const param = [{
          enumKey: "cardType",
          enumValue: "EnumCardType",
        }];
        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.cardType = response.cardType;
        });
      },
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      loadMemberInfo(memberInfo) {
        this.form = {
          cardId: undefined,
          balanceFlag: 1,
          rebateMoney: undefined,
          memo: '',
        };
        this.memberInfo = {};
        this.cardInfo = {};
        this.memberCards = [];
        if (memberInfo !== undefined) {
          this.memberInfo = memberInfo;
        }
        // 会员卡信息
        this.memberService.getMemberCardsByMemberId(memberInfo.id)
          .then(response => {
            this.memberCards = response;
            this.form.cardId = '' + response[0].cardNo;
            this.memberService.getCardByCardId(response[0].id)
              .then(response => {
                this.cardInfo = response;
              });
          });
      },
      handleChangeCard(val) {

        // 会员卡信息
        this.memberService.getCardByCardId(val)
          .then(response => {
            this.cardInfo = response;
          });
      },
      handleCancel() {
        this.form = {};
        this.$emit('closeManualRebateDrawer', false);
      },
      handleSubmit(form) {
        if (this.form.cardId === undefined) {
          this.$message({
            message: '请选择一张电子会员卡',
            type: "warning"
          });
          return;
        }
        if (this.form.rebateMoney === undefined) {
          this.$message({
            message: '请输入扣款金额',
            type: "warning"
          });
          return;
        }
        if (this.form.rebateMoney <= 0) {
          this.$message({
            message: '扣款金额不能小于0',
            type: "warning"
          });
          return;
        }
        if (this.form.balanceFlag === 1 && this.form.rebateMoney > this.cardInfo.totalBalance) {
          this.$message({
            message: '扣款金额不得大于当前余额',
            type: "warning"
          });
          return;
        }
        if (this.form.balanceFlag === 2 && this.form.rebateMoney > this.cardInfo.cashBalance) {
          this.$message({
            message: '扣款金额不得大于现金余额',
            type: "warning"
          });
          return;
        }
        if (this.form.balanceFlag === 3 && this.form.rebateMoney > this.cardInfo.giftBalance) {
          this.$message({
            message: '扣款金额不得大于赠送余额',
            type: "warning"
          });
          return;
        }
        if (this.form.memo === undefined || this.form.memo === '') {
          this.$message({
            message: '请输入备注',
            type: "warning"
          });
          return;
        }

        this.$confirm('确定扣款吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          // 人工扣款
          let param = {
            cardId: this.cardInfo.id,
            balanceFlag: this.form.balanceFlag,
            rebateMoney: this.form.rebateMoney,
            memo: this.form.memo,
          }
          this.memberService.rebateByManual(param)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: "success"
                });
                this.form = {
                  balanceFlag: 1,
                };
                this.$emit('closeManualRebateDrawer', false);
              } else {
                this.$message({
                  message: response.message,
                  type: "warning"
                });
              }
            });
        }).catch(() => {
        });
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
    min-height: 32px;
    line-height: 32px;
    text-align: right;
    font-weight: bold;
    color: #919191;
  }

  .grid-content-left {
    border-radius: 4px;
    min-height: 32px;
    line-height: 32px;
    text-align: left;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
