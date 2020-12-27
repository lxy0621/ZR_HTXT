<template>
  <div>
    <el-card class="card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据统计" name="first">
          <!-- 充值返现 -->
          <recharge-cash-back-message v-if="this.activityType == 'RECHARGE_CASH'"></recharge-cash-back-message>
          <!-- 充值返券 -->
          <recharge-coupon-back-message v-if="this.activityType == 'RECHARGE_COUPON'"></recharge-coupon-back-message>
          <!-- 消费返券 -->
          <consume-coupon-back-message v-if="this.activityType == 'CONSUME_COUPON'"></consume-coupon-back-message>
          <!-- 消费返现 -->
          <consume-cash-back-message v-if="this.activityType == 'CONSUME_CASH'"></consume-cash-back-message>
          <!-- 新人红包 -->
          <refresh-man-red-packet-message v-if="this.activityType == 'REFRESHMAN_REDPACKET'"></refresh-man-red-packet-message>
          <!-- 新人礼券 -->
          <refresh-man-coupon-message v-if="this.activityType == 'REFRESHMAN_COUPON'"></refresh-man-coupon-message>
        </el-tab-pane>
        <el-tab-pane label="明细列表" name="second">
          <!-- 充值返现 -->
          <recharge-cash-back-search
            @search="searchRechargeCashBackData"
            @reset="resetRechargeCashBackData"
            v-if="this.activityType == 'RECHARGE_CASH'"
            ref="search_panel"
          ></recharge-cash-back-search>
          <recharge-cash-back-table ref="CFXtable" v-if="this.activityType == 'RECHARGE_CASH'"></recharge-cash-back-table>
          <!-- 充值返券 -->
          <recharge-coupon-back-search
            @search="searchRechargeCouponBackData"
            @reset="resetRechargeCouponBackData"
            v-if="this.activityType == 'RECHARGE_COUPON'"
            ref="search_panel"
          ></recharge-coupon-back-search>
          <recharge-coupon-back-table ref="CFQtable" v-if="this.activityType == 'RECHARGE_COUPON'"></recharge-coupon-back-table>
          <!-- 消费返券 -->
          <consume-coupon-back-search
            @search="searchConsumeCouponBackData"
            @reset="resetConsumeCouponBackData"
            v-if="this.activityType == 'CONSUME_COUPON'"
            ref="search_panel"
          ></consume-coupon-back-search>
          <consume-coupon-back-table ref="XFQtable" v-if="this.activityType == 'CONSUME_COUPON'"></consume-coupon-back-table>
          <!-- 消费返现 -->
          <consume-cash-back-search
            @search="searchConsumeCashBackData"
            @reset="resetConsumeCashBackData"
            v-if="this.activityType == 'CONSUME_CASH'"
            ref="search_panel"
          ></consume-cash-back-search>
          <consume-cash-back-table ref="XFXtable" v-if="this.activityType == 'CONSUME_CASH'"></consume-cash-back-table>
          <!-- 新人红包 -->
          <refresh-man-red-packet-search
            @search="searchRefreshManRedPacketData"
            @reset="resetRefreshManRedPacketData"
            v-if="this.activityType == 'REFRESHMAN_REDPACKET'"
            ref="search_panel"
          ></refresh-man-red-packet-search>
          <refresh-man-red-packet-table ref="XHBtable" v-if="this.activityType == 'REFRESHMAN_REDPACKET'"></refresh-man-red-packet-table>
          <!-- 新人礼券 -->
          <refresh-man-coupon-search
            @search="searchRefreshManCouponData"
            @reset="resetRefreshManRedCouponData"
            v-if="this.activityType == 'REFRESHMAN_COUPON'"
            ref="search_panel"
          ></refresh-man-coupon-search>
          <refresh-man-coupon-table ref="XLQtable" v-if="this.activityType == 'REFRESHMAN_COUPON'"></refresh-man-coupon-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
