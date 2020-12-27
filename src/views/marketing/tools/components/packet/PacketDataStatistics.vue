<template>
  <div>
    <div class="title">红包信息</div>
    <el-row>
      <el-col :span="5">
        <span class="item-label">红包名称：</span>
        <span class="item-content">{{ messageData.redPacketName }}</span>
      </el-col>
      <el-col :span="5">
        <span class="item-label">红包状态：</span>
        <span class="item-content">{{ messageData.batchStateDisplay }}</span>
      </el-col>
    </el-row>
    <br />
    <el-divider></el-divider>
    <br />
    <div class="title">统计信息</div>
    <div class="Statistics">
      <div class="kid">
        <div class="border">
          <span class="mesTitle">红包总量</span>
          <div
            class="mesContent"
            style="color: #409EFF;"
          >{{ this.messageData.totalCount === undefined ? '--' : this.messageData.totalCount }}</div>
        </div>
      </div>
      <div class="kid">
        <div class="border">
          <span class="mesTitle">红包发放总量</span>
          <div
            class="mesContent"
            style="color: #409EFF;"
          >{{ this.messageData.grantCount === undefined ? '--' : this.messageData.grantCount }}</div>
        </div>
      </div>
      <div class="kid">
        <div class="border">
          <span class="mesTitle">红包剩余总量</span>
          <div
            class="mesContent"
            style="color: #409EFF;"
          >{{ this.messageData.grantCount === undefined ? '--' : this.messageData.totalCount-this.messageData.grantCount }}</div>
        </div>
      </div>
      <div class="kid">
        <div class="border">
          <span class="mesTitle">红包领取总数</span>
          <div
            class="mesContent"
            style="color: #F56C6C;"
          >{{ this.messageData.usedCount === undefined ? '--' : this.messageData.usedCount }}</div>
        </div>
      </div>
      <div class="kid">
        <div class="border">
          <span class="mesTitle">领取总金额</span>
          <div
            class="mesContent"
            style="color: #F56C6C;"
          >{{ this.messageData.usedMoney === undefined ? '--' : formatNumber(this.messageData.usedMoney) }}</div>
        </div>
      </div>
      <div class="kid">
        <div class="border">
          <span class="mesTitle">红包总金额</span>
          <div
            class="mesContent"
            style="color: #67C23A;"
          >{{ this.messageData.totalMoney === undefined ? '--' : formatNumber(this.messageData.totalMoney) }}</div>
        </div>
      </div>
      <div class="kid">
        <div class="border">
          <span class="mesTitle">红包发放总金额</span>
          <div
            class="mesContent"
            style="color: #67C23A;"
          >{{ this.messageData.grantMoney === undefined ? '--' : formatNumber(this.messageData.grantMoney) }}</div>
        </div>
      </div>
      <div class="kid">
        <div class="border">
          <span class="mesTitle">红包剩余金额</span>
          <div
            class="mesContent"
            style="color: #67C23A;"
          >{{ this.messageData.grantMoney === undefined ? '--' : formatNumber(this.messageData.totalMoney-this.messageData.grantMoney) }}</div>
        </div>
      </div>
    </div>
    <br />
    <el-divider></el-divider>
    <packet-vchart></packet-vchart>
  </div>
</template>

<script>
import PacketVchart from "./PacketVchart";
import { RedPacketAdminService } from "@/service/marketing/tools/RedPacketAdminService";
import * as formatter from "@/utils/formatter";
export default {
  name: "PacketDataStatistics",
  components: {
    PacketVchart
  },
  data() {
    return {
      params: {
        batchId: undefined
      },
      messageData: {}
    };
  },
  mounted() {
    if (this.$route.query.data !== undefined) {
      this.params.batchId = this.$route.query.data.id;        
    }
    this.redPacketAdminService = new RedPacketAdminService();
    this.getPacketData(this.params);
  },
  methods: {
    formatNumber(num) {
      return formatter.formatNumber(num);
    },
    getPacketData(params) {
      this.redPacketAdminService.rpBatchStats(params).then(response => {
        this.messageData = response;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.vchart {
  margin-top: 60px;
}

.card {
  vertical-align: middle;
  height: 100%;
  margin: 10px;
}

.title {
  flex: auto;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5715;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 20px;
}

.item-label {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 400;
  font-size: 12pt;
  line-height: 1.5715;
  text-align: start;
}

.item-content {
  flex: 1 1;
  color: rgba(0, 0, 0, 0.85);
  font-size: 12pt;
  line-height: 1.5715;
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