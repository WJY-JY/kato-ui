<template>
  <el-date-picker
    v-model="dateTime"
    value-format="timestamp"
    align="right"
    type="datetime"
    placeholder="选择时间"
    :picker-options="pickerOptions">
  </el-date-picker>
</template>

<script>
  export default {
    name: "param-date",
    props: ["value"],
    data() {
      return {
        dateTime: this.value,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      }
    },
    watch: {
      dateTime: function (nv, ov) {
        if (nv !== ov) {
          // 当日期发生变化的时候，触发
          this.$emit("input", JSON.stringify(new Date(nv).toISOString()));
        }
      }
    }
  }
</script>

<style scoped>

</style>
