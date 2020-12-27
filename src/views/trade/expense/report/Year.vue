<template>
	<div>
		<el-card>
			<year-search @search="searchMarketCollectRecordList" @reset="searchMarketCollectRecordList" ref="search_panel" />
			<year-search-btn-groups ref="groups"></year-search-btn-groups>
			<div class="opration-btn">
				<div></div>
				<div><button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportOrderYearReport">导出数据</button></div>
			</div>
			<year-table ref="table"></year-table>
		</el-card>
	</div>
</template>

<script>
import YearSearch from './components/YearSearch';
import YearTable from './components/YearTable';
import YearSearchBtnGroups from './components/YearSearchBtnGroups';

export default {
	name: 'Year',
	components: {
		YearSearch,
		YearTable,
		YearSearchBtnGroups
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
			this.$refs.groups.findGroupOrderYearReport(queryParams);
		},
    exportOrderYearReport() {
			this.$refs.table.exportOrderYearReport(this.queryParams);
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
