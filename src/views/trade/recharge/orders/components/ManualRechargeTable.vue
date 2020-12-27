<template>
  <div>
    <!--表格内容栏-->
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="tableData" size="mini" border
              ref="multipleTable"
              tooltip-effect="dark" style="width: 100%; margin-bottom: 40px;" @selection-change="handleSelectionChange"
              v-loading='dataListLoading'>
      <el-table-column type="selection" width="40" style="text-align: center;">
      </el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="100">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleCheck(scope.row)" size="small">查看</el-link>&ensp;
          <el-link type="danger" v-if="scope.row.applyState == 1" :underline="false" @click="handleAudit(scope.row)" size="small">审核
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="outTradeNo" label="订单号" min-width="180" align="center">
      </el-table-column>
      <el-table-column prop="nickname" label="会员昵称" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="cardTypeName" label="会员卡类型" align="center" min-width="110">
      </el-table-column>
      <el-table-column prop="rechargeMoney" label="充值金额（元）" align="center" min-width="105">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{formatNumber(scope.row.rechargeMoney)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="giftMoney" label="赠送金额（元）" align="center" min-width="105">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold" v-if='null != scope.row.giftMoney && scope.row.giftMoney>0'>{{formatNumber(scope.row.giftMoney)}}</span>
          <span style="color: red; font-weight: bold" v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column prop="applyStateName" label="审核状态" align="center" min-width="110">
      </el-table-column>
      <el-table-column prop="activityName" label="活动来源" align="center">
        <template slot-scope="scope">
          <span v-if="null != scope.row.activityName && '' != scope.row.activityName">{{scope.row.activityName}}
          </span>
          <span v-else>---</span>
        </template>
      </el-table-column>
      <el-table-column prop="applyEmployeName" label="操作人" align="center" width="120">
      </el-table-column>
      <el-table-column prop="createdAt" label="支付时间" align="center" min-width="150">
      </el-table-column>
    </el-table>
    <el-pagination class="fixed-bottom-page" small :current-page="pageIndex" :page-sizes="[30, 50, 100, 200]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="totalPage" @size-change="sizeChangeHandle"
                   @current-change="currentChangeHandle"></el-pagination>

    <el-drawer :visible.sync="checkDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">人工充值详情&ensp;></span>
      <div style="margin-top: 20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.outTradeNo}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">姓名</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.name}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.nickname}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.mobile}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.memberTypeName}}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.cardTypeName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.cardNo}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">充值金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{formatNumber(this.checkInfo.rechargeMoney)}} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">赠送金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold" v-if='null != this.checkInfo.giftMoney && this.checkInfo.giftMoney>0'>{{formatNumber(this.checkInfo.giftMoney)}} 元</span>
              <span style="color: red; font-weight: bold" v-else>0</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">当前余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{formatNumber(this.checkInfo.totalBalance)}}</span> 元
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">活动来源</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span v-if="null != this.checkInfo.activityName && '' != this.checkInfo.activityName">{{this.checkInfo.activityName}}</span>
              <span v-else>---</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">线上/线下</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              线下
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付渠道</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.rechargeTypeName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.createdAt}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">操作人</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.applyEmployeName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">备注</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.memo}}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20" v-if="this.checkInfo.applyState == 2 || this.checkInfo.applyState == 4">
          <el-col :span="8">
            <div class="grid-content-right">审核人</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.checkEmployeeName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">审核状态</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.applyStateName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="this.checkInfo.applyState == 2 || this.checkInfo.applyState == 4 || this.checkInfo.applyState == 3">
          <el-col :span="8">
            <div class="grid-content-right">审核时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.checkTime}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">备注</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.checkInfo.checkMemo}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" align="center" style="margin-top: 20px;">
            <el-button @click="checkDrawer=false" size="medium" style="width: 100%">取 消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <el-drawer :visible.sync="auditDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">审核&ensp;></span>
      <div style="margin-top: 20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.outTradeNo}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">姓名</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.name}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.nickname}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.mobile}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.memberTypeName}}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.cardTypeName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.cardNo}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">实充金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{formatNumber(this.auditInfo.rechargeMoney)}}</span> 元
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">赠送金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold" v-if='null != this.auditInfo.giftMoney && this.auditInfo.giftMoney>0'>{{formatNumber(this.auditInfo.giftMoney)}} 元</span>
              <span style="color: red; font-weight: bold" v-else>0</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">当前余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{formatNumber(this.auditInfo.totalBalance)}} 元</span>
              <br>
              （主<span style="color: red;">{{formatNumber(this.auditInfo.cashBalance)}}</span>元 / 副<span style="color: red;">{{formatNumber(this.auditInfo.giftBalance)}}</span>元）
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">充值后余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold;">{{formatNumber(this.auditInfo.totalBalance + this.auditInfo.rechargeMoney + this.auditInfo.giftMoney)}} 元</span>
              <br>
              （主<span style="color: red;">{{formatNumber(this.auditInfo.cashBalance + this.auditInfo.rechargeMoney)}}</span>元 / 副<span style="color: red;">{{formatNumber(this.auditInfo.giftBalance + this.auditInfo.giftMoney)}}</span>元）
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付渠道</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.rechargeTypeName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.createdAt}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">备注</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.memo}}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">操作人</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{this.auditInfo.applyEmployeName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">备注</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <el-input type="textarea" size="small" v-model="auditForm.checkMemo" style="width: 100%"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 20px;">
          <el-col :span="8">
            <el-button type="primary" @click="submitPoassAuditForm('auditForm')" size="medium" style="width: 100%;">通过</el-button>
          </el-col>
          <el-col :span="8">
            <el-button @click="submitNoPoassAuditForm('auditForm')" type="danger" size="medium" style="width: 100%;">不通过</el-button>
          </el-col>
          <el-col :span="8">
            <el-button @click="cancelAuditForm('auditForm')" size="medium" style="width: 100%;">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <!-- 确认提示 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
      <div style="text-align: center; font-size: 16px; font-weight: bold;">审核信息确认</div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员昵称</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.auditInfo.nickname}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">手机号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.auditInfo.mobile}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">是否SVIP</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span v-if="this.auditInfo.svip == 0">否</span>
            <span v-else>是&nbsp;{{this.auditInfo.svipName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员类型</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.auditInfo.memberTypeName}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员卡类型</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.auditInfo.cardTypeName}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员卡号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.auditInfo.cardNo}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">支付渠道</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.auditInfo.rechargeTypeName}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">充值金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span style="color: red; font-weight: bold">{{formatNumber(this.auditInfo.rechargeMoney)}} 元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">赠送金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span style="color: red; font-weight: bold" v-if='null != this.auditInfo.giftMoney && this.auditInfo.giftMoney>0'>{{formatNumber(this.auditInfo.giftMoney)}} 元</span>
            <span style="color: red; font-weight: bold" v-else>0 元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">备注信息</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.auditForm.checkMemo}}
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="middle">取 消</el-button>
        <el-button type="primary" @click="submitAudit('y')" size="middle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    RechargeApplyService
  } from '@/service/trade/recharge/RechargeApplyService';
  import * as formatter from "@/utils/formatter";

  export default {
    name: "ManualRechargeTable",
    data() {
      return {
        rechargeApplyService: null,
        pageIndex: 1,
        pageSize: 30,
        totalPage: 0,
        dataListLoading: false,
        tableData: [],
        dataForm: {},

        checkDrawer: false,
        checkInfo: {},

        auditDrawer: false,
        auditInfo: {},
        dialogVisible: false,
        auditForm: {checkMemo: ''}
      };
    },
    mounted() {
      this.rechargeApplyService = new RechargeApplyService();
      this.getDataList(this.dataForm);
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      getDataList(params) {
        this.dataForm = params;
        this.dataListLoading = true;
        this.dataForm.page = this.pageIndex;
        this.dataForm.limit = this.pageSize;
        this.rechargeApplyService.pageList(this.dataForm).then(response => {
          this.tableData = response.rows;
          this.totalPage = parseInt(response.total);
          this.dataListLoading = false;
        });
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList(this.dataForm);
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val;
        this.getDataList(this.dataForm);
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 点击详情
      handleCheck(row) {
        this.checkInfo = row;
        this.checkDrawer = true;
      },
      // 点击审批
      handleAudit(row) {
        this.auditInfo = row;
        this.auditForm.checkMemo = undefined;
        this.auditDrawer = true;
      },
      // 取消审批
      cancelAuditForm(form) {
        this.auditDrawer = false;
      },
      // 不通过
      submitNoPoassAuditForm(form) {
        // if (this.auditForm.memo == '' || undefined == this.auditForm.memo) {
        //   this.$message.error("请录入备注");
        //   return false;
        // }
        this.submitAudit('n')

      },
      // 通过
      submitPoassAuditForm(form) {
        // if (this.auditForm.memo == '' || undefined == this.auditForm.memo) {
        //   this.$message.error("请录入备注");
        //   return false;
        // }
        this.dialogVisible = true
        //this.auditDrawer = false;
      },
      // 确认提交
      submitAudit(t) {
        if ('y' == t) {//同意
          this.rechargeApplyService.acceptAudit(this.auditForm, this.auditInfo.id).then(response => {
            if (response.success) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.getDataList(this.dataForm)
              this.auditDrawer = false;
              this.dialogVisible = false
            } else {
              this.$message.error(response.message);
            }
          });
        } else if ('n' == t) {
          this.rechargeApplyService.rejecAudit(this.auditForm, this.auditInfo.id).then(response => {
            if (response.success) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.getDataList(this.dataForm)
              this.auditDrawer = false;
              this.dialogVisible = false
            } else {
              this.$message.error(response.message);
            }
          });
        }
      }
    }
  };
</script>
<style lang="scss">
  .grid-content-right {
    border-radius: 4px;
    min-height: 32px;
    line-height: 32px;
    text-align: right;
    font-weight: bold;
    color: #919191;
  }

  .grid-content-left {
    border-radius: 4px;
    min-height: 32px;
    line-height: 32px;
    text-align: left;
  }
</style>
