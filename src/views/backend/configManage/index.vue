<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <!--搜索栏-->
      <div slot="header" class="clearfix headerTop">
        <div class="headerLeft">
          <el-input size="small" class="searchInput" v-model="dictName" placeholder="配置名称" @keyup.enter.native="getDictList" clearable></el-input>
          <el-button size="small" type="primary" icon="el-icon-search" @click="getDictList">搜索</el-button>
        </div>
        <div class="headerRig">
          <el-button size="small" type="primary" @click="openAddDialog" v-if="!queryCompany && allowGetTwoAdd.threeAllow">新建配置</el-button>
        </div>
      </div>

      <!--表格-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in tabList" :label="item.label" :name="item.name" :key="index">
          <div class="materielTable">
            <el-table :data="dictionariesList" v-loading="listLoading" border fit highlight-current-row
                      row-key="dictId"
                      default-expand-all :tree-props="{children: 'children'}" @sort-change="handleSortChange">
              <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
              <el-table-column align="center" min-width="160px" label="配置名称" sortable="custom" prop="dictName">
                <template slot-scope="scope">
              <span class="projectName">
               <span v-if="!scope.row.children" @click="addChildren(scope.row)" class="showOrHiden">+</span>
               <span v-else @click="deleteChildren(scope.row)" class="showOrHiden">-</span>
               <span class="col_skyblue" @click="getDictInfo(scope.row,'detail')">{{scope.row.dictName}}</span>
              </span>
                  <!--              <span>{{scope.row.dictName}}</span>-->
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="160px" label="标识符" sortable="custom" prop="dictCode">
                <template slot-scope="scope">
                  <span>{{scope.row.dictCode}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="值" sortable="custom" prop="dictValue">
                <template slot-scope="scope">
                  <span>{{scope.row.dictValue}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="备注" sortable="custom" prop="dictDesc">
                <template slot-scope="scope">
                  <span v-html="scope.row.dictDesc">{{scope.row.dictDesc}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="270px" class-name="small-padding fixed-width" v-if="index == 0">
                <template slot-scope="scope">
                  <span class="spanButton col_skyblue" v-if="scope.row.parentId = '0' && allowAdd.threeAllow" @click="openAddDialog(scope.row)">添加子配置</span>
                  <span class="shu" v-if="scope.row.parentId = '0' && allowAdd.threeAllow">|</span>
                  <span class="spanButton col_skyblue" @click="getDictInfo(scope.row,'edit')" v-if="allowUpdate.threeAllow">编辑</span>
                  <span class="shu" v-if="allowUpdate.threeAllow">|</span>
                  <el-popconfirm
                    confirmButtonText='好的'
                    cancelButtonText='取消'
                    icon="el-icon-info"
                    iconColor="red"
                    title="是否确定删除？"
                    @onConfirm="deleteDisction(scope.row.dictId)"
                    v-if="queryCompany == true && scope.row.childs == 'childs' && allowDelete.threeAllow"
                  >
                    <span class="spanButton col_red" slot="reference">删除</span>
                  </el-popconfirm>
                  <span class="shu" v-if="queryCompany == true && scope.row.childs == 'childs' && allowDelete.threeAllow">|</span>
                  <el-popconfirm
                    confirmButtonText='好的'
                    cancelButtonText='取消'
                    icon="el-icon-info"
                    iconColor="red"
                    title="是否确定删除？"
                    @onConfirm="deleteDisction(scope.row.dictId)"
                    v-if="queryCompany == false && allowDelete.threeAllow"
                  >
                    <span class="spanButton col_red" slot="reference">删除</span>
                  </el-popconfirm>
                  <span class="shu" v-if="queryCompany == false && allowDelete.threeAllow">|</span>
                  <span class="spanButton colUpDown" @click="dataUpDown(scope.row,1)" v-if="allowUpDown.threeAllow">上升</span>
                  <span class="shu" v-if="allowUpDown.threeAllow">|</span>
                  <span class="spanButton colUpDown" @click="dataUpDown(scope.row,2)" v-if="allowUpDown.threeAllow">下降</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="350px" class-name="small-padding fixed-width" v-if="index == 1">
                <template slot-scope="scope">
                  <span class="spanButton col_skyblue" v-if="scope.row.parentId = '0' && allowGetTwoAdd.threeAllow" @click="openAddDialog(scope.row)">添加子配置</span>
                  <span class="shu" v-if="scope.row.parentId = '0' && allowGetTwoAdd.threeAllow">|</span>
                  <span class="spanButton col_skyblue" @click="getDictInfo(scope.row,'edit')" v-if="allowGetTwoUpdate.threeAllow">编辑</span>
                  <span class="shu" v-if="allowGetTwoUpdate.threeAllow">|</span>
                  <el-popconfirm
                    confirmButtonText='好的'
                    cancelButtonText='取消'
                    icon="el-icon-info"
                    iconColor="red"
                    title="是否确定删除？"
                    @onConfirm="deleteDisction(scope.row.dictId)"
                    v-if="queryCompany == true && scope.row.childs == 'childs' && allowGetTwoDelete.threeAllow"
                  >
                    <span class="spanButton col_red" slot="reference">删除</span>
                  </el-popconfirm>
                  <span class="shu" v-if="queryCompany == true && scope.row.childs == 'childs' && allowGetTwoDelete.threeAllow">|</span>
                  <el-popconfirm
                    confirmButtonText='好的'
                    cancelButtonText='取消'
                    icon="el-icon-info"
                    iconColor="red"
                    title="是否确定删除？"
                    @onConfirm="deleteDisction(scope.row.dictId)"
                    v-if="queryCompany == false && allowGetTwoDelete.threeAllow"
                  >
                    <span class="spanButton col_red" slot="reference">删除</span>
                  </el-popconfirm>
                  <span class="shu" v-if="queryCompany == false && allowGetTwoDelete.threeAllow">|</span>
                  <span class="spanButton colUpDown" @click="dataUpDown(scope.row,1)" v-if="allowGetTwoUpDown.threeAllow">上升</span>
                  <span class="shu" v-if="allowGetTwoUpDown.threeAllow">|</span>
                  <span class="spanButton colUpDown" @click="dataUpDown(scope.row,2)" v-if="allowGetTwoUpDown.threeAllow">下降</span>
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
                             :current-page="page" :page-sizes="[10,20,30, 50]" :page-size="pageSize"
                             layout="prev, pager, next, sizes, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!--增加/编辑配置-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="closeAddDialog"
    >
      <el-form :model="addDictForm" :rules="rules" ref="addDictForm" label-width="100px">
        <el-form-item label="配置名称:" prop="dictName">
          <el-input size="small" v-model="addDictForm.dictName" v-if="!isShowDetail" clearable></el-input>
          <span v-else>{{addDictForm.dictName}}</span>
        </el-form-item>

        <!--自定义-->
        <el-form-item label="标识符:" v-if="queryCompany == true">
          <!--          <el-input v-model="addDictForm.dictCode" v-if="!isShowDetail"></el-input>-->
          <span v-if="queryCompany == true">{{addDictForm.dictCode}}</span>
        </el-form-item>

        <!--系统-->
        <el-form-item label="标识符:" prop="dictCode" v-if="queryCompany == false">
          <el-input size="small" v-model="addDictForm.dictCode" v-if="!isShowDetail"></el-input>
          <span v-else>{{addDictForm.dictCode}}</span>
        </el-form-item>

        <el-form-item label="值:" prop="dictValue">
          <el-input size="small" v-model.trim="addDictForm.dictValue" v-if="!isShowDetail"></el-input>
          <span v-else>{{addDictForm.dictValue}}</span>
        </el-form-item>

        <el-form-item label="字典范围:" prop="dictScope" v-if="queryCompany == true">
          <el-select size='small' v-model="addDictForm.dictScope" placeholder="请选择字典范围" v-if="!isShowDetail">
            <el-option
              v-for="item in customOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-else>{{optionsText[addDictForm.dictScope]}}</span>
        </el-form-item>

        <el-form-item label="字典范围:" prop="dictScope" v-if="queryCompany == false">
          <el-select size='small' v-model="addDictForm.dictScope" placeholder="请选择字典范围" v-if="!isShowDetail">
            <el-option
              v-for="item in systemOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-else>{{optionsText[addDictForm.dictScope]}}</span>
        </el-form-item>



        <el-form-item label="允许多少级:" prop="allowLevel">
          <el-input size="small" v-model="addDictForm.allowLevel" v-if="!isShowDetail"></el-input>
          <span v-else>{{addDictForm.allowLevel}}</span>
        </el-form-item>
        <el-form-item label="备注:" prop="dictDesc">
<!--          <el-input type="textarea" v-model="addDictForm.dictDesc" :disabled="isChecked" v-if="!isShowDetail"></el-input>-->
          <EditorText v-if="!isShowDetail" :id="editor1" :value="addDictForm.dictDesc" ref="editor" @changeValue="changeValue($event)"></EditorText>
          <span v-else v-html="addDictForm.dictDesc">{{addDictForm.dictDesc}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size='small' type="primary" @click="okAddDialog('addDictForm')" v-if="dictId == '' || dictId == undefined && !isShowDetail">确 定</el-button>
        <el-button size='small' type="primary" @click="editDiction('addDictForm')" v-if="dictId != '' && dictId != undefined && !isShowDetail">修 改</el-button>
        <el-button size='small' @click="closeAddDialog">取 消</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import {
    queryConfInfoList,
    deleteDict,
    goUpOrDownAssets,
    addDict,
    queryDictInfo,
    editDict
  } from '@/api/configManage'
  import cloneDeep from "lodash/cloneDeep";
  import EditorText from '@/components/EditorText/index'

  export default {
    components: {
      EditorText,
    },
    data() {
      return {
        //默认选中的tab
        activeName:'custom',
        tabList: [
          {label: '自定义', name: 'custom'},
          {label: '系统', name: 'system'},
        ],


        dictName: '',

        dictionariesList: [],
        listLoading: false,
        page: 1,
        pageSize: 10,
        total: 0,
        sortType: '',
        sortFieldName: '',
        dialogVisible: false,
        addDictForm: {
          dictName: '',
          dictCode: '',
          dictValue: '',
          dictDesc: '',
          dictScope: ''
        },
        isChecked: false, // 查看状态 => 查看状态时表格禁用状态
        rules: {
          dictName: [{required: true, message: '请输入配置名称', trigger: 'blur'}],
          dictCode: [{required: true, message: '请输入标识符', trigger: 'blur'}],
          dictValue: [{required: true, message: '请输入值', trigger: 'blur'}],
          dictScope: [{required: true, message: '请选择配置范围', trigger: 'blur'}],
          allowLevel: [{required: true, message: '请选择级数', trigger: 'blur'}]
        },
        parentId: 0,
        levelNum: 0,
        parentIds: '0',
        dictId: '',
        systemOptions:[
          {
            value: 0,
            label: '系统级'
          },
          {
            value: 2,
            label: '初始化应用级'
          }
        ],
        customOptions:[{
          value: 1,
          label: '应用级'
        }],
        optionsText: {
          0: '系统级',
          1: '应用级',
          2: '初始化应用级',
        },
        userType: '',
        checked: '',
        title: '新建配置',
        showCen: false,
        queryCompany: true,
        isShowDetail: true,
        editor1:'editor1',
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:CUSTOM', 'SYSTEM:CONFIG:CUSTOM:LIST'),
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:CUSTOM', 'SYSTEM:CONFIG:CUSTOM:INSERT'),
        allowUpDown: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:CUSTOM', 'SYSTEM:CONFIG:CUSTOM:UPORDOWN'),
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:CUSTOM', 'SYSTEM:CONFIG:CUSTOM:DELETE'),
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:CUSTOM', 'SYSTEM:CONFIG:CUSTOM:DETAILS'),
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:CUSTOM', 'SYSTEM:CONFIG:CUSTOM:EDIT'),

        allowGetTwoList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:SYSTEM', 'SYSTEM:CONFIG:SYSTEM:LIST'),
        allowGetTwoAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:SYSTEM', 'SYSTEM:CONFIG:SYSTEM:INSERT'),
        allowGetTwoUpDown: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:SYSTEM', 'SYSTEM:CONFIG:SYSTEM:UPORDOWN'),
        allowGetTwoDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:SYSTEM', 'SYSTEM:CONFIG:SYSTEM:DELETE'),
        allowGetTwoDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:SYSTEM', 'SYSTEM:CONFIG:SYSTEM:DETAILS'),
        allowGetTwoUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE', 'SYSTEM:CONFIG:MANAGE', 'SYSTEM:CONFIG:SYSTEM', 'SYSTEM:CONFIG:SYSTEM:EDIT'),
      }
    },

    activated() {
      if(this.allowGetList.threeAllow && this.allowGetTwoList.threeAllow){
        this.tabList = [
          {label: '自定义', name: 'custom'},
          {label: '系统', name: 'system'},
        ]
      }else if(this.allowGetList.threeAllow && !this.allowGetTwoList.threeAllow){
        this.tabList = [
          {label: '自定义', name: 'custom'}
        ]
      }else if(!this.allowGetList.threeAllow && this.allowGetTwoList.threeAllow){
        this.tabList = [
          {label: '系统', name: 'system'}
        ]
      }

      if (this.allowGetList.threeAllow) {
        this.getDictList();
      }
    },
    methods: {
      //接收和更新富文本值
      changeValue($event) {
        this.addDictForm.dictDesc = $event
      },
      //点击tab获取列表数据
      handleClick(tab) {
        if (tab.index === "0") {
          this.queryCompany = true;
          if (this.allowGetList.threeAllow) {
            this.getDictList();
          }
        } else if (tab.index === "1") {
          this.queryCompany = false;
          if (this.allowGetTwoList.threeAllow) {
            this.getDictList();
          }
        }
      },
      //获取接口列表
      getDictList() {
        const params = {
          dictName: this.dictName,
          page: this.page,
          pageSize: this.pageSize,
          parentId: this.parentId,
          sortFieldName: this.sortFieldName,
          sortType: this.sortType,
          queryCompany: this.queryCompany,
        };
        queryConfInfoList(params).then(res => {
          if (res.code == 200) {
            this.dictionariesList = res.data.data;
            this.dictionariesList.forEach(item=>{
              this.$set(item,'fatherId',item.parentId)
            })
            this.total = Number(res.data.total)
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 点击展开子角色列表
      addChildren(row) {
        this.parentId = row.dictId
        const params = {
          dictName: this.dictName,
          page: this.page,
          pageSize: this.pageSize,
          parentId: this.parentId,
          sortFieldName: this.sortFieldName,
          sortType: this.sortType,
          queryCompany: this.queryCompany
        }
        queryConfInfoList(params).then(res => {
          if (res.code == 200) {
            if (res.data.data.length === 0) {
              this.$message.warning('当前配置没有子配置，请先进行添加')
            } else {
              res.data.data.forEach(item => item.childs = 'childs');
              res.data.data.forEach(item => item.fatherId = item.parentId);
              row.children = res.data.data;
            }

            this.dictionariesList = JSON.parse(JSON.stringify(this.dictionariesList))
            this.parentId = 0
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 点击折叠行的时候删除数据
      deleteChildren(row) {
        delete row.children
        this.dictionariesList = JSON.parse(JSON.stringify(this.dictionariesList))
      },

      // 获取配置详情
      getDictInfo(row,isShow) {
        if (isShow === 'edit') {
          this.title = '编辑配置';
          this.isShowDetail = false;
        } else if (isShow === 'detail' && this.allowDetail.threeAllow) {
          this.title = '配置详情';
          this.isShowDetail = true;
        }
        this.dialogVisible = true
        this.dictId = row.dictId;
        let params = {
          dictId: row.dictId,
          companyId: this.$store.getters.companyId
        };
        queryDictInfo(params).then(res => {
          if (res.code == 200) {
            this.addDictForm.dictCode = res.data.dictCode
            this.addDictForm.dictDesc = res.data.dictDesc
            this.addDictForm.dictName = res.data.dictName
            this.addDictForm.dictValue = res.data.dictValue
            this.addDictForm.allowLevel = res.data.allowLevel;
            this.addDictForm.dictScope = res.data.dictScope;
            this.levelNum = res.data.levelNum
            this.parentId = res.data.parentId
            this.parentIds = res.data.parentIds
            this.addDictForm = cloneDeep(this.addDictForm);

            if(isShow != 'detail'){
              this.$refs.editor.initCKEditor()
            }
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 删除配置
      deleteDisction(id) {
        var params = {
          dictId: id,
          companyId: this.$store.getters.companyId
        }
        deleteDict(params).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: '删除成功'})
            this.getDictList()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 打开新增弹窗
      openAddDialog(row) {
        this.title = '新建配置';
        this.isShowDetail = false;
        this.dialogVisible = true
        this.levelNum = row.levelNum == undefined ? 0 : row.levelNum
        this.parentId = row.dictId == undefined ? 0 : row.dictId
        this.parentIds = row.parentIds == undefined ? '0' : row.parentIds;
        if (this.queryCompany) {
          this.addDictForm.dictCode = row.dictCode;
        }

        setTimeout(()=>{
          this.$refs.editor.initCKEditor()
        },100)
      },

      // 新建配置
      okAddDialog(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            let params = {
              allowLevel:this.addDictForm.allowLevel,
              dictCode: this.addDictForm.dictCode,
              dictDesc: this.addDictForm.dictDesc,
              dictName: this.addDictForm.dictName,
              dictValue: this.addDictForm.dictValue,
              dictScope: this.addDictForm.dictScope,
              levelNum: this.levelNum,
              parentId: this.parentId,
              parentIds: this.parentIds
            };
            addDict(params).then(res => {
              if (res.code == 200) {
                this.$message({type: 'success', message: '新建成功'})
                this.dialogVisible = false
                this.addDictForm = {}
                this.levelNum = 0
                this.parentId = 0
                this.parentIds = ''
                this.dictId = ''
                this.getDictList()

                this.$refs.editor.destroyEditor();
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        })
      },

      // 编辑提交
      editDiction(formName) {
        this.$refs[formName].validate((valid, error) => {
          if (valid) {
            const params = {
              dictCode: this.addDictForm.dictCode,
              dictDesc: this.addDictForm.dictDesc,
              dictName: this.addDictForm.dictName,
              dictValue: this.addDictForm.dictValue,
              dictScope: this.addDictForm.dictScope,
              allowLevel:this.addDictForm.allowLevel,
              levelNum: this.levelNum,
              parentId: this.parentId,
              parentIds: this.parentIds,
              dictId: this.dictId
            };
            editDict(params).then(res => {
              if (res.code == 200) {
                this.$message({type: 'success', message: '修改成功'})
                this.dialogVisible = false
                this.addDictForm = {}
                this.levelNum = 0
                this.parentId = 0
                this.parentIds = ''
                this.dictId = ''
                this.$refs.editor.destroyEditor();
                this.getDictList()
              } else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        })
      },

      // 关闭弹窗
      closeAddDialog() {
        this.dialogVisible = false
        this.addDictForm = {}
        this.levelNum = 0
        this.parentId = 0
        this.parentIds = ''
        this.dictId = ''
        this.$refs['addDictForm'].resetFields();
        this.$refs.editor.destroyEditor();
      },

      // 上升下降
      dataUpDown(row, status) {
        const params = {
          operationType: status,
          parentId: row.fatherId,
          dictId: row.dictId,
          operationCompanyDictSort: this.queryCompany
        }
        goUpOrDownAssets(params).then(res => {
          if (res.code == 200) {
            this.$message({type: 'success', message: res.message})
            this.getDictList()
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      // 排序
      handleSortChange(column) {
        this.sortFieldName = column.prop
        if (column.order === 'ascending') {
          this.sortType = 'ASC'
        } else if (column.order === 'descending') {
          this.sortType = 'DESC'
        } else {
          this.sortType = ''
          this.sortFieldName = ''
        }
        this.getDictList()
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.getDictList()
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.page = val
        this.getDictList()
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .clearfix:after {
    display: none;
  }

  /deep/ .el-input {
    width: auto;
  }

  .headerTop {
    display: flex;
    justify-content: space-between;
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

  // 针对本页面项目名称和产品名称单独设置
  .projectName {
    cursor: pointer;

    .showOrHiden {
      display: inline-block;
      color: #333;
      margin-right: 10px;
    }
  }

  .productName {
    padding-left: 24px;
    color: #333;

    &:hover {
      opacity: 0.5;
      cursor: pointer;
      /*text-decoration: underline;*/
    }
  }

  // 弹出框样式设计
  /deep/ .el-dialog__header {
    background: #05AAFF;
    padding: 20px;
    margin-bottom: 20px;

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
