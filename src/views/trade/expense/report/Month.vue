<template>
	<div>
		<el-card>
			<month-search @search="searchMarketCollectRecordList" @reset="searchMarketCollectRecordList" ref="search_panel" />
			<month-search-btn-groups ref="groups"></month-search-btn-groups>
			<div class="opration-btn">
				<div></div>
				<div><button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportOrderMonthReport">导出数据</button></div>
			</div>
			<month-table ref="table"></month-table>
		</el-card>
	</div>
</template>

<script>
import MonthSearch from './components/MonthSearch';
import MonthTable from './components/MonthTable';
import MonthSearchBtnGroups from './components/MonthSearchBtnGroups';

export default {
	name: 'Month',
	components: {
		MonthSearch,
		MonthTable,
		MonthSearchBtnGroups
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
			this.$refs.groups.findGroupOrderMonthReport(queryParams);
		},
    exportOrderMonthReport() {
			this.$refs.table.exportOrderMonthReport(this.queryParams);
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
