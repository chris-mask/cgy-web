<template>
  <div class="service-box">

    <!--tab了栏-->
    <div class="tab-bar">
      <div v-for="(item,index) in tabListDetail" @click="tabHandle(index)" :key="index"
           :class="activeTab===index+1? 'tab-item cur':'tab-item'">
        {{item}}
      </div>
    </div>

    <!--筛选栏-->
    <div class="screen-bar">
      <div class="left">
        <el-button size="mini" class="item-btn all cur">全部（1）</el-button>
        <el-button size="mini" class="item-btn all">处理完（1）</el-button>
        <el-button size="mini" class="item-btn expire">处理中（1）</el-button>
        <el-button size="mini" class="item-btn untreated">未处理（1）</el-button>
      </div>
      <div class="right">
        <el-date-picker class="time" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"></el-date-picker>
        至
        <el-date-picker class="time" type="date" placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
        <el-button class="filter-item search-btn" @click="addEditModal = true">新增需求</el-button>

      </div>
    </div>


    <!--列表-->
    <div class="list">
      <div class="item">
        <!--左侧详情-->
        <div class="pic done">我的需求</div>
        <div class="detail">
          <div class="name">01</div>
          <div class="remark">
            123描述 ：<span class="remark-text">666</span>
          </div>
          <div class="time-list-detail done">
            <div>提交时间：2013-02-03</div>
            <div>处理人：123</div>
            <div>处理结果：123</div>
          </div>
        </div>
        <!--徽章图片：处理中、未处理、已处理-->
        <div class="sign-pic">
          <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案_20200525113701_250.png"/>
        </div>
        <!--操作按钮：查看、编辑-->
        <div class="handle-btn-group">
          <div class="item-btn read" @click="goDetailHandle"></div>
          <div class="item-btn edit" @click="addEditModal = true"></div>
          <div class="item-btn do" @click="handleModal = true"></div>
          <div class="item-btn del" @click="handleDel"></div>
          <div class="item-btn appraise" @click="appraiseModal = true"></div>
          <div class="item-btn allocation" @click="distributionModal = true"></div>
        </div>
      </div>

      <div class="item">
        <!--左侧详情-->
        <div class="pic no-do">我的需求</div>
        <div class="detail">
          <div class="name">02</div>
          <div class="remark">
            123描述 ：<span class="remark-text">666</span>
          </div>
          <div class="time-list-detail no-do">
            <div>提交时间：2013-02-03</div>
            <div>处理人：123</div>
            <div>处理结果：123</div>
          </div>
        </div>
        <!--徽章图片：处理中、未处理、已处理-->
        <div class="sign-pic">
          <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案(4)_20200525113608_711.png"/>
        </div>
        <!--操作按钮：查看、编辑-->
        <div class="handle-btn-group">
          <div class="item-btn read"></div>
          <div class="item-btn edit"></div>
          <div class="item-btn do"></div>
          <div class="item-btn del"></div>
          <div class="item-btn appraise"></div>
          <div class="item-btn allocation"></div>
        </div>
      </div>

      <div class="item">
        <!--左侧详情-->
        <div class="pic doing">我的需求</div>
        <div class="detail">
          <div class="name">03</div>
          <div class="remark">
            123描述 ：<span class="remark-text">666</span>
          </div>
          <div class="time-list-detail doing">
            <div>提交时间：2013-02-03</div>
            <div>处理人：123</div>
            <div>处理结果：123</div>
          </div>
        </div>
        <!--徽章图片：处理中、未处理、已处理-->
        <div class="sign-pic">
          <img src="https://chengguoyun.oss-cn-shenzhen.aliyuncs.com/抢客户图案(1)_20200525113441_171.png"/>
        </div>
        <!--操作按钮：查看、编辑-->
        <div class="handle-btn-group">
          <div class="item-btn read"></div>
          <div class="item-btn edit"></div>
          <div class="item-btn do"></div>
          <div class="item-btn del"></div>
          <div class="item-btn appraise"></div>
          <div class="item-btn allocation"></div>
        </div>
      </div>

      <!--加载更多-->
      <!--      <div class="item get-more" v-if="list.length !== 0">-->
      <!--        <span @click="loadMore">{{list.length >= total ? '没有更多' : '加载更多'}}</span>-->
      <!--      </div>-->

      <!--      <div class="item no-data" v-if="list.length === 0">-->
      <!--        暂无数据-->
      <!--      </div>-->

    </div>

    <!--弹出窗-->
    <el-dialog title="新增/编辑" class="editorUserModal" :visible.sync="addEditModal" width="600px" v-dialogDrag>
      <el-form v-model="addEditForm" ref="implementForm" label-width="120px">

        <el-form-item label="服务类型：" prop="period">
          <el-select class="week" filterable clearable placeholder="请选择服务类型">
            <el-option>123</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述：" prop="plan_develop_customer_num">
          <el-input type="textarea" resize="none" :rows="5" min="0"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="setBtn">确 定</el-button>
        <el-button class="cananl" @click="addEditModal = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="处理" class="editorUserModal" :visible.sync="handleModal" width="600px" v-dialogDrag>
      <el-form ref="implementForm" label-width="120px">

        <el-form-item label="处理结果：" prop="plan_develop_customer_num">
          <el-input type="textarea" resize="none" :rows="5" min="0"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="setBtn">确 定</el-button>
        <el-button class="cananl" @click="handleModal = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="评价" class="editorUserModal" :visible.sync="appraiseModal" width="600px" v-dialogDrag>
      <el-form ref="implementForm" label-width="120px">

        <el-form-item label="满意度：" prop="plan_develop_customer_num">
          <el-radio-group v-model="checkAppraise" style="margin-top: 13px;">
            <el-radio :label="0">未评价</el-radio>
            <el-radio :label="1">非常满意</el-radio>
            <el-radio :label="2">满意</el-radio>
            <el-radio :label="3">不满意</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="反馈意见：" prop="plan_develop_customer_num">
          <el-input type="textarea" resize="none" :rows="5" min="0"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="setBtn">确 定</el-button>
        <el-button class="cananl" @click="appraiseModal = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配处理人" class="editorUserModal" :visible.sync="distributionModal" width="600px" v-dialogDrag>
      <el-form ref="implementForm" label-width="120px">

        <el-form-item label="处理人员：" prop="plan_develop_customer_num">
          <el-select  multiple placeholder="请选择">
            <el-option>
              123
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="setBtn">确 定</el-button>
        <el-button class="cananl" @click="distributionModal = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import { getServiceTraceList, saveServiceTrace, deleteServiceTrace, commentServiceTrace, assignServiceTrace, processServiceTrace } from '@/api/crm'
  // import qs from 'qs'
  // import ElRadio from 'element-ui/packages/radio/src/radio'

  export default {
    // components: { ElRadio },
    name: 'complexTable',
    data() {
      return {
        // tab栏数据
        tabListDetail: ['需求', '投诉'],
        // 当前选中的tab
        activeTab: 1,
        // 当前选中的筛选类型
        activeType: null,


        //新增/编辑----弹窗
        addEditModal: false,
        addEditForm: {},


        //处理----弹窗
        handleModal: false,


        //评价----弹窗
        appraiseModal: false,
        checkAppraise: "",

        //分配处理人----弹窗
        distributionModal:false,

        // allowGetUserList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:DEMAND:COMPLAINT','SYSTEM:PERFORMANCE:USER:LIST'),//获取用户列表
      }
    },


    methods: {
      // 点击tab
      tabHandle(index) {
        this.activeTab = index + 1
      },

      // 删除
      handleDel() {
        this.$confirm('确定删除?', '提示', { center: true, confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(_ => {

        })
      },

      //查看----详情
      goDetailHandle(){
        this.$router.push({
          path: '/customer/serviceTrace/form',
        })
      }

    }
  }
</script>
<style lang="less" scoped>
  .service-box {
    padding: 0 14px;

    .tab-bar {
      display: flex;
      align-items: center;
      background: #E4F4FC;

      .tab-item {
        font-size: 16px;
        color: #444444;
        width: 166px;
        text-align: center;
        cursor: pointer;
        height: 50px;
        line-height: 50px;

        &.cur {
          background: #fff;
          color: #05AAFF;
        }
      }
    }

    .screen-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #DBE9FF;
      padding: 5px 20px;
      background: #fff;

      .left {
        display: flex;
        align-items: center;

        .item-btn {
          margin: 0;
          margin-right: 17px;
          font-size: 16px;

          &:active {
            opacity: 0.5;
          }
        }

        .all {
          border-color: #05AAFF;
          color: #05AAFF;

          &.cur {
            background: #05AAFF;
            color: #fff;
          }

          &:hover {
            background: #05AAFF;
            color: #fff;
          }
        }

        .expire {
          border-color: #FFA96A;
          color: #FFA96A;

          &.cur {
            background: #FFA96A;
            color: #fff;
          }

          &:hover {
            background: #FFA96A;
            color: #fff;
          }
        }

        .untreated {
          border-color: #5883FF;
          color: #5883FF;

          &.cur {
            background: #5883FF;
            color: #fff;
          }

          &:hover {
            background: #5883FF;
            color: #fff;
          }
        }
      }

      .right {
        .time {
          width: 140px;
          border: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.2980392156862745);

          /deep/ .el-input__inner {
            border: 0;
            padding-right: 0;
          }
        }

        .search-btn {
          width: 100px;
          height: 36px;
          padding: 0;
          border-radius: 4px;
          color: #fff;
          border: 0;
          background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

          &:active {
            opacity: 0.5;
          }
        }
      }
    }

    .list {
      background: #fff;

      .item {
        position: relative;
        padding: 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(68, 68, 68, .15);

        .pic {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 18px;
          width: 84px;
          height: 84px;
          border-radius: 6px;
          background: rgba(105, 204, 255, 1);
          margin-right: 17px;
          padding: 23px;

          &.no-do {
            background: #799CFF;
          }

          &.doing {
            background: #FFBA88;
          }

          &.done {
            background: #69CCFF;
          }

        }

        .detail {
          width: 40%;

          .name {
            font-family: Microsoft YaHei;
            font-size: 18px;
            color: rgba(68, 68, 68, 1);
            font-weight: bold;
            margin-bottom: 10px;
          }

          .remark {
            display: flex;
            font-size: 14px;
            margin-bottom: 10px;
            white-space: nowrap;

            .remark-text {
              width: 100%;
              display: inline-block;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              vertical-align: text-bottom;
              color: rgba(68, 68, 68, 0.75);
            }
          }

          .time-list-detail {
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;


            &.no-do {
              color: #5883FF;
            }

            &.doing {
              color: #FFA96A;
            }

            &.done {
              color: #05AAFF;
            }
          }
        }

        .sign-pic {
          position: absolute;
          right: 30%;

          img {
            width: 95px;
            height: 66px;
          }
        }

        .handle-btn-group {
          position: absolute;
          right: 10px;
          top: 7px;
          width: 162px;
          display: flex;
          flex-wrap: wrap;

          .item-btn {
            width: 71px;
            height: 30px;
            background-image: url("../../../../static/service_trace_sprite.png");
            background-size: cover;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;

            &.edit {
              background-position: -447px, 0;
            }

            &.read {
              background-position: -90px, 0;
            }

            &.do {
              background-position: -179px, 0;
            }

            &.del {
              background-position: -357px, 0;
            }

            &.appraise {
              background-position: -268px, 0;
            }

            &.allocation {
              background-position: 0, 0;
            }
          }

          .item-btn:hover {
            background-image: url("../../../../static/_service_trace_sprite.png");

            &.edit {
              background-position: -433px, 0;
            }

            &.read {
              background-position: -87px, 0;
            }

            &.do {
              background-position: -173px, 0;
            }

            &.del {
              background-position: -346px, 0;
            }

            &.appraise {
              background-position: -260px, 0;
            }
          }

          .item-btn:active {
            opacity: 0.5;
          }
        }
      }

      .no-data {
        font-size: 14px;
        justify-content: center;
        color: #909399;
      }

      .get-more {
        justify-content: center;

        span {
          cursor: pointer;
        }
      }
    }


    .editorUserModal {
      /deep/ .el-dialog__header {
        border-bottom: 1px solid rgba(68, 68, 68, 0.3);
        padding: 20px 20px 16px;
      }

      /deep/ .el-dialog__title {
        line-height: 0;
      }

      /deep/ .el-dialog__headerbtn {
        top: 19px;
      }

      /deep/ .el-dialog__body {
        padding: 14px;
      }

      /deep/ .el-form-item__label {
        font-weight: normal;
        color: rgba(68, 68, 68, 0.75);
      }

      /deep/ .el-form-item__content {
        width: 73%;
        display: flex;
      }

      .week {
        /deep/ .el-input__inner {
          width: 220px;
        }
      }

      .dialog-footer {
        .setBtn {
          color: #fff;
          background: rgba(5, 170, 255, 1);
        }

        .cananl {
          background: #fff;
          color: rgba(68, 68, 68, 1);
        }
      }
    }
  }


</style>
