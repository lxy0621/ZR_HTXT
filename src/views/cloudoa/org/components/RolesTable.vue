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
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        style="text-align: center;"
        width="40"
      >
      </el-table-column>
      <el-table-column
        prop="action"
        label="操作" fixed
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleUpdateRole(scope.row)" size="small">修改</el-link>&ensp;
          <el-link type="primary" :underline="false" @click="handleConfigPermissions(scope.row)" size="small">权限管理</el-link>&ensp;
          <el-link type="danger" :underline="false" @click="handleDisableRole(scope.row)" size="small"
                   v-if="scope.row.enabled == 1">停用
          </el-link>
          <el-link type="primary" :underline="false" @click="handleEnableRole(scope.row)" size="small"
                   v-if="scope.row.enabled == 0">启用
          </el-link>&ensp;
          <el-link type="danger" v-if="scope.row.enabled == 0" :underline="false" @click="handleDeleteRole(scope.row)" size="small">删除</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="code"
        label="角色编码"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="角色状态"
        align="center"
      >
        <template slot-scope="scope">
          <span v-for="item in roleState" :value="item.value" :key="item.value">{{'' + scope.row.enabled === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="角色类型"
        align="center"
      >
        <template slot-scope="scope">
          <span v-for="item in roleType" :value="item.value" :key="item.value">{{'' + scope.row.type === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column
        label="已绑定用户（人）"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color: #1e9fff; font-weight: bold">{{scope.row.boundUsersCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="boundPermissionsCount"
        label="已绑定权限（项）"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color: #1e9fff; font-weight: bold">{{scope.row.boundPermissionsCount}}</span>
        </template>
      </el-table-column>
      -->
    </el-table>
    <el-pagination
      class="fixed-bottom-page"
      small
      @size-change="handleSizeChange"
      @current-page="handleCurrentChange"
      :page-sizes="[30, 50, 100, 200]"
      :current-page="queryParams.page"
      :page-size="queryParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <el-dialog :visible.sync="updateRoleDialogVisible" :close-on-click-modal=false width="40%">
      <template>
        <el-tabs v-model="activedTab">
          <el-tab-pane label="修改角色" name="updateRole">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules" size="small">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="角色编码" prop="code">
                <el-input v-model="form.code"></el-input>
              </el-form-item>
              <el-form-item label="角色状态" prop="enabled">
                <el-select v-model="form.enabled" placeholder="请选择角色状态" style="width: 100%">
                  <el-option label="已启用" value="1"></el-option>
                  <el-option label="已停用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择角色类型" style="width: 100%">
                  <el-option label="系统" value="1"></el-option>
                  <el-option label="自定义" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button size="medium" @click="updateRoleDialogVisible=false">取 消</el-button>
              <el-button size="medium" type="primary" @click="onSubmitUpdateRole('form')">确 定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>

    <el-drawer :visible.sync="configPermissionsDrawerVisible" :with-header="false" style="text-align: left;">
      <span style="color: #999999;">权限配置&ensp;></span>
      <el-card style="width: 100%; height: 90vh; margin-top: 10px;">
        <el-scrollbar>
          <el-tree :data="permissionTreeData" :props="defaultProps" node-key="id" ref="permissionTree" :default-expand-all="true" style="height: 85vh" show-checkbox></el-tree>
        </el-scrollbar>
      </el-card>
      <div style="margin-top: 10px; text-align: center;">
        <el-row :gutter="5">
          <el-col :span="12">
            <el-button size="medium" @click="configPermissionsDrawerVisible=false" style="width: 100%">取 消</el-button>
          </el-col>
          <el-col :span="12">
            <el-button size="medium" type="primary" @click="onSubmitConfigPermissions" :loading="loading" style="width: 100%">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {RoleService} from '@/service/cloudoa/org/RoleService';
  import {CommonService} from "@/service/common/CommonService";

  export default {
    name: "RolesTable",
    data() {
      return {
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        updateRoleDialogVisible: false,
        form: {
          id: '',
          name: '',
          code: '',
          enabled: '',
          type: '',
        },
        rules: {
          name: [{required: true, message: "请输入角色名称", trigger: "blur"}],
          code: [{required: true, message: "请输入角色编码", trigger: "blur"}],
          enabled: [{required: true, message: "请选择角色状态", trigger: "blur"}],
          type: [{required: true, message: "请选择角色类型", trigger: "blur"}],
        },
        activedTab: 'updateRole',
        configPermissionsDrawerVisible: false,
        permissionTreeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        loading: false,
        roleId: undefined,
        roleState: [],
        roleType: [],
      };
    },
    mounted() {
      this.getList(this.queryParams);
      this.getPermissionTree();
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "roleState",
          enumValue: "EnumRoleState",
        }, {
          enumKey: "roleType",
          enumValue: "EnumRoleType",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('system', param).then(response => {
          that.roleState = response.roleState;
          that.roleType = response.roleType;
        })
      },
      getList(params) {
        this.loading = true;
        params.page = this.queryParams.page;
        params.limit = this.queryParams.limit;
        this.queryParams = params;
        new RoleService().pagingRoles(this.queryParams)
          .then(response => {
            this.tableData = response.rows;
            this.total = parseInt(response.total);
            this.loading = false;
          });
      },
      getPermissionTree() {
        new RoleService().getPermissionTree()
          .then(response => {
            this.permissionTreeData = response;
          });
      },
      handleSelectionChange(val){
        this.selectRows = val;
      },
      handleSizeChange(val) {
        this.queryParams.limit = val;
        this.getList(this.queryParams);
      },
      handleCurrentChange(val) {
        this.queryParams.page = val;
        this.getList(this.queryParams);
      },
      handleUpdateRole(row) {
        this.form = {
          id: row.id,
          name: row.name,
          code: row.code,
          enabled: '' + row.enabled,
          type: '' + row.type,
        }
        this.updateRoleDialogVisible = true;
      },
      handleDeleteRole(row) {
        const ids = [row.id];
        this.$confirm('确定删除此角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          new RoleService().deleteRoles(ids)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList(this.queryParams);
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });
        }).catch(() => {
        });
      },
      batchDelete() {
        if (this.selectRows.length == 0) {
          this.$message({
            message: '请至少勾选一条数据',
            type: 'info',
          });
        } else {
          this.$confirm('确定删除勾选角色吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            let ids = [];
            this.selectRows.forEach(function (value) {
              ids.push(parseInt(value.id));
            });
            new RoleService().deleteRoles(ids)
              .then(response => {
                if (response.success === true) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getList(this.queryParams);
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              });
          }).catch(() => {
          });
        }
      },
      handleConfigPermissions(row) {
        this.roleId = row.id;
        this.loadRolePermissions(row.id);
        this.configPermissionsDrawerVisible = true;
      },
      loadRolePermissions(roleId) {
        new RoleService().getRolePermissions(roleId)
          .then(response => {

            this.$refs.permissionTree.setCheckedKeys(response, true);
          });
      },
      handleDisableRole(row) {
        new RoleService().disableRole(row.id)
          .then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.getList(this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          });
      },
      handleEnableRole(row) {
        new RoleService().enableRole(row.id)
          .then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.getList(this.queryParams);
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          });
      },
      onSubmitUpdateRole(form) {
        const set = this.$refs;
        set[form].validate(valid => {
          if (valid) {
            new RoleService().updateRole(this.form)
              .then(response => {
                if (response.success === true) {
                  this.updateRoleDialogVisible = false;
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  set[form].resetFields();
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
      onSubmitConfigPermissions() {
        this.loading = true;

        let halfCheckedKeys = this.$refs.permissionTree.getHalfCheckedKeys();
        let checkedKeys = this.$refs.permissionTree.getCheckedKeys();
        let param = {
          roleId: this.roleId,
          permissionKeys: halfCheckedKeys.concat(checkedKeys)
        }
        new RoleService().configPermissions(param)
          .then(response => {
            this.loading = false;
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.configPermissionsDrawerVisible = false;
            } else {
              this.$message({
                message: response.message,
                type: "warning"
              });
            }
          });
      },
    }
  };
</script>
<style lang="scss" scoped>
</style>
