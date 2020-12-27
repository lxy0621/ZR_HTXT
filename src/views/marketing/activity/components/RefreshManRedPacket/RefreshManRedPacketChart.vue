<template>
  <div>
    <recharge-cash-back-btn-groups v-on:Datechange="Datechange"></recharge-cash-back-btn-groups>
    <el-card>
      <ve-line v-if="chartData.rows != 0" :data="chartData" :settings="chartSettings"></ve-line>
      <div class="noData" v-if="chartData.rows == 0">暂无当前时间段数据</div>
    </el-card>
    <el-card style="margin-top: 12px;">
      <ve-line v-if="chartData2.rows != 0" :data="chartData2" :settings="chartSettings2"></ve-line>
      <div class="noData" v-if="chartData.rows == 0">暂无当前时间段数据</div>
    </el-card>
    <br />
  </div>
</template>
<script>
import RechargeCashBackBtnGroups from "../RechargeCashBack/RechargeCashBackBtnGroups";
import { ActivityAdminService } from "@/service/marketing/activity/ActivityAdminService";
export default {
  name: "RefreshManRedPacketChart",
  components: {
    RechargeCashBackBtnGroups
  },
  data() {
    return {
      selectDate: "", //按钮选择器组件传递来的值
      postData: {
        id: undefined,
        type: 5,
        startDate: undefined,
        endDate: undefined,
        queryTotalUser: 1,
        queryTotalOrder: 1,
        queryTotalInMoney: 1,
        queryTotalOutMoney: 1
      },
      chartSettings: {
        yAxisType: ["NUM"],
        yAxisName: ["单位:个"]
      },
      chartData: {
        columns: ["日期范围", "已发放数", "已领取数"],
        rows: []
      },
      chartSettings2: {
        yAxisType: ["NUM"],
        yAxisName: ["单位:元"]
      },
      chartData2: {
        columns: ["日期范围", "已领红包金额"],
        rows: []
      }
    };
  },
  mounted() {
    this.activityAdminService = new ActivityAdminService();
    if (this.$route.query !== undefined) {
      this.postData.id = parseInt(this.$route.query.id);
      this.getChart();
    }
  },
  methods: {
    Datechange(date) {
      if (date.constructor === Array) {
        this.postData.startDate = date[0];
        this.postData.endDate = date[1];
        this.postData.type = 10;
      } else {
        this.postData.type = date;
        (this.postData.startDate = undefined),
          (this.postData.endDate = undefined);
      }
    },
    getChart() {
      this.activityAdminService
        .getActPageDataTrend(this.postData)
        .then(response => {
          if (response.success == true) {
            var ChartData = response.data.statisticsTrend.metricData;
          } else {
            return;
          }
          var newChartData = ChartData.map(item => ({
            日期范围: item.xdisplay,
            已领取数: item.totalUser,
            已发放数: item.totalOrder
          }));
          var newChartData2 = ChartData.map(item => ({
            日期范围: item.xdisplay,
            已领红包金额: item.totalOutMoney
          }));
          this.chartData.rows = newChartData;
          this.chartData2.rows = newChartData2;
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
