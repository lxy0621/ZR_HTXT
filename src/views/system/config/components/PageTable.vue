<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>页面配置</span>
      </div>
      <div>
        <div class="operation-btn">
          <div>
            <button type="button" v-waves class="el-button el-button--primary el-button--mini" @click="createPage()">
              添加页面
            </button>
          </div>
        </div>
        <el-table
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :data="tableData"
          size="mini"
          border
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleTableCurrentChange"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
          <el-table-column prop="action" label="操作" fixed align="center" width="100">
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="updatePage(scope.row)" size="small">修改</el-link>&ensp;
              <el-link type="danger" :underline="false" @click="deletePage(scope.row)" size="small">删除</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="页面名称" align="center"></el-table-column>
          <el-table-column prop="url" label="页面URL" align="center"></el-table-column>
          <el-table-column prop="weight" label="权重" align="center"></el-table-column>
          <el-table-column prop="visible" label="是否可见" align="center">
            <template slot-scope="scope">
              <el-tag size="small" v-if="'' + scope.row.visible == '1'">可见</el-tag>
              <el-tag size="small" type="info" v-if="'' + scope.row.visible == '0'">不可见</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[30, 50, 100, 200]"
          :current-page="queryParams.page"
          :page-size="queryParams.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>

        <el-dialog :visible.sync="createPageDialogVisible" :close-on-click-modal=false width="40%">
          <template>
            <el-tabs v-model="activedCreateTab">
              <el-tab-pane label="添加页面" name="createPage">
                <el-form ref="createForm" :model="createForm" label-width="80px" :rules="rules" size="small">
                  <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="menu.name" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="页面名称" prop="name">
                    <el-input v-model="createForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="页面URL" prop="url">
                    <el-input v-model="createForm.url"></el-input>
                  </el-form-item>
                  <el-form-item label="权重" prop="weight">
                    <el-input-number v-model="createForm.weight" :step="5" style="width: 100%;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="是否可见" prop="weight">
                    <el-switch v-model="createForm.visible" active-value="1" inactive-value="0"></el-switch>
                  </el-form-item>
                </el-form>
                <div style="text-align: center">
                  <el-button size="medium" @click="createPageDialogVisible=false">取 消</el-button>
                  <el-button size="medium" type="primary" @click="submitCreatePage('createForm')">确 定</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-dialog>

        <el-dialog :visible.sync="updatePageDialogVisible" :close-on-click-modal=false width="40%">
          <template>
            <el-tabs v-model="activedUpdateTab">
              <el-tab-pane label="修改页面" name="updatePage">
                <el-form ref="updateForm" :model="updateForm" label-width="80px" :rules="rules" size="small">
                  <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="menu.name" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="页面名称" prop="name">
                    <el-input v-model="updateForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="页面URL" prop="url">
                    <el-input v-model="updateForm.url"></el-input>
                  </el-form-item>
                  <el-form-item label="权重" prop="weight">
                    <el-input-number v-model="updateForm.weight" :step="5" style="width: 100%;"></el-input-number>
                  </el-form-item>
                  <el-form-item label="是否可见" prop="weight">
                    <el-switch v-model="updateForm.visible" active-value="1" inactive-value="0"></el-switch>
                  </el-form-item>
                </el-form>
                <div style="text-align: center">
                  <el-button size="medium" @click="updatePageDialogVisible=false">取 消</el-button>
                  <el-button size="medium" type="primary" @click="submitUpdatePage('updateForm')">确 定</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-dialog>
      </div>
    </el-card>
    <el-divider></el-divider>
    <permission-table :page="page" ref="permissionTable"></permission-table>
  </div>
</template>

<script>
  import PermissionTable from './PermissionTable';
  import {PageService} from '@/service/system/config/PageService.js';

  export default {
    name: "PageTable",
    components: {
      PermissionTable,
    },
    data() {
      return {
        page: {},
        pageService: undefined,
        selectRows: [],
        tableData: [],
        total: 0,
        queryParams: {
          page: 1,
          limit: 30,
          menuId: this.menu.id,
        },
        activedCreateTab: 'createPage',
        createPageDialogVisible: false,
        createForm: {
          name: undefined,
          url: undefined,
          weight: undefined,
          visible: '1',
        },
        activedUpdateTab: 'updatePage',
        updatePageDialogVisible: false,
        updateForm: {
          name: undefined,
          url: undefined,
          weight: undefined,
          visible: undefined,
        },
        rules: {
          name: [{required: true, message: "请输入页面名称", trigger: "blur"}],
          url: [{required: true, message: "请输入页面URL", trigger: "blur"}],
          weight: [{required: true, message: "请输入页面排序", trigger: "blur"}],
          visible: [{required: true, message: "请选择是否可见", trigger: "blur"}],
        }
      };
    },
    props: ['menu'],
    mounted() {
      this.pageService = new PageService();
    },
    methods: {
      handleTableCurrentChange(val) {
        if (val != null) {
          this.page = val;
        } else {
          this.page = {
            id: -1,
            name: '',
          }
        }
        this.$refs.permissionTable.getList({
          page: 1,
          limit: 30,
          pageId: this.page.id,
        });
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      getList(queryParams) {
        this.page = {
          id: -1,
          name: -1,
        };
        this.pageService.pagingPages(queryParams)
          .then(response => {
            this.tableData = response.rows;
            this.total = parseInt(response.total);
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
      createPage() {
        if (this.menu.id === undefined) {
          this.$message({
            message: '请选择一个菜单节点',
            type: 'warning'
          });
          return;
        }
        this.createPageDialogVisible = true;
      },
      submitCreatePage(createForm) {
        const set = this.$refs;
        set[createForm].validate(valid => {
          if (valid) {
            this.createForm.menuId = this.menu.id;
            this.pageService.createPage(this.createForm).then(response => {
              if (response.success === true) {
                this.createPageDialogVisible = false;
                this.$message({
                  message: response.message,
                  type: "success"
                });
                this.resetPageForm();
                this.queryParams.menuId = this.menu.id;
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
      updatePage(row) {
        if (this.menu.id === undefined) {
          this.$message({
            message: '请选择一个菜单节点',
            type: 'warning'
          });
          return;
        }
        this.updateForm = {
          id: row.id,
          name: row.name,
          url: row.url,
          weight: row.weight,
          visible: '' + row.visible,
        }
        this.updatePageDialogVisible = true;
      },
      submitUpdatePage(updateForm) {
        const set = this.$refs;
        set[updateForm].validate(valid => {
          if (valid) {
            this.updateForm.menuId = this.menu.id;
            this.pageService.updatePage(this.updateForm).then(response => {
              if (response.success === true) {
                this.updatePageDialogVisible = false;
                this.$message({
                  message: response.message,
                  type: "success"
                });
                set[updateForm].resetFields();
                this.queryParams.menuId = this.menu.id;
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
      deletePage(row) {
        const ids = [row.id];
        this.$confirm("确定删除此页面吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let param = {
            menuId: this.menu.id,
            pageIds: ids,
          }
          this.pageService.deletePages(param).then(response => {
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
      resetPageForm() {
        this.createForm = {
          name: undefined,
          url: undefined,
          weight: undefined,
          visible: '1',
        };
        this.updateForm = {
          name: undefined,
          url: undefined,
          weight: undefined,
          visible: undefined,
        };
      }
    }
  }
</script>

<style scoped>
  .operation-btn {
    margin-bottom: 10px;
  }

  .page {
    background: #efefef;
    text-align: right;
    padding: 4px;
  }
</style>
