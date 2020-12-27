<template>
  <div>
    <el-card class="container">
      <banners-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search_panel"/>
      <div class="opration-btn">
        <div>
          <button type="button" v-waves class="el-button el-button--primary el-button--small"
                  @click="handleCreateBanner()">添加广告图
          </button>
          <button type="button" v-waves class="el-button el-button--danger el-button--small"
                  @click="handleBatchDeleteBanners()">批量删除
          </button>
        </div>
        <div></div>
      </div>
      <banners-table ref="table"></banners-table>
    </el-card>

    <el-dialog :visible.sync="createBannerDialogVisible" width="40%" center>
      <el-tabs>
        <el-tab-pane label="添加广告图">
          <el-form ref="form" :model="form" label-width="120px" :rules="rules" size="medium">
            <el-form-item label="推荐位" prop="posId">
              <el-input :disabled="true" size="small" v-model="dialogtitle"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="imageUrl">
              <el-upload
                :action="uploadUrl"
                list-type="picture-card"
                size="small"
                :show-file-list="false"
                accept=".jpg, .jpeg, .png, .gif"
                :before-upload="handleBeforeUpload"
                :on-success="handleOnSuccess"
                :headers="headers"
                class="banner"
              >
                <img v-if="imageUrl" :src="imageUrl" style="width: 100%; height: 100%;"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="内容链接" prop="url">
              <el-input size="small" v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="weight">
              <el-input-number size="small" v-model="form.weight" :step="5" style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="广告位状态" prop="enabled">
              <el-select v-model="form.enabled" size="small" style="width:100%;">
                <el-option v-for="item in bannerState" :key="item.value" :label="item.key"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <el-button size="medium" @click="createBannerDialogVisible = false">取 消</el-button>
            <el-button type="primary" size="medium" @click="submitCreateBanner('form')">确 定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import Cookies from "js-cookie";
  import config from "@/net/http/config";
  import bannersTable from "./components/BannersTable";
  import bannersSearch from "./components/BannersSearch";
  import {BannerService} from "@/service/marketing/mini/BannerService";
  import {CommonService} from "@/service/common/CommonService";

  export default {
    name: "Banners",
    components: {
      bannersSearch,
      bannersTable
    },
    data() {
      return {
        commonService: undefined,
        bannerService: undefined,
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
        queryParams: {
          page: 1,
          limit: 20,
          posId: ''
        },
        tableData: [],
        total: null,
        headers: {
          Authorization: Cookies.get("token")
        },
        bannerState: [],
        createBannerDialogVisible: false,
        accessUrl: '',
        uploadUrl: '',
        imageUrl: '',
        dialogtitle: '',
      };
    },
    mounted: function () {
      this.commonService = new CommonService();
      this.bannerService = new BannerService();
      this.initSelectData();

      this.dialogtitle = this.$route.query.name;
      this.accessUrl = config.accessUrl;
      this.uploadUrl = config.baseUrl + "/mini/banner/uploadBannerImage";
      this.form.posId = this.$route.query.id;
      this.queryParams.posId = this.$route.query.id;
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
      searchMarketCollectRecordList(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData(queryParams) {
        this.queryParams = {};
        this.$refs.table.getList(queryParams);
      },
      handleCreateBanner() {
        this.$nextTick(()=> {
          this.$refs['form'].resetFields();
        });
        this.createBannerDialogVisible = true;
      },
      handleBatchDeleteBanners() {
        this.$refs.table.batchDeleteBanners();
      },
      submitCreateBanner(form) {
        const set = this.$refs;
        set[form].validate(valid => {
          if (valid) {
            this.bannerService.createBanner(this.form).then(response => {
              if (response.success === true) {
                this.createBannerDialogVisible = false;
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
      },
      handleBeforeUpload(file) {
        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isLt100M) {
          this.$message.error("上传文件大小不能超过 100MB!");
        }
      },
      handleOnSuccess(res, file) {
        this.form.imageUrl = res.message;
        this.imageUrl = this.accessUrl + res.message;
      },
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

  .banner >>> .el-upload--picture-card {
    width: 280px;
  }
</style>
