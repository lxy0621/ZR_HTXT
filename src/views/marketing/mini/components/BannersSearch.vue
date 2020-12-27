<template>
  <search-container
    @search="handleDataSearch"
    @reset="handleAllReset"
    can-fold
  >
    <search-container-item>
      <el-input v-model="queryParams.name" placeholder="Banner名称" size="small"/>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {BannerService} from "@/service/marketing/mini/BannerService";

  const getDefaultQueryParams = () => ({
    name: '',
  });

  export default {
    name: 'BannersSearch',
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        bannerService: undefined,
        queryParams: getDefaultQueryParams(),
      };
    },
    mounted() {
      this.bannerService = new BannerService();
    },
    methods: {
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
</style>
