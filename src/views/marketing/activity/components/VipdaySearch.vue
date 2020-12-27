<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.unionQuery" placeholder="会员日名称/ID" size="small" />
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.state" placeholder="状态" size="small" style="width:100%;">
        <el-option
          v-for="item in activityState"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        ></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.metaCode" placeholder="活动类型" size="small" style="width:100%;">
        <el-option
          v-for="item in activityType"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        ></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-select
            v-model="queryParams.activitySearchDateType"
            placeholder="时间类型"
            size="small"
            style="width:100%;"
          >
            <el-option
              v-for="item in activityDateType"
              :key="item.value"
              :label="item.key"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
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
        </el-col>
      </el-row>
    </search-container-item>
  </search-container>
</template>

<script>
import SearchContainer from "@/components/SearchContainer";
import searchContainerItem from "@/components/SearchContainerItem.vue";
import { VipDayAdminService } from "@/service/marketing/activity/VipDayAdminService";

export default {
  name: "VipdaySearch",
  components: {
    SearchContainer,
    searchContainerItem
  },
  data() {
    return {
      vipDayAdminService: null,
      queryParams: {
        page: 1,
        limit: 30
      },
      activityState: [],
      activityType: [],
      activityDateType: [],
      userScopeType: [],
      dateRange: undefined,
    };
  },
  mounted() {
    this.initSelectData();
  },
  methods: {
    initSelectData() {
      const param = [
        {
          enumKey: "actMemFestivalConfigState", //状态
          enumValue: "EnumActMemFestivalConfigState"
        },
        {
          enumKey: "activityMetaCode", //活动类型
          enumValue: "EnumActivityMetaCode"
        },
        {
          enumKey: "actMemFestivalConfigSearchDateType", //时间下拉框
          enumValue: "EnumActMemFestivalConfigSearchDateType"
        }
      ];
      const that = this;
      new VipDayAdminService().findEnumExcludeAll(param).then(response => {
        that.activityState = response.data.actMemFestivalConfigState;
        that.activityType = response.data.activityMetaCode;
        that.activityDateType = response.data.actMemFestivalConfigSearchDateType;
      });
    },
    handleDataSearch() {
      if (this.dateRange != undefined && this.dateRange != null && this.queryParams.activitySearchDateType === undefined) {
        this.$message({
          message: '请选择时间类型条件',
          type: 'warning'
        });
        return false;
      }
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
        page: 1,
        limit: 30
      };
      this.dateRange = undefined;
      this.$emit("reset", this.queryParams);
      this.handleDataSearch();
    }
  }
};
</script>
