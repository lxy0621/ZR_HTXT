<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.name" placeholder="姓名" size="small" style="width: 95%" />
    </search-container-item>
    <search-container-item>
      <el-input v-model="queryParams.mobile" placeholder="手机号" size="small" style="width: 95%" />
    </search-container-item>
    <!-- <search-container-item>
      <el-select v-model="queryParams.departmentId" placeholder="所在部门" size="small" style="width: 95%">
        <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </search-container-item> -->
    <search-container-item>
      <el-select v-model="queryParams.dept" placeholder="部门范围" size="small" style="width: 95%">
        <el-option v-for="item in rangeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <!--
    <search-container-item>
      <el-select v-model="queryParams.state" placeholder="在职状态" size="small" style="width: 95%">
        <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    -->
    <search-container-item folded>
      <el-select v-model="queryParams.accountOpenState" placeholder="账户开通状态" size="small" style="width: 95%">
        <el-option v-for="item in accountOpenStateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';

  const getDefaultQueryParamsEmp = () => ({
    name: '',
    mobile: '',
    departmentId: '',
    state: '',
    accountOpenState: '',
    dept:'1'
  });

  export default {
    name: 'DepartmentEmployeesSearch',
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        queryParams: getDefaultQueryParamsEmp(),
        stateList: [{ label: '离职', value: '0' }, { label: '在职', value: '1' }],
        accountOpenStateList: [{ label: '未开通', value: '0' }, { label: '已开通', value: '1' }, { label: '已停用', value: '2' }],
        rangeList: [{ label: '在当前部门下查询', value: '1' }, { label: '在所有子部门下查询', value: '2' }],
      };
    },
    methods: {
      handleDataSearch() {
      	const queryParams = Object.assign({}, this.queryParams);
      	this.$emit('search', queryParams);
      },
      handleAllReset() {
      	const queryParams = getDefaultQueryParamsEmp();
      	this.queryParams = queryParams;
      	this.$emit('reset', queryParams);
      	this.handleDataSearch();
      }
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
