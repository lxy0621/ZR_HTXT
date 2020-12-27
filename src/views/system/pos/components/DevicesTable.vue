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
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" style="text-align: center" width="40"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="120">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            size="small"
            @click="handleEdit(scope.row, 'update')"
          >修改</el-link>&ensp;
          <el-link
            v-if="scope.row.enabled == 0"
            type="primary"
            :underline="false"
            size="small"
            @click="enable(scope.row)"
          >启用</el-link>
          <el-link
            v-if="scope.row.enabled == 1"
            type="danger"
            :underline="false"
            size="small"
            @click="disable(scope.row)"
          >停用</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="设备名" align="center" min-width="160"></el-table-column>
      <el-table-column prop="deviceUuid" label="设备UUID" align="center" min-width="140"></el-table-column>
      <el-table-column label="设备可用状态" min-width="110" align="center">
        <template slot-scope="scope">
          <span
            v-for="item in deviceEnabled"
            :value="item.value"
            :key="item.value"
          >{{'' + scope.row.enabled === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stationName" label="授权部门" align="center" min-width="220"></el-table-column>
      <el-table-column prop="createdAt" label="添加时间" align="center" min-width="150"></el-table-column>
      <el-table-column prop="lastOnlineTime" label="最后更新时间" align="center" min-width="150"></el-table-column>
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

    <el-dialog title="提示" :visible.sync="deviceDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="dialogTitle == 'create' ? '添加设备' : '修改设备'" name="first">
          <el-form ref="form" label-width="100px" :rules="rules" :model="form" size="small">
            <el-form-item prop="name" label="设备名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="deviceUuid" label="设备UUID">
              <el-input v-model="form.deviceUuid"></el-input>
            </el-form-item>
            <el-form-item prop="staStationId" label="授权部门">
              <el-select v-model="form.staStationId" style="width: 100%">
                <el-option
                  v-for="item in stationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="enabled" label="启用状态">
              <el-select v-model="form.enabled" style="width: 100%">
                <el-option
                  v-for="item in enabledList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="deviceDialogVisible = false">取 消</el-button>
        <el-button
          size="medium"
          v-if="dialogTitle == 'create'"
          type="primary"
          @click="createDevice"
        >确 定</el-button>
        <el-button
          size="medium"
          v-if="dialogTitle == 'update'"
          type="primary"
          @click="updateDevice"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { DeviceService } from "@/service/system/device/DeviceService";
import { CommonService } from "@/service/common/CommonService";

export default {
  name: "DevicesTable",
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
      loading: false,
      activeName: "first",
      deviceService: null,
      deviceDialogVisible: false,
      form: {},
      stationList: [],
      rules: {
        name: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: "blur"
          }
        ],
        deviceUuid: [
          {
            required: true,
            message: "请输入设备UUID",
            trigger: "blur"
          }
        ],
        staStationId: [
          {
            required: true,
            message: "请选择授权部门",
            trigger: "blur"
          }
        ],
        enabled: [
          {
            required: true,
            message: "请选择启用状态",
            trigger: "blur"
          }
        ]
      },
      dialogTitle: undefined,
      enabledList: [
        {
          label: "已启用",
          value: 1
        },
        {
          label: "已停用",
          value: 0
        }
      ],
      deviceEnabled: []
    };
  },
  mounted() {
    this.deviceService = new DeviceService();
    this.getList(this.queryParams);
    this.initSelectData();
  },
  methods: {
    initSelectData() {
      const param = [
        {
          enumKey: "deviceEnabled",
          enumValue: "EnumDeviceEnabled"
        }
      ];
      const that = this;
      new CommonService().findEnumExcludeAll("pos", param).then(response => {
        that.deviceEnabled = response.deviceEnabled;
      });
    },
    getList(params) {
      this.loading = true;
      params.page == undefined
        ? (params.page = 1)
        : (params.page = this.queryParams.page);
      params.limit == undefined
        ? (params.limit = 30)
        : (params.limit = this.queryParams.limit);
      this.queryParams = params;
      this.deviceService.pagingDevices(params).then(response => {
        this.tableData = response.rows;
        this.total = parseInt(response.total);
        this.pageSize = response.total;
        this.loading = false;
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
          message: "请勾选要删除的设备",
          type: "warning"
        });
      } else {
        this.$confirm("确定要删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let deviceIds = [];
          for (let i = 0; i < this.ids.length; i++) {
            deviceIds.push(parseInt(this.ids[i].id));
          }

          this.deviceService
            .deleteDevices(deviceIds)
            .then(response => {
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
            })
            .catch(() => {
              this.getList(this.queryParams);
            });
        });
      }
    },
    createDevice() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            name: this.form.name,
            deviceUuid: this.form.deviceUuid,
            enabled: this.form.enabled,
            staStationId: this.form.staStationId
          };
          this.deviceService.createDevice(data).then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.form = {};
              this.getList(this.queryParams);
              this.deviceDialogVisible = false;
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
    updateDevice() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            id: this.form.id,
            name: this.form.name,
            deviceUuid: this.form.deviceUuid,
            enabled: this.form.enabled,
            staStationId: this.form.staStationId
          };
          this.deviceService.updateDevice(data).then(response => {
            if (response.success === true) {
              this.$message({
                message: response.message,
                type: "success"
              });
              this.form = {};
              this.getList(this.queryParams);
              this.deviceDialogVisible = false;
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
    handleEdit(row, dialogTitle) {
      if(undefined != row){
        this.form = {
          id: row.id,
          name: row.name,
          deviceUuid: row.deviceUuid,
          staStationId: row.staStationId,
          enabled: row.enabled
        };
      }
      this.dialogTitle = dialogTitle;
      this.deviceDialogVisible = true;
    },
    enable(row) {
      this.deviceService.enableDevice(row.id).then(response => {
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
    },
    disable(row) {
      this.deviceService.disableDevice(row.id).then(response => {
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
    }
  }
};
</script>
<style lang="scss"></style>
