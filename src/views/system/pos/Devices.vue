<template>
	<div>
		<el-card>
			<devices-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search" />
			<div class="opration-btn">
				<div>
					<button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleCreate">添加设备</button>
					<button type="button" v-waves class="el-button el-button--danger el-button--small" @click="batchDelete">删除设备</button>
				</div>
			</div>
			<devices-table ref="table"></devices-table>
		</el-card>
	</div>
</template>

<script>
import DevicesSearch from './components/DevicesSearch';
import DevicesTable from './components/DevicesTable';
import { DeviceService } from '@/service/system/device/DeviceService';

export default {
	name: 'Devices',
	components: {
		DevicesSearch,
		DevicesTable
	},
	data() {
		return {
			queryParams: {},
			service: null
		};
	},
	mounted() {
		this.service = new DeviceService();
		this.queryAllStations();
	},
	methods: {
		queryAllStations() {
			this.service.queryAllStations().then(response => {
				this.$refs.table.stationList = response;
				this.$refs.search.stationList = response;
			});
		},
		searchMarketCollectRecordList(queryParams) {
			this.$refs.table.getList(queryParams);
		},
		resetAllParamsAndData() {
			this.queryParams = {};
			this.$refs.table.getList(this.queryParams);
		},
		handleCreate() {
			this.$refs.table.form = {};
			this.$refs.table.handleEdit(undefined, 'create');
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
