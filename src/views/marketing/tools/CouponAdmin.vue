<template>
  <div>
    <el-card>
      <coupon-admin-search
        @search="searchMarketCollectRecordList"
        @reset="resetAllParamsAndData"
        ref="search_panel"
      />
      <coupon-admin-search-btn-groups @search="searchMarketCollectRecordListFromGroups" ref="search_btn"></coupon-admin-search-btn-groups>
      <div class="opration-btn">
        <div>
          <button
            type="button"
            v-waves
            class="el-button el-button--primary el-button--small"
            @click="handleCouponAdd()"
          >新建优惠券
          </button>
        </div>
        <div>
          <button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportData">导出数据</button>
        </div>
      </div>
      <coupon-admin-table ref="table" @refreshCouponGroups="refreshCouponGroups"></coupon-admin-table>
    </el-card>
  </div>
</template>

<script>
  import CouponAdminSearch from "./components/coupon/CouponAdminSearch";
  import CouponAdminTable from "./components/coupon/CouponAdminTable";
  import CouponAdminSearchBtnGroups from "./components/coupon/CouponAdminSearchBtnGroups";

  export default {
    name: "CouponAdmin",
    components: {
      CouponAdminSearch,
      CouponAdminTable,
      CouponAdminSearchBtnGroups,
    },
    data() {
      return {
        queryParams: {},
        multipleSelection: [],
      };
    },
    methods: {
      searchMarketCollectRecordList(queryParams) {
        this.queryParams = queryParams;

        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findCouponGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      searchMarketCollectRecordListFromGroups(queryParams) {
        this.queryParams = queryParams;
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findCouponGroups(queryParams);
        this.$refs.table.getList(queryParams);
      },
      handleCouponAdd() {
        this.$router.push({
          path: "/marketing/tools/CouponAdd",
        });
      },
      exportData() {
        this.$refs.table.exportData(this.queryParams);
      },
      refreshCouponGroups(queryParam) {
        delete this.queryParams.groupCouponBatchState;
        this.$refs.search_btn.onActive = [null, null];
        this.$refs.search_btn.totalActive = true;
        this.$refs.search_btn.findCouponGroups(queryParam);
      }
    }
  }
</script>

<style scoped>
  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
