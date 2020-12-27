<template>
  <div class="container">
    <el-card class="card">
      <div class="content">
        <el-steps :active="active" style="width: 100%" align-center>
          <el-step title="上传APK" icon="el-icon-upload"></el-step>
          <el-step title="发布APK" icon="el-icon-setting"></el-step>
          <el-step title="完成" icon="el-icon-star-off"></el-step>
        </el-steps>
        <div style="margin-top: 60px; margin-bottom: 100px; text-align: center;">
          <template v-if="active == 1" v-loading="loading">
            <el-upload
              class="upload-demo"
              drag
              :auto-upload="true"
              :action="uploadUrl"
              accept=".apk"
              :before-upload="beforeUpload"
              :on-progress="onProgressUpload"
              :on-success="onSuccessUpload"
              :on-remove="onRemoveFile"
              :headers="headers"
              :limit="1"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="desc">
              <p>
                点击按钮选择应用的安装包，或拖拽文件到此区域
                <br>
                仅支持apk文件，文件大小不超过100MB
              </p>
            </div>
            <div style="width: 500px; margin: 0 auto;">
              <el-button type="primary" style="margin-top: 12px; width: 500px;" @click="next()">下一步</el-button>
            </div>
          </template>
          <template v-if="active == 2">
            <div style="border: 1px solid #dddddd;width: 122px; height: 122px;border-radius: 10px;display: inline-block;padding: 3px;">
              <img
                style="width: 100%; height: 100%; border-radius: 8px;"
                :src="accessUrl + apkForm.logoUrl">
            </div>
            <div class="form">
              <el-form :model="apkForm" ref="apkForm" label-width="110px" size="medium">
                <el-form-item label="应用名称" class="required" prop="name">
                  <el-input v-model="apkForm.name" readonly></el-input>
                </el-form-item>
                <el-form-item label="应用地址" class="required" prop="filePath">
                  <el-input v-model="accessUrl + apkForm.filePath" readonly></el-input>
                </el-form-item>
                <el-form-item label="当前版本" class="required" prop="currentVersion">
                  <el-input v-model="apkForm.currentVersion"></el-input>
                </el-form-item>
                <el-form-item label="版本更新说明" class="required" prop="features">
                  <el-input type="textarea" :rows="4" v-model="apkForm.features" maxlength="500" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="memo">
                  <el-input type="textarea" :rows="4" v-model="apkForm.memo" maxlength="500" show-word-limit></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="width: 660px; margin-top: 12px; margin: 0 auto;">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-button style="width: 100%;" @click="before()">上一步</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" style="width: 100%;" @click="finish()">完成</el-button>
                </el-col>
              </el-row>
            </div>
          </template>
          <template v-if="active == 3">
            <template v-if="result.success">
              <i class="el-icon-success" style="font-size: 80pt;color: #67C23A;"></i>
              <br><br>
              <div style="font-size: 25pt;">应用发布成功</div>
              <div>
                <el-button type="primary" style="margin-top: 12px;" size="medium" @click="close">关&ensp;闭</el-button>
              </div>
            </template>
            <template v-else>
              <i class="el-icon-error" style="font-size: 80pt;color: #F56C6C;"></i>
              <br><br>
              <div style="font-size: 25pt;">应用发布失败</div>
              <div style="font-size: 14px; color: #999999; margin-top: 10px;"><i class="el-icon-warning" style="color: #F56C6C"></i>&ensp;{{result.message}}</div>
              <div>
                <el-button type="primary" style="margin-top: 12px;" size="medium" @click="close">关&ensp;闭</el-button>
              </div>
            </template>
          </template>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {AppAdminService} from "@/service/system/app/AppAdminService";
  import {closeCurrentTabAndToTab} from "@/utils/iframe";
  import Cookies from "js-cookie";
  import config from "@/net/http/config";

  export default {
    name: "ApkPublish",
    data() {
      return {
        active: 1,
        apkForm: {
          apkId: undefined,
          name: undefined,
          currentVersion: undefined,
          filePath: undefined,
          features: undefined,
          memo: undefined,
        },
        result: {
          success: true,
          message: '',
        },
        headers: {
          Authorization: Cookies.get("token"),
        },
        uploadUrl: '',
        accessUrl: config.accessUrl,
        loading: false,
      };
    },
    mounted() {
      this.appAdminService = new AppAdminService();

      if ({} != this.$route.query) {
        this.apkForm.apkId = this.$route.query.id;
        this.uploadUrl = config.baseUrl + '/system/apk/uploadApk/' + this.$route.query.id;

        // 查询单条记录
        this.appAdminService.getApk(this.$route.query.id).then(response => {
          if (response.success === true) {
            const data = response.data;
            this.apkForm = {
              apkId: data.id,
              logoUrl: data.logoUrl,
              name: data.name,
            }
          } else {
            this.$message({
              message: response.message,
              type: "error"
            });
          }
        });
      }
    },
    methods: {
      before() {
        if (this.active-- < 2) this.active = 0;
      },
      next() {
        if (this.apkForm.filePath === undefined) {
          this.$message({
            message: '请先上传APK文件',
            type: "info"
          });
          return false;
        }
        this.active++;
      },
      finish() {
        // 版本更新说明
        if (this.apkForm.features === undefined || this.apkForm.features === '') {
          this.$message({
            message: '版本更新说明不能为空',
            type: "warning"
          });
          return false;
        }

        this.appAdminService.release(this.apkForm).then(response => {
          this.result = {
            success: response.success,
            message: response.message,
          }
        });

        this.active++;
      },
      close() {
        closeCurrentTabAndToTab('应用管理');
      },
      beforeUpload(file) {
        const isLt100M = file.size / 1024 / 1024 < 100;
        if (!isLt100M) {
          this.$message.error("上传文件大小不能超过 100MB!");
        }
      },
      onProgressUpload: function (response) {
        this.loading = true;
      },
      onSuccessUpload: function (response) {
        this.loading = false;
        this.apkForm.filePath = response.data.file;
      },
      onRemoveFile: function (file, fileList) {
        this.apkForm.filePath = undefined;
      },
    }
  }
</script>

<style scoped>
  .container {
    min-height: 95%;
    padding: 10px;
    background-color: #fcfcfc;
  }

  .card {
    vertical-align: middle;
    height: 100%;
  }

  .content {
    width: 1000px;
    margin: 50px auto;
  }

  .form {
    width: 600px;
    margin: 50px auto;
  }

  .desc {
    width: 100%;
    padding: 0 0px;
    color: rgba(0, 0, 0, .45);
  }

  .desc h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, .45);
    font-size: 16px;
    line-height: 32px;
    font-weight: 500;
  }

  .desc h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
    line-height: 22px;
    font-weight: 500;
  }

  .desc p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }

  .required > .el-form-item__label::before {
    padding-top: 5px;
    content: "* ";
    color: red;
  }

  .el-upload-dragger {
    width: 500px;
  }
</style>