//充值返现
import RechargeCashBackTable from "./components/RechargeCashBack/RechargeCashBackTable";
import RechargeCashBackSearch from "./components/RechargeCashBack/RechargeCashBackSearch";
import RechargeCashBackMessage from "./components/RechargeCashBack/RechargeCashBackMessage";
//充值返券
import RechargeCouponBackTable from "./components/RechargeCouponBack/RechargeCouponBackTable";
import RechargeCouponBackSearch from "./components/RechargeCouponBack/RechargeCouponBackSearch";
import RechargeCouponBackMessage from "./components/RechargeCouponBack/RechargeCouponBackMessage";
//消费返券
import ConsumeCouponBackMessage from "./components/ConsumeCouponBack/ConsumeCouponBackMessage";
import ConsumeCouponBackTable from "./components/ConsumeCouponBack/ConsumeCouponBackTable";
import ConsumeCouponBackSearch from "./components/ConsumeCouponBack/ConsumeCouponBackSearch";
//消费返现
import ConsumeCashBackMessage from "./components/ConsumeCashBack/ConsumeCashBackMessage";
import ConsumeCashBackSearch from "./components/ConsumeCashBack/ConsumeCashBackSearch";
import ConsumeCashBackTable from "./components/ConsumeCashBack/ConsumeCashBackTable";
//新人红包
import RefreshManRedPacketMessage from "./components/RefreshManRedPacket/RefreshManRedPacketMessage";
import RefreshManRedPacketSearch from "./components/RefreshManRedPacket/RefreshManRedPacketSearch";
import RefreshManRedPacketTable from "./components/RefreshManRedPacket/RefreshManRedPacketTable";
//新人礼券
import RefreshManCouponMessage from "./components/RefreshManCoupon/RefreshManCouponMessage";
import RefreshManCouponSearch from "./components/RefreshManCoupon/RefreshManCouponSearch";
import RefreshManCouponTable from "./components/RefreshManCoupon/RefreshManCouponTable";
export default {
  name: "ActivityData",
  components: {
    //充值返现
    RechargeCashBackTable,
    RechargeCashBackSearch,
    RechargeCashBackMessage,
    //充值返券
    RechargeCouponBackMessage,
    RechargeCouponBackSearch,
    RechargeCouponBackTable,
    //消费返券
    ConsumeCouponBackMessage,
    ConsumeCouponBackTable,
    ConsumeCouponBackSearch,
    //消费返现
    ConsumeCashBackMessage,
    ConsumeCashBackSearch,
    ConsumeCashBackTable,
    //新人红包
    RefreshManRedPacketMessage,
    RefreshManRedPacketSearch,
    RefreshManRedPacketTable,
    //新人礼券
    RefreshManCouponMessage,
    RefreshManCouponSearch,
    RefreshManCouponTable
  },
  data() {
    return {
      activeName: "first",
      activityId: undefined,
      activityType: undefined,
      queryParams: {}
    };
  },
  mounted() {
    if (this.$route.query !== undefined) {
      this.activityId = this.$route.query.id;
      this.activityType = this.$route.query.activityMetaCode;
    }
  },
  methods: {
    //充值返现
    searchRechargeCashBackData(queryParams) {
      this.$refs.CFXtable.loadRechargeCashBackData(queryParams);
    },
    resetRechargeCashBackData() {
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
    //充值返券
    searchRechargeCouponBackData(queryParams) {
      this.$refs.CFQtable.loadRechargeCouponBackData(queryParams);
    },
    resetRechargeCouponBackData() {
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
    //消费返券
    searchConsumeCouponBackData(queryParams) {
      this.$refs.XFQtable.loadConsumeCouponBackData(queryParams);
    },
    resetConsumeCouponBackData() {
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
    //消费返现
    searchConsumeCashBackData(queryParams) {
      this.$refs.XFXtable.loadConsumeCashBackData(queryParams);
    },
    resetConsumeCashBackData() {
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
    //新人红包
    searchRefreshManRedPacketData(queryParams){
      this.$refs.XHBtable.loadRefreshManRedPacketData(queryParams);
    },
    resetRefreshManRedPacketData(){
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
    //新人礼券
    searchRefreshManCouponData(queryParams){
      this.$refs.XLQtable.loadRefreshManCouponData(queryParams);
    },
    resetRefreshManRedCouponData(){
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
    handleClick(tab, event) {}
  }
};
</script>

<style scoped>
.card {
  vertical-align: middle;
  height: 100%;
  margin: 10px;
}
</style>