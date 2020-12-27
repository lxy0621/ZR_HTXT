<template>
  <div>
    <div class="opration-btn">
      <div>
        <button
          type="button"
          v-waves
          class="el-button el-button--primary el-button--small"
          @click="handleAppCreate()"
        >创建应用
        </button>
      </div>
    </div>
    <!--表格内容栏-->
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
      <el-table-column type="selection" width="40" style="text-align: center">
      </el-table-column>
      <el-table-column fixed prop="handle" label="操作" fixed align="center" width="120">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" @click="handleDetail(scope.row)" size="small">详情&ensp;</el-link>
          <el-link type="primary" :underline="false" @click="handleUpdate(scope.row)" size="small">编辑&ensp;</el-link>
          <el-link type="primary" :underline="false" @click="handlePublish(scope.row)" size="small">发布</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="应用名称" align="center" min-width="130"></el-table-column>
      <el-table-column prop="name" label="应用Logo" align="center" min-width="100">
        <template slot-scope="scope">
          <img :src="accessUrl + scope.row.logoUrl" v-if="scope.row.logoUrl" style="width: 25px; height: 25px; vertical-align: middle;">
        </template>
      </el-table-column>
      <el-table-column prop="currentVersion" label="当前版本" align="center" min-width="100"></el-table-column>
      <el-table-column prop="buildVersion" label="Build" align="center" min-width="130"></el-table-column>
      <el-table-column prop="key" label="App Key" align="center" min-width="150"></el-table-column>
      <el-table-column prop="downloadUrl" label="下载地址" align="center" min-width="150" :show-overflow-tooltip='true'>
        <template slot-scope="scope">
          <i v-if="scope.row.downloadUrl !== undefined" class="el-icon-document-copy" v-clipboard:copy="scope.row.downloadUrl" v-clipboard:success="onSuccessCopy" v-clipboard:error="onErrorCopy"></i>&ensp;{{scope.row.downloadUrl}}
        </template>
      </el-table-column>
      <el-table-column prop="qrCodeUrl" label="下载二维码" align="center" min-width="130">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            trigger="hover">
            <div>扫描二维码下载</div>
            <img :src="scope.row.qrCodeUrl" style="width: 150px; height: 150px; text-align: center; vertical-align: middle;">
          <img v-if="scope.row.qrCodeUrl !== undefined" :src="scope.row.qrCodeUrl" style="width: 25px; height: 25px; vertical-align: middle;" slot="reference">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="updator" label="更新人" align="center" min-width="120"></el-table-column>
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
</template>

<script>
  import {AppAdminService} from "@/service/system/app/AppAdminService";
  import config from "@/net/http/config";

  export default {
    name: "AppAdminTable",
    data() {
      return {
        appAdminService: null,
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        tableLoading: false,
        active: 'first',
        accessUrl: config.accessUrl,
      };
    },
    mounted() {
      this.appAdminService = new AppAdminService();
      this.getList(this.queryParams);
    },
    methods: {
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {
        this.tableLoading = true;
        queryParams.page = undefined != queryParams.page ? this.queryParams.page : 1;
        queryParams.limit = undefined != queryParams.limit ? this.queryParams.limit : 30;
        this.queryParams = queryParams;

        this.appAdminService.queryApks(queryParams)
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
      handleAppCreate() {
        this.$router.push({
          name: "创建应用",
        });
      },
      handleDetail(row) {
        this.$router.push({
          name: "应用详情",
          query: row,
        });
      },
      handleUpdate(row) {
        this.$router.push({
          name: "编辑应用",
          params: {...row},
        });
      },
      handlePublish(row) {
        this.$router.push({
          path: "/system/app/ApkPublish",
          query: {
            id: row.id,
          }
        });
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
  };
</script>
<style lang="scss">
  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
