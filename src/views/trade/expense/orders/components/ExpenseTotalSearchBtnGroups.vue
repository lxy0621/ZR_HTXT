<template>
  <div>
    <div class="search-btn-group" v-loading="loading">
      <div class="search-btn-group-total" @click="totalCountClick" v-bind:class="{'onActiv':totalActive}">
        <p class="search-btn-group-total-num">{{ formatNumber(sumMoney) }}元</p>
        <p class="search-btn-group-total-num">{{ allCount }}单</p>
        <span class="search-btn-group-total-label">消费订单</span>
      </div>
      <div v-for="(searchBtnItem, index) in searchBtnData" :key="index" class="search-btn-group-con">
        <div class="search-btn-group-con-title" @click="toggleContainer(index)" style=";transition: all 0.8s ease;">
          <em v-show="index == onActive[0]"></em>
          <span>{{ searchBtnItem.name }}</span>
          <span v-if="index == active ? false : true">
            <i style="padding-top:2px;" class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="search-btn-group-container" :class="index == active ? 'group-active' : ''">
          <div class="search-btn-group-type">
            <div v-for="(searchTypeItem, key) in searchBtnItem.children" :key="key" class="search-btn-group-type-block" style="height: 59px;"
                 @click="handleSearch(searchTypeItem, index, key)"
                 v-bind:class="{ onActiv: index == onActive[0] && onActive[1] == key }">
              <p class="search-btn-group-type-num">{{ searchTypeItem.childNum }}</p>
              <span class="search-btn-group-type-label">{{ searchTypeItem.childName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ExpenseOrderService} from '@/service/trade/expense/ExpenseOrderService.js';
  import * as formatter from "@/utils/formatter";

  export default {
    name: 'ExpenseTotalSearchBtnGroups',
    data() {
      return {
        loading: false,
        searchBtnShow: true,
        active: 0,
        queryParams: {},
        service: null,
        allCount: 0,
        sumMoney: 0,
        platScan: 0,
        codeScan: 0,
        phonePay: 0,
        searchBtnData: [
          {
            name: '支付方式',
            children: [
              {
                childName: '车牌扫码',
                childNum: 0,
                flag: 'platScan'
              },
              {
                childName: '扫码支付',
                childNum: 0,
                flag: 'codeScan'
              },
              {
                childName: '手机号支付',
                childNum: 0,
                flag: 'phonePay'
              }
            ]
          },
          {
            name: '发票状态',
            flag: 'invoiced',
            children: [
              {
                childName: '已开票',
                childNum: 0,
                flag: 'isOpen'
              },
              {
                childName: '未开票',
                childNum: 0,
                flag: 'noOpen'
              }
            ]
          }
        ],
        onActive: [null, null],
        totalActive: true,
      };
    },
    mounted() {
      // zlw ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.transTime) {
        this.queryParams.expenseDateStart = this.$route.query.transTime;
        this.queryParams.expenseDateEnd = this.$route.query.transTime;
        this.dateRange = [this.$route.query.transTime, this.$route.query.transTime];
      }
      if (undefined != this.$route.query.orgEmployeeId) {
        this.queryParams.orgEmployeeId = this.$route.query.orgEmployeeId;
      }
      if (undefined != this.$route.query.memberId) {
        this.queryParams.mbrMemberId = this.$route.query.memberId;
      }
      this.service = new ExpenseOrderService();
      this.expenseGroupsData(this.queryParams);
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      expenseGroupsData(queryParams) {
        this.queryParams = queryParams;
        this.loading = true;
        this.service.expenseGroupsData(queryParams).then(response => {
          this.allCount = response.data.indexTotal.allcount; //查询结果
          this.sumMoney = response.data.indexTotal.summoney; //消费总金额
          this.searchBtnData[0].children[0].childNum = response.data.payGroundTotal.platscan; //车牌扫码
          this.searchBtnData[0].children[1].childNum = response.data.payGroundTotal.codescan; //扫码支付
          this.searchBtnData[0].children[2].childNum = response.data.payGroundTotal.phonepay; //手机支付
          this.searchBtnData[1].children[0].childNum = response.data.invoicedTotal.isopen; //已开发票数量
          this.searchBtnData[1].children[1].childNum = response.data.invoicedTotal.noopen; //未开发票数量
          this.loading = false;
        });
      },
      toggleContainer(index) {
        this.active = index;
      },
      handleSearch(obj, pindex, cindex) {
        this.totalActive = false;
        this.onActive = [pindex, cindex];
        this.queryParams.choiceFlag = obj.flag;
        this.$emit('search', this.queryParams);
      },
      totalCountClick() {
        this.totalActive = true;
        this.onActive = [null, null];
        this.queryParams.payGround = undefined;
        this.queryParams.choiceFlag = undefined;
        this.$emit('search', this.queryParams);
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
</style>
<style lang="scss"  scoped>
  @import "~@/assets/style/searchBtnGroup.scss";
</style>
