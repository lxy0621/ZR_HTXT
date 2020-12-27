<template>
  <div>
    <!--表格内容栏-->
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="tableData" size="mini" border ref="multipleTable"
      tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-loading='dataListLoading'>
      <el-table-column type="selection" width="40" style="text-align: center;">
      </el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="140">
        <template slot-scope="scope">
          <el-link v-if="scope.row.state != 2" type="primary" :underline="false" @click="handleEdit('edit',scope.row)" size="small">修改</el-link>&ensp;
          <el-link type="danger" :underline="false" @click="handleDelete(scope.row)" size="small">删除</el-link>&ensp;
          <el-link v-if="scope.row.state == 0" type="primary" :underline="false" @click="usePrice(scope.row)" size="small">生效</el-link>
          <el-link v-if="scope.row.state == 1" type="danger" :underline="false" @click="unUsing(scope.row)" size="small">失效</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="油站名称" min-width="230" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.stationId == 0 || scope.row.susedRange == 2">全部</span>
          <span v-else>{{scope.row.stationName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="产品" align="center">
      </el-table-column>
      <el-table-column prop="productSkuName" label="油品" align="center">
      </el-table-column>
      <el-table-column prop="realPrice" label="价格" align="center" min-width="120">
        <template slot-scope="scope">
          <span style="color: red; font-weight: bold;">{{scope.row.realPrice}}元</span>
          <span style="color: red; font-weight: bold;" v-if="scope.row.productId == 3">/ 立方米</span>
          <span style="color: red; font-weight: bold;" v-else>/ 升</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="添加时间" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="employeeName" label="操作人" align="center" min-width="120">
      </el-table-column>
      <el-table-column prop="stateName" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="startDate" label="生效时间" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="endDate" label="失效时间" align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="memo" label="备注" align="center">
      </el-table-column>
    </el-table>
    <el-pagination class="fixed-bottom-page" small :current-page="pageIndex" :page-sizes="[30, 50, 100, 200]" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="totalPage" @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"></el-pagination>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" center>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="dialogTitle=='add'?'新增油价':'修改油价'" name="first">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="small">
            <el-form-item label="油站" prop="stationId">
              <el-select v-model="form.stationId" placeholder="全部油站" size="small" style="width: 100%">
                <el-option label="全部" value="0"></el-option>
                <el-option v-for="item in stations" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品" prop="productId">
              <el-select v-model="form.productId" placeholder="产品" size="small" style="width: 100%" @change="findProductSkuByProduct">
              	<el-option v-for="item in products" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="油品" prop="productSkuId">
              <el-select v-model="form.productSkuId" placeholder="油品" size="small" style="width: 100%">
              	<el-option v-for="item in oilType" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格" prop="realPrice">
              <el-input-number v-model="form.realPrice" placeholder="金额" size="small" :controls="false"
                :precision=2 style="width: 40%;"></el-input-number>
            </el-form-item>
            <el-form-item label="市场价格" prop = "marketPrice">
              <el-input-number v-model="form.marketPrice" placeholder="金额" size="small" :controls="false"
                :precision=2 style="width: 40%;"></el-input-number>
            </el-form-item>
            <el-form-item label="价格单位">
              <span v-if="form.productId == 3">/立方米</span>
              <span v-else>/升</span>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input type="textarea" size="small" v-model="form.memo" style="width: 100%">
              </el-input>
            </el-form-item>
          </el-form>
          <div class="" style="text-align: center;">
            <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
            <el-button type="primary" @click="handleSave()" size="medium">确 定</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

  </div>
</template>

<script>
  import {
    ProductPriceService
  } from '@/service/trade/product/ProductPriceService';
  export default {
    name: "ManualRechargeTable",
    data() {
      return {
        activeName:'first',
        dialogTitle:'add',
        dialogVisible: false,
        productPriceService: null,
        pageIndex: 1,
        pageSize: 30,
        totalPage: 0,
        dataListLoading: false,
        tableData: [],
        dataForm: {
          state:'1'
        },
        stations: [],
        products: [],
        oilType: [],
        dataId:null,
        form:{
          stationId:null,
          productId:null,
          productSkuId:null,
          memo:null,
          realPrice:0,
          marketPrice:0
        },
        rules:{
          stationId: [{
            required: true,
            message: '请选择油站',
            trigger: 'blur'
          }],
          productId: [{
            required: true,
            message: '请选择产品',
            trigger: 'blur'
          }],
          realPrice:[{
            required: true,
            message: '请输入单价',
            trigger: 'blur'
          }],
          marketPrice:[{
            required: true,
            message: '请输入市场价',
            trigger: 'blur'
          }],
          productSkuId: [{
            required: true,
            message: '请选择油品',
            trigger: 'blur'
          }],
        }
      };
    },
     mounted() {
      this.productPriceService = new ProductPriceService();
      this.getDataList(this.dataForm);
      this.queryAllStations();
      this.findAllProducts();
    },
    methods: {
      queryAllStations() {
      	this.productPriceService.queryAllStations().then(response => {
      		this.stations = response;
      	});
      },
      findAllProducts() {
        this.productPriceService.findAllProducts().then(response => {
          this.products = response;
        });
      },
      findProductSkuByProduct(){
        if(null != this.form.productId && undefined != this.form.productId && '' != this.form.productId && 0 != this.form.productId){
          this.productPriceService.findProductSkuByProduct(this.form.productId).then(response => {
            this.oilType = response;
          });
        }else{
          this.oilType = [];
        }
      },
      getDataList(params) {
        this.dataForm = params;
        this.dataListLoading = true;
        this.dataForm.page = this.pageIndex;
        this.dataForm.limit = this.pageSize;
        debugger
        this.productPriceService.pageList(this.dataForm).then(response => {
          this.tableData = response.rows;
          this.totalPage = parseInt(response.total);
          this.dataListLoading = false;
        });
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList(this.dataForm);
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val;
        this.getDataList(this.dataForm);
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除
      handleDelete(row) {
        this.$confirm('确定要删除当前油价记录吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          this.productPriceService.deletePrice(row.id).then(response => {
            if (response.success) {
              this.getDataList(this.dataForm);
            } else {
              this.$message.error(response.message);
            }
          })
        })
      },
      // 生效
      usePrice(row) {
        this.$confirm('确定要使用当前油价吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          this.productPriceService.usePrice(row.id).then(response => {
            if (response.success) {
              this.getDataList(this.dataForm)
            } else {
              this.$message.error(response.message);
            }
          })
        })
      },
      // 失效
      unUsing(row) {
        this.$confirm('确定要停用当前油价吗？', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: 'warning'
        }).then(() => {
          this.productPriceService.unUsing(row.id).then(response => {
            if (response.success) {
              this.getDataList(this.dataForm)
            } else {
              this.$message.error(response.message);
            }
          })
        })
      },
      // 新增/修改
      handleEdit(t,row) {
        this.dialogTitle = t
        this.dialogVisible = true
        if (t == 'add') { // 新增
          this.dataId = null
          this.form.stationId = null
          this.form.productId = null
          this.form.productSkuId = null
          this.form.memo = null
          this.form.realPrice=0
          this.form.marketPrice=0
          this.oilType=[]
        } else { // 修改，先去查询部门信息
          this.dataId = row.id
          this.form.stationId = row.stationId
          this.form.productId = row.productId
          this.form.productSkuId = row.productSkuId
          this.form.memo = row.memo
          this.form.realPrice=row.realPrice
          this.form.marketPrice=row.marketPrice
          this.findProductSkuByProduct()
        }
      },
      //保存
      handleSave() {
        if(this.form.realPrice == 0){
          this.$message.error("价格必须大于 0 ");
          return false;
        }
        if(this.form.marketPrice == 0){
          this.$message.error("市场价必须大于 0 ");
          return false;
        }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (null == this.dataId || this.dataId == undefined || this.dataId == 0) { // 新增
              this.productPriceService.saveData(this.form).then(response => {
                if (response.success) {
                  this.getDataList(this.dataForm);
                  this.$message({
                    message: response.message,
                    type: 'success'
                  })
                } else {
                  this.$message.error(response.message);
                }
              })
            } else {
              this.productPriceService.updData(this.form, this.dataId).then(response => {
                if (response.success) {
                  this.getDataList(this.dataForm);
                  this.$message({
                    message: response.message,
                    type: 'success'
                  })
                } else {
                  this.$message.error(response.message);
                }
              })
            }
          } else {
            return false;
          }
        })
      },
    }
  };
</script>
<style lang="scss">
</style>
