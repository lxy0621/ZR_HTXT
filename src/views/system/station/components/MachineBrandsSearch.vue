<template>
	<search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
		<search-container-item><el-input v-model="queryParams.name" placeholder="品牌名称" size="small" /></search-container-item>
	</search-container>
</template>

<script>
import SearchContainer from '@/components/SearchContainer';
import SearchContainerItem from '@/components/SearchContainerItem';

const getDefaultQueryParams = () => ({
  limit: 1,
  page: 30,
	name: ''
});

export default {
	name: 'MachineBrandsSearch',
	components: {
		SearchContainer,
		SearchContainerItem
	},
	data() {
		return {
			queryParams: getDefaultQueryParams()
		};
	},
	methods: {
		handleDataSearch() {
      if (undefined != this.dateRange && this.dateRange.length > 0) {
        this.queryParams.startTime = this.dateRange[0];
        this.queryParams.endTime = this.dateRange[1];
      }
      if (null === this.dateRange) {
        this.queryParams.startTime = undefined;
        this.queryParams.endTime = undefined;
      }
      const queryParams = Object.assign({}, this.queryParams);
			this.$emit('search', queryParams);
		},
		handleAllReset() {
			const queryParams = getDefaultQueryParams();
			this.queryParams = queryParams;
			this.filterTags = [];
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
