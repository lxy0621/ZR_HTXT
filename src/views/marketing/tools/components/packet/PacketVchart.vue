<template>
  <div>
    <vchart-btn-groups v-on:Datechange="Datechange"></vchart-btn-groups>
    <el-card>
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </el-card>
    <el-card>
      <ve-line :data="chartData2" :settings="chartSettings2"></ve-line>
    </el-card>
  </div>
</template>

<script>
import VchartBtnGroups from "./VchartBtnGroups";
import { RedPacketAdminService } from "@/service/marketing/tools/RedPacketAdminService";
export default {
  name: "VchartMessage",
  components: {
    VchartBtnGroups
  },
  data() {
    return {
      queryParams: {
        batchId: undefined,
        dateFrom: undefined,
        dateTo: undefined,
        groupType: 1 //统计分组类型 1-日 2-周 3-年
      },
      chartSettings: {
        yAxisType: ["NUM"],
        yAxisName: ["单位:个/元"]
      },
      chartData: {
        columns: ["日期", "已领取个数", "已领取金额"],
        rows: []
      },
      chartSettings2: {
        yAxisType: ["NUM"],
        yAxisName: ["单位:个/元"]
      },
      chartData2: {
        columns: ["日期", "已发放个数", "已发放金额"],
        rows: []
      }
    };
  },
  mounted() {
    this.redPacketAdminService = new RedPacketAdminService();
    this.date();
    if (this.$route.query.data !== undefined) {
      this.queryParams.batchId = parseInt(this.$route.query.data.id);
      this.queryParams.dateFrom = this.$route.query.data.createdAt.slice(0, 10);
      this.getChartData();
    }
  },
  methods: {
    date() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.queryParams.dateTo = currentdate;
    },
    Datechange(date) {
      if (date.constructor === Array) {
        this.queryParams.dateFrom = date[0];
        this.queryParams.dateTo = date[1];
      } else {
        this.queryParams.groupType = date;
      }
      this.getChartData();
    },
    getChartData() {
      this.redPacketAdminService
        .redPacketStats(this.queryParams)
        .then(response => {
          var newChartData = response.usedData.map(item => ({
            日期: item.transDate,
            已领取个数: item.cnt,
            已领取金额: item.money
          }));
          this.chartData.rows = newChartData;
          var newChartData2 = response.grantData.map(item => ({
            日期: item.transDate,
            已发放个数: item.cnt,
            已发放金额: item.money
          }));
          this.chartData2.rows = newChartData2;
        });
    }
  }
};
</script>
