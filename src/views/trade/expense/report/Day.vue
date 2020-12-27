<template>
	<div>
		<el-card>
			<day-search @search="searchMarketCollectRecordList" @reset="searchMarketCollectRecordList" ref="search_panel" />
			<day-search-btn-groups ref="groups"></day-search-btn-groups>
			<div class="opration-btn">
				<div></div>
				<div><button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportOrderDayReport">导出数据</button></div>
			</div>
			<day-table ref="table"></day-table>
		</el-card>
	</div>
</template>

<script>
import DaySearch from './components/DaySearch';
import DayTable from './components/DayTable';
import DaySearchBtnGroups from './components/DaySearchBtnGroups';

export default {
	name: 'Day',
	components: {
		DaySearch,
		DayTable,
		DaySearchBtnGroups
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
			this.$refs.groups.findGroupOrderDayReport(queryParams);
		},
		exportOrderDayReport() {
			this.$refs.table.exportOrderDayReport(this.queryParams);
		},
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
