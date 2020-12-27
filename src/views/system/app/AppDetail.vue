<template>
  <div class="container">
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span>最新版本</span>
      </div>
      <el-row :gutter="10">
        <el-col :span="5" style="width: 140px;">
          <div style="border: 1px solid #dddddd;width: 120px; height: 120px;border-radius: 10px;padding: 3px;">
            <img style="width: 100%; height: 100%; border-radius: 8px;" :src="logoUrl">
          </div>
        </el-col>
        <el-col :span="19">
          <el-row :gutter="10">
            <el-col :span="6">
              <span>{{appForm.name}}</span>
            </el-col>
            <el-col :span="6">
              <span>当前版本：{{appForm.currentVersion}}</span>
            </el-col>
            <el-col :span="6">
              <span>App Key：{{appForm.key}}</span>
            </el-col>
            <el-col :span="6">
              <span>更新说明：{{appForm.features}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 90px;margin-top: 10px;">
            <el-col :span="12">
              <div style="height: 90px;line-height:90px;vertical-align: middle;">下载地址：
                <span style="color: #1e9fff;">{{appForm.downloadUrl}}</span>&ensp;
                <i v-if="appForm.downloadUrl !== undefined" class="el-icon-document-copy" v-clipboard:copy="appForm.downloadUrl" v-clipboard:success="onSuccessCopy" v-clipboard:error="onErrorCopy"></i>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="height: 90px;line-height:90px;float:left;position:relative">
                <span>下载二维码：</span>
              </div>
              <div style="border: 1px solid #dddddd;height: 90px;width:90px;border-radius: 10px;display: inline-block;">
                <img style="width: 100%; height: 100%; border-radius: 8px;" :src="appForm.qrCodeUrl">
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="card" style="margin-top: 10px;">
      <div slot="header" class="clearfix">
        <span>版本信息</span>
      </div>
      <div>
        <el-table
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :data="tableData"
          size="mini"
          border
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%; margin-bottom: 40px;"
          @selection-change="handleSelectionChange"
          v-loading="tableLoading"
        >
          <el-table-column type="selection" width="40" style="text-align: center"></el-table-column>
          <el-table-column fixed prop="handle" label="操作" fixed align="center" width="100">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="handleDownload(scope.row)" size="small">下载</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="version" label="版本" align="center" min-width="100"></el-table-column>
          <el-table-column prop="buildVersion" label="Build" align="center" min-width="120"></el-table-column>
          <el-table-column prop="apkFileSize" label="安装包大小" align="center" min-width="130">
            <template slot-scope="scope">
              {{(scope.row.apkFileSize / 1024 / 1024).toFixed(2)}} MB
            </template>
          </el-table-column>
          <el-table-column prop="downloadCount" label="下载次数" align="center" min-width="100"></el-table-column>
          <el-table-column prop="features" label="版本更新说明" align="center" min-width="130"></el-table-column>
          <el-table-column prop="memo" label="备注" align="center" min-width="100"></el-table-column>
          <el-table-column prop="updator" label="更新人" align="center" min-width="100"></el-table-column>
          <el-table-column prop="updatedAt" label="更新时间" align="center" min-width="160"></el-table-column>
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
      </div>
    </el-card>
  </div>
</template>

<script>
  import {AppAdminService} from "@/service/system/app/AppAdminService";
  import config from "@/net/http/config";

  export default {
    name: "AppDetail",
    data() {
      return {
        active: 1,
        appForm: {
          id: undefined,
          name: undefined,
          logoUrl: undefined,
          currentVersion: undefined,
          buildVersion: undefined,
          downloadUrl: undefined,
          qrCodeUrl: undefined,
          key: undefined,
          features: undefined,
          memo: undefined,
        },
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        tableLoading: false,
        logoUrl: undefined,
      };
    },
    mounted() {
      this.appAdminService = new AppAdminService();

      if ({} != this.$route.query) {
        const params = this.$route.query;
        this.appForm = {
          id: params.id,
          name: params.name,
          logoUrl: params.logoUrl,
          currentVersion: params.currentVersion,
          buildVersion: params.buildVersion,
          downloadUrl: params.downloadUrl,
          qrCodeUrl: params.qrCodeUrl,
          key: params.key,
          features: params.features,
          memo: params.memo,
        };

        this.logoUrl = config.accessUrl + params.logoUrl;
        this.queryParams.apkId = params.id;
      }
      this.getList();
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList() {
        this.tableLoading = true;
        this.appAdminService.queryHistApks(this.queryParams)
          .then(response => {
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
      handleDownload(row) {
        window.location.href = row.downloadUrl;
      },
      onSuccessCopy(e) {
        this.$message({
          message: '复制下载地址成功',
          type: "success"
        });
      },
      onErrorCopy(e) {
        this.$message({
          message: '复制下载地址失败',
          type: "error"
        });
      },
    }
  }
</script>

<style>
  .container {
    min-height: 95%;
    padding: 10px;
    background-color: #fcfcfc;
  }

  .card {
    vertical-align: middle;
    height: 100%;
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
