<template>
  <div>
    <el-card>
      <el-row :gutter="6" style="padding-top: 10px;padding-bottom: 10px;">
        <el-col :span="6">
          <el-input v-model="queryParams.name" placeholder="姓名" size="small" style="width: 95%"/>
        </el-col>
        <el-col :span="6">
          <el-input v-model="queryParams.mobile" placeholder="手机号" size="small" style="width: 95%" />
        </el-col>
        <el-col :span="6">
          <el-select v-model="queryParams.dept" placeholder="部门范围" size="small" style="width: 95%">
            <el-option v-for="item in rangeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="queryParams.accountOpenState" placeholder="账户开通状态" size="small" style="width: 95%">
            <el-option v-for="item in accountOpenStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" style="float:left; padding-left: 27px; padding-right: 27px;" size="small" @click="handleDataSearch">查询</el-button>
          <el-button style="float:left; padding-left: 27px; padding-right: 27px;" size="small" @click="handleAllReset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-top: 20px;"
      v-loading="dataListLoading"
    >
      <el-table-column type="selection" width="40" style="text-align: center">
      </el-table-column>
      <!--
			<el-table-column prop="action" label="操作" fixed align="center" width="80">
				<template slot-scope="scope">
					<el-link type="primary" :underline="false" size="small" @click="deleteEmployee(scope.row)">删除</el-link>
				</template>
			</el-table-column>
			-->
      <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="120" align="center"></el-table-column>
      <el-table-column prop="departmentName" label="所在部门" align="center"></el-table-column>
      <el-table-column prop="accountOpenState" width="120" label="账户状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.accountOpenState == '0'">未开通</span>
          <span v-if="scope.row.accountOpenState == '1'">已开通</span>
          <span v-if="scope.row.accountOpenState == '2'">已停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="jobTitle" width="120" label="岗位" align="center">
        <template slot-scope="scope">
          <span v-for="item in employeePosition" :value="item.value" :key="item.value">{{'' + scope.row.jobTitle === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="memo" label="备注信息" align="center"></el-table-column>
    </el-table>
    <el-pagination
      class="fixed-bottom-page"
      small
      :current-page="pageIndex"
      :page-sizes="[30, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalPage"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    ></el-pagination>

    <!--
    <el-dialog title="提示" :visible.sync="employeeSaveDialogVisible" width="50%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form" :model="form">
            <el-form-item label="员工编号">
              <el-input required size="small" v-model="form.employeeNo"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input required size="small" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="职位">
              <el-input required size="small" v-model="form.jobTitle"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input required size="small" v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input size="small" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="所在部门">
              <el-input required size="small" v-model="form.departmentId"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input size="small" v-model="form.memo"></el-input>
            </el-form-item>
            <el-form-item label="默认登录角色">
              <el-input size="small"></el-input>
            </el-form-item>
            <el-form-item label="开通中台后台">
              <el-checkbox required true-label=1 false-label=0 size="small" checked v-model="form.accountOpenState"></el-checkbox>
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="employeeSaveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEmployee">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="employeeEditDialogVisible" width="50%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-form ref="form" :model="editForm">
            <el-form-item label="姓名">
              <el-input required size="small" v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="职位">
              <el-input required size="small" v-model="editForm.jobTitle"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input required size="small" v-model="editForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input size="small" v-model="editForm.email"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="employeeEditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateEmployee">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
  import {EmployeeService} from '@/service/cloudoa/org/EmployeeService.js';
  import {CommonService} from "@/service/common/CommonService";

  const getDefaultQueryParamsEmp = () => ({
    name: '',
    mobile: '',
    departmentId: '',
    state: '',
    accountOpenState: '',
    dept: '1'
  });

  export default {
    name: 'DepartmentEmployeesTable',
    data() {
      return {
        employeeService: null,
        tableData: [],
        pageIndex: 1,
        pageSize: 30,
        totalPage: 0,
        dataListLoading: false,
        dataForm: {},
        queryParams: getDefaultQueryParamsEmp(),
        accountOpenStateList: [{ label: '未开通', value: '0' }, { label: '已开通', value: '1' }, { label: '已停用', value: '2' }],
        rangeList: [{ label: '在当前部门下查询', value: '1' }, { label: '在所有子部门下查询', value: '2' }],
        employeePosition: [],
      };
    },
    mounted() {
      this.employeeService = new EmployeeService();
      this.initSelectData();
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
      getDataList(params) {
        this.dataListLoading = true;
        this.dataForm = params;
        this.dataForm.page = this.pageIndex;
        this.dataForm.limit = this.pageSize;

        const queryParams = Object.assign(this.queryParams, params);
        this.employeeService.pagingEmployeesByDepartmentId(queryParams).then(response => {
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
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.getDataList(queryParams);
      },
      handleAllReset() {
        this.queryParams = {
          dept: '1',
          departmentId: this.queryParams.departmentId,
        };
        this.handleDataSearch();
      }
    }
  };
</script>
<style lang="scss"></style>
