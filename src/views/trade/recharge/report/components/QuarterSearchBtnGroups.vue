<template>
  <div>
    <div class="search-btn-group" v-loading="loading">
      <div class="search-btn-group-total">
        <p class="search-btn-group-total-num">{{totalnums}}</p>
        <span class="search-btn-group-total-label">总单数</span>
      </div>
      &emsp;
      <div class="search-btn-group-total">
        <p class="search-btn-group-total-num">{{formatNumber(totalmoney)}}元</p>
        <span class="search-btn-group-total-label">充值总金额</span>
      </div>
      &emsp;
      <div class="search-btn-group-total">
        <p class="search-btn-group-total-num">{{formatNumber(totalgift)}}元</p>
        <span class="search-btn-group-total-label">赠送总金额</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {RechargeOrderService} from '@/service/trade/recharge/RechargeOrderService';
  import * as formatter from "@/utils/formatter";

  export default {
    name: "QuarterSearchBtnGroups",
    data() {
      return {
        loading:false,
        rechargeOrderService: null,
        searchBtnShow: true,
        active: 0,
        totalmoney:0,
        totalnums:0,
        totalgift:0,
        queryParams:{
          stations: null, // 油站
          moneyType: null, // 金额类型

          rechargeDateStart: null,
          rechargeDateEnd: null,
          rechargeDateSta: '',
          rechargeDateEn: '',
          minChargeMoney: null,
          maxChargeMoney: null
        }
      };
    },
    mounted() {
      this.rechargeOrderService = new RechargeOrderService();
      // 初始化查询
      this.initsearchBtnData(this.queryParams);
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      toggleContainer(index) {
        this.active = index;
      },
      // 查询按钮上的统计数据
      initsearchBtnData(queryParams){
        this.loading = true;
        this.rechargeOrderService.searchQuarterBtnData(queryParams).then(response => {
          this.loading = false;
          this.totalnums = response.totalnums;
          this.totalmoney = response.totalmoney;
          this.totalgift = response.totalgift;
        })
      },
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

<style lang="scss" scoped>
@import "~@/assets/style/searchBtnGroup.scss";
</style>
