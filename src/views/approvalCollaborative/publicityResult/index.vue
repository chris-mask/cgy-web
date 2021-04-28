<!--公示-->
<template>
  <div class="app-container">
    <div class="row-width-auto-margin-0-90">
      <el-card class="box-card">
        <div class="searchCont">
          <el-input clearable v-model="resultForm.projectName" placeholder="请输入公示标题" @keyup.enter.native="goSearch"></el-input>
          <el-button type="primary" class="btn bt_blue" @click="goSearch"><span class="bt_font">搜一下</span></el-button>
          <el-button type="primary" class="btn bt_blue addBtn" @click="goAddResult" v-if="allowAdd.twoAllow"><span class="bt_font">新增</span></el-button>
          <el-button type="primary" class="btn bt_blue addBtn" @click="getResult"><span class="bt_font">获取公示结果</span></el-button>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span class="conditionChoose">已选条件:</span>
            <div class="conditionList">
              <div class="conditionBox" v-for="(value, key) in selectConditionsList">
                {{value}}<img class="hoverCursor" @click="deleteOneClick(key)" src="../../icons/enterprise/close_con.png" />
              </div>
              <div class="conditionClear" @click="deleteAllClick" v-if="Object.keys(selectConditionsList).length > 1">
                清空所有
              </div>
            </div>
          </div>
          <div class="headerRig conditRig" @click="openCond">
            <img v-if="moreCondition" src="../../icons/enterprise/close_icon.png" style="vertical-align:middle;"/>
            <img v-else src="../../icons/enterprise/open_icon.png" style="vertical-align:middle;"/>
            <span>选择筛选条件</span>
          </div>
        </div>
        <div class="conditionCont" v-if="moreCondition">
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>时间：</span>
                <el-date-picker
                  clearable
                  size="small"
                  @change="yearChange"
                  v-model="resultForm.projectYear"
                  type="year"
                  value-format="yyyy"
                  placeholder="年份">
                </el-date-picker>
                <el-date-picker
                  clearable
                  size="small"
                  @change="publicDateChange"
                  v-model="resultForm.publicityDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="公示开始时间">
                </el-date-picker>
                <el-date-picker
                  clearable
                  size="small"
                  @change="endDateChange"
                  v-model="resultForm.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="公示结束时间">
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>公示状态：</span>
                <el-radio-group v-model="resultForm.publicityState" @change="stateChange">
                  <el-radio :label="0">公示中</el-radio>
                  <el-radio :label="1">已结束</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div class="conditionBox">
                <span>主管部门：</span>
                <el-radio-group v-model="resultForm.publicityOrgan" @change="publicityOrganChange">
                  <el-radio label="佛山市市场监督管理局">佛山市市场监督管理局</el-radio>
                  <el-radio label="市供销合作社">市供销合作社</el-radio>
                  <el-radio label="佛山市委宣传部">佛山市委宣传部</el-radio>
                  <el-radio label="佛山市科学技术局">佛山市科学技术局</el-radio>
                  <el-radio label="佛山市工业和信息化局">佛山市工业和信息化局</el-radio>
                  <el-radio label="佛山市商务局">佛山市商务局</el-radio>
                  <el-radio label="佛山市人力资源和社会保障局">佛山市人力资源和社会保障局</el-radio>
                  <el-radio label="佛山市文化广电旅游体育局">佛山市文化广电旅游体育局</el-radio>
                  <el-radio label="佛山市应急管理局">佛山市应急管理局</el-radio>
                  <el-radio label="佛山市金融工作局">佛山市金融工作局</el-radio>
                  <el-radio label="佛山高新技术产业开发区管理委员会">佛山高新技术产业开发区管理委员会</el-radio>
                  <el-radio label="佛山市交通运输局">佛山市交通运输局</el-radio>
                  <el-radio label="佛山市发展改革局">佛山市发展改革局</el-radio>
                  <el-radio label="佛山市残疾人联合会">佛山市残疾人联合会</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card cardCont">
        <div slot="header" class="headerTop">
          <div class="headerLeft">
            <span>搜索到<span>{{total}}</span>条记录</span>
            <span style="margin-left: 10px;" v-if="publicityCheckList.length > 0">已选中<span>{{publicityCheckList.length}}</span>条记录</span>
            <div class="headBtn">
              <el-button type="primary" class="btn allChoose" size="small" @click="allSelect">全选</el-button>
              <el-button type="danger" class="btn allDelete" size="small" @click="deleteSelect" v-if="allowDelete.twoAllow">删除</el-button>
              <el-button type="primary" class="btn allChoose" size="small" @click="exportPublicity" v-if="allowExport.twoAllow">导出</el-button>
            </div>
          </div>
          <div class="headerRig">
            <el-select v-model="sort" placeholder="默认排序" @change="handledSelect" clearable>
              <el-option
                v-for="(item,index) in sortList"
                :key="index"
                :label="item.label"
                :value="index">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="dataList">
          <el-checkbox-group v-model="publicityCheckList">
            <div class="dataBox" v-for="(item,index) in resultList">
              <div class="dataBoxLeft">
                <el-checkbox :label="item.publicityId">
                  <div class="dataLeft">
                    <div class="fileType " :class="item.publicityState == 0 ? 'fileDoc' : 'filePpt'">{{item.publicityState == 0 ? '公示中': '已结束'}}</div>
                    <div class="dataDetail">
                      <p @click="goDetail(item.publicityId)" :title="item.projectName">{{item.projectName}}</p>
                      <div class="dataMsg">
                        <span>年份：{{item.projectYear}}</span>
                        <span :title="item.publicityOrgan">主管部门：{{item.publicityOrgan}}</span>
                        <span>公示状态：{{item.publicityState == 0 ? '公示中': '公示结束'}}</span>
                      </div>
                      <div class="dataMsg">
                        <span>公示开始时间：{{item.publicityDate}}</span>
                        <span>公示结束时间：{{item.endDate}}</span>
                        <span>原文链接：{{item.sourceUrl}}</span>
                      </div>
                      <div class="dataMsg">
                        <span>地区：{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.townName}}</span>
                      </div>
                    </div>
                  </div>
                </el-checkbox>
              </div>
              <div class="dataBoxRig">
                <div class="btnMt"><el-button type="primary" size="small" @click="goDetail(item.publicityId)" v-if="allowDetail.twoAllow">查看</el-button></div>
                <div class="btnMt"><el-button class="origin" size="small" @click="goEdit(item.publicityId)" v-if="allowUpdate.twoAllow">编辑</el-button></div>
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <div class="noMore" style="cursor:pointer;" v-if="total - resultList.length > 0" @click="getMore">
          点击加载更多
        </div>
        <div class="noMore" v-else>
          没有更多
        </div>
      </el-card>

      <!--置顶-->
      <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;">
        <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
          <img src="../../icons/enterprise/back_top.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {findApprovalPublicity,deleteApprovalPublicity,exportApprovalPublicity, gainApprovalPublicity} from '@/api/publicityResult'
  import {downloadPolicy} from '@/api/utils'
  export default {
    data(){
      return{
        btnFlag: 0,
        moreCondition:false,
        checkList:[],
        publicityCheckList:[],
        department:'',
        resultList:[],
        resultForm:{
          page:0,
          pageSize: 20,
          orderType:'',
          orderField:'',
        },
        total:0,
        sortList:[
          {label:'年份顺序',value:'pap.projectYear',type:'ASC'},
          {label:'年份倒序',value:'pap.projectYear',type:'DESC'},
          {label:'公开开始时间顺序',value:'pap.publicityDate',type:'ASC'},
          {label:'公开开始时间倒序',value:'pap.publicityDate',type:'DESC'},
          {label:'公开结束时间顺序',value:'pap.endDate',type:'ASC'},
          {label:'公开结束时间倒序',value:'pap.endDate',type:'DESC'},
          {label:'公开状态顺序',value:'pap.publicityState',type:'ASC'},
          {label:'公开状态倒序',value:'pap.publicityState',type:'DESC'},
        ],
        sort:'',
        isCheckAll:false,
        selectConditionsList:{},

        allowAdd: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:INSERT'),//新增立项公示信息
        allowUpdate: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:UPDATE'),//编辑立项公示信息
        allowGetList: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:LIST'),//查询立项公示列表
        allowDelete: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:DELETE'),//删除立项公示
        allowDetail: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:DETAILS'),//获取立项公示结果
        allowExport: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:EXPORT'),//导出立项公示结果
        allowUpload: this.authorityControl('SYSTEM:COLLABORATION:SYNERGY','SYSTEM:PUBLIC:RESULT','SYSTEM:PUBLIC:RESULT:UPLOAD'),//补充文件上传
      }
    },
    activated() {
      window.addEventListener('scroll', this.scrollToTop);
      if(this.$store.getters.publicityResultPage != 0){
        this.resultForm.page = 0;
        this.resultForm.pageSize = this.$store.getters.publicityResultPage + 20;
        this.getPublicList();
      }else{
        this.resultForm.page = this.$store.getters.publicityResultPage;
        this.resultForm.pageSize = 20;
        this.getPublicList();
      }

      //判断上一次在哪里离开回到指定位置
      this.$nextTick(function(){
        let position = this.$store.getters.publicityResultScroll //返回页面取出来
        // window.scroll(0, position)
        document.documentElement.scrollTop = document.body.scrollTop = position
      })
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    beforeRouteLeave(to, from, next){
      let position = document.documentElement.scrollTop
      this.$store.commit('SET_PUBLICITYRESULT_SCROLL', position) //离开路由时把位置存起来
      this.$store.commit('SET_PUBLICITYRESULT_PAGE', this.resultForm.page) //离开路由时把位置存起来
      next()
    },
    methods:{
      // 回到顶部
      backTop() {
        const that = this
        const timer = setInterval(() => {
          const ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop =
            that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop() {
        const that = this // 缓存当前this
        const scroll_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scroll_top
        if (that.scrollTop > 0) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },

      goSearch(){
        this.resultForm.page = 0;
        this.resultForm.pageSize = 20;
        this.getPublicList();
      },

      //获取列表
      getPublicList(){
        if(this.allowGetList.twoAllow){
          findApprovalPublicity(this.resultForm).then(res=>{
            if(res.code == 200){
              if(this.resultForm.page > 0){
                this.resultList = this.resultList.concat(res.data.data);
                this.total = res.data.total;
              }else{
                this.resultList = res.data.data;
                this.total = res.data.total;
                this.publicityCheckList = [];

                if(this.$store.getters.publicityResultPage != 0){
                  this.resultForm.page = this.$store.getters.publicityResultPage;
                  this.resultForm.pageSize = 20;
                }
              }

              let obj = {}
              this.resultList = this.resultList.reduce((cur, next) => {
                obj[next.publicityId] ? '' : obj[next.publicityId] = true && cur.push(next)
                return cur
              }, [])
            }else{
              this.$message.warning(res.message)
            }
          })
        }else{
          this.$message.warning('抱歉，您没有权限获取列表数据')
        }

      },

      //加载更多
      getMore(){
        this.resultForm.page = this.resultForm.page + 20;
        // this.resultForm.pageSize = this.resultForm.pageSize + 10;
        this.getPublicList();
      },

      //排序
      handledSelect(e){
        this.sortList.forEach((item,index)=>{
          if(index == e){
            this.resultForm.orderField = item.value;
            this.resultForm.orderType = item.type;
            this.resultForm.page = 0;
            this.resultForm.pageSize = 20;
          }
        })

        this.getPublicList();
      },

      //跳转新建公示
      goAddResult(){
        this.$router.push({
          path: '/approvalCollaborative/publicityResult/addPublic'
        })
      },

      //获取公示结果
      getResult(){
        this.$message.success('数据拉取已开始，请三分钟后刷新列表！')
        gainApprovalPublicity({}).then(res=>{
          if(res.code == 200){

          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //导出
      exportPublicity(){
        this.resultForm.page = 0;
        this.resultForm.pageSize = this.total;
        this.resultForm.publicityIdList = this.publicityCheckList;
        exportApprovalPublicity(this.resultForm).then(res=>{
          if(res.code == 200){
            var parData = {
              fileName: res.message,
              delete: true
            }
            downloadPolicy(parData).then(response => {
              this.resultForm.publicityIdList = [];
              const url = window.URL.createObjectURL(response)
              var a = document.createElement('a')
              document.body.appendChild(a)
              var date = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
              const fileName = date + '-公示结果列表' + '.xlsx'
              a.href = url
              a.download = fileName
              a.click()
              window.URL.revokeObjectURL(url)
            })
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //全选
      allSelect(){
        if (this.isCheckAll) {
          this.publicityCheckList = []
          this.isCheckAll = false
        } else {
          var _this = this
          this.resultList.forEach(function(item, index) {
            if (_this.publicityCheckList.indexOf(item.publicityId) === -1) {
              _this.publicityCheckList.push(item.publicityId)
            }
            _this.isCheckAll = true
          })
        }
      },

      //批量删除
      deleteSelect(){
        if(this.publicityCheckList.length == 0){
          this.$message.warning('请先勾选一条数据');
          return;
        }
        this.$confirm('是否确定删除公示', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.resultForm.publicityIdList = this.publicityCheckList;
          deleteApprovalPublicity(this.resultForm).then(res=>{
            if(res.code == 200){
              this.$message.success('删除成功');
              this.resultForm.projectName = '';
              this.resultForm.publicityIdList = [];
              this.resultForm.page = 0;
              this.getPublicList()
            }else{
              this.$message.warning(res.message)
            }
          })
        })
      },

      //跳转详情页
      goDetail(id){
        this.$router.push({
          path: '/approvalCollaborative/publicityResult/checkPublic',
          query:{
            publicityId: id,
            isShow: true
          }
        })
      },

      //编辑
      goEdit(id){
        this.$router.push({
          path: '/approvalCollaborative/publicityResult/addPublic',
          query:{
            publicityId: id,
          }
        })
      },

      //打开筛选框
      openCond(){
        this.moreCondition = !this.moreCondition;
      },

      /*
        * 筛选条件方法
       */
      //年份
      yearChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'projectYear', '年份 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'projectYear')
        }

        this.resultForm.page = 0
        this.resultForm.pageSize = 20
        this.getPublicList()
      },

      //公示开始时间
      publicDateChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'publicityDate', '公示开始时间 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'publicityDate')
        }

        this.resultForm.page = 0
        this.resultForm.pageSize = 20
        this.getPublicList()
      },

      //公示结束时间
      endDateChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'endDate', '公示结束时间 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'endDate')
        }

        this.resultForm.page = 0
        this.resultForm.pageSize = 20
        this.getPublicList()
      },

      //公示状态
      stateChange(val){
        if (val != undefined ) {
          if(val == 0){
            this.$set(this.selectConditionsList, 'publicityState', '公示状态 - 公示中')
          }else{
            this.$set(this.selectConditionsList, 'publicityState', '公示状态 - 已结束')
          }
        } else {
          this.$delete(this.selectConditionsList, 'publicityState')
        }

        this.resultForm.page = 0
        this.resultForm.pageSize = 20
        this.getPublicList()
      },

      publicityOrganChange(val){
        if (val) {
          this.$set(this.selectConditionsList, 'publicityOrgan', '主管部门 - ' + val)
        } else {
          this.$delete(this.selectConditionsList, 'publicityOrgan')
        }

        this.resultForm.page = 0
        this.resultForm.pageSize = 20
        this.getPublicList()
      },

      //清除全部条件
      deleteAllClick(){
        this.resultForm = {};
        this.selectConditionsList = {}
        this.resultForm.page = 0
        this.resultForm.pageSize = 20
        this.getPublicList()
      },

      //删除筛选调节
      deleteOneClick(item){
        this.$delete(this.selectConditionsList, item)
        this.$delete(this.resultForm, item)
        this.resultForm.page = 0
        this.resultForm.pageSize = 20
        this.getPublicList()
      },
    }
  }
</script>

<style lang="less" scoped>
  .row-width-auto-margin-0-90 {
    width: auto;
    margin: auto 4%;
  }

  /deep/ .el-card{
    overflow: inherit;
  }

  .searchCont {
    display: flex;
    justify-content: center;
    max-width: 740px;
    margin: 0 auto;

    /deep/ .el-input__inner {
      height: 100%;
      border-radius: 0;
      border: 1px solid #05AAFF;
    }

    .el-input {
      flex: 1;
    }

    .btn {
      border: 0;
      border-radius: 0;
    }

    .addBtn {
      margin-left: 20px;
    }

    .el-button {
      width: 120px;
    }
  }

  .hotSearch{
    display: flex;
    align-items: center;
    max-width: 740px;
    margin: 0 auto;
    p{
      font-size:12px;
      color:#042B40;
    }
    span{
      font-size:12px;
      color:#979797;
      margin-right: 18px;
    }
  }

  .box-card {
    margin-bottom: 14px;
  }

  .bt_blue {
    width: 120px;
    height: 48px;
    background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);
    opacity: 1;
    border-radius: 2px;
  }

  /deep/ .el-card__header {
    padding: 10px 20px;
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
  }

  .headerLeft {
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      color: rgba(68, 68, 68, 0.75);

      span {
        color: #F56C6C;
      }
    }

    .headBtn {
      margin-left: 40px;
      font-size: 14px;
      .allChoose {
        padding: 6px 8px;
        color: #05AAFF;
        border: 1px solid #05AAFF;
        background-color: #fff;
        border-radius: 2px;
      }
      .allDelete{
        padding: 6px 8px;
        color: #ff2530;
        border: 1px solid #ff2530;
        background-color: #fff;
        border-radius: 2px;
      }

      .export{
        padding: 6px 8px;
        border-radius: 2px;
      }

      .allDelete {
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FF8585;
        background-color: #FF8585;
        border-radius: 2px;
      }

      .originBtn{
        padding: 6px 8px;
        color: #fff;
        border: 1px solid #FD903C;
        background-color: #FD903C;
        border-radius: 2px;
      }
    }
  }

  .headerRig {
    /deep/ .el-select .el-input__inner {
      border: none;
    }
  }

  .cardCont {
    /deep/ .el-card__body {
      padding: 0;
    }
  }

  .dataList {
    .dataBox {
      display: flex;
      padding: 23px 30px;
      border-bottom: 1px solid rgba(68, 68, 68, 0.14901960784313725);
      justify-content: space-between;
      .dataBoxLeft {
        width: 80%;
        /deep/ .el-checkbox{
          width: 100%;
        }
        /deep/ .el-checkbox__label{
          width: 100%;
        }
        .dataLeft {
          display: flex;
          .fileType {
            font-size: 18px;
            width: 60px;
            height: 60px;
            opacity: 1;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-right: 30px;
            box-sizing: border-box;
            white-space: pre-wrap;
            word-break:break-all;
            padding: 10px;
            text-align: center;
          }
          .fileDoc{
            background: rgba(105, 204, 255, 1);
          }
          .fileXls{
            background: #91E5A1;
          }
          .filePpt{
            background: #ff913e;
          }
          .filePdt{
            background: #FF8585;
          }
          .fileJpg{
            background: #9BB5FF;
          }
          .filePng{
            background: #FE95B2;
          }

          .dataDetail {
            width: 90%;
            p {
              font-size: 18px;
              font-weight: bold;
              color: rgba(68, 68, 68, 1);
              margin-right: 10px;
              display: inline-block;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              width: 100%;
            }

            .down-img {
              cursor: pointer;
              margin-left: 12px;
            }

            .dataMsg {
              font-size: 14px;
              display: flex;
              align-items: center;
              color: #444;
              margin-top: 10px;
              flex-wrap: wrap;

              span {
                margin-right: 60px;
                min-width: 25%;
                flex: 1;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

        }
      }

      .dataBoxRig {
        .btnMt{
          text-align: center;
          margin-bottom: 5px;
          .primary{
            border:1px solid rgba(5,170,255,1);
            background:rgba(5,170,255,1);
            color:#fff;
            &:hover{
              background: rgba(5, 170, 255, 0.90);
              color:#fff;
            }
          }
          .violet{
            border:1px solid #799cff;
            background: #799cff;
            color:#fff;
            &:hover{
              background: rgba(121, 156, 255, 0.90);
              color:#fff;
            }
          }
          .origin {
            border: 1px solid #ffcba6;
            background: #ffcba6;
            color: #fff;

            &:hover {
              background: rgba(255, 203, 166, 0.90);
              color: #fff;
            }
          }
        }
      }
    }
  }

  .conditionCont{
    padding:10px 20px;
    .conditionBox{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span{
        font-size: 14px;
        color: #606266;
        margin-right: 10px;
        min-width: 100px;
        text-align: right;
      }
      .el-select{
        margin-right: 10px;
      }
      .el-date-editor{
        margin-right: 10px;
      }
      .el-checkbox-group{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .el-checkbox{
          height: 30px;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .conditionChoose{
    font-size:14px;
    color:#444 !important;
    &::before{
      content:'';
      border-left: 2px solid rgb(3, 173, 244);
      margin-right: 4px;
    }
  }

  .conditionList{
    display: flex;
    align-items: center;
    margin-left: 10px;
    .conditionBox{
      border: 1px solid #33B3EE;
      font-size: 12px;
      color: #33B3EE;
      padding:5px;
      margin-right: 10px;
      display: flex;
    }
  }

  .conditionClear{
    border: 1px solid rgb(255, 0, 0);
    font-size: 12px;
    color: rgb(255, 0, 0);
    padding: 5px;
    cursor: pointer;
  }

  .conditRig{
    display: flex;
    align-items: center;
    img{
      width: 20%;
    }
    span{
      cursor: pointer;
      font-size:14px;
      color: #33B3EE;
      white-space: nowrap;
      margin-left: 5px;
    }
  }

  .projectList{
    margin-top:10px;
    .projectBox{
      padding:10px;
      background:#EFFAFF;
      display: flex;
      justify-content: space-between;
      &:hover{
        background:#CDEEFF;
      }
      .projectLeft{
        flex:1;
        margin-right: 15px;
        display: flex;
        .proNum{
          width: 20px;
          height: 20px;
          background: #FE95B2;
          border-radius:100%;
          color:#fff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
        }
        .projectMsg{
          flex: 1;
          .leftBox{
            display: flex;
            margin-bottom: 10px;
            h4{
              font-size:14px;
              font-weight: normal;
              flex: 1;
            }
          }
        }
      }
      .projectRig{
        /deep/ .el-button{
          padding:5px 10px;
        }
      }
    }
  }

  .noMore{
    text-align: center;
    padding:20px 0;
  }

  /deep/ .select-box-date {
    .select-item-list{
      .item{
        padding: 10px 6px !important;
      }
    }
  }

  /deep/ .el-date-editor {
    .el-input__inner {
      padding: 0 30px;
    }
  }
</style>
