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
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" style="text-align: center" width="40"></el-table-column>
			<el-table-column prop="action" label="操作" fixed align="center" width="100">
				<template slot-scope="scope">
					<el-link type="primary" :underline="false" size="small" @click="handleEdit(scope.row, 'update')">修改</el-link>&ensp;
					<el-link v-if="scope.row.enabled == 0" type="primary" :underline="false" size="small" @click="enable(scope.row)">启用</el-link>
					<el-link v-if="scope.row.enabled == 1" type="danger" :underline="false" size="small" @click="disable(scope.row)">停用</el-link>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="标签名" align="center"></el-table-column>
			<el-table-column prop="groupName" label="标签组" align="center"></el-table-column>
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

		<el-dialog title="提示" :visible.sync="tagsEditDialogVisible" width="40%" center>
			<el-tabs v-model="activeName">
				<el-tab-pane :label="dialogTitle == 'add' ? '添加标签' : '修改标签'" name="first">
					<el-form ref="form" label-width="100px" :rules="rules" :model="form" size="small">
						<el-form-item prop="name" label="标签名"><el-input size="small" v-model="form.name"></el-input></el-form-item>
						<el-form-item prop="tagGroupId" label="标签组">
							<el-select v-model="form.tagGroupId" size="small" style="width: 100%">
								<el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="tagsEditDialogVisible = false">取 消</el-button>
				<el-button size="medium" v-if="dialogTitle == 'add'" type="primary" @click="saveTags">确 定</el-button>
				<el-button size="medium" v-if="dialogTitle == 'update'" type="primary" @click="updateTags">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { TagsService } from '@/service/system/tag/TagsService';

export default {
	name: 'TagsTable',
	data() {
		return {
			ids: [],
			tableData: [],
			total: 0,
			pageSize: 0,
			queryParams: {
				page: 1,
				limit: 30
			},
			activeName: 'first',
			service: null,
			tagsEditDialogVisible: false,
			form: {},
			groupList: [],
			rules: {
				name: [
					{
						required: true,
						message: '请输入组名',
						trigger: 'blur'
					}
				],
				tagGroupId: [
					{
						required: true,
						message: '请选择标签组',
						trigger: 'blur'
					}
				]
			},
			dialogTitle: undefined
		};
	},
	mounted() {
		if (undefined != this.$route.query.groupId) {
		  let groupId = this.$route.query.groupId
		  this.queryParams.tagGroupId = groupId;
		}
		this.service = new TagsService();
		this.getList(this.queryParams);
	},
	methods: {
		getList(params) {
			params.page == undefined ? (params.page = 1) : (params.page = this.queryParams.page);
			params.limit == undefined ? (params.limit = 30) : (params.limit = this.queryParams.limit);
			this.queryParams = params;
			this.service.pagingTags(params).then(response => {
				this.tableData = response.rows;
				this.total = parseInt(response.total);
				this.pageSize = response.total;
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
		handleSelectionChange(val) {
			this.ids = val;
		},
		batchDelete() {
			if (this.ids.length == 0) {
        this.$message({
          message: '请勾选要删除的标签',
          type: 'warning'
        });
			} else {
				this.$confirm('确定要删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let tagIds = [];
					for (let i = 0; i < this.ids.length; i++) {
						tagIds.push(parseInt(this.ids[i].id));
					}
					this.service.batchDelete(tagIds)
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
						}).catch(() => {
							this.getList(this.queryParams);
						});
				});
			}
		},
		saveTags() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					this.service.saveTags(this.form).then(response => {
						if (response.success === true) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.form = {};
              this.getList(this.queryParams);
              this.tagsEditDialogVisible = false;
						} else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
						}
					});
				} else {
					return false;
				}
			});
		},
		updateTags() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					this.service.updateTags(this.form).then(response => {
						if (response.success === true) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.form = {};
              this.getList(this.queryParams);
              this.tagsEditDialogVisible = false;
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              });
            }
					});
				} else {
					return false;
				}
			});
		},
		handleEdit(row, dialogTitle) {
			if (undefined != row) {
				this.form = row;
			}
			this.dialogTitle = dialogTitle;
			this.tagsEditDialogVisible = true;
		}
	}
};
</script>
<style lang="scss"></style>
