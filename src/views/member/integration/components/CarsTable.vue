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
			v-loading='dataListLoading'
		>
			<el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
			<el-table-column prop="action" label="操作" fixed align="center" width="120">
				<template slot-scope="scope">
					<router-link class="el-link el-link--primary" :to="{ path: '/trade/expense/orders/expenseTotal', query: { memberId: scope.row.memberId } }" type="primary" :underline="false" size="small">
						消费记录
					</router-link>
				</template>
			</el-table-column>
      <el-table-column prop="plateNo" label="车牌号" align="center" min-width="100"></el-table-column>
			<el-table-column label="会员ID" min-width="100" align="center">
				<template slot-scope="scope">
					<router-link class="el-link el-link--primary" :to="{ path: '/member/electron/members', query: { memberId: scope.row.memberId } }" type="primary" :underline="false" size="small">
						{{scope.row.memberId}}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="手机号" align="center" min-width="120">
				<template slot-scope="scope">
					<router-link class="el-link el-link--primary" :to="{ path: '/member/electron/members', query: { memberId: scope.row.memberId } }" type="primary" :underline="false" size="small">
						{{scope.row.mobile}}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="会员昵称" min-width="180" align="center">
				<template slot-scope="scope">
					<router-link class="el-link el-link--primary" :to="{ path: '/member/electron/members', query: { memberId: scope.row.memberId } }" type="primary" :underline="false" size="small">
						{{scope.row.nickName}}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="会员类型" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.memberType == 1">个人</span>
					<span v-if="scope.row.memberType == 2">企业</span>
				</template>
			</el-table-column>
			<el-table-column prop="cardNo" label="会员卡号" align="center" min-width="120"></el-table-column>
      <el-table-column label="车牌付" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.enabled == 0">已停用</span>
          <span size="small" v-if="scope.row.enabled == 1">已启用</span>
        </template>
      </el-table-column>
			<el-table-column label="免密支付" align="center" min-width="100">
				<template slot-scope="scope">
					<el-tag size="small" v-if="scope.row.payPwdEnabled == 0">已启用</el-tag>
					<el-tag type="danger" size="small" v-if="scope.row.payPwdEnabled == 1">已停用</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="办理时间" align="center" min-width="140"></el-table-column>
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
import { BindCarService } from '@/service/member/BindCarService.js';

export default {
	name: 'CarsTable',
	data() {
		return {
			dataListLoading: false,
			total: 0,
			tableData: [],
			service: null,
			queryParams: {
			  page: 1,
        limit: 30,
      }
		};
	},
	mounted() {
		this.service = new BindCarService();
		this.bindCarList(this.queryParams);
	},
	methods: {
		bindCarList(queryParams) {
			queryParams.page == undefined ? (queryParams.page = 1) : (queryParams.page = this.queryParams.page);
			queryParams.limit == undefined ? (queryParams.limit = 30) : (queryParams.limit = this.queryParams.limit);
			this.queryParams = queryParams;
			this.dataListLoading = true;
			this.service.bindCarList(queryParams).then(response => {
				this.tableData = response.rows;
				this.total = parseInt(response.total);
				this.dataListLoading = false;
			});
		},
		handleSizeChange(val) {
			this.queryParams.limit = val;
			this.bindCarList(this.queryParams);
		},
		handleCurrentChange(val) {
			this.queryParams.page = val;
			this.bindCarList(this.queryParams);
		}
	}
};
</script>
<style lang="scss"></style>
