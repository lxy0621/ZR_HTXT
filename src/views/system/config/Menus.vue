<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <menu-tree @checkedMenu="checkedMenu" ref="menuTree"></menu-tree>
        </el-col>
        <el-col :span="20">
          <menu-form :menu="menu" @loadMenuTree="loadMenuTree"></menu-form>
          <el-divider></el-divider>
          <page-table :menu="menu" ref="pageTable"></page-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import MenuTree from './components/MenuTree';
  import MenuForm from './components/MenuForm';
  import PageTable from './components/PageTable';

  export default {
    name: "Menus",
    components: {
      MenuTree,
      MenuForm,
      PageTable,
    },
    data() {
      return {
        menu: {},
      }
    },
    methods: {
      checkedMenu(menu) {
        this.menu = menu;
        this.$refs.pageTable.getList({
          page: 1,
          limit: 30,
          menuId: menu.id,
        });
      },
      loadMenuTree() {
        this.$refs.menuTree.loadMenuTree();
      }
    },
  }
</script>

<style scoped>

</style>
