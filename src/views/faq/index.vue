<template>
  <div class="sales-plan-box">
    <!--搜索-->
    <div class="search-bar">
      <div class="search">
        <el-input @keyup.enter.native="handleFilter" v-model="listQuery.questionContent" class="search-input"
                  placeholder="请输入常见问题名称"/>
        <el-button class="btn" @click="handleFilter">搜一下</el-button>
<!--        <el-button @click="testBtn">测试使用，不要点</el-button>-->
      </div>
    </div>

    <!--筛选栏-->
    <div class="screen-bar">
      <div class="screen-title">
        <div class="name">
          <span class="line"></span>
          <span class="text">已选条件：</span>
        </div>
        <div class="selected-list">
          <div class="item" v-for="(item,index) in select_filter_list">
            <div class="text">{{item}}</div>
            <img :src="clearBlue" @click="deleteOneClick(index)"/>
          </div>

          <div class="item clear" @click="deleteAllClick" v-if="Object.keys(select_filter_list).length>0">清空所有</div>
        </div>
        <div class="screen-btn">
          <div class="btn" @click="handleScreenBtn">
            <img :src="isScreenShow?closeIcon:openIcon"/>
            <span class="text">{{!isScreenShow?'选择筛选条件':'收起筛选条件'}}</span>
          </div>
        </div>
      </div>
      <div class="screen-list" v-show="isScreenShow">
        <div class="form-item">
          <span class="label-text">问题分类：</span>
          <div class="form-handle">
            <el-cascader v-model="listQuery.questionTypePCList" placeholder="请选择问题分类" :options="workList" size="small" clearable style="width: 300px;"
                         :props="{checkStrictly: true,value: 'dictId', label: 'dictName', children: 'child' }" @change="handleCascaderChange"></el-cascader>
          </div>
        </div>
      </div>
    </div>

    <!--列表-->
    <div class="list">
      <div class="list-title">

        <div class="left">
          <div class="title-text">
            <span class="line"></span>
            <div class="search-total-num">搜索到 <span class="num">{{listTotal}}</span> 条记录</div>
            <div class="search-total-num" style="margin-left: 10px" v-if="check_biz_ids.length > 0">已选中 <span
              class="num">{{check_biz_ids.length}}</span> 条记录
            </div>
          </div>
          <div class="title-btn-group">
            <div @click="checkAllOrNo" class="btn">
              {{isCheckAll?'取消全选':'全选'}}
            </div>
            <div class="btn" @click="goHandle('add',id)" v-if="allowAdd.twoAllow">新增</div>
            <div class="btn del" @click="delItemHandle" v-if="allowDelete.twoAllow">删除</div>
          </div>
        </div>

        <div class="right">
          <el-select v-model="sortSelectData"
                     @change="sortListHandle"
                     class="select-sort"
                     clearable
                     placeholder="默认排序"
                     popper-class="select-sort-option"
                     :popper-append-to-body="false"
          >
            <el-option
              v-for="item in sortDataList"
              :value="item.id"
              :label="item.value"
              :key="item.id"
            />
          </el-select>
        </div>
      </div>

      <div class="list-detail">
        <div class="item" v-for="item in listData">
          <div class="item-detail">

            <!--图片+多选-->
            <div class="pic">
              <input @change="checkOneOrNo" class="check-box" type="checkbox" name="check_biz_ids"
                     :value="item.faqId" v-model="check_biz_ids"/>
              <div class="img-box" :style="`background:${item.bgColor}`">
                问题
              </div>
            </div>

            <!--列表详情-->
            <div class="detail">
              <div class="title">
                <span class="text" @click="goHandle('read',item.faqId)">{{item.questionContent}}</span>
                <span class="title-tag">
                    问题分类：{{item.parentQuestionTypeName?(item.parentQuestionTypeName+"--"+item.questionTypeName):item.questionTypeName}}
                </span>
              </div>
              <div class="user-conent">
                <div class="item">
                  <div class="cate">问题内容：<span>{{item.questionContent}}</span></div>
                </div>

                <div class="item">
                  <div class="cate">问题解答：<span>{{item.questionAnswer}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <!--操作按钮组-->
          <div class="handle-btn-group">
            <!--查看-->
            <div class="btn-img read-img" @click="goHandle('read',item.faqId)" v-if="allowDetail.twoAllow"></div>
            <!--编辑-->
            <div class="btn-img edit-img" @click="goHandle('edit',item.faqId)" v-if="allowUpdate.twoAllow"></div>
          </div>
        </div>
        <!--加载更多-->
        <div class="get-more" v-if="listData.length >= listTotal">
          没有更多
        </div>
        <div class="get-more" @click="loadMore" v-else>
          加载更多
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {commonDict} from '@/api/utils'
  import {delCrmFaqByIds, queryCrmFaqList} from '@/api/faq'
  import patentIcon from '../icons/enterprise/patent_icon.png'
  import clearBlue from '../icons/enterprise/clear_blue.png'
  import closeIcon from "../icons/enterprise/close_icon.png";
  import openIcon from "../icons/enterprise/open_icon.png";

  export default {
    props: {
      id: {
        type: String
      },
      companyNames: {
        type: String
      }
    },
    data() {
      return {
        //蓝色-删除icon
        clearBlue,
        //关闭icon
        closeIcon,
        //打开icon
        openIcon,
        //类型列表
        workList: [],
        // 专利icon
        patentIcon,
        //排序--选中的值
        sortSelectData: "",
        //排序--列表数据
        sortDataList: [
          {id: 'createTime', value: "按创建日期顺序", type: "ASC"},
          {id: '-createTime', value: "按创建日期倒序", type: "DESC"},
        ],
        //参数
        listQuery: {
          page: 0,
          pageSize: 20
        },
        tempPage: null,
        //列表数据
        listData: [],
        // 勾选行的biz_id
        check_biz_ids: [],
        // 是否已经全选
        isCheckAll: false,
        //总数
        listTotal: 0,
        //列表框背景色
        picBackgroundList: ['#FE95B2', '#9BB5FF', '#69CCFF', '#91E5A1', '#FFCBA6'],
        //已选条件
        select_filter_list: {},
        //筛选栏显示/隐藏
        isScreenShow: false,

        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:FAQ:MANAGE', 'SYSTEM:FAQ:INSERT'),//新增常见问题
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:FAQ:MANAGE', 'SYSTEM:FAQ:UPDATE'),//编辑常见问题
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:FAQ:MANAGE', 'SYSTEM:FAQ:LIST'),//查询常见问题
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:FAQ:MANAGE', 'SYSTEM:FAQ:DELETE'),//删除常见问题
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:FAQ:MANAGE', 'SYSTEM:FAQ:LIST'),//常见问题列表
      }
    },
    activated() {
      this.getCommonDict()
      this.isCheckAll = false
    },
    methods: {
      //获取字典
      getCommonDict() {
        let params = {
          keyList: 'DICT:QUESTION_TYPE',
          companyId :'697480101377343488'
        };
        commonDict(params).then(res => {
          if (res.code === 200) {
            this.workList = res.data['DICT:QUESTION_TYPE'];
            this.getList();
          }
        })
      },

      //跳转到：新增(add)、编辑(edit)、详情(read)
      goHandle(type, id) {
        let path;

        if (this.id !== undefined) {
          if (type === 'add') {
            this.$router.push({
              'path': '/backend/faq/addFaq',
              'query': {'type': type, 'faqId': id}
            })
          } else if (type === 'edit') {
            this.$router.push({
              'path': '/backend/faq/addFaq',
              'query': {'type': type, 'faqId': id, isUser: true}
            })
          } else if (type === 'read') {
            this.$router.push({
              'path': '/backend/faq/addFaq',
              'query': {'type': type, 'faqId': id}
            })
          }
        } else {
          this.$router.push({
            path: '/backend/faq/addFaq',
            query: {'type': type, 'faqId': id}
          })
        }
      },

      //获取列表数据
      getList() {
        if (this.allowGetList.twoAllow) {
          queryCrmFaqList(this.listQuery).then(res => {
            if (res.code === 200) {
              let list = res.data.data;
              let newRes = []
              let R = [], F;
              for (F = 0; F < list.length;) R.push(list.slice(F, F += 5));
              R.forEach(item => {
                item.forEach((data, index) => {
                  this.picBackgroundList.forEach((val, key) => {
                    if (index === key) {
                      data.bgColor = val;
                    }
                  })
                })
              });
              R.forEach(item => {
                item.forEach(item => {
                  newRes.push(item);
                })
              });

              if (this.listQuery.page > 0) {
                this.listData = this.listData.concat(newRes);
              } else {
                this.listData = newRes;
                this.check_biz_ids = [];

                if (this.$store.getters.copyrightPage != 0) {
                  this.listQuery.page = this.$store.getters.copyrightPage;
                  this.listQuery.pageSize = 20;
                }
              }
              let obj = {}
              this.listData = this.listData.reduce((cur, next) => {
                obj[next.faqId] ? '' : obj[next.faqId] = true && cur.push(next)
                return cur
              }, [])
              this.listTotal = res.data.total;
            }
          })
        } else {
          this.$message.warning('抱歉，您没有权限获取此列表数据')
        }

      },

      // 搜索
      handleFilter(){
        this.listQuery.page = 0
        this.getCommonDict()
      },

      testBtn(){
        window.alert('说了不要点，擦')
      },

      //选择一个的时候
      checkOneOrNo() {
        if (this.check_biz_ids.length === this.listData.length) {
          this.isCheckAll = true
        } else {
          this.isCheckAll = false
        }
      },

      //全选
      checkAllOrNo() {
        if (this.isCheckAll) {
          this.check_biz_ids = []
          this.isCheckAll = false
        } else {
          let _this = this
          this.listData.forEach(function (item, index) {
            if (_this.check_biz_ids.indexOf(item.faqId) === -1) {
              _this.check_biz_ids.push(item.faqId)
            }
            _this.isCheckAll = true
          })
        }
      },

      //删除其中一项
      delItemHandle() {
        if (this.check_biz_ids.length === 0) {
          this.$message({
            message: '请勾选要删除的行！',
            type: 'warning'
          });
        } else {
          delCrmFaqByIds(this.check_biz_ids).then(res => {
            if (res.code === 200) {
              this.check_biz_ids = [];
              this.isCheckAll = false;
              this.$message({message: res.message, type: 'success'});
              this.listQuery.page = 0;
              this.getCommonDict();
            }
          })
        }
      },

      //排序
      sortListHandle(val) {
        this.sortDataList.forEach(item => {
          if (item.id === val) {
            if (item.type && item.type !== undefined) {
              this.listQuery.orderType = item.type
            }
          }
        })
        if (val.includes('-')) {
          val = val.substr(1);
        }
        this.listQuery.orderField = val;
        this.listQuery.page = 0;
        this.getCommonDict();
      },

      //加载更多
      loadMore() {
        this.tempPage = this.listQuery.page += 20;
        this.listQuery.pageSize = 20;
        if (this.listData.length < this.listTotal) {
          this.getCommonDict();
        }
      },

      //筛选栏-点击选择筛选条件
      handleScreenBtn() {
        this.isScreenShow = !this.isScreenShow;
        if (this.isScreenShow) {
        }
      },

      //筛选栏-删除一个
      deleteOneClick(item) {
        this.list = [];
        this.$delete(this.select_filter_list, item);
        if (Array.isArray(this.listQuery[item])) {
          this.listQuery[item] = []
        } else {
          this.$delete(this.listQuery, item);
        }
        this.handleFilter();
      },

      //筛选栏-删除所有
      deleteAllClick() {
        this.list = []
        this.select_filter_list = {}
        this.listQuery = {
          page: 0,
          pageSize: 20
        };
        this.handleFilter()
      },

      // 级联选择器选择
      handleCascaderChange(chooseList){
        if (chooseList && chooseList.length > 0) {
          this.listQuery.questionTypePCList = chooseList
          let string = ""
          this.workList.forEach(item => {
            if (item.dictId == chooseList[0]) {
              string += item.dictName
              if (item.child.length > 0 && chooseList.length > 1) {
                item.child.forEach(child=>{
                  if(child.dictId == chooseList[1]){
                    string = string +"-"+ child.dictName
                  }
                })
              }
            }
          })
          this.$set(this.select_filter_list, 'questionTypePCList', `问题分类:${string}`)
        }else{
          this.$delete(this.listQuery, 'questionTypePCList')
          this.$delete(this.select_filter_list, 'questionTypePCList')
        }
        this.handleFilter()
      },

    }
  }
</script>

<style lang="less" scoped>
  .screen-bar {
    background: #fff;
    margin-top: 20px;
    box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);

    .screen-title {
      display: flex;
      padding: 14px 16px;
      padding-bottom: 3px;

      .name {
        color: #042B40;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        white-space: nowrap;
        margin-right: 10px;
        display: flex;
        padding-top: 5px;

        .line {
          width: 3px;
          height: 14px;
          background: rgba(5, 170, 255, 1);
          display: inline-block;
          margin-right: 8px;
          margin-top: 4px;
        }

        .text {
          margin-top: 2px;
        }
      }

      .selected-list {
        width: 90%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 4px;
        min-height: 35px;

        .item {
          padding: 4px 6px;
          font-size: 12px;
          border: 1px solid #05AAFF;
          color: #05AAFF;
          margin-right: 13px;
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .text {
            margin-top: 2px;
            margin-right: 6px;
          }

          img {
            cursor: pointer;
          }

          &.clear {
            padding: 5px 15px;
            cursor: pointer;
            color: #F56C6C;
            border: 1px solid #F56C6C;
          }
        }
      }

      .screen-btn {
        margin-top: 3px;

        .btn {
          cursor: pointer;
          white-space: nowrap;

          img {
            vertical-align: middle;
          }

          .text {
            margin-top: 1px;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }

    .screen-list {
      padding: 16px 16px 3px 25px;
      border-top: 1px solid rgba(219, 233, 255, 1);

      .form-item {
        display: flex;
        align-items: center;
        margin-bottom: 17px;

        .label-text {
          width: 100px;
          font-size: 14px;
          color: rgba(4, 43, 64, 1);
          white-space: nowrap;
          text-align: right;
          font-weight: 600;
          margin-right: 12px;
        }

        .form-handle {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .select-input {
            margin-right: 20px;

            /deep/ .el-input__inner {
              min-height: 32px;
            }

            /deep/ .el-input__icon {
              line-height: 30px;
            }
          }
        }

        .date-select {
          width: 290px;

          /deep/ .el-range-separator {
            padding: 0;
            line-height: 33px;
          }

          /deep/ .el-date-editor .el-range__close-icon {
            line-height: 34px;
          }
        }
      }
    }
  }

  /deep/ .el-popper .popper__arrow {
    right: 0 !important;
    left: inherit !important;

  }

  .sales-plan-box {
    margin: auto 5%;

    .search-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      padding: 20px 16px;
      margin-top: 20px;
      box-shadow: 0 2px 12px rgba(5, 170, 255, 0.08);
      border-radius: 4px;

      /deeep/ .el-button + .el-button {
        margin: 0;
      }

      .btn {
        height: 48px;
        border: 0;
        width: 120px;
        color: #fff;
        border-radius: 0;
        background: linear-gradient(180deg, rgba(105, 204, 255, 1) 0%, rgba(5, 170, 255, 1) 100%);

        &:active {
          opacity: .5;
        }
      }

      .import-btn {
        margin-left: 20px;
        background: linear-gradient(180deg, rgba(152, 177, 250, 1) 0%, rgba(88, 131, 255, 1) 100%);
      }

      .search {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 20px;
        width: 50%;

        .search-input {
          /deep/ .el-input__inner {
            height: 48px;
            border-radius: 0;
            border: 1px solid #05AAFF;
            border-right: 0;
          }
        }
      }

      .down-load-modal {
        color: #5883FF;
        font-size: 14px;
        margin-left: 14px;
        cursor: pointer;
        white-space: nowrap;

        .icon-down-load {
          vertical-align: middle;
        }
      }
    }

    .title-name {
      padding-left: 20px;
      margin-top: 20px;
      font-size: 14px;
      color: rgba(68, 68, 68, .75);
    }

    .list {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);
      margin-top: 16px;

      .list-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 16px;
        box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);

        .left {
          display: flex;
          align-items: center;

          .title-text {
            display: flex;
            align-items: center;
            margin-right: 38px;

            .line {
              margin-right: 8px;
              display: inline-block;
              width: 3px;
              height: 14px;
              background: rgba(255, 169, 106, 1);
            }

            .search-total-num {
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(68, 68, 68, 0.75);

              .num {
                color: #FF6C6C;
              }
            }
          }

          .title-btn-group {
            display: flex;
            align-items: center;

            .btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 14px;
              padding: 4px 9px;
              font-size: 16px;
              color: rgba(5, 170, 255, 1);
              border: 1px solid rgba(5, 170, 255, 1);
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                color: #fff;
                background: rgba(5, 170, 255, 1);
              }

              &.del {
                border: 1px solid rgba(245, 108, 108, 1);
                color: rgba(245, 108, 108, 1);

                &:hover {
                  color: #fff;
                  background: rgba(245, 108, 108, 1);
                }
              }

              &:active {
                opacity: .5;
              }
            }
          }
        }

        .right {
          .select-sort {
            /deep/ .el-input__inner {
              font-size: 15px;
              border: 0;
              text-align: right;
              color: rgba(5, 170, 255, 1);
            }

            /deep/ .el-input__icon {
              line-height: 0;
            }
          }
        }
      }

      .list-detail {
        .item {
          display: flex;
          justify-content: space-between;
          padding: 20px;
          padding-bottom: 8px;
          position: relative;
          border-bottom: 1px solid #ddd;

          &:last-child {
            border-bottom: 0;
          }

          .item-detail {
            width: 100%;
            display: flex;
            align-items: flex-start;

            .pic {
              display: flex;
              align-items: center;
              margin-right: 20px;

              .check-box {
                width: 18px;
                height: 18px;
                cursor: pointer;

                /deep/ .el-checkbox__inner::after {
                  height: 10px;
                  left: 6px;
                }
              }

              .img-box {
                width: 84px;
                height: 84px;
                border-radius: 4px;
                background: rgba(105, 204, 255, 1);
                margin-left: 15px;
                font-size: 18px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
              }
            }

            .detail {
              width: 100%;
              padding-top: 3px;

              .text {
                margin-right: 18px;
              }

              .title {
                font-size: 18px;
                color: rgba(68, 68, 68, 1);
                font-weight: bold;
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                cursor: pointer;

                .title-tag {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 3px 8px;
                  background: rgba(205, 238, 255, 1);
                  border-radius: 12px;
                  color: rgba(5, 170, 255, 1);
                  font-weight: normal;
                  font-size: 14px;
                }
              }

              .user-conent {
                .item {
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  padding: 0;
                  font-size: 14px;
                  border-bottom: 0;

                  .cate {
                    min-width: 25%;
                    color: rgba(68, 68, 68, 0.75);
                    margin-bottom: 12px;

                    span {
                      color: rgba(68, 68, 68, 1);
                      /*width: 200px;*/
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示。*/
                      -webkit-line-clamp: 5; /*设置需要显示的行数*/
                      -webkit-box-orient: vertical; /*设置伸缩盒子的子元素排列方式(从上到下垂直排列)*/
                    }

                    .blue {
                      color: rgba(5, 170, 255, 1);
                      cursor: pointer;
                    }

                    .red {
                      color: rgba(245, 108, 108, 1);
                    }
                  }
                }
              }
            }
          }

          .bage {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10%;
          }

          .handle-btn-group {
            width: 98px;
            min-width: 98px;

            .btn-img {
              margin: 8px;
              cursor: pointer;
              width: 70px;
              height: 30px;

              &.read-img {
                background: url("../icons/enterprise/read_icon.png") no-repeat;

                &:hover {
                  background: url("../icons/enterprise/_read_icon.png") no-repeat;
                }
              }

              &.edit-img {
                background: url("../icons/enterprise/edit_icon.png") no-repeat;

                &:hover {
                  background: url("../icons/enterprise/_edit_icon.png") no-repeat;
                }
              }
            }
          }
        }

        .get-more {
          padding: 30px 0;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }

  /deep/ .select-sort-option {
    z-index: 98 !important;

    /deep/ .popper__arrow {
      right: 40px !important;
      left: auto !important;
    }
  }
</style>
