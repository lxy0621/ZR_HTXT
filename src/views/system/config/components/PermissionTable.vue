<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>页面权限配置</span>
      </div>
      <div>
        <div class="operation-btn">
          <div>
            <button type="button" v-waves class="el-button el-button--primary el-button--mini" @click="createPermission()">添加权限</button>
          </div>
        </div>
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
          <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
          <el-table-column prop="action" label="操作" fixed align="center" width="100">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="updatePermission(scope.row)" size="small">修改</el-link>&ensp;
              <el-link type="danger" :underline="false" @click="deletePermission(scope.row)" size="small">删除</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
          <el-table-column prop="code" label="权限代码" align="center"></el-table-column>
        </el-table>
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
        <el-dialog :visible.sync="createPermissionDialogVisible" :close-on-click-modal=false width="40%">
          <template>
            <el-tabs v-model="activedCreateTab">
              <el-tab-pane label="添加权限" name="createPermission">
                <el-form ref="createForm" :model="createForm" label-width="80px" :rules="rules" size="small">
                  <el-form-item label="页面名称" prop="name">
                    <el-input v-model="page.name" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="权限名称" prop="name">
                    <el-input v-model="createForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="权限编码" prop="code">
                    <el-input v-model="createForm.code"></el-input>
                  </el-form-item>
                </el-form>
                <div style="text-align: center">
                  <el-button size="medium" @click="createPermissionDialogVisible=false">取 消</el-button>
                  <el-button size="medium" type="primary" @click="submitCreatePermission('createForm')">确 定</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-dialog>
        <el-dialog :visible.sync="updatePermissionDialogVisible" :close-on-click-modal=false width="40%">
          <template>
            <el-tabs v-model="activedUpdateTab">
              <el-tab-pane label="修改权限" name="updatePermission">
                <el-form ref="updateForm" :model="updateForm" label-width="80px" :rules="rules" size="small">
                  <el-form-item label="页面名称" prop="name">
                    <el-input v-model="page.name" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="权限名称" prop="name">
                    <el-input v-model="updateForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="权限编码" prop="code">
                    <el-input v-model="updateForm.code"></el-input>
                  </el-form-item>
                </el-form>
                <div style="text-align: center">
                  <el-button size="medium" @click="updatePermissionDialogVisible=false">取 消</el-button>
                  <el-button size="medium" type="primary" @click="submitUpdatePermission('updateForm')">确 定</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { PermissionService } from '@/service/system/config/PermissionService.js';

  export default {
    name: "PermissionTable",
    data() {
      return {
        permissionService: undefined,
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        activedCreateTab: 'createPermission',
        createPermissionDialogVisible: false,
        createForm: {
          name: undefined,
          code: undefined,
        },
        activedUpdateTab: 'updatePermission',
        updatePermissionDialogVisible: false,
        updateForm: {
          name: undefined,
          code: undefined,
        },
        rules: {
          name: [{required: true, message: "请输入权限名称", trigger: "blur"}],
          code: [{required: true, message: "请输入权限编码", trigger: "blur"}],
        }
      };
    },
    props: ['page'],
    mounted() {
      this.permissionService = new PermissionService();
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {

        if (queryParams.pageId === undefined) {
          queryParams.pageId = parseInt(this.page.id);
        }
        this.permissionService.pagingPermissions(queryParams)
          .then(response => {
            this.tableData = response.rows;
            this.total = parseInt(response.total);
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
      createPermission() {
        if (this.page.id === undefined) {
          this.$message({
            message: '请选择一个页面',
            type: 'warning'
          });
          return ;
        }
        this.createPermissionDialogVisible = true;
      },
      submitCreatePermission(createForm) {
        const set = this.$refs;
        set[createForm].validate(valid => {
          if (valid) {
            this.createForm.pageId = this.page.id;
            this.permissionService.createPermission(this.createForm).then(response => {
              if (response.success === true) {
                this.createPermissionDialogVisible = false;
                this.$message({
                  message: response.message,
                  type: "success"
                });
                set[createForm].resetFields();
                this.getList(this.queryParams);
              } else {
                this.$message({
                  message: response.message,
                  type: "warning"
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      updatePermission(row) {
        if (this.page.id === undefined) {
          this.$message({
            message: '请选择一个页面',
            type: 'warning'
          });
          return ;
        }
        this.updateForm = {
          id: row.id,
          name: row.name,
          code: row.code,
        }
        this.updatePermissionDialogVisible = true;
      },
      submitUpdatePermission(updateForm) {
        const set = this.$refs;
        set[updateForm].validate(valid => {
          if (valid) {
            this.updateForm.pageId = this.page.id;
            this.permissionService.updatePermission(this.updateForm).then(response => {
              if (response.success === true) {
                this.updatePermissionDialogVisible = false;
                this.$message({
                  message: response.message,
                  type: "success"
                });
                set[updateForm].resetFields();
                this.getList(this.queryParams);
              } else {
                this.$message({
                  message: response.message,
                  type: "warning"
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      deletePermission(row) {
        const ids = [row.id];
        this.$confirm("确定删除此权限吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let param = {
            pageId: this.page.id,
            permissionIds: ids,
          }
          this.permissionService.deletePermissions(param).then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.getList(this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: "warning"
              });
            }
          });
        }).catch(() => {
        });
      },
    }
  }
</script>

<style scoped>
  .operation-btn {
    margin-bottom: 10px;
  }

  .page {
    background: #efefef;
    text-align: right;
    padding: 4px;
  }
</style>
