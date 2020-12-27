<template>
	<search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
		<search-container-item><el-input v-model="queryParams.name" placeholder="员工姓名" size="small" /></search-container-item>
		<search-container-item><el-input v-model="queryParams.mobile" placeholder="手机号" size="small" /></search-container-item>
		<search-container-item>
			<el-select v-model="queryParams.dept" placeholder="选择部门" size="small" style="width: 100%">
				<el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</search-container-item>
    <!--
		<search-container-item>
			<el-select v-model="queryParams.state" placeholder="在职状态" size="small" style="width: 100%">
				<el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</search-container-item>
    -->
		<search-container-item>
			<el-select v-model="queryParams.accountOpenState" placeholder="中台系统账号状态" size="small" style="width: 100%">
				<el-option v-for="item in accountOpenStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
		</search-container-item>
	</search-container>
</template>

<script>
import SearchContainer from '@/components/SearchContainer';
import SearchContainerItem from '@/components/SearchContainerItem';

const getDefaultQueryParams = () => ({
	name: '',
	mobile: '',
	dept: '',
	state: '',
	accountOpenState: ''
});

export default {
	name: 'EmployeesSearch',
	components: {
		SearchContainer,
		SearchContainerItem
	},
	data() {
		return {
			queryParams: getDefaultQueryParams(),
			departmentList: [{ label: '当前部门', value: 0 }, { label: '所有子部门', value: 1 }],
			stateList: [{ label: '离职', value: '0' }, { label: '在职', value: '1' }],
			accountOpenStateList: [{ label: '未开通', value: '0' }, { label: '已开通', value: '1' }]
		};
	},
	methods: {
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
		}
	}
};
</script>
<style lang="scss">
.input-with-select .el-input-group__prepend {
	background-color: #fff;
}
</style>
