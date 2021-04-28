<template>
  <div class="enterprise-box">
    <el-row :gutter="15">
      <el-col :span="15" :offset="1">

        <!--搜索栏-->
        <div class="cart search-bar" ref="search">
          <div class="search-form">
            <el-input class="search-input" placeholder="请输入政策名称"/>
            <button class="search-btn">搜一下</button>
          </div>
        </div>

        <!--综合看板-->
        <div class="cart cart-box" ref="sale">
          <div class="cart-title">
            <div class="line blue"></div>
            综合看板
          </div>
          <div class="cart-salesFollow-body">

            <div class="item one" @click="goContractHandle">
              <div class="left">
                <div class="num">0</div>
                <div class="text">我的合同</div>
              </div>
            </div>
            <div class="line" style="border-top: 1px dashed #05AAFF"></div>

            <div class="item two padding-left-30" @click="goOrderHandle">
              <div class="left">
                <div class="num">0</div>
                <div class="text">全部订单</div>
              </div>
            </div>
            <div class="line" style="border-top: 1px dashed #FFA96A"></div>

            <div class="item three padding-left-30">
              <div class="left">
                <div class="num">0</div>
                <div class="text">马上截止</div>
              </div>
            </div>
          </div>

          <div class="cart-salesFollow-body">

            <div class="item four">
              <div class="left">
                <div class="num">0</div>
                <div class="text">未分配</div>
              </div>
            </div>
            <div class="line" style="border-top: 1px dashed #05AAFF"></div>

            <div class="item five padding-left-30">
              <div class="left">
                <div class="num">0</div>
                <div class="text">待评估</div>
              </div>
            </div>
            <div class="line" style="border-top: 1px dashed #FFA96A"></div>

            <div class="item six padding-left-30" style="max-width: 156px;">
              <div class="left">
                <div class="num">0</div>
                <div class="text">待审核</div>
              </div>
            </div>

            <div class="line" style="border-top: 1px dashed #48D462"></div>

            <div class="item serven padding-left-30">
              <div class="left">
                <div class="num">0</div>
                <div class="text">待完成</div>
              </div>
            </div>

            <div class="line" style="border-top: 1px dashed #FE4E7E"></div>

            <div class="item eight padding-left-30">
              <div class="left">
                <div class="num">0</div>
                <div class="text">待提交</div>
              </div>
            </div>

            <div class="line" style="border-top: 1px dashed #5883FF"></div>

            <div class="item nine padding-left-30">
              <div class="left">
                <div class="num">0</div>
                <div class="text">已立项</div>
              </div>
            </div>

          </div>
        </div>

        <!--精准匹配结果 -- 可申报的项目-->
        <div ref="comprehensive" class="cart cart-box report-item-box" style="padding-bottom: 0;">
          <div class="cart-title">
            <div class="line purple"></div>
            精准匹配结果 -- 可申报的项目
          </div>


          <el-row class="cart-group-body">
            <el-col :md="24" :lg="12" :xl="12" class="col" v-for="(item,index) in reportProjectData" :key="index">
              <div class="item-cart">
                <div class="tag">
                  <img :src="tagImg" class="tag-img"/>
                </div>
                <div class="title-cart">
                  <div class="title-name" @click="goPolicyDetail">{{item.projectName}}</div>
                  <div class="title-money">最高补贴 <span class="num">{{item.totalApplyPrice}}</span><span class="unit">万元</span></div>
                </div>
                <div class="report-term">申报总条件<span class="num">{{item.conditionNum}}</span>条</div>
                <div class="accord-bar">
                  <div class="left">
                    <img :src="yesIcon"/>
                    <span>符合申报条件 {{item.conformConditionNum}} 条</span>
                  </div>
                  <div class="right">
                    <img :src="noIcon"/>
                    <span>不符合申报条件 {{item.conditionNum - item.conformConditionNum}} 条</span>
                  </div>
                </div>

                <div class="line-bar">
                  <div class="left-semi-circle"></div>
                  <hr/>
                  <div class="right-semi-circle"></div>
                </div>

                <div class="handle-bar">
                  <div class="left">
                    匹配度：
                    <ul
                      :class="
                      item.totalScore<=20 ? 'xin-list one' : item.totalScore>20 && item.totalScore<=40?'xin-list two':item.totalScore>40 && item.totalScore<=60? 'xin-list three' :item.totalScore>60 && item.totalScore<=80?'xin-list four':item.totalScore>80 && item.totalScore<=100?'xin-list five':'xin-list'"
                    >
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div class="right">
                    <button class="btn-handle" @click="goPolicyNews">我要申报</button>
                  </div>
                </div>
                <div class="cart-footer">
                  已报企业：<span class="num-home"> <i>{{item.totalApplyCompanyNum}}</i> 家</span>
                </div>
              </div>
            </el-col>
          </el-row>


          <div class="no-policy-body" style="display: none;">
            <el-image src="static/service_home_img.png" lazy class="img"></el-image>
            <div class="text">没有匹配到适合您的政策，可能是您的企业信息没有完善所致</div>
            <el-button class="go-finish-btn">马上去完善</el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="7">
        <!--我的事项-->
        <div class="cart cart-box" ref="userMatter">
          <div class="cart-title">
            <div class="line blue"></div>
            我的事项
          </div>

          <div class="cart-myMatter-body">
            <div class="item-myMatter">
              <div class="left">
                <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/STeG0Htc_20200325152527_352_20200731235448_613.png"/>
                <span class="text">系统提醒</span>
              </div>
              <div class="right">0</div>
            </div>
          </div>

          <div class="cart-myMatter-body">
            <div class="item-myMatter">
              <div class="left">
                <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/成果云项目文件/黄京亮测试公司2/消息中心/e0oCDvSo_20200324152147_345_20200731235518_154.png"/>
                <span class="text">沟通消息</span>
              </div>
              <div class="right">0</div>
            </div>
          </div>

        </div>

        <!--政策通知-->
        <div class="cart cart-box" style="padding-bottom: 0">
          <div class="cart-title sb">
            <div class="left-title">
              <div class="line red"></div>
              政策通知
            </div>
            <div class="more">更多 ></div>
          </div>

          <vue-seamless-scroll
            :data="policylist"
            :class-option="optionSetting"
            :style="NoticeListView"
            class="scroll-list"
          >
            <ul class="cart-policyNotice-body">
              <li v-for="item in policylist">
                <div class="top-text">
                  <span v-if="item.areaLevel===0" class="level orange">其他</span>
                  <span v-if="item.areaLevel===1" class="level green">省级</span>
                  <span v-if="item.areaLevel===2" class="level red">市级</span>
                  <span v-if="item.areaLevel===3" class="level blue">区级</span>
                  <span class="text" @click="goPolicyDetail(item)">{{item.noticeName}}</span>
                </div>
                <div class="date-time">
                  <div class="date">{{item.publishDate}}</div>
                  <div class="date-state" v-if="item.day>0">
                    距申报截止<span class="date-num">{{item.day}}</span>天(进行中)
                  </div>
                  <div class="date-state" v-else>已截止</div>
                </div>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import treeTransfer from 'el-tree-transfer'
  import tagImg from '../../../../static/recomd.png'
  import yesIcon from '../../../../static/home_yes_icon.png'
  import noIcon from '../../../../static/home_no_icon.png'

  import {backgroundBoardData} from '@/api/home'
  import store from '@/store'

  export default {
    components: {treeTransfer},
    data() {
      return {
        socket: null,
        user: store.getters.companyId.toString() + "::" + store.getters.userId.toString() + "::" + store.getters.name.toString(),
        tagImg,
        yesIcon,
        noIcon,
        NoticeListView: '', // 政策通知可视窗口高度

        //政策通知列表 0:其他 1:省级 2:市级 3:区级
        policylist: [],


        //获取可申报的项目数据--传参
        reportProjectParams:{
          companyId:this.$store.getters.companyId,
          page:0,
          pageSize:20
        },
        //可申报的项目--数据
        reportProjectData:[]
      }
    },

    computed: {
      optionSetting() {
        return {
          step: 0.5, // 数值越大速度滚动越快
          limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: true, // 是否开启鼠标悬停stop
          direction: 1 // 0向下 1向上 2向左 3向右
        }
      }
    },

    mounted() {
      this.getListHeight();
      this.getBackgroundBoardData();
    },

    activated() {
      // this.getReportableData();
      // this.openSocket()
    },

    methods: {
      // websocket 统计在线人数
      openSocket() {
        console.log("================================================================" + this.user)
        if(typeof(WebSocket) == "undefined") {
          console.log("浏览器不支持WebSocket");
        }else{
          //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          if(this.socket != null){
            this.socket.close();
            this.socket = null;
          }
          this.socket = new WebSocket("ws://127.0.0.1:8390/api/portalpublic/webSocket/"+ this.user);
          //打开事件
          this.socket.onopen = function() {
            console.log("websocket已打开");
          };
          //获得消息事件
          this.socket.onmessage = function(msg) {
            console.log("收到服务端信息：" + msg.data);
          };
          //关闭事件
          this.socket.onclose = function() {
            console.log("websocket已关闭");
          };
          //发生了错误事件
          this.socket.onerror = function() {
            console.log("websocket发生了错误");
          }
        }
      },

      //政策通知--值
      getBackgroundBoardData() {
        backgroundBoardData({}).then(res => {
          if (res.code == 200) {
            let day2 = new Date();
            day2.setTime(day2.getTime());
            let y = day2.getFullYear();
            let m = day2.getMonth() + 1 < 10 ? "0" + (day2.getMonth() + 1) : day2.getMonth() + 1;
            let d = day2.getDate() < 10 ? "0" + day2.getDate() : day2.getDate();
            let nowData = `${y}-${m}-${d}`;

            res.data.noticeInfoList.forEach(item => {
              if (item.onlineDateEnd && !item.paperDateEnd) {
                item.newData = item.onlineDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24)
                return;
              } else if (!item.onlineDateEnd && item.paperDateEnd) {
                item.newData = item.paperDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24);
                return;
              } else if (!item.onlineDateEnd && !item.paperDateEnd) {
                return
              } else if (item.onlineDateEnd.replace(/\-/g, "") > item.paperDateEnd.replace(/\-/g, "")) {
                item.newData = item.paperDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24)
                return
              } else if (item.onlineDateEnd.replace(/\-/g, "") < item.paperDateEnd.replace(/\-/g, "")) {
                item.newData = item.onlineDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24)
                return
              } else if (item.onlineDateEnd.replace(/\-/g, "") == item.paperDateEnd.replace(/\-/g, "")) {
                item.newData = item.onlineDateEnd;
                item.day = -(new Date(nowData) - new Date(item.newData)) / (1000 * 60 * 60 * 24)
                return
              }
            });

            this.policylist = res.data.noticeInfoList;

            setTimeout(() => {
              this.getListHeight()
            }, 200)

          }
        })
      },

      // 设置政策通知高度
      getListHeight() {
        const searchHeight = this.$refs.search.clientHeight
        const saleHeight = this.$refs.sale.clientHeight
        const comprehensiveHeight = this.$refs.comprehensive.clientHeight
        const userMatterHeight = this.$refs.userMatter.clientHeight
        if (saleHeight === 0 && comprehensiveHeight == 0) {
          this.NoticeListView = {'height': '300px'}
        } else {
          const listHeight = ((searchHeight + saleHeight + comprehensiveHeight - userMatterHeight - 40)) + 'px'
          this.NoticeListView = {'height': listHeight}
        }
        window.onresize = () => {
          return (() => {
            const searchHeight = this.$refs.search.clientHeight
            const saleHeight = this.$refs.sale.clientHeight
            const comprehensiveHeight = this.$refs.comprehensive.clientHeight
            const userMatterHeight = this.$refs.userMatter.clientHeight
            if (saleHeight === 0 && comprehensiveHeight == 0) {
              this.NoticeListView = {'height': '300px'}
            } else {
              const listHeight = ((searchHeight + saleHeight + comprehensiveHeight - userMatterHeight - 40)) + 'px'
              this.NoticeListView = {'height': listHeight}
            }
          })()
        }
      },

      //跳转到政策条件
      goPolicyDetail() {
        this.$router.push({
          path: '/dashboard/policyDetail'
        })
      },
      //跳转到消息
      goPolicyNews() {
        this.$router.push({
          path: '/message/list'
        })
      },

      //跳转到我的合同
      goContractHandle() {
        this.$router.push({
          path: '/contract'
        })
      },
      //跳转到我的订单
      goOrderHandle() {
        this.$router.push({
          path: '/declareCoordination/orderManage'
        })
      }

    },
  }
