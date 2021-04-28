<template>
  <div class="app-container">
    <el-card class="box-card box-margin" style="margin-bottom: 20px;">
      <div class="searchCont">
        <div class="searchLeft">
          <el-select filterable multiple remote :remote-method="projectListMethod" v-loadMore="loadMore" :loading="loading"
                     size="small" v-model="messageForm.projectIds" placeholder="项目名称" clearable @change="goSearch">
            <el-option v-for="item in projectList" :key="item.projectId" :label="item.projectName" :value="item.projectId"> </el-option>
          </el-select>
          <el-select filterable multiple  size="small" v-model="messageForm.smsTemplateList" placeholder="短信模板" clearable @change="goSearch">
            <el-option v-for="item in messageTemplateList" :key="item.dictCode" :label="item.dictName" :value="item.dictName"></el-option>
          </el-select>
          <el-date-picker v-model="messageForm.sendTime" type="date" size="small" value-format="yyyy-MM-dd" placeholder="选择发送日期"  @change="goSearch">
          </el-date-picker>

        </div>
        <div class="searchRig">
          <el-button type="primary" size="small" @click="goSelectCompany">新建短信</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card box-margin">
      <div>
        <el-table :data="messageCompanyList" border fit highlight-current-row ref="messageCompanyList">
          <el-table-column align="center" label="短信模板">
            <template slot-scope="scope">
              <span>{{scope.row.smsTemplate}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="关联项目">
            <template slot-scope="scope">
              <span>{{scope.row.projectNames}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="发送日期">
            <template slot-scope="scope">
              <span>{{scope.row.sendTime | parseTime('{y}-{m}-{d}')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否定时发送">
            <template slot-scope="scope">
              <span v-if="scope.row.isTiming == 2" style="color: red;">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="发送人">
            <template slot-scope="scope">
              <span>{{scope.row.sendUserName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接收企业数">
            <template slot-scope="scope">
              <span>{{scope.row.companyNum}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="发送短信数">
            <template slot-scope="scope">
              <span>{{scope.row.smsSendNum}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <span class="spanButton" @click="openSendDetail(scope.row)">发送详情</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[15, 30, 60, 90]"
          :page-size="messageForm.pageSize"
          layout="prev, pager, next,sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog  title="短信发送详情"  :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <div>
        <el-input v-model="msgDetailForm.companyName" style="width: 20%;" @keyup.enter.native="handleSearch" placeholder="企业名称"> </el-input>
        <el-button class="filter-item bg_blue" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <div>
        <el-table :data="messageDetailList" border fit highlight-current-row ref="messageDetailList">
          <el-table-column align="center" label="企业名称">
            <template slot-scope="scope">
              <span>{{scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="160px" label="短信内容（该企业接收到多条时，只列出其中一条）">
            <template slot-scope="scope">
              <span>{{scope.row.smsContent}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="短信接收人">
            <template slot-scope="scope" >
              <span>{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接收号码">
            <template slot-scope="scope" >
              <span>{{scope.row.toMobile}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="定时发送时间">
            <template slot-scope="scope" >
              <span v-if="scope.row.isTiming == 2">{{scope.row.sendTime}}</span>
              <span v-else>非定时发送短信</span>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page.sync="currentPage1"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="msgDetailForm.pageSize"
          layout="prev, pager, next,sizes, jumper"
          :total="msgDetailTotal">
        </el-pagination>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {queryMsgSmsSendList,queryMsgSmsReceiveList} from '@/api/messageCenter'
  import {queryAll} from '@/api/projectManage'
  import { queryMsgSmsTemplateList } from '@/api/messageCenter'

  export default {
    data(){
      return{
        loading: false,
        currentPage: 1,
        currentPage1: 1,
        messageForm:{
          page:0,
          pageSize:15,
        },
        projectList:[],
        messageTemplateList:[],
        messageCompanyList:[],
        messageDetailList:[],
        msgDetailTotal:0,
        total:0,
        dialogVisible:false,
        allowGetRoleUserList: this.authorityControl('SYSTEM:CUSTOMER:MANAGE','SYSTEM:CUSTOMER:CENTER','SYSTEM:CUSTOMER:ROLE:USER:LIST'),//获取指定角色用户列表
        msgDetailForm:{
          page:0,
          pageSize:10
        },
        projectForm: {
          page: 0,
          pageSize:15
        }
      }
    },
    activated() {
      this.getSendList();
      this.getProjectList()
      this.getMessageTemplate()
      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.messageSendScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    directives: {
      loadMore: {
        bind(el, binding) {
          // 获取element-ui定义好的scroll盒子
          const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
          SELECTWRAP_DOM.addEventListener('scroll', function () {

            const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
            if (CONDITION) {
              binding.value()
            }
          })
        }
      }
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_MESSAGESEND_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_MESSAGESEND_PAGE', this.messageForm.page) //离开路由时把位置存起来
      next()
    },
    methods:{
      //获取项目列表
      getProjectList() {
        queryAll(this.projectForm).then(response => {
          if (response.code === 200) {
            if (this.projectForm.page > 0) {
              this.projectList = this.projectList.concat(response.data.data)
            } else {
              this.projectList = response.data.data
            }
          }
        })
      },
      //获取更多
      loadMore() {
        this.projectForm.page = this.projectForm.page + 15
        this.getProjectList()
      },
      // 远程搜索
      projectListMethod(query) {
        this.projectForm.page = 0
        this.projectForm.projectName = query
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.getProjectList(query)
        }, 200)
      },

      //获取短信模板列表
      getMessageTemplate(){
        queryMsgSmsTemplateList().then(res=>{
          if(res.code === 200){
            this.messageTemplateList = res.data
          }
        })
      },

      // 搜索
      goSearch(){
        this.messageForm.page = 0
        this.messageForm.pageSize = 15
        this.getSendList();
      },
      //获取短信发送记录列表
      getSendList(){
        queryMsgSmsSendList(this.messageForm).then(res=>{
          if(res.code === 200){
            this.messageCompanyList = res.data.data;
            this.total = res.data.total
          }
        })
      },

      // 分页相关
      handleCurrentChange(val) {
        this.messageForm.page = (val - 1) * this.messageForm.pageSize
        this.getSendList()
      },
      handleSizeChange(val) {
        this.messageForm.pageSize = val
        this.getSendList()
      },

      //获取信息详情
      getMsgDetailList(){
        queryMsgSmsReceiveList(this.msgDetailForm).then(res=>{
          if(res.code === 200){
            this.messageDetailList = res.data.data;
            this.msgDetailTotal = res.data.total;
          }
        })
      },

      // 详情搜索
      handleSearch() {
        this.msgDetailForm.page = 0
        this.getMsgDetailList()
      },

      //信息详情分页
      handleSizeChange1(val) {
        this.msgDetailForm.pageSize = val
        this.getMsgDetailList();
      },
      handleCurrentChange1(val) {
        this.msgDetailForm.page = (val - 1) * this.msgDetailForm.pageSize
        this.getMsgDetailList()
      },

      //选择发送企业
      goSelectCompany(){
        this.$router.push({
          path: '/customer/messageMassSend/addNewMessage',
        })
      },

      //发送详情
      openSendDetail(data){
        this.dialogVisible = true;
        this.msgDetailForm = {}
        this.msgDetailForm.page = 0;
        this.msgDetailForm.pageSize = 10;
        this.msgDetailForm.smsTemplate = data.smsTemplate;
        this.msgDetailForm.sendTime = data.sendTime;
        this.msgDetailForm.projectIds = data.projectIds;
        this.msgDetailForm.userId = data.userId;
        this.getMsgDetailList();
      },
      handleClose(){
        this.dialogVisible = false;
      },

      //跳转到企业信息
      goCompanyDatail(data) {
        this.$router.push({'path': '/customer/editCustomer', 'query': {'id': data.companyId, 'check': true}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .searchCont{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .searchLeft{
      display: flex;
    }
  }

  /deep/ .el-input{
    width:auto;
    margin-right: 10px;
  }

  // 修改列表页面表格样式
  /deep/ .el-table {
    border: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table th.gutter {
    display: table-cell !important;
  }

  /deep/ .el-table--border th,
  /deep/ .el-table th {
    background: #2CB1F5 !important;
    color: #fff;
    font-weight: 400;
    border-right: 1px solid rgba(220, 223, 230, 0.21);
    padding: 7px 0;
  }

  /deep/ .el-table__row:nth-child(even) {
    background: rgb(235, 248, 255) !important;
    border: 1px solid rgba(0, 141, 214, 0.26666666666666666);
  }

  /deep/ .el-table--border td {
    border: none;
    box-sizing: border-box;
  }

  /deep/ .el-table--border td:first-child {
    border-right: rgb(217, 242, 255) 1px solid !important;
  }

  /deep/ .el-table--border td:last-child {
    border-left: rgb(217, 242, 255) 1px solid !important;
  }


  // 弹出框样式设计
  /deep/ .el-dialog__header {
    background: #05AAFF;
    padding:20px;
    margin-bottom: 20px;
    /deep/ .el-dialog__title {
      color:#fff;
      font-size: 16px;
    }
    /deep/ .el-dialog__headerbtn {
      border-radius: 50%;
      background: #fff;
      padding: 4px;
      font-size: 12px;
      font-weight: 400;
      /deep/ .el-dialog__close {
        color:#05AAFF;
      }
    }
  }
  /deep/ .el-dialog__footer {
    text-align: center;
    /deep/ .el-button {
      border-radius: 2px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
    }
  }


  .spanButton {
    color: #05AAFF;
  }

  .shu {
    margin: 0 10px;
    color: #ccc;
  }

  .col_red {
    color: #FF6B6B !important;
  }

  .col_red:hover {
    opacity: 0.5;
  }

  .col_skyblue {
    color: #05AAFF !important;
  }

  .col_skyblue:hover {
    opacity: 0.5;
  }

  .colUpDown {
    color: #FD903C !important;
  }

  .colUpDown:hover {
    opacity: 0.5;
  }

  /deep/ .el-select{
    margin-right: 10px;
  }

  .headerTop{
    display: flex;
  }

  .noMore{
    text-align: center;
    font-size:14px;
    padding:10px 0;
    cursor: pointer;
  }

  .el-pagination{
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
  }

  .el-pagination__jump{
    margin-left: 0;
  }

</style>
