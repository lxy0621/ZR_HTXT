<template>
  <div>
    <coupon-data-btn-groups v-on:changeDate="changeDate"></coupon-data-btn-groups>
    <el-card>
      <div slot="header" class="clearfix" align="center">
        <span>核销卡券数据统计</span>
      </div>
      <ve-line v-if="consumeChartData.rows.length > 0" :data="consumeChartData" :settings="chartSettings"></ve-line>
      <div class="noData" v-if="consumeChartData.rows == 0">暂无当前时间段数据</div>
    </el-card>
    <el-card style="margin-top: 12px;">
      <div slot="header" class="clearfix" align="center">
        <span>发放卡券数据统计</span>
      </div>
      <ve-line v-if="drawChartData.rows.length > 0" :data="drawChartData" :settings="chartSettings2"></ve-line>
      <div class="noData" v-if="drawChartData.rows == 0">暂无当前时间段数据</div>
    </el-card>
  </div>
</template>

<script>
import CouponDataBtnGroups from "./CouponDataBtnGroups";
import { CouponAdminService } from "@/service/marketing/tools/CouponAdminService";

export default {
  name: "CouponDataChart",
  components: {
    CouponDataBtnGroups
  },
  data() {
    return {
      selectDate: '', //按钮选择器组件传递来的值
      couponAdminService: undefined,
      postData: {
        couponBatchId: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        groupType: undefined,
      },
      consumeChartData: {
        columns: ["日期范围", "已核销数", "已核销金额"],
        rows: []
      },
      drawChartData: {
        columns: ["日期范围", "已发放数", "已发放金额"],
        rows: []
      },
      chartSettings: {
        yAxisType: ["NUM"],
        yAxisName: ["单位:张"]
      },
      chartSettings2: {
        yAxisType: ["MONEY"],
        yAxisName: ["单位:元"]
      }
    };
  },
  mounted() {
    this.couponAdminService = new CouponAdminService();

    if (this.$route.query.data !== undefined) {
      this.postData.couponBatchId = parseInt(this.$route.query.data.id);
      this.getChart();
    }
  },
  methods: {
    changeDate(date) {
      if (date.constructor === Array) {
        this.postData.dateFrom = date[0];
        this.postData.dateTo = date[1];
        this.postData.type = 4;
      } else {
        this.postData.groupType = date;
        this.postData.dateFrom = undefined;
        this.postData.dateTo = undefined;
      }
      this.getChart();
    },
    getChart() {
      // 核销卡券统计数据
      this.couponAdminService.statsGroupByConsumeDate(this.postData)
        .then(response => {
          let couponChartData = undefined;
          if (response.success == true) {
            couponChartData = response.data.rows;
          } else {
            return;
          }
          let consumeChart = couponChartData.map(item => ({
            日期范围: item.transDate,
            已核销数: item.cnt,
            已核销金额: item.money,
          }));
          this.consumeChartData.rows = consumeChart;
        });

      // 发放卡券统计数据
      this.couponAdminService.statsGroupByDrawDate(this.postData)
        .then(response => {
          let couponChartData = undefined;
          if (response.success == true) {
            couponChartData = response.data.rows;
          } else {
            return;
          }
          let drawChart = couponChartData.map(item => ({
            日期范围: item.transDate,
            已发放数: item.cnt,
            已发放金额: item.money,
          }));
          this.drawChartData.rows = drawChart;
        });
    }
  }
};
</script>
<style scoped>
.noData {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
}
</style>
