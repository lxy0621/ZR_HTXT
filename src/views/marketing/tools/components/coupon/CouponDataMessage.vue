<template>
  <div>
    <div class="title">基本信息</div>
    <el-row>
      <el-col :span="6">
        <span class="item-label">优惠券类型：</span>
        <span class="item-content">{{ this.couponBaseData.couponTypeDesc === undefined ? '' : this.couponBaseData.couponTypeDesc }}</span>
      </el-col>
      <el-col :span="6">
        <span class="item-label">优惠券名称：</span>
        <span class="item-content">{{ this.couponBaseData.couponName === undefined ? '' : this.couponBaseData.couponName}}</span>
      </el-col>
      <el-col :span="6">
        <span class="item-label">优惠券有效期：</span>
        <span class="item-content" v-if="this.couponBaseData.validateRuleType === 1">领取当日起 {{this.couponBaseData.validateDays}} 天内可用</span>
        <span class="item-content" v-if="this.couponBaseData.validateRuleType === 2">领取次日起 {{this.couponBaseData.validateDays}} 天内可用</span>
        <span class="item-content" v-if="this.couponBaseData.validateRuleType === 3">{{formatDate(this.couponBaseData.fromDate)}}~{{formatDate(this.couponBaseData.toDate)}}</span>
      </el-col>
      <el-col :span="6">
        <span class="item-label">优惠券状态：</span>
        <span class="item-content">{{ this.couponBaseData.batchStateDesc === undefined ? '' : this.couponBaseData.batchStateDesc }}</span>
      </el-col>
    </el-row>
    <br/>
    <el-divider></el-divider>
    <br/>
    <div class="title">统计信息</div>
    <div>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-card>
            <div class="subTitle">制券总数 / 制券总金额</div>
            <div class="subContent" style="color: #ff6c65">{{this.couponStatData.totalCount}} / {{this.couponStatData.totalMoney}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="subTitle">领取总数 / 领取总金额</div>
            <div class="subContent" style="color: #67C23A;">{{this.couponStatData.drawCount}} / {{this.couponStatData.drawMoney}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="subTitle">核销总数 / 核销总金额</div>
            <div class="subContent" style="color: #1e9fff;">{{this.couponStatData.consumeCount}} / {{this.couponStatData.consumeMoney}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div class="subTitle">未核销总数 / 未核销总金额</div>
            <div class="subContent" style="color: coral;">{{this.couponStatData.unConsumeCount}} / {{this.couponStatData.unConsumeMoney}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <br/>
    <coupon-data-chart></coupon-data-chart>
  </div>
</template>

<script>
  import CouponDataChart from "./CouponDataChart";
  import {CouponAdminService} from "@/service/marketing/tools/CouponAdminService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "CouponDataMessage",
    components: {
      CouponDataChart
    },
    data() {
      return {
        couponAdminService: undefined,
        couponBaseData: {
          couponTypeDesc: '',
          couponName: '',
          validateRuleType: '',
          validateDays: '',
          batchStateDesc: '',
        },
        couponStatData: {
          totalCount: '',
          totalMoney: '',
          drawCount: '',
          drawMoney: '',
          consumeCount: '',
          consumeMoney: '',
          unConsumeCount: '',
          unConsumeMoney: '',
        },
      };
    },
    mounted() {
      this.couponAdminService = new CouponAdminService();

      if (this.$route.query.data !== undefined) {
        this.couponBaseData = this.$route.query.data;

        const couponBatchId = this.$route.query.data.id;
        this.loadCouponStatData(couponBatchId);
      }
    },
    methods: {
      formatDate(time) {
        return formatter.formatDate(time);
      },
      loadCouponStatData(couponBatchId) {
        const param = {
          couponBatchId: couponBatchId,
        };

        this.couponAdminService.couponBatchStats(param)
          .then(response => {
            this.couponStatData = response;
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .title {
    flex: auto;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5715;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 20px;
  }

  .item-label {
    color: rgba(50, 50, 50, 0.85);
    font-size: 14px;
    line-height: 1.5715;
    text-align: start;
  }

  .item-content {
    flex: 1 1;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 1.5715;
    vertical-align: middle;
    line-height: 32px;
  }

  .subTitle {
    text-align: center;
  }

  .subContent {
    text-align: center;
    margin-top: 15px;
    font-size: 20pt;
  }

</style>
