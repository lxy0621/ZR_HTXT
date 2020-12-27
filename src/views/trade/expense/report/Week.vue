<template>
	<div>
		<el-card>
			<week-search @search="searchMarketCollectRecordList" @reset="searchMarketCollectRecordList" ref="search_panel" />
			<week-search-btn-groups ref="groups"></week-search-btn-groups>
			<div class="opration-btn">
				<div></div>
				<div><button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportOrderWeekReport">导出数据</button></div>
			</div>
			<week-table ref="table"></week-table>
		</el-card>
	</div>
</template>

<script>
import WeekSearch from './components/WeekSearch';
import WeekTable from './components/WeekTable';
import WeekSearchBtnGroups from './components/WeekSearchBtnGroups';

export default {
	name: 'Week',
	components: {
		WeekSearch,
		WeekTable,
		WeekSearchBtnGroups
	},
	data() {
		return {
			cutsParams: null,
			multipleSelection: [],
			activeName: 'first',
			queryParams: {}
		};
	},
	methods: {
		searchMarketCollectRecordList(queryParams) {
			this.queryParams = queryParams;
			this.$refs.table.getList(queryParams);
			this.$refs.groups.findGroupOrderWeekReport(queryParams);
		},
    exportOrderWeekReport() {
			this.$refs.table.exportOrderWeekReport(this.queryParams);
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
