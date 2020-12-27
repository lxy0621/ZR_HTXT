<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.name" placeholder="商品名称" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-input v-model="queryParams.code" placeholder="商品编码" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.state" placeholder="商品状态" size="small" style="width: 100%">
        <el-option key="" label="全部" value=""></el-option>
        <el-option v-for="item in productState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.categoryId" placeholder="商品类型" size="small" style="width: 100%">
        <el-option key="" label="全部" value=""></el-option>
        <el-option v-for="item in category" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {CommonService} from "@/service/common/CommonService";
  import {ProductService} from '@/service/marketing/mall/ProductService';

  const getDefaultQueryParams = () => ({
    name: undefined,
    code: undefined,
    state: undefined,
    categoryId: undefined,
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
        productState: [],
        category: [],
      };
    },
    mounted() {
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "productState",
          enumValue: "EnumMallProductState",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('mall', param).then(response => {
          that.productState = response.productState;
        });

        // 初始化商品分类下拉框category
        new ProductService().getCategorySelect().then(response => {
          that.category = response;
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
