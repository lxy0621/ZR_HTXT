<template>
  <div class="container">
    <el-card class="card">
      <div class="content">
        <div style="margin-top: 60px; margin-bottom: 100px; text-align: center;">
          <div class="form">
            <el-form :model="apkForm" ref="apkForm" label-width="110px" size="medium">
              <el-form-item label="应用名称" class="required" prop="name">
                <el-input v-model="apkForm.name"></el-input>
              </el-form-item>
              <el-form-item label="应用地址" class="required" prop="name">
                <el-input v-model="apkForm.url" readonly></el-input>
              </el-form-item>
              <el-form-item label="版本更新说明" prop="name">
                <el-input type="textarea" :rows="4" v-model="apkForm.versionMemo" maxlength="500" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="应用介绍" prop="name">
                <el-input type="textarea" :rows="4" v-model="apkForm.appMemo" maxlength="500" show-word-limit></el-input>
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
  import {CouponAdminService} from "@/service/marketing/tools/CouponAdminService";
  import {closeCurrentTabAndToTab} from "@/utils/iframe";

  export default {
    name: "ApkEdit",
    data() {
      return {
        active: 1,
        apkForm: {
          name: undefined,
          url: undefined,
          versionMemo: undefined,
          appMemo: undefined,
        },
      };
    },
    mounted() {
      this.couponAdminService = new CouponAdminService();

      if ({} != this.$route.params) {
        const param = this.$route.params;
        this.apkForm = {
          id: param.id,
          name: param.name,
          url: param.url,
          versionMemo: param.versionMemo,
          appMemo: param.appMemo,
        };
      }
    },
    methods: {
      cancel() {
        closeCurrentTabAndToTab('应用管理');
      },
      save() {
        closeCurrentTabAndToTab('应用管理');
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
