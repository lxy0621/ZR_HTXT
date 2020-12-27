<template>
	<div>
		<!--表格内容栏-->
		<el-table
			:header-cell-style="{ background: '#eef1f6', color: '#606266' }"
			:data="tableData"
			size="mini"
			border
			ref="multipleTable"
			tooltip-effect="dark"
			style="width: 100%; margin-bottom: 40px;"
			@selection-change="handleSelectionChange"
			v-loading='dataListLoading'
		>
			<el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
			<el-table-column label="序号" width="80" align="center">
				<template slot-scope="scope">
					<span>{{ (queryParams.page - 1) * queryParams.limit + scope.$index + 1 }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="stationName" label="油站名称" align="center" min-width="220"></el-table-column>
      <el-table-column prop="money" label="消费总金额（元）" align="center" min-width="170" sortable>
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{ formatNumber(scope.row.money) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="payMoney" label="实际支付总金额（元）" align="center" min-width="170" sortable>
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{ formatNumber(scope.row.payMoney) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="couponMoney" label="卡券总金额（元）" align="center" min-width="170" sortable>
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{ formatNumber(scope.row.couponMoney) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalCount" label="总订单数" align="center" min-width="100" sortable></el-table-column>
			<el-table-column label="日期" align="center" min-width="160">
				<template slot-scope="scope">
					{{ scope.row.dateNo }}
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="fixed-bottom-page"
			small
			:current-page="queryParams.page"
			:page-sizes="[30, 50, 100, 200]"
			:page-size="queryParams.limit"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		></el-pagination>
	</div>
</template>

<script>
import { ExpenseReportService } from '@/service/trade/expense/ExpenseReportService.js';
import * as formatter from "@/utils/formatter";

export default {
	name: 'MonthTable',
	data() {
		return {
			dataListLoading: false,
			tableData: [],
			service: null,
			queryParams: {
				page: 1,
				limit: 30
			},
			total: 0,
		};
	},
	mounted() {
		this.service = new ExpenseReportService();
		this.getList(this.queryParams);
	},
	methods: {
    formatNumber(num) {
      return formatter.formatNumber(num);
    },
		getList(queryParams) {
			queryParams.page == undefined ? (queryParams.page = 1) : (queryParams.page = this.queryParams.page);
			queryParams.limit == undefined ? (queryParams.limit = 30) : (queryParams.limit = this.queryParams.limit);
			this.queryParams = queryParams;
			this.dataListLoading = true;
			this.service.pagingOrderMonthReport(queryParams).then(response => {
				this.tableData = response.rows;
				this.queryParams.page = response.currentPage;
				this.queryParams.pageSize = response.total;
				this.total = parseInt(response.total);
				this.dataListLoading = false;
			});
		},
		handleSizeChange(val) {
			this.queryParams.limit = val;
			this.getList(this.queryParams);
		},
		handleCurrentChange(val) {
			this.queryParams.page = val;
			this.getList(this.queryParams);
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
    exportOrderMonthReport(queryParams) {
			this.service.exportOrderMonthReport(queryParams).then(response => {
				window.location.href = response.data;
			})
		}
	}
};
</script>
<style lang="scss"></style>