</script>

<style lang="less" scoped>
  ul li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .enterprise-box {
    padding-top: 10px;

    .cart {
      width: 100%;
      margin-bottom: 14px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      overflow: hidden;
    }

    .search-bar {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;

      .search-form {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;

        .search-input {
          width: 510px;

          /deep/ .el-input__inner {
            width: 510px;
            height: 40px;
            border: 1px solid #05AAFF;
            border-radius: 0;
            border-right: 0;
          }
        }

        .search-btn {
          width: 100px;
          height: 40px;
          color: #fff;
          border: 0;
          outline: none;
          cursor: pointer;
          font-size: 14px;
          background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

          &:active {
            background: linear-gradient(180deg, rgba(105, 204, 255, .5) 0%, rgba(5, 170, 255, .5) 100%);
          }
        }
      }
    }

    .cart-box {
      padding: 16px;

      .cart-title {
        display: flex;
        align-items: center;

        .line {
          width: 3px;
          height: 14px;
          margin-right: 10px;
          vertical-align: middle;
          margin-top: -2px;

          &.blue {
            background: #05AAFF;
          }

          &.purple {
            background: #5883FF;
          }

          &.red {
            background: #FE4E7E;
          }

          &.orange {
            background: #FFA96A;
          }
        }

        font-size: 16px;
        color: #042B40;

        .left-title {
          display: flex;
          align-items: center;
        }

        .more {
          cursor: pointer;
          font-size: 14px;
          color: rgba(68, 68, 68, 0.50);
        }

        &.sb {
          justify-content: space-between;
        }
      }

      .cart-salesFollow-body {
        display: flex;
        align-items: center;
        padding-top: 15px;

        .item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px;
          box-sizing: border-box;
          flex: 1;
          max-width: 150px;
          height: auto;
          cursor: pointer;
          border-radius: 4px;
          background-size: 100% 100% !important;

          .left {
            color: #fff;

            .num {
              font-size: 1.2vw;
              margin-bottom: 0.1vw;
            }

            .text {
              font-size: 0.8vw;
            }
          }

          img {
            width: 2.6vw;
            max-width: 36px;
          }

          &.one {
            background: url("../../../../static/business/one.png") no-repeat;
          }

          &.two {
            background: url("../../../../static/business/two.png") no-repeat;
          }

          &.three {
            background: url("../../../../static/business/three.png") no-repeat;
          }

          &.four {
            background: url("../../../../static/business/four.png") no-repeat;
          }

          &.five {
            background: url("../../../../static/business/five.png") no-repeat;
          }

          &.six {
            background: url("../../../../static/business/six.png") no-repeat;
          }

          &.serven {
            background: url("../../../../static/business/serven.png") no-repeat;
          }

          &.eight {
            background: url("../../../../static/business/eight.png") no-repeat;
          }

          &.nine {
            background: url("../../../../static/business/nine.png") no-repeat;
          }

          &.padding-left-30 {
            padding-left: 30px;
          }
        }

        .line {
          width: 1.2%;
          height: 0;
          border-top: 1px dashed red;
        }
      }

      .cart-myMatter-body {
        margin-top: 20px;

        .item-myMatter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 20px;

          .left {
            font-size: 16px;
            display: flex;
            align-items: center;

            img {
              width: 20px;
              height: 20px;
              vertical-align: middle;
              margin-top: -4px;
            }

            .text {
              cursor: pointer;
              color: rgba(68, 68, 68, 1);
              margin-left: 10px;

              &:hover {
                color: #05AAFF;
              }
            }
          }

          .right {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(68, 68, 68, 0.75);
          }
        }
      }

      #policyRoll, #projectRoll {
        overflow: hidden;
        margin-top: 20px;
      }

      .scroll-list {
        margin-top: 10px;
        overflow: hidden;
      }

      .cart-policyNotice-body {
        li {
          color: #444;
          font-size: 14px;
          margin-left: 14px;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px dashed rgba(68, 68, 68, 0.1411764705882353);

          .top-text {
            .level {
              display: inline-block;
              text-align: center;
              line-height: 20px;
              min-width: 40px;
              width: 40px;
              height: 20px;
              font-size: 12px;
              color: #fff;
              margin-right: 4px;
              background: rgb(5, 170, 255);

              &.orange {
                background: rgba(255, 186, 136, 1);
              }

              &.green {
                background: rgb(145, 229, 161);
              }

              &.red {
                background: rgb(254, 149, 178);
              }

              &.blue {
                background: rgb(155, 181, 255);
              }
            }

            .text {
              cursor: pointer;

              &:hover {
                color: #05AAFF;
              }
            }
          }

          .date-time {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 6px;

            .date {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(68, 68, 68, 0.60);
            }

            .date-state {
              font-size: 14px;
              font-weight: 400;
              color: #05AAFF;

              .date-num {
                color: #F56C6C;
              }
            }
          }
        }
      }
    }

    .custom-modal {
      /deep/ .el-dialog__header {
        border-bottom: 1px solid rgba(68, 68, 68, 0.3);
        padding: 20px 20px 16px;
      }
    }

    .report-item-box {
      padding: 6px;

      .cart-title {
        padding: 10px;
      }
    }

    .cart-group-body {
      .col {
        padding: 10px;

        .item-cart {
          border: 1px solid #EAEAEA;
          height: 228px;
          position: relative;
          padding: 25px;

          .tag {
            width: 55px;
            position: absolute;
            top: -3px;
            left: -4px;

            .tag-img {
              width: 100%;
              height: auto;
            }
          }

          .title-cart {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title-name {
              font-size: 18px;
              color: #05AAFF;
              cursor: pointer;
            }

            .title-money {
              font-size: 12px;
              color: rgba(68, 68, 68, 0.60);
              margin-top: -6px;

              .num {
                font-size: 30px;
                color: #FF2F2F;
                margin-left: 10px;
              }

              .unit {
                font-size: 14px;
                color: #FF2F2F;
              }
            }
          }

          .report-term {
            margin-top: 15px;
            font-size: 14px;

            .num {
              color: #FF6B6B;
            }
          }

          .accord-bar {
            font-size: 12px;
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
              width: 15px;
            }

            .left {
              display: flex;
              align-items: center;
              color: #799CFF;

              img {
                vertical-align: middle;
                margin-right: 10px;
                margin-top: -3px;
              }
            }

            .right {
              display: flex;
              align-items: center;
              color: #FF6B6B;

              img {
                vertical-align: middle;
                margin-right: 10px;
                margin-top: -3px;
              }
            }
          }

          .line-bar {
            width: 100.5%;
            position: absolute;
            top: 122px;
            left: -1px;
            display: flex;
            align-items: center;

            hr {
              width: 100%;
              height: 1px;
              border: none;
              border-top: 2px dashed rgba(68, 68, 68, 0.10196078431372549);
            }

            .left-semi-circle {
              width: 8px;
              height: 14px;
              background: #fff;
              border: 1px solid rgba(68, 68, 68, 0.10196078);
              border-radius: 0 100% 100% 0;
              border-left: 0;
            }

            .right-semi-circle {
              width: 8px;
              height: 14px;
              background: #fff;
              border: 1px solid rgba(68, 68, 68, 0.10196078);
              border-radius: 100% 0 0 100%;
              border-right: 0;
            }
          }

          .handle-bar {
            margin-top: 37px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #000;
              font-family: Microsoft YaHei;
              font-weight: 400;

              .xin-list {
                display: flex;
                align-items: center;
                margin-left: 5px;

                li {
                  width: 19px;
                  height: 16px;
                  background: url("../../../../static/xin.png") no-repeat;
                  background-size: cover !important;
                  margin-right: 5px;
                }

                &.one {
                  li:first-child {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }
                }

                &.two {
                  li:first-child {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(2) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }
                }

                &.three {
                  li:first-child {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(2) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(3) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }
                }

                &.four {
                  li:first-child {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(2) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(3) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(4) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }
                }

                &.five {
                  li:first-child {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(2) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(3) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:nth-child(4) {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }

                  li:last-child {
                    background: url("../../../../static/_xin.png") no-repeat;
                  }
                }
              }
            }

            .right {
              .btn-handle {
                cursor: pointer;
                outline: none;
                color: #fff;
                font-size: 14px;
                width: 95px;
                height: 30px;
                border: 0;
                background: linear-gradient(180deg, rgba(55, 187, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

                &:active {
                  opacity: 0.5;
                }
              }
            }
          }

          .cart-footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 38px;
            line-height: 38px;
            left: 0;
            background: rgba(238, 242, 255, 1);
            text-align: center;
            font-size: 12px;
            color: #444444;

            .num-home {
              font-size: 14px;
              color: #FF6B6B;

              i {
                font-style: normal;
                font-size: 18px;
              }
            }
          }
        }
      }
    }

    .no-policy-body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .img {
        width: 40%;
      }

      .text {
        font-size: 14px;
        color: rgba(68, 68, 68, 0.60);
        margin: 20px 0;
      }

      .go-finish-btn {
        margin-bottom: 20px;
        color: #fff;
        background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

        &:active {
          background: linear-gradient(180deg, rgba(105, 204, 255, 0.5) 0%, rgba(5, 170, 255, 0.5) 100%);
        }
      }
    }
  }


</style>
