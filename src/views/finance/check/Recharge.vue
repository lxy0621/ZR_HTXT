<template>
  <div class="container-recharge">
    <el-card class="container">
      <el-card class="search">
        <el-row :gutter="6">
          <!-- <el-col :span="6">
            <el-select v-model="value" placeholder="全部油站/部门" size="small" style="width: 100%" multiple>
              <el-option v-for="item in stations" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>-->
          <el-col :span="6">
            <el-select v-model="queryParams.orderType" placeholder="线上/线下" size="small" style="width: 100%">
              <el-option v-for="item in orderTypes" :key="item.value" :label="item.desc"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
          <!--
          <el-col :span="6">
            <el-row :gutter="5">
              <el-col :span="11">
              <el-input-number v-model="queryParams.minChargeMoney" placeholder="最小充值金额" size="small" :controls="false"
                               :precision="2" style="width: 100%;"></el-input-number>
              </el-col>
              <el-col :span="2" style="text-align: center; height: 32px; line-height: 32px;">
              -
              </el-col>
              <el-col :span="11">
              <el-input-number v-model="queryParams.maxChargeMoney" placeholder="最大充值金额" size="small" :controls="false"
                               :precision="2" style="width: 100%;"></el-input-number>
              </el-col>
            </el-row>
          </el-col>
          -->
          <el-col :span="6">
            <div class="block">
              <el-date-picker v-model="querydate" type="daterange" value-format="yyyy-MM-dd" size="small"
                              style="width: 100%" range-separator="至" start-placeholder="充值开始日期"
                              end-placeholder="充值结束日期"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" style="float:left" size="small" @click="handleDataSearch">查询</el-button>
            <el-button style="float:left" size="small" @click="handleAllReset">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
      <recharge-search-btn-group ref="group_panel" @search="handleDataSearch"></recharge-search-btn-group>
      <!--
      <el-row class="static">
        <el-button style="float:right" size="small">导出数据</el-button>
      </el-row>
      -->
      <recharge-table ref="table_panal"></recharge-table>
    </el-card>
  </div>
</template>

<script>
  import {RechargeOrderService} from "@/service/trade/recharge/RechargeOrderService";
  import rechargeSearchBtnGroup from "./components/RechargeSearchBtnGroup";
  import rechargeTable from "./components/RechargeTable";

  const getDefaultQueryParams = () => ({
    orderType: null,
    minChargeMoney: undefined,
    maxChargeMoney: undefined,
    rechargeDateStart: null,
    rechargeDateEnd: null,
    orderType1: null
  });
  export default {
    name: "Device",
    components: {
      rechargeSearchBtnGroup,
      rechargeTable
    },
    data() {
      return {
        orderTypes: [],
        rechargeOrderService: null,
        querydate: [],
        queryParams: getDefaultQueryParams()
      };
    },
    mounted() {
      this.rechargeOrderService = new RechargeOrderService();
      this.initOrderTypes();
    },
    methods: {
      initOrderTypes() {
        this.rechargeOrderService
          .enumList({
            sta: "orderType",
            alls: "all"
          })
          .then(response => {
            this.orderTypes = response;
          });
      },
      handleDataSearch(params) {
        if (params[1] == "group") {
          this.queryParams.orderType1 = params[0].orderType1;
          this.queryParams.page = 1;
          this.queryParams.limit = 30;

          this.$refs.table_panal.getDataList(this.queryParams);
        } else {
          if (undefined != this.querydate && this.querydate.length > 0) {
            this.queryParams.rechargeDateStart = this.querydate[0];
            this.queryParams.rechargeDateEnd = this.querydate[1];
          }
          this.queryParams.page = 1;
          this.queryParams.limit = 30;

          this.$refs.group_panel.searchCardData(this.queryParams);
          this.$refs.table_panal.getDataList(this.queryParams);
        }
      },
      handleAllReset() {
        this.queryParams = {
          orderType: undefined,
          minChargeMoney: undefined,
          maxChargeMoney: undefined,
          rechargeDateStart: undefined,
          rechargeDateEnd: undefined,
          orderType1: undefined,
          page: 1,
          limit: 30
        };
        this.querydate = undefined;
        this.handleDataSearch([this.queryParams, "search"]);
      }
    }
  };
</script>

<style scoped>
  .container {
    margin: 10px;
  }

  .bottomData {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    background: #fff;
    z-index: 10;
  }

  .bottomData .totalNumber {
    flex: 1;
    text-align: left;
  }

  .bottomData .paging {
    flex: 5;
    text-align: right;
  }

  .search-value {
    width: 100%;
  }

  .search-button {
    margin-top: 10px;
  }

  .static {
    margin: 10px 0;
  }

  .el-button {
    width: 80px;
    height: 32px;
    text-align: center;
  }

  .maxtomin {
    width: 100%;
  }

  .max {
    width: 45%;
  }

  .min {
    width: 45%;
  }
</style>
