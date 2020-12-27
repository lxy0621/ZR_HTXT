<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <!-- <search-container-item>
      <el-select v-model="value" placeholder="全部油站/部门" size="small" style="width: 100%" multiple>
        <el-option v-for="item in stations" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item> -->
    <!--
    <search-container-item style="text-align: center">
      <el-row :gutter="5">
        <el-col :span="9">
          <el-select v-model="queryParams.moneyType" placeholder="请选择" size="small" >
            <el-option label="充值总金额" value = '1'></el-option>
            <el-option label="赠送总金额" value = '2'></el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-input-number v-model="queryParams.minChargeMoney" placeholder="最小金额" size="small" :controls="false"
                           :precision="2" style="width: 100%;">
          </el-input-number>
        </el-col>
        <el-col :span="1">-</el-col>
        <el-col :span="7">
          <el-input-number v-model="queryParams.maxChargeMoney" placeholder="最大金额" size="small" :controls="false"
                           :precision="2" style="width: 100%;">
          </el-input-number>
        </el-col>
      </el-row>
    </search-container-item>
    -->
    <!-- <search-container-item>
      <el-select placeholder="会员卡类型" size="small" style="width: 100%">
        <el-option v-for="item in cardType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item> -->
    <search-container-item>
      <el-row>
      <el-col :span="11">
        <el-date-picker v-model="queryParams.rechargeDateStart" type="week" format="yyyy 第 WW 周" placeholder="充值开始周" size="small" style="width: 100%">
        </el-date-picker>
      </el-col>
      <el-col class="line" :span="2" style="text-align: center;">至</el-col>
      <el-col :span="11">
        <el-date-picker v-model="queryParams.rechargeDateEnd" type="week" format="yyyy 第 WW 周" placeholder="充值结束周" size="small" style="width: 100%">
        </el-date-picker>
      </el-col>
      </el-row>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';

  const getDefaultQueryParams = () => ({
    stations: null, // 油站
    moneyType: '1', // 金额类型

    rechargeDateStart: '',
    rechargeDateEnd: '',
    minChargeMoney: undefined,
    maxChargeMoney: undefined,
  });

  export default {
    name: 'WeekSearch',
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        value: '',
        value1: '',
      };
    },
    methods: {
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.filterTags = [];
        this.$emit('reset', queryParams);
        this.handleDataSearch();
      },
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
