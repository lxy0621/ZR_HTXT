<template>
  <div>
    <el-form-item label="油/气站" class="required" prop="stationIdArr">
      <el-select v-model="activityForm.stationIdArr" placeholder="请选择油/气站" style="width: 100%;" multiple clearable>
        <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="可用油品" class="required" prop="productSkuArr">
      <el-checkbox-group v-model="activityForm.productSkuArr">
        <el-checkbox v-for="item in skus" :label="item.id" :key="item.id" :value="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="活动规则" class="required" prop="rcRuleAddUpdateDTOs">
      <template>
        <div v-for="(item, index) in activityForm.rcRuleAddUpdateDTOs" :key="index" style="margin-bottom: 10px;">
          <span style="color: #484a4d;">消费满&ensp;</span>
          <el-input-number :controls="false" :precision="2" :min="0.01" :max="100000.00"
                           v-model="item.rechargeMoneyDown"></el-input-number>&ensp;
          <span style="color: #484a4d;">元&emsp;送红包&ensp;<el-link type="primary" :underline="false"
                                                                 @click="showRedPacketDialog(index)"
                                                                 size="small">{{ item.redPacketName }}</el-link></span>
          <div style="display: inline-block; height: 30px; vertical-align: middle;">
            <i class="el-icon-circle-plus" @click="addActivityRule" style="font-size: 16pt;color: #409EFF;"
               v-if="activityForm.rcRuleAddUpdateDTOs.length < 12"></i>&ensp;
            <i class="el-icon-remove" @click="delActivityRule(index)" style="font-size: 16pt;color: #F56C6C;"
               v-if="activityForm.rcRuleAddUpdateDTOs.length > 1 || activityForm.rcRuleAddUpdateDTOs.length == 12"></i>
          </div>
        </div>
      </template>
    </el-form-item>
    <el-form-item label="消费次数" class="required" prop="joinLimit" style="margin-top: -10px;">
      <el-radio-group v-model="activityForm.joinLimit" size="medium">
        <el-radio label="0">不限</el-radio>
        <el-radio label="1">有限&ensp;
          <div style="display: inline-block;" v-if="activityForm.joinLimit == '1'">
            <el-input-number v-model="activityForm.limits" placeholder="请输入次数" :min="1" :max="10000" :precision="0"
                             :controls="false" style="width: 60%;">
            </el-input-number>&ensp;次
          </div>
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="收款方式" class="required" prop="payGroundArr">
      <el-checkbox-group v-model="activityForm.payGroundArr">
        <el-checkbox v-for="item in payGrounds" :label="item.value" :key="item.value" :value="item.value">
          {{ item.key }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" :rows="3" size="medium" v-model="activityForm.memo" style="width: 90%" maxlength="500"
                show-word-limit>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
      <el-button type="primary" style="margin-top: 12px;" @click="submit('activityForm')" :loading="submitLoading">提交
      </el-button>
    </el-form-item>
    <el-divider></el-divider>
    <div class="desc">
      <h3>说明</h3>
      <h4><span>※&ensp;</span>活动规则</h4>
      <p>最多可配置12条规则，消费金额最大10万元</p>
      <h4><span>※&ensp;</span>消费次数</h4>
      <p>选择为有限时，必须填写可消费的最大次数（1次~10000次）</p>
      <h4></h4>
    </div>

    <el-dialog :visible.sync="redPacketDialog" width="800" title="选择红包">
      <el-tabs v-model="active">
        <el-tab-pane label="选择红包" name="first">
          <div>
            <el-input v-model="queryParams.unionQuery" placeholder="红包名称/批次名/批次号" size="small" style="width: 30%"/>&ensp;
            <el-button size="small" type="primary" @click="searchRedPackets">查 询</el-button>
            <el-button size="small" @click="resetRedPackets">重 置</el-button>
          </div>
          <div style="margin-top: 10px;width: 100%">
            <!--表格内容栏-->
            <el-table
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :data="tableData"
              size="mini"
              border
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40" style="text-align: center"></el-table-column>
              <el-table-column prop="batchNo" label="红包批次号" align="center" width="140"></el-table-column>
              <el-table-column prop="batchName" label="红包批次名" align="center" width="140"></el-table-column>
              <el-table-column prop="redPacketName" label="红包名称" align="center"></el-table-column>
              <el-table-column prop="money" label="红包金额" align="center">
                <template slot-scope="scope">
                  <span style="color: red; font-weight: bold">{{ scope.row.money }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="totalCount" label="红包个数" align="center">
                <template slot-scope="scope">
                  <span style="color: #409EFF; font-weight: bold;">{{
                      scope.row.totalCount === undefined ? '--' : scope.row.totalCount
                    }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="surplusCount" label="剩余量" align="center">
                <template slot-scope="scope">
                  <span style="color: #409EFF; font-weight: bold;">{{
                      scope.row.surplusCount === undefined ? '--' : scope.row.surplusCount
                    }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[30, 50, 100, 200]"
        :current-page="queryParams.page"
        :page-size="queryParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <div>
          <el-button size="medium" @click="redPacketDialog = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="confirmRedPacket">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {ActivityAdminService} from "@/service/marketing/activity/ActivityAdminService";
import {RedPacketAdminService} from "@/service/marketing/tools/RedPacketAdminService";
import {CommonService} from "@/service/common/CommonService";
import {OilGunService} from "@/service/system/station/OilGunService";
import * as formatter from "@/utils/formatter";

export default {
  name: "ConsumeCashBackRule",
  props: ['oper', 'parentForm'],
  data() {
    return {
      activityForm: {
        stationIdArr: [],
        productSkuArr: [],
        joinLimit: undefined,
        limits: undefined,
        payGroundArr: [],
        rcRuleAddUpdateDTOs: [{rechargeMoneyDown: undefined, rpBatchId: undefined, redPacketName: '选择红包'}],
        memo: undefined,
      },
      redPacketDialog: false,
      stations: [],
      skus: [],
      payGrounds: [],
      active: 'first',
      currentRuleIndex: undefined,
      selectRows: [],
      tableData: [],
      pageIndex: 1,
      pageSize: 30,
      total: 0,
      queryParams: {
        page: 1,
        limit: 30,
        related: 0,
        rpBatchStates: [1],
        unionQuery: undefined,
      },
      submitLoading: false,
    }
  },
  mounted() {
    this.activityAdminService = new ActivityAdminService();
    this.initSelectData();
    this.stationList();
    this.activityForm = Object.assign(this.activityForm, this.parentForm);
  },
  methods: {
    formatDate(time) {
      return formatter.formatDate(time);
    },
    initSelectData() {
      const that = this;

      const param = [{
        enumKey: "payGrounds",
        enumValue: "EnumPayGround",
      }];
      new CommonService().findEnumExcludeAll('station', param).then(response => {
        that.payGrounds = response.payGrounds;
      });

      new OilGunService().productSkuList().then(response => {
        that.skus = response;
      });
    },
    stationList() {
      new OilGunService().stationList().then(response => {
        this.stations = response;
      });
    },
    addActivityRule() {
      this.activityForm.rcRuleAddUpdateDTOs.push({
        rechargeMoneyDown: undefined,
        rpBatchId: undefined,
        redPacketName: '选择红包'
      });
      this.$forceUpdate();
    },
    delActivityRule(index) {
      this.activityForm.rcRuleAddUpdateDTOs.splice(index, 1);
      this.$forceUpdate();
    },
    before() {
      this.$emit('before');
    },
    submit() {
      if (this.activityForm.stationIdArr == undefined || this.activityForm.stationIdArr.length == 0) {
        this.$message({
          message: '油/气站不能为空',
          type: 'warning'
        });
        return false;
      }
      if (this.activityForm.productSkuArr == undefined || this.activityForm.productSkuArr.length == 0) {
        this.$message({
          message: '可用油品不能为空',
          type: 'warning'
        });
        return false;
      }
      if (this.activityForm.rcRuleAddUpdateDTOs == undefined) {
        this.$message({
          message: '活动规则不能为空',
          type: 'warning'
        });
        return false;
      }
      const rules = this.activityForm.rcRuleAddUpdateDTOs;
      for (let i = 0; i < rules.length; i++) {
        if (rules[i].rechargeMoneyDown == undefined || rules[i].rpBatchId == undefined || rules[i].rechargeMoneyDown == 0.00 || rules[i].rpBatchId == '') {
          this.$message({
            message: '请完善活动规则配置',
            type: 'warning'
          });
          return false;
          break;
        }
      }
      if (this.activityForm.joinLimit == undefined) {
        this.$message({
          message: '消费次数不能为空',
          type: 'warning'
        });
        return false;
      }
      if (this.activityForm.joinLimit == '1' && (this.activityForm.limits == '' || this.activityForm.limits == undefined)) {
        this.$message({
          message: '消费次数不能为空',
          type: 'warning'
        });
        return false;
      }
      if (this.activityForm.payGroundArr == undefined || this.activityForm.payGroundArr.length == 0) {
        this.$message({
          message: '收款方式不能为空',
          type: 'warning'
        });
        return false;
      }

      if (this.activityForm.memo !== undefined && this.activityForm.memo.length > 500) {
        this.$message({
          message: '备注不能超过500字',
          type: 'warning'
        });
        return false;
      }

      // 活动用户
      if (this.activityForm.userScopeType != 3) {
        delete this.activityForm.userScopeRuleId;
      }
      // 充值次数: 无限
      if (this.activityForm.joinLimit != 0) {
        this.activityForm.joinLimit = this.activityForm.limits;
      }
      delete this.activityForm.limits;

      this.submitLoading = true;
      if (this.oper === 'ADD') {
        this.activityAdminService.addActivity(this.activityForm)
          .then(response => {
            let result = {
              success: undefined,
              msg: undefined,
            }
            if (response.success === true) {
              result.success = true;
              this.resetActivityForm();
            } else {
              result = {
                success: false,
                msg: response.message,
              };
            }
            // 调用父页面提交
            this.submitLoading = false;
            this.$emit('submit', result);
          });
      } else {
        this.activityAdminService.updateActivity(this.activityForm)
          .then(response => {
            let result = {
              success: undefined,
              msg: undefined,
            }
            if (response.success === true) {
              result.success = true;
              this.resetActivityForm();
            } else {
              result = {
                success: false,
                msg: response.message,
              };
            }
            // 调用父页面提交
            this.submitLoading = false;
            this.$emit('submit', result);
          });
      }
    },
    resetActivityForm() {
      this.activityForm = {
        cardTypeArr: [],
        joinLimit: undefined,
        limits: undefined,
        payGroundArr: [],
        rcRuleAddUpdateDTOs: [{rechargeMoneyDown: undefined, rpBatchId: undefined, redPacketName: '选择红包'}],
        memo: undefined,
      };
    },
    showRedPacketDialog(index) {
      this.currentRuleIndex = index;
      this.redPacketDialog = true;

      this.queryParams = {
        page: 1,
        limit: 30,
        related: 0,
        rpBatchStates: [1],
        unionQuery: undefined,
      };
      this.getList();
    },
    handleSelectionChange(val) {
      this.selectRows = val;
    },
    searchRedPackets() {
      this.getList();
    },
    resetRedPackets() {
      this.queryParams = {
        page: 1,
        limit: 30,
        related: 0,
        rpBatchStates: [1],
        unionQuery: undefined,
      };
      this.getList();
    },
    confirmRedPacket() {
      if (this.selectRows.length === 0 || this.selectRows.length > 1) {
        this.$message({
          message: '请选择一条红包记录',
          type: 'warning'
        });
        return false;
      }
      this.activityForm.rcRuleAddUpdateDTOs[this.currentRuleIndex].redPacketName = this.selectRows[0].redPacketName;
      this.activityForm.rcRuleAddUpdateDTOs[this.currentRuleIndex].rpBatchId = this.selectRows[0].id;
      this.redPacketDialog = false;
    },
    getList() {
      new RedPacketAdminService().rpBatchList(this.queryParams)
        .then(response => {
          this.tableData = response.rows;
          this.total = parseInt(response.total);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.queryParams.limit = val;
      this.getList(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.queryParams.page = val;
      this.getList(this.queryParams);
    },
  }
}
</script>

<style scoped>
.page {
  background: #ebebeb;
  text-align: right;
  padding: 6px;
}

.desc {
  width: 100%;
  padding: 0 20px;
  color: rgba(0, 0, 0, .45);
}

.desc h3 {
  margin: 0 0 12px;
  color: rgba(0, 0, 0, .45);
  font-size: 16px;
  line-height: 32px;
  font-weight: 500;
}

.desc h4 {
  margin: 0 0 4px;
  color: rgba(0, 0, 0, .45);
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
}

.desc p {
  margin-top: 0;
  margin-bottom: 12px;
  line-height: 22px;
}
</style>
