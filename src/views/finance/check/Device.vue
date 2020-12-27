<template>
  <div class="container-device">
    <el-card class="container">
      <el-card class="search">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-select v-model="queryParams.orgEmployeeId" filterable prefix-icon="el-icon-search" placeholder="加油员"
                       size="small" style="width: 100%">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in oilmen" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="9" style="width: 480px;">
            <el-row :gutter="6" style="width: 480px;">
              <el-col :span="4" style="width: 90px;">
                <el-input value="班次日期" size="small"></el-input>
              </el-col>
              <el-col :span="19">
                <el-date-picker size="small" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="querydate" style="width: 100%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="float:left; padding-left: 27px; padding-right: 27px;" size="small" @click="handleDataSearch">查询</el-button>
            <el-button style="float:left; padding-left: 27px; padding-right: 27px;" size="small" @click="handleAllReset">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
      <div class="search-btn-group">
        <div class="search-btn-group-total">
          <p class="search-btn-group-total-num">{{totalNums}}单</p>
          <span class="search-btn-group-total-label">核账单数</span>
        </div>
        &ensp;
        <div class="search-btn-group-total">
          <p class="search-btn-group-total-num">{{formatNumber(totalMoney)}}元</p>
          <span class="search-btn-group-total-label">应收款总额</span>
        </div>
        &ensp;
        <div class="search-btn-group-total">
          <p class="search-btn-group-total-num">{{formatNumber(totalPayMoney)}}元</p>
          <span class="search-btn-group-total-label">实收款总额</span>
        </div>
        &ensp;
        <div class="search-btn-group-total">
          <p class="search-btn-group-total-num">{{formatNumber(totalGift)}}元</p>
          <span class="search-btn-group-total-label">优惠总额</span>
        </div>
      </div>
      <!--
      <el-row class="static">
        <el-button style="float:right; margin-bottom: 10px;" size="small">导出数据</el-button>
      </el-row>
      -->
      <device-bill-table ref="table_panal"></device-bill-table>
    </el-card>
  </div>
</template>

<script>
  import {ExpenseOrderService} from '@/service/trade/expense/ExpenseOrderService.js';
  import deviceBillTable from "./components/DeviceBillTable";
  import * as formatter from "@/utils/formatter";
  import SearchContainer from "@/components/SearchContainer";
  import SearchContainerItem from "@/components/SearchContainerItem";

  const getDefaultQueryParams = () => ({
    orgEmployeeId: null,
    expenseDateStart: null,
    expenseDateEnd: null
  });

  export default {
    name: "Device",
    components: {
      deviceBillTable,
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        totalNums: 0,
        totalMoney: 0,
        totalPayMoney: 0,
        totalGift: 0,
        querydate: [],
        expenseOrderService: null,
        queryParams: getDefaultQueryParams(),
        oilmen: [],
        search: "",
        input: "",
        date: "",
      };
    },
    mounted() {
      this.expenseOrderService = new ExpenseOrderService();
      this.findAllTypeListForExpense();
      this.searchCardData() // 查询卡片 默认条件下的值
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      findAllTypeListForExpense() {
        this.expenseOrderService.findAllTypeListForExpense().then(response => {
          this.oilmen = response.oilmen;
        });
      },
      handleDataSearch() {
        if (undefined != this.querydate && this.querydate.length > 0) {
          this.queryParams.expenseDateStart = this.querydate[0];
          this.queryParams.expenseDateEnd = this.querydate[1];
        }
        if (this.querydate === null) {
          this.queryParams.expenseDateStart = undefined;
          this.queryParams.expenseDateEnd = undefined;
        }
        // 查询统计
        this.searchCardData();

        //查询列表
        this.$refs.table_panal.getDataList(this.queryParams)
      },
      handleAllReset() {
        this.queryParams = getDefaultQueryParams();
        this.querydate = [];
        this.handleDataSearch();
        this.$refs.table_panal.getDataList(this.queryParams)
      },
      // 卡片统计查询
      searchCardData() {
        this.expenseOrderService.searchDeviceCardData(this.queryParams).then(response => {
          this.totalNums = response.totalNums;
          this.totalMoney = response.totalMoney;
          this.totalPayMoney = response.totalPayMoney;
          this.totalGift = response.totalGift;
        });
      }
    }
  };
</script>

<style lang="scss">
  .search-btn-group-container {
    transition: all 0.8s ease;
    opacity: 0;
    width: 0;
  }

  .group-active {
    transition: all 1s ease;
    opacity: 1;
    width: initial;
  }

  .search-btn-group {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    text-align: center;
    margin: 10px 0 5px;
    height: 54px;
  }

  .search-btn-group-total {
    padding: 9px 16px;
    background-color: #409eff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -moz-box-orient: vertical;
    -moz-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;

    .search-btn-group-total-num {
      color: #ffffff;
      margin: 1px;
      font-weight: 700;
      font-size: 12px;
    }

    .search-btn-group-total-label {
      color: #ffffff;
      margin: 1px;
      font-size: 12px;
    }
  }

  .search-btn-group-con {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: 16px;
    -webkit-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);

    .search-btn-group-con-title {
      padding: 9px 16px;
      color: #161616;
      background-color: #eef1f6;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      align-items: middle;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -moz-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -moz-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      cursor: pointer;
      max-width: 100px;
      position: relative;
    }

    .search-btn-group-type {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      overflow: hidden;
      max-width: 800px;

      .search-btn-group-type-block {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -moz-box-orient: vertical;
        -moz-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 9px 16px;
        background-color: #ffffff;
        border: 1px solid #eef1f6;
        cursor: pointer;
        -webkit-box-flex: 0;
        -webkit-flex: 0 0 auto;
        -moz-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;

        .search-btn-group-type-num {
          color: #409eff;
          margin: 1px;
          font-weight: 700;
          font-size: 12px;
        }

        .search-btn-group-type-label {
          margin: 1px;
          font-size: 12px;
          color: #161616;
        }
      }
    }
  }
</style>
<style lang="scss"  scoped>
  @import "~@/assets/style/searchBtnGroup.scss";
</style>
