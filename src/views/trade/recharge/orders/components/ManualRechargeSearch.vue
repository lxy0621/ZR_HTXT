<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.memberKey" placeholder="会员昵称/手机号" size="small" />
    </search-container-item>
    <search-container-item>
      <el-select multiple v-model="queryParams.applyStates" placeholder="审核状态" size="small" style="width: 100%">
        <el-option v-for="item in applyStates" :key="item.value" :label="item.desc" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item>
    <search-container-item style="text-align: center" >
      <el-col :span="11">
        <el-input-number v-model="queryParams.minChargeMoney" placeholder="最小充值金额" size="small" :controls="false" :precision="2" style="width: 100%;">
        </el-input-number>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input-number v-model="queryParams.maxChargeMoney" placeholder="最大充值金额" size="small" :controls="false" :precision="2" style="width: 100%;">
        </el-input-number>
      </el-col>
    </search-container-item>
    <search-container-item >
      <el-date-picker v-model="queryParams.rechargeDate" type="daterange" value-format="yyyy-MM-dd" size="small" style="width: 100%"
        range-separator="至" start-placeholder="充值开始日期" end-placeholder="充值结束日期">
      </el-date-picker>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {
    RechargeApplyService
  } from '@/service/trade/recharge/RechargeApplyService';

  const getDefaultQueryParams = () => ({
    memberKey: '',
    applyStates: undefined,
    rechargeDate: '',
    minChargeMoney: undefined,
    maxChargeMoney: undefined
  });

  export default {
    name: 'ManualRechargeSearch',
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        rechargeApplyService:null,
        queryParams: getDefaultQueryParams(),
        applyStates:[]
      };
    },
    mounted() {
      this.rechargeApplyService = new RechargeApplyService();
      this.initApplyStates();
    },
    methods: {
      initApplyStates() {
        this.rechargeApplyService.enumList({
          'sta': 'applyState',
          'alls': 'no'
        }).then(response => {
          this.applyStates = response;
        })
      },
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', [queryParams,'search']);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.$emit('reset', [queryParams,'search']);
        this.handleDataSearch();
      },
    }
  };
</script>
