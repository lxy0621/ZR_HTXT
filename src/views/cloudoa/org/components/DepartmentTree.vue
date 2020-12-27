<template>
  <div class="app-container">
    <el-tree
      ref="deptTree"
      :data="deptTree"
      :check-strictly="true"
      default-expand-all
      :expand-on-click-node="false"
      accordion
      node-key="id"
      highlight-current
      :filter-node-method="filterNode"
      @node-click="nodeClick"
    />
  </div>
</template>

<script>
  import { DepartmentService } from '@/service/cloudoa/org/DepartmentService';
  export default {
    name: 'DepartmentTree',
    components: {
    },
    data() {
      return {
        queryDept:{
          parentDepartmentId: 0
        },
        queryParams: {
          parentDepartmentId: null,
          name:'',
          viewName: '',
          state:null
        },
        deptTree: [],
        deptService:null
      };
    },
    mounted() {
      this.deptService = new DepartmentService();
      this.initDeptTree();
    },
    methods: {
      initDeptTree() {
        this.deptService.deptTree(this.queryParams).then(response => {
          this.deptTree = response;
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1;
      },
      nodeClick(data) {
        this.queryDept.parentDepartmentId = data.id;
        this.queryDept.name = data.label;
        this.queryDept.departmentType = data.departmentType;
        this.$emit('initData', this.queryDept);
      },
    }
  };
</script>
<style lang="scss">

</style>
