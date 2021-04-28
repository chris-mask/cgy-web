<template>
  <div class="app-container need-detail">

    <!--需求信息-->
    <el-card class="need-card">
      <div slot="header" class="title">
        <div><span class="line"></span>需求信息</div>
      </div>
      <div class="detail">
        <div class="item">
          <div class="content"><span class="title">用户名称：</span>山仔</div>
          <div class="blue">处理人：山仔</div>
        </div>
        <div class="item">
          <div class="content"><span class="title">提交时间：</span>2016-06-05</div>
          <div class="blue">处理结果：未处理</div>
        </div>
        <div class="item last-child">
          <div class="content"><span class="title">需求内容：</span>您好，山仔</div>
        </div>

        <!--徽章：处理中-->
        <div class="sign-pic-box">
          <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案(1)_20200525113441_171.png"/>
          <!--          <img v-else-if="form.process_flow === 0" src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案(4)_20200525113608_711.png"/>-->
          <!--          <img v-else-if="form.process_flow === 2" src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案_20200525113701_250.png" />-->
        </div>
      </div>
    </el-card>


    <!--需求处理状态-->
    <el-card class="need-card">
      <div slot="header" class="title">
        <div><span class="line"></span>需求处理状态</div>
      </div>
      <div class="detail">
        <div class="item-chart">
          <div class="time">
            <div>2019-03-26</div>
          </div>
          <div class="doing">
            <div class="card"></div>
          </div>
          <div>666</div>
        </div>


        <div class="item-chart">
          <div class="time">
            <div>2020-05-22</div>
            <div>16:45:20</div>
          </div>

          <div class="pass"></div>

          <div>处理人：李某某，正在努力处理您的需求</div>
        </div>

        <div class="item-chart">
          <div class="time">
            <div>2020-05-22</div>
            <div>16:45:20</div>
          </div>
          <div class="pass"></div>
          <div>审核通过</div>
        </div>


        <div class="item-chart">
          <div class="time">
            <div>2020-05-22</div>
            <div>16:45:20</div>
          </div>
          <div class="pass"></div>
          <div>请耐心等带工作人员审核需求内容，审核通过后将会有工程师处理您的需求。
            <el-button class="btn">完善需求</el-button>
          </div>
        </div>

        <div class="item-chart">
          <div class="time">
            <div>2020-05-22</div>
            <div>16:45:20</div>
          </div>
          <div class="pass"></div>
          <div>您已成功提交需求</div>
        </div>

        <hr class="dashed-line">

      </div>
    </el-card>
  </div>
</template>

<script>
  // import { getServiceTrace } from '@/api/crm'

  export default {
    name: 'service_trace_form',
    components: {},
    props: {},
    data() {
      return {
        // host: process.env.BASE_API,
        biz_id: null,
        form: {}
      }
    },
    filters: {},
    mounted() {

    },
    methods: {
      // 错误提示
      callbackError(error) {
        for (var key in error) {
          this.tempArr = error[key]
          break
        }
        this.$message({
          type: 'error',
          message: this.tempArr[0].message
        })
      },
      getDetail() {
        getServiceTrace({biz_id: this.biz_id}).then(res => {
          if (res.data.code === 1) {
            this.form = res.data.data
          }
        })
      },
      // 取消
      handlerCancel() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .need-detail {
    .need-card {
      margin-bottom: 14px;

      /deep/ .el-card__header {
        padding: 15px 20px;
        border-bottom: 1px solid #DBE9FF;
      }

      .title .line {
        display: inline-block;
        width: 3px;
        height: 14px;
        background: rgba(5, 170, 255, 1);
        margin-right: 10px;
        vertical-align: middle;
        margin-top: -2px;
      }

      .detail {
        font-size: 14px;
        padding-left: 123px;
        position: relative;

        .item {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          .title {
            color: rgba(68, 68, 68, 0.75);;
          }

          .content {
            width: 50%;
            color: #444444;
          }

          .blue {
            color: #05AAFF;
          }

          &.last-child {
            margin-bottom: 0;
          }
        }

        .sign-pic-box {
          position: absolute;
          right: 16%;
          top: 0;
        }

        .item-chart {
          display: flex;
          align-items: center;
          color: rgba(68, 68, 68, 0.60);
          margin-bottom: 40px;

          .time {
            div {
              white-space: nowrap;
              text-align: right;
            }
          }

          .doing, .pass {
            min-width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #FFDDC3;
            margin-left: 35px;
            margin-right: 49px;
            z-index: 3;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .doing .card {
            width: 10px;
            height: 10px;
            background: rgba(255, 169, 106, 1);
            border-radius: 50%;
            opacity: 1;
          }


          .pass {
            background: url("../../../../static/gou.png");
          }

          .btn {
            width: 90px;
            height: 30px;
            font-size: 12px;
            padding: 0;
            background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
            opacity: 1;
            border-radius: 2px;
            color: #fff;

            &:active {
              opacity: 0.5;
            }
          }

          &:first-child {
            .time {
              color: #444444;
            }
          }
        }

        .dashed-line {
          height: 93%;
          position: absolute;
          transform: rotate(0);
          border: 1px dashed #05AAFF;
          z-index: 2;
          left: 238px;
          top: 0;
        }
      }
    }
  }
</style>
