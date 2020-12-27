<template>
  <div class="container-pay">
    <el-card class="container">
      <pay-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <div class="opration-btn">
        <div>
          <button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleAdd()">
            添加配置
          </button>
        </div>
      </div>
      <pay-table ref='table_panel'></pay-table>
    </el-card>
  </div>
</template>

<script>
  import paySearch from "./components/PaySearch";
  import payTable from "./components/PayTable";

  export default {
    name: "PayChannelConfig",
    components: {
      paySearch,
      payTable
    },
    data() {
      return {
        queryParams: {
          payAppId: '',
          enabled: null,
          type: null
        }
      };
    },
    methods: {
      // 新增
      handleAdd() {
        this.$refs.table_panel.handleEdit('add');
      },
      searchMarketCollectRecordList(queryParams) {
        this.queryParams.payAppId = queryParams.payAppId;
        this.queryParams.enabled = queryParams.enabled;
        this.queryParams.type = queryParams.type;
        this.queryParams.page = 1;
        this.queryParams.limit = 30;
        this.$refs.table_panel.getDataList(this.queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.queryParams = {
          payAppId: '', // 油站
          enabled: null, // 金额类型
          type: null,
          page: 1,
          limit: 30,
        };
      }
    }
  };
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
