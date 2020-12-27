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
      v-loading="listLoading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" style="text-align: center;" width="40"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="200">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleUpdateRecommendPosition(scope.row)" size="small">修改
          </el-link>&ensp;
          <el-link type="danger" :underline="false" @click="handleDel(scope.row)" size="small">删除</el-link>&ensp;
          <el-link type="info" @click="toBanner(scope.row)" :underline="false" size="small">配置记录
          </el-link>&ensp;
          <el-link type="danger" :underline="false" @click="handleDisableRecommendPosition(scope.row)" size="small"
                   v-if="scope.row.enabled == 1">停用
          </el-link>
          <el-link type="primary" :underline="false" @click="handleEnableRecommendPosition(scope.row)" size="small"
                   v-if="scope.row.enabled == 0">启用
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="推荐位名称" align="center" min-width="100"></el-table-column>
      <el-table-column prop="appId" label="小程序App" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-for="item in miniApp" :value="item.appId" :key="item.appId">{{'' + scope.row.appId === item.appId ? item.appName : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="posType" label="推荐位类型" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-for="item in positionType" :value="item.value" :key="item.value">{{'' + scope.row.posType === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="posKey" label="推荐位Key" align="center" min-width="100">
        <template slot-scope="scope">
          <span v-for="item in positionKey" :value="item.value" :key="item.value">{{'' + scope.row.posKey === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推荐位状态" prop="enabled" min-width="100">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.enabled == 1">已启用</el-tag>
          <el-tag size="small" type="danger" v-if="scope.row.enabled == 0">已停用</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fixed-bottom-page"
      small
      @size-change="handleSizeChange"
      @current-page="handleCurrentChange"
      :page-sizes="[30, 50, 100, 200]"
      :current-page.sync="queryParams.page"
      :page-size="queryParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog :visible.sync="updateRecommendPositionDialogVisible" :close-on-click-modal="false" width="40%">
      <template>
        <el-tabs v-model="activedTab">
          <el-tab-pane label="修改推荐位" name="updateRecommendPosition">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules" size="mini">
              <el-form-item label="推荐位名称" prop="name">
                <el-input v-model="form.name" size="small" style="width:100%;"></el-input>
              </el-form-item>
              <el-form-item label="小程序App" prop="name">
                <el-select v-model="form.appId" size="small" style="width:100%;">
                  <el-option v-for="item in miniApp" :key="item.appId" :label="item.appName"
                             :value="item.appId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="推荐位类型" prop="posType">
                <el-select v-model="form.posType" size="small" style="width:100%;">
                  <el-option v-for="item in positionType" :key="item.value" :label="item.key"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="推荐位Key" prop="posKey">
                <el-select v-model="form.posKey" size="small" style="width:100%;">
                  <el-option v-for="item in positionKey" :key="item.value" :label="item.key"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="推荐位状态" prop="enabled">
                <el-select v-model="form.enabled" size="small" style="width:100%;">
                  <el-option v-for="item in positionState" :key="item.value" :label="item.key"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button size="medium" @click="updateRecommendPositionDialogVisible=false">取 消</el-button>
              <el-button size="medium" type="primary" @click="submitUpdateRecommendPosition('form')">确 定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import config from "@/net/http/config";
  import {RecommendPositionService} from "@/service/marketing/mini/RecommendPositionService";
  import {CommonService} from "@/service/common/CommonService";

  export default {
    name: "PositionsTable",
    data() {
      return {
        commonService: undefined,
        recommendPositionService: undefined,
        miniApp: [],
        positionType: [],
        positionKey: [],
        positionState: [],
        listLoading: false,
        uploadUrl: "",
        selectRows: [],
        updateRecommendPositionDialogVisible: false,
        total: null,
        form: {
          id: "",
          appId: "",
          name: "",
          posType: "",
          posKey: "",
          enabled: "1"
        },
        rules: {
          appId: [
            {required: true, message: "请选择小程序App", trigger: "blur"}
          ],
          name: [
            {required: true, message: "请输入推荐位名称", trigger: "blur"}
          ],
          posType: [
            {required: true, message: "请选择推荐位类型", trigger: "blur"}
          ],
          posKey: [
            {required: true, message: "请选择推荐位编码", trigger: "blur"}
          ],
          enabled: [
            {required: true, message: "请选择推荐位状态", trigger: "blur"}
          ],
        },
        tableData: [],
        queryParams: {
          page: 1,
          limit: 20
        },
        activedTab: "updateRecommendPosition"
      };
    },
    mounted() {
      this.commonService = new CommonService();
      this.recommendPositionService = new RecommendPositionService()
      this.initSelectData();
      this.getList(this.queryParams);
    },
    methods: {
      initSelectData() {
        const that = this;

        // 推荐位type、Key
        const param = [{
          enumKey: "positionType",
          enumValue: "EnumRecommendPositionType",
        }, {
          enumKey: "positionKey",
          enumValue: "EnumRecommendPositionKey",
        }];
        this.commonService.findEnumExcludeAll('wechat', param).then(response => {
          that.positionType = response.positionType;
          that.positionKey = response.positionKey;
        });

        // 推荐位状态
        const param1 = [{
          enumKey: "positionState",
          enumValue: "EnumRecommendPositionState",
        }];
        this.commonService.findEnumExcludeAll('mini', param1).then(response => {

          that.positionState = response.positionState;
        })

        // 小程序
        this.recommendPositionService.getMiniAppSelect().then(response => {
          that.miniApp = response;
        });
      },
      getList(params) {
        this.listLoading = true;
        params.page = this.queryParams.page;
        params.limit = this.queryParams.limit;
        this.queryParams = params;
        new RecommendPositionService().pagingRecommendPositions(this.queryParams).then(response => {
          this.tableData = response.rows;
          this.total = parseInt(response.total);
          this.listLoading = false;
        });
      },
      handleSizeChange(val) {
        this.queryParams.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.queryParams.page = val;
        this.getList();
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      handleUpdateRecommendPosition(row) {
        this.form = {
          id: row.id,
          appId: row.id,
          name: row.name,
          enabled: "" + row.enabled,
          posType: "" + row.posType,
          posKey: "" + row.posKey
        };
        this.updateRecommendPositionDialogVisible = true;
      },
      handleDel(row) {
        const ids = [row.id];
        this.$confirm("确定删除此推荐位吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          new RecommendPositionService().deleteRecommendPositions(ids).then(response => {
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
        }).catch(() => {
        });
      },
      handleDisableRecommendPosition(row) {
        new RecommendPositionService().disableRecommendPosition(row.id).then(response => {
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
      handleEnableRecommendPosition(row) {
        new RecommendPositionService().enableRecommendPosition(row.id).then(response => {
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
      batchDelete() {
        if (this.selectRows.length == 0) {
          this.$message({
            message: "请至少勾选一条数据",
            type: "info"
          });
        } else {
          this.$confirm("确定删除勾选推荐位吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let ids = [];
            this.selectRows.forEach(function (value) {
              ids.push(parseInt(value.id));
            });
            new RecommendPositionService().deleteRecommendPositions(ids).then(response => {
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
          })
            .catch(() => {
            });
        }
      },
      submitUpdateRecommendPosition(form) {
        const set = this.$refs;
        set[form].validate(valid => {
          if (valid) {
            this.recommendPositionService.updateRecommendPosition(this.form).then(response => {
              if (response.success === true) {
                this.updateRecommendPositionDialogVisible = false;
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
      toBanner(row) {
        this.$router.push({
          path: "./banners",
          query: {id: row.id, name: row.name}
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
  .dialog-title {
    line-height: 30px;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 10px;
  }

  .el-input {
    width: 350px;
  }

  .el-form-item {
    margin-top: 6px;
  }
</style>
