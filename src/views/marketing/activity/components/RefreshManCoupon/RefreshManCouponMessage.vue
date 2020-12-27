<template>
  <div>
    <div class="title">活动信息</div>
    <el-row>
      <el-col :span="4">
        <span class="item-label">活动类型：</span>
        <span class="item-content">新人礼券</span>
      </el-col>
      <el-col :span="5">
        <span class="item-label">活动名称：</span>
        <span
          class="item-content"
        >{{ this.activityData.name === undefined ? '' : this.activityData.activityMetaCodeDisplay}}</span>
      </el-col>
      <el-col :span="7">
        <span class="item-label">活动时间：</span>
        <span
          class="item-content"
        >{{ this.activityData.dateRangeTypeDisplay === undefined ? '' : this.activityData.dateRangeTypeDisplay }}</span>
      </el-col>
      <el-col :span="4">
        <span class="item-label">活动用户：</span>
        <span
          class="item-content"
        >{{ this.activityData.userScopeTypeDisplay === undefined ? '' : this.activityData.userScopeTypeDisplay }}</span>
      </el-col>
      <el-col :span="4">
        <span class="item-label">活动状态：</span>
        <span
          class="item-content"
        >{{ this.activityData.stateDisplay === undefined ? '' : this.activityData.stateDisplay }}</span>
      </el-col>
    </el-row>
    <br />
    <el-divider></el-divider>
    <br />
    <div class="title">统计信息</div>
    <div class="Statistics">
      <div class="kid">
        <div class="border">
          <span class="mesTitle">总参与用户数</span>
          <div
            class="mesContent"
            style="color: #409eff;"
          >{{ this.activityData.totalOrder === undefined ? '--' : this.activityData.totalOrder}}</div>
        </div>
      </div>
      <div class="kid">
        <div class="border">
          <span class="mesTitle">总优惠券金额</span>
          <div
            class="mesContent"
            style="color: #67C23A;"
          >{{ this.activityData.totalOutMoney === undefined ? '--' : formatNumber(this.activityData.totalOutMoney) }}</div>
        </div>
      </div>
    </div>
    <refresh-man-coupon-chart></refresh-man-coupon-chart>
  </div>
</template>

<script>
import { ActivityAdminService } from "@/service/marketing/activity/ActivityAdminService";
import * as formatter from "@/utils/formatter";
import RefreshManCouponChart from "./RefreshManCouponChart";
export default {
  name: "RefreshManCouponMessage",
  components: {
    RefreshManCouponChart
  },
  data() {
    return {
      activityAdminService: undefined,
      activityData: {
        activityMetaCodeDisplay: "",
        name: "",
        dateRangeTypeDisplay: "",
        userScopeTypeDisplay: "",
        stateDisplay: ""
      },
      postData: {
        id: undefined,
        activityMetaCode: undefined
      }
    };
  },
  mounted() {
    this.activityAdminService = new ActivityAdminService();
    if (this.$route.query !== undefined) {
      this.postData.id = this.$route.query.id;
      this.postData.activityMetaCode = this.$route.query.activityMetaCode;
      this.getActDataPageTop();
    }
  },
  methods: {
    formatNumber(num) {
      return formatter.formatNumber(num);
    },
    getActDataPageTop() {
      this.activityAdminService
        .getActDataPageTop(this.postData)
        .then(response => {
          this.activityData = response.data;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  flex: auto;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5715;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 20px;
}

.item-label {
  color: rgba(50, 50, 50, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  text-align: start;
}

.item-content {
  flex: 1 1;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  vertical-align: middle;
  line-height: 32px;
}

.Statistics {
  width: 100%;
  height: 50px;
  display: flex;
  padding: 24px;

  .kid {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .border {
      width: 100%;
      height: 100px;
      border-right: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .mesTitle {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;
      }

      .mesContent {
        color: rgba(0, 0, 0, 0.85);
        font-size: 24px;
        line-height: 32px;
      }
    }

    .noRight {
      border-right: none;
    }
  }
}

.special {
  font-weight: 600;
  color: #409eff;
}
</style>
