<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>菜单配置</span>
      </div>
      <div class="operation-btn">
        <div>
          <button type="button" v-waves class="el-button el-button--primary el-button--mini" @click="createRootMenu">
            添加根菜单
          </button>
          <button type="button" v-waves class="el-button el-button--primary el-button--mini" @click="createChildMenu">
            添加子菜单
          </button>
          <button type="button" v-waves class="el-button el-button--primary el-button--mini" @click="updateMenu">
            修改菜单
          </button>
          <button type="button" v-waves class="el-button el-button--danger el-button--mini" @click="deleteMenu">
            删除菜单
          </button>
        </div>
        <div style="margin-top: 10px;">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-row :gutter="5">
                <el-col :span="6" class="grid-content-right">菜单ID：</el-col>
                <el-col :span="18">
                  <el-input v-model="menu.id" size="small" readonly></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row :gutter="5">
                <el-col :span="6" class="grid-content-right">菜单名称：</el-col>
                <el-col :span="18">
                  <el-input v-model="menu.name" size="small" readonly></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="grid-content-right">
              <el-row :gutter="5">
                <el-col :span="6" class="grid-content-right">菜单权重：</el-col>
                <el-col :span="18">
                  <el-input v-model="menu.weight" size="small" readonly></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
            </el-col>
            <el-col :span="6">
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-dialog title="添加菜单" :visible.sync="createMenuDialogVisible" :append-to-body="true" width="40%">
      <div class="dialogTitle">添加菜单</div>
      <el-divider></el-divider>
      <template>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" size="mini">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="父级菜单" prop="parentMenuName">
            <template v-if="menu.id === undefined">
              <el-input value="" disabled></el-input>
            </template>
            <template v-else>
              <el-input :value="menu.name" readonly></el-input>
            </template>
          </el-form-item>
          <el-form-item label="权重" prop="weight">
            <el-input v-model="form.weight"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button size="medium" @click="cancelCreateMenu('form')">取 消</el-button>
          <el-button size="medium" type="primary" @click="submitCreateMenu('form')">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog title="修改菜单" :visible.sync="updateMenuDialogVisible" :append-to-body="true" width="40%">
      <div class="dialogTitle">修改菜单</div>
      <el-divider></el-divider>
      <template>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" size="mini">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="权重" prop="weight">
            <el-input v-model="form.weight"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button size="medium" @click="cancelUpdateMenu('form')">取 消</el-button>
          <el-button size="medium" type="primary" @click="submitUpdateMenu('form')">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import {MenuService} from "@/service/system/config/MenuService";

  export default {
    name: "MenuForm",
    data() {
      return {
        menuService: undefined,
        createMenuDialogVisible: false,
        updateMenuDialogVisible: false,
        form: {
          name: undefined,
          parentMenuId: undefined,
          weight: undefined,
        },
        rules: {
          name: [{required: true, message: "请输入菜单名称", trigger: "blur"}],
        },
      };
    },
    mounted() {
      this.menuService = new MenuService();
    },
    props: ['menu'],
    methods: {
      createRootMenu() {
        this.menu = {};
        this.form = {
          parentMenuId: 0,
        }
        this.createMenuDialogVisible = true;
      },
      createChildMenu() {
        if (this.menu.id === undefined) {
          this.$message({
            message: '请选择一个菜单节点',
            type: 'warning'
          });
          return ;
        }
        this.form = {
          parentMenuId: this.menu.id,
        };
        this.createMenuDialogVisible = true;
      },
      updateMenu() {
        if (this.menu.id === undefined) {
          this.$message({
            message: '请选择一个菜单节点',
            type: 'warning'
          });
          return ;
        }
        this.form = {
          id: this.menu.id,
          name: this.menu.name,
          weight: this.menu.weight,
        }
        this.updateMenuDialogVisible = true;
      },
      deleteMenu() {
        if (this.menu.id === undefined) {
          this.$message({
            message: '请选择一个菜单节点',
            type: 'warning'
          });
          return ;
        }
        this.$confirm('确定删除菜单[' + this.menu.name + ']吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.menuService.deleteMenu(this.menu.id)
            .then(response => {

              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.$emit("loadMenuTree");
              } else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });
        }).catch(() => {
        });
      },
      cancelCreateMenu(form) {
        const set = this.$refs;
        set[form].resetFields();
        this.createMenuDialogVisible = false;
      },
      submitCreateMenu(form) {
        const set = this.$refs;
        set[form].validate(valid => {
          if (valid) {
            this.menuService.createMenu(this.form)
              .then(response => {
                if (response.success === true) {
                  this.createMenuDialogVisible = false;
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  set[form].resetFields();
                  this.$emit("loadMenuTree");
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
      cancelUpdateMenu(form) {
        const set = this.$refs;
        set[form].resetFields();
        this.updateMenuDialogVisible = false;
      },
      submitUpdateMenu(form) {
        const set = this.$refs;
        set[form].validate(valid => {
          if (valid) {
            this.menuService.updateMenu(this.form)
              .then(response => {
                if (response.success === true) {
                  this.updateMenuDialogVisible = false;
                  this.$message({
                    message: response.message,
                    type: "success"
                  });
                  set[form].resetFields();
                  this.$emit("loadMenuTree");
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
  }
</script>

<style scoped>
  .operation-btn {
    margin-bottom: 10px;
  }

  .grid-content-right {
    min-height: 32px;
    line-height: 32px;
    text-align: right;
    font-size: 10pt;
  }

  .dialogTitle {
    text-align: left;
    font-size: 15px;
    font-weight: bold;
  }
</style>
