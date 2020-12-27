<template>
  <div class="container">
    <el-card class="card">
      <div class="content">
        <div style="margin-top: 60px; margin-bottom: 100px; text-align: center;">
          <div class="form">
            <el-form :model="appForm" ref="appForm" label-width="110px" size="medium">
              <el-form-item label="应用Logo" prop="logoUrl">
                <el-upload
                  :action="uploadUrl"
                  list-type="picture-card"
                  size="small"
                  :show-file-list="false"
                  accept=".jpg, .jpeg, .png, .gif"
                  :before-upload="beforeUpload"
                  :on-success="uploadPicUrl"
                  :headers="headers"
                >
                  <el-image v-if="appForm.logoUrl" :src="accessUrl + appForm.logoUrl">
                  </el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="应用名称" class="required" prop="name">
                <el-input v-model="appForm.name"></el-input>
              </el-form-item>
              <el-form-item label="App Key" class="required" prop="name">
                <el-input v-model="appForm.key"></el-input>
              </el-form-item>
              <el-form-item label="应用介绍" class="required" prop="features">
                <el-input type="textarea" :rows="4" v-model="appForm.features" maxlength="500"
                          show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="memo">
                <el-input type="textarea" :rows="4" v-model="appForm.memo" maxlength="500" show-word-limit></el-input>
              </el-form-item>
              <el-form-item>
                <el-button style="margin-top: 12px;" @click="cancel">取消</el-button>
                <el-button type="primary" style="margin-top: 12px;" @click="save()">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {AppAdminService} from "@/service/system/app/AppAdminService";
import {closeCurrentTabAndToTab} from "@/utils/iframe";
import config from "@/net/http/config";
import Cookies from "js-cookie";

export default {
  name: "AppCreate",
  data() {
    return {
      appAdminService: undefined,
      active: 1,
      appForm: {
        name: undefined,
        logoUrl: undefined,
        key: undefined,
        features: undefined,
        memo: undefined,
      },
      headers: {
        Authorization: Cookies.get("token")
      },
      accessUrl: config.accessUrl,
      uploadUrl: config.baseUrl + "/mini/banner/uploadBannerImage",
    };
  },
  mounted() {
    this.appAdminService = new AppAdminService();
  },
  methods: {
    cancel() {
      closeCurrentTabAndToTab('应用管理');
    },
    save() {
      // 应用名称
      if (this.appForm.name === undefined || this.appForm.name === '') {
        this.$message({
          message: '应用名称不能为空',
          type: "warning"
        });
        return false;
      }
      // App Key
      if (this.appForm.key === undefined || this.appForm.key === '') {
        this.$message({
          message: 'App Key不能为空',
          type: "warning"
        });
        return false;
      }
      // 应用介绍
      if (this.appForm.features === undefined || this.appForm.features === '') {
        this.$message({
          message: '应用介绍不能为空',
          type: "warning"
        });
        return false;
      }

      this.appAdminService.createApk(this.appForm).then(response => {
        if (response.success === true) {
          this.$message({
            message: '创建应用成功',
            type: "success",
            duration: 1600,
          });
          closeCurrentTabAndToTab('应用管理');
        } else {
          this.$message({
            message: response.message,
            type: "error"
          });
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
      this.appForm.logoUrl = response.message;
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
