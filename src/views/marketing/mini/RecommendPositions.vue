<template>
  <div>
    <el-card class="container">
      <positions-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <div class="opration-btn">
        <div>
          <button type="button" v-waves class="el-button el-button--primary el-button--small"
                  @click="handleCreateRecommendPosition()">添加推荐位
          </button>
          <button type="button" v-waves class="el-button el-button--danger el-button--small"
                  @click="handleBatchDelete()">批量删除
          </button>
        </div>
        <div></div>
      </div>
      <positions-table ref="table"></positions-table>
    </el-card>
    <el-dialog :visible.sync="createRecommendPositionDialogVisible" :close-on-click-modal="false" width="40%">
      <template>
        <el-tabs v-model="activedTab">
          <el-tab-pane label="添加推荐位" name="createRecommendPosition">
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
              <el-button size="medium" @click="createRecommendPositionDialogVisible=false">取 消</el-button>
              <el-button size="medium" type="primary" @click="submitCreateRecommandPosition('form')">确 定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import positionsTable from "./components/PositionsTable";
  import positionsSearch from "./components/PositionsSearch";
  import {RecommendPositionService} from "@/service/marketing/mini/RecommendPositionService";
  import {CommonService} from "@/service/common/CommonService";

  export default {
    name: "Positions",
    components: {
      positionsTable,
      positionsSearch
    },
    data() {
      return {
        commonService: undefined,
        recommendPositionService: undefined,
        queryParams: {
          page: 1,
          limit: 20
        },
        miniApp: [],
        positionType: [],
        positionKey: [],
        positionState: [],
        createRecommendPositionDialogVisible: false,
        form: {
          name: undefined,
          posType: undefined,
          posKey: undefined,
          enabled: '1',
        },
        rules: {
          appId: [
            {required: true, message: "请选择小程序App", trigger: "blur"}
          ],
          name: [
            {required: true, message: "请输入推荐位名称", trigger: "blur"},
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
        activedTab: "createRecommendPosition"
      };
    },
    mounted() {
      this.commonService = new CommonService();
      this.recommendPositionService = new RecommendPositionService();
      this.initSelectData();
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
      searchMarketCollectRecordList(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.queryParams = {};
        this.$refs.table.getList(queryParams);
      },
      handleCreateRecommendPosition() {
        this.$nextTick(()=> {
          this.$refs['form'].resetFields();
        });
        this.createRecommendPositionDialogVisible = true;
      },
      handleBatchDelete() {
        this.$refs.table.batchDelete();
      },
      submitCreateRecommandPosition(form) {
        const set = this.$refs;
        set[form].validate(valid => {
          if (valid) {
            this.recommendPositionService.createRecommendPosition(this.form).then(response => {
              if (response.success === true) {
                this.createRecommendPositionDialogVisible = false;
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

<style scoped>
  .container {
    margin: 10px;
  }

  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
