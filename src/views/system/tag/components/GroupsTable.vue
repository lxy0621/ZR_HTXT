<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom: 40px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" style="text-align: center" width="40"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="160">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="handleEdit(scope.row, 'update')">修改&ensp;
          </el-link>
          <el-link v-if="scope.row.enabled == 0" type="primary" :underline="false" size="small"
                   @click="enable(scope.row)">启用&ensp;
          </el-link>
          <el-link v-if="scope.row.enabled == 1" type="danger" :underline="false" size="small"
                   @click="disable(scope.row)">停用&ensp;
          </el-link>
          <router-link class="el-link el-link--primary"
                       :to="{ path: '/system/tag/tags', query: { groupId: scope.row.id } }" type="primary"
                       :underline="false" size="small">标签管理
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="组名" align="center" min-width="140"></el-table-column>
      <!--
      <el-table-column label="是否可多选" align="center" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">否</span>
          <span v-if="scope.row.type == 1">是</span>
        </template>
      </el-table-column>
      -->
      <el-table-column label="启用状态" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.enabled == 0">已停用</span>
          <span v-if="scope.row.enabled == 1">已启用</span>
        </template>
      </el-table-column>
      <el-table-column prop="tagsName" label="标签" align="center" min-width="300">
        <template slot-scope="scope" v-if="scope.row.tagsName !== undefined && scope.row.tagsName != ''">
          <el-tag size="small" v-for="item in scope.row.tagsName.split(',')" :key="item" type="info"
                  style="margin-right: 3px;">{{item}}
          </el-tag>
        </template>
      </el-table-column>
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

    <el-dialog title="提示" :visible.sync="groupsEditDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="dialogTitle == 'add' ? '添加标签组' : '修改标签组'" name="first">
          <el-form ref="form" label-width="100px" :rules="rules" :model="form" size="small">
            <el-form-item prop="name" label="组名">
              <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>
            <!--
            <el-form-item prop="type" label="是否可多选">
              <el-select v-model="form.type" size="small" style="width: 100%">
                <el-option v-for="item in typeList" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            -->
            <el-form-item prop="enabled" label="启用状态">
              <el-select v-model="form.enabled" size="small" style="width: 100%">
                <el-option v-for="item in enabledList" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="groupsEditDialogVisible = false">取 消</el-button>
				<el-button size="medium" v-if="dialogTitle == 'add'" type="primary" @click="saveGroups">确 定</el-button>
				<el-button size="medium" v-if="dialogTitle == 'update'" type="primary" @click="updateGroups">确 定</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
  import {TagGroupsService} from '@/service/system/tag/TagGroupsService';

  export default {
    name: 'GroupsTable',
    data() {
      return {
        ids: [],
        tableData: [],
        total: 0,
        pageSize: 0,
        queryParams: {
          page: 1,
          limit: 30
        },
        activeName: 'first',
        service: null,
        groupsEditDialogVisible: false,
        form: {},
        typeList: [{label: '否', value: 0}, {label: '是', value: 1}],
        enabledList: [{label: '已启用', value: '1'}, {label: '已停用', value: '0'},],
        rules: {
          name: [
            {
              required: true,
              message: '请输入组名',
              trigger: 'blur'
            }
          ],
          enabled: [
            {
              required: true,
              message: '请选择启用状态',
              trigger: 'blur'
            }
          ]
        },
        dialogTitle: undefined
      };
    },
    mounted() {
      this.service = new TagGroupsService();
      this.getList(this.queryParams);
    },
    methods: {
      getList(params) {
        params.page == undefined ? (params.page = 1) : (params.page = this.queryParams.page);
        params.limit == undefined ? (params.limit = 30) : (params.limit = this.queryParams.limit);
        this.queryParams = params;
        this.service.pagingTagGroups(params).then(response => {
          this.tableData = response.rows;
          this.total = parseInt(response.total);
          this.pageSize = response.total;
          debugger
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
      handleSelectionChange(val) {
        this.ids = val;
      },
      batchDelete() {
        if (this.ids.length == 0) {
          this.$message({
            message: '请勾选要删除的标签组',
            type: 'success'
          });
        } else {
          this.$confirm('确定要删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let groupIds = [];
            for (let i = 0; i < this.ids.length; i++) {
              groupIds.push(parseInt(this.ids[i].id));
            }
            this.service.batchDelete(groupIds)
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
              }).catch(() => {
              this.getList(this.queryParams);
            });
          });
        }
      },
      saveGroups() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.service.saveGroups(this.form).then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.form = {};
                this.getList(this.queryParams);
                this.groupsEditDialogVisible = false;
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      updateGroups() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.service.updateTagGroups(this.form).then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.form = {};
                this.getList(this.queryParams);
                this.groupsEditDialogVisible = false;
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      handleEdit(row, dialogTitle) {
        if (undefined != row) {
          this.form = row;
        }
        this.dialogTitle = dialogTitle;
        this.groupsEditDialogVisible = true;
      },
      enable(row) {
        this.service.enable(row.id).then(response => {
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
      disable(row) {
        this.service.disable(row.id).then(response => {
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
      }
    }
  };
</script>
<style lang="scss"></style>
