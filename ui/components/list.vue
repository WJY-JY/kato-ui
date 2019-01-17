<template>
  <div class="list">
    <el-menu
      v-show="filteredModules.length>0"
      ref="menu"
      :collapse-transition="false"
      :default-openeds="isOpened"
      text-color="#000"
      active-text-color="#000"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <el-submenu v-for="module of filteredModules"
                  :key="module.name"
                  :index="module.name">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{module.name}}</span>
        </template>

        <el-menu-item v-for="method of module.methods"
                      :key="`${module.name}.${method.name}`"
                      :index="`${module.name}.${method.name}`">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>{{method.name}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <div
      style="margin-top: 200px;display: flex;justify-content: center"
      v-show="filteredModules.length===0">
      <div class="error-info">
        <i style="font-size: 40px" class="el-icon-warning"></i>
        <p>
          <small>找不到任何方法</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list",
    props: {
      filter: String
    },
    data() {
      return {
        modules: this.$api.validate.modules.map(it => ({
          isOpened: false,
          ...it
        }))
      }
    },
    methods: {
      handleOpen(moduleName) {
        this.modules.filter(it => it.name === moduleName).forEach(it => it.isOpened = true);
      },
      handleClose(moduleName) {
        this.modules.filter(it => it.name === moduleName).forEach(it => it.isOpened = false);
      },
      handleSelect(methodName) {
        this.$emit('selected', methodName);
      }
    },
    computed: {
      filteredModules() {
        return this.modules
          .map(module => ({
            isOpened: module.isOpened,
            name: module.name,
            methods: module.methods
              .filter(it => (it.name.toLowerCase().includes(this.filter.trim().toLowerCase())))
              .map(method => ({
                name: method.name
              })).sort((a, b) => a.name.localeCompare(b.name))
          }))
          .filter(module => module.methods.length > 0).sort((a, b) => a.name.localeCompare(b.name));
      },
      isOpened() {
        if (this.filter !== '') {
          return this.filteredModules.map(it => it.name)
        } else {
          return this.filteredModules.filter(it => it.isOpened).map(it => it.name)
        }
      }
    }
  }
</script>

<style lang="scss">
  $menu-height: 38px;

  .list {
    .el-submenu__title {
      height: $menu-height;
      line-height: $menu-height;
    }

    .el-submenu .el-menu-item {
      height: $menu-height;
      line-height: $menu-height;
    }
  }
</style>

<style scoped lang="scss">
  @import "../vars";

  .error-info {
    text-align: center;
    color: $color-primary;
  }
</style>
