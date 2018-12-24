<template>
  <div>
    <div class="header">
      <div class="header-wrapper">
        <div style="width:100%;margin-right: 10px;">
          <el-input
            :placeholder="`${this.baseUrl}${stub.module.name}/${stub.method.name}.ac`"
            disabled>
            <template slot="prepend">方法请求地址</template>
            <template slot="append">POST请求</template>
          </el-input>
        </div>
        <div>
          <el-button v-if="!isLoading"
                     type="primary"
                     icon="el-icon-sort"
                     @click="handleClick">
            发起请求
          </el-button>
          <el-button v-if="isLoading"
                     type="warning"
                     icon="el-icon-loading"
                     disabled>
            正在请求
          </el-button>
        </div>
      </div>
    </div>
    <div class="body">
      <vue-scroll :ops="{
              bar:{
                background:'#ff6c37',
                opacity:0.75,
                showDelay:700
              },
              scrollPanel: {
                scrollingX: false,
              }
            }">
        <div>
          <div style="padding: 15px 15px 0 15px">
            <el-card class="param-card">
              <div slot="header">
                <span><i class="el-icon-news"> 参数列表</i></span>
              </div>
              <params v-model="parameters"></params>
            </el-card>
          </div>

          <div style="padding: 15px 15px 0 15px">
            <el-card v-loading="isLoading">
              <div slot="header">
                <span><i class="el-icon-message"> 调用结果</i></span>
                <el-tag
                  size="mini"
                  style="float: right"
                  type="success"
                  v-if="updateTime">
                  请求时间: {{updateTime.toLocaleString()}}
                </el-tag>
                <el-tag
                  size="mini"
                  style="float: right;margin-right: 10px"
                  v-if="cost">
                  耗时: {{cost}}ms
                </el-tag>
              </div>
              <result :result="result"></result>
            </el-card>
          </div>
        </div>
      </vue-scroll>
    </div>

  </div>
</template>

<script>
  import params from './params'
  import result from './result'
  import {jsonParse} from '../common/json'

  export default {
    name: "invoker",
    props: ['stub'],
    components: {
      params,
      result
    },
    data() {
      const location = window.location;
      const baseUrl = `${location.protocol}//${location.host}${this.stub.baseUrl}`;
      return {
        isLoading: false,
        baseUrl,
        parameters: this.getParams(),
        result: undefined,
        updateTime: null,
        cost: null
      }
    },
    methods: {
      async handleClick() {
        const start = new Date();
        try {

          this.isLoading = true;
          //取得所有的参数
          const args = this.stub.method.parameters.map(it => {
            const index = this.parameters.findIndex(p => p.name === it.name && p.isSelected);
            if (index !== -1) {
              return jsonParse(this.parameters[index].value);
            }
          });

          this.result = await this.$api[this.stub.module.name][this.stub.method.name].apply(null, args);
        } catch (e) {
          this.result = e;
        } finally {
          this.isLoading = false;
          this.updateTime = new Date();
          this.cost = this.updateTime.getTime() - start.getTime();
        }
      },
      getParams() {
        let params = this.stub.method.parameters;
        let validate = this.stub.method.validate;
        let result = []
        for (let i = 0; i < params.length; i++) {
          result.push({
            isSelected: true,
            name: params[i].name,
            value: null,
            type: validate ? validate[i].type : null,
            children: validate && validate[i].children ? validate[i].children : null,
            description: validate ? validate[i].description : null
          });
        }
        return result;
      }
    }
  }
</script>

<style lang="scss">
  .param-card {
    .el-card__body {
      padding: 0;
    }
  }
</style>

<style scoped>
  .header {
    width: 100%;
    box-shadow: 0 1px 5px 0 rgba(48, 48, 48, 0.3);
    background-color: #fafafa;
  }

  .header-wrapper {
    min-width: 600px;
    height: 60px;
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .body {
    width: 100%;
    height: calc(100vh - 190px);
  }
</style>
