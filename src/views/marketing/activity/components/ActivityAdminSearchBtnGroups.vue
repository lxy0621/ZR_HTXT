<template>
  <div>
    <div class="search-btn-group" v-loading="loading">
      <div class="search-btn-group-total" @click="handleSearchTotal" v-bind:class="{'onActiv':totalActive}">
        <p class="search-btn-group-total-num">{{ total }}</p>
        <span class="search-btn-group-total-label">查询结果</span>
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
            <div v-for="(searchTypeItem, key) in searchBtnItem.children" :key="key" class="search-btn-group-type-block"
                 @click="handleSearch(searchTypeItem,index,key)"
                 v-bind:class="{'onActiv':index==onActive[0]&&onActive[1]==key}">
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
import {ActivityAdminService} from "@/service/marketing/activity/ActivityAdminService";

export default {
  name: "ActivityAdminSearchBtnGroups",
  data() {
    return {
      loading: false,
      searchBtnShow: true,
      active: 0,
      queryParams: {
        page: 1,
        limit: 30,
      },
      service: null,
      total: 0,
      searchBtnData: [
        {
          name: "活动状态",
          children: [
            {
              childName: "待开始",
              childNum: 0,
              flag: "state1"
            },
            {
              childName: "进行中",
              childNum: 0,
              flag: "state2"
            },
            {
              childName: "已关闭",
              childNum: 0,
              flag: "state4"
            },
            {
              childName: "已过期",
              childNum: 0,
              flag: "state3"
            },
          ]
        },
        {
          name: "活动类型",
          children: [
            {
              childName: "充值返现",
              childNum: 0,
              flag: "RECHARGE_CASH",
            },
            {
              childName: "充值返券",
              childNum: 0,
              flag: "RECHARGE_COUPON",
            },
            {
              childName: "消费返现",
              childNum: 0,
              flag: "CONSUME_CASH",
            },
            {
              childName: "消费返券",
              childNum: 0,
              flag: "CONSUME_COUPON",
            },
            {
              childName: "新人红包",
              childNum: 0,
              flag: "REFRESHMAN_REDPACKET",
            },
            {
              childName: "新人送券",
              childNum: 0,
              flag: "REFRESHMAN_COUPON",
            },
          ]
        },
        {
          name: '活动时间',
          children: [
            {
              childName: "时间段",
              childNum: 0,
              flag: "DATE_ARES",
            },
            {
              childName: "会员日",
              childNum: 0,
              flag: "MEMBER_DAY",
            },
          ]
        }
      ],
      onActive: [null, null],
      totalActive: true,
    };
  },
  mounted() {
    this.service = new ActivityAdminService();
    this.findActivityGroups(this.queryParams);
  },
  methods: {
    toggleContainer(index) {
      this.active = index;
    },
    findActivityGroups(queryParams) {
      this.loading = true;
      this.queryParams = queryParams;
      this.service.findActivityGroups(queryParams).then(response => {
        debugger
        this.total = response.data.total; //查询结果
        // 活动状态
        this.searchBtnData[0].children[0].childNum = response.data.activityState.TO_BEGIN === undefined ? 0 : response.data.activityState.TO_BEGIN;
        this.searchBtnData[0].children[1].childNum = response.data.activityState.ONGOING === undefined ? 0 : response.data.activityState.ONGOING;
        this.searchBtnData[0].children[2].childNum = response.data.activityState.CLOSED === undefined ? 0 : response.data.activityState.CLOSED;
        this.searchBtnData[0].children[3].childNum = response.data.activityState.EXPIRED === undefined ? 0 : response.data.activityState.EXPIRED;
        // 活动类型
        this.searchBtnData[1].children[0].childNum = response.data.activityMetaCode.RECHARGE_CASH === undefined ? 0 : response.data.activityMetaCode.RECHARGE_CASH;
        this.searchBtnData[1].children[1].childNum = response.data.activityMetaCode.RECHARGE_COUPON === undefined ? 0 : response.data.activityMetaCode.RECHARGE_COUPON;
        this.searchBtnData[1].children[2].childNum = response.data.activityMetaCode.CONSUME_CASH === undefined ? 0 : response.data.activityMetaCode.CONSUME_CASH;
        this.searchBtnData[1].children[3].childNum = response.data.activityMetaCode.CONSUME_COUPON === undefined ? 0 : response.data.activityMetaCode.CONSUME_COUPON;
        this.searchBtnData[1].children[4].childNum = response.data.activityMetaCode.REFRESHMAN_REDPACKET === undefined ? 0 : response.data.activityMetaCode.REFRESHMAN_REDPACKET;
        this.searchBtnData[1].children[5].childNum = response.data.activityMetaCode.REFRESHMAN_COUPON === undefined ? 0 : response.data.activityMetaCode.REFRESHMAN_COUPON;
        // 活动时间
        this.searchBtnData[2].children[0].childNum = response.data.dateRangeType.DATE_ARES === undefined ? 0 : response.data.dateRangeType.DATE_ARES;
        this.searchBtnData[2].children[1].childNum = response.data.dateRangeType.MEMBER_DAY === undefined ? 0 : response.data.dateRangeType.MEMBER_DAY;

        this.loading = false;
      });
    },
    handleSearchTotal() {
      this.totalActive = true;
      this.onActive = [null, null];
      delete this.queryParams.stateCard;
      delete this.queryParams.metaCodeCard;
      delete this.queryParams.dateRangeTypeCard;
      this.$emit("search", this.queryParams);
    },
    handleSearch(obj, pindex, cindex) {
      this.totalActive = false;
      this.onActive = [pindex, cindex];
      delete this.queryParams.stateCard;
      delete this.queryParams.metaCodeCard;
      delete this.queryParams.dateRangeTypeCard;
      switch (obj.flag) {
        case "state1":
          this.queryParams.stateCard = 1;
          break;
        case "state2":
          this.queryParams.stateCard = 2;
          break;
        case "state3":
          this.queryParams.stateCard = 3;
          break;
        case "state4":
          this.queryParams.stateCard = 4;
          break;
        case "RECHARGE_CASH":
          this.queryParams.metaCodeCard = 'RECHARGE_CASH';
          break;
        case "RECHARGE_COUPON":
          this.queryParams.metaCodeCard = 'RECHARGE_COUPON';
          break;
        case "CONSUME_CASH":
          this.queryParams.metaCodeCard = 'CONSUME_CASH';
          break;
        case "CONSUME_COUPON":
          this.queryParams.metaCodeCard = 'CONSUME_COUPON';
          break;
        case "REFRESHMAN_REDPACKET":
          this.queryParams.metaCodeCard = 'REFRESHMAN_REDPACKET';
          break;
        case "REFRESHMAN_COUPON":
          this.queryParams.metaCodeCard = 'REFRESHMAN_COUPON';
          break;
        case "DATE_ARES":
          this.queryParams.dateRangeTypeCard = 1;
          break;
        case "MEMBER_DAY":
          this.queryParams.dateRangeTypeCard = 3;
          break;
      }
      this.$emit("search", this.queryParams);
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
  height: 54px;
}

.search-btn-group-total {
  padding: 9px 16px;
  background-color: #fff;
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
