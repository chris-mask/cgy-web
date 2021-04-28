<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div class="tipsCont">
        <img class="pic-404__parent" src="@/assets/tipsBg.png" alt="404">
        <h3>温馨提示</h3>
        <p>您的试用期已经结束，感谢您对我们平台的支持，请您付费后继续使用，感谢您对保护知识产权所做出的贡献！谢谢！</p>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "tips"
  }
</script>

<style lang="less" scoped>
  .tipsCont{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-bottom:60px;
    img{
      width: 40%;
    }
    h3{
      font-size:28px;
      font-weight:400;
      color:rgba(4,43,64,1);
      width:100%;
    }
    p{
      font-size:16px;
      font-weight:400;
      color:rgba(68,68,68,0.60);
      letter-spacing:2px;
      margin-top:10px;
      max-width: 40%;
      line-height:24px;
    }
  }
</style>
