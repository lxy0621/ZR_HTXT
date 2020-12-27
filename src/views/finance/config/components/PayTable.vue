<template>
  <div>
    <!--表格内容栏-->
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="tableData" size="mini" border ref="multipleTable"
              tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-loading='dataListLoading'>
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="130">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="handleEdit('edit',scope.row)">修改</el-link>&ensp;
          <el-link type="danger" :underline="false" size="small" @click="handleDel(scope.row)">删除</el-link>&ensp;
          <el-link type="danger" :underline="false" @click="disableConfig(scope.row)" size="small" v-if="scope.row.enabled == 1">停用</el-link>
          <el-link type="primary" :underline="false" @click="enableConfig(scope.row)" size="small" v-if="scope.row.enabled == 0">启用</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="payAppId" label="商户号" min-width="130" align="center"></el-table-column>
      <el-table-column prop="payAppKey" label="key" align="center" min-width="220"></el-table-column>
      <el-table-column prop="name" label="收款平台" align="center" min-width="90"></el-table-column>
      <el-table-column prop="enabled" label="状态" align="center" min-width="90">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.enabled == 1">已启用</el-tag>
          <el-tag size="small" type="danger" v-if="scope.row.enabled == 0">已停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="启用时间" align="center" min-width="150"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center" min-width="150"></el-table-column>
    </el-table>
    <el-pagination class="fixed-bottom-page" small :current-page="pageIndex" :page-sizes="[30, 50, 100, 200]"
                   :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage" @size-change="sizeChangeHandle"
                   @current-change="currentChangeHandle">
    </el-pagination>

    <!-- 部门新增/修改 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="dialogTitle=='add'?'新增配置':'修改配置'" name="first">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="商户号" prop="payAppId">
              <el-input size="small" v-model="form.payAppId"></el-input>
            </el-form-item>
            <el-form-item label="商户key">
              <el-input size="small" v-model="form.payAppKey"></el-input>
            </el-form-item>
            <el-form-item label="收款平台" prop="type">
              <el-select v-model="form.type" size="small" style="width: 100%">
                <el-option v-for="item in types" :key="item.value" :label="item.desc" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="enabled">
              <el-select v-model="form.enabled" size="small" style="width: 100%">
                <el-option v-for="item in enableds" :key="item.value" :label="item.desc" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="text-align: center;">
            <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
            <el-button type="primary" @click="handleSave()" size="medium">确 定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import {
    PayChannelConfigService
  } from '@/service/system/PayChannelConfigService';

  export default {
    name: "PayTable",
    data() {
      return {
        types: [],
        enableds: [{
          value: 1, desc: "已启用"
        }, {
          value: 0, desc: "已停用"
        }],
        payChannelConfigService: null,
        pageIndex: 1,
        pageSize: 30,
        totalPage: 0,
        activeName: 'first',
        dataListLoading: false,
        tableData: [],
        dataForm: {},
        dialogTitle: 'add',
        dialogVisible: false,
        payId: 0,
        form: {
          payAppId: '',
          enabled: 1,
          payAppKey: undefined,
          type: undefined,
        },
        rules: {
          payAppId: [{
            required: true,
            message: '商户号不能为空',
            trigger: 'blur'
          },
            {
              min: 1,
              max: 50,
              message: '请输入1-50个字符',
              trigger: 'blur'
            }
          ],
          enabled: [{
            required: true,
            message: '请选择是否启用',
            trigger: 'blur'
          }],
          payAppKey: [{
            required: true,
            message: '商户key不能为空',
            trigger: 'blur'
          },
            {
              min: 1,
              max: 1000,
              message: '请输入1-300个字符',
              trigger: 'blur'
            }
          ],
          type: [{
            required: true,
            message: '请选择收口平台',
            trigger: 'blur'
          }],
        }
      };
    },
    mounted() {
      this.payChannelConfigService = new PayChannelConfigService();
      this.initTypes();
      this.getDataList(this.dataForm);
    },
    methods: {
      initTypes() {
        this.payChannelConfigService.enumList({
          'sta': 'rechargeType',
          'alls': 'no'
        }).then(response => {
          this.types = response;
        })
      },
      getDataList(params) {
        this.dataForm = params;
        this.dataListLoading = true;
        this.dataForm.page = this.pageIndex;
        this.dataForm.limit = this.pageSize;
        this.payChannelConfigService.pageList(this.dataForm).then(response => {
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
      // 操作
      handleEdit(t, dept) {
        this.$nextTick(()=> {
          this.$refs['form'].resetFields();
        });
        this.dialogTitle = t;
        this.dialogVisible = true;
        if (t == 'add') { // 新增
          this.payId = 0;
          this.form.enabled = 1;
          this.form.payAppId = undefined;
          this.form.payAppKey = undefined;
          this.form.type = undefined;
        } else { // 修改，先去查询部门信息
          this.payId = dept.id;
          this.form.enabled = dept.enabled;
          this.form.payAppId = dept.payAppId;
          this.form.type = dept.type;
          this.form.payAppKey = dept.payAppKey;
        }
      },
      //保存
      handleSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.dialogVisible = false;
            if (this.payId == 0) { // 新增
              this.payChannelConfigService.savePayConfig(this.form).then(response => {
                if (response.success) {
                  this.getDataList(this.dataForm);
                  this.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error(response.message);
                }
              })
            } else {
              this.payChannelConfigService.updatePayConfig(this.form, this.payId).then(response => {
                if (response.success) {
                  this.getDataList(this.dataForm);
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error(response.message);
                }
              })
            }
          } else {
            return false;
          }
        })
      },
      // 删除
      handleDel(row) {
        this.$confirm('確定要刪除此商户号吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          this.payChannelConfigService.delete(row.id).then(response => {
            if (response.success) {
              this.getDataList(this.dataForm);
            } else {
              this.$message.error(response.message);
            }
          })
        })
      },
      // 起用
      enableConfig(row) {
        this.$confirm('確定要启用此商户号吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          this.payChannelConfigService.enableConfig(row.id).then(response => {
            if (response.success) {
              this.getDataList(this.dataForm);
            } else {
              this.$message.error(response.message);
            }
          })
        })
      },
      // 停用
      disableConfig(row) {
        this.$confirm('確定要停用此商户号吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          this.payChannelConfigService.disableConfig(row.id).then(response => {
            if (response.success) {
              this.getDataList(this.dataForm);
            } else {
              this.$message.error(response.message);
            }
          })
        })
      },
    }
  };
</script>
<style lang="scss">
</style>
