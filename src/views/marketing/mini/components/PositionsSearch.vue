<template>
  <search-container
    @search="handleDataSearch"
    @reset="handleAllReset"
    can-fold
  >
    <search-container-item>
      <el-input v-model="queryParams.name" placeholder="推荐位名称" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.appId" placeholder="小程序" size="small" style="width:100%;">
        <el-option v-for="item in miniApp" :key="item.appId" :label="item.appName" :value="item.appId"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.posType" placeholder="推荐位类型" size="small" style="width:100%;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in positionType" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.posKey" placeholder="推荐位Key" size="small" style="width:100%;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in positionKey" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.enabled" placeholder="是否可用" size="small" style="width:100%;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in positionState" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {CommonService} from "@/service/common/CommonService";
  import {RecommendPositionService} from "@/service/marketing/mini/RecommendPositionService";

  const getDefaultQueryParams = () => ({
    appId: undefined,
    name: undefined,
    posType: undefined,
    posKey: undefined,
    enabled: undefined,
  });

  export default {
    name: 'PositionsSearch',
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        commonService: undefined,
        recommendPositionService: undefined,
        queryParams: getDefaultQueryParams(),
        miniApp: [],
        positionType: [],
        positionKey: [],
        positionState: [],
      };
    },
    mounted() {
      this.commonService = new CommonService();
      this.recommendPositionService = new RecommendPositionService()
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const that = this;

        // 推荐位类型、Key
        const param = [{
          enumKey: "positionType",
          enumValue: "EnumRecommendPositionType",
        }, {
          enumKey: "positionKey",
          enumValue: "EnumRecommendPositionKey",
        }];
        this.commonService.findEnumExcludeAll('wechat', param).then(response => {
          that.positionType = response.positionType;
          that.positionKey = response.positionKey;
        });

        // 推荐位类型、Key
        const param1 = [{
          enumKey: "positionState",
          enumValue: "EnumRecommendPositionState",
        }];
        this.commonService.findEnumExcludeAll('mini', param1).then(response => {
          that.positionState = response.positionState;
        })

        // 小程序
        this.recommendPositionService.getMiniAppSelect().then(response => {
          that.miniApp = response;
        });
      },
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
