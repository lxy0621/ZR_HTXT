<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.member" placeholder="会员昵称/手机号" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-input v-model="queryParams.orderNo" placeholder="订单号" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.orderState" placeholder="订单状态" size="small" style="width: 100%">
        <el-option key="" label="全部" value=""></el-option>
        <el-option v-for="item in orderState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {CommonService} from "@/service/common/CommonService";

  const getDefaultQueryParams = () => ({
    member: undefined,
    orderNo: undefined,
    orderState: undefined,
  });

  export default {
    name: 'ProductSearch',
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        orderState: [],
      };
    },
    mounted() {
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "orderState",
          enumValue: "EnumMallOrderState",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('mall', param).then(response => {
          that.orderState = response.orderState;
        });
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
      }
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
