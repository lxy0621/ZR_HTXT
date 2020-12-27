<template>
  <div :v-model="memberInfo">
    <el-row :gutter="10">
      <el-col :span="11">
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
            <div class="grid-content-right">姓名</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left" v-if="btnFlag === 'update'">{{memberInfo.name}}</div>
            <div class="grid-content-left" v-else>
              <el-input placeholder="姓名" v-model="form.name" size="mini" style="width: 100%"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left" v-if="btnFlag === 'update'">{{memberInfo.nickname}}</div>
            <div class="grid-content-left" v-else>
              <el-input placeholder="会员昵称" v-model="form.nickname" size="mini" style="width: 100%"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left" v-if="btnFlag === 'update'">{{memberInfo.mobile}}</div>
            <div class="grid-content-left" v-else>
              <el-input placeholder="手机号" v-model="form.mobile" @blur="blurMobile" size="mini" style="width: 100%"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">会员类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <div class="grid-content-left" v-if="btnFlag === 'update'">
                <span v-for="item in memberType" :value="item.value" :key="item.value">{{'' + memberInfo.memberType === item.value ? item.key : ''}}</span>
              </div>
              <div class="grid-content-left" v-else>
                <el-radio-group v-model="form.memberType" @change="changeMemberType">
                  <el-radio v-for="item in memberType" :key="item.value" :label="item.value">{{item.key}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">公司名称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left" v-if="btnFlag === 'update'">{{memberInfo.companyName}}</div>
            <div class="grid-content-left" v-else>
              <template v-if="form.memberType === '1'">
                <el-input placeholder="公司名称" v-model="form.companyName" size="mini" style="width:100%"
                          :disabled="true"/>
              </template>
              <template v-else>
                <el-input placeholder="公司名称" v-model="form.companyName" size="mini" style="width:100%"
                          :disabled="false"/>
              </template>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">注册日期</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberInfo.createdAt}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">会员标签</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left" v-if="btnFlag === 'update'">
              <el-tag size="mini" v-for="item in memberInfo.tags" :key="item.id" type="info" style="margin-right: 3px;">
                {{item.name}}
              </el-tag>
            </div>
            <div class="grid-content-left" v-else>
              <el-select v-model="form.tags" placeholder="添加用户标签" size="mini" style="width: 100%" multiple>
                <el-option-group v-for="group in tagList" :key="group.tagGroupId" :label="group.tagGroupName">
                  <el-option v-for="item in group.tags"
                             :key="item.tagId"
                             :label="item.tagName"
                             :value="item.tagId">
                  </el-option>
                </el-option-group>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="13">
        <el-row :gutter="50">
          <el-col :span="6">
            <div class="grid-content-right">头像</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content-left"><img
              style="width: 95px; height:90px; border-radius: 45px; border: 2px solid #efefef;"
              :src=memberInfo.avatarUrl></div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <div class="grid-content-right">性别</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content-left" v-if="btnFlag === 'update'">
              <span v-for="item in memberGender" :value="item.value" :key="item.value">{{'' + memberInfo.gender === item.value ? item.key : ''}}</span>
            </div>
            <div class="grid-content-left" v-else>
              <el-radio-group v-model="form.gender">
                <el-radio v-for="item in memberGender" :key="item.value" :label="item.value">{{item.key}}</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <div class="grid-content-right">SVIP</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content-left" v-if="btnFlag === 'update'">
              <span v-for="item in memberSVIP" :value="item.value" :key="item.value">{{'' + memberInfo.svip === item.value ? item.key : ''}}</span>
            </div>
            <div class="grid-content-left" v-else>
              <el-select v-model="form.svip" placeholder="SVIP" size="mini" style="width:100%;">
                <el-option v-for="item in memberSVIP" :key="item.value" :label="item.key"
                           :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <div class="grid-content-right">当前积分</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content-left">
              <span style="color:#1e9fff; font-weight: bold;">{{memberInfo.scores === undefined || memberInfo.scores === 0 ? '0' : memberInfo.scores}} 分</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="6">
            <div class="grid-content-right">当前余额</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold;">{{memberInfo.balance === undefined || memberInfo.balance === 0 ? '0' : formatNumber(memberInfo.balance)}} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-right">
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="10">
      <el-col :span="11">
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">邀请人ID</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">--</div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">邀请人姓名</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">--</div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">小程序openid</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span v-if="memberWechat.wxAppType === 1">{{memberWechat.wxOpenId}}</span>
              <span v-else>--</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">公众号openid</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span v-if="memberWechat.wxAppType === 2">{{memberWechat.wxOpenId}}</span>
              <span v-else>--</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="grid-content-right">unionid</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{memberWechat.wxUnionId}}</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14">
      </el-col>
    </el-row>
    <div>
      <div style="float: left">
        <template v-if="btnFlag ==='update'">
          <el-button size="medium" type="primary" @click="handleUpdate()">修 改</el-button>
        </template>
        <template v-else>
          <el-button size="medium" @click="handleCancel()">取 消</el-button>
          <el-button size="medium" type="primary" @click="handleSubmit('form')">确 定</el-button>
        </template>
      </div>
      <div style="float: right">
        <el-button size="medium" @click="closeDialog">关 闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {MemberService} from "@/service/member/MemberService";
  import {CommonService} from "@/service/common/CommonService";
  import * as formatter from "@/utils/formatter";
  import * as validate from "@/utils/validate";

  export default {
    name: "BaseDetail",
    data() {
      return {
        memberInfo: {},
        memberWechat: {},
        memberId: '',
        memberService: null,
        memberType: [],
        memberSVIP: [],
        memberGender: [],
        btnFlag: 'update',
        tagList: [],
        form: {
          gender: 0,
        },
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
        }];
        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.memberType = response.memberType;
          that.memberSVIP = response.memberSVIP;
        });

        const gender = [{
          enumKey: "memberGender",
          enumValue: "EnumGender",
        }];
        new CommonService().findEnumExcludeAll('org', gender).then(response => {
          that.memberGender = response.memberGender;
        })

        // 标签
        this.memberService.getTagsSelect().then(response => {
          that.tagList = response;
        })
      },
      mounted() {
        this.btnFlag = 'update';
        this.initSelectData();
      },
      loadMemberInfo(memberId) {
        this.btnFlag = 'update';
        if (memberId !== undefined) {
          this.memberId = memberId;
        }
        // 会员基本信息
        this.memberService.getMemberInfoByMemberId(memberId)
          .then(response => {
            this.memberInfo = response;
          });
        // 会员微信信息
        this.memberService.getMemberWechatByMemberId(memberId)
          .then(response => {
            this.memberWechat = response;
          });
      },
      handleUpdate() {
        if (this.btnFlag == 'update') {
          let tags = [];
          this.memberInfo.tags.forEach(function (value, index) {
            tags.push(value.id);
          });
          this.form = {
            id: this.memberInfo.id,
            name: this.memberInfo.name,
            nickname: this.memberInfo.nickname,
            gender: '' + this.memberInfo.gender,
            mobile: this.memberInfo.mobile,
            svip: '' + this.memberInfo.svip,
            memberType: '' + this.memberInfo.memberType,
            companyName: this.memberInfo.companyName,
            tags: tags,
          };
          this.btnFlag = 'submit';
        } else {
          this.btnFlag = 'update';
        }
      },
      handleCancel() {
        if (this.btnFlag == 'update') {
          this.btnFlag = 'submit';
        } else {
          this.btnFlag = 'update';
        }
      },
      handleSubmit(form) {
        if (this.btnFlag == 'update') {
          this.btnFlag = 'submit';
        } else {
          if(!validate.isMobile(this.form.mobile)) {
            this.$message({
              message: '请输入正确的手机号',
              type: "warning"
            });
            return false;
          }

          // 会员类型为个人,置公司名称为''
          if (this.form.memberType === '1') {
            this.form.companyName = ' ';
          }
          // 性别为空时，置位null
          if (this.form.gender === 'undefined') {
            this.form.gender = null;
          }
          // 修改会员信息
          this.memberService.updateMember(this.form)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: "success"
                });
                this.loadMemberInfo(this.form.id);
                this.btnFlag = 'update';
              } else {
                this.$message({
                  message: response.message,
                  type: "warning"
                });
              }
            });
        }
      },
      closeDialog() {
        this.$emit('closeCheckDialog', false);
      },
      changeMemberType(val) {
        this.form.companyName = '';
      },
      blurMobile(e) {
        let mobile = e.currentTarget.value;
        if(!validate.isMobile(mobile)) {
          this.$message({
            message: '请输入正确的手机号',
            type: "warning"
          });
        }
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
