<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.redPacketName" placeholder="红包名" size="small" />
    </search-container-item>
    <search-container-item>
      <el-input v-model="queryParams.batchName" placeholder="红包批次名" size="small" />
    </search-container-item>
    <search-container-item>
      <el-input v-model="queryParams.batchNo" placeholder="红包批次号" size="small" />
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.rpBatchStates"
        placeholder="红包状态"
        multiple
        size="small"
        style="width:100%;"
      >
        <el-option
          v-for="item in activityState"
          :key="item.state_value"
          :label="item.state_name"
          :value="item.state_value"
        ></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-date-picker
        v-model="dateRange"
        size="small"
        type="daterange"
        range-separator="至"
        start-placeholder="初始创建日期"
        end-placeholder="最后创建日期"
        style="width:100%;"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </search-container-item>
  </search-container>
</template>

<script>
import SearchContainer from "@/components/SearchContainer";
import searchContainerItem from "@/components/SearchContainerItem.vue";
import { RedPacketAdminService } from "@/service/marketing/tools/RedPacketAdminService";
export default {
  name: "PacketAdminSearch",
  components: {
    SearchContainer,
    searchContainerItem
  },
  data() {
    return {
      RedPacketAdminService: null,
      queryParams: {
        page: 1,
        limit: 30
      },
      activityState: [],
      dateRange: []
    };
  },
  mounted() {
    this.redPacketAdminService = new RedPacketAdminService();
    this.initSelectData();
  },
  methods: {
    initSelectData() {
      this.redPacketAdminService.getRpBatchQueryState().then(response => {
        this.activityState = response.data.batchStates;
      });
    },
    handleDataSearch() {
      if (undefined != this.dateRange && this.dateRange.length > 0) {
        this.queryParams.dateFrom = this.dateRange[0].slice(0, 10);
        this.queryParams.dateTo = this.dateRange[1].slice(0, 10);
      }
      if (null === this.dateRange) {
        this.queryParams.dateFrom = undefined;
        this.queryParams.dateTo = undefined;
      }
      const queryParams = Object.assign({}, this.queryParams);
      this.$emit("search", queryParams);
    },
    handleAllReset() {
      this.queryParams = {};
      this.dateRange = [];
      this.$emit("reset", this.queryParams);
      this.handleDataSearch();
    }
  }
};
</script>
