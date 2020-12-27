<template>
	<div>
    <div class="opration-btn">
      <div>
        <button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleCreate()">
          添加油枪
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
      v-loading="tableLoading"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
			<el-table-column prop="action" label="操作" fixed align="center" width="100">
				<template slot-scope="scope">
					<el-link type="primary" :underline="false" size="small" @click="handleUpdate(scope.row)">修改&ensp;</el-link>
					<el-link type="danger" :underline="false" size="small" @click="deleteOilGun(scope.row)">删除</el-link>
				</template>
			</el-table-column>
			<el-table-column prop="oilGunNo" label="油枪编号" align="center" min-width="100"></el-table-column>
			<el-table-column prop="name" label="油枪名" align="center" min-width="100"></el-table-column>
			<el-table-column prop="stationId" label="油/气站名称" align="center" min-width="220">
				<template slot-scope="scope">
					<span v-for="item in stations" :key="item.value" v-if="scope.row.stationId == item.value">{{ item.label }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="oilMachineId" label="油/气机名称" align="center" min-width="150">
				<template slot-scope="scope">
					<span v-for="item in machines" :key="item.value" v-if="'' + scope.row.oilMachineId == item.value">{{ item.label }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="productSkuId" label="油/气品类型" align="center" min-width="120">
				<template slot-scope="scope">
					<span v-for="item in productSkus" :key="item.value" v-if="scope.row.productSkuId == item.value">{{ item.label }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="createdAt" label="创建时间" align="center" min-width="160"></el-table-column>
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

		<el-dialog title="提示" :visible.sync="oilGunsCreateDialogVisible" width="40%" center>
			<el-tabs v-model="activeName">
				<el-tab-pane label="添加油枪" name="first">
					<el-form ref="createForm" label-width="100px" :rules="rules" :model="createForm" size="small">
						<el-form-item prop="oilGunNo" label="油/气枪编号"><el-input v-model="createForm.oilGunNo"></el-input></el-form-item>
						<el-form-item prop="name" label="油枪名"><el-input v-model="createForm.name"></el-input></el-form-item>
						<el-form-item prop="stationId" label="油/气站名称">
							<el-select v-model="createForm.stationId" style="width: 100%" @change="selectMachineByStationId(createForm.stationId)">
								<el-option v-for="item in stations" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="oilMachineId" label="油/气机名称">
							<el-select v-model="createForm.oilMachineId" style="width: 100%">
								<el-option v-for="item in machinesByStationId" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="productSkuId" label="油/气品类型">
							<el-select v-model="createForm.productSkuId" style="width: 100%">
								<el-option v-for="item in productSkus" :key="item.value" :label="item.label" :value="item.value" :data-id="item.pro"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="oilGunsCreateDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="createOilGun">确 定</el-button>
			</span>
		</el-dialog>

		<el-dialog title="提示" :visible.sync="oilGunsUpdateDialogVisible" width="40%" center>
			<el-tabs v-model="activeName">
				<el-tab-pane label="修改油枪" name="first">
					<el-form ref="updateForm" label-width="100px" :rules="rules" :model="updateForm" size="small">
						<el-form-item prop="oilGunNo" label="油/气枪编号"><el-input size="small" v-model="updateForm.oilGunNo"></el-input></el-form-item>
						<el-form-item prop="name" label="油枪名"><el-input size="small" v-model="updateForm.name"></el-input></el-form-item>
						<el-form-item prop="stationId" label="油/气站名称">
							<el-select v-model="updateForm.stationId" size="small" style="width: 100%" @change="selectMachineByStationId(updateForm.stationId)">
								<el-option v-for="item in stations" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="oilMachineId" label="油/气机名称">
							<el-select v-model="updateForm.oilMachineId" size="small" style="width: 100%">
								<el-option v-for="item in machinesByStationId" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="productSkuId" label="油/气品类型">
							<el-select v-model="updateForm.productSkuId" size="small" style="width: 100%">
								<el-option v-for="item in productSkus" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<span slot="footer" class="dialog-footer">
				<el-button size="medium" @click="oilGunsUpdateDialogVisible = false">取 消</el-button>
				<el-button size="medium" type="primary" @click="updateOilGun">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { OilGunService } from '@/service/system/station/OilGunService.js';

export default {
	name: 'OilGunsTable',
	data() {
		return {
			oilGunService: undefined,
			oilGunIds: [],
			tableData: [],
			productSkus: [],
			stations: [],
			machines: [],
			machinesByStationId: [],
			total: 0,
			oilGunsCreateDialogVisible: false,
			oilGunsUpdateDialogVisible: false,
			// oilGunsButtonShow: false,
			queryParams: {
				page: 1,
				limit: 30
			},
      tableLoading: false,
			createForm: {
				oilGunNo: undefined,
				name: undefined,
				stationId: undefined,
				oilMachineId: undefined,
				productSkuId: undefined
			},
			updateForm: {
				oilGunNo: undefined,
				name: undefined,
				stationId: undefined,
				oilMachineId: undefined,
				productSkuId: undefined
			},
			activeName: 'first',
			rules: {
				oilGunNo: [
					{
						required: true,
						message: '请输入油枪编号',
						trigger: 'blur'
					}
				],
				name: [
					{
						required: true,
						message: '请输入油枪名',
						trigger: 'blur'
					}
				],
				oilMachineId: [
					{
						required: true,
						message: '请选择油/气机',
						trigger: 'blur'
					}
				],
				stationId: [
					{
						required: true,
						message: '请选择油站',
						trigger: 'blur'
					}
				],
				productSkuId: [
					{
						required: true,
						message: '请选择油/气品类型',
						trigger: 'blur'
					}
				]
			}
		};
	},
	mounted() {
		this.oilGunService = new OilGunService();
		this.productSkuList();
		this.stationList();
		this.machineList();
		this.getList(this.queryParams);
	},
	methods: {
		productSkuList() {
			const that = this;
			this.oilGunService.productSkuList().then(response => {
				for (let i = 0; i < response.length; i++) {
					that.productSkus.push({ value: response[i].id, label: response[i].name });
				}
			});
		},
		stationList() {
			const that = this;
			this.oilGunService.stationList().then(response => {
				for (let i = 0; i < response.length; i++) {
					that.stations.push({ value: response[i].id, label: response[i].name });
				}
			});
		},
		machineList() {
			const that = this;
			this.oilGunService.machineList().then(response => {
				for (let i = 0; i < response.length; i++) {
					that.machines.push({ value: response[i].id, label: response[i].name });
				}
			});
		},
		selectMachineByStationId(stationId) {
			const that = this;
			that.machinesByStationId = [];
			that.createForm.oilMachineId = undefined;
			that.updateForm.oilMachineId = undefined;
			this.oilGunService.getMachineListByStationId(stationId).then(response => {
				for (let i = 0; i < response.length; i++) {
					that.machinesByStationId.push({ value: response[i].id, label: response[i].name });
				}
			})
		},
		getList(params) {
      this.tableLoading = true;
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
			this.oilGunService.pagingOilGuns(params).then(response => {
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
		createOilGun() {
			this.oilGunsButtonShow = true;
			this.$refs['createForm'].validate(valid => {
				if (valid) {
					// 验证通过
					this.oilGunService
						.createOilGun(this.createForm)
						.then(response => {
							if (response.success === true) {
								this.$message({
									message: response.message,
									type: 'success'
								});
								this.getList(this.queryParams);
								this.resetForm();
								this.oilGunsCreateDialogVisible = false;
							} else {
								this.$message({
									message: response.message,
									type: 'warning'
								});
							}
							this.oilGunsButtonShow = false;
						})
						.catch(() => {
							this.getList(this.queryParams);
							this.oilGunsButtonShow = false;
						});
				} else {
					return false;
				}
			});
		},
		updateOilGun() {
			this.oilGunsButtonShow = true;
			this.$refs['updateForm'].validate(valid => {
				if (valid) {
					this.oilGunService
						.updateOilGun(this.updateForm)
						.then(response => {
							if (response.success === true) {
								this.$message({
									message: response.message,
									type: 'success'
								});
								this.getList(this.queryParams);
								this.resetForm();
								this.oilGunsUpdateDialogVisible = false;
							} else {
								this.$message({
									message: response.message,
									type: 'warning'
								});
							}
							this.oilGunsButtonShow = false;
						})
						.catch(() => {
							this.getList(this.queryParams);
							this.oilGunsButtonShow = false;
						});
				} else {
					return false;
				}
			});
		},
		deleteOilGun(val) {
			this.oilGunIds[0] = val;
			this.batchDelete();
		},
		batchDelete() {
			if (this.oilGunIds.length == 0) {
				this.$message({
					message: '请勾选要删除的油枪',
					type: 'success'
				});
			} else {
				this.$confirm('确定要删除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let gunIds = [];
					for (let i = 0; i < this.oilGunIds.length; i++) {
						gunIds.push(parseInt(this.oilGunIds[i].id));
					}
					this.oilGunService
						.deleteOilGuns(gunIds)
						.then(response => {
							if (response.success === true) {
								this.$message({
									message: response.message,
									type: 'success'
								});
								this.getList(this.queryParams);
								this.oilGunsCreateDialogVisible = false;
							} else {
								this.$message({
									message: response.message,
									type: 'warning'
								});
							}
						})
						.catch(() => {
							this.getList(this.queryParams);
						});
				});
			}
		},
		handleSelectionChange(val) {
			this.oilGunIds = val;
		},
    handleCreate() {
		  this.resetForm();
      this.oilGunsCreateDialogVisible = true;
    },
		handleUpdate(obj) {
			let oilGunId = obj.id;

			this.oilGunService.getOilGunById(oilGunId).then(response => {
        this.selectMachineByStationId(response.stationId);

        this.updateForm.id = response.id;
				this.updateForm.oilGunNo = response.oilGunNo;
				this.updateForm.name = response.name;
				this.updateForm.stationId = response.stationId;
				this.updateForm.oilMachineId = '' + response.oilMachineId;
				this.updateForm.productSkuId = response.productSkuId;
			});
			this.oilGunsUpdateDialogVisible = true;
		},
		resetForm() {
			this.createForm = {
				oilGunNo: undefined,
				name: undefined,
				stationId: undefined,
				oilMachineId: undefined,
				productSkuId: undefined
			};
			this.updateForm = {
				oilGunNo: undefined,
				name: undefined,
				stationId: undefined,
				oilMachineId: undefined,
				productSkuId: undefined
			};
		}
	}
};
</script>
<style lang="scss"></style>
