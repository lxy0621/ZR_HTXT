<template>
	<search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
		<search-container-item><el-input v-model="queryParams.name" placeholder="组名" size="small" /></search-container-item>
		<search-container-item>
			<el-select v-model="queryParams.type" placeholder="开通状态" size="small" style="width: 100%">
				<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</search-container-item>
		<search-container-item>
			<el-select v-model="queryParams.enabled" placeholder="启用状态" size="small" style="width: 100%">
				<el-option v-for="item in enabledList" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</search-container-item>
	</search-container>
</template>

<script>
import SearchContainer from '@/components/SearchContainer';
import SearchContainerItem from '@/components/SearchContainerItem';

export default {
	name: 'GroupsSearch',
	components: {
		SearchContainer,
		SearchContainerItem
	},
	data() {
		return {
			queryParams: {},
			typeList: [{ label: '否', value: 0 }, { label: '是', value: 1 }],
			enabledList: [{ label: '已停用', value: 0 }, { label: '已启用', value: 1 }]
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
