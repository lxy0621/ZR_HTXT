<template>
  <div>
    <el-card>
      <el-tree :data="data" :props="defaultProps" node-key="id" :default-expanded-keys="defaultExpandedKeys" @node-click="handleNodeClick"></el-tree>
    </el-card>
  </div>
</template>

<script>
  import {MenuService} from "@/service/system/config/MenuService";

  export default {
    name: "MenuTree",
    data() {
      return {
        selectedNode: undefined,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        defaultExpandedKeys: [],
      };
    },
    mounted() {
      this.menuService = new MenuService();
      this.loadMenuTree();
    },
    methods: {
      loadMenuTree() {
        this.menuService.findMenuTree()
          .then(response => {
            if (response.success === true) {
              this.data = response.data;
              this.data.forEach(m => {
                this.defaultExpandedKeys.push(m.id);
              });
            } else {
              this.$message({
                message: response.message,
                type: "warning"
              });
            }
          });
      },
      handleNodeClick(data) {
        this.selectedNode = data;
        this.$emit('checkedMenu', data);
      },
    }
  }
</script>

<style scoped>
</style>
