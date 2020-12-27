<template>
	<div>
    <div class="opration-btn">
      <div>
        <button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleCreate()">
          添加品牌
        </button>
        <button type="button" v-waves class="el-button el-button--danger el-button--small" @click="batchDelete()">
          批量删除
        </button>
      </div>
    </div>
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
			<el-table-column prop="action" label="操作" fixed align="center" width="200">
				<template slot-scope="scope">
					<el-link type="primary" :underline="false" size="small" @click="handleUpdateMachineBrand(scope.row)">修改</el-link>&ensp;
					<el-link type="danger" :underline="false" size="small" @click="handleDeleteMachineBrand(scope.row)">删除</el-link>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="名称" align="center"></el-table-column>
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

		<el-dialog title="提示" :visible.sync="machineBrandCreateDialogVisible" width="40%" center>
			<el-tabs v-model="activeName">
				<el-tab-pane label="添加油机品牌" name="first">
					<el-form ref="createForm" label-width="100px" :rules="rules" :model="createForm">
						<el-form-item prop="name" label="品牌名称"><el-input size="small" v-model="createForm.name"></el-input></el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="machineBrandCreateDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="createMachineBrand">确 定</el-button>
			</span>
		</el-dialog>

    <el-dialog title="提示" :visible.sync="machineBrandUpdateDialogVisible" width="50%" center>
    	<el-tabs v-model="activeName">
    		<el-tab-pane label="修改油机品牌" name="first">
    			<el-form ref="updateForm" label-width="100px" :rules="rules" :model="updateForm">
    				<el-form-item prop="name" label="品牌名称">
              <el-input size="small" v-model="updateForm.name"></el-input>
            </el-form-item>
          </el-form>
    		</el-tab-pane>
    	</el-tabs>
    	<span slot="footer" class="dialog-footer">
    		<el-button size="medium" @click="machineBrandUpdateDialogVisible = false">取 消</el-button>
    		<el-button size="medium" type="primary" @click="updateMachineBrand">确 定</el-button>
    	</span>
    </el-dialog>
	</div>
</template>

<script>
import { MachineBrandService } from '@/service/system/station/MachineBrandService';

export default {
	name: 'MachineBrandsTable',
	data() {
		return {
		  machineBrandService: undefined,
			selectRows: [],
      loading: false,
			tableData: [],
			total: 0,
			machineBrandCreateDialogVisible: false,
			machineBrandUpdateDialogVisible: false,
			queryParams: {
				page: 1,
				limit: 30
			},
			createForm: {
				name: undefined
			},
			updateForm: {
				name: undefined
			},
			activeName: 'first',
			rules: {
				name: [
					{
						required: true,
						message: '请输入油机品牌名称',
						trigger: 'blur'
					}
         ]
			}
		};
	},
	mounted() {
	  this.machineBrandService = new MachineBrandService();
		this.getList(this.queryParams);
	},
	methods: {
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
			this.machineBrandService.pagingMachineBrands(params).then(response => {
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
		createMachineBrand() {
			this.$refs['createForm'].validate(valid => {
				if (valid) {
					// 验证通过
					this.machineBrandService
						.createMachineBrand(this.createForm)
						.then(response => {
							if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList(this.queryParams);
                this.machineBrandCreateDialogVisible = false;
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
    handleCreate() {
		  this.resetForm();
      this.machineBrandCreateDialogVisible = true;
    },
		batchDelete() {
			if (this.selectRows.length == 0) {
        this.$message({
          message: '请勾选要删除的油机品牌',
          type: 'warning'
        });
			} else {
				this.$confirm('确定要删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
          let ids = [];
          this.selectRows.forEach(function (value) {
            ids.push(parseInt(value.id));
          });
					this.machineBrandService.deleteMachineBrands(ids)
						.then(response => {
							if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList(this.queryParams);
                this.machineBrandCreateDialogVisible = false;
							} else {
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
							}
						}).catch(() => {
							this.getList(this.queryParams);
						});
				});
			}
		},
		handleSelectionChange(val) {
			this.selectRows = val;
		},
		handleDeleteMachineBrand(val) {
			this.selectRows[0] = val;
			this.batchDelete();
		},
		handleUpdateMachineBrand(obj) {
		  let machineBrandId = obj.id;
			this.machineBrandService.getMachineBrandById(machineBrandId).then(response => {
				this.updateForm.id = response.id;
				this.updateForm.name = response.name;
			});
			this.machineBrandUpdateDialogVisible = true;
		},
		updateMachineBrand() {
			this.$refs['updateForm'].validate(valid => {
				if (valid) {
					this.machineBrandService.updateMachineBrand(this.updateForm)
						.then(response => {
							if (response.success === true) {
                this.$message({
                  message: response.message,
                  type: 'success'
                });
                this.getList(this.queryParams);
                this.machineBrandUpdateDialogVisible = false;
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
		resetForm() {
			(this.form = {
				name: undefined
			});
      (this.updateForm = {
        name: undefined
      });
		}
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
