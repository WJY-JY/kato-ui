<template>
  <el-popover
    placement="top-start"
    width="1000"
    trigger="hover">
    <table>
      <tr>
        <th>key</th>
        <th>类型</th>
        <th>描述</th>
        <th>值</th>
      </tr>
      <tr v-for="param of gridData" :key="param.key" style="height: 40px">
        <td v-if="param.type==='object'" style="text-align: center;font-weight: bolder">
          <params-object v-model="param.key" :tip="param"></params-object>
        </td>
        <td v-else style="text-align: center;font-weight: normal">{{param.key}}</td>
        <td style="text-align: center;font-weight: normal">{{param.type}}</td>
        <td style="text-align: center;font-weight: normal">{{param.description}}</td>
        <td v-if="param.type==='date'">
          <param-date v-model="param.value" @input="getValues"/>
        </td>
        <td v-else>
          <el-input v-model="param.value" @input="getValues"></el-input>
        </td>
      </tr>
    </table>
    <el-button slot="reference">{{value}}</el-button>
  </el-popover>
</template>

<script>
  import ParamDate from "./param-date";
  import {jsonParse} from '../common/json'

  export default {
    name: "params-object",
    components: {ParamDate},
    props: ['value', 'tip'],
    data() {
      this.tip.children.forEach(v => {
        v.value = null;
        v.isSelected = true;
      });
      return {
        gridData: this.tip.children
      };
    },
    methods: {
      getValues: function () {
        let values = this.tip.children.map(x => {
          let o = {};
          if (x.value) {
            o[x.key] = jsonParse(x.value);
          }
          return o;
        }).reduce((pre, next) => {
          return Object.assign(pre, next);
        }, {});
        this.tip.value = JSON.stringify(values);
      }
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
