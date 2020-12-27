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
			<el-table-column prop="action" label="操作" fixed align="center" width="140">
				<template slot-scope="scope">
					<router-link
						class="el-link el-link--primary"
						:to="{ path: '/trade/recharge/orders/management', query: { memberId: scope.row.memberId } }"
						type="primary"
						:underline="false"
						size="small"
					>
						充值记录
					</router-link>
					&ensp;
					<router-link
						class="el-link el-link--primary"
						:to="{ path: '/trade/expense/orders/expenseTotal', query: { memberId: scope.row.memberId } }"
						type="primary"
						:underline="false"
						size="small"
					>
						消费记录
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="会员ID" min-width="80" align="center">
				<template slot-scope="scope">
					<router-link
						class="el-link el-link--primary"
						:to="{ path: '/member/electron/members', query: { memberId: scope.row.memberId } }"
						type="primary"
						:underline="false"
						size="small"
					>
						{{ scope.row.memberId }}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="手机号" align="center" min-width="120">
				<template slot-scope="scope">
					<router-link
						class="el-link el-link--primary"
						:to="{ path: '/member/electron/members', query: { memberId: scope.row.memberId } }"
						type="primary"
						:underline="false"
						size="small"
					>
						{{ scope.row.mobile }}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="会员昵称" min-width="130" align="center">
				<template slot-scope="scope">
					<router-link
						class="el-link el-link--primary"
						:to="{ path: '/member/electron/members', query: { memberId: scope.row.memberId } }"
						type="primary"
						:underline="false"
						size="small"
					>
						{{ scope.row.nickName }}
					</router-link>
				</template>
			</el-table-column>
			<el-table-column label="会员类型" min-width="100" align="center">
        <template slot-scope="scope">
          <span v-for="item in memberType" :value="item.value" :key="item.value">{{'' + scope.row.memberType === item.value ? item.key : ''}}</span>
        </template>
			</el-table-column>
			<el-table-column label="会员卡类型" min-width="100" align="center">
        <template slot-scope="scope">
          <span v-for="item in cardType" :value="item.value" :key="item.value">{{'' + scope.row.cardType === item.value ? item.key : ''}}</span>
        </template>
			</el-table-column>
			<el-table-column prop="cardNo" label="会员卡号" align="center" min-width="120"></el-table-column>
			<el-table-column label="当前余额（元）" align="center" min-width="120">
				<template slot-scope="scope">
					<span style="color: red; font-weight: bold;">{{ scope.row.cashBalance == undefined ? '0' : formatNumber(scope.row.cashBalance) }}</span>
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
import { BindCardService } from '@/service/member/BindCardService.js';
import * as formatter from "@/utils/formatter";
import {CommonService} from "@/service/common/CommonService";

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
      },
      memberType: [],
      cardType: [],
      payPwdEnabled: [],
		};
	},
	mounted() {
		this.service = new BindCardService();
		this.memberCardList(this.queryParams);
		this.initSelectData();
	},
	methods: {
    formatNumber(num) {
      return formatter.formatNumber(num);
    },
    initSelectData() {
      const param = [{
        enumKey: "memberType",
        enumValue: "EnumMemberType",
      }, {
        enumKey: "cardType",
        enumValue: "EnumCardType",
      }, {
        enumKey: "payPwdEnabled",
        enumValue: "EnumPayPwdEnabled",
      }];
      const that = this;
      new CommonService().findEnumExcludeAll('member', param).then(response => {
        that.memberType = response.memberType;
        that.cardType = response.cardType;
        that.payPwdEnabled = response.payPwdEnabled;
      })
    },
		memberCardList(queryParams) {
			queryParams.page == undefined ? (queryParams.page = 1) : (queryParams.page = this.queryParams.page);
			queryParams.limit == undefined ? (queryParams.limit = 30) : (queryParams.limit = this.queryParams.limit);
			this.queryParams = queryParams;
			this.dataListLoading = true;
			this.service.memberCardList(queryParams).then(response => {
				this.tableData = response.rows;
				this.total = parseInt(response.total);
				this.dataListLoading = false;
			});
		},
		handleSizeChange(val) {
			this.queryParams.limit = val;
			this.memberCardList(this.queryParams);
		},
		handleCurrentChange(val) {
			this.queryParams.page = val;
			this.memberCardList(this.queryParams);
		}
	}
};
</script>
<style lang="scss"></style>
