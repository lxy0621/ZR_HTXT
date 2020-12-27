<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input placeholder="会员昵称/手机号" size="small" v-model="queryParams.memberName"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.productSkuId" placeholder="油品" size="small" style="width: 100%">
        <el-option label="全部" value=""></el-option>
        <el-option
          v-for="item in productSkus"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.stationId" placeholder="油站名称" @change="handleStationChange(queryParams.stationId)" size="small" style="width: 100%">
        <el-option label="全部" value=""></el-option>
        <el-option
          v-for="item in stations"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-select v-model="queryParams.oilMachineId" placeholder="油机号" size="small" style="display: inline; width:30%" @change="handleMachineChange(queryParams.oilMachineId)">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in machines" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="queryParams.oilGunId" placeholder="油抢号" size="small" style="display: inline;width:30%">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in guns" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.orgEmployeeId" placeholder="加油员" size="small" style="width: 100%">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in oilEmployees" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.payGround" placeholder="支付方式" size="small" style="width: 100%">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in payGroundType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.invoiced" placeholder="发票状态" size="small" style="width: 100%">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in invoicedState" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-date-picker
        type="datetimerange"
        size="small"
        style="width: 100%"
        range-separator="至"
        start-placeholder="支付开始日期"
        end-placeholder="支付结束日期"
        v-model="dateRange"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {ExpenseOrderService} from '@/service/trade/expense/ExpenseOrderService.js';
  import {OilGunService} from '@/service/system/station/OilGunService.js';

  const getDefaultQueryParams = () => ({
    memberName: undefined,
    productSkuId: undefined,
    stationId: undefined,
    oilMachineId: undefined,
    oilGunId: undefined,
    orgEmployeeId: undefined,
    payGround: undefined,
    invoiced: undefined,
    startTime: undefined,
    endTime: undefined,
    page: 1,
    limit: 30,
  });

  export default {
    name: 'ExpenseTotalSearch',
    components: {
      SearchContainer,
      SearchContainerItem
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        productSkus: [],
        stations: [],
        machines: [],
        guns: [],
        oilEmployees: [],
        dateRange: [],
        payGroundType: [
          {
            value: 1,
            label: '车牌扫码'
          },
          {
            value: 2,
            label: '扫码支付'
          },
          {
            value: 3,
            label: '手机号支付'
          }
        ],
        invoicedState: [
          {
            value: 0,
            label: '未开票'
          },
          {
            value: 1,
            label: '已开票'
          }
        ],
        service: null
      };
    },
    mounted() {
      this.oilGunService = new OilGunService();
      this.service = new ExpenseOrderService();
      // zlw ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.transTime) {
        this.queryParams.expenseDateStart = this.$route.query.transTime;
        this.queryParams.expenseDateEnd = this.$route.query.transTime;
        this.dateRange = [this.$route.query.transTime, this.$route.query.transTime];
      }
      if (undefined != this.$route.query.orgEmployeeId) {
        this.queryParams.orgEmployeeId = this.$route.query.orgEmployeeId;
      }
      if (undefined != this.$route.query.memberId) {
        this.queryParams.mbrMemberId = this.$route.query.memberId;
      }
      this.productSkuList();
      this.stationList();
    },
    methods: {
      productSkuList() {
        const that = this;
        this.oilGunService.productSkuList().then(response => {
          that.productSkus = response;
        });
      },
      stationList() {
        const that = this;
        this.oilGunService.stationList().then(response => {
          that.stations = response;
        });
      },
      machineList() {
        const that = this;
        this.oilGunService.machineList().then(response => {
          for (let i = 0; i < response.length; i++) {
            this.machines = response;
          }
        });
      },
      handleStationChange(stationId) {
        const that = this;
        that.machines = [];
        that.guns = [];
        that.oilEmployees = [];
        this.queryParams.oilMachineId = undefined;
        that.queryParams.oilGunId = undefined;
        that.queryParams.orgEmployeeId = undefined;
        // 油机
        this.oilGunService.getMachineListByStationId(stationId).then(response => {
          that.machines = response;
        });
        // 员工
        this.oilGunService.getEmployeeListByStationId(stationId).then(response => {
          that.oilEmployees = response;
        });
      },
      handleMachineChange(machineId) {
        const that = this;
        that.guns = [];
        that.queryParams.oilGunId = undefined;
        this.service.getGunsNoByMachinesId(machineId).then(response => {
          that.guns = response;
        })
      },
      handleDataSearch() {
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.expenseDateStart = this.dateRange[0];
          this.queryParams.expenseDateEnd = this.dateRange[1];
        }
        if (null === this.dateRange) {
          this.queryParams.expenseDateStart = undefined;
          this.queryParams.expenseDateEnd = undefined;
        }
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        this.queryParams = {};
        this.dateRange = [];
        this.$emit('reset', this.queryParams);
      },
    }
  };
</script>
