<template>
  <div>
    <div class="opration-btn">
      <div>
        <button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleCreate()">
          添加油机
        </button>
        <button type="button" v-waves class="el-button el-button--danger el-button--small" @click="batchDelete()">
          批量删除
        </button>
      </div>
    </div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom: 40px;"
      @selection-change="handleSelectionChange"
      v-loading="tableLoading"
    >
      <el-table-column type="selection" style="text-align: center" width="40"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="100">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="handleUpdate(scope.row)">修改</el-link>&ensp;
          <el-link type="danger" :underline="false" size="small" @click="deleteOilMachine(scope.row)">删除</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="oilMachineNo" label="油机编号" align="center" min-width="100"></el-table-column>
      <el-table-column prop="name" label="油机名" align="center" min-width="100"></el-table-column>
      <el-table-column prop="machineBrandId" label="油/气机品牌" align="center" min-width="220">
        <template slot-scope="scope">
          <span v-for="item in machineBrands" :key="item.value"
                v-if="scope.row.machineBrandId == item.value">{{ item.label}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stationId" label="油/气站名称" align="center" min-width="250">
        <template slot-scope="scope">
          <span v-for="item in stations" :key="item.value"
                v-if="scope.row.stationId == item.value">{{ item.label}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" align="center" min-width="150"></el-table-column>
      <el-table-column prop="weight" label="权重" align="center" min-width="90"></el-table-column>
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

    <el-dialog title="提示" :visible.sync="oilMachineCreateDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="添加油机" name="first">
          <el-form ref="createForm" label-width="100px" :rules="rules" :model="createForm" size="small">
            <el-form-item prop="oilMachineNo" label="油/气机编号">
              <el-input v-model="createForm.oilMachineNo"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="油机名">
              <el-input v-model="createForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="machineBrandId" label="油/气机品牌">
              <el-select v-model="createForm.machineBrandId" style="width: 100%">
                <el-option v-for="item in machineBrands" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="stationId" label="油/气站名称">
              <el-select v-model="createForm.stationId" style="width: 100%">
                <el-option v-for="item in stations" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权重">
              <el-input-number v-model="createForm.weight" :step="5" style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="createForm.memo"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="oilMachineCreateDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="saveOilMachines">确 定</el-button>
			</span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="oilMachineUpdateDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="修改油机" name="first">
          <el-form ref="updateForm" label-width="100px" :rules="rules" :model="updateForm" size="small">
            <el-form-item prop="oilMachineNo" label="油/气机编号">
              <el-input v-model="updateForm.oilMachineNo"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="油机名">
              <el-input v-model="updateForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="machineBrandId" label="油/气机品牌">
              <el-select v-model="updateForm.machineBrandId" style="width: 100%">
                <el-option v-for="item in machineBrands" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="stationId" label="油/气站名称">
              <el-select v-model="updateForm.stationId" style="width: 100%">
                <el-option v-for="item in stations" :key="item.value" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权重">
              <el-input-number v-model="updateForm.weight" :step="5" style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="updateForm.memo"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="oilMachineUpdateDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="updateOilMachine">确 定</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
  import {OilMachineService} from '@/service/system/station/OilMachineService';

  export default {
    name: 'OilMachinesTable',
    data() {
      return {
        oilMachineService: undefined,
        oilMachineIds: [],
        tableData: [],
        machineBrands: [],
        stations: [],
        total: 0,
        tableLoading: false,
        oilMachineCreateDialogVisible: false,
        oilMachineUpdateDialogVisible: false,
        queryParams: {
          page: 1,
          limit: 30
        },
        createForm: {
          oilMachineNo: undefined,
          name: undefined,
          stationId: undefined,
          machineBrandId: undefined,
          weight: undefined,
          memo: undefined
        },
        updateForm: {
          oilMachineNo: undefined,
          name: undefined,
          stationId: undefined,
          machineBrandId: undefined,
          weight: undefined,
          memo: undefined
        },
        activeName: 'first',
        rules: {
          oilMachineNo: [
            {
              required: true,
              message: '请输入油机编号',
              trigger: 'blur'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入油机名',
              trigger: 'blur'
            }
          ],
          machineBrandId: [
            {
              required: true,
              message: '请选择油机品牌',
              trigger: 'blur'
            }
          ],
          stationId: [
            {
              required: true,
              message: '请选择油站',
              trigger: 'blur'
            }
          ],
          weight: [
            {
              required: true,
              message: '请输入权重',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    mounted() {
      this.oilMachineService = new OilMachineService();
      this.machineBrandList();
      this.stationList();
      this.getList(this.queryParams);
    },
    methods: {
      machineBrandList() {
        this.oilMachineService.machineBrandList().then(response => {
          for (let i = 0; i < response.length; i++) {
            this.machineBrands.push({value: response[i].id, label: response[i].name})
          }
        });
      },
      stationList() {
        this.oilMachineService.stationList().then(response => {
          for (let i = 0; i < response.length; i++) {
            this.stations.push({value: response[i].id, label: response[i].name})
          }
        });
      },
      getList(params) {
        this.tableLoading = true;
        if (undefined != params.page) {
          params.page = this.queryParams.page;
        } else {
          params.page = 1;
        }
        if (undefined != params.limit) {
          params.limit = this.queryParams.limit;
        } else {
          params.limit = 30;
        }
        if (undefined != params.dateRange && params.dateRange.length > 0) {
          params.startTime = params.dateRange[0];
          params.endTime = params.dateRange[1];
        }
        delete params.dateRange;
        this.queryParams = params;

        this.oilMachineService.pagingOilMachines(params).then(response => {
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
      saveOilMachines() {
        this.$refs['createForm'].validate(valid => {
          if (valid) {
            // 验证通过
            this.oilMachineService.createOilMachine(this.createForm)
              .then(response => {
                if (response.success === true) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.resetForm();
                  this.getList(this.queryParams);
                  this.oilMachineCreateDialogVisible = false;
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              }).catch(() => {
              this.getList(this.queryParams);
            });
          } else {
            return false;
          }
        });
      },
      handleCreate() {
        this.resetForm();
        this.oilMachineCreateDialogVisible = true;
      },
      batchDelete() {
        if (this.oilMachineIds.length == 0) {
          this.$message({
            message: '请勾选要删除的油机',
            type: 'success'
          });
        } else {
          this.$confirm('确定要删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let machineIds = [];
            for (let i = 0; i < this.oilMachineIds.length; i++) {
              machineIds.push(parseInt(this.oilMachineIds[i].id));
            }
            this.oilMachineService.deleteOilMachines(machineIds)
              .then(response => {
                if (response.success === true) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getList(this.queryParams);
                  this.oilMachineCreateDialogVisible = false;
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
      handleSelectionChange(val) {
        this.oilMachineIds = val;
      },
      deleteOilMachine(val) {
        this.oilMachineIds[0] = val;
        this.batchDelete();
      },
      handleUpdate(obj) {
        let oilMachineId = obj.id;
        this.oilMachineService.getOilMachineById(oilMachineId)
          .then(response => {
            this.updateForm.id = response.id;
            this.updateForm.oilMachineNo = response.oilMachineNo;
            this.updateForm.name = response.name;
            this.updateForm.stationId = response.stationId;
            this.updateForm.machineBrandId = response.machineBrandId;
            this.updateForm.weight = response.weight;
            this.updateForm.memo = response.memo;
          });
        this.oilMachineUpdateDialogVisible = true;
      },
      updateOilMachine() {
        this.$refs['updateForm'].validate(valid => {
          if (valid) {
            this.oilMachineService.updateOilMachine(this.updateForm)
              .then(response => {
                if (response.success === true) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.resetForm();
                  this.getList(this.queryParams);
                  this.oilMachineUpdateDialogVisible = false;
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              }).catch(() => {
              this.getList(this.queryParams);
            });
          } else {
            return false;
          }
        });
      },
      resetForm() {
        (this.createForm = {
          oilMachineNo: undefined,
          name: undefined,
          stationId: undefined,
          machineBrandId: undefined,
          weight: undefined,
          memo: undefined
        });
        (this.updateForm = {
          oilMachineNo: undefined,
          name: undefined,
          stationId: undefined,
          machineBrandId: undefined,
          weight: undefined,
          memo: undefined
        });
      }
    }
  };
</script>
<style lang="scss"></style>
