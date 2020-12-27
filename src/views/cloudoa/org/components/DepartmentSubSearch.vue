<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.name" placeholder="部门名称" size="small" style="width: 95%"/>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.state" placeholder="部门状态" size="small" style="width: 95%">
        <el-option v-for="item in states" :key="item.value" :label="item.desc" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.departmentType" placeholder="部门类型" size="small" style="width: 95%">
        <el-option v-for="item in types" :key="item.value" :label="item.desc" :value="item.value">
        </el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import { DepartmentService } from '@/service/cloudoa/org/DepartmentService';

  const getDefaultQueryParams = (queryParas) => ({
    name: '',
    state: null,
    departmentType: null,
    parentDepartmentId: queryParas && queryParas.parentDepartmentId?queryParas.parentDepartmentId:0
  });

  export default {
    name: 'DepartmentSubSearch',
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        queryParams: getDefaultQueryParams({
          parentDepartmentId: 0
        }),
        types:[],
        states:[],
        deptService:null
      };
    },
    mounted() {
      this.deptService = new DepartmentService();
      this.initTypes();
      this.initStates();
    },
    methods: {
      initStates() {
        this.deptService.enumList({'sta':'state','alls':'all'}).then(response => {
          this.states = response;
        })
      },
      initTypes() {
        this.deptService.enumList({'sta':'type','alls':'all'}).then(response => {
          this.types = response;
        })
      },
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.filterTags = [];
        this.$emit('reset', queryParams);
        this.handleDataSearch();
      },
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
