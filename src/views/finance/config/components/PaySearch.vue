<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.payAppId" placeholder="商户号" size="small" />
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.type" placeholder="收款平台" size="small" style="width: 100%">
        <el-option v-for="item in types" :key="item.value" :label="item.desc" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select placeholder="状态" v-model="queryParams.enabled" size="small" style="width: 100%">
        <el-option label="全部" value=''></el-option>
        <el-option label="已启用" value='1'></el-option>
        <el-option label="已停用" value='0'></el-option>
      </el-select>
    </search-container-item>

  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';

  const getDefaultQueryParams = () => ({
    payAppId: '',
    enabled: undefined,
    type: undefined
  });
  import {
    PayChannelConfigService
  } from '@/service/system/PayChannelConfigService';
  export default {
    name: 'PaySearch',
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        payChannelConfigService: null,
        queryParams: getDefaultQueryParams(),
        types:[],
      };
    },mounted() {
      this.payChannelConfigService = new PayChannelConfigService();
      this.initTypes();
    },
    methods: {
      initTypes() {
        this.payChannelConfigService.enumList({
          'sta': 'rechargeType',
          'alls': 'all'
        }).then(response => {
          this.types = response;
        })
      },
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
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
