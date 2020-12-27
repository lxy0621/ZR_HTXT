<template>
  <div>
    <el-card>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
          <el-card>
            <department-tree ref="dept_tree" @initData='initDeptTree'/>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="18">
          <el-card>
            <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
              <el-tab-pane label="子部门信息" name="departmentSub">
                <department-sub-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData"
                                       ref="search_sub"/>
                <div class="opration-btn" style="height: 50px;line-height: 50px;">
                  <div>
                    <button type="button" v-waves class="el-button el-button--primary el-button--small"
                            @click="handleAdd">新建子部门
                    </button>
                    <button type="button" v-waves class="el-button el-button--small" @click="handleAddOil">添加油站</button>
                  </div>
                </div>
                <departmentSub-table ref="sub_table" @flush="flushTree"></departmentSub-table>
              </el-tab-pane>
              <el-tab-pane label="员工通讯录" name="departmentEmp">
                <!--
                <department-employees-search @search="searchMarketCollectRecordListEmp" @reset="resetAllParamsAndDataEmp" ref="search_emp" />
                <div class="opration-btn" style="height: 50px;line-height: 50px;">
                   <div>
                    <button type="button" v-waves class="el-button el-button&#45;&#45;primary el-button&#45;&#45;small" @click="" disabled>添加员工</button>
                  </div>
                </div>
                -->
                <department-employees-table ref="emp_table"></department-employees-table>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import DepartmentTree from "./components/DepartmentTree";
  import DepartmentEmployeesSearch from "./components/DepartmentEmployeesSearch";
  import DepartmentSubSearch from "./components/DepartmentSubSearch";
  import DepartmentEmployeesTable from "./components/DepartmentEmployeesTable";
  import DepartmentSubTable from "./components/DepartmentSubTable";

  export default {
    name: "Departments",
    components: {
      DepartmentTree,
      DepartmentEmployeesSearch,
      DepartmentSubSearch,
      DepartmentEmployeesTable,
      DepartmentSubTable,
    },
    data() {
      return {
        btu_dis: false,
        activeName: 'departmentSub',
        queryParams: {
          parentDepartmentId: 0
        },
        queryParamsEmp: {
          departmentId: 0
        },
        dept: {
          name: '',
          departmentType: null,
          parentDepartmentId: 0
        },

      };
    },
    mounted() {
      this.initDeptData() // 初始化查询
    },
    methods: {
      // 树节点点击调用
      initDeptTree(queryDept) {
        this.dept = queryDept;
        this.initDeptData();
      },
      // 构建查询
      initDeptData() {
        if (this.activeName == 'departmentSub') {
          this.queryParams = {
            parentDepartmentId: this.dept.parentDepartmentId,
            parentDepartmentName: this.dept.name,
          };
          /* if(this.dept.departmentType == 2){
            this.btu_dis = true
          }else{
            this.btu_dis = false
          } */
          this.searchMarketCollectRecordList(this.queryParams)
        }
        if (this.activeName == 'departmentEmp') {
          this.queryParamsEmp.departmentId = this.dept.parentDepartmentId;
          this.searchMarketCollectRecordListEmp(this.queryParamsEmp)
        }
      },
      // 标签页切换
      tabsHandleClick(tab, event) {
        this.initDeptData();
      },
      flushTree() {
        this.$refs.dept_tree.initDeptTree()
      },
      //查询子部门
      searchMarketCollectRecordList(queryParams) {
        this.queryParams = queryParams;
        this.queryParams.parentDepartmentId = this.dept.parentDepartmentId;
        this.$refs.sub_table.getData(this.queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.queryParams = queryParams;
      },
      // 新增部门
      handleAdd() {
        if (this.dept.parentDepartmentId == undefined || this.dept.parentDepartmentId == 0) {
          this.$message({
            message: '请选择部门',
            type: 'warning'
          });
        } else {
          if (this.dept.departmentType == 2) {
            this.$message({
              message: '油站下不允许添加子部门',
              type: 'warning'
            });
          } else {
            this.$refs.sub_table.handleEdit('add', this.dept)
          }
        }
      },
      // 添加油站
      handleAddOil() {
        if (this.dept.parentDepartmentId == undefined || this.dept.parentDepartmentId == 0) {
          this.$message({
            message: '请选择部门',
            type: 'warning'
          });
        } else {
          if (this.dept.departmentType == 2) {
            this.$message({
              message: '油站下不允许添加油站',
              type: 'warning'
            });
          } else {
            this.$refs.sub_table.handleEditOil('add', this.dept)
          }
        }
      },
      // 查询员工
      searchMarketCollectRecordListEmp(queryParamsEmp) {
        this.queryParamsEmp = queryParamsEmp;
        this.queryParamsEmp.departmentId = this.dept.parentDepartmentId;
        this.$refs.emp_table.getDataList(this.queryParamsEmp);
      },
      resetAllParamsAndDataEmp(queryParamsEmp) {
        this.queryParamsEmp = queryParamsEmp;
      },
    }
  }
</script>

<style scoped>

</style>
