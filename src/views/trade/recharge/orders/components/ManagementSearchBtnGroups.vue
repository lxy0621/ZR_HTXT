<template>
  <div>
    <div class="search-btn-group" v-loading="loading">
      <div class="search-btn-group-total" @click="totalCountClick" v-bind:class="{'onActiv':totalActive}">
        <p class="search-btn-group-total-num">{{ formatNumber(totalmoney) }}元</p>
        <p class="search-btn-group-total-num">{{ totalnums }}单</p>
        <span class="search-btn-group-total-label">充值订单</span>
      </div>
      <div v-for="(searchBtnItem, index) in searchBtnData" :key="index" class="search-btn-group-con">
        <div class="search-btn-group-con-title" @click="toggleContainer(index)" style=";transition: all 0.8s ease;">
          <em v-show="index == onActive[0]"></em>
          <span>{{searchBtnItem.name}}</span>
          <span v-if="index==active?false:true">
            <i style="padding-top:2px;" class="el-icon-arrow-right"></i>
            <!-- {{index}} -->
          </span>
        </div>
        <div class="search-btn-group-container" :class="index == active ? 'group-active' : ''">
          <div class="search-btn-group-type">
            <div v-for="(searchTypeItem, key) in searchBtnItem.children" :key="key" class="search-btn-group-type-block"
                 @click="handleSearch(searchBtnItem.flag,searchTypeItem,index,key)"
                 v-bind:class="{'onActiv':index==onActive[0]&&onActive[1]==key}">
              <p class="search-btn-group-type-num">{{formatNumber(searchTypeItem.childmoney)}}元</p>
              <p class="search-btn-group-type-num">{{searchTypeItem.childnum}}单</p>
              <span class="search-btn-group-type-label">{{searchTypeItem.childname}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {RechargeOrderService} from "@/service/trade/recharge/RechargeOrderService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "ManagementSearchBtnGroups",
    data() {
      return {
        loading: false,
        rechargeOrderService: null,
        searchBtnShow: true,
        active: 0,
        totalmoney: 0,
        totalnums: 0,
        searchBtnData: [],
        queryParams: {
          memberKey: "",
          orderType: null,
          rechargeDateStart: "",
          rechargeDateEnd: "",
          rechargeType: null,
          rechargePosition: null,
          minChargeMoney: null,
          maxChargeMoney: null,
          payState: null,
          orderState: null,
          refundState: null,

          orderType1: null,
          isCounton: null,
          rechargeType1: null
        },
        onActive: [null, null],
        totalActive: true,
      };
    },
    mounted() {
      // zlw ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.dateNo) {
        this.queryParams.rechargeDateStart = this.$route.query.dateNo;
        this.queryParams.rechargeDateEnd = this.$route.query.dateNo;
      }
      // caiyu ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.memberId) {
        this.queryParams.memberId = this.$route.query.memberId;
      }
      this.rechargeOrderService = new RechargeOrderService();
      // 初始化默认支付状态为"已完成",订单状态为"已完成"
      this.queryParams.payState = '2'; // 支付状态
      this.queryParams.orderState = '2'; // 订单状态
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
      initsearchBtnData(queryParams) {
        this.loading = true;
        this.rechargeOrderService.searchBtnData(queryParams).then(response => {
          this.loading = false;
          this.totalnums = response.totalnums;
          this.totalmoney = response.totalmoney;
          this.searchBtnData = response.itemList;
        });
      },
      // 点击查询
      handleSearch(flag, item, pindex, cindex) {
        this.totalActive = false;
        this.onActive = [pindex, cindex];
        if (flag == "orderType") {
          if (null == item || undefined == item) {
            this.queryParams.orderType1 = null;
          } else {
            this.queryParams.orderType1 = item.value;
            this.queryParams.isCounton = null;
            this.queryParams.rechargeType1 = null;
          }
        } else if (flag == "isCounton") {
          if (null == item || undefined == item) {
            this.queryParams.isCounton = null;
          } else {
            this.queryParams.isCounton = item.value;
            this.queryParams.rechargeType1 = null;
            this.queryParams.orderType1 = null;
          }
        } else if (flag == "rechargeType") {
          if (null == item || undefined == item) {
            this.queryParams.rechargeType1 = null;
          } else {
            this.queryParams.rechargeType1 = item.value;
            this.queryParams.orderType1 = null;
            this.queryParams.isCounton = null;
          }
        }
        // 去查询数据
        this.$emit("search", [this.queryParams, "group"]);
      },
      totalCountClick() {
        this.totalActive = true;
        this.onActive = [null, null];
        this.queryParams.isCounton = undefined;
        this.queryParams.rechargeType1 = undefined;
        this.queryParams.orderType1 = undefined;
        this.$emit('search', [this.queryParams, 'group']);
      }
    }
  };
</script>
<style lang="scss" scoped>
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
    height: 74px;
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

  @import "~@/assets/style/searchBtnGroup.scss";
</style>
