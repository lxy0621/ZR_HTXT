<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-top:10px;margin-bottom:40px"
    >
      <el-table-column type="selection" width="39" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="130">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            size="small"
            @click="handleEdit(scope.row)"
          >修改&ensp;</el-link>
          <el-link
            v-if="scope.row.enabled == 0"
            type="primary"
            :underline="false"
            size="small"
            @click="enable(scope.row)"
          >启用&ensp;</el-link>
          <el-link
            v-if="scope.row.enabled == 1"
            type="danger"
            :underline="false"
            size="small"
            @click="enable(scope.row)"
          >停用&ensp;</el-link>
          <el-link
            v-if="scope.row.enabled == 0"
            type="danger"
            :underline="false"
            size="small"
            @click="deleteTicketRcords(scope.row)"
          >删除</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="stationName" label="部门名称" align="center" min-width="220"></el-table-column>
      <el-table-column prop="sn" label="序列号" align="center" min-width="150"></el-table-column>
      <el-table-column prop="onlineStatusDispaly" label="在线状态" align="center" min-width="100"></el-table-column>
      <el-table-column prop="enabledDisplay" label="状态" align="center" min-width="100"></el-table-column>
      <el-table-column prop="createdAt" label="添加时间" align="center" min-width="140"></el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" align="center" min-width="140"></el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <!-- 修改弹框 -->
    <el-dialog title="提示" :visible.sync="machineUpdateDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="修改小票机" name="first">
          <el-form ref="form" label-width="100px" :model="form" size="small">
            <el-form-item prop="stationName" label="部门名称">
              <span>{{ form.stationName }}</span>
            </el-form-item>
            <el-form-item prop="sn" label="序列号">
              <el-input size="small" v-model="form.sn"></el-input>
            </el-form-item>
            <el-form-item prop="state" label="状态">
              <el-select
                v-model="machineStateValue"
                placeholder="状态"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="item in machineState"
                  :key="item.enabled"
                  :label="item.name"
                  :value="item.enabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="machineUpdateDialogVisible = false">取 消</el-button>
        <el-button size="medium" @click="updateGroups" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增弹框 -->
    <el-dialog title="提示" :visible.sync="machineAddDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="添加小票机" name="first">
          <el-form ref="addForm" label-width="100px" :rules="rules" :model="addForm" size="small">
            <el-form-item prop="stationId" label="部门名称">
              <el-select
                v-model="addForm.stationId"
                placeholder="请选择部门名称"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="item in stations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="sn" label="序列号">
              <el-input size="small" placeholder="请填写序列号(小票打印机底部PID)" v-model="addForm.sn"></el-input>
            </el-form-item>
            <el-form-item prop="enabled" label="状态">
              <el-select
                v-model="addForm.enabled"
                placeholder="状态"
                size="small"
                style="width: 100%"
              >
                <el-option
                  v-for="item in machineState"
                  :key="item.enabled"
                  :label="item.name"
                  :value="item.enabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="cancelAdd">取 消</el-button>
        <el-button size="medium" @click="addSubmit" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { TicketService } from "@/service/system/ticket/TicketAdminService";
import { OilMachineService } from "@/service/system/station/OilMachineService";

export default {
  name: "ConfigureTable",
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 0,
      //分页参数
      queryParams: {
        page: 1,
        limit: 30
      },
      //修改启用禁用状态参数
      status: {
        id: 0,
        enabled: 0
      },
      currentPage: 1,
      //弹窗控制参数
      machineUpdateDialogVisible: false,
      machineAddDialogVisible: false,
      activeName: "first",
      //修改参数
      machineState: [
        {
          name: "已启用",
          enabled: 1
        },
        {
          name: "已停用",
          enabled: 0
        }
      ],
      rules: {
        stationId: [
          {
            required: true,
            message: "请选择部门名称",
            trigger: "blur"
          }
        ],
        sn: [
          {
            required: true,
            message: "请填写序列号",
            trigger: "blur"
          }
        ],
        enabled: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur"
          }
        ]
      },
      machineStateValue: undefined,
      stations: [],
      service: null,
      form: {},
      addForm: {
        stationId: undefined,
        sn: undefined,
        enabled: undefined
      },
      submitForm: {
        id: 0,
        stationId: 0,
        sn: undefined,
        enabled: undefined
      },
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.service = new TicketService();
    this.oilMachineService = new OilMachineService();
    this.getList(this.queryParams);
    this.stationList();
  },
  methods: {
    //获取列表
    getList(params) {
      params.page == undefined
        ? (params.page = 1)
        : (params.page = this.queryParams.page);
      params.limit == undefined
        ? (params.limit = 30)
        : (params.limit = this.queryParams.limit);
      this.queryParams = params;
      this.service.ticketMachineList(params).then(response => {
        this.total = parseInt(response.total);
        this.tableData = response.rows;
      });
    },
    //获取油站列表
    stationList() {
      this.oilMachineService.stationList().then(response => {
        for (let i = 0; i < response.length; i++) {
          this.stations.push({
            value: response[i].id,
            label: response[i].name
          });
        }
      });
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));  //深拷贝，防止内部两个有关联的数组对象相互影响
      this.sn = row.sn;
      this.machineStateValue = this.form.enabled;
      this.machineUpdateDialogVisible = true;
    },
    //修改提交
    updateGroups() {
      this.submitForm.id = this.form.id;
      this.submitForm.stationId = this.form.stationId;
      this.submitForm.enabled = this.machineStateValue;
      this.submitForm.sn = this.form.sn;
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.service.editTicketMachine(this.submitForm).then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.form = {};
              this.getList(this.queryParams);
              this.machineUpdateDialogVisible = false;
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
    //启用or禁用
    enable(row) {
      this.status.id = row.id;
      if (row.enabled == 1) {
        this.status.enabled = 0;
      } else {
        this.status.enabled = 1;
      }
      this.service.enabled(this.status).then(response => {
        this.$message({
          message: response.message,
          type: "success"
        });
        this.getList(this.queryParams);
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
    deleteTicketRcords(row) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.service.machineDelete(row.id).then(response => {
            this.$message({
              message: response.message,
              type: "success"
            });
            this.getList(this.queryParams);
          });
        })
        .catch(() => {});
    },
    cancelAdd() {
      this.machineAddDialogVisible = false;
    },
    addSubmit() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.service.editTicketMachine(this.addForm).then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.addForm = {};
              this.getList(this.queryParams);
              this.machineAddDialogVisible = false;
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
<style lang="scss"></style>
