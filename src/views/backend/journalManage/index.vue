<template>
  <div class="app-container">
    <el-card class="box-card box-margin">


      <div slot="header" class="clearfix headerTop" v-if="activeName != 3">
        <el-select size="small" multiple v-model="deptIds" placeholder="选择部门" clearable style="margin-right:10px"
                   @change="deptmentChange">
          <el-option
            v-for="item in deptmentList"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId">
          </el-option>
        </el-select>
        <el-select size='small' multiple v-model="userIds" placeholder="用户名称" filterable clearable style="margin-right:10px">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId">
          </el-option>
        </el-select>
        <el-date-picker
          size="small"
          v-model="dateTime"
          @change="handleDateFilter"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" size="small" style="margin-left: 10px;" @click="checkRecord">查询</el-button>
        <el-button type="primary" size="small" style="margin-left: 10px;" @click="getStatData">统计</el-button>
        <el-button type="primary" size="small" style="margin-left: 10px;" @click="getRankData">排名</el-button>
      </div>

      <div slot="header" class="clearfix headerTop" v-else>

 

        <el-input
          placeholder="异常信息"
          v-model="query.message"
          style="margin-right:10px"
          clearable>
          
        </el-input>

        <el-date-picker
          size="small"
          v-model="dateTime"
          @change="handleDateFilter"
          unlink-panels
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="margin-right:10px"
          >
        </el-date-picker>


        <el-select size='small' v-model="query.isProcess" placeholder="是否处理" filterable clearable >
          <el-option
            v-for="item in fromIsProcess"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button type="primary" size="small" style="margin-left: 10px;" @click="checkRecord">查询</el-button> 
      </div>


      <div class="materielTable">
        <el-tabs v-model="activeName" @tab-click="handleClick">
      
          <el-tab-pane v-for="item in tabList" :label="item.label" :name="item.name" :key="item.name">


            <div v-if="activeName == 1">
              <div v-if="statDateShow == 1">
                <el-table :data="item.dataList" v-loading="listLoading" border fit highlight-current-row
                          @sort-change="handleSortChange">
                  <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                  <el-table-column align="center" label="用户名称" prop="userName">
                    <template slot-scope="scope">
                      <span>{{scope.row.userName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="登录时间" sortable="custom" prop="loginTime">
                    <template slot-scope="scope">
                      <span>{{scope.row.loginTime}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="使用的操作系统" prop="loginOs">
                    <template slot-scope="scope">
                      <span>{{scope.row.loginOs}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="登录时的IP" prop="loginIp">
                    <template slot-scope="scope">
                      <span>{{scope.row.loginIp}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="使用的浏览器" prop="loginBrowser">
                    <template slot-scope="scope">
                      <span>{{scope.row.loginBrowser}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="日志信息" prop="loginMsg">
                    <template slot-scope="scope">
                      <span>{{scope.row.loginMsg}}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination-container">
                  <div class="totalText">
                    <span>总数：{{ total }}</span>
                    <span>总页数:{{ Math.ceil(total / pageSize) || Math.ceil(total / 10) }}</span>
                    <span>当前页：{{ page || 1 }}</span>
                  </div>
                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                 :current-page="page" :page-sizes="[10,20,30, 50]"
                                 :page-size="pageSize"
                                 layout="prev, pager, next, sizes, jumper" :total="total">
                  </el-pagination>
                </div>
              </div>
              <el-table v-if="statDateShow == 2" :data="item.statList" v-loading="listLoading" border fit highlight-current-row>
                <el-table-column label="用户名称" align="center" width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" :label="list" v-for="(list,index) in dateList" :key="index" min-width="120">
                  <template slot-scope="scope">
                    <p v-for="(str,d) in scope.row.loginNum" v-if="index == d">
                      <span>{{str}}</span>
                    </p>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="statDateShow == 3">
                <el-table :data="loginRankList" v-loading="listLoading" border fit highlight-current-row>
                  <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                  <el-table-column align="center" label="用户名称" prop="userName">
                    <template slot-scope="scope">
                      <span>{{scope.row.userName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="部门名称" prop="deptName">
                    <template slot-scope="scope">
                      <span>{{scope.row.deptName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="登录/登出总次数" prop="operNum">
                    <template slot-scope="scope">
                      <span>{{scope.row.operNum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="登录次数" prop="loginNum">
                    <template slot-scope="scope">
                      <span>{{scope.row.loginNum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="登出次数" prop="loginOutNum">
                    <template slot-scope="scope">
                      <span>{{scope.row.loginOutNum}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div v-if="activeName == 2">
              <div v-if="statDateShow == 1">
                <el-table :data="item.dataList" v-loading="listLoading" border fit highlight-current-row
                          @sort-change="handleSortChange">
                  <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                  <el-table-column align="center" label="用户名称" prop="userName">
                    <template slot-scope="scope">
                      <span>{{scope.row.userName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作标题" prop="operTitle">
                    <template slot-scope="scope">
                      <span>{{scope.row.operTitle}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作类型" prop="operType">
                    <template slot-scope="scope">
                      <span>{{scope.row.operType == 'ADD' ? '新增' : scope.row.operType == 'EDIT' ? '修改' : scope.row.operType == 'DELETE' ? '删除' : scope.row.operType == 'QUERY' ? '读取' : ''}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作IP" prop="operIp">
                    <template slot-scope="scope">
                      <span>{{scope.row.operIp}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作日志时间" sortable="custom" prop="operLogTime">
                    <template slot-scope="scope">
                      <span>{{scope.row.operLogTime}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作结果信息" prop="operMsg">
                    <template slot-scope="scope">
                      <span>{{scope.row.operMsg}}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination-container">
                  <div class="totalText">
                    <span>总数：{{ total }}</span>
                    <span>总页数:{{ Math.ceil(total / pageSize) || Math.ceil(total / 10) }}</span>
                    <span>当前页：{{ page || 1 }}</span>
                  </div>
                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                 :current-page="page" :page-sizes="[10,20,30, 50]"
                                 :page-size="pageSize"
                                 layout="prev, pager, next, sizes, jumper" :total="total">
                  </el-pagination>
                </div>
              </div>
              <el-table v-if="statDateShow == 2" :data="item.statList" v-loading="listLoading" border fit highlight-current-row>
                <el-table-column label="用户名称" align="center" width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" :label="list" v-for="(list,index) in dateList" :key="index" min-width="120">
                  <template slot-scope="scope">
                    <p v-for="(str,d) in scope.row.addOperCount" v-if="index == d">
                      <span>新增操作次数:{{str}}</span>
                    </p>
                    <p v-for="(str,c) in scope.row.delOperCount" v-if="index == c">
                      <span>删除操作次数:{{str}}</span>
                    </p>
                    <p v-for="(str,a) in scope.row.editOperCount" v-if="index == a">
                      <span>编辑操作次数:{{str}}</span>
                    </p>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="statDateShow == 3">
                <el-table :data="operRankList" v-loading="listLoading" border fit highlight-current-row>
                  <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                  <el-table-column align="center" label="用户名称" prop="userName">
                    <template slot-scope="scope">
                      <span>{{scope.row.userName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="部门名称" prop="deptName">
                    <template slot-scope="scope">
                      <span>{{scope.row.deptName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作总次数" prop="operNum">
                    <template slot-scope="scope">
                      <span>{{scope.row.operNum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="新增次数" prop="addNum">
                    <template slot-scope="scope">
                      <span>{{scope.row.addNum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="修改次数" prop="editNum">
                    <template slot-scope="scope">
                      <span>{{scope.row.editNum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="删除次数" prop="deleteNum">
                    <template slot-scope="scope">
                      <span>{{scope.row.deleteNum}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

            <div v-if="activeName == 3">
 
                <el-table :data="item.dataList" v-loading="listLoading" border fit highlight-current-row
                          @sort-change="handleSortChange">
                  <el-table-column label="序号" align="center" type="index" width="60"></el-table-column>
                  <el-table-column align="center" label="服务名称" prop="appName">
                    <template slot-scope="scope">
                      <span>{{scope.row.appName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="类" prop="callerClass">
                    <template slot-scope="scope">
                      <span>{{scope.row.callerClass}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="文件名" prop="callerFilename">
                    <template slot-scope="scope">
                      <span>{{scope.row.callerFilename}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="行数" prop="callerLine" width="60">
                    <template slot-scope="scope">
                      <span>{{scope.row.callerLine}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="方法" prop="callerMethod"  width="60">
                    <template slot-scope="scope">
                      <span>{{scope.row.callerMethod}}</span>
                    </template>
                  </el-table-column> 
                  <!-- <el-table-column align="center" label="编码" prop="code">
                    <template slot-scope="scope">
                      <span>{{scope.row.code}}</span>
                    </template>
                  </el-table-column>  -->


                  <el-table-column align="center" label="创建时间	" prop="createTime">
                    <template slot-scope="scope">
                      <span>{{scope.row.createTime}}</span>
                    </template>
                  </el-table-column> 
                  <!-- <el-table-column align="center" label="删除" prop="isDelete">
                    <template slot-scope="scope">
                      <span>{{scope.row.isDelete}}</span>
                    </template>
                  </el-table-column>   -->

                  <el-table-column align="center" label="等级"  prop="levelString">
                    <template slot-scope="scope">
                      <span>{{scope.row.levelString}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="名称"   prop="loggerName">
                    <template slot-scope="scope">
                      <span>{{scope.row.loggerName}}</span>
                    </template>
                  </el-table-column> 
                  <el-table-column align="center" label="参考标志"   prop="referenceFlag">
                    <template slot-scope="scope">
                      <span>{{scope.row.referenceFlag}}</span>
                    </template>
                  </el-table-column>
                  <!-- 
                  <el-table-column align="center" label="主键id" sortable="custom" prop="id">
                    <template slot-scope="scope">
                      <span>{{scope.row.id}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="删除" sortable="custom" prop="isDelete">
                    <template slot-scope="scope">
                      <span>{{scope.row.isDelete}}</span>
                    </template>
                  </el-table-column> -->
                  <el-table-column align="center" label="线程名"  prop="threadName">
                    <template slot-scope="scope">
                      <span>{{scope.row.threadName}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="详情"   prop="message">
                    <template slot-scope="scope">
                      <span :title="scope.row.message">{{scope.row.message | ellipsis}} </span><br/>
                      <span @click="showMessage(scope.row.message)" class="handcursor" > 查看详细</span>
                    </template>
                  </el-table-column>


                  <el-table-column align="center" label="操作用户名称"  prop="operateUsername">
                    <template slot-scope="scope">
                      <span>{{scope.row.operateUsername}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column align="center" label="操作用户名称"  prop="isProcess">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isProcess==1">已处理</span>
                      <span v-else>未处理 </span>
                    </template>
                  </el-table-column>
 
                  <el-table-column align="center" label="处理时间"  prop="processDate">
                    <template slot-scope="scope">
                      <span>{{scope.row.processDate}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="处理备注"  prop="processRemark">
                    <template slot-scope="scope">
                      <span>{{scope.row.processRemark | ellipsis }}</span>
                      <span v-if="scope.row.processRemark"  @click="showMessage(scope.row.message)" class="handcursor" > 查看详细</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="处理人用户名称"  prop="processUserName">
                    <template slot-scope="scope">
                      <span>{{scope.row.processUserName}}</span>
                    </template>
                  </el-table-column>




    

                   <el-table-column align="center" label="我要处理"  prop="threadName" width="110px">
                    <template slot-scope="scope">
                      <span>  <el-button type="primary" size="small"   @click="DealWith(scope.row.id)">添加注备</el-button>   </span>
                    </template>
                  </el-table-column>


                </el-table>
                <div class="pagination-container">
                  <div class="totalText">
                    <span>总数：{{ total }}</span>
                    <span>总页数:{{ Math.ceil(total / pageSize) || Math.ceil(total / 10) }}</span>
                    <span>当前页：{{ page || 1 }}</span>
                  </div>
                  <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                 :current-page="page" :page-sizes="[10,20,30,50]"
                                 :page-size="pageSize"
                                 layout="prev, pager, next, sizes, jumper" :total="total">
                  </el-pagination>
                </div> 

            </div>

          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>


    <el-dialog title="我要处理" :visible.sync="dialogCodeLog" width="400px">


      <el-form :model="form" class="dialogForm">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="form.processRemark">
        </el-input>



        </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCodeLog = false">取 消</el-button>
        <el-button type="primary" @click="updateLog">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看详细信息" :visible.sync="ShowMessageData" width="900px">
      <div v-html="messageData"> </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ShowMessageData = false">取 消</el-button>
        <el-button type="primary" @click="ShowMessageData = false">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {queyryLoginLog, queyryOperLog,queryLoginLogCount,queryOperLogCount, queryLoginLogRank, queryOperLogRank,queryCodeLog,updateCodeLog} from '@/api/journalManage'
  // import {queryUserList} from '@/api/utils'
  import {queryUserComboInfo} from '@/api/customerCenter.js'
  import {getDepartmentTree} from '@/api/department.js'

  export default {
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: 10,
        journalList: [],
        userList: [],
        deptmentList: [],
        useList: [
          {label: '新增', value: 'ADD'},
          {label: '修改', value: 'EDIT'},
          {label: '删除', value: 'DELETE'},
          {label: '读取', value: 'QUERY'},
        ],
        query:{},
        fromIsProcess:[
          {label: '已处理', value: '0'},
          {label: '未处理', value: '1'},
        ],
        listLoading: false,
        activeName: '1',
        orderBy: '',
        orderType: 'desc',
        userIds: '',
        deptIds: '',
        operType: '',
        tabList: [
          {label: '登录日志', name: '1', dataList: [],statList:[]},
          {label: '操作日志', name: '2', dataList: [],statList:[]},
          {label: '异常日志', name: '3', dataList: [],statList:[]}
        ],
        dateList:[],
        operLogTimeStart: '',
        operLogTimeEnd: '',
        loginTimeStart: '',
        loginTimeEnd: '',
        createDateEnd:'',
        createDateStart:'',
        dateTime: '',
        statDateShow: 1,
        loginRankList: [],
        operRankList: [],
        dialogCodeLog: false,
        form:{},
        ShowMessageData:false,
        messageData:'',
        messageId:'',
      }
    },
    
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 20) {
          return value.slice(0,20) + '...'
        }
        return value
      }
    },

    activated() {
      this.getPersonList('');
      this.getCompanyList('');
      this.getLoginRecord();
    },
    methods: {


      checkRecord() {
        if (this.activeName == '1') {
          this.getLoginRecord()
        } 
        
        if (this.activeName == '2') {
          this.getOperRecord()
        }

        if (this.activeName == '3') {
          this.queryCode()
        }

      },


      //dialog 展示
      DealWith(id){
        this.messageId=id
        this.dialogCodeLog=true
      },
      //dialog 展示
      updateLog(){
        
        var params = { 
          id: this.messageId,
          processRemark: this.form.processRemark, 
        }  
        updateCodeLog(params).then(res => {
          if (res.code == 200) { 
            console.log(res.data ,"========获取错误日志=========>") 
            this.$message({  message:"提交成功"})
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
        this.messageId=''
        this.dialogCodeLog=false
      },


      //dialog 展示
      showMessage(data){
        this.ShowMessageData=true
        // this.messageData=data;
        this.messageData = data.replace(/\)/g, ')<br/>');
        this.messageData = this.messageData.replace(/\。/g, '。<br/>');
        console.log(this.messageData)
      },



      //获取错误日志
      queryCode() {
        // this.statDateShow = 1;
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          // total: this.total,
          // userIds: this.userIds,
          // orderBy: this.orderBy,
          orderType: this.orderType,
          // loginTimeStart: this.loginTimeStart,
          // loginTimeEnd: this.loginTimeEnd,
          // deptIds: this.deptIds,


          createDateEnd: this.query.createDateEnd,
          createDateStart: this.query.createDateStart,
          message:this.query.message,
          isProcess:this.query.isProcess, 
        }

        queryCodeLog(params).then(res => {
          if (res.code == 200) {
            this.tabList[2].dataList = res.data.data; 
            console.log(res.data.data ,"========获取错误日志=========>")
            this.page = res.data.pageNum
            this.pageSize = res.data.pageSize
            this.total = res.data.total
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //获取登录日志
      getLoginRecord() {
        this.statDateShow = 1;
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          total: this.total,
          userIds: this.userIds,
          orderBy: this.orderBy,
          orderType: this.orderType,
          loginTimeStart: this.loginTimeStart,
          loginTimeEnd: this.loginTimeEnd,
          deptIds: this.deptIds,
        }
        queyryLoginLog(params).then(res => {
          if (res.code == 200) {
            this.tabList[0].dataList = res.data.data;
            this.total = Number(res.data.total)
            this.page = res.data.pageNum
            this.pageSize = res.data.pageSize
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //获取操作日志
      getOperRecord() {
        this.statDateShow = 1;
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          total: this.total,
          userIds: this.userIds,
          deptIds: this.deptIds,
          orderBy: this.orderBy,
          orderType: this.orderType,
          operType: this.operType,
          createDateEnd: this.operLogTimeStart,
          createDateStart: this.operLogTimeEnd,
        }
        queyryOperLog(params).then(res => {
          if (res.code == 200) {
            this.tabList[1].dataList = res.data.data;
            this.total = Number(res.data.total)
            this.page = res.data.pageNum
            this.pageSize = res.data.pageSize;
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //获取操作日志
      getOperRecord() {
        this.statDateShow = 1;
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          total: this.total,
          userIds: this.userIds,
          deptIds: this.deptIds,
          orderBy: this.orderBy,
          orderType: this.orderType,
          operType: this.operType,
          operLogTimeStart: this.operLogTimeStart,
          operLogTimeEnd: this.operLogTimeEnd,
        }
        queyryOperLog(params).then(res => {
          if (res.code == 200) {
            this.tabList[1].dataList = res.data.data;
            this.total = Number(res.data.total)
            this.page = res.data.pageNum
            this.pageSize = res.data.pageSize;
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //选择部门
      deptmentChange(val) {
        this.getPersonList('',val)
      },

      // 获取左侧公司部门列表
      getCompanyList() {
        getDepartmentTree({}).then(res => {
          if (res.code == 200) {
            this.deptmentList = res.data.deptInfoTreeVos;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      //根据角色获取人员列表
      getPersonList(name, deptIds) {
        let formData = new FormData;
        formData.append('roleNameList', name)
        if (deptIds != undefined) {
          formData.append('deptIdList', deptIds)
        }
        queryUserComboInfo(formData).then(res => {
          if (res.code == 200) {
            this.userList = res.data;
          } else {
            this.$message.warning(res.message)
          }
        })
      },

      // 处理节点设置日期筛选
      handleDateFilter(date) {
        if(date != null){
          this.loginTimeStart = date[0] + ' ' + '00:00:00';
          this.loginTimeEnd = date[1] + ' ' + '23:59:59';
          this.operLogTimeStart = date[0] + ' ' + '00:00:00';
          this.operLogTimeEnd = date[1] + ' ' + '23:59:59';
          this.query.createDateStart = date[0] ;
          this.query.createDateEnd = date[1]; 
          // this.query.createDateEnd = date[0] + ' ' + '00:00:00';
          // this.query.createDateStart = date[1] + ' ' + '23:59:59';
        }else{
          this.loginTimeStart =  '';
          this.loginTimeEnd =  '';
          this.operLogTimeStart =  '';
          this.operLogTimeEnd =  '';
          this.query.createDateEnd =  '';
          this.query.createDateStart =  '';
        }
      },

      handleClick(tab, event) {
        this.page = 1;
        this.pageSize = 10;
        if (tab.name == '1') {
          if (this.statDateShow == 1) {
            this.getLoginRecord();
          } else if (this.statDateShow == 2) {
            this.getStatData()
          } else {
            this.getRankData()
          }
        } 
        
        if (tab.name == '2') {
          if (this.statDateShow == 1) {
            this.getOperRecord();
          } else if (this.statDateShow == 2) {
            this.getStatData()
          } else {
            this.getRankData()
          }
        }

        
        if (tab.name == '3') { 
            this.queryCode(); 
        }


      },

      // 排序
      handleSortChange(column) {
        this.orderBy = column.prop;
        if (column.order === 'ascending') {
          this.orderType = 'asc'
        }else {
          this.orderType = 'desc'
        }

        if (this.activeName == '1') {
          this.getLoginRecord();
        } else {
          this.getOperRecord();
        }
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        if (this.activeName == '1') {
          this.getLoginRecord();
        } 
        
        if (this.activeName == '2') {
          this.getOperRecord();
        }

        if (this.activeName == '3') {
          this.queryCode();
        }


      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.page = val
        if (this.activeName == '1') {
          this.getLoginRecord();}
        if (this.activeName == '2') {
          this.getOperRecord();
        }
        if (this.activeName == '3') {
          this.queryCode();
        }


      },

      //获取统计数据
      getStatData(){
        this.statDateShow = 2;
        if (this.activeName == '1') {
          var params = {
            page: this.page,
            pageSize: this.pageSize,
            userIds: this.userIds,
            // orderBy: this.orderBy,
            orderType: this.orderType,
            deptIds: this.deptIds,
            loginTimeStart: this.loginTimeStart,
            loginTimeEnd: this.loginTimeEnd,
          }
          queryLoginLogCount(params).then(res=>{
            if (res.code == 200) {
              this.dateList = res.data.dateList;
              let list = [];
              res.data.userStatisticsList.forEach(item=>{
                let data = {
                  userName:item.userName,
                  userId: item.userId,
                  loginNum: []
                };
                item.dateStatisticsList.forEach((str,index)=>{
                  data.loginNum.push(str.dateStatistics);
                  // data['label'+index] = str.dateStatistics;
                  list.push(data)
                })
              })

              let obj = {}
              list = list.reduce((cur, next) => {
                obj[next.userId] ? '' : obj[next.userId] = true && cur.push(next)
                return cur
              }, [])

              this.tabList[0].statList = list;
            } else {
              this.$message({type: 'error', message: res.message})
            }
          })
        } else {
          var params = {
            page: this.page,
            pageSize: this.pageSize,
            userIds: this.userIds,
            // orderBy: this.orderBy,
            orderType: this.orderType,
            deptIds: this.deptIds,
            operType: this.operType,
            operLogTimeStart: this.operLogTimeStart,
            operLogTimeEnd: this.operLogTimeEnd,
          }
          queryOperLogCount(params).then(res=>{
            if (res.code == 200) {
              this.dateList = res.data.dateList;
              let list = [];
              res.data.userStatisticsList.forEach(item=>{
                let data = {
                  userName:item.userName,
                  userId: item.userId,
                  addOperCount: [],
                  delOperCount: [],
                  editOperCount: []
                };
                item.dateOperStatisticsList.forEach((str,index)=>{
                  data.addOperCount.push(str.addOperCount);
                  data.delOperCount.push(str.delOperCount);
                  data.editOperCount.push(str.editOperCount);
                  // data['label'+index] = str.dateStatistics;
                  list.push(data)
                })
              })

              let obj = {}
              list = list.reduce((cur, next) => {
                obj[next.userId] ? '' : obj[next.userId] = true && cur.push(next)
                return cur
              }, [])

              this.tabList[1].statList = list;
            } else {
              this.$message({type: 'error', message: res.message})
            }
          })
        }
      },

      // 获取排名数据
      getRankData() {
        this.statDateShow = 3
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          userIds: this.userIds,
          orderType: this.orderType,
          deptIds: this.deptIds
        }
        if (this.activeName == '1') {
          params.loginTimeStart = this.loginTimeStart
          params.loginTimeEnd = this.loginTimeEnd
          queryLoginLogRank(params).then(res => {
            if(res.code === 200) {
              this.loginRankList = res.data
            }
          })
        } else {
          params.operType = this.operType
          params.operLogTimeStart = this.operLogTimeStart
          params.operLogTimeEnd = this.operLogTimeEnd
          queryOperLogRank(params).then(res => {
            if(res.code === 200) {
              this.operRankList = res.data
            }
          })
        }
      }

    }
  }
</script>

<style lang="less" scoped>
  .handcursor{
    cursor:pointer
  }
  /deep/.el-dialog__body{
    padding: 10px 20px 30px 20px;
  }
  .dialogForm{
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    // width: 500px;
  }
  .w300{
    width: 350px !important;
    margin-right: 30px;
    margin-bottom: 10px;
  }
  /deep/ .clearfix:after {
    display: none;
  }

  /deep/ .el-input {
    width: auto;
  }

  .headerTop {
    display: flex;
    /*justify-content: space-between;*/
  }

  .headerLeft {
    .searchInput {
      margin-right: 10px;
    }
  }

  .headerRig {
    .choose {
      margin-right: 22px;
    }
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

  // 分页样式
  /deep/ .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  /deep/ .el-pagination__total {
    flex: 1
  }

  .totalText {
    font-size: 14px;
    font-family: 'PingFang SC';
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
  }

  .totalText span {
    margin-right: 20px;
  }

  /deep/ .el-pagination.is-background .btn-next,
  /deep/ .el-pagination.is-background .btn-prev,
  /deep/ .el-pagination.is-background .el-pager li {
    background: none;
    border: #D5D5D5 1px solid;
    color: #8B8B8B;
    font-size: 12px;
    font-weight: normal;
  }

  /deep/ .el-pagination.is-background .el-pager li.active {
    background: #05AAFF;
    color: #fff;
    border: #05AAFF 1px solid;
  }

  /deep/ .el-card.is-always-shadow,
  /deep/ .el-card.is-hover-shadow:focus,
  /deep/ .el-card.is-hover-shadow:hover {
    box-shadow: 0px 2px 6px rgba(68, 68, 68, 0.1) !important;
  }

  /deep/ .el-table .sort-caret.ascending {
    border-bottom-color: #fff;
  }

  /deep/ .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #409EFF !important;
  }

  /deep/ .el-table .descending .sort-caret.descending {
    border-top-color: #409EFF !important;
  }

  /deep/ .el-table .sort-caret.descending {
    border-top-color: #fff;
  }

  /deep/ .el-table .cell {
    /*text-align: left;*/
  }

  /deep/ .el-table .el-table__expand-icon {
    display: none;
  }
</style>
