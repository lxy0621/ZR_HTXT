<template>
  <div :v-model="memberInfo">
    <el-row :gutter="10">
      <el-col :span="10">
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
      <el-col :span="10">
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
      <el-col :span="20">
        <el-row :gutter="40">
          <el-col :span="4">
            <div class="grid-content-right"><span style="color: red">* </span>会员卡</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content-left">
              <el-checkbox-group v-model="form.cardIds" style="height:80px;">
                <el-checkbox v-for="item in memberCards" :label="item.id" :key="item.id">
                  <div :style="card" style="position:relative; top:-27px; margin-top: 30px;">
                    <div style="color: #ffffff; height: 26px; font-size: 12px;">
                      <div style="display: inline-block; text-align: left;">
                        {{item.cardName}}
                      </div>
                      <div style="display: inline-block; text-align: right; float: right">
                        <span v-for="i in cardType" :value="i.value" :key="i.value">{{'' + item.cardType === i.value ? i.key : ''}}</span>
                      </div>
                    </div>
                    <div style="text-align: center; color: #f1f1f1; height: 28px; font-size: 12px;">余额:<span
                      style="font-size: 16px;"> ￥{{item.totalBalance}}</span></div>
                    <div style="text-align: right; color: #ffffff; font-size: 12px;">会员卡号: {{item.cardNo}}</div>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="4">
            <div class="grid-content-right"><span style="color: red">* </span>车牌号</div>
          </el-col>
          <el-col :span="11">
            <div class="grid-content-left">
              <el-input placeholder="车牌号" size="small" v-model="form.code" class="input-with-select" maxlength="7">
                <el-select v-model="form.plate" style="width:100px" slot="prepend" placeholder="车牌系">
                  <el-option v-for="item in plateNos" :key="item.label" :label="item.label"
                             :value="item.label"></el-option>
                </el-select>
              </el-input>
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
  </div>
</template>

<script>
  import {MemberService} from "@/service/member/MemberService";
  import {CommonService} from "@/service/common/CommonService";

  export default {
    name: "BindCar",
    data() {
      return {
        memberInfo: {},
        memberCards: [],
        memberId: '',
        memberService: null,
        memberType: [],
        memberSVIP: [],
        cardType: [],
        form: {
          cardIds: [],
          plate: undefined,
          code: undefined,
        },
        plateNos: [
          {label: '蒙'},
          {label: '京'},
          {label: '冀'},
          {label: '晋'},
          {label: '辽'},
          {label: '吉'},
          {label: '黑'},
          {label: '沪'},
          {label: '苏'},
          {label: '浙'},
          {label: '皖'},
          {label: '闽'},
          {label: '赣'},
          {label: '鲁'},
          {label: '豫'},
          {label: '鄂'},
          {label: '湘'},
          {label: '粤'},
          {label: '桂'},
          {label: '琼'},
          {label: '渝'},
          {label: '川'},
          {label: '贵'},
          {label: '云'},
          {label: '藏'},
          {label: '陕'},
          {label: '甘'},
          {label: '青'},
          {label: '宁'},
          {label: '新'}
        ],
        card: {
          backgroundImage: 'url(' + require('@/assets/cards/blue.png') + ')',
          backgroundSize: '150px',
          borderRadius: '3px',
          width: '160px',
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
        }];
        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.memberType = response.memberType;
          that.memberSVIP = response.memberSVIP;
          that.cardType = response.cardType;
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
        this.form = {
          cardIds: [],
          plate: undefined,
          code: undefined,
        };
        this.$emit('closeCarBindDialog', false);
      },
      handleSubmit(form) {
        if (this.form.cardIds.length === 0) {
          this.$message({
            message: '会员卡不能为空',
            type: "warning"
          });
          return;
        }
        if (this.form.plate === undefined || this.form.code === undefined) {
          this.$message({
            message: '车牌号不能为空',
            type: "warning"
          });
          return;
        }

        let param = {
          cardIds: this.form.cardIds,
          plateNo: this.form.plate + this.form.code,
        }
        // 绑定车辆
        this.memberService.bindCar(param)
          .then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.form = {
                cardIds: [],
                plate: undefined,
                code: undefined,
              };
              this.$emit('closeCarBindDialog', false);
            } else {
              this.$message({
                message: response.message,
                type: "warning"
              });
            }
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

</style>
