<template>
  <el-tabs v-model="active">
    <el-tab-pane label="基本信息" name="first">
      <div>
        <el-row :gutter="10">
          <el-col :span="10">
            <div class="grid-content-right">活动ID：</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content-left">{{activityData.id}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <div class="grid-content-right">活动类型：</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content-left">{{activityData.activityMetaCodeDisplay}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <div class="grid-content-right">活动名称：</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content-left">{{activityData.name}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <div class="grid-content-right">活动时间：</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content-left">{{activityData.dateRangeTypeDisplay}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <div class="grid-content-right">活动用户：</div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content-left">{{activityData.userScopeTypeDisplay}}</div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="活动规则" name="second">
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="grid-content-right">卡类型：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">{{activityData.cardTypeNames}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="grid-content-right">活动规则：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">
            <span v-html="activityData.activityRuleDisplay == null ? '' : activityData.activityRuleDisplay.replace(/\n/g,'<br/>')"></span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="grid-content-right">充值次数：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">{{activityData.joinLimit == 0 ? '不限' : activityData.joinLimit}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="grid-content-right">充值渠道：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">{{activityData.payChanneNames}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="grid-content-right">备注：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">{{activityData.memo}}</div>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import {ActivityAdminService} from "@/service/marketing/activity/ActivityAdminService";

  export default {
    name: "RechargeCashBackDetail",
    data() {
      return {
        active: 'first',
        activityAdminService: undefined,
        activityData: {
          activityMetaCodeDisplay: undefined,
          name: undefined,
          dateRangeTypeDisplay: undefined,
          userScopeTypeDisplay: undefined,
          cardTypeNames: undefined,
          activityRuleDisplay: undefined,
          joinLimit: undefined,
          payChanneNames: undefined,
          memo: undefined,
        }
      };
    },
    mounted() {
      this.activityAdminService = new ActivityAdminService();
    },
    methods: {
      initDetail(data) {
        this.active = 'first';
        this.activityData = data;
      }
    }
  }
</script>

<style>
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
