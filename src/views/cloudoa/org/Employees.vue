<template>
	<div>
		<el-card>
			<employees-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel" />
			<div class="opration-btn">
				<div>
					<button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleCreate()">添加员工</button>
					<button type="button" v-waves class="el-button el-button--danger el-button--small" @click="batchDelete()">批量删除</button>
				</div>
			</div>
			<employees-table ref="table"></employees-table>
		</el-card>
	</div>
</template>

<script>
import EmployeesSearch from './components/EmployeesSearch';
import EmployeesTable from './components/EmployeesTable';

export default {
	name: 'Employees',
	components: {
		EmployeesSearch,
		EmployeesTable
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
		handleCreate() {
			this.$refs.table.initDeptTree();
			this.$refs.table.form = {
			  employeeNo: undefined,
        name: undefined,
        jobTitle: undefined,
        mobile: undefined,
        email: undefined,
        departmentName: undefined,
        memo: undefined,
        accountOpenState: 0,
        roleId: undefined,
      };
			this.$refs.table.employeeCreateDialogVisible = true;
		},
		batchDelete() {
			this.$refs.table.batchDelete();
		}
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
