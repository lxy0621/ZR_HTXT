<template>
  <div>
    <el-form-item label="活动规则" class="required" prop="rcRuleAddUpdateDTOs">
      <template>
        <div v-for="(item, index) in activityForm.rcRuleAddUpdateDTOs" :key="index" style="margin-bottom: 10px;">
          <el-link type="primary" :underline="false" @click="showRedPacketDialog(index)" size="small">{{item.redPacketName}}</el-link>
          </span>
        </div>
      </template>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" :rows="3" size="medium" v-model="activityForm.memo" style="width: 90%" maxlength="500" show-word-limit>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="margin-top: 12px;" @click="before">上一步</el-button>
      <el-button type="primary" style="margin-top: 12px;" @click="submit('activityForm')">提交</el-button>
    </el-form-item>

    <el-dialog :visible.sync="redPacketDialog" width="800" title="选择红包">
      <el-tabs v-model="active">
        <el-tab-pane label="选择红包" name="first">
          <div>
            <el-input v-model="queryParams.unionQuery" placeholder="红包名称/批次名/批次号" size="small" style="width: 30%"/>&ensp;
            <el-button size="small" type="primary" @click="searchRpBatches">查 询</el-button>
            <el-button size="small" @click="resetRpBatches">重 置</el-button>
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
                  <span style="color: #409EFF; font-weight: bold;">{{ scope.row.totalCount === undefined ? '--' : scope.row.totalCount }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="surplusCount" label="剩余量" align="center">
                <template slot-scope="scope">
                  <span style="color: #409EFF; font-weight: bold;">{{ scope.row.surplusCount === undefined ? '--' : scope.row.surplusCount }}</span>
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
          <el-button size="medium" type="primary" @click="confirmRpBatch">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {ActivityAdminService} from "@/service/marketing/activity/ActivityAdminService";
  import {RedPacketAdminService} from "@/service/marketing/tools/RedPacketAdminService";
  import * as formatter from "@/utils/formatter";

  export default {
    name: "RefreshManRedPacketRule",
    props: ['oper', 'parentForm'],
    data() {
      return {
        activityForm: {
          rcRuleAddUpdateDTOs: [{rpBatchId: undefined, redPacketName: '选择红包'}],
          memo: undefined,
        },
        redPacketDialog: false,
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
      }
    },
    mounted() {
      this.activityAdminService = new ActivityAdminService();
      this.activityForm = Object.assign(this.activityForm, this.parentForm);
    },
    methods: {
      formatDate(time) {
        return formatter.formatDate(time);
      },
      before() {
        this.$emit('before');
      },
      submit() {
        const rules = this.activityForm.rcRuleAddUpdateDTOs;
        for (let i = 0; i < rules.length; i++) {
          if (rules[i].rpBatchId == undefined || rules[i].rpBatchId == '') {
            this.$message({
              message: '请完善活动规则',
              type: 'warning'
            });
            return false;
            break;
          }
        }
        if (this.activityForm.memo !== undefined && this.activityForm.memo.length > 500) {
          this.$message({
            message: '备注不能超过500字',
            type: 'warning'
          });
          return false;
        }

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
              this.$emit('submit', result);
            });
        }
      },
      resetActivityForm() {
        this.activityForm = {
          rcRuleAddUpdateDTOs: [{rpBatchId: undefined, redPacketName: '选择红包'}],
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
      searchRpBatches() {
        this.getList();
      },
      resetRpBatches() {
        this.queryParams = {
          page: 1,
          limit: 30,
          related: 0,
          rpBatchStates: [1],
          unionQuery: undefined,
        };
        this.getList();
      },
      confirmRpBatch() {
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
