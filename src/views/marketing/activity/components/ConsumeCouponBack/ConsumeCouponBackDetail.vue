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
          <div class="grid-content-right">油气站：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">
            <span v-html="activityData.stationNames == null ? '' : activityData.stationNames.replace(',','<br/>')"></span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="grid-content-right">可用油品：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">
            <el-tag size="small" v-for="item in (activityData.productSkuNames !== undefined ? activityData.productSkuNames.split(',') : [])" :key="item" style="margin-right: 3px;">{{ item }}</el-tag>
          </div>
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
          <div class="grid-content-right">消费次数：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">{{activityData.joinLimit == 0 ? '不限' : activityData.joinLimit}}</div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">
          <div class="grid-content-right">收款方式：</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content-left">
            <el-tag size="small" v-for="item in (activityData.payGroundNames !== undefined ? activityData.payGroundNames.split(',') : [])" :key="item" style="margin-right: 3px;">{{ item }}</el-tag>
          </div>
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
    name: "ConsumeCouponBackDetail",
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
          payGroundNames: undefined,
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
