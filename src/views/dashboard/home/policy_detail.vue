<template>
  <div class="sale-plan-detail">
    <!--标题-->
    <div class="title-bar">
      首页 - 政策条件
    </div>

    <!--公司名-框-->
    <div class="company-bar">
      <div class="pic-box">
        市级政策
      </div>
      <div class="detail">
        <div class="left">
          <div class="name">
            关于《广东省服务外包重点培育企业认定》政策解读
          </div>
          <div class="user-type"><span class="user-title">所属行业：</span>技术推广服务</div>
          <div class="user-type"><span class="user-title">补贴类型：</span>人才补贴</div>
        </div>
        <div class="right">
          <div class="money"><span class="num">10</span> 万元</div>
          <div class="max-money">最高补贴</div>
        </div>
      </div>
    </div>

    <!--申报要求-->
    <div class="cart-bar">
      <div class="cart-title">
        <div class="title-name">
          <span class="line green"></span>
          <div class="text">申报要求</div>
        </div>
      </div>
      <div class="report-cart-body">
        <div class="box">
          <div class="title">
            <img src="../../../../static/qualified.png" width="100%" height="auto">
          </div>
          <ul class="box-body">
            <li>
              <span class="icon icon-gou"></span>
              受理日期：2020-05-14 至 2020-09-31
            </li>
            <li>
              <span class="icon icon-gou"></span>
              申报单位为注册登记住所在成都市行政区域内，具有独立法人资格的企事业单位和社会组织等。
            </li>
            <li>
              <span class="icon icon-gou"></span>
              须符合各类项目申报指南的具体要求。
            </li>
            <li>
              <span class="icon icon-gou"></span>
              项目申报单位、项目负责人须签署诚信承诺书，项目申报单位要加强对申报材料审核把关，严禁夸大不实，甚至弄虚作假。
            </li>
            <li>
              <span class="icon icon-gou"></span>
              项目申报单位、项目负责人须签署诚信承诺书，项目申报单位要加强对申报材料审核把关，严禁夸大不实，甚至弄虚作假。
            </li>
          </ul>
        </div>
        <div class="box">
          <div class="title">
            <img src="../../../../static/unqualified.png" width="100%" height="auto">
          </div>
          <ul class="box-body">
            <li>
              <span class="icon icon-cha"></span>
              每个申报单位限申报当年同类别项目1项（高校、科研院所除外）。同一项目不得以任何形式跨类别重复申报。
            </li>
            <li>
              <span class="icon icon-cha"></span>
              目前承担有市级前资助科技项目且尚未验收的项目单位，原则上不得申报与未验收项目类别相同的项目。
            </li>
            <li>
              <span class="icon icon-cha"></span>
              纳入市统计部门调查范围的规模以上企业，须提供已报送统计部门的2019年度《企业（单位）研发活动统计报表》（包括企业研究开发项目情况、企业研究开发活动及相关情况表）；高新技术企业须提供已报送的2019年度《国家高新区企业和高新技术企业统计报表》和《年度高新技术企业发展情况报表》（以上材料随申报材料一并提供）。
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!--相关附件-->
    <div class="cart-bar">
      <div class="cart-title">
        <div class="title-name">
          <span class="line blue"></span>
          <div class="text">相关附件</div>
        </div>
      </div>
      <div class="units-file-body">
        <p>广东省服务外包重点培育企业认定.docx <i class="icon down-icon"></i></p>
        <p>广东省服务外包重点培育企业认定.docx <i class="icon down-icon"></i></p>
      </div>
    </div>

    <div class="btn-group">
      <el-button class="btn sure">确定</el-button>
      <el-button class="btn cananl" @click="goHome">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods:{
      goHome(){
        this.$router.push({
          path: '/dashboard'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  ul li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sale-plan-detail {
    margin: auto 5%;

    .title-bar {
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);
      margin-top: 20px;
      padding-left: 20px;
    }

    .company-bar {
      background: #fff;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      padding: 16px 50px;
      display: flex;
      align-items: center;

      .pic-box {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        width: 78px;
        min-width: 78px;
        height: 78px;
        background: rgba(105, 204, 255, 1);
        opacity: 1;
        margin-right: 20px;
        border-radius: 6px;
        padding: 23px;
      }

      .detail {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          .name {
            font-size: 18px;
            color: rgba(68, 68, 68, 1);
            margin-bottom: 10px;
          }

          .user-type {
            font-size: 14px;
            margin-bottom: 10px;

            .user-title {
              color: rgba(68, 68, 68, 0.75);
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        .right {
          text-align: center;

          .money {
            color: #FF2F2F;
            font-size: 24px;

            .num {
              font-size: 36px;
            }
          }

          .max-money {
            font-size: 16px;
            font-family: Microsoft YaHei;
            color: rgba(68, 68, 68, 0.60);
            margin-top: 10px;
          }
        }
      }
    }

    .cart-bar {
      margin-top: 20px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);

      .cart-title {
        min-height: 47px;
        font-size: 16px;
        border-bottom: 1px solid rgba(219, 233, 255, 1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;

        .title-name {
          display: flex;
          align-items: center;

          .line {
            display: inline-block;
            width: 3px;
            height: 14px;
            margin-right: 10px;

            &.orange {
              background: rgba(255, 169, 106, 1);
            }

            &.green {
              background: rgba(72, 212, 98, 1);
            }

            &.red {
              background: rgba(254, 78, 126, 1);
            }

            &.blue {
              background: rgba(88, 131, 255, 1);
            }
          }

          .text {
            margin-top: 2px;
          }
        }

        .btn-img {
          cursor: pointer;
        }
      }

      .report-cart-body {
        padding: 20px;
        display: flex;
        justify-content: center;

        .box {
          width: 504px;
          margin-right: 72px;

          .title {
            width: 100%;
          }

          &:last-child {
            margin-right: 0;
          }

          .box-body {
            padding: 20px;
            padding-bottom: 0;
            font-size: 14px;
            color: #000;
            height: 316px;
            border: 1px solid rgba(234, 234, 234, 1);
            margin-top: -4px;

            li {
              display: flex;
              margin-bottom: 20px;

              .icon {
                margin-right: 15px;
                width: 17px;
                min-width: 17px;
                height: 17px;
                display: inline-block;
                background-size: cover !important;

                &.icon-gou {

                  background: url("../../../../static/home_yes_icon.png");
                }

                &.icon-cha {
                  background: url("../../../../static/home_no_icon.png");
                }
              }
            }
          }
        }
      }

      .units-file-body {
        padding: 20px;

        p {
          cursor: pointer;
          padding-left: 20px;
          font-size: 14px;
          color: #37BBFF;
          margin-bottom: 10px;

          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: middle;
            margin-left: 6px;
            background: url("../../../../static/down-img.png");
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .btn-group {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;

      .btn {
        width: 120px;
        height: 48px;
        font-size: 16px;
        border: 0;
        cursor: pointer;

        &.sure {
          color: #fff;
          background:linear-gradient(180deg,rgba(105,204,255,1) 0%,rgba(5,170,255,1) 100%);
          box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
          margin-right: 20px;

          &:active {
            opacity: 0.5;
          }
        }

        &.cananl {
          color: #444444;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 12px rgba(5, 170, 255, 0.08);

          &:active {
            opacity: 0.5;
          }
        }
      }
    }
  }
</style>
