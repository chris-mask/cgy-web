<template>
  <el-card class="system-card">
    <!--头部导航+搜索-->
    <div class="system-nav-bar" ref="navBarHeight">
      <div class="left">
        <div  :class="remindType===0 ? 'all cur':'all'" @click="tabHandle(0)">全部({{allNumber?allNumber:0}})</div>
        <div :class="remindType===-1 ?'unread cur':'unread'" @click="tabHandle(-1)">未读({{noReadNumber?noReadNumber:0}})</div>
        <span class="line-center">|</span>
        <div :class="remindType===1 ?'done cur':'done'" @click="tabHandle(1)">
          待办消息({{remindCount.upcoming}})
        </div>
        <div :class="remindType===2 ?'expire cur':'expire'" @click="tabHandle(2)">
          到期消息({{remindCount.maturity}})
        </div>
<!--        <div :class="remindType===3 ?'warn cur':'warn'" @click="tabHandle(3)">-->
<!--          提醒消息({{remindCount.remind}})-->
<!--        </div>-->
        <span class="line-center">|</span>
        <div @click="readAllHandle">全部标为已读</div>
      </div>
      <div class="right column" style=" ">
        <div style="">
          <el-input v-model="searchKeyWords" clearable class="chatRecord" @keyup.enter.native="getList(0)" placeholder="输入关键字"></el-input>

          <el-date-picker class="time" v-model="startDate" type="date" placeholder="开始日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
          至
          <el-date-picker class="time" v-model="endDate" type="date" placeholder="结束日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
          <el-button class="filter-item search-btn" @click="getList(0)">搜索</el-button>
        </div>
        <div class="aflex"  >
          <div style="width: 165px;" ></div>
          <div >
                 <el-select size="small" filterable v-model="searchCompanyIdList" placeholder="选择公司"
                           clearable @change="signCompanyChange">
                  <el-option
                    v-for="item in companyList"
                    :key="item.companyId"
                    :label="item.companyName"
                    :value="item.companyId">
                  </el-option>
                </el-select>
          </div>
          <div style="width:185px">
                <el-select filterable size="small" v-model="searchUserIdList" placeholder="业务员" clearable @change="userChange">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                  </el-option>
                </el-select>
          </div>
        </div>

      </div>
    </div>

    <!--列表-->
    <div class="system-list">
      <div v-if="remindType==1" class="pending">
        <div  class="handPointer" :class="relType===2 ?'curPending':''" @click="tabPending(2)" >订单</div>
        <div  class="handPointer"  :class="relType===5 ?'curPending':''"  @click="tabPending(5)">订单节点评论</div>
        <div  class="handPointer"  :class="relType===6 ?'curPending':''"  @click="tabPending(6)">政策推送</div>
      </div>
      <div class="item" v-for="(item,index) in listData" :key="index">
           <!-- {{index}} -->
           <!-- @click="getDetailHandle(item.remindId)" -->
        <div class="left handPointer" @click="getDetailHandle(item.remindId)">
          <div
            :class="item.remindType === 0?'pic blue':item.remindType === 1?'pic orange':item.remindType === 3?'pic green':'pic'">
            {{item.remindType === 0?'待办消息':item.remindType === 1?'到期消息':item.remindType === 3?'提醒消息':''}}
            <div class="tip" v-if="item.isRead === 0"></div>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <span @click.stop="titleHandle(item)"
                  class="handPointer"
                  :class="item.remindType === 0?'system-type blue':item.remindType === 1?'system-type orange':item.remindType === 3?'system-type green':'system-type'">
              {{item.remindType === 0?'待办消息':item.remindType === 1?'到期消息':item.remindType === 3?'提醒消息':''}}
            </span>
            <span v-if="relType===2||relType===5" style="margin-left:20px;"  >{{item.companyName}} </span>
            <span v-if="relType===2||relType===5" style="margin-left:20px;">{{item.projectName}}</span>
            <span  v-if="( relType===2||relType===5 )&& remindType!=2"  class="handPointer clickpic" @click="followShow(item.relId)">查看项目跟进</span>
          </div>
          <div class="text handPointer"   @click="getDetailHandle(item.remindId)">
            {{item.remindContent}}
          </div>
        </div>
      </div>
      <div class="get-more-data handPointer">
        <span @click="getMore" v-if="isShowGetMore">点击加载更多</span>
        <div class="no-more handPointer" v-else>没有更多数据了</div>
      </div>
    </div>


    <!-- 查看 -->
    <el-dialog title="查看" class="editorUserModal" :visible.sync="sysVisible" width="600px" v-dialogDrag>
      <el-form ref="implementForm" label-width="120px">
        <el-form-item label="消息类型：">
          <span>
            {{sysModalData.remindType === 0?'待办消息':sysModalData.remindType === 1?'到期消息':sysModalData.remindType === 3?'提醒消息':''}}
          </span>
        </el-form-item>

        <el-form-item label="消息内容：">
          <span>您的客户：{{sysModalData.remindContent}}</span>
        </el-form-item>

        <el-form-item label="提醒时间：">
          <span>{{sysModalData.sendTime}}</span>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="cananl" @click="sysVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 查看 -->
    <el-dialog title="项目跟进信息" class="editorUserModal" :visible.sync="followVisible" width="600px" v-dialogDrag>
      <block  label-width="120px" class="follow" >
          <block v-if="followData.length>0" ><p v-for="(item,index) in followData" :key="index" >{{item.remindContent}}</p> </block>
          <block v-else> <p  class="cent"> 该项目没有跟进信息</p>  </block>
          <!-- v-if="followData.length>0"  v-else -->
      </block>
      <span slot="footer" class="dialog-footer">
        <el-button class="cananl" @click="followVisible = false">关 闭</el-button>
      </span>
    </el-dialog>


  </el-card>
