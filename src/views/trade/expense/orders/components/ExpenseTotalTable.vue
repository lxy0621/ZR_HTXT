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
      style="width: 100%; margin-bottom: 50px;"
      @selection-change="handleSelectionChange"
      v-loading="dataListLoading"
    >
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="220">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="handleCheck(scope.row)"
            size="small"
          >查看&ensp;
          </el-link>
          <el-link
            type="danger"
            :underline="false"
            @click="handleInvoice(scope.row)"
            size="small"
            v-if="scope.row.invoiced == 0"
          >开具发票&ensp;
          </el-link>
          <el-link
            type="primary"
            :underline="false"
            @click="handlePrinting(scope.row)"
            size="small"
          >打印小票
          </el-link>&ensp;
          <el-link
            type="success"
            :underline="false"
            @click="handleMemo(scope.row)"
            size="small"
          >备注
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="订单号" min-width="150" align="center" prop="orderNo"></el-table-column>
      <el-table-column label="会员昵称" min-width="130" align="center">
        <template slot-scope="scope">
          <router-link
            class="el-link el-link--primary"
            :to="{ path: '/member/electron/members', query: { memberId: scope.row.mbrMemberId } }"
            type="primary"
            :underline="false"
            size="small"
          >{{ scope.row.memberName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          <router-link
            class="el-link el-link--primary"
            :to="{ path: '/member/electron/members', query: { memberId: scope.row.mbrMemberId } }"
            type="primary"
            :underline="false"
            size="small"
          >{{ scope.row.mobile }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="油/气品" align="center" prop="productSkuName" min-width="80"></el-table-column>
      <el-table-column label="消费金额（元）" min-width="120" align="center">
        <template slot-scope="scope">
          <span
            style="color: red; font-weight: bold;"
          >{{ scope.row.money == undefined ? '0' : formatNumber(scope.row.money) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际支付金额（元）" min-width="150" align="center">
        <template slot-scope="scope">
          <span
            style="color: red; font-weight: bold;"
          >{{ scope.row.payMoney == undefined ? '0' : formatNumber(scope.row.payMoney) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卡券金额（元）" min-width="110" align="center">
        <template slot-scope="scope">
          <span
            style="color: red; font-weight: bold;"
          >{{ scope.row.couponMoney == undefined ? '0' : formatNumber(scope.row.couponMoney) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="加油/气员" align="center" min-width="90" prop="employeeName"></el-table-column>
      <el-table-column label="收款员" align="center" min-width="90" prop="operatorName"></el-table-column>
      <el-table-column label="油/气站" align="center" min-width="230" prop="stationName"></el-table-column>
      <el-table-column label="油/气机-油/气枪" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.oilMachineNo }}-{{ scope.row.oilGunNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" min-width="110" align="center">
        <template slot-scope="scope">
          <span v-for="item in payGrounds" :value="item.value" :key="item.value">{{'' + scope.row.payGround === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="车牌号" prop="plateNo" min-width="100" align="center"></el-table-column>
      <el-table-column label="发票状态" min-width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.invoiced == 0">未开票</span>
          <span v-if="scope.row.invoiced == 1">已开票</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center" min-width="150" prop="createdAt"></el-table-column>
      <el-table-column label="备注" align="center" min-width="200" prop="memo"></el-table-column>
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
    <!-- ---- -->
    <el-drawer :visible.sync="checkDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">消费详情&ensp;></span>
      <div style="margin-top:20px">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员ID</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.mbrMemberId }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员昵称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.memberName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.mobile }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <div v-if="orderDetail.cardType == 1" class="grid-content-left">个人卡</div>
              <div v-if="orderDetail.cardType == 2" class="grid-content-left">车队主卡</div>
              <div v-if="orderDetail.cardType == 3" class="grid-content-left">车队副卡</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.cardNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">卡余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: red; font-weight: bold;">
                {{
                orderDetail.totalBalance == undefined ? '0' : formatNumber(orderDetail.totalBalance)
                }} 元
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">加油/气员</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.employeeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">员工编号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.employeeNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气机-油/气枪</div>
          </el-col>
          <el-col :span="16">
            <div
              class="grid-content-left"
            >{{ orderDetail.oilMachineNo }}-{{ orderDetail.oilGunNo }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款人</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.operatorName }}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">订单号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.orderNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气站</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.stationName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right" v-if="orderDetail.productSkuName === 'CNG' || orderDetail.productSkuName === 'LNG'">气品</div>
            <div class="grid-content-right" v-else>油品</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.productSkuName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right" v-if="orderDetail.productSkuName === 'CNG' || orderDetail.productSkuName === 'LNG'">气价</div>
            <div class="grid-content-right" v-else>油价</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: #1e9fff; font-weight: bold;" v-if="orderDetail.productSkuName === 'CNG'">{{ formatNumber(orderDetail.unitPrice) }} 元 / 立方米</span>
              <span style="color: #1e9fff; font-weight: bold;" v-else-if="orderDetail.productSkuName === 'LNG'">{{ formatNumber(orderDetail.unitPrice) }} 元 / 公斤</span>
              <span style="color: #1e9fff; font-weight: bold;" v-else>{{ formatNumber(orderDetail.unitPrice) }} 元 / 升</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right" v-if="orderDetail.productSkuName === 'CNG' || orderDetail.productSkuName === 'LNG'">加气量</div>
            <div class="grid-content-right" v-else>加油量</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span style="color: green; font-weight: bold;" v-if="orderDetail.productSkuName === 'CNG'">
                {{ orderDetail.amount == undefined ? '0' : formatNumber(orderDetail.amount) }} 立方米
              </span>
              <span style="color: green; font-weight: bold;" v-else-if="orderDetail.productSkuName === 'LNG'">
                {{ orderDetail.amount == undefined ? '0' : formatNumber(orderDetail.amount) }} 公斤
              </span>
              <span style="color: green; font-weight: bold;" v-else>
                {{ orderDetail.amount == undefined ? '0' : formatNumber(orderDetail.amount) }} 升
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">消费金额</div>
          </el-col>
          <el-col :span="16">
            <div
              class="grid-content-left"
              style="color: red;font-weight: bold"
            >{{ orderDetail.money == undefined ? '0' : formatNumber(orderDetail.money) }} 元
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">实付金额</div>
          </el-col>
          <el-col :span="16">
            <div
              class="grid-content-left"
              style="color: red;font-weight: bold;"
            >{{ orderDetail.payMoney == undefined ? '0' : formatNumber(orderDetail.payMoney) }} 元
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">卡券金额</div>
          </el-col>
          <el-col :span="16">
            <div
              class="grid-content-left"
              style="color: red;font-weight: bold;"
            >{{ orderDetail.couponMoney == undefined ? '0' : formatNumber(orderDetail.couponMoney) }} 元
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">车牌号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{orderDetail.plateNo}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付方式</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span v-for="item in payGrounds" :value="item.value" :key="item.value">{{'' + orderDetail.payGround === item.value ? item.key : ''}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ orderDetail.transTime }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: center; margin-top: 20px;">
            <el-button @click="cancelCheck()" size="medium" style="width: 100%">取 消</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <!-- ---- -->
    <el-drawer :visible.sync="invoiceDrawer" :with-header="false" style="text-align: left;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">开具发票&ensp;></span>
      <el-row :gutter="20" style="margin-top:20px">
        <el-col :span="8">
          <div class="grid-content-right">订单号</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">{{ invoiceInfo.orderNo }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right" v-if="invoiceInfo.productSkuName === 'CNG' || invoiceInfo.productSkuName === 'LNG'">气品</div>
          <div class="grid-content-right" v-else>油品</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">{{ invoiceInfo.productSkuName }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">消费金额</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <span
              style="color: red; font-weight: bold;"
            >{{ invoiceInfo.money == undefined ? '0' : formatNumber(invoiceInfo.money) }} 元</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">支付时间</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">{{ invoiceInfo.createdAt }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content-right">开具发票</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content-left">
            <el-switch v-model="switchInvoice" active-value="1" inactive-value="0"></el-switch>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5" style="text-align: center; margin-top: 20px;">
        <el-col :span="12">
          <el-button @click="cancelInvoice()" size="medium" style="width: 100%;">取消</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="submitInvoice" size="medium" style="width: 100%;">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <!-- 打印小票 -->
    <el-drawer :visible.sync="ticketDrawer" :with-header="false" style="text-align: center;">
      <span style="color: #48576a; font-size: 1em; font-weight: bold">中国燃气交易凭证</span>
      <br/>
      <span style="color: #48576a; font-size: 1em; font-weight: bold">客户根存</span>
      <div style="margin-top:20px">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">站点名称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.stationName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">交易时间</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.transTime }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">终端编号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.posDeviceId }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">交易订单</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.orderNo }}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">支付类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span v-for="item in payGrounds" :value="item.value" :key="item.value">{{'' + ticketInfo.payGround === item.value ? item.key : ''}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.oilMachineNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气枪号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.oilGunNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">油/气品名称</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.productSkuName }}</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员类型</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span v-if="ticketInfo.memberType===1">个人</span>
              <span v-else>公司</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">会员卡号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.cardNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">手机号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.mobile }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">车牌号</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.plateNo }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">应收金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span
                style="color: red; font-weight: bold;"
              >{{ formatNumber(ticketInfo.money) }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">实收金额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span
                style="color: red; font-weight: bold;"
              >{{ formatNumber(ticketInfo.payMoney) }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">卡余额</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">
              <span
                style="color: red; font-weight: bold;"
              >{{ formatNumber(ticketInfo.totalBalance) }} 元</span>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">操作员</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.operatorName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content-right">收款员</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content-left">{{ ticketInfo.employeeName }}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: center; margin-top: 20px;">
            <el-button @click="toPrintCheck()" size="medium" style="width: 45%">取 消</el-button>
            <el-button type="primary" @click="toPrint()" size="medium" style="width: 45%">打 印</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
    <!-- 添加备注 -->
    <el-dialog title="提示" :visible.sync="memoDialogVisible" width="30%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="备注" name="first">
          <el-form ref="form" label-width="100px" :model="memoForm" size="small">
            <el-form-item prop="name" label="备注"><el-input type="textarea" size="small" v-model="memoForm.memo"></el-input></el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="memoDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="saveMemo">确 定</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
  import {ExpenseOrderService} from "@/service/trade/expense/ExpenseOrderService.js";
  import * as formatter from "@/utils/formatter";
  import {CommonService} from "@/service/common/CommonService";
  import {OilGunService} from "@/service/system/station/OilGunService";

  export default {
    name: "ExpenseTotalTable",
    data() {
      return {
        total: 0,
        tableData: [],
        checkDrawer: false,
        checkInfo: {},
        invoiceDrawer: false,
        invoiceInfo: {},
        ticketDrawer: false,
        ticketInfo: {},
        switchInvoice: false,
        queryParams: {
          page: 1,
          limit: 30
        },
        expenseOrder: null,
        orderDetail: {},
        orderId: 0,
        dataListLoading: false,
        activeName: 'first',
        memoForm: {},
        memoDialogVisible: false,
        payGrounds: [],
      };
    },
    mounted() {
      // zlw ,,链接跳转过来后，接收参数
      if (undefined != this.$route.query.transTime) {
        this.queryParams.expenseDateStart = this.$route.query.transTime;
        this.queryParams.expenseDateEnd = this.$route.query.transTime;
      }
      if (undefined != this.$route.query.orgEmployeeId) {
        this.queryParams.orgEmployeeId = this.$route.query.orgEmployeeId;
      }
      if (undefined != this.$route.query.memberId) {
        this.queryParams.mbrMemberId = this.$route.query.memberId;
      }

      this.service = new ExpenseOrderService();
      this.initSelectData();
      this.getList(this.queryParams);
    },
    methods: {
      formatNumber(num) {
        return formatter.formatNumber(num);
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
      },
      getList(queryParams) {
        queryParams.page == undefined
          ? (queryParams.page = 1)
          : (queryParams.page = this.queryParams.page);
        queryParams.limit == undefined
          ? (queryParams.limit = 30)
          : (queryParams.limit = this.queryParams.limit);
        this.queryParams = queryParams;
        this.dataListLoading = true;
        this.service.pagingExpenseOrder(queryParams).then(response => {
          this.tableData = response.rows;
          this.total = parseInt(response.total);
          this.dataListLoading = false;
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCheck(row) {
        let data = {
          id: row.id,
          page: 1,
          limit: 1
        };
        this.service.pagingExpenseOrder(data).then(response => {
          debugger
          this.orderDetail = response.rows[0];
        });
        this.checkDrawer = true;
      },
      cancelCheck() {
        this.checkDrawer = false;
      },
      handlePrinting(row) {
        this.ticketInfo = row;
        this.orderId = row.id;
        this.ticketDrawer = true;
      },
      toPrint() {
        let data = {
          orderId: this.orderId,
        };
        this.service.printingTicket(data).then(response => {
          if (response.success === true) {
            this.$message({
              message: response.message,
              type: "success"
            });
          } else {
            this.$message({
              message: response.message,
              type: "warning"
            });
          }
        });
      },
      toPrintCheck() {
        this.ticketDrawer = false;
      },
      handleInvoice(row) {
        this.invoiceInfo = row;
        this.invoiceDrawer = true;
      },
      cancelInvoice() {
        this.invoiceDrawer = false;
      },
      submitInvoice() {
        if (this.switchInvoice == 1) {
          const confirmText = [
            "消费金额：" + this.formatNumber(this.invoiceInfo.money),
            "支付时间：" + this.invoiceInfo.createdAt,
            "确认为此订单开具发票？"
          ];
          const newDatas = [];
          const h = this.$createElement;
          for (const i in confirmText) {
            newDatas.push(h("p", null, confirmText[i]));
          }
          this.$confirm("确认开票信息", {
            message: h("div", null, newDatas),
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let data = {
              id: this.invoiceInfo.id,
              invoiced: this.switchInvoice,
              version: this.invoiceInfo.version
            };
            this.service.takeTicket(data).then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: "success"
                });
                this.$emit("search", this.queryParams);
                this.invoiceDrawer = false;
              } else {
                this.$message({
                  message: response.message,
                  type: "warning"
                });
              }
            });
          });
        } else {
          this.invoiceDrawer = false;
        }
      },
      handleSizeChange(val) {
        this.queryParams.limit = val;
        this.getList(this.queryParams);
      },
      handleCurrentChange(val) {
        this.queryParams.page = val;
        this.getList(this.queryParams);
      },
      expenseExport(queryParams) {
        this.queryParams = queryParams;
        this.service.expenseExport(this.queryParams).then(response => {
          window.location.href = response.data;
        });
      },
      handleMemo(row) {
        this.memoForm = {
          id: row.id,
          memo: row.memo,
        }
        this.memoDialogVisible = true;
      },
      saveMemo() {
        this.service.saveMemo(this.memoForm).then(response => {
          if (response.success === true) {
            this.$message({
              message: response.message,
              type: "success"
            });
            this.$emit("search", this.queryParams);
            this.memoDialogVisible = false;
          } else {
            this.$message({
              message: response.message,
              type: "warning"
            });
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
