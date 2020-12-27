<template>
  <div>
    <!--表格内容栏-->
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom: 40px;"
      @selection-change="handleSelectionChange"
      v-loading="dataListLoading"
    >
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" min-width="110">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleCheck(scope.row)" size="mini">查看</el-link>&ensp;
          <el-link type="danger" :underline="false" @click="handleRefund(scope.row)" size="mini" v-if="scope.row.orderState === 2 && scope.row.rechargeMoney > 0 && scope.row.totalBalance > 0 && scope.row.refundState == 1">退款&ensp;
          </el-link>
          <el-link type="danger" :underline="false" @click="handleRepeal(scope.row)" size="mini"
                   v-if="scope.row.repealFlag === 1 && scope.row.orderState == 2 && scope.row.orderType == 2 && scope.row.refundState == 1 && scope.row.totalBalance > 0">撤销
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="outTradeNo" label="订单号" min-width="150" align="center"></el-table-column>
      <el-table-column label="会员昵称" min-width="120" align="center">
        <template slot-scope="scope">
          <router-link
            class="el-link el-link--primary"
            :to="{ path: '/member/electron/members', query: { memberId: scope.row.memberId } }"
            type="primary"
            :underline="false"
            size="small"
          >{{ scope.row.nickname }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="手机号" min-width="100" align="center">
        <template slot-scope="scope">
          <router-link
            class="el-link el-link--primary"
            :to="{ path: '/member/electron/members', query: { memberId: scope.row.memberId } }"
            type="primary"
            :underline="false"
            size="small"
            style="font-size: 12px;"
          >{{ scope.row.mobile }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="cardTypeName" min-width="100" label="会员卡类型" align="center"></el-table-column>
      <el-table-column prop="rechargeMoney" label="充值金额（元）" min-width="110" align="center">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{ formatNumber(scope.row.rechargeMoney) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="giftMoney" label="赠送金额（元）" min-width="110" align="center">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold" v-if="null != scope.row.giftMoney && scope.row.giftMoney > 0">{{ formatNumber(scope.row.giftMoney) }}</span>
          <span style="color: red; font-weight: bold" v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderTypeName" label="线上/线下" align="center" min-width="80"></el-table-column>
      <el-table-column prop="createdAt" label="支付时间" align="center" min-width="150"></el-table-column>
      <el-table-column prop="rechargeTypeName" label="支付渠道" align="center" min-width="70"></el-table-column>
      <el-table-column prop="payStateName" label="付款状态" align="center" min-width="70"></el-table-column>
      <el-table-column prop="orderStateName" label="订单状态" align="center" min-width="70"></el-table-column>
      <el-table-column prop="refundStateName" label="退款状态" align="center" min-width="70"></el-table-column>
      <el-table-column prop="activityName" label="活动来源" align="center" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.activityId === undefined" style="color: #409EFF;">---</span>
          <template v-else v-for="(item, index) in scope.row.activityName.split(',')">
            <router-link class="el-link el-link--primary" :to="{ path: '/marketing/activity/ActivityAdmin', query: { id: scope.row.activityId.split(',')[index] } }" type="primary" :underline="false" size="small">{{item}}
            </router-link>
            <span v-if="index < scope.row.activityId.split(',').length - 1">,</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fixed-bottom-page"
      small
      :current-page="pageIndex"
      :page-sizes="[30, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    ></el-pagination>
    <!--充值详情-->
    <el-drawer :visible.sync="checkDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">充值详情&ensp;></span>
      <el-tag type="info" effect="dark" class="chouti-tou">
        <span v-if="this.checkInfo.orderType == 2">人工充值</span>
        <span v-else>自助充值</span>
      </el-tag>
      <div style="margin-top: 20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.outTradeNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员姓名</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.name }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.nickname }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.mobile }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.cardTypeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.cardNo }}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">充值金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{ formatNumber(this.checkInfo.rechargeMoney) }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">赠送金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span
                style="color: red; font-weight: bold"
                v-if="null != this.checkInfo.giftMoney && this.checkInfo.giftMoney > 0"
              >{{ formatNumber(this.checkInfo.giftMoney) }} 元</span>
              <span style="color: red; font-weight: bold" v-else>0 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">当前余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{ formatNumber(this.checkInfo.totalBalance) }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">活动来源</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: #409EFF">{{ null != this.checkInfo.activityName && '' != this.checkInfo.activityName ? this.checkInfo.activityName : '--' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">线上/线下</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.orderTypeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付渠道</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.rechargeTypeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.createdAt }}</div>
          </el-col>
        </el-row>
        <template v-if="this.checkInfo.orderType == 2">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">备注</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.checkInfo.applyMemo }}</div>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">审核状态</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.checkInfo.applyState === 2 ? '人工审核通过' : '自动审核通过' }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">发起人</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.checkInfo.applyEmployeName }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">审核人</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.checkInfo.checkEmployeeName }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">审核时间</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.checkInfo.checkTime }}</div>
            </el-col>
          </el-row>
        </template>
        <template v-if="this.checkInfo.refundState == 3">
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">退款状态</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">全部退款</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">退款金额</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">
                充值：<span style="color: red; font-weight: bold">{{ formatNumber(this.refundFinish.rechargeMoney) }} 元</span> /
                赠送：<span style="color: red; font-weight: bold">{{(null != this.refundFinish.giftMoney && this.refundFinish.giftMoney > 0) ? formatNumber(this.refundFinish.giftMoney) : '0' }} 元</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">操作人</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.refundFinish.operatorName }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">退款时间</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.refundFinish.createdAt }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">备注</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.refundFinish.memo }}</div>
            </el-col>
          </el-row>
        </template>
        <template v-if="this.checkInfo.orderState == 3">
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">订单状态</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">已撤销</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">撤销金额</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">
                充值：<span style="color: red; font-weight: bold">{{ formatNumber(this.repealFinish.rechargeMoney) }} 元</span> /
                赠送：<span style="color: red; font-weight: bold">{{(null != this.repealFinish.giftMoney && this.repealFinish.giftMoney > 0) ? formatNumber(this.repealFinish.giftMoney) : '0' }} 元</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">操作人</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.repealFinish.operatorName }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">撤销时间</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.repealFinish.repealDate }}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content-right">备注</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content-left">{{ this.repealFinish.memo }}</div>
            </el-col>
          </el-row>
        </template>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: center; margin-top: 20px;">
            <el-button @click="checkDrawer = false" size="medium" style="width: 100%;">取 消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>

    <!-- 撤销 -->
    <el-drawer :visible.sync="repealDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">撤销&ensp;></span>
      <div style="margin-top: 20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.outTradeNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员姓名</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.name }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.nickname }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.mobile }}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.cardTypeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.cardNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">充值金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{ formatNumber(this.checkInfo.rechargeMoney) }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">赠送金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span
                style="color: red; font-weight: bold"
                v-if="null != this.checkInfo.giftMoney && this.checkInfo.giftMoney > 0"
              >{{ formatNumber(this.checkInfo.giftMoney) }} 元</span>
              <span style="color: red; font-weight: bold" v-else>0 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">当前余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold">{{ formatNumber(this.checkInfo.totalBalance) }} 元</span>
              <br>
              (主卡：<span style="color: red; font-weight: bold">{{formatNumber(this.checkInfo.cashBalance)}} 元</span> /
              副卡：<span style="color: red; font-weight: bold">{{formatNumber(this.checkInfo.giftBalance)}} 元</span>)
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">线上/线下</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.orderTypeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付渠道</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.rechargeTypeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ this.checkInfo.createdAt }}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">撤销金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              充值：<span style="color: red; font-weight: bold">{{ formatNumber(this.checkInfo.rechargeMoney) }} 元</span> /
              赠送：<span style="color: red; font-weight: bold">{{(null != this.checkInfo.giftMoney && this.checkInfo.giftMoney > 0) ? formatNumber(this.checkInfo.giftMoney) : '0' }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right"><span style="color: red">* </span>备注</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <el-input type="textarea" size="small" v-model="repealForm.memo" style="width: 100%"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="text-align: center; margin-top: 20px;">
          <el-col :span="12">
            <el-button @click="repealDrawer = false" size="medium" style="width: 100%;">取 消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click="confirmRepeal" type="primary" size="medium" style="width: 100%;">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <!-- 撤销确认提示 -->
    <el-dialog :visible.sync="repealDialogVisible" width="30%" center>
      <div style="text-align: center; font-size: 16px; font-weight: bold;">撤销信息确认</div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">订单号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.checkInfo.outTradeNo}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员昵称</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.checkInfo.nickname}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">手机号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.checkInfo.mobile}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">是否SVIP</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span v-if="this.checkInfo.svip == 0">否</span>
            <span v-else>是&nbsp;{{this.checkInfo.svipName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员卡类型</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.checkInfo.cardTypeName}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员卡号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.checkInfo.cardNo}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">撤销金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            充值：<span style="color: red; font-weight: bold">{{ formatNumber(this.checkInfo.rechargeMoney) }} 元</span> /
            赠送：<span style="color: red; font-weight: bold">{{(null != this.checkInfo.giftMoney && this.checkInfo.giftMoney > 0) ? formatNumber(this.checkInfo.giftMoney) : '0' }} 元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">备注</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.repealForm.memo}}
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="repealDialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitRepeal" size="medium">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 退款 -->
    <el-drawer :visible.sync="refundDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">退款&ensp;></span>
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <div class="grid-content-right">订单号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.outTradeNo}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员昵称</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.nickname}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">姓名</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.name}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">手机号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.mobile}}
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员卡类型</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.cardTypeName}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员卡号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.cardNo}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">充值金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span style="color: red; font-weight: bold">{{formatNumber(this.refundInfo.rechargeMoney)}} 元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">赠送金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span style="color: red; font-weight: bold" v-if="null != this.refundInfo.giftMoney && this.refundInfo.giftMoney > 0">{{formatNumber(this.refundInfo.giftMoney)}} 元</span>
            <span style="color: red; font-weight: bold" v-else>0 元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">当前余额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span style="color: red; font-weight: bold">{{ formatNumber(this.refundInfo.totalBalance) }} 元</span>
            <br>
            (主卡：<span style="color: red; font-weight: bold">{{formatNumber(this.refundInfo.cashBalance)}} 元</span> /
            副卡：<span style="color: red; font-weight: bold">{{formatNumber(this.refundInfo.giftBalance)}} 元</span>)
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">支付渠道</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.rechargeTypeName}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">支付时间</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.createdAt}}
          </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">
            退款金额
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            充值：<span style="color: red; font-weight: bold">{{ formatNumber(this.refundInfo.rechargeMoney) }} 元</span> /
            赠送：<span style="color: red; font-weight: bold">{{(null != this.refundInfo.giftMoney && this.refundInfo.giftMoney > 0) ? formatNumber(this.refundInfo.giftMoney) : '0' }} 元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 10px;">
        <el-col :span="8">
          <div class="grid-content-right"><span style="color: red">* </span>备注</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <el-input type="textarea" size="small" v-model="refundForm.memo" style="width: 100%"/>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="text-align: center; margin-top: 20px;">
        <el-col :span="12">
          <el-button @click="refundDrawer = false" size="medium" style="width: 100%;">取 消</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="submitRefundForm('refundForm')" type="primary" size="medium" style="width: 100%;">确 定</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 退款确认提示 -->
    <el-dialog title="提示" :visible.sync="refundDialogVisible" width="30%" center>
      <div style="text-align: center; font-size: 16px; font-weight: bold;">退款信息提示</div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">订单号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.outTradeNo}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员昵称</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.nickname}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">手机号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.mobile}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">是否SVIP</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span v-if="this.refundInfo.svip == 0">否</span>
            <span v-else>是&nbsp;{{ this.refundInfo.svipName }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员卡类型</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.cardTypeName}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">会员卡号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundInfo.cardNo}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">当前余额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span style="color: red; font-weight: bold">{{ formatNumber(this.refundInfo.totalBalance) }} 元</span>
            <br>
            (主卡：<span style="color: red;">{{ formatNumber(this.refundInfo.cashBalance) }} 元</span> / 副卡：<span style="color: red;">{{formatNumber(this.refundInfo.giftBalance)}} 元</span>)
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">退款金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            充值：<span style="color: red; font-weight: bold">{{ formatNumber(this.refundInfo.rechargeMoney) }} 元</span> /
            赠送：<span style="color: red; font-weight: bold">{{(null != this.refundInfo.giftMoney && this.refundInfo.giftMoney > 0) ? formatNumber(this.refundInfo.giftMoney) : '0' }} 元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">备注信息</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            {{this.refundForm.memo}}
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="refundDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submitRefund()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 换卡 -->
    <el-drawer :visible.sync="changeCardDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #97a8be;">换卡&ensp;></span>
      <el-form
        :model="changeCardForm"
        ref="changeCardForm"
        label-width="100px"
        style="color: #97a8be; margin-top: 10px;"
      >
        <el-form-item label="订单号">{{ this.changeCardInfo.outTradeNo }}</el-form-item>
        <el-form-item label="会员昵称">{{ this.changeCardInfo.nickname }}</el-form-item>
        <el-form-item label="手机号">{{ this.changeCardInfo.mobile }}</el-form-item>
        <el-divider></el-divider>
        <el-form-item label="会员卡类型">{{ this.changeCardInfo.cardTypeName }}</el-form-item>
        <el-form-item label="会员卡号">{{ this.changeCardInfo.cardNo }}</el-form-item>
        <el-form-item label="充值金额">
          <span style="color: red; font-weight: bold">{{ this.changeCardInfo.rechargeMoney }}</span>
          元
        </el-form-item>
        <el-form-item label="赠送金额">
          <span
            style="color: red; font-weight: bold"
            v-if="null != this.changeCardInfo.giftMoney && this.changeCardInfo.giftMoney > 0"
          >{{ this.changeCardInfo.giftMoney }} 元</span>
          <span v-else>---</span>
        </el-form-item>
        <el-form-item label="当前余额">
          <span style="color: red; font-weight: bold">{{ this.changeCardInfo.totalBalance }}</span>
          元 （主
          <span style="color: red;">{{ this.changeCardInfo.cashBalance }}</span>
          元/ 副
          <span style="color: red;">{{ this.refundInfo.giftBalance }}</span>
          元）
        </el-form-item>
        <el-form-item label="支付渠道">{{ this.changeCardInfo.rechargeTypeName }}</el-form-item>
        <el-form-item label="支付时间">{{ this.changeCardInfo.createdAt }}</el-form-item>
        <el-form-item label="备注">{{ this.changeCardInfo.memo }}</el-form-item>
        <el-divider></el-divider>
        <el-form-item label="更换卡号">
          <el-tooltip
            content="换卡规则：1. 可换卡订单：充值且未消费的充值订单；2. 更换卡号：同一个用户下的其他卡号。"
            placement="bottom"
            effect="light"
          >
            <i class="el-icon-warning"></i>
          </el-tooltip>
          <el-input v-model="changeCardForm.changeCardNo" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="cancelChangeCardForm('changeCardForm')"
            size="small"
            style="width: 120px;"
          >取消
          </el-button>
          <el-button
            type="primary"
            @click="submitChangeCardForm('changeCardForm')"
            size="small"
            style="width: 120px;"
          >提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  import {RechargeOrderService} from "@/service/trade/recharge/RechargeOrderService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "ManagementTable",
    data() {
      return {
        rechargeOrderService: null,

        pageIndex: 1,
        pageSize: 30,
        totalPage: 0,
        dataListLoading: false,
        tableData: [],
        dataForm: {},

        checkDrawer: false,
        checkInfo: {},
        refundFinish: {
          rechargeMoney: undefined,
          giftMoney: undefined,
          operatorName: undefined,
          createdAt: undefined,
          memo: undefined,
        },
        repealFinish: {
          rechargeMoney: undefined,
          giftMoney: undefined,
          operatorName: undefined,
          repealDate: undefined,
          memo: undefined,
        },

        refundDialogVisible: false,
        refundDrawer: false,
        refundInfo: {},
        refundForm: {
          refundMoney: undefined,
          memo: undefined,
        },
        rebateByManualDrawer: false,
        rebateByManualInfo: {},
        rebateByManualForm: {
          rebateMoney: undefined,
        },
        changeCardDrawer: false,
        changeCardInfo: {},
        changeCardForm: {
          changeCardNo: undefined
        },

        repealDrawer: false,
        repealDialogVisible: false,
        repealForm: {
          memo: undefined,
        }
      };
    },
    mounted() {
      // zlw ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.dateNo) {
        this.dataForm.rechargeDateStart = this.$route.query.dateNo;
        this.dataForm.rechargeDateEnd = this.$route.query.dateNo;
      }
      // caiyu ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.memberId) {
        this.dataForm.memberId = this.$route.query.memberId;
      }
      this.rechargeOrderService = new RechargeOrderService();
      // 初始化默认支付状态为"已完成",订单状态为"已完成"
      this.dataForm.payState = '2';
      this.dataForm.orderState = '2';
      this.getList(this.dataForm);
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
      },
      getList(params) {
        this.dataForm = params;
        this.dataListLoading = true;
        this.dataForm.page = this.pageIndex;
        this.dataForm.limit = this.pageSize;
        this.rechargeOrderService.pagingRechargeOrders(this.dataForm).then(response => {
          this.tableData = response.rows;
          this.totalPage = parseInt(response.total);
          this.dataListLoading = false;

        });
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getList(this.dataForm);
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val;
        this.getList(this.dataForm);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 点击详情
      handleCheck(row) {
        this.repealFinish = {
          rechargeMoney: undefined,
          giftMoney: undefined,
          operatorName: undefined,
          repealDate: undefined,
          memo: undefined,
        };
        this.refundFinish = {
          rechargeMoney: undefined,
          giftMoney: undefined,
          operatorName: undefined,
          createdAt: undefined,
          memo: undefined,
        };

        this.checkInfo = row;
        // 撤销订单
        if (row.orderState === 3) {
          this.rechargeOrderService.getRepealInfoByRechargeOrderId(row.id).then(response => {
            if (response.success) {
              this.repealFinish = response.data === undefined ? {
                rechargeMoney: undefined,
                giftMoney: undefined,
                operatorName: undefined,
                repealDate: undefined,
                memo: undefined,
              } : response.data;
            } else {
              this.$message.error(response.message);
            }
          });
        }

        // 退款订单
        if (row.refundState == 3) {
          this.rechargeOrderService.getRefundInfoByRechargeOrderId(row.id).then(response => {
            if (response.success) {
              this.refundFinish = response.data === undefined ? {
                rechargeMoney: undefined,
                giftMoney: undefined,
                operatorName: undefined,
                createdAt: undefined,
                memo: undefined,
              } : response.data;

            } else {
              this.$message.error(response.message);
            }
          });
        }

        this.checkDrawer = true;
      },
      // 点击退款
      handleRefund(row) {
        this.refundInfo = row;
        this.refundForm.refundMoney = undefined;
        this.refundForm.memo = undefined;
        this.refundDrawer = true;
      },
      handleChangeCard(row) {
        this.changeCardInfo = row;
        this.changeCardDrawer = true;
      },
      // 退款提交 - 弹出确认单
      submitRefundForm(form) {
        if (this.refundForm.memo === undefined || this.refundForm.memo === '') {
          this.$message.error("请输入备注");
          return false;
        }
        this.refundDialogVisible = true;
      },
      // 退款提交
      submitRefund() {
        this.rechargeOrderService.refundRechargeOrder(this.refundForm, this.refundInfo.id).then(response => {
          if (response.success) {
            this.$message({
              message: response.message,
              type: "success"
            });
            this.getList(this.dataForm);
            this.refundDrawer = false;
            this.refundDialogVisible = false;
          } else {
            this.$message.error(response.message);
          }
        });
      },
      submitChangeCardForm(form) {
        this.changeCardDrawer = false;
      },
      cancelChangeCardForm(form) {
        this.$refs[form].resetFields();
        this.changeCardDrawer = false;
      },
      rechargeOrderExport(queryParams) {
        this.rechargeOrderService.rechargeOrderExport(queryParams).then(response => {
          window.location.href = response.data;
        });
      },
      handleRepeal(row) {
        this.checkInfo = row;
        this.repealForm.memo = undefined;
        this.repealDrawer = true;
      },
      confirmRepeal() {
        if (this.repealForm.memo === undefined || this.repealForm.memo === '') {
          this.$message({
            message: '请输入备注',
            type: "warning"
          });
          return;
        }

        this.repealDialogVisible = true;
      },
      submitRepeal() {
        this.rechargeOrderService.repealRechargeOrder(this.repealForm, this.checkInfo.id).then(response => {
          if (response.success) {
            this.$message({
              message: response.message,
              type: "success"
            });
            this.getList(this.dataForm);
            this.repealDrawer = false;
            this.repealDialogVisible = false;
          } else {
            this.$message.error(response.message);
          }
        });
      }
    }
  };
</script>
<style lang="scss">
  .chouti-tou {
    width: 110px;
    height: 40px;
    float: right;
    border-radius: 0;
    margin: -20px -20px 0 0;
    line-height: 40px;
    text-align: center;
    font-size: 13px;
  }

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
