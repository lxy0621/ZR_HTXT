<template>
  <div>
    <el-card>
      <roles-search
        @search="searchMarketCollectRecordList"
        @reset="resetAllParamsAndData"
        ref="search_panel"
      />
      <div class="opration-btn">
        <div>
          <button
            type="button"
            v-waves
            class="el-button el-button--primary el-button--small"
            @click="handleAdd()"
          >添加角色
          </button>
          <button
            type="button"
            v-waves
            class="el-button el-button--danger el-button--small"
            @click="handleBatchDel()"
          >批量删除
          </button>
        </div>
        <div>
        </div>
      </div>
      <roles-table ref="table"></roles-table>
    </el-card>

    <el-dialog :visible.sync="createRoleDialogVisible" :close-on-click-modal=false>
      <template>
        <el-tabs v-model="activedTab">
          <el-tab-pane label="添加角色" name="createRole">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules" size="medium">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="角色编码" prop="code">
                <el-input v-model="form.code"></el-input>
              </el-form-item>
              <el-form-item label="角色状态" prop="enabled">
                <el-select v-model="form.enabled" placeholder="请选择角色状态">
                  <el-option label="已启用" value="1"></el-option>
                  <el-option label="已停用" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择角色类型">
                  <el-option label="系统" value="1"></el-option>
                  <el-option label="自定义" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button size="medium" @click="createRoleDialogVisible=false">取 消</el-button>
              <el-button size="medium" type="primary" @click="onSubmitSaveRole('form')">确 定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import RolesSearch from "./components/RolesSearch";
  import RolesTable from "./components/RolesTable";
  import {RoleService} from '@/service/cloudoa/org/RoleService';

  export default {
    name: "Roles",
    components: {
      RolesSearch,
      RolesTable,
    },
    data() {
      return {
        queryParams: {
          page: 1,
          limit: 30,
        },
        createRoleDialogVisible: false,
        form: {
          name: '',
          code: '',
          enabled: '1',
          type: '2',
        },
        rules: {
          name: [{required: true, message: "请输入角色名称", trigger: "blur"}],
          code: [{required: true, message: "请输入角色编码", trigger: "blur"}],
          enabled: [{required: true, message: "请选择角色状态", trigger: "blur"}],
          type: [{required: true, message: "请选择角色类型", trigger: "blur"}],
        },
        activedTab: 'createRole',
      };
    },
    methods: {
      searchMarketCollectRecordList(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.queryParams = {};
        this.$refs.table.getList(queryParams);
      },
      handleAdd() {
        this.createRoleDialogVisible = true;
      },
      handleBatchDel() {
        this.$refs.table.batchDelete();
      },
      onSubmitSaveRole(form) {
        const set = this.$refs;
        set[form].validate(valid => {
          if (valid) {
            new RoleService().createRole(this.form)
              .then(response => {
                if (response.success === true) {
                  this.createRoleDialogVisible = false;
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  set[form].resetFields();
                  set.table.getList(this.queryParams);
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
      }
    }
  };
</script>
<style lang="scss">
  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
