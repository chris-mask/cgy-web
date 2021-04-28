<template>
  <div class="app-container">
    <el-card class="box-card box-margin" style="margin-bottom: 20px;">
      <div class="searchCont">
        <div class="searchLeft">
          <el-input size="small" placeholder="企业名称/社会信用代码" v-model="listQuery.companyName" @keyup.enter.native="goSearch"></el-input>
          <el-input size="small" placeholder="政策名称" v-model="listQuery.noticeName" @keyup.enter.native="goSearch"></el-input>
          <el-input size="small" placeholder="项目名称/简称/别名" v-model="listQuery.projectName" @keyup.enter.native="goSearch"></el-input>
          <el-button type="primary" size="small" icon="el-icon-search" @click="goSearch">搜索</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <div class="chooseCompany">
          <el-select @change='changeProvince' clearable size="small" class="inline-block input-150 float-left"
                     v-model="listQuery.provinceId" placeholder="省份">
            <el-option v-for="item in province_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='changeCity' clearable size="small" class="inline-block input-150 float-left"
                     v-model="listQuery.cityId" placeholder="城市">
            <el-option v-for="item in city_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='changeDistrict' clearable size="small" class="inline-block input-150 float-left"
                     v-model="listQuery.districtId" placeholder="县区">
            <el-option v-for="item in district_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
          <el-select @change='getTownsId' clearable size="small" class="inline-block input-150 float-left"
                     v-model="listQuery.townId" placeholder="镇街">
            <el-option v-for="item in town_list" :key="item.dictId" :label="item.dictName"
                       :value="item.dictId"></el-option>
          </el-select>
        </div>
        <div class="chooseCompany">
          <el-select @change='getScoreRange' clearable size="small" class="inline-block input-150 float-left" v-model="scoreRange" placeholder="得分范围">
            <el-option v-for="item in scoreRangeList" :key="item.key" :label="item.val" :value="item.key"></el-option>
          </el-select>
          <el-date-picker v-model="listQuery.setupDate" type="date" size="small" value-format="yyyy-MM-dd" @change="goSearch" placeholder="注册日期"></el-date-picker>
        </div>
        <span style="padding-bottom: 10px;">共匹配到 <span style="color: red;">{{totalRows}}</span>个企业，共<span style="color: red;">{{total}}</span>条记录</span>
      </div>
      <div>
        <el-table :data="companyList" border fit highlight-current-row ref="companyTable" row-key="companyId"
                  :reserve-selection="true">
          <el-table-column align="center" min-width="130px" label="政策名称">
            <template slot-scope="scope">
              <span>{{scope.row.noticeName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="110px" label="项目名称">
            <template slot-scope="scope">
              <span>{{scope.row.projectName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="130px" label="企业名称">
            <template slot-scope="scope">
              <span style="cursor: pointer;" @click="toCompany(scope.row.companyId)">{{scope.row.companyName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="80px" label="企业位置">
            <template slot-scope="scope">
              <span v-if="scope.row.companyPosition == 1">私海</span>
              <span v-else>公海</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="160px" label="企业地区">
            <template slot-scope="scope">
              <span v-if="scope.row.provinceName">{{scope.row.provinceName}}</span>
              <span v-if="scope.row.cityName"> - {{scope.row.cityName}}</span>
              <span v-if="scope.row.districtName"> - {{scope.row.districtName}}</span>
              <span v-if="scope.row.townName"> - {{scope.row.townName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="80px"  label="业务员">
            <template slot-scope="scope">
              <span>{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="联系人：联系号码">
            <template slot-scope="scope">
              <span>{{scope.row.personnelName}}</span>
              <span v-if="scope.row.personnelMobile && scope.row.personnelName">：</span>
              <span>{{scope.row.personnelMobile}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100px"  label="成立时间">
            <template slot-scope="scope">
              <span>{{scope.row.registerTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="60px" label="得分">
            <template slot-scope="scope">
              <span>{{scope.row.totalScore}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="80px">
            <template slot-scope="scope">
              <span class="spanButton" @click="getMatchingCompanyInfo(scope.row)">编辑</span>
            </template>
          </el-table-column>

        </el-table>
        <div class="noMore" @click="pageDown" v-if="total - companyList.length > 0">
          点击加载更多
        </div>
        <div class="noMore" v-else>没有更多数据了</div>
      </div>
    </el-card>

    <!--  得分信息  -->
    <el-dialog :title="companyName" :visible.sync="dialogVisible" width="80%" v-dialogDrag>
      <el-table :data="matchingCompanyInfoList" border highlight-current-row>
        <el-table-column align="center" label="所属政策" prop="noticeName">
          <template slot-scope="scope">
            <span>{{ scope.row.noticeName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="条件描述" prop="conditionDesc">
          <template slot-scope="scope">
            <span>{{scope.row.conditionDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="匹配方式" prop="autoMatch" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.autoMatch == 0">人工判断</span>
            <span v-else>自动匹配</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否符合" prop="weightScore" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.isPass === 1">符合</span>
            <span v-else>不符合</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="条件总分" prop="weightScore" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.weightScore}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="已得分" prop="getScore" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.getScore" type="number"></el-input>
          </template>
        </el-table-column>
<!--        <el-table-column align="center" label="是否符合" prop="weightScore" width="100">-->
<!--          <template slot-scope="scope">-->
<!--            <el-radio v-model="scope.row.isPass" label="1" border size="mini">符&nbsp;&nbsp;&nbsp;&nbsp;合</el-radio>  <br />-->
<!--            <el-radio v-model="scope.row.isPass" label="0" border size="mini">不符合</el-radio>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="updateGetScore">修改已得分</el-button>
      </span>
    </el-dialog>

    <div style="height: 60px; position: fixed; bottom: 20px; right: 0; width: 80px;bottom: 100px;">
      <a href="javascript:" target="_self" v-if="btnFlag" @click="backTop">
        <img src="../../icons/enterprise/back_top.png" alt="">
      </a>
    </div>
  </div>
</template>

<script>
  import {getMatchingCompany, matchingCompanyInfo, updateMatchingCompanyGetScore} from '@/api/projectManage'
  import { commonDictOfRegion } from '@/api/utils'

  export default {
    data() {
      return {
        projectId: '',
        noticeId: '',
        pushId: '',
        companyList: [],
        province_list: [],
        city_list: [],
        district_list: [],
        town_list: [],
        level:3,
        subsidyTotal: '',
        companyName: '',
        scoreRange: '',
        scoreRangeList:[
          {'key': 1, 'val': '大于20分'},
          {'key': 2, 'val': '大于40分'},
          {'key': 3, 'val': '大于50分'},
          {'key': 4, 'val': '大于60分'},
          {'key': 5, 'val': '大于70分'},
          {'key': 6, 'val': '大于80分'},
          {'key': 7, 'val': '大于90分'},
        ],
        matchingCompanyInfoList: [],
        dialogVisible: false,
        total: 0,
        totalRows: 0,
        listQuery: {
          page: 0,
          pageSize: 20,
          companyPosition: []
        },
        loading: false,
        btnFlag: 0
      }
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
    activated() {
      if (this.$route.query.queryType == 'notice') {
        this.noticeId = this.$route.query.id
        this.projectId = ''
      } else if (this.$route.query.pushId) {
        this.noticeId = ''
        this.projectId = ''
        this.pushId = this.$route.query.pushId
      } else {
        this.noticeId = ''
        this.projectId = this.$route.query.id
      }
      this.getCompanyData();
      this.getRegionList();
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed() {
      clearInterval(this.timer)
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
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

      pageDown() {
        this.listQuery.page = this.listQuery.page + 20
        this.getCompanyData()
      },

      // 开始搜索
      goSearch() {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.companyList = []
        this.getCompanyData()
      },

      // 选择地区
      changeProvince(val) {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.listQuery.cityId = '';
        this.listQuery.districtId = '';
        this.listQuery.townId = '';
        this.parentId = val
        this.level = 2;
        this.getRegionList()
        this.companyList = []
        this.getCompanyData()
      },
      changeCity(val) {
        this.listQuery.districtId = '';
        this.listQuery.townId = '';
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 1;
        this.getRegionList()
        this.companyList = []
        this.getCompanyData()
      },
      changeDistrict(val) {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.parentId = val
        this.level = 0;
        this.getRegionList()
        this.companyList = []
        this.getCompanyData()
      },
      getTownsId(val) {
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.companyList = []
        this.getCompanyData()
      },
      // 获取地区信息
      getRegionList() {
        if (this.level == undefined || this.level == null) {
          this.level = 3
        }

        if (this.parentId == undefined || this.parentId == '') {
          this.level = 3
          this.parentId = 0
        }

        let params = {
          level: this.level,
          parentId: this.parentId
        }

        commonDictOfRegion(params).then(res => {
          if (res.code == 200) {
            if (this.level == 3) {
              this.province_list = res.data
            }
            if (this.level == 2) {
              this.city_list = res.data
            }
            if (this.level == 1) {
              this.district_list = res.data
            }
            if (this.level == 0) {
              this.town_list = res.data
            }

          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },
      // 得分范围
      getScoreRange() {
        this.listQuery.minGetScore = ''
        if (this.scoreRange == 1) {
          this.listQuery.minGetScore = 20
        } else if (this.scoreRange == 2) {
          this.listQuery.minGetScore = 40
        } else if (this.scoreRange == 3) {
          this.listQuery.minGetScore = 50
        } else if (this.scoreRange == 4) {
          this.listQuery.minGetScore = 60
        } else if (this.scoreRange == 5) {
          this.listQuery.minGetScore = 70
        } else if (this.scoreRange == 6) {
          this.listQuery.minGetScore = 80
        } else if (this.scoreRange == 7) {
          this.listQuery.minGetScore = 90
        }
        this.listQuery.page = 0
        this.listQuery.pageSize = 20
        this.companyList = []
        this.getCompanyData()
      },


      // 获取匹配结果
      getCompanyData() {
        this.listQuery.projectId = this.projectId
        this.listQuery.noticeId = this.noticeId
        this.listQuery.pushId = this.pushId
        getMatchingCompany(this.listQuery).then(res => {
          if (res.code === 200) {
            this.total = res.data.total
            this.totalRows = res.data.pages
            if (this.listQuery.page > 0) {
              this.companyList = this.companyList.concat(res.data.data);
            } else {
              this.companyList = res.data.data
            }
          }
        })
      },

      // 获取匹配详情
      getMatchingCompanyInfo(data) {
        this.dialogVisible = true
        this.companyName = '" ' + data.companyName + ' "的匹配详情'
        matchingCompanyInfo({projectId: data.projectId, companyId: data.companyId, noticeId: data.noticeId}).then(res => {
          if (res.code === 200) {
            this.matchingCompanyInfoList = res.data
            this.matchingCompanyInfoList.forEach(item => {
              item.projectId = data.projectId
              item.noticeId = data.noticeId
              item.getScore = item.getScore > 0 ? this.$set(item, 'getScore', item.getScore) : this.$set(item, 'getScore', 0)
              item.isPass = item.isPass > 0 ? this.$set(item, 'isPass', 1) : this.$set(item, 'isPass', 0)
            })
          }
        })

      },

      // 修改已得分
      updateGetScore() {
        var canUpdate = false
        var totalScore = 0
        var regPos = /^\d+$/; // 非负整数
        this.matchingCompanyInfoList.forEach(item => {
          if (!regPos.test(item.getScore)) {
            canUpdate = true
          } else {
            totalScore += Number(item.getScore)
          }
        })
        if (canUpdate) {
          this.$message.error('已得分必须为正数或0')
          return
        }
        if (totalScore > 100) {
          this.$message.error("所有条件总得分不能超过100分")
          return
        }

        updateMatchingCompanyGetScore(this.matchingCompanyInfoList).then(res => {
            if (res.code === 200) {
              this.companyName = ''
              this.getCompanyData()
              this.$message.success("修改成功")
              this.dialogVisible = false
            }
        })

      },

      // 去企业查看客户详情
      toCompany(companyId) {
        this.$router.push({
          'path': '/customer/editCustomer', 'query': {'id': companyId, 'tip':true, 'check': true, 'is_personal': false}
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  .searchCont {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .searchLeft {
      display: flex;
    }
  }

  /deep/ .el-input {
    width: auto;
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

  .chooseCompany {
    display: flex;
    margin-bottom: 10px;
  }

  /deep/ .el-select {
    /*margin-right: 10px;*/
  }

  .noMore {
    text-align: center;
    font-size: 14px;
    padding: 10px 0;
    cursor: pointer;
  }

  // 弹出框样式设计
  /deep/ .el-dialog__header {
    background: #05AAFF;
    padding: 20px;

    /deep/ .el-dialog__title {
      color: #fff;
      font-size: 16px;
    }

    /deep/ .el-dialog__headerbtn {
      border-radius: 50%;
      background: #fff;
      padding: 4px;
      font-size: 12px;
      font-weight: 400;

      /deep/ .el-dialog__close {
        color: #05AAFF;
      }
    }
  }

  /deep/ .el-dialog__body {
    padding: 10px 20px;
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
</style>
