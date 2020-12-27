<template>
	<div>
		<el-card class="container">
			<cards-search ref="search" @search="memberCardList" @rest="memberCardList"></cards-search>
			<cards-search-btn-group ref="search" @search="memberCardListFromGroups"></cards-search-btn-group>
			<el-row class="static"><el-button style="float:right" size="small">导出数据</el-button></el-row>
			<cards-table ref="table"></cards-table>
		</el-card>
	</div>
</template>

<script>
import CardsSearch from './components/CardsSearch';
import CardsSearchBtnGroup from './components/CardsSearchBtnGroup';
import CardsTable from './components/CardsTable';

export default {
	name: 'Cards',
	components: {
		CardsSearch,
		CardsSearchBtnGroup,
		CardsTable
	},
	data() {
		return {
		};
	},
	methods: {
		memberCardList(queryParams) {
      this.$refs.search.onActive = [null,null];
      this.$refs.search.totalActive = true;
			this.$refs.table.memberCardList(queryParams);
			this.$refs.search.memberCardGroupData(queryParams);
		},
    memberCardListFromGroups(queryParams) {
      this.$refs.table.memberCardList(queryParams);
    }
	}
};
</script>

<style scoped>
.container {
	margin: 10px;
}
.search-value {
	width: 100%;
}
.search-button {
	margin-top: 10px;
}
.static {
	margin-bottom: 10px;
}
.el-button {
	width: 80px;
	height: 32px;
	text-align: center;
}
</style>
