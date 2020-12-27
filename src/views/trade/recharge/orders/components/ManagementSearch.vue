<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.memberKey" placeholder="会员昵称/手机号" size="small"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.orderType" placeholder="线上/线下" size="small" style="width: 100%">
        <el-option v-for="item in orderTypes" :key="item.value" :label="item.desc" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.rechargeType" placeholder="支付渠道" size="small" style="width: 100%">
        <el-option v-for="item in rechargeTypes" :key="item.value" :label="item.desc" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item>
    <search-container-item style="text-align: center">
      <el-col :span="11">
        <el-input-number v-model="queryParams.minChargeMoney" placeholder="最小充值金额" size="small" :controls="false"
                         :precision="2" style="width: 100%;">
        </el-input-number>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input-number v-model="queryParams.maxChargeMoney" placeholder="最大充值金额" size="small" :controls="false"
                         :precision="2" style="width: 100%;">
        </el-input-number>
      </el-col>
    </search-container-item>
    <search-container-item folded>
      <el-date-picker v-model="queryParams.rechargeDate" type="daterange" value-format="yyyy-MM-dd" size="small"
                      style="width: 100%"
                      range-separator="至" start-placeholder="充值开始日期" end-placeholder="充值结束日期">
      </el-date-picker>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.payState" placeholder="付款状态" size="small" style="width: 100%">
        <el-option v-for="item in payStates" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.orderState" placeholder="订单状态" size="small" style="width: 100%">
        <el-option v-for="item in orderStates" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.refundState" placeholder="退款状态" size="small" style="width: 100%">
        <el-option v-for="item in refundStates" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {RechargeOrderService} from '@/service/trade/recharge/RechargeOrderService';
  import {CommonService} from "@/service/common/CommonService";


  const getDefaultQueryParams = () => ({
    memberKey: '',
    orderType: null,
    payState: undefined,
    orderState: undefined,
    refundState: undefined,
    rechargeDate: '',
    rechargeType: null,
    rechargePosition: null,
    minChargeMoney: undefined,
    maxChargeMoney: undefined,
    page: 1,
    limit: 30,
  });

  export default {
    name: 'ManagementSearch',
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        orderTypes: [],
        rechargeTypes: [],
        rechargePositions: [{'value': '1', "desc": "站内"}, {"value": "2", "desc": "站外"}],
        rechargeOrderService: null,
        payStates: [],
        orderStates: [],
        refundStates: [],
      };
    },
    mounted() {
      // zlw ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.dateNo) {
        this.queryParams.rechargeDate = [this.$route.query.dateNo, this.$route.query.dateNo]
      }
      // caiyu ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.memberId) {
        this.queryParams.memberId = this.$route.query.memberId
      }
      this.rechargeOrderService = new RechargeOrderService();
      this.initRechargeTypes();
      this.initOrderTypes();
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const that = this;
        const param = [{
          enumKey: "payStates",
          enumValue: "EnumRechargePayState",
        }, {
          enumKey: "orderStates",
          enumValue: "EnumRechargeOrderState",
        }, {
          enumKey: "refundStates",
          enumValue: "EnumRefundState",
        }];

        new CommonService().findEnumIncludeAll('member', param).then(response => {
          that.payStates = response.payStates;
          that.orderStates = response.orderStates;
          that.refundStates = response.refundStates;

          that.queryParams.payState = '2';
          that.queryParams.orderState = '2';
        });
      },
      initRechargeTypes() {
        this.rechargeOrderService.enumList({
          'sta': 'rechargeType',
          'alls': 'all'
        }).then(response => {
          this.rechargeTypes = response;
        })
      },
      initOrderTypes() {
        this.rechargeOrderService.enumList({
          'sta': 'orderType',
          'alls': 'all'
        }).then(response => {
          this.orderTypes = response;
        })
      },
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', [queryParams, 'search']);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.$emit('reset', [queryParams, 'search']);
        this.handleDataSearch();
      },
    }
  };
</script>
