<template>
  <div>
    <!--表格内容栏-->
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="tableData" size="mini" border
              ref="multipleTable"
              tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
      <!-- <el-table-column type="selection" align="center" width="50">
      </el-table-column> -->
      <el-table-column prop="action" label="操作" fixed align="center" width="140">
        <template slot-scope="scope">
          <el-link type="primary" v-if="scope.row.departmentType == 2" :underline="false"
                   @click="handleEditOil('edit',scope.row)"
                   size="small">修改&ensp;
          </el-link>
          <el-link type="primary" v-if="scope.row.departmentType != 2" :underline="false"
                   @click="handleEdit('edit',scope.row)"
                   size="small">修改&ensp;
          </el-link>
          <template v-if="scope.row.parentDepartmentId != 0">
            <el-link type="danger" :underline="false"
                     @click="handleDel(scope.row)"
                     v-if="scope.row.state == 0" size="small">删除&ensp;
            </el-link>
          </template>
          <el-link type="danger" :underline="false" @click="disableDepartment(scope.row)" size="small"
                   v-if="scope.row.state == 1">停用
          </el-link>
          <el-link type="primary" :underline="false" @click="enableDepartment(scope.row)" size="small"
                   v-if="scope.row.state == 0">启用
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="部门名称" align="center" width="270">
      </el-table-column>
      <el-table-column prop="viewName" label="部门简称" align="center" width="240">
      </el-table-column>
      <el-table-column prop="departmentTypeName" label="部门类型" align="center" width="100">
      </el-table-column>
      <el-table-column prop="empName" label="主管" align="center" width="100">
      </el-table-column>
      <el-table-column label="部门状态" align="center" width="120">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.state == 1">已启用</el-tag>
          <el-tag size="small" type="danger" v-if="scope.row.state == 0">已停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="memo" label="备注信息" align="center">
      </el-table-column>
    </el-table>

    <!-- 部门新增/修改 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="dialogTitle=='add'?'新增部门':'修改部门'" name="first">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <template v-if="dialogTitle==='add'">
              <el-form-item label="上级部门">
                <el-input size="small" v-model="parentDepartmentName" disabled></el-input>
              </el-form-item>
            </template>
            <el-form-item label="部门名称" prop="name">
              <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="部门简称">
              <el-input size="small" v-model="form.viewName"></el-input>
            </el-form-item>
            <el-form-item label="部门类型" prop="departmentType">
              <el-select v-model="form.departmentType" size="small" style="width: 100%" disabled>
                <el-option v-for="item in types" :key="item.value" :label="item.desc" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门主管" prop="managerEmployeeId">
              <el-select v-model="form.managerEmployeeId" filterable size="small" style="width: 100%">
                <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门副主管">
              <el-select v-model="form.subManagerEmployeeId" filterable size="small" style="width: 100%">
                <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门状态" prop="state">
              <el-select v-model="form.state" size="small" style="width: 100%">
                <el-option v-for="item in states" :key="item.value" :label="item.desc" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input type="textarea" size="small" v-model="form.memo" style="width: 100%">
              </el-input>
            </el-form-item>
          </el-form>
          <div class="" style="text-align: center;">
            <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
            <el-button type="primary" @click="handleSave()" size="medium">确 定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 油站新增/修改 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleOil" width="30%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="dialogTitleOil=='add'?'新增油站':'修改油站'" name="first">
          <el-form ref="formOil" :model="formOil" :rules="rules" label-width="100px">
            <template v-if="dialogTitleOil==='add'">
              <el-form-item label="上级部门">
                <el-input size="small" v-model="parentDepartmentName" disabled></el-input>
              </el-form-item>
            </template>
            <el-form-item label="部门名称" prop="name">
              <el-input size="small" v-model="formOil.name"></el-input>
            </el-form-item>
            <el-form-item label="部门简称">
              <el-input size="small" v-model="formOil.viewName"></el-input>
            </el-form-item>
            <el-form-item label="部门类型" prop="departmentType">
              <el-select v-model="formOil.departmentType" size="small" style="width: 100%" disabled>
                <el-option v-for="item in types" :key="item.value" :label="item.desc" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门主管" prop="managerEmployeeId">
              <el-select v-model="formOil.managerEmployeeId" filterable size="small" style="width: 100%">
                <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门副主管">
              <el-select v-model="formOil.subManagerEmployeeId" filterable size="small" style="width: 100%">
                <el-option v-for="item in employees" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门状态" prop="state">
              <el-select v-model="formOil.state" size="small" style="width: 100%">
                <el-option v-for="item in states" :key="item.value" :label="item.desc" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="油站经度">
              <el-input-number v-model="formOil.longitude" size="small" :controls="false" :precision="6" style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="油站纬度">
              <el-input-number v-model="formOil.latitude" size="small" :controls="false" :precision="6" style="width: 100%;text-align: left"></el-input-number>
            </el-form-item>
            <el-form-item label="油站地址" prop="position">
              <el-input type="textarea" size="small" v-model="formOil.position"></el-input>
            </el-form-item>
            <el-form-item label="开业时间">
              <el-date-picker v-model="formOil.openDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                              style="width: 100%">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="油站类型" prop="stationType">
              <el-select v-model="formOil.stationType" size="small" style="width: 100%">
                <el-option v-for="item in oiltypes" :key="item.value" :label="item.desc" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input type="textarea" size="small" v-model="formOil.memo" style="width: 100%">
              </el-input>
            </el-form-item>
          </el-form>
          <div class="" style="text-align: center;">
            <el-button @click="dialogVisibleOil = false" size="medium">取 消</el-button>
            <el-button type="primary" @click="handleSaveOil()" size="medium">确 定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import {
    DepartmentService
  } from '@/service/cloudoa/org/DepartmentService';

  export default {
    name: "DepartmentSubTable",
    data() {
      return {
        loading: false,
        deptService: null,
        tableData: [],
        queryParams: {},

        dialogTitle: 'add',
        dialogVisible: false,
        dialogTitleOil: 'add',
        dialogVisibleOil: false,

        parentDepartmentName: '',
        activeName: 'first',
        types: [],
        states: [],
        oiltypes: [],
        employees: [],
        deptId: 0,
        form: {
          name: '',
          state: 1,
          departmentType: null,
          parentDepartmentId: 0,
          viewName: '',
          memo: '',
          managerEmployeeId: null,
          subManagerEmployeeId: null
        },
        formOil: {
          name: '',
          state: 1,
          departmentType: null,
          parentDepartmentId: 0,
          viewName: '',
          memo: '',
          managerEmployeeId: null,
          subManagerEmployeeId: null,
          latitude: null,
          longitude: null,
          position: '',
          openDate: null,
          stationType: null
        },
        rules: {
          name: [
            {required: true, message: '部门名称不能为空', trigger: 'blur'},
            {min: 1, max: 50, message: '请输入1-50个字符', trigger: 'blur'}
          ],
          departmentType: [
            {required: true, message: '请选择部门类型', trigger: 'blur'}
          ],
          state: [
            {required: true, message: '请选择部门状态', trigger: 'blur'}
          ],
          managerEmployeeId: [
            {required: true, message: '请选择部门主管', trigger: 'blur'}
          ],
          position: [
            {required: true, message: '油站位置不能为空', trigger: 'blur'},
            {min: 1, max: 1000, message: '请输入1-300个字符', trigger: 'blur'}
          ],
          stationType: [
            {required: true, message: '请选择部门类型', trigger: 'blur'}
          ],
        }
      };
    },
    mounted() {
      this.deptService = new DepartmentService();
      this.initTypes();
      this.initStates();
      this.initOiltypes();
      this.initEmployees();
    },
    methods: {
      initStates() {
        this.deptService.enumList({
          'sta': 'state',
          'alls': 'no'
        }).then(response => {
          this.states = response;
        })
      },
      initTypes() {
        this.deptService.enumList({
          'sta': 'type',
          'alls': 'no'
        }).then(response => {
          this.types = response;
        })
      },
      initOiltypes() {
        this.deptService.enumList({
          'sta': 'oiltype',
          'alls': 'no'
        }).then(response => {
          this.oiltypes = response;
        })
      },
      initEmployees() {
        this.deptService.employeesList().then(response => {
          this.employees = response;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除
      handleDel(row) {
        this.$confirm('删除部门将同步删除其子部门，确定要删除吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          this.deptService.delOne(row.id).then(response => {
            if (response.success) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.getData(this.queryParams);
              // 调用刷新树
              this.$emit("flush");
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
          })
        })
      },
      // 启用
      enableDepartment(row) {
        this.deptService.enableDepartment(row.id).then(response => {
          if (response.success) {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.getData(this.queryParams);
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      // 停用
      disableDepartment(row) {
        this.deptService.disableDepartment(row.id).then(response => {
          if (response.success) {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.getData(this.queryParams);
          } else {
            this.$message({
              message: response.message,
              type: 'warning'
            });
          }
        })
      },
      getData(queryParams) {
        this.parentDepartmentName = queryParams.parentDepartmentName;
        delete queryParams.parentDepartmentName;
        this.queryParams = queryParams;
        this.loading = true;
        this.deptService.dataList(queryParams).then(response => {
          this.tableData = response;
          this.loading = false
        })
      },
      // 操作
      handleEdit(t, dept) {
        this.$nextTick(() => {
          this.$refs['form'].resetFields();
        })
        if (t === 'add') { // 新增
          if (this.parentDepartmentName === null || this.parentDepartmentName === undefined) {
            this.$message({
              message: '请先选择一个上级部门',
              type: 'warning'
            });
            return;
          }
          this.deptId = 0;
          this.form = {
            name: undefined,
            state: 1,
            departmentType: 1,
            parentDepartmentId: dept.parentDepartmentId,
            viewName: undefined,
            memo: undefined,
            managerEmployeeId: undefined,
            subManagerEmployeeId: undefined,
          };
        } else { // 修改，先去查询部门信息
          this.deptId = dept.id;
          this.form = {
            name: dept.name,
            state: dept.state,
            departmentType: dept.departmentType,
            parentDepartmentId: dept.parentDepartmentId,
            viewName: dept.viewName,
            memo: dept.memo,
            managerEmployeeId: dept.managerEmployeeId,
            subManagerEmployeeId: dept.subManagerEmployeeId,
          };
        }
        this.dialogTitle = t;
        this.dialogVisible = true;
      },
      handleEditOil(t, dept) {
        this.$nextTick(() => {
          this.$refs['formOil'].resetFields();
        })
        if (t == 'add') { // 新增
          if (this.parentDepartmentName === null || this.parentDepartmentName === undefined) {
            this.$message({
              message: '请先选择一个上级部门',
              type: 'warning'
            });
            return;
          }
          this.deptId = 0;
          this.formOil = {
            name: undefined,
            state: 1,
            departmentType: 2,
            parentDepartmentId: dept.parentDepartmentId,
            viewName: undefined,
            memo: undefined,
            managerEmployeeId: undefined,
            subManagerEmployeeId: undefined,
            latitude: undefined,
            longitude: undefined,
            position: undefined,
            openDate: undefined,
            stationType: undefined,
          }
        } else { // 修改，先去查询部门信息
          this.deptId = dept.id;
          this.formOil = {
            name: dept.name,
            state: dept.state,
            departmentType: dept.departmentType,
            parentDepartmentId: dept.parentDepartmentId,
            viewName: dept.viewName,
            memo: dept.memo,
            managerEmployeeId: dept.managerEmployeeId,
            subManagerEmployeeId: dept.subManagerEmployeeId,
            latitude: dept.latitude,
            longitude: dept.longitude,
            position: dept.position,
            openDate: dept.openDate,
            stationType: dept.stationType,
          };
        }
        this.dialogTitleOil = t;
        this.dialogVisibleOil = true;
      },
      //保存
      handleSave() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (this.deptId == 0) { // 新增
              this.deptService.saveDept(this.form).then(response => {
                if (response.success) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getData(this.queryParams);
                  // 调用刷新树
                  this.$emit("flush");
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              })
            } else {
              this.deptService.updDept(this.form, this.deptId).then(response => {
                if (response.success) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getData(this.queryParams);
                  // 调用刷新树
                  this.$emit("flush");
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              })
            }
          } else {
            return false;
          }
        })
      },
      //保存
      handleSaveOil() {
        this.$refs['formOil'].validate((valid) => {
          if (valid) {
            this.dialogVisibleOil = false;
            if (this.deptId == 0) { // 新增
              this.deptService.saveStation(this.formOil).then(response => {
                if (response.success) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getData(this.queryParams);
                  // 调用刷新树
                  this.$emit("flush");
                  this.deptId = undefined;
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              })
            } else {
              this.deptService.updStation(this.formOil, this.deptId).then(response => {
                if (response.success) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getData(this.queryParams);
                  // 调用刷新树
                  this.$emit("flush");
                  this.deptId = undefined;
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }

              })
            }
          } else {
            return false;
          }
        })
      }
    }
  };
</script>
<style lang="scss">
</style>
