<template>
  <div>
    <div class="search-btn-group" v-loading="loading">
      <div class="search-btn-group-total">
        <p class="search-btn-group-total-num">{{totalNums}}单</p>
        <span class="search-btn-group-total-label">充值单数</span>
      </div>
      <div class="search-btn-group-total" style='margin-left: 10px;'>
        <p class="search-btn-group-total-num">{{formatNumber(totalMoney)}}元</p>
        <span class="search-btn-group-total-label">充值总金额</span>
      </div>
      <div class="search-btn-group-total" style='margin-left: 10px;'>
        <p class="search-btn-group-total-num">{{formatNumber(totalGift)}}元</p>
        <span class="search-btn-group-total-label">赠送总金额</span>
      </div>
      <div class="search-btn-group-total" style='margin-left: 10px;' v-for="(item,index) in totleType.children"
           :key="index">
        <p class="search-btn-group-total-num">{{formatNumber(item.childmoney)}}元</p>
        <span class="search-btn-group-total-label">{{item.childname}}充值总金额</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {RechargeOrderService} from '@/service/trade/recharge/RechargeOrderService';
  import * as formatter from "@/utils/formatter";

  export default {
    name: "SearchBtnGroup",
    data() {
      return {
        loading: false,
        active: 0,
        rechargeOrderService: null,
        orderTypes: [],
        totleType: {},
        totalNums: null,
        totalMoney: null,
        totalPayMoney: null,
        totalGift: null,
        queryParams: {
          orderType: null,
          minChargeMoney: null,
          maxChargeMoney: null,
          rechargeDateStart: null,
          rechargeDateEnd: null,
          orderType1: null
        },
        onActive: [null],
      };
    },
    mounted() {
      this.rechargeOrderService = new RechargeOrderService();
      this.searchCardData(this.queryParams);
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      toggleContainer(index) {
        this.active = index;
      },
      // 卡片统计查询
      searchCardData(queryParams) {
        this.loading = true;
        this.rechargeOrderService.searchDeviceCardData(queryParams).then(response => {
          this.loading = false;
          this.totalNums = response.totalnums;
          this.totalMoney = response.totalmoney;
          this.totleType = response.totleType;
          this.totalGift = response.totalgift;
        });
      },
      // 点击查询
      handleSearch(item, cindex) {
        if (null == item || undefined == item) {
          this.queryParams.orderType1 = null;
        } else {
          this.queryParams.orderType1 = item.value;
        }
        // 去查询数据
        this.$emit('search', [this.queryParams, 'group']);
      }
    }
  };
</script>

<style lang="scss" scoped>
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
    margin-right: 2px;
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

  @import "~@/assets/style/searchBtnGroup.scss";
</style>
