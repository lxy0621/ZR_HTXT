<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.nickname" placeholder="会员昵称" size="small" />
    </search-container-item>
    <search-container-item>
      <el-input v-model="queryParams.mobile" placeholder="手机号" size="small" />
    </search-container-item>
    <search-container-item>
      <el-select
        v-model="queryParams.usedStates"
        multiple
        placeholder="领取状态"
        size="small"
        style="width:100%;"
      >
        <el-option v-for="item in getState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-date-picker
        v-model="dateRange"
        size="small"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
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

export default {
  name: "PacketReciveSearch",
  components: {
    SearchContainer,
    searchContainerItem
  },
  data() {
    return {
      queryParams: {
        page: 1,
        limit: 30
      },
      getState: [],
      dateRange: []
    };
  },
  mounted() {
    if (this.$route.query.data !== undefined) {
      this.queryParams.batchId = parseInt(this.$route.query.data.id);
    }
    this.initSelectData();
  },
  methods: {
    initSelectData() {
      this.getState = [
        {
          key: "已领取",
          value: '1'
        },
        {
          key: "未领取",
          value: '0'
        }
      ];
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
      this.queryParams = {
        batchId: parseInt(this.$route.query.data.id)
      };
      this.dateRange = [];
      this.$emit("reset", this.queryParams);
      this.handleDataSearch();
    }
  }
};
</script>
