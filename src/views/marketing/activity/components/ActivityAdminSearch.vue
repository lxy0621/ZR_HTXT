<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.unionQuery" placeholder="活动ID/名称" size="small" />
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.state" placeholder="活动状态" size="small" style="width:100%;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in activityState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.metaCode" placeholder="活动类型" size="small" style="width:100%;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in activityType" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-select v-model="queryParams.activitySearchDateType" placeholder="时间类型" size="small" style="width:100%;">
            <el-option v-for="item in activityDateType" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-row>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.userScopeType" placeholder="活动用户" size="small" style="width: 100%">
        <el-option label="全部" value=""></el-option>
          <el-option v-for="item in userScopeType" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.dateRangeType" placeholder="活动时间" size="small" style="width: 100%">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in dateRangeType" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import searchContainerItem from '@/components/SearchContainerItem.vue';
  import {CommonService} from "@/service/common/CommonService";

  const getDefaultQueryParams = () => ({
    unionQuery: undefined,
    state: undefined,
    stateCard: undefined,
    metaCode: undefined,
    activitySearchDateType: undefined,
    startTime: undefined,
    endTime: undefined,
    userScopeType: undefined,
    page: 1,
    limit: 30,
  });

  export default {
    name: 'ActivityAdminSearch',
    components: {
      SearchContainer,
      searchContainerItem
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        activityState: [],
        activityType: [],
        activityDateType: [],
        userScopeType: [],
        dateRangeType: [],
        dateRange: undefined,
      };
    },
    mounted() {
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "activityState",
          enumValue: "EnumActivityState",
        }, {
          enumKey: "activityType",
          enumValue: "EnumActivityMetaCode",
        }, {
          enumKey: "activityDateType",
          enumValue: "EnumActivitySearchDateType",
        }, {
          enumKey: "userScopeType",
          enumValue: "EnumActivityUserScopeType",
        }, {
          enumKey: "dateRangeType",
          enumValue: "EnumActivityDateRangeType",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('activity', param).then(response => {
          that.activityState = response.activityState;
          that.activityType = response.activityType;
          that.activityDateType = response.activityDateType;
          that.userScopeType = response.userScopeType;
          this.dateRangeType = response.dateRangeType;
        });
      },
      handleDataSearch() {
        if (this.queryParams.activitySearchDateType == undefined && this.dateRange != undefined && this.dateRange != null) {
          this.$message({
            message: '请选择时间类型查询条件',
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
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        this.queryParams = {
          page: 1,
          limit: 30,
        };
        this.dateRange = undefined;
        this.$emit('reset', this.queryParams);
      },
    }
  };
</script>
