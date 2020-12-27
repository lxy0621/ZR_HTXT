<template>
  <div>
    <!--表格内容栏-->
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom: 40px;"
      @selection-change="handleSelectionChange"
      v-loading="tableLoading"
    >

      <el-table-column type="selection" width="40" style="text-align: center">
      </el-table-column>
      <el-table-column prop="handle" label="操作" fixed align="center" width="300">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleCheck(scope.row)" size="small">查看</el-link>&ensp;
          <el-link type="primary" :underline="false" @click="handleBindCar(scope.row)" size="small">绑定车辆</el-link>&ensp;
          <el-link type="primary" :underline="false" @click="handleManualReCharge(scope.row)" size="small">人工充值
          </el-link>&ensp;
          <el-link type="danger" :underline="false" @click="handleManualRebate(scope.row)" size="small">人工扣款</el-link>&ensp;
          <el-link type="success" :underline="false" @click="handleQRCode(scope.row)" size="small">二维码</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="会员ID" align="center" min-width="80"></el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center" min-width="120"></el-table-column>
      <el-table-column prop="nickname" label="会员昵称" align="center" min-width="130"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" min-width="100"></el-table-column>
      <el-table-column prop="source" label="来源" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-for="item in memberSource" :value="item.value" :key="item.value">{{'' + scope.row.source === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="memberType" label="会员类型" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-for="item in memberType" :value="item.value" :key="item.value">{{'' + scope.row.memberType === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="svip" label="是否SVIP" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-for="item in memberSVIP" :value="item.value" :key="item.value">{{'' + scope.row.svip === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cardsNum" label="账户余额（元）" align="center" min-width="115">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.totalBalance)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cardsNum" label="会员卡" align="center" min-width="80">
        <template slot-scope="scope">
          <span style="color: #1e9fff; font-weight: bold;">{{scope.row.cardsNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="carsNum" label="已绑车辆" align="center" min-width="80">
        <template slot-scope="scope">
          <span style="color: #1e9fff; font-weight: bold;">{{scope.row.carsNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="scores" label="当前积分" align="center" min-width="80">
        <template slot-scope="scope">
          <span style="color: #1e9fff; font-weight: bold;"
                v-if="scope.row.scores !== undefined">{{scope.row.scores}}</span>
          <span style="color: #1e9fff; font-weight: bold;" v-if="scope.row.scores === undefined">0</span>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="标签" align="center" min-width="130">
        <template slot-scope="scope" v-if="scope.row.tags !== undefined">
          <el-tag size="mini" v-for="item in scope.row.tags.split(',')" :key="item" type="info"
                  style="margin-right: 3px;">{{item}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="注册时间" align="center" min-width="160"></el-table-column>
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

    <el-dialog :visible.sync="memberDialogVisible" width="1250px">
      <el-tabs v-model="activedTab" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="baseDetail">
          <base-detail ref="baseInfo" @closeCheckDialog="closeCheckDialog"></base-detail>
        </el-tab-pane>

        <el-tab-pane label="会员卡" name="eCards">
          <e-cards ref="eCards" @rechargeRecord="switchRechargeRecord" @expenseRecord="switchExpenseRecord"
                   @closeCheckDialog="closeCheckDialog"></e-cards>
        </el-tab-pane>

        <el-tab-pane label="已绑车辆" name="boundCars">
          <bound-cars ref="boundCars" @expenseRecord="switchExpenseRecord"
                      @closeCheckDialog="closeCheckDialog"></bound-cars>
        </el-tab-pane>
        <!--
        <el-tab-pane label="优惠券" name="coupon">
          <coupon></coupon>
        </el-tab-pane>
        -->
        <el-tab-pane label="消费记录" name="expenseRecord">
          <expense-record ref="expenseRecord" @closeCheckDialog="closeCheckDialog"></expense-record>
        </el-tab-pane>

        <el-tab-pane label="充值记录" name="rechargeRecord">
          <recharge-record ref="rechargeRecord" @closeCheckDialog="closeCheckDialog"></recharge-record>
        </el-tab-pane>

        <el-tab-pane label="退款记录" name="refundRecord">
          <refund-record ref="refundRecord" @closeCheckDialog="closeCheckDialog"></refund-record>
        </el-tab-pane>

        <el-tab-pane label="撤销记录" name="repealRecord">
          <repeal-record ref="repealRecord" @closeCheckDialog="closeCheckDialog"></repeal-record>
        </el-tab-pane>

        <el-tab-pane label="人工扣款记录" name="rebateRecord">
          <rebate-record ref="rebateRecord" @closeCheckDialog="closeCheckDialog"></rebate-record>
        </el-tab-pane>

        <el-tab-pane label="积分变动" name="scores">
          <scores ref="scores" @closeCheckDialog="closeCheckDialog"></scores>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog :visible.sync="carBindDialogVisible" width="80%">
      <el-tabs v-model="carBindTab">
        <el-tab-pane label="绑定车辆" name="bindCar">
          <bind-car ref="bindCar" @closeCarBindDialog="closeCarBindDialog"></bind-car>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog :visible.sync="manualRechargeDialogVisible" width="80%">
      <el-tabs v-model="manualRechargeTab">
        <el-tab-pane label="人工充值" name="manualRecharge">
          <manual-recharge ref="manualRecharge"
                           @closeManualRechargeDialog="closeManualRechargeDialog"></manual-recharge>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 人工扣款 -->
    <el-drawer :visible.sync="manualRebateDrawerVisible" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold;">人工扣款&ensp;></span>
      <manual-rebate ref="manualRebate" @closeManualRebateDrawer="closeManualRebateDrawer"></manual-rebate>
    </el-drawer>

  </div>
</template>

<script>
  import BaseDetail from "./BaseDetail";
  import ECards from "./ECards";
  import BoundCars from "./BoundCars";
  import Coupon from "./Coupon";
  import ExpenseRecord from "./ExpenseRecord";
  import RechargeRecord from "./RechargeRecord";
  import RefundRecord from "./RefundRecord";
  import RebateRecord from "./RebateRecord";
  import RepealRecord from "./RepealRecord";
  import Scores from "./Scores";
  import BindCar from "./BindCar";
  import ManualRecharge from "./ManualRecharge";
  import ManualRebate from "./ManualRebate";
  import {MemberService} from "@/service/member/MemberService";
  import {CommonService} from "@/service/common/CommonService";
  import * as formatter from "@/utils/formatter";
  import Cookies from "js-cookie";

  export default {
    name: "MembersTable",
    components: {
      ManualRecharge,
      ManualRebate,
      BaseDetail,
      ECards,
      BoundCars,
      Coupon,
      ExpenseRecord,
      RechargeRecord,
      RefundRecord,
      RebateRecord,
      RepealRecord,
      Scores,
      BindCar,
    },
    data() {
      return {
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        tableLoading: false,
        memberType: [],
        memberSource: [],
        memberSVIP: [],
        memberDialogVisible: false,
        carBindDialogVisible: false,
        manualRechargeDialogVisible: false,
        manualRebateDrawerVisible: false,
        activedTab: 'baseDetail',
        carBindTab: 'bindCar',
        manualRechargeTab: 'manualRecharge',
        memberService: null,
        memberId: '',
      };
    },
    mounted() {
      // caiyu 会员卡查询、车辆绑定页面跳转
      if (undefined != this.$route.query.memberId) {
        let memberId = this.$route.query.memberId
        let row = {id: memberId};
        this.queryParams.memberId = memberId;
        this.handleCheck(row);
      }
      this.memberService = new MemberService();
      this.initSelectData();
      this.getList(this.queryParams);
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
          enumKey: "memberSource",
          enumValue: "EnumMemberSource",
        }, {
          enumKey: "memberSVIP",
          enumValue: "EnumMemberSVIP",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.memberType = response.memberType;
          that.memberSource = response.memberSource;
          that.memberSVIP = response.memberSVIP;
        })
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      handleCheck(row) {
        this.activedTab = 'baseDetail';
        this.memberId = row.id;
        let _this = this;
        setTimeout(() => {
          _this.$refs.baseInfo.loadMemberInfo(_this.memberId);
        }, 10)
        this.memberDialogVisible = true;
      },
      getList(queryParams) {
        this.tableLoading = true;
        queryParams.page = undefined != queryParams.page ? this.queryParams.page : 1;
        queryParams.limit = undefined != queryParams.limit ? this.queryParams.limit : 30;
        this.queryParams = queryParams;
        this.memberService.pagingMembers(queryParams)
          .then(response => {
            this.tableData = response.rows;
            this.total = parseInt(response.total);
            this.tableLoading = false;
          });
      },
      handleSizeChange(val) {
        this.queryParams.limit = val;
        this.getList(this.queryParams);
      },
      handleCurrentChange(val) {
        this.queryParams.page = val;
        this.getList(this.queryParams);
      },
      handleClick(tab, event) {
        if (tab.name === 'baseDetail') {
          this.$refs.baseInfo.loadMemberInfo(this.memberId);
        }
        if (tab.name === 'eCards') {
          let queryParams = {
            page: 1,
            limit: 30,
            memberId: this.memberId,
          }
          this.$refs.eCards.getList(queryParams);
        }
        if (tab.name === 'boundCars') {
          let queryParams = {
            page: 1,
            limit: 30,
            memberId: this.memberId,
          }
          this.$refs.boundCars.getList(queryParams);
        }
        if (tab.name === 'expenseRecord') {
          let queryParams = {
            page: 1,
            limit: 30,
            memberId: this.memberId,
          }
          this.$refs.expenseRecord.getList(queryParams);
        }
        if (tab.name === 'rechargeRecord') {
          let queryParams = {
            page: 1,
            limit: 30,
            memberId: this.memberId,
          }
          this.$refs.rechargeRecord.getList(queryParams);
        }
        if (tab.name === 'refundRecord') {
          let queryParams = {
            page: 1,
            limit: 30,
            memberId: this.memberId,
          }
          this.$refs.refundRecord.getList(queryParams);
        }
        if (tab.name === 'rebateRecord') {
          let queryParams = {
            page: 1,
            limit: 30,
            memberId: this.memberId,
          }
          this.$refs.rebateRecord.getList(queryParams);
        }
        if (tab.name === 'repealRecord') {
          let queryParams = {
            page: 1,
            limit: 30,
            memberId: this.memberId,
          }
          this.$refs.repealRecord.getList(queryParams);
        }
        if (tab.name === 'scores') {
          let queryParams = {
            page: 1,
            limit: 30,
            memberId: this.memberId,
          }
          this.$refs.scores.getList(queryParams);
        }
      },
      switchRechargeRecord(param) {
        this.activedTab = 'rechargeRecord';
        let queryParams = {
          page: 1,
          limit: 30,
          memberId: param.memberId,
          cardId: param.cardId,
        }
        this.$refs.rechargeRecord.getList(queryParams);
      },
      switchExpenseRecord(param) {
        this.activedTab = 'expenseRecord';
        let queryParams = {
          page: 1,
          limit: 30,
          memberId: param.memberId,
          cardId: param.cardId,
        }
        this.$refs.expenseRecord.getList(queryParams);
      },
      handleBindCar(row) {
        this.carBindTab = 'bindCar';
        let memberId = row.id;
        let _this = this;
        setTimeout(() => {
          _this.$refs.bindCar.loadMemberInfo(memberId);
        }, 10)
        this.carBindDialogVisible = true;
      },
      closeCarBindDialog(flag) {
        this.carBindDialogVisible = flag;
        this.getList(this.queryParams);
      },
      handleManualReCharge(row) {
        this.manualRechargeTab = 'manualRecharge';
        let memberId = row.id;
        let _this = this;
        setTimeout(() => {
          _this.$refs.manualRecharge.loadMemberInfo(memberId);
        }, 10)
        this.manualRechargeDialogVisible = true;
      },
      closeManualRechargeDialog(flag) {
        this.manualRechargeDialogVisible = flag;
        this.getList(this.queryParams);
      },
      closeCheckDialog(flag) {
        this.memberDialogVisible = flag;
        this.getList(this.queryParams);
      },
      handleManualRebate(row) {
        let _this = this;
        setTimeout(() => {
          _this.$refs.manualRebate.loadMemberInfo(row);
        }, 10)
        this.manualRebateDrawerVisible = true;
      },
      closeManualRebateDrawer(flag) {
        this.manualRebateDrawerVisible = flag;
        this.getList(this.queryParams);
      },
      handleQRCode(row) {
        this.$confirm('确定要打印会员二维码吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.memberService.printMemberQRCode(row.id)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            }).catch(() => {
          });
        });
      }
    }
  };
</script>
<style lang="scss">
</style>
