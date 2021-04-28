<template>
  <el-tooltip :content="tipData" placement="bottom" effect="light">
    <i @mousemove="getExplainData" class="icon-tip el-icon-question"></i>
  </el-tooltip>
</template>

<script>
  import {
    getOperationExplainByTable, //获取表字段说明
    getOperationExplainByUrl    //获取页面按钮说明
  } from '@/api/helpManage'

  export default {
    data() {
      return {
        tipData: "",
      }
    },
    props: ['name', 'pageUrl'],
    methods: {
      //1.name：需要说明的模块名称

      //2.pageUrl：当前页面的url

      getExplainData() {
        getOperationExplainByUrl({buttonName: this.name, pageUrl: this.pageUrl}).then(res => {
          if (res.code === 200) {
            this.tipData = res.data.explainDesc;
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .icon-tip {
    cursor: pointer;
    position: absolute;
    right: -5px;
    top: -4px;
    color: #000;
    font-size: 16px;
  }
</style>
