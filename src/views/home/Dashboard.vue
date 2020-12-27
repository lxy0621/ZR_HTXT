<template>
  <div class="page-container">
    <el-row>
      <el-col :span="24">
        <el-card style="background:#f2f2f2;">
          <div class="grid-content">
            <el-card class="homepage-data-summarization">
              <data-summarization-tabs>
                <!--
                <el-button slot="append" type="text" @click="refreshData">
                  更新数据
                  <i :class="['fa', 'fa-refresh', { 'rotate-circle': rotateFlag }]" aria-hidden="true" style="cursor: pointer;margin-right:10px;"></i>
                </el-button>
                -->
                <date-type-select slot="append"></date-type-select>
                <div slot="manage">
                  <dashboard-vue-chart></dashboard-vue-chart>
                </div>
              </data-summarization-tabs>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DateTypeSelect from "./Components/DateTypeSelect";
import dataSummarizationTabs from "./Components/DataSummarizationTabs";
import DashboardDataBlock from "./Components/DashboardDataBlock";
import DashboardRoundBtn from "./Components/DashboardRoundBtn";
import DashboardVueChart from "./Components/DashboardVueChart";
import DashboardDateTypeSelect from "./Components/DashboardDateTypeSelect";

export default {
  name: "dashboard",
  components: {
    DateTypeSelect,
    dataSummarizationTabs,
    DashboardDataBlock,
    DashboardRoundBtn,
    DashboardVueChart,
    DashboardDateTypeSelect
  },
  data() {
    return {
      rotateFlag: false,
    };
  },
  methods: {
    refreshData() {
      let that = this;
      that.rotateFlag = true;
      setTimeout(function() {
        that.rotateFlag = false;
      }, 3000);
    },
    convert2Million(num) {
      const number = num || 0;
      return (number / 10000).toFixed(2);
    },
  }
};
</script>

<style scoped lang="scss">
.el-card {
  border: none;
}
.page-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content .el-col {
  border-radius: 4px;
  padding-bottom: 10px;
}
.el-tabs__nav-scroll {
  padding: 5px 10px;
  background: #fff;
}
.homepage-data-summarization {
  padding-bottom: 30px;
  .homepage-data-summarization__all-panel {
    text-align: left;
    border: 1px solid #f1f1f1;
    vertical-align: middle;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: nowrap;
    overflow: auto;
    .custom-data-block {
      margin: 0 5px;
    }
    .green-line {
      height: 58px;
      border: 1px solid rgb(236, 236, 236);
    }
  }
  .homepage-data-summarization__button-group {
    margin-top: 23px;
    text-align: right;
  }
}
.homepage-data-summarization__all-panel {
  margin-top: 20px;
}
</style>
