<template>
    <el-popover
      placement="top-start"
      width="400"
      trigger="hover">
      <el-table :data="gridData">
        <el-table-column  property="key" label="key"></el-table-column>
        <el-table-column  property="type" label="类型"></el-table-column>
        <el-table-column  property="description" label="描述"></el-table-column>
      </el-table>
      <el-button slot="reference">{{value}}</el-button>
    </el-popover>
</template>

<script>
  export default {
    name: "params-object",
    props: ['value', 'tip'],
    data() {
      return {
        gridData: this.tip
      };
    }
  };
</script>

<style scoped lang="scss">
  @import "../vars";

  .error-info {
    text-align: center;
    color: $color-primary;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }

  td, th {
    word-wrap: break-word;
    font-size: 1em;
    border: 1px solid #ebeef5;
    padding: 3px 7px 2px 7px;
  }

  th {
    font-size: 13px;
    word-wrap: break-word;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 4px;
    background-color: #c8c8c8;
    color: #ffffff;
  }
</style>
