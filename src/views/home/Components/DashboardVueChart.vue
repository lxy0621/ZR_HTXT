<template>
  <div class="home-vue-chart" v-if="loaded">
    <el-row class="chart-line-panel" :gutter="8">
      <div class="group-type-wrap" v-if="courseBarChartData">
        <el-col :span="24">
          <el-radio-group v-model="searchParams" @change="groupTypeChange">
            <el-radio v-for="item in selectGroupTypeList" :key="item.type" :label="item.type">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <div class="order-pie-wrapper">
            <ve-ring :data="orderRingChart.orderChartData" :colors="orderRingChart.orderColors" :settings="orderRingChart.orderChartSettings" :extend="orderRingChart.orderExtend"></ve-ring>
            <div class="order-pie-wrapper__pie-type">
              <el-radio-group v-model="order_pie_type" @change="groupTypeChange">
                <el-radio v-for="item in pieTypeList" :label="item.type" :key="item.type">{{ item.label }}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div>
            <ve-histogram
              :data="orderCylindricalChart.orderCylindricaData"
              :colors="orderCylindricalChart.orderCylindricaColors"
              :settings="orderCylindricalChart.orderCylindricaSettings"
              :extend="orderCylindricalChart.orderextendCylindrical"
            ></ve-histogram>
          </div>
        </el-col>
        <el-col :span="24" class="margin-chart"></el-col>
        <el-col :span="6">
          <div class="order-pie-wrapper">
            <ve-ring :data="orderRingChart.orderChartData" :colors="orderRingChart.orderColors" :settings="orderRingChart.orderChartSettings" :extend="orderRingChart.orderExtend"></ve-ring>
            <div class="order-pie-wrapper__pie-type">
              <el-radio-group v-model="course_pie_type" @change="groupTypeChange">
                <el-radio v-for="item in pieTypeList" :label="item.type" :key="item.type">{{ item.label }}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div>
            <ve-histogram
              :data="orderCylindricalChart.orderCylindricaData"
              :colors="orderCylindricalChart.orderCylindricaColors"
              :settings="orderCylindricalChart.orderCylindricaSettings"
              :extend="orderCylindricalChart.orderextendCylindrical"
            ></ve-histogram>
          </div>
        </el-col>
      </div>
      <el-col :span="24" v-else>
        <div class="no-chart-data">暂无金额图表数据</div>
      </el-col>
    </el-row>
  </div>
  <div v-else></div>
</template>

<script>
const ChartColor = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};
export default {
  name: "dashboard-vue-chart",
  data() {
    return {
      pieTypeList: [
        {
          label: "订单数",
          type: "1"
        },
        {
          label: "业绩",
          type: "2"
        }
      ],
      loaded: true,
      courseBarChartData: true,
      searchParams: 1,
      selectGroupTypeList: [
        {
          type: 1,
          label: "按周查看"
        },
        {
          type: 2,
          label: "按月查看"
        }
      ],
      loaded: true,
      courseBarChartData: true,
      searchParams: 1,
      course_pie_type: "1",
      order_pie_type: "1",
      selectGroupTypeList: [
        {
          type: 1,
          label: "按周查看"
        },
        {
          type: 2,
          label: "按月查看"
        }
      ],
      orderRingChart: {
        orderColors: [
          "rgba(54, 162, 235,0.5)",
          "rgba(75, 192, 192,0.5)",
          "rgba(255, 159, 64,0.5)"
        ],
        orderExtend: {
          padding: 30,
          cutoutPercentage: 70,
          legend: {
            bottom: 0
          },
          title: {
            show: true,
            text: "业绩数据分布",
            left: "center",
            textStyle: {
              color: "#999",
              fontSize: 14
            }
          },
          responsive: true,
          maintainAspectRatio: false
        },
        orderChartSettings: {
          itemStyle: {},
          radius: [140, 95],
          label: {
            show: false
          }
        },
        orderChartData: {
          columns: ["订单数", "订单数量"],
          rows: [
            { 订单数: "新单数", 订单数量: 1393 },
            { 订单数: "续费单数", 订单数量: 145 },
            { 订单数: "其他", 订单数量: 324 }
          ]
        }
      },
      orderCylindricalChart: {
        orderCylindricaColors: [
          "rgba(54, 162, 235,0.5)",
          "rgba(255, 159, 64,0.5)",
          "rgba(75, 192, 192,0.5)",
          "rgba(255, 99, 132,0.5)"
        ],
        orderextendCylindrical: {
          padding: 30,
          title: {
            show: true,
            text: "课消金额&课消数曲线",
            left: "center",
            textStyle: {
              color: "#999",
              fontSize: 14
            }
          },
          yAxis: {
            show: true,
            offset: 0,
            // 坐标轴轴线
            axisLine: {
              show: false
            },
            // x轴对应的竖线
            splitLine: {
              show: false
            },
            // 坐标轴刻度
            axisTick: {
              show: false
            },
            boundaryGap: false,
            axisLabel: {
              color: "#3a3a3a"
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            bottom: 0
          },
          tooltips: {
            mode: "index",
            intersect: false
          },
          grid: {
            show: true
          }
        },
        orderCylindricaSettings: {
          axisSite: { right: ["退费单数"] },
          yAxisType: ["RMB", "percent"],
          yAxisName: ["线:金额(万元)", "柱:订单数"]
        },
        orderCylindricaData: {
          columns: ["日期", "新单数", "续费单数", "其他单数", "退费单数"],
          rows: [
            {
              日期: "2020-01周",
              新单数: 1393,
              续费单数: 1093,
              其他单数: 3938,
              退费单数: 234
            },
            {
              日期: "2020-02周",
              新单数: 3530,
              续费单数: 3230,
              其他单数: 182,
              退费单数: 3244
            },
            {
              日期: "2020-03周",
              新单数: 2923,
              续费单数: 2623,
              其他单数: 726,
              退费单数: 4322
            },
            {
              日期: "2020-04周",
              新单数: 1723,
              续费单数: 1423,
              其他单数: 7235,
              退费单数: 44
            },
            {
              日期: "2020-05周",
              新单数: 3792,
              续费单数: 3492,
              其他单数: 357,
              退费单数: 193
            },
            {
              日期: "2020-06周",
              新单数: 4593,
              续费单数: 4293,
              其他单数: 276,
              退费单数: 3454
            }
          ]
        }
      }
    };
  },
  watch: {},
  methods: {
    groupTypeChange() {
    }
  }
};
</script>

<style lang="scss">
.home-vue-chart {
  padding: 10px;
  .chart-line-panel {
    .margin-chart {
      margin: 20px 0;
      border: 1px solid #f1f1f1;
    }
    margin-top: 15px;
    padding: 10px;
    box-shadow: 0 0 6px -5px #f2f6f6;
    background: #fff;
    .group-type-wrap {
      margin: 15px 0;
      text-align: center;
    }
    .no-chart-data {
      text-align: center;
      margin: 15px 0;
    }
    .order-pie-wrapper,
    .couse-pie-wrapper {
      position: relative;
      .couse-pie-wrapper__pie-type {
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.home-vue-chart .chart-line-panel .couse-pie-wrapper__pie-type,
.home-vue-chart .chart-line-panel .order-pie-wrapper__pie-type {
  position: absolute;
  top: 52%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.home-vue-chart
  .chart-line-panel
  .order-pie-wrapper__pie-type
  .el-radio:first-of-type {
  margin-right: 15px;
}
</style>
