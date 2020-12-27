<template>
	<search-container @search="memberCardList" @reset="rest" can-fold>
		<search-container-item><el-input placeholder="会员昵称/手机号/会员卡号" size="small" v-model="queryParams.unionQuery"></el-input></search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.enabled" placeholder="车牌付" size="small" style="width: 100%;">
        <el-option label="全部" value=""></el-option>
        <el-option :key="1" label="已启用" :value="1"></el-option>
        <el-option :key="0" label="已停用" :value="0"></el-option>
      </el-select>
    </search-container-item>
		<search-container-item>
			<el-input placeholder="车牌号" size="small" v-model="queryParams.plateNoParam" class="input-with-select">
				<el-select v-model="queryParams.areaNoParam" style="width:100px" slot="prepend" placeholder="车牌系">
					<el-option v-for="item in plateNos" :key="item.label" :label="item.label" :value="item.label"></el-option>
				</el-select>
			</el-input>
		</search-container-item>
		<search-container-item>
			<el-date-picker
				size="small"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
				v-model="dateRange"
				type="daterange"
				range-separator="至"
				start-placeholder="办理开始日期"
				end-placeholder="办理结束日期"
				style="width: 100%"
			></el-date-picker>
		</search-container-item>
    <search-container-item>
      <el-select style="width: 100%;" class="search-value" size="small" v-model="queryParams.payPwdEnabled" placeholder="免密支付">
        <el-option v-for="item in payPwdEnabled" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
	</search-container>
</template>

<script>
import SearchContainer from '@/components/SearchContainer';
import SearchContainerItem from '@/components/SearchContainerItem';
import { ExpenseOrderService } from '@/service/trade/expense/ExpenseOrderService.js';
import {CommonService} from "@/service/common/CommonService";

export default {
	name: 'CarsSearch',
	components: {
		SearchContainer,
		SearchContainerItem
	},
	data() {
		return {
			queryParams: {
			  page: 1,
        limit: 30,
      },
			dateRange: [],
      payPwdEnabled: [],
			plateNos: [
				{ label: '蒙' },
				{ label: '京' },
				{ label: '冀' },
				{ label: '晋' },
				{ label: '辽' },
				{ label: '吉' },
				{ label: '黑' },
				{ label: '沪' },
				{ label: '苏' },
				{ label: '浙' },
				{ label: '皖' },
				{ label: '闽' },
				{ label: '赣' },
				{ label: '鲁' },
				{ label: '豫' },
				{ label: '鄂' },
				{ label: '湘' },
				{ label: '粤' },
				{ label: '桂' },
				{ label: '琼' },
				{ label: '渝' },
				{ label: '川' },
				{ label: '贵' },
				{ label: '云' },
				{ label: '藏' },
				{ label: '陕' },
				{ label: '甘' },
				{ label: '青' },
				{ label: '宁' },
				{ label: '新' }
			]
		};
	},
  mounted() {
    this.initSelectData();
  },
  methods: {
    initSelectData() {
      const param = [{
        enumKey: "payPwdEnabled",
        enumValue: "EnumPayPwdEnabled",
      }];
      const that = this;
      new CommonService().findEnumIncludeAll('member', param).then(response => {
        that.payPwdEnabled = response.payPwdEnabled;
      })
    },
		memberCardList() {
			if (undefined != this.dateRange && this.dateRange.length > 0) {
				this.queryParams.createdAtStart = this.dateRange[0];
				this.queryParams.createdAtEnd = this.dateRange[1];
			}
      if (this.dateRange === null) {
        this.queryParams.createdAtStart = undefined;
        this.queryParams.createdAtEnd = undefined;
      }
			this.$emit('search', this.queryParams);
		},
		rest() {
			this.queryParams = {
			  page: 1,
        limit: 30,
      };
			this.dateRange = [];
			this.$emit('search', this.queryParams);
		}
	}
};
</script>
