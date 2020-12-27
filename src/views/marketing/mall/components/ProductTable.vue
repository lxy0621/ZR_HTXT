<template>
  <div>
    <el-table
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom: 40px;"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" style="text-align: center" width="40"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="180">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" size="small" @click="handleUpdateProduct(scope.row)">修改</el-link>&ensp;
          <el-link type="primary" :underline="false" size="small" @click="handleOnShelf(scope.row)" v-if="scope.row.state == '0' || scope.row.state == '2'">上架</el-link>
          <el-link type="danger" :underline="false" size="small" @click="handleOffShelf(scope.row)" v-if="scope.row.state == '1'">下架</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="code" label="商品编码" align="center"></el-table-column>
      <el-table-column label="商品图片" align="center">
        <template slot-scope="scope">
          <img :src="accessUrl + scope.row.picture" style="width: 55px; height: 32px; line-height: 32px; vertical-align: middle;" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="money" label="价值（元）" align="center"></el-table-column>
      <el-table-column prop="score" label="兑换积分" align="center">
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold">{{scope.row.score}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="storeCount" label="库存件数" align="center"></el-table-column>
      <el-table-column prop="state" label="商品状态" align="center">
        <template slot-scope="scope">
          <span v-for="item in productState" :value="item.value" :key="item.value">{{'' + scope.row.state === item.value ? item.key : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="categoryId" label="商品分类" align="center">
        <template slot-scope="scope">
          <span v-for="item in category" :value="item.categoryId" :key="item.categoryName">{{'' + scope.row.categoryId === item.categoryId ? item.categoryName : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="exchangeCount" label="已兑换数" align="center" sortable>
        <template slot-scope="scope">
          <span style="color: #409EFF; font-weight: bold;">{{scope.row.exchangeCount === undefined ? 0 : scope.row.exchangeCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="权重" align="center"></el-table-column>
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

    <el-dialog title="提示" :visible.sync="productCreateDialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="创建商品" name="first">
          <el-form ref="createForm" label-width="100px" :rules="rules" :model="createForm">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="name" label="商品名称">
                  <el-input size="small" v-model="createForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="code" label="商品编码">
                  <el-input size="small" v-model="createForm.code" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="title" label="标题">
                  <el-input size="small" v-model="createForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="subTitle" label="副标题">
                  <el-input size="small" v-model="createForm.subTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="money" label="价值（元）">
                  <el-input-number v-model="createForm.money" size="small" :controls="false" :precision="2" style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="score" label="兑换积分">
                  <el-input-number v-model="createForm.score" size="small" :controls="false" :precision="0" style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="storeCount" label="库存">
                  <el-input-number v-model="createForm.storeCount" size="small" :controls="false" :precision="0" style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="state" label="商品分类">
                  <el-select v-model="createForm.categoryId" size="small" style="width:100%;">
                    <el-option v-for="item in category" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="state" label="商品状态">
                  <el-select v-model="createForm.state" size="small" style="width:100%;">
                    <el-option v-for="item in productState" :key="item.value" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="weight" label="权重">
                  <el-input-number v-model="createForm.weight" size="small" :controls="false" :precision="0" style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="substract" label="简介">
              <el-input type="textarea" size="small" v-model="createForm.substract"></el-input>
            </el-form-item>
            <el-form-item label="商品插图" prop="picture">
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
                <img v-if="picture" :src="picture" class="avatar" style="width: 100%; height:100%"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="productCreateDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="createProduct">确 定</el-button>
			</span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="productUpdateDialogVisible" width="50%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane label="修改商品" name="first">
          <el-form ref="updateForm" label-width="100px" :rules="rules" :model="updateForm">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="name" label="商品名称">
                  <el-input size="small" v-model="updateForm.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="code" label="商品编码">
                  <el-input size="small" v-model="updateForm.code" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="title" label="标题">
                  <el-input size="small" v-model="updateForm.title"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="subTitle" label="副标题">
                  <el-input size="small" v-model="updateForm.subTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="money" label="价值（元）">
                  <el-input-number v-model="updateForm.money" size="small" :controls="false" :precision="2" style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="score" label="兑换积分">
                  <el-input-number v-model="updateForm.score" size="small" :controls="false" :precision="0" style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="storeCount" label="库存">
                  <el-input-number v-model="updateForm.storeCount" size="small" :controls="false" :precision="0" style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="state" label="商品分类">
                  <el-select v-model="updateForm.categoryId" size="small" style="width:100%;">
                    <el-option v-for="item in category" :key="item.categoryId" :label="item.categoryName" :value="item.categoryId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="state" label="商品状态">
                  <el-select v-model="updateForm.state" size="small" style="width:100%;">
                    <el-option v-for="item in productState" :key="item.value" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="weight" label="权重">
                  <el-input-number v-model="updateForm.weight" size="small" :controls="false" :precision="0" style="width: 100%;"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="substract" label="简介">
              <el-input type="textarea" size="small" v-model="updateForm.substract"></el-input>
            </el-form-item>
            <el-form-item label="商品插图" prop="picture">
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
                <img v-if="picture" :src="picture" class="avatar" style="width: 100%; height:100%"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
    		<el-button size="medium" @click="productUpdateDialogVisible = false">取 消</el-button>
    		<el-button size="medium" type="primary" @click="updateProduct">确 定</el-button>
    	</span>
    </el-dialog>
  </div>
</template>

<script>
  import {ProductService} from '@/service/marketing/mall/ProductService';
  import {CommonService} from "@/service/common/CommonService";
  import Cookies from "js-cookie";
  import config from "@/net/http/config";

  export default {
    name: 'ProductTable',
    data() {
      return {
        productService: undefined,
        selectRows: [],
        loading: false,
        tableData: [],
        total: 0,
        productCreateDialogVisible: false,
        productUpdateDialogVisible: false,
        queryParams: {
          page: 1,
          limit: 30
        },
        productState: [],
        category: [],
        createForm: {
          name: undefined,
          code: undefined,
          title: undefined,
          subTitle: undefined,
          substract: undefined,
          money: undefined,
          score: undefined,
          storeCount: undefined,
          state: undefined,
          weight: undefined,
          picture: undefined,
          categoryId: undefined,
        },
        updateForm: {
          id: undefined,
          name: undefined,
          code: undefined,
          title: undefined,
          subTitle: undefined,
          substract: undefined,
          money: undefined,
          score: undefined,
          storeCount: undefined,
          state: undefined,
          weight: undefined,
          picture: undefined,
          categoryId: undefined,
        },
        activeName: 'first',
        rules: {
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 1, max: 15, message: '请输入1-15个字符', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入商品编码', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请输入商品标题', trigger: 'blur'},
            {min: 1, max: 20, message: '请输入1-20个字符', trigger: 'blur'}
          ],
          subTitle: [
            {max: 20, message: '不得超过30个字符', trigger: 'blur'},
          ],
          money: [
            {required: true, message: '请输入商品价值（元）', trigger: 'blur'},
          ],
          score: [
            {required: true, message: '请输入兑换积分', trigger: 'blur'},
          ],
          storeCount: [
            {required: true, message: '请输入库存件数', trigger: 'blur'},
          ],
          state: [
            {required: true, message: '请选择商品状态', trigger: 'blur'},
          ],
          categoryId: [
            {required: true, message: '请选择商品分类', trigger: 'blur'},
          ],
          substract: [
            {max: 200, message: '不得超过200个字符', trigger: 'blur'},
          ]
        },
        headers: {
          Authorization: Cookies.get("token")
        },
        accessUrl: '',
        uploadUrl: '',
        picture: '',
      };
    },
    mounted() {
      this.productService = new ProductService();
      this.initSelectData();
      this.getList(this.queryParams);

      this.accessUrl = config.accessUrl;
      this.uploadUrl = config.baseUrl + "/mall/product/uploadProductImage";
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "productState",
          enumValue: "EnumMallProductState",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('mall', param).then(response => {
          that.productState = response.productState;
        });

        // 初始化商品分类下拉框category
        this.productService.getCategorySelect().then(response => {
          that.category = response;
        });
      },
      getList(params) {
        this.loading = true;
        if (undefined != params.page) {
          params.page = this.queryParams.page;
        } else {
          params.page = 1;
        }
        if (undefined != params.limit) {
          params.limit = this.queryParams.limit;
        } else {
          params.limit = 30;
        }
        this.queryParams = params;
        this.productService.pagingProducts(params).then(response => {
          this.tableData = response.rows;
          this.total = parseInt(response.total);
          this.loading = false;
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
      createProduct() {
        debugger
        this.$refs['createForm'].validate(valid => {
          if (valid) {
            // 验证通过
            this.productService
              .createProduct(this.createForm)
              .then(response => {
                if (response.success === true) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getList(this.queryParams);
                  this.productCreateDialogVisible = false;
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
              }).catch(() => {
              this.getList(this.queryParams);
            });
          } else {
            return false;
          }
        });
      },
      handleSelectionChange(val) {
        this.selectRows = val;
      },
      handleCreateProduct() {
        this.resetForm();
        this.createForm.code = this.createProductCode();
        this.createForm.picture = undefined;
        this.productCreateDialogVisible = true;
      },
      handleUpdateProduct(obj) {
        let productId = obj.id;
        this.productService.getProductById(productId).then(response => {
          this.picture = config.accessUrl + response.picture;
          this.updateForm = {
            id: response.id,
            name: response.name,
            code: response.code,
            title: response.title,
            subTitle: response.subTitle,
            substract: response.substract,
            money: response.money,
            score: response.score,
            storeCount: response.storeCount,
            state: '' + response.state,
            weight: response.weight,
            categoryId: '' + response.categoryId,
            picture: response.picture,
          };
        });
        this.productUpdateDialogVisible = true;
      },
      handleOnShelf(row) {
        this.$confirm('确定上架此商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.productService.onShelf(row.id)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList(this.queryParams);
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
      handleOffShelf(row) {
        this.$confirm('确定下架此商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.productService.offShelf(row.id)
            .then(response => {
              if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList(this.queryParams);
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
      updateProduct() {
        this.$refs['updateForm'].validate(valid => {
          if (valid) {
            this.productService.updateProduct(this.updateForm)
              .then(response => {
                if (response.success === true) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                  this.getList(this.queryParams);
                  this.productUpdateDialogVisible = false;
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  });
                }
                this.resetForm();
              }).catch(() => {
              this.getList(this.queryParams);
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
      uploadPicUrl(res, file) {
        if (this.productCreateDialogVisible === true) {
          this.createForm.picture = res.message;
        }
        if (this.productUpdateDialogVisible === true) {
          this.updateForm.picture = res.message;
        }
        this.picture = this.accessUrl + res.message;
      },
      createProductCode() {
        const prefix = "PC-"
        const length = 8;
        const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
        return prefix + result;
      },
      resetForm() {
        (this.createForm = {
          name: undefined,
          code: undefined,
          title: undefined,
          subTitle: undefined,
          substract: undefined,
          money: undefined,
          score: undefined,
          storeCount: undefined,
          state: undefined,
          weight: undefined,
          picture: undefined,
          categoryId: undefined,
        });
        (this.updateForm = {
          name: undefined,
          code: undefined,
          title: undefined,
          subTitle: undefined,
          substract: undefined,
          money: undefined,
          score: undefined,
          storeCount: undefined,
          state: undefined,
          weight: undefined,
          picture: undefined,
          categoryId: undefined,
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .banner >>> .el-upload--picture-card {
    width: 280px;
  }
</style>
