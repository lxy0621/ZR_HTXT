<template>
  <div>
    <el-card class="card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="数据统计" name="first">
          <coupon-data-message></coupon-data-message>
        </el-tab-pane>
        <el-tab-pane label="明细列表" name="second">
          <coupon-data-search @search="searchCouponData" @reset="resetAllParamsAndData" ref="search_panel"></coupon-data-search>
          <coupon-data-table ref="table"></coupon-data-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import CouponDataTable from "./components/coupon/CouponDataTable";
import CouponDataSearch from "./components/coupon/CouponDataSearch";
import CouponDataMessage from "./components/coupon/CouponDataMessage";

export default {
  name: "CouponData",
  components: {
    CouponDataTable,
    CouponDataSearch,
    CouponDataMessage,
  },
  data() {
    return {
      activeName: "first",
      couponBatchId: undefined,
      queryParams: {}
    };
  },
  mounted() {
    if (this.$route.query.data !== undefined) {
      this.couponBatchId = this.$route.query.data.id;
    }
  },
  methods: {
    searchCouponData(queryParams) {
      this.$refs.table.getList(queryParams);
    },
    resetAllParamsAndData() {
      this.queryParams = {};
      this.$emit("reset", this.queryParams);
    },
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
