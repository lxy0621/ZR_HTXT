<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input
        v-model="queryParams.unionQuery"
        placeholder="搜索会员昵称/ID/姓名"
        size="small"
        style="width: 100%"
      ></el-input>
    </search-container-item>
    <search-container-item>
      <el-input v-model="queryParams.mobile" placeholder="手机号" size="small" style="width: 100%"></el-input>
    </search-container-item>
    <search-container-item>
      <el-date-picker
        size="small"
        value-format="yyyy-MM-dd"
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="初始充值日期"
        end-placeholder="最后充值日期"
        style="width: 100%"
      ></el-date-picker>
    </search-container-item>
  </search-container>
</template>

<script>
import SearchContainer from "@/components/SearchContainer";
import SearchContainerItem from "@/components/SearchContainerItem";

export default {
  name: "ConsumeCouponBackSearch",
  components: {
    SearchContainer,
    SearchContainerItem
  },
  data() {
    return {
      dateRange: [],
      queryParams: {
        page: 1,
        limit: 30
      }
    };
  },
  mounted() {
    if (this.$route.query !== undefined) {
      this.queryParams.id = parseInt(this.$route.query.id);
    }
  },
  methods: {
    handleDataSearch() {
      if (undefined != this.dateRange && this.dateRange.length > 0) {
        this.queryParams.startTime = this.dateRange[0] + ' 00:00:00';
        this.queryParams.endTime = this.dateRange[1] + ' 23:59:59';
      }
      if (null === this.dateRange) {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }
      const queryParams = Object.assign({}, this.queryParams);
      this.$emit("search", queryParams);
    },
    handleAllReset() {
      this.queryParams = {
        id: parseInt(this.$route.query.id)
      };
      this.dateRange = [];
      this.$emit("reset", this.queryParams);
      this.handleDataSearch();
    }
  }
};
</script>
<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 100%;
}
</style>