</template>

<script>
  import {queryMsgRemindList, updateMsgRemindMarkRead, queryMsgRemindById,queryOrderMsgRemindList } from '@/api/messageCenter'
  import {queryUserComboInfo} from '@/api/customerCenter'
  import {queryCompany} from '@/api/contractManage'
  export default {
    data() {
      return {
        companyId: this.$store.getters.companyId,
        startDate: "",
        endDate: "",
        //输入关键字
        searchKeyWords:"",
        relType: 2,
        followVisible: false,
        followData:[],


        //当前类型
        remindType: 0,
        //全部总数量
        allNumber: "",
        //未读总数量
        noReadNumber: "",
        //列表数据
        listData: [],
        //tab栏数据列表数值
        remindCount: {
          upcoming: 0,
          maturity: 0,
          remind: 0
        },
        //弹窗
        sysVisible: false,
        sysModalData: {},
        page: 0,
        pageSize: 20,
        isShowGetMore: true,

        searchUserIdName:'',
        searchUserIdList:'',
        searchCompanyIdList:'',
        searchCompanyIdName:'',

        userList:[],
        companyList:[],
      }
    },
    mounted() {
      this.getList()
      this.getPersonList('业务主管,业务员');
      this.getCompanyList()
    },
    methods: {

      //获取签约公司
      getCompanyList(){
        queryCompany().then(res => {
          if (res.code == 200) {
            this.companyList = res.data
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //根据角色获取人员列表
      getPersonList(name,deptIds){
        let formData = new FormData;
        formData.append('roleNameList',name)
        if(deptIds != undefined){
          formData.append('deptIdList',deptIds)
        }
        queryUserComboInfo(formData).then(res=>{
          if(res.code == 200){
            this.userList = res.data;
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      userChange(val){
        if (val) {
          this.searchUserIdName = this.userList.find(ele => ele.userId === val).userName
          this.searchUserIdList = val
          console.log(val,"======userChange====val==>")
          // this.$set(this.selectConditionsList, 'signUserId', '签订人 - ' + this.userList.find(ele => ele.userId === val).userName)
        } else {
          // this.$delete(this.selectConditionsList, 'signUserId')
          this.searchUserIdName=''
          this.searchUserIdList=''
        }
      },

      signCompanyChange(val){
        if (val) {
          this.searchCompanyIdName = this.companyList.find(ele => ele.companyId === val).companyName
          this.searchCompanyIdList = val
          console.log(val,"======signCompanyChange====val==>")
          // this.$set(this.selectConditionsList, 'signCompanyId', '签约公司 - ' + this.companyList.find(ele => ele.companyId === val).companyName)
        } else {
          // this.$delete(this.selectConditionsList, 'signCompanyId')
          this.searchCompanyIdName = ""
          this.searchCompanyIdList = ''
        }



      },


      // //关键字搜索
      // searchChatHandle(){
      //   console.log("=================》")
      //    this.getList()
      // },
      followShow(id){
        this.followVisible = true

        let params = {
          relId: id,
          relType: 9,
          page: 0,
           pageSize: 0
        };
        queryOrderMsgRemindList(params).then(res => {
          if (res.code === 200) {
            this.followData=res.data
            // this.followData.length
          }
        })
      },
      //查询提醒列表
      getList(num) {
        if(num==0){
          this.page=0
        }
        const companyIds = []
        if (this.searchCompanyIdList) {
          companyIds.push(this.searchCompanyIdList)
        }
        const userIds = []
        if (this.searchUserIdList) {
          userIds.push(this.searchUserIdList)
        }
        let params = {
          searchCompanyIdList:userIds,
          searchUserIdList:companyIds,
          companyId: this.companyId,
          remindType: this.remindType,
          markRead: false,
          startDate: this.startDate,
          endDate: this.endDate,
          page: this.page,
          pageSize: this.pageSize,
          searchKeyWords: this.searchKeyWords,
          relType: this.relType
        };
        queryMsgRemindList(params).then(res => {
          if (res.code === 200) {
            this.listData = res.data.remindList;
            if (res.data.remindCount) {
              this.remindCount = res.data.remindCount;
              this.allNumber = Number(res.data.remindCount.upcoming) + Number(res.data.remindCount.maturity) + Number(res.data.remindCount.remind);

              switch (this.remindType) {
                case 1:
                  this.noReadNumber = Number(res.data.remindCount.upcomingUnread);
                  break;
                case 2:
                  this.noReadNumber = Number(res.data.remindCount.maturityUnread);
                  break;
                case 3:
                  this.noReadNumber = Number(res.data.remindCount.remindUnread);
                  break;
                default:
                  this.noReadNumber = Number(res.data.remindCount.upcomingUnread) + Number(res.data.remindCount.maturityUnread) + Number(res.data.remindCount.remindUnread);
              }
            }
          }
        })
      },
      tabPending(index){
        this.page = 0;
        this.pageSize = 20;
        this.relType = index;
        this.getList();
      },
      tabHandle(index) {
        this.page = 0;
        this.pageSize = 20;
        this.isShowGetMore = true;
        this.remindType = index;
        this.getList();
      },

      titleHandle(data) {
        this.sysModalData = data;
        this.sysVisible = true;
      },
      readAllHandle() {
        let params = {
          companyId: this.companyId,
          remindType: this.remindType,
          markRead: true,
          startDate: this.startDate,
          endDate: this.endDate,
          page: this.page,
          pageSize: this.pageSize
        };
        updateMsgRemindMarkRead(params).then(res => {
          if (res.code === 200) {
            this.getList();
          }
        })
      },

      //点击跳转到详情  合同:1; 订单:2; 专利:3; 商标:4,评论:5
      getDetailHandle(id) {
        queryMsgRemindById({remindId: id}).then(res => {
          if (res.code === 200) {
            this.listData.forEach(item => {
              if (item.remindId === id) {
                item.isRead = 1;
              }
            });

            switch (res.data.relType) {
              case 1:
                this.$router.push({
                  path: '/contract/checkContract',
                  query: {contractId: res.data.relId, isCheck: true}
                });
                break;
              case 2:
                this.$router.push({
                  path: '/declareCoordination/orderManage/orderDetail',
                  query:{orderId: res.data.relId, isCheck: true}
                })
                break;
              case 3:
                this.$router.push({
                  'path': '/ipr/patent/form/detail',
                  'query': {'type': 'read', 'patentId': res.data.relId}
                });
                break;
              case 4:
                this.$router.push({
                  'path': '/ipr/trademark/form/detail',
                  'query': {'type': 'read', 'trademarkId': res.data.relId}
                })
                break;
              case 5:
                this.$router.push({
                  path: '/declareCoordination/orderManage/orderDetail',
                  query:{orderId: res.data.relId, isCheck: true}
                })
                break;
              case 6:
                this.$router.push({
                  path: '/policy/project/matchingCompany',
                  query:{pushId: res.data.relId, isCheck: true}
                })
                break;
            }
          }
        })
      },


      getMore() {
        this.page += 20;
        // this.pageSize += 20;
        let params = {
          companyId: this.companyId,
          remindType: this.remindType,
          markRead: true,
          startDate: this.startDate,
          endDate: this.endDate,
          page: this.page,
          pageSize: this.pageSize,
          searchKeyWords: this.searchKeyWords,
          relType:this.relType
        };
        queryMsgRemindList(params).then(res => {
          if (res.code === 200) {
            if (res.data.remindList.length === 0) {
              this.isShowGetMore = false;
              return false;
            } else {
              this.listData = this.listData.concat(res.data.remindList);
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.cent{
  text-align: center;
  width: 550px;
}
  .follow{
    // display: flex;
    display: block;
    width: 100%;
    align-items: center;
    line-height: 24px;
    height: 300px;
    // padding: 30px 0;
    overflow-y: auto;
  }
  .handPointer{
    cursor: pointer;
  }
  .system-card {
    border: 0;

    /deep/ .el-card__body {
      padding: 0;
    }

    .system-nav-bar {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #DBE9FF;
      padding: 10px 20px;

      .left {
        display: flex;
        align-items: center;

        div {
          height: 30px;
          line-height: 30px;
          margin-right: 14px;
          border: 1px solid;
          font-size: 16px;
          text-align: center;
          padding: 0 10px;
          border-radius: 2px;
          cursor: pointer;
          white-space: nowrap;
        }


        .line-center {
          color: rgba(68, 68, 68, 0.2980392156862745);;
          margin-right: 14px;
        }

        .all {
          border-color: #05AAFF;
          color: #05AAFF;

          &.cur {
            background: #05AAFF;
            color: #fff;
          }
        }

        .unread {
          border-color: #F56C6C;
          color: #F56C6C;

          &.cur {
            background: #F56C6C;
            color: #fff;
          }
        }

        .done {
          border-color: #05AAFF;
          color: #05AAFF;

          &.cur {
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
        }

        .warn {
          border-color: #48D462;
          color: #48D462;

          &.cur {
            background: #48D462;
            color: #fff;
          }
        }
      }
      .aflex{
        margin-top: 10px;
        display: flex;
        width: 550px;
        justify-content: space-between;
      }
      .width185{
       width: 185px;
      }
      .column{
        flex-direction: column;
        justify-content:flex-end
      }
      .right {
        display: flex;
        align-items: center;


        .chatRecord {
          width: 160px;
          border: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.2980392156862745);
          margin-right: 20px;

          /deep/ .el-input__inner {
            border: 0;
            padding-right: 0;
          }
        }

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
          width: 60px;
          height: 30px;
          padding: 0;
          border-radius: 4px;
          color: #fff;
          border: 0;
          background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
        }
      }
    }

    .system-list {
      overflow-y: auto;




      .pending{
        display: flex;
        margin-top: 10px;
        margin-left: 20px;
        .curPending{
          background: #05AAFF;
          color: #fff;

        }
        div{
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #05AAFF;
          border:#05AAFF solid 1px ;
          border-radius: 5px;
          margin-right: 15px;
        }
      }
      .item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(68, 68, 68, 0.14901960784313725);
        padding: 20px;
        // cursor: pointer;

        .left {
          margin-right: 30px;

          .pic {
            min-width: 70px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            color: #fff;
            position: relative;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px;
            text-align: center;

            .tip {
              width: 12px;
              height: 12px;
              background: #F56C6C;
              position: absolute;
              right: 5px;
              top: 2px;
              border-radius: 50%;
            }

            &.blue {
              background: #05AAFF;
            }

            &.orange {
              background: #FFA96A;
            }

            &.green {
              background: #48D462;
            }
          }
        }

        .right {
          font-size: 14px;

          .title {
            color: rgba(68, 68, 68, 0.75);
            margin-bottom: 14px;
            display: flex;
            .clickpic{
              display:block;
              color: #fff;
              background: #05AAFF;
              width: 100px;
              height: 18px;
              text-align: center;
              line-height: 18px;
              border-radius: 5px;
              margin-left: 20px;
            }

            .system-type {
              margin-right: 14px;

              &.blue {
                color: #05AAFF;
              }

              &.orange {
                color: #FFA96A;
              }

              &.green {
                color: #48D462;
              }
            }

          }

          .text {
            color: #444;
          }
        }
      }

      .get-more-data {
        padding: 20px 0;
        text-align: center;

        .no-more {
          color: #ccc;
        }

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

      .user-input {
        /deep/ .el-input__inner {
          border: 0;
          border-radius: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.3);
        }

        &.input {
          width: 100%;
          border-radius: 0;
          border: 0;
          border-bottom: 1px solid rgba(68, 68, 68, 0.3);

          &:focus {
            border: 0;
            border-bottom: 1px solid rgba(68, 68, 68, 0.3);
          }
        }
      }

      .user-select {
        width: 100%;
      }

      .switch-btn {
        font-size: 14px;
        color: #fff;
        background: rgba(5, 170, 255, 1);
        margin-left: 10px;

        &:active {
          opacity: .5;
        }
      }

      .modal-radio {
        display: flex;
        align-items: center;

        /deep/ .el-form-item__content {
          margin-left: 0 !important;
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

    .noData {
      text-align: center;
      color: #909399;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
    }
  }
</style>
