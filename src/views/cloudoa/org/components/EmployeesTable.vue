<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:40px"
      v-loading="tableLoading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" style="text-align: center" width="40"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="160">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="handleEdit(scope.row.id)">修改&ensp;</el-link>
          <el-link type="danger" :underline="false" size="small" @click="deleteEmployee(scope.row)">删除&ensp;</el-link>
          <el-link type="danger" :underline="false" size="small" @click="resetPassword(scope.row)">重置密码&ensp;</el-link>
          <!--<el-link type="primary" :underline="false" size="small" @click="openEmployeeAccount(scope.row)" v-if="scope.row.accountOpenState == 0">开通账户</el-link>-->
        </template>
      </el-table-column>
      <el-table-column prop="employeeNo" label="员工编号" align="center"></el-table-column>
      <el-table-column prop="name" width="100" label="姓名" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="110" align="center"></el-table-column>
      <el-table-column prop="departmentName" width="250" max-width="260" label="所在部门" align="center"></el-table-column>
      <el-table-column prop="jobTitle" width="90" label="岗位" align="center">
        <template slot-scope="scope">
          <span v-for="item in employeePosition" :value="item.value" :key="item.value">{{'' + scope.row.jobTitle === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="accountOpenState" label="中台系统账户状态" width="140" align="center">
        <template slot-scope="scope">
          <el-tag size="small" type="info" v-if="scope.row.accountOpenState == '0'">未开通</el-tag>
          <el-tag size="small" v-if="scope.row.accountOpenState == '1'">已开通</el-tag>
          <el-tag size="small" type="danger" v-if="scope.row.accountOpenState == '2'">已停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userName" width="130" label="中台系统账号" align="center"></el-table-column>
      <el-table-column prop="accountOpenState" label="中台系统角色" width="120" align="center">
        <template slot-scope="scope">
          <span v-for="item in roleData" :key="item.id" :label="item.name"
                :value="item.id">{{ '' + scope.row.roleId === item.id ? item.name : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注信息" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memo == '' || scope.row.memo == undefined ? '---' : scope.row.memo }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" width="180" label="创建时间" align="center"></el-table-column>
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

    <el-dialog title="添加员工" :visible.sync="employeeCreateDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="添加员工" name="first">
          <el-form ref="form" label-width="100px" :rules="rules" :model="form" size="small">
            <el-form-item prop="employeeNo" label="员工编号">
              <el-input v-model="form.employeeNo"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="jobTitle" label="职位">
              <el-select v-model="form.jobTitle" style="width: 100%">
                <el-option v-for="item in employeePosition" :key="item.value" :label="item.key" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="mobile" label="手机号">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item prop="departmentId" label="* 所在部门">
              <el-select ref="selectTree" v-model="form.departmentName" placeholder="请选择所在部门" style="width: 100%;">
                <el-option :value="localtionName" :label="form.departmentName"
                           style="height:200px;overflow: auto;background-color:#fff">
                  <el-tree
                    :data="treeData"
                    :check-strictly="true"
                    accordion
                    highlight-current
                    @node-click="handleNodeClick"
                  ></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.memo"></el-input>
            </el-form-item>
            <el-form-item label="开通中台账号">
              <el-checkbox :true-label=1 :false-label=0 v-model="form.accountOpenState"  @change="handleChangeCreateAccountState"></el-checkbox>
              <span style="font-size: 1.25rem; color: red;">（默认密码手机号后6位）</span>
            </el-form-item>
            <el-form-item v-if="form.accountOpenState == 1" label="默认登录角色">
              <el-select filterable allow-create v-model="form.roleId" style="width: 100%">
                <el-option v-for="item in roleData" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="employeeCreateDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="createEmployee">确 定</el-button>
			</span>
    </el-dialog>

    <el-dialog title="修改员工" :visible.sync="employeeUpdateDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="修改员工" name="first">
          <el-form ref="updateForm" label-width="100px" :rules="rules" :model="updateForm" size="small">
            <el-form-item prop="name" label="姓名">
              <el-input v-model="updateForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="手机号">
              <el-input v-model="updateForm.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="jobTitle" label="职位">
              <el-select v-model="updateForm.jobTitle" style="width: 100%">
                <el-option v-for="item in employeePosition" :key="item.value" :label="item.key" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="updateForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="departmentId" label="* 所在部门">
              <el-select ref="updateSelectTree" v-model="updateForm.departmentName" placeholder="请选择所在部门"
                         style="width: 100%;">
                <el-option :value="updateLocaltionName" :label="updateForm.departmentName"
                           style="height:200px;overflow: auto;background-color:#fff">
                  <el-tree
                    :data="treeData"
                    :check-strictly="true"
                    accordion
                    highlight-current
                    @node-click="handleUpdateNodeClick"
                  ></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开通中台账号">
              <el-checkbox :true-label=1 :false-label=0 v-model="updateForm.accountOpenState" @change="handleChangeUpdateAccountState"></el-checkbox>
              <span style="font-size: 1.25rem; color: red;">（默认密码手机号后6位）</span>
            </el-form-item>
            <el-form-item v-if="updateForm.accountOpenState == 1" label="默认登录角色">
              <el-select filterable allow-create v-model="updateForm.roleId" style="width: 100%">
                <el-option v-for="item in roleData" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="employeeUpdateDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="updateEmployee">确 定</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
import {EmployeeService} from '@/service/cloudoa/org/EmployeeService.js';
import {CommonService} from "@/service/common/CommonService";

export default {
  name: 'EmployeesTable',
  data() {
    let validateMobilePhone = (rule, value, callback) => {
      if (value !== '') {
        let reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入有效的手机号码'));
        }
      }
      callback();
    };
    let validateEmail = (rule, value, callback) => {
      if (undefined != value && value != '') {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
          callback(new Error('请输入有效的邮箱'));
        }
      }
      callback();
    };
    return {
      tableLoading: false,
      employeeIds: [],
      tableData: [],
      treeData: [],
      roleData: [],
      employeePosition: [],
      total: 0,
      localtionName: '',
      updateLocaltionName: '',
      employeeCreateDialogVisible: false,
      employeeUpdateDialogVisible: false,
      queryParams: {
        page: 1,
        limit: 30
      },
      form: {
        employeeNo: undefined,
        name: undefined,
        jobTitle: undefined,
        mobile: undefined,
        email: undefined,
        departmentName: undefined,
        memo: undefined,
        accountOpenState: 0,
        roleId: undefined,
      },
      updateForm: {},
      activeName: 'first',
      rules: {
        employeeNo: [
          {
            required: true,
            message: '请输入员工编号',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入员工姓名',
            trigger: 'blur'
          }
        ],
        jobTitle: [
          {
            required: true,
            message: '请选择职位',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: validateMobilePhone
          }
        ],
        email: [
          {
            trigger: 'blur',
            validator: validateEmail
          }
        ],
      },
      service: null
    };
  },
  created() {
    this.employeeService = new EmployeeService();
    this.initSelectData();
    this.initDeptTree();
    this.getList(this.queryParams);
    this.getRoleList();
  },
  methods: {
    initSelectData() {
      const param = [{
        enumKey: "employeePosition",
        enumValue: "EnumEmployeePosition",
      }];
      const that = this;
      new CommonService().findEnumIncludeAll('org', param).then(response => {
        that.employeePosition = response.employeePosition;
      })
    },
    getRoleList() {
      this.employeeService.roleList().then(response => {
        this.roleData = response;
      });
    },
    getList(params) {
      this.tableLoading = true;
      params.page == undefined ? (params.page = 1) : (params.page = this.queryParams.page);
      params.limit == undefined ? (params.limit = 30) : (params.limit = this.queryParams.limit);
      this.queryParams = params;
      this.employeeService.pagingEmployees(params).then(response => {
        this.tableData = response.rows;
        this.total = parseInt(response.total);
        this.tableLoading = false;
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
    createEmployee() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (undefined == this.form.accountOpenState) {
            this.form.accountOpenState = 0;
          }

          if (this.form.departmentId == undefined) {
            this.$message({
              message: '请选择所在部门',
              type: 'warning'
            });
            return false;
          }

          /*
          if (this.form.accountOpenState == 1 && this.form.roleId == undefined) {
            this.$message({
              message: '请选择中台系统角色',
              type: 'warning'
            });
            return false;
          }
          */
          this.employeeService.createEmployee(this.form).then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: 'success'
              });
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
            this.getList(this.queryParams);
            this.restForm();
            this.employeeCreateDialogVisible = false;
          });
        } else {
          return false;
        }
      });
    },
    batchDelete() {
      if (this.employeeIds.length == 0) {
        this.$message({
          message: '请勾选要删除的员工',
          type: 'warning'
        });
      } else {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let pushIds = [];
          for (let i = 0; i < this.employeeIds.length; i++) {
            pushIds.push(parseInt(this.employeeIds[i].id));
          }
          this.employeeService
            .deleteEmployees(pushIds)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList(this.queryParams);
                this.employeeCreateDialogVisible = false;
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            })
            .catch(() => {
              this.getList(this.queryParams);
            });
        });
      }
    },
    handleSelectionChange(val) {
      this.employeeIds = val;
    },
    deleteEmployee(val) {
      this.employeeIds[0] = val;
      this.batchDelete();
    },
    resetPassword(val) {
      this.employeeIds[0] = val;
      this.$confirm('确定重置密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let pushIds = [];
        for (let i = 0; i < this.employeeIds.length; i++) {
          pushIds.push(parseInt(this.employeeIds[i].id));
        }
        this.employeeService
          .resetPassword(pushIds)
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
          })
          .catch(() => {
            this.getList(this.queryParams);
          });
      });
    },
    openEmployeeAccount(obj) {
      this.employeeService
        .openEmployeeAccount(obj)
        .then(response => {
          if (response.success === true) {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.getList(this.queryParams);
            this.employeeCreateDialogVisible = false;
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        })
        .catch(() => {
          this.getList(this.queryParams);
        });
    },
    handleEdit(id) {
      this.employeeService.getEmployeeById(id).then(response => {
        this.updateForm = {
          id: response.id,
          name: response.name,
          mobile: response.mobile,
          jobTitle: response.jobTitle,
          email: response.email,
          departmentId: response.departmentId,
          departmentName: response.departmentName,
          accountOpenState: response.accountOpenState,
          roleId: response.roleId,
        }

        this.employeeUpdateDialogVisible = true;
      });
    },
    updateEmployee() {
      this.$refs['updateForm'].validate(valid => {
        if (valid) {
          if (undefined == this.updateForm.accountOpenState || this.updateForm.accountOpenState == false) {
            this.updateForm.accountOpenState = 0;
          }

          if (this.updateForm.departmentId == undefined) {
            this.$message({
              message: '请选择所在部门',
              type: 'warning'
            });
            return false;
          }

          /*
          if (this.updateForm.accountOpenState == 1 && this.updateForm.roleId == undefined) {
            this.$message({
              message: '请选择中台系统角色',
              type: 'warning'
            });
            return false;
          }
          */
          this.employeeService
            .updateEmployee(this.updateForm)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
              this.getList(this.queryParams);
              this.restForm();
              this.employeeUpdateDialogVisible = false;
            })
            .catch(() => {
              this.getList(this.queryParams);
            });
        } else {
          return false;
        }
      });
    },
    initDeptTree() {
      const data = {};
      this.employeeService.departmentTree(data).then(response => {
        this.treeData = response;
      });
    },
    handleNodeClick(node) {
      this.form.departmentId = node.id;
      this.form.departmentName = node.label;
      this.localtionName = node.label;
      this.$refs.selectTree.blur();
    },
    handleUpdateNodeClick(node) {
      this.updateForm.departmentId = node.id;
      this.updateForm.departmentName = node.label;
      this.updateLocaltionName = node.label;
      this.$refs.updateSelectTree.blur();
    },
    restForm() {
      this.form = {
        accountOpenState: '0'
      };
      this.updateForm = {
        accountOpenState: '0'
      };
    },
    handleChangeCreateAccountState(val) {
      if (val === 0) {
        this.form.roleId = undefined;
      }
    },
    handleChangeUpdateAccountState(val) {
      if (val === 0) {
        this.updateForm.roleId = undefined;
      }
    }
  }
};
</script>
<style lang="scss"></style>
