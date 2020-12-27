<template>
  <div>
    <expense-total-search @search="searchMarketCollectRecordList" @reset="searchMarketCollectRecordList" ref="search_panel"/>
    <expense-total-search-btn-groups @search="searchMarketCollectRecordListFromGroups" ref="search_btn"></expense-total-search-btn-groups>
    <div class="opration-btn">
      <div></div>
      <div>
        <button type="button" v-waves class="el-button el-button--default el-button--small" @click="expenseExport">
          导出数据
        </button>
      </div>
    </div>
    <expense-total-table ref="table" @search="searchMarketCollectRecordList"></expense-total-table>
  </div>
</template>

<script>
import ExpenseTotalSearch from './components/ExpenseTotalSearch';
import ExpenseTotalTable from './components/ExpenseTotalTable';
import ExpenseTotalSearchBtnGroups from './components/ExpenseTotalSearchBtnGroups';

export default {
  name: 'ExpenseTotal',
  components: {
    ExpenseTotalSearch,
    ExpenseTotalTable,
    ExpenseTotalSearchBtnGroups
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
      this.$refs.search_btn.onActive = [null, null];
      this.$refs.search_btn.totalActive = true;
      this.queryParams = queryParams;
      this.$refs.table.getList(queryParams);
      this.$refs.search_btn.expenseGroupsData(queryParams);
    },
    searchMarketCollectRecordListFromGroups(queryParams) {
      this.queryParams = queryParams;
      this.$refs.table.getList(queryParams);
      this.$refs.search_btn.expenseGroupsData(queryParams);
    },
    expenseExport() {
      this.$refs.table.expenseExport(this.queryParams);
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
