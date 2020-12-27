<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-select v-model="queryParams.stationIds" placeholder="全部油站" size="small" style="width: 100%" multiple>
        <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item style="text-overflow:ellipsis;white-space:nowrap;">
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
          <el-input-number v-model="queryParams.minChargeMoney" placeholder="最小值" size="small" :controls="false" :precision="2" style="width: 100%;"></el-input-number>
        </el-col>
        <el-col :span="1" style="text-align: center">-</el-col>
        <el-col :span="7">
          <el-input-number v-model="queryParams.maxChargeMoney" placeholder="最大值" size="small" :controls="false" :precision="2" style="width: 100%;"></el-input-number>
        </el-col>
      </el-row>
    </search-container-item>
    <search-container-item>
      <el-date-picker
        type="daterange"
        value-format="yyyy-MM-dd"
        size="small"
        style="width: 100%"
        range-separator="至"
        start-placeholder="消费开始日期"
        end-placeholder="消费结束日期"
        v-model="dateRange"
      ></el-date-picker>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {ExpenseReportService} from '@/service/trade/expense/ExpenseReportService.js';

  export default {
    name: 'DaySearch',
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        queryParams: {
          page: 1,
          limit: 30,
        },
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
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.expenseDateStart = this.dateRange[0];
          this.queryParams.expenseDateEnd = this.dateRange[1];
        }
        if (null === this.dateRange) {
          this.queryParams.expenseDateStart = undefined;
          this.queryParams.expenseDateEnd = undefined;
        }
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        this.queryParams = {};
        this.dateRange = [];
        this.$emit('reset', this.queryParams);
        this.handleDataSearch();
      }
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
