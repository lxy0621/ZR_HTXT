<template>
  <search-container class="pricesearch" @search="handleDataSearch(queryParams.state)" @reset="handleAllReset" can-fold>
    <div>
      <search-container-item style="width: 100%;">
        <el-menu :default-active="queryParams.state" class="el-menu-demo" mode="horizontal" @select="handleDataSearch">
          <el-menu-item v-for="iem in priceStates" :index="iem.value.toString()" :key="iem.value">{{iem.desc}}</el-menu-item>
        </el-menu>
      </search-container-item>
    </div>
    <el-card class="cardsear">
      <search-container-item>
        <el-select v-model="queryParams.stationIds" placeholder="全部油站" size="small" style="width: 100%" multiple>
          <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </search-container-item>
      <search-container-item>
        <el-select v-model="queryParams.productId" placeholder="产品" size="small" style="width: 100%" @change="findProductSkuByProduct">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </search-container-item>
      <search-container-item>
        <el-select v-model="queryParams.productSkuId" placeholder="油品" size="small" style="width: 100%">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in oilType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </search-container-item>
      <search-container-item>
        <el-date-picker v-model="dateRange" type="daterange" value-format="yyyy-MM-dd" format="yyyy-MM-dd" size="small" style="width: 100%"
                        range-separator="至" start-placeholder="生效开始日期" end-placeholder="生效结束日期">
        </el-date-picker>
      </search-container-item>
    </el-card>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {
    ProductPriceService
  } from '@/service/trade/product/ProductPriceService';

  const getDefaultQueryParams = () => ({
    state: '1',
    stationIds: [],
    productId: null,
    productSkuId: null,
    realPrice: null,
    startDate: undefined,
    endDate: undefined,
  });

  export default {
    name: 'PricesSearch',
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        priceStates: [],
        stations: [],
        products: [],
        oilType: [],
        productPriceService: null,
        queryParams: getDefaultQueryParams(),
        productIds: [],
        dateRange: [],
      };
    },
    mounted() {
      this.productPriceService = new ProductPriceService();
      this.initApplyStates();
      this.queryAllStations();
      this.findAllProducts();
    },
    methods: {
      queryAllStations() {
        this.productPriceService.queryAllStations().then(response => {
          this.stations = response;
        });
      },
      findAllProducts() {
        this.productPriceService.findAllProducts().then(response => {
          this.products = response;
        });
      },
      findProductSkuByProduct() {
        this.queryParams.productSkuId = null;
        if (null != this.queryParams.productId && undefined != this.queryParams.productId && '' != this.queryParams.productId && 0 != this.queryParams.productId) {
          this.productPriceService.findProductSkuByProduct(this.queryParams.productId).then(response => {
            this.oilType = response;
          });
        } else {
          this.oilType = [];
        }
      },
      initApplyStates() {
        this.productPriceService.enumList({
          'sta': 'price_state',
          'alls': '1'
        }).then(response => {
          this.priceStates = response;
        })
      },
      handleDataSearch(key) {
        this.queryParams.state = key;
        let queryParams = Object.assign({}, this.queryParams);
        // 处理时间
        if (null != this.dateRange && undefined != this.dateRange && this.dateRange.length > 0) {
          queryParams.startDate = this.dateRange[0];
          queryParams.endDate = this.dateRange[1];
        }
        if (null === this.dateRange) {
          queryParams.startDate = undefined;
          queryParams.endDate = undefined;
        }
        debugger
        this.$emit('search', [queryParams, 'search']);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.$emit('reset', [queryParams, 'search']);
        this.handleDataSearch(this.queryParams.state);
      },
    }
  };
</script>
<style scoped>
  .pricesearch {
    width: 100%;

  }

  .pricesearch >>> .search-container-inner {
    margin-top: -30px;
  }

  .lineline {
    width: 100%;
    height: 1px;
    background: #D5DEE7;
    margin-top: -5px;
  }

  .el-menu-demo {
    /*border-bottom:none;*/
    height: 50px;
  }

  .el-menu-demo li {
    height: 50px;
    line-height: 50px;
  }

  .cardsear {
    margin-top: 8px;
  }
</style>
