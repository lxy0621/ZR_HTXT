<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.name" placeholder="应用名称" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-select v-model="queryParams.dateType" style="width: 100%;" size="small">
            <el-option :key="1" label="更新时间" :value="1"></el-option>
          </el-select>
        </el-col>
        <el-col :span="16">
          <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期"
                          end-placeholder="结束日期" style="width:100%;" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-row>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import searchContainerItem from '@/components/SearchContainerItem.vue';

  const getDefaultQueryParams = () => ({
    name: undefined,
    dateType: 1,
    fromDate: undefined,
    toDate: undefined,
    page: 1,
    limit: 30,
  });

  export default {
    name: 'AppAdminSearch',
    components: {
      SearchContainer,
      searchContainerItem
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        dateRange: undefined,
      };
    },
    methods: {
      handleDataSearch() {
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.fromDate = this.dateRange[0];
          this.queryParams.toDate = this.dateRange[1];
        }
        if (null === this.dateRange) {
          this.queryParams.fromDate = undefined;
          this.queryParams.toDate = undefined;
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
