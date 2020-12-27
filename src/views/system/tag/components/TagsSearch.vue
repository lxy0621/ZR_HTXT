<template>
	<search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
		<search-container-item><el-input v-model="queryParams.name" placeholder="组名" size="small" /></search-container-item>
		<search-container-item>
			<el-select v-model="queryParams.tagGroupId" placeholder="标签组" size="small" style="width: 100%">
				<el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</search-container-item>
	</search-container>
</template>

<script>
import SearchContainer from '@/components/SearchContainer';
import SearchContainerItem from '@/components/SearchContainerItem';

export default {
	name: 'TagsSearch',
	components: {
		SearchContainer,
		SearchContainerItem
	},
	data() {
		return {
			queryParams: {},
			groupList: []
		};
	},
	methods: {
		handleDataSearch() {
			const queryParams = Object.assign({}, this.queryParams);
			this.$emit('search', queryParams);
		},
		handleAllReset() {
			this.queryParams = {};
			this.$emit('reset', this.queryParams);
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
