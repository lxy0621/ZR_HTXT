<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-select v-model="queryParams.stationIds" placeholder="全部油站" size="small" style="width: 100%" multiple>
        <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item style="width: 400px;">
      <el-row :gutter="5">
        <el-col :span="9">
          <el-select style="width: 100%;" v-model="queryParams.selectFlag" placeholder="请选择" size="small">
            <el-option label="消费总金额" value="1"></el-option>
            <el-option label="实际支付总金额" value="2"></el-option>
            <el-option label="卡券总金额" value="3"></el-option>
            <el-option label="总订单数" value="4"></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input-number v-model="queryParams.minChargeMoney" placeholder="最小值" size="small" :controls="false"
                           :precision="2" style="width: 100%;"></el-input-number>
        </el-col>
        <el-col :span="1" style="text-align: center">-</el-col>
        <el-col :span="7">
          <el-input-number v-model="queryParams.maxChargeMoney" placeholder="最大值" size="small" :controls="false"
                           :precision="2" style="width: 100%;"></el-input-number>
        </el-col>
      </el-row>
    </search-container-item>
    <search-container-item style="width: 560px;" folded>
      <el-row :gutter="5">
        <el-col :span="11">
          <el-row :gutter="5">
            <el-col :span="12">
              <el-date-picker v-model="queryParams.expenseDateStart" type="year" value-format="yyyy-MM-dd"
                              placeholder="选择开始年"
                              size="small" style="width: 100%"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-select v-model="queryParams.quarterStartFlag" placeholder="选择开始季度" size="small"
                         @change="changeQuarterStart" style="width: 100%;">
                <el-option label="第一季度" value="1"></el-option>
                <el-option label="第二季度" value="2"></el-option>
                <el-option label="第三季度" value="3"></el-option>
                <el-option label="第四季度" value="4"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" align="center">至</el-col>
        <el-col :span="11">
          <el-row :gutter="5">
            <el-col :span="12">
              <el-date-picker v-model="queryParams.expenseDateEnd" type="year" value-format="yyyy-MM-dd"
                              placeholder="选择结束年"
                              size="small" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-select v-model="queryParams.quarterEndFlag"  style="width: 100%;"placeholder="选择结束季度" size="small"
                         @change="changeQuarterEnd">
                <el-option label="第一季度" value="1"></el-option>
                <el-option label="第二季度" value="2"></el-option>
                <el-option label="第三季度" value="3"></el-option>
                <el-option label="第四季度" value="4"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {ExpenseReportService} from '@/service/trade/expense/ExpenseReportService.js';

  export default {
    name: 'QuarterSearch',
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        queryParams: {},
        stations: [],
        service: null,
        expenseFlag: undefined,
        dateRange: undefined
      };
    },
    mounted() {
      this.service = new ExpenseReportService();
      this.queryAllStations();
    },
    methods: {
      queryAllStations() {
        this.service.queryAllStations().then(response => {
          this.stations = response;
        });
      },
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        this.queryParams = {};
        this.dateRange = [];
        this.$emit('reset', this.queryParams);
        this.handleDataSearch();
      },
      // 季度选择改变事件 - start
      changeQuarterStart() {
        if (this.queryParams.expenseDateStart == null) {
          this.$message({
            message: '请先选择年份',
            type: 'warning'
          });
          this.queryParams.quarterStartFlag = '';
        }
      },
      // 季度选择改变事件 - end
      changeQuarterEnd() {
        if (this.queryParams.expenseDateEnd == null) {
          this.$message({
            message: '请先选择年份',
            type: 'warning'
          });
          this.queryParams.quarterEndFlag = '';
        }
      }
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
