<template>
  <div>
    <div class="search-btn-group" v-loading="loading">
      <div class="search-btn-group-total" @click="totalCountClick" v-bind:class="{'onActiv':totalActive}">
        <p class="search-btn-group-total-num">{{ formatNumber(totalmoney) }}元</p>
        <p class="search-btn-group-total-num">{{ totalnums }}单</p>
        <span class="search-btn-group-total-label">人工充值</span>
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
  import {RechargeApplyService} from "@/service/trade/recharge/RechargeApplyService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "ManualRechargeSearchBtnGroups",
    data() {
      return {
        loading: false,
        rechargeApplyService: null,
        searchBtnShow: true,
        active: 0,
        totalmoney: 0,
        totalnums: 0,
        searchBtnData: [],
        queryParams: {
          memberKey: "",
          applyStates: undefined,
          rechargeDateStart: "",
          rechargeDateEnd: "",
          minChargeMoney: null,
          maxChargeMoney: null,
          applyState: null,
          isCounton: null,
          page: 1,
          limit: 30,
        },
        onActive: [null, null],
        totalActive: true,
      };
    },
    mounted() {
      this.rechargeApplyService = new RechargeApplyService();
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
      initsearchBtnData(queryParams) {
        this.rechargeApplyService.searchBtnData(queryParams).then(response => {
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
        this.loading = true;
        if (flag == "applyState") {
          if (null == item || undefined == item) {
            this.queryParams.applyState = null;
          } else {
            this.queryParams.applyState = item.value;
            this.queryParams.isCounton = null;
          }
        } else if (flag == "isCounton") {
          if (null == item || undefined == item) {
            this.queryParams.isCounton = null;
          } else {
            this.queryParams.isCounton = item.value;
            this.queryParams.applyState = null;
          }
        }
        // 去查询数据
        this.loading = false;
        this.$emit("search", [this.queryParams, "group"]);
      },
      totalCountClick() {
        this.totalActive = true;
        this.onActive = [null, null];
        this.queryParams.isCounton = undefined;
        this.queryParams.applyState = undefined;
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
