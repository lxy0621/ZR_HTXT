<template>
	<div>
		<el-card>
			<quarter-search @search="searchMarketCollectRecordList" @reset="searchMarketCollectRecordList" ref="search_panel" />
			<quarter-search-btn-groups ref="groups"></quarter-search-btn-groups>
			<div class="opration-btn">
				<div></div>
				<div><button type="button" v-waves class="el-button el-button--default el-button--small" @click="exportOrderQuarterReport">导出数据</button></div>
			</div>
			<quarter-table ref="table"></quarter-table>
		</el-card>
	</div>
</template>

<script>
import QuarterSearch from './components/QuarterSearch';
import QuarterTable from './components/QuarterTable';
import QuarterSearchBtnGroups from './components/QuarterSearchBtnGroups';

export default {
	name: 'Quarter',
	components: {
		QuarterSearch,
		QuarterTable,
		QuarterSearchBtnGroups
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
			this.$refs.groups.findGroupOrderQuarterReport(queryParams);
		},
    exportOrderQuarterReport() {
			this.$refs.table.exportOrderQuarterReport(this.queryParams);
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
