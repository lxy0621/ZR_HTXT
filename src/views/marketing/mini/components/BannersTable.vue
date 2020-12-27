<template>
  <div>
    <el-table
      v-loading="loading"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom: 40px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" style="text-align: center;" width="40"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="130">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleUpdateBanner(scope.row)" size="small">修改&ensp;</el-link>
          <el-link type="danger" :underline="false" @click="handleDisableBanner(scope.row)" size="small"
                   v-if="scope.row.enabled == 1">停用&ensp;
          </el-link>
          <el-link type="primary" :underline="false" @click="handleEnableBanner(scope.row)" size="small"
                   v-if="scope.row.enabled == 0">启用&ensp;
          </el-link>
          <el-link type="danger" :underline="false" @click="handleDeleteBanner(scope.row)" size="small" v-if="scope.row.enabled == 0">删除</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Banner名称" align="center" min-width="100"></el-table-column>
      <el-table-column prop="posName" label="推荐位" align="center" min-width="100"></el-table-column>
      <el-table-column label="图片" align="center" min-width="100">
        <template slot-scope="scope">
          <img :src="accessUrl + scope.row.imageUrl" style="width: 55px; height: 32px; line-height: 32px;" />
        </template>
      </el-table-column>
      <el-table-column prop="url" label="内容链接" align="center" min-width="200" :show-overflow-tooltip='true'></el-table-column>
      <el-table-column prop="weight" label="权重" align="center" min-width="100"></el-table-column>
      <el-table-column align="center" label="广告图状态" prop="enabled" min-width="100">
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

    <el-dialog :visible.sync="updateBannerDialogVisible" :close-on-click-modal="false" width="40%">
      <template>
        <el-tabs v-model="activedTab">
          <el-tab-pane label="修改广告图" name="updateBanner">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules" size="mini">
              <!--
              <el-form-item label="推荐位" prop="posId">
                <el-input :disabled="true" size="small" v-model="dialogtitle" style="width: 100%"></el-input>
                <div style="display:none;">
                  <el-input type="hidden" v-model="form.posId"></el-input>
                  <el-input type="hidden" v-model="form.id"></el-input>
                </div>
              </el-form-item>
              -->
              <el-form-item label="Banner名称" prop="name">
                <el-input size="small" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="图片" prop="imageUrl">
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  size="small"
                  :show-file-list="false"
                  accept=".jpg, .jpeg, .png, .gif"
                  :before-upload="beforeUpload"
                  :on-success="uploadPicUrl"
                  :headers="headers"
                  class="banner"
                >
                  <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar" style="width: 100%; height:100%"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接" prop="url">
                <el-input size="small" v-model="form.url"></el-input>
              </el-form-item>
              <el-form-item label="排序" prop="weight">
                <el-input-number size="small" v-model="form.weight" :step="5" style="width: 100%;"></el-input-number>
              </el-form-item>
              <el-form-item label="广告图状态" prop="enabled">
                <el-select v-model="form.enabled" size="small" style="width:100%;">
                  <el-option v-for="item in bannerState" :key="item.value" :label="item.key"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button size="medium" @click="updateBannerDialogVisible=false">取 消</el-button>
              <el-button size="medium" type="primary" @click="submitUpdateBanner('form')">确 定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import config from "@/net/http/config";
  import {BannerService} from "@/service/marketing/mini/BannerService";
  import Cookies from "js-cookie";
  import {CommonService} from "@/service/common/CommonService";

  export default {
    name: "BannersTable",
    data() {
      return {
        commonService: undefined,
        bannerService: undefined,
        headers: {
          Authorization: Cookies.get("token")
        },
        loading: false,
        tableData: [],
        queryParams: {
          page: 1,
          limit: 20
        },
        total: null,
        selectRows: [],
        uploadUrl: "",
        dialogImageUrl: "",
        dialogtitle: "",
        updateBannerDialogVisible: false,
        form: {
          id: undefined,
          posId: undefined,
          name: undefined,
          imageUrl: undefined,
          url: undefined,
          weight: undefined,
          enabled: '1',
        },
        rules: {
          name: [{required: true, message: "请输入广告名称", trigger: "blur"}],
          imageUrl: [{required: true, message: "请上传广告图片", trigger: "blur"}],
          enabled: [{required: true, message: "请选择广告图状态", trigger: "blur"}],
        },
        bannerState: [],
        activedTab: "updateBanner",
        accessUrl: undefined,
      };
    },
    mounted() {
      this.commonService = new CommonService();
      this.bannerService = new BannerService();
      this.initSelectData();

      this.dialogtitle = this.$route.query.name;
      this.accessUrl = config.accessUrl;
      this.uploadUrl = config.baseUrl + "/mini/banner/uploadBannerImage";
      this.form.posId = this.$route.query.id;
      this.queryParams.posId = this.$route.query.id;
      this.getList(this.queryParams);
    },
    methods: {
      initSelectData() {
        const that = this;

        // 广告位状态
        const param = [{
          enumKey: "bannerState",
          enumValue: "EnumBannerState",
        }];
        this.commonService.findEnumExcludeAll('mini', param).then(response => {
          that.bannerState = response.bannerState;
        })
      },
      getList(params) {
        this.loading = true;
        params.page = this.queryParams.page;
        params.limit = this.queryParams.limit;
        this.queryParams = params;
        new BannerService().pagingBanners(this.queryParams).then(response => {
          this.tableData = response.rows;
          this.total = parseInt(response.total);
          this.loading = false;
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
      handleUpdateBanner(row) {
        this.$nextTick(()=> {
          this.$refs['form'].resetFields();
        });
        this.dialogImageUrl = config.accessUrl + row.imageUrl;
        this.form = {
          id: row.id,
          posId: this.queryParams.posId,
          name: row.name,
          imageUrl: row.imageUrl,
          url: row.url,
          weight: row.weight,
          enabled: '' + row.enabled,
        };
        this.updateBannerDialogVisible = true;
      },
      handleDeleteBanner(row) {
        const ids = [row.id];
        this.$confirm("确定删除此广告吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.bannerService.deleteBanners(ids).then(response => {
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
      handleDisableBanner(row) {
        this.bannerService.disableBanner(row.id).then(response => {
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
      handleEnableBanner(row) {
        this.bannerService.enableBanner(row.id).then(response => {
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
      batchDeleteBanners() {
        if (this.selectRows.length == 0) {
          this.$message({
            message: "请至少勾选一条数据",
            type: "info"
          });
        } else {
          this.$confirm("确定删除勾选广告图吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let ids = [];
            this.selectRows.forEach(function (value) {
              ids.push(parseInt(value.id));
            });
            this.bannerService.deleteBanners(ids).then(response => {
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
        }
      },
      submitUpdateBanner(form) {
        const set = this.$refs;
        set[form].validate(valid => {
          if (valid) {
            this.bannerService.updateBanner(this.form).then(response => {
              if (response.success === true) {
                this.updateBannerDialogVisible = false;
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
      beforeUpload(file) {
        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isLt100M) {
          this.$message.error("上传文件大小不能超过 100MB!");
        }
      },
      uploadPicUrl: function (response) {
        this.dialogVisible = true;
        this.form.imageUrl = response.message;
        this.dialogImageUrl = config.accessUrl + response.message;
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

  .el-form-item {
    margin-top: 6px;
  }

  .banner >>> .el-upload--picture-card {
    width: 280px;
  }
</style>
