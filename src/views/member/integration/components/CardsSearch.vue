<template>
	<search-container @search="memberCardList" @reset="rest" can-fold>
		<search-container-item><el-input placeholder="会员昵称/手机号/会员卡号" size="small" v-model="queryParams.nicknameOrMobile"></el-input></search-container-item>
		<search-container-item>
			<el-date-picker
				size="small"
				value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
				v-model="dateRange"
				type="daterange"
				range-separator="至"
				start-placeholder="办理开始日期"
				end-placeholder="办理结束日期"
				style="width: 100%"
			></el-date-picker>
		</search-container-item>
	</search-container>
</template>

<script>
import SearchContainer from '@/components/SearchContainer';
import SearchContainerItem from '@/components/SearchContainerItem';
import {CommonService} from "@/service/common/CommonService";

export default {
	name: 'CardsSearch',
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
      if (this.dateRange == null) {
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
