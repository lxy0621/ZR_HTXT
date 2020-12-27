<template>
	<div>
		<el-card>
			<groups-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel" />
			<div class="opration-btn">
				<div>
					<button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleAdd">添加标签组</button>
					<button type="button" v-waves class="el-button el-button--danger el-button--small" @click="batchDelete">删除标签组</button>
				</div>
			</div>
			<groups-table ref="table"></groups-table>
		</el-card>
	</div>
</template>

<script>
import GroupsSearch from './components/GroupsSearch';
import GroupsTable from './components/GroupsTable';

export default {
	name: 'Groups',
	components: {
		GroupsSearch,
		GroupsTable
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
		handleAdd(dialogtitle) {
			this.$refs.table.form = {};
			this.$refs.table.handleEdit(undefined, 'add');
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
