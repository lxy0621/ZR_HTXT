<template>
  <div>
    <el-card>
      <product-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <div class="opration-btn">
        <div>
          <button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleCreateProduct()">
            创建商品
          </button>
        </div>
      </div>
      <product-table ref="table"></product-table>
    </el-card>
  </div>
</template>

<script>
  import ProductSearch from './components/ProductSearch';
  import ProductTable from './components/ProductTable';

  export default {
    name: "Product",
    components: {
      ProductSearch,
      ProductTable
    },
    data() {
      return {
        queryParams: {}
      };
    },
    methods: {
      searchMarketCollectRecordList(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData() {
        this.queryParams = {};
        this.$refs.table.getList(this.queryParams);
      },
      handleCreateProduct() {
        this.$refs.table.handleCreateProduct();
      },
    }
  };
</script>

<style lang="scss">
  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
