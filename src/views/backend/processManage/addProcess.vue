<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div class="addUserContent">
        <el-form ref="processForm" :model="processForm" :rules="rules" class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="流程名称:" prop="flowName">
                <el-input v-if="!detail" size='small' class="searchInput" v-model.trim="processForm.flowName" maxlength="200" placeholder="流程名称"></el-input>
                <span v-else>{{processForm.flowName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="时限:" prop="timeLimit">
                <el-input v-if="!detail" size='small' class="searchInput" type="number" oninput="if(value>10000)value=10000" v-model="processForm.timeLimit" placeholder="流程时限">
                  <template slot="append">小时</template>
                </el-input>
                <span v-else>{{processForm.timeLimit}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="备注:" prop="flowDesc">
                <EditorText v-if="!detail" :id="editor1" :value="processForm.flowDesc" ref="editor" @changeValue="changeValue($event)" :maxlength="maxlength"></EditorText>
                <span v-else v-html="processForm.flowDesc">{{processForm.flowDesc}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="appNodeDtoList">
                <el-button v-if="!detail" size="small" type="primary" @click="openAddNode">新建环节</el-button>
                <el-table
                  :data="processForm.appNodeDtoList"
                  border
                  :default-expand-all="false">
                  <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                  <el-table-column label="环节名称">
                    <template slot-scope="scope">
                      <span>{{ scope.row.nodeName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="初审">
                    <template slot-scope="scope">
                      <span>{{ scope.row.firstTrial == 1 ? '是' : '否' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="复审" width="150px">
                    <template slot-scope="scope">
                      <span>
                        {{
                          scope.row.recheck == 0 ? '不需要复审' :
                          scope.row.recheck == 1 ? '初审通过时需要复审' :
                          scope.row.recheck == 2 ? '初审不通过时需要复审' : '不需要复审'
                        }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="意见">
                    <template slot-scope="scope">
                      <span>{{ scope.row.opinion == 1 ? '是' : '否' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="附件">
                    <template slot-scope="scope">
                      <span>{{ scope.row.accessory == 1 ? '是' : '否' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="处理人" width="120px">
                    <template slot-scope="scope">
                      <span>
                        {{
                          scope.row.handlerType == 0 ? '当前工程师' :
                          scope.row.handlerType == 1 ? '手动指定用户' :
                          scope.row.handlerType == 2 ? '指定用户' :
                          scope.row.handlerType == 3 ? '指定部门' :
                          scope.row.handlerType == 4 ? '指定角色' :
                          scope.row.handlerType == 5 ? '开始创建人' : '-'
                        }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="前置接口">
                    <template slot-scope="scope">
                      <span>{{ scope.row.autoInterfaceBefore }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="后置接口">
                    <template slot-scope="scope">
                      <span>{{ scope.row.autoInterfaceAfter }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="后续跳转">
                    <template slot-scope="scope">
                      <span>{{
                        scope.row.goToType == 0 ? '不跳转' :
                        scope.row.goToType == 1 ? '正常通过跳转' :
                        scope.row.goToType == 2 ? '审批不通过跳转' :
                        scope.row.goToType == 3 ? '条件跳转' : '不跳转' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注">
                    <template slot-scope="scope">
                      <span>{{ scope.row.nodeDesc }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="230px" v-if="!detail">
                    <template slot-scope="scope">
                      <span v-if="scope.$index+1 != 1 && scope.$index+1 != appNodeNum" class="spanButton spanHeng" @click="editorNode(scope.row,scope.$index)">编辑</span>
                      <span v-if="scope.$index+1 != 1 && scope.$index+1 != appNodeNum" class="spanButton col_red spanHeng" @click="deleteNodeBox(scope.row,scope.$index)">删除</span>
                      <span v-if="scope.$index+1 != 1 && scope.$index+1 != appNodeNum" class="spanButton colUpDown spanHeng" @click="onUpItem(scope.row,scope.$index)">上升</span>
                      <span v-if="scope.$index+1 != 1 && scope.$index+1 != appNodeNum" class="spanButton colUpDown spanHeng" @click="onDownItem(scope.row,scope.$index)">下降</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <div class="btnList">
      <el-button size='small' type="primary" v-if="!flowId && flowId == '' && allowAdd.twoAllow" @click="addProcess('processForm')">确定</el-button>
      <el-button size='small' type="primary" v-if="flowId && !detail" @click="editFlow('processForm')">修改</el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>

    <el-dialog
      title="环节信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      v-dialogDrag
      class="huanjie"
    >
      <div>
        <el-form ref="flowForm" :model="flowForm" :rules="nodeRules" class="demo-ruleForm">
          <el-form-item label="环节名称:" prop="nodeName">
<!--            <el-input size='small' class="searchInput" v-model.trim="flowForm.nodeName" placeholder="环节名称" maxlength="200"></el-input>-->
            <el-select size="small" v-model="flowForm.nodeName" placeholder="环节名称" clearable filterable>
              <el-option
                v-for="item in processNameList"
                :key="item.dictName"
                :label="item.dictName"
                :value="item.dictName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div><el-checkbox label="初审（通过，不通过）" v-model="flowForm.firstTrial" @change="firstChange"></el-checkbox></div>
            <div>
              <el-radio-group v-model="flowForm.recheck" v-if="flowForm.firstTrial == true">
                <el-radio :label="0">不需要复审</el-radio>
                <el-radio :label="1">复审(初审通过时需要复审)</el-radio>
                <el-radio :label="2">复审(初审不通过时需要复审)</el-radio>
              </el-radio-group>
            </div>
            <div><el-checkbox label="显示意见" v-model="flowForm.opinion"></el-checkbox></div>
            <div><el-checkbox label="显示附件" v-model="flowForm.accessory"></el-checkbox></div>
          </el-form-item>
          <el-form-item label="环节处理人:">
            <el-select size="small" v-model="flowForm.handlerType" placeholder="环节处理人" clearable @change="handlerTypeChange">
              <el-option
                v-for="item in handlerTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-select size="small" v-model="flowForm.handlerId" placeholder="指定用户" clearable v-if="flowForm.handlerType == 2" filterable>
              <el-option
                v-for="item in projectPersonList"
                :key="item.userId"
                :label="item.userName+'_'+item.roleName"
                :value="item.userId">
              </el-option>
            </el-select>
            <el-cascader size='small' v-if="flowForm.handlerType == 3" style="width: 100%"
                         placeholder="指定部门"
                         v-model="flowForm.handlerId"
                         :options="departmentList"
                         ref="type"
                         clearable
                         :show-all-levels="false"
                         :props="{ checkStrictly: true,emitPath:false,children:'child',label:'deptName',value:'deptId' }"
            ></el-cascader>
            <el-select size="small" v-model="flowForm.handlerId" placeholder="指定角色" clearable v-if="flowForm.handlerType == 4">
              <el-option
                v-for="item in rolesList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前置接口:">
            <el-input v-model="flowForm.autoInterfaceBefore" size="small"></el-input>
          </el-form-item>
          <el-form-item label="后置接口:">
            <el-input v-model="flowForm.autoInterfaceAfter" size="small"></el-input>
          </el-form-item>
          <el-form-item label="后续跳转:">
            <el-select size="small" v-model="flowForm.goToType" placeholder="后续跳转" clearable>
              <el-option
                v-for="item in goToTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" prop="nodeDesc">
            <el-input type="textarea" :rows="4" size='small' class="searchInput" v-model="flowForm.nodeDesc" placeholder="备注" maxlength="200"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelNode">取 消</el-button>
        <el-button type="primary" @click="addProcessBox('flowForm')" v-if="flowForm.index == undefined">确 定</el-button>
        <el-button type="primary" @click="editProcessBox('flowForm')" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {saveFlowInfo, deleteNodeInfo, editFlowInfo, queryFlowInfoDetails,editFlowInfoCoverOrderProcess} from '@/api/processManage'
  import {queryUserComboInfo} from '@/api/customerCenter'
  import { getDepartmentTree } from '@/api/department.js'
  import {commonDict} from '@/api/utils'
  import {getRolesList} from '@/api/rolesManage'

  import EditorText from '@/components/EditorText/index'

  export default {
    components: {
      EditorText,
    },
    data(){
      return{
        processForm: {
          appNodeDtoList:[
            {
              nodeName: '开始',
              firstTrial: 0,
              recheck: 0,
              opinion: 0,
              accessory: 0,
              nodeDesc: '',
            },
            {
              nodeName: '结束',
              firstTrial: 0,
              recheck: 0,
              opinion: 0,
              accessory: 0,
              nodeDesc: '',
            },
          ]
        },
        maxlength:200,
        appNodeNum: 0,
        nodeList:[],
        flowForm: {},
        rules:{
          flowName: [
            {required: true, message: '请输入流程名称', trigger: 'blur'}
          ],
          timeLimit: [
            {required: true, message: '请输入时限', trigger: 'blur'}
          ],
          appNodeDtoList: [
            {required: true, message: '请添加环节', trigger: 'blur'}
          ],
        },
        nodeRules:{
          nodeName: [
            {required: true, message: '请输入流程节点名称', trigger: 'blur'}
          ],
        },
        tableData:[],
        dialogVisible: false,
        checkList:[],
        editor1:'editor1',
        flowId:'',
        detail:'',
        handlerTypeList:[
          {label:'当前工程师',value:0},
          {label:'手动指定用户',value:1},
          {label:'指定用户',value:2},
          {label:'指定部门',value:3},
          {label:'指定角色',value:4},
          {label:'开始创建人',value:5},
        ],
        goToTypeList:[
          {label:'不跳转',value:0},
          {label:'正常通过跳转',value:1},
          {label:'审批不通过跳转',value:2},
          {label:'条件跳转',value:3},
        ],
        departmentListQuery: {
          page: 1,
          pageSize: 100,
        }, // 筛选条件对象
        departmentList:[],
        rolesList:[
          // {roleName:'总经理', roleId: '1'},
          // {roleName:'中台（总经办）', roleId: '2'},
          // {roleName:'中台（子公司）', roleId: '3'},
          // {roleName:'项目主管', roleId: '4'},
          // {roleName:'项目员', roleId: '5'},
          // {roleName:'审计员', roleId: '6'}
        ],
        processNameList:[],

        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:INSERT'),//新增流程
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:UPDATE'),//编辑流程
        allowDetail: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:DETAILS'),//流程详情
        allowUploadOrder: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:FLOW:MANAGE','SYSTEM:FLOW:UPDATEFLOWANDUPDATEORDER'),//修改流程信息并同步覆盖未完成订单
      }
    },
    activated() {
      this.processForm = {
        appNodeDtoList:[
          {
            nodeName: '开始',
            firstTrial: 0,
            recheck: 0,
            opinion: 0,
            accessory: 0,
            nodeDesc: '',
          },
          {
            nodeName: '结束',
            firstTrial: 0,
            recheck: 0,
            opinion: 0,
            accessory: 0,
            nodeDesc: '',
          },
        ]
      }
      this.detail = this.$route.query.detail;
      if(this.$route.query.flowId){
        this.flowId = this.$route.query.flowId;
        this.getDetail();
      }else{
        this.$refs.editor.initCKEditor()
        this.appNodeNum = this.processForm.appNodeDtoList.length;
      }

      this.getPersonList('')
      this.getDepartmentList()
      this.getCommonData()
      this.getRoles()
    },
    methods:{
      //接收和更新富文本值
      changeValue($event) {
        this.processForm.flowDesc = $event
      },

      //获取详情
      getDetail(){
        if(!this.allowDetail.twoAllow){
          this.$message.warning('抱歉，您没有权限获取此详情');
          return;
        }
        let params = {
          page:0,
          pageSize:10,
          flowId: this.flowId
        }
        queryFlowInfoDetails(params).then(res=>{
          if(res.code == 200){
            this.processForm = res.data;
            if(res.data != ''){
              this.processForm.appNodeDtoList = res.data.nodeVoList;
              this.appNodeNum = this.processForm.appNodeDtoList.length;
            }else{
              this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/process');
            }

            if(!this.detail){
              this.$refs.editor.initCKEditor()
            }

          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //新建流程
      addProcess(formName){
        this.processForm.appNodeDtoList.forEach((item,index)=>{
          item.sortNum = index + 1;

          if(item.goToType == undefined || item.goToType == ''){
            item.goToType = 0
          }

          if(item.handlerType == undefined || item.handlerType == ''){
            item.handlerType = 0
          }

          if(item.recheck == undefined || item.recheck == ''){
            item.recheck = 0
          }

          if(item.firstTrial == true){
            item.firstTrial = 1
          }else{
            item.firstTrial = 0;
            item.recheck = 0;
          }
          if(item.opinion == true){
            item.opinion = 1
          }else{
            item.opinion = 0
          }
          if(item.accessory == true){
            item.accessory = 1
          }else{
            item.accessory = 0
          }
        })

        this.$refs[formName].validate((valid) => {
          if (valid) {
            saveFlowInfo(this.processForm).then(res=>{
              if(res.code == 200){
                this.$message.success('新建成功');
                this.$refs.editor.destroyEditor();
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/process');
              }else{
                this.$message.warning(res.message)
              }
            })
          }
        })
      },

      //确定编辑流程
      editFlow(formName){
        this.processForm.appNodeDtoList.forEach((item,index)=>{
          item.sortNum = index + 1

          if(item.goToType == undefined || item.goToType == ''){
            item.goToType = 0
          }

          if(item.handlerType == undefined || item.handlerType == ''){
            item.handlerType = 0
          }

          if(item.recheck == undefined || item.recheck == ''){
            item.recheck = 0
          }

          if(item.firstTrial == true){
            item.firstTrial = 1
          }else{
            item.firstTrial = 0
            item.recheck = 0;
          }
          if(item.opinion == true){
            item.opinion = 1
          }else{
            item.opinion = 0
          }
          if(item.accessory == true){
            item.accessory = 1
          }else{
            item.accessory = 0
          }
        })

        if(!this.allowUpdate.twoAllow){
          this.$message.warning('抱歉，您没有此权限');
          return;
        }

        editFlowInfo(this.processForm).then(res=>{
          if(res.code == 200){
            this.$message.success('修改成功');
            this.$refs.editor.destroyEditor();
            this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/process');
          } else {
            this.$message.warning(res.message)
          }
        })

        // this.$confirm('是否同步覆盖未完成订单', '提示', {
        //   distinguishCancelAndClose: true,
        //   confirmButtonText: '同步',
        //   cancelButtonText: '不同步',
        //   type: 'warning',
        //   closeOnClickModal: false,
        // }).then(() => {
        //   this.$refs[formName].validate((valid)=>{
        //     if(valid){
        //       if(!this.allowUploadOrder.twoAllow){
        //         this.$message.warning('抱歉，您没有此权限');
        //         return;
        //       }
        //       editFlowInfoCoverOrderProcess(this.processForm).then(res=>{
        //         if(res.code == 200){
        //           this.$message.success('修改成功');
        //           this.$refs.editor.destroyEditor();
        //           this.closeCurrent(this.$store.state.tagsView.visitedViews,this.$route,'/backend/process');
        //         }else{
        //           this.$message.warning(res.message)
        //         }
        //       })
        //     }
        //   })
        // }).catch((action) => {
        //   if(action != 'close'){
        //     this.$refs[formName].validate((valid) => {
        //       if (valid) {
        //         if(!this.allowUpdate.twoAllow){
        //           this.$message.warning('抱歉，您没有此权限');
        //           return;
        //         }
        //         editFlowInfo(this.processForm).then(res=>{
        //           if(res.code == 200){
        //             this.$message.success('修改成功');
        //             this.$refs.editor.destroyEditor();
        //             this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/process');
        //           } else {
        //             this.$message.warning(res.message)
        //           }
        //         })
        //       }
        //     })
        //   }
        // })
      },

      //新建节点
      addProcessBox(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.flowForm.handlerType == 2){
              if(this.flowForm.handlerId == '' || this.flowForm.handlerId == undefined){
                this.$message.warning('请选择指定用户');
                return;
              }
            }
            if(this.flowForm.handlerType == 3){
              if(this.flowForm.handlerId == '' || this.flowForm.handlerId == undefined){
                this.$message.warning('请选择指定部门');
                return;
              }
            }
            if(this.flowForm.handlerType == 4){
              if(this.flowForm.handlerId == '' || this.flowForm.handlerId == undefined){
                this.$message.warning('请选择指定角色');
                return;
              }
            }

            if(this.flowForm.goToType == undefined || this.flowForm.goToType == ''){
              this.flowForm.goToType = 0
            }

            if(this.flowForm.recheck == undefined || this.flowForm.recheck == ''){
              this.flowForm.recheck = 0
            }

            if(this.flowForm.firstTrial == true){
              this.flowForm.firstTrial = 1
            }else{
              this.flowForm.firstTrial = 0
              this.flowForm.recheck = 0;
            }
            if(this.flowForm.opinion == true){
              this.flowForm.opinion = 1
            }else{
              this.flowForm.opinion = 0
            }
            if(this.flowForm.accessory == true){
              this.flowForm.accessory = 1
            }else{
              this.flowForm.accessory = 0
            }

            let box = this.flowForm;

            let list = JSON.parse(JSON.stringify(this.processForm.appNodeDtoList));

            list.splice(this.appNodeNum-1,0,box)

            this.processForm.appNodeDtoList = JSON.parse(JSON.stringify(list))
            this.processForm.appNodeDtoList.forEach((item,index)=>{
              item.sortNum = index + 1
            })

            this.appNodeNum = this.processForm.appNodeDtoList.length;

            this.dialogVisible = false;
            this.flowForm = {
              firstTrial:false,
              // recheck:false,
              opinion:false,
              accessory:false
            };
          }
        })
      },

      //确定编辑节点
      editProcessBox(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.flowForm.handlerType == 2){
              if(this.flowForm.handlerId == '' || this.flowForm.handlerId == undefined){
                this.$message.warning('请选择指定用户');
                return;
              }
            }
            if(this.flowForm.handlerType == 3){
              if(this.flowForm.handlerId == '' || this.flowForm.handlerId == undefined){
                this.$message.warning('请选择指定部门');
                return;
              }
            }
            if(this.flowForm.handlerType == 4){
              if(this.flowForm.handlerId == '' || this.flowForm.handlerId == undefined){
                this.$message.warning('请选择指定角色');
                return;
              }
            }

            if(this.flowForm.goToType == undefined || this.flowForm.goToType == ''){
              this.flowForm.goToType = 0
            }

            if(this.flowForm.recheck == undefined || this.flowForm.recheck == ''){
              this.flowForm.recheck = 0
            }

            if(this.flowForm.firstTrial == true){
              this.flowForm.firstTrial = 1
            }else{
              this.flowForm.firstTrial = 0
              this.flowForm.recheck = 0;
            }
            if(this.flowForm.opinion == true){
              this.flowForm.opinion = 1
            }else{
              this.flowForm.opinion = 0
            }
            if(this.flowForm.accessory == true){
              this.flowForm.accessory = 1
            }else{
              this.flowForm.accessory = 0
            }
            let box = this.flowForm

            let arr = this.processForm.appNodeDtoList.map((item,index)=>{
              if(index == box.index){
                item = box
                delete item.index
              }

              return item
            })

            this.processForm.appNodeDtoList = JSON.parse(JSON.stringify(arr))
            this.dialogVisible = false;
            this.flowForm = {
              firstTrial:false,
              // recheck:false,
              opinion:false,
              accessory:false
            };
          }
        })
      },

      //打开编辑节点
      editorNode(row,index){
        row.index = index;
        if(row.firstTrial == 1){
          row.firstTrial = true
        }else{
          row.firstTrial = false
          row.recheck = 0;
        }
        // if(row.recheck == 1){
        //   row.recheck = true
        // }else{
        //   row.recheck = false
        // }
        if(row.opinion == 1){
          row.opinion = true
        }else{
          row.opinion = false
        }
        if(row.accessory == 1){
          row.accessory = true
        }else{
          row.accessory = false
        }

        this.flowForm = JSON.parse(JSON.stringify(row));

        this.dialogVisible = true;
      },

      //打开弹窗
      openAddNode(){
        this.dialogVisible = true;
      },

      handleClose(done) {
        this.dialogVisible = false
      },

      //关闭弹窗
      cancelNode(){
        this.dialogVisible = false;
        this.flowForm = {
          firstTrial:false,
          // recheck:false,
          opinion:false,
          accessory:false
        };
      },

      deleteNodeBox(item,index){
        this.$confirm('是否确定删除此节点', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(item.nodeId){
            deleteNodeInfo({nodeId: item.nodeId}).then(res=>{
              if(res.code == 200){
                this.processForm.appNodeDtoList.splice(index,1)
                this.appNodeNum = this.processForm.appNodeDtoList.length;
                this.$message.success('删除成功');
                // this.getDetail();
              }
            })
          }else{
            this.processForm.appNodeDtoList.splice(index,1)
            this.appNodeNum = this.processForm.appNodeDtoList.length;
            this.$message.success('删除成功');
          }

          this.appNodeNum = this.processForm.appNodeDtoList.length;
        })
      },

      //上升
      onUpItem(item, index) {
        // var index = list.map(items => items).indexOf(item);
        if(this.appNodeNum >= 2){
          if (index == 1) {
            this.$message({type: 'warning', message: '已经是第一，无法上升'})
            return;
          }
        }
        this.processForm.appNodeDtoList.splice(index - 1, 0, item);
        this.processForm.appNodeDtoList.splice(index + 1, 1);
      },

      // 下降
      onDownItem(item, index) {
        // var index = list.map(items => items).indexOf(item)
        if(this.appNodeNum >= 2){
          if (item == this.processForm.appNodeDtoList[this.processForm.appNodeDtoList.length - 2]) {
            this.$message({type: 'warning', message: '已经是最后，无法下降'})
            return;
          }
        }
        this.processForm.appNodeDtoList.splice(index + 2, 0, item)
        this.processForm.appNodeDtoList.splice(index, 1)
      },

      // 返回
      cancelSub() {
        if(!this.detail){
          this.$refs.editor.destroyEditor();
        }
        this.processForm = {
          appNodeDtoList:[
            {
              nodeName: '开始',
              firstTrial: 0,
              recheck: 0,
              opinion: 0,
              accessory: 0,
              nodeDesc: '',
              goToType: 0,
              handlerType: 0
            },
            {
              nodeName: '结束',
              firstTrial: 0,
              recheck: 0,
              opinion: 0,
              accessory: 0,
              nodeDesc: '',
              goToType: 0,
              handlerType: 0
            },
          ]
        }
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route, '/backend/process');
      },

      //根据角色获取人员列表
      getPersonList(name){
        let formData = new FormData;
        formData.append('roleNameList',name)
        queryUserComboInfo(formData).then(res=>{
          if(res.code == 200){
            this.projectPersonList = res.data;
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      handlerTypeChange(){
        this.$set(this.flowForm,'handlerId','')
        // this.$set(this.flowForm,'handlerId',undefined)
      },

      // 获取部门表格数据
      getDepartmentList() {
        getDepartmentTree({}).then(res => {
          if(res.code == 200){
            this.departmentList = res.data.deptInfoTreeVos;
          }
        })
      },

      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:FLOW_NAME',
          companyId: '697480101377343488'
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.processNameList = res.data['DICT:FLOW_NAME'];
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },

      // 获取角色列表
      getRoles() {
        const params = {
          page: 1,
          pageSize: 1000,
          roleName: this.roleName,
          parentId: 0,
        }
        getRolesList(params).then(res => {
          if (res.code == 200) {
            this.rolesList = res.data.data;
          } else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      firstChange(e){
        if(e == false){
          this.flowForm.recheck = 0;
        }
      },
    }
  }
</script>


<style lang="less" scoped>
  // 修改列表页面表格样式
  /deep/ .el-table {
    border: rgb(217, 242, 255) 1px solid !important;
    margin-top: 10px;
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

  /deep/ .el-form-item {
    display: flex;
    margin-right: 14px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
  }

  /deep/ .el-form-item__label {
    min-width: 75px;
  }

  .btnList {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /*width: 60%;*/
  }

  /deep/ .el-card__header {
    color: #008DD6;
  }

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  /deep/ .el-table__indent, /deep/ .el-table__placeholder {
    /*display: none;*/
  }

  /deep/ .el-table .cell {
    display: flex;
    align-items: center;
    span:last-child{
      &::after{
        display: none;
      }
    }
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

  .linkBox {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    border-bottom: 1px solid #dfdfdf;
    align-items: start;
    .boxFlex {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
    }

    .linkMsg {
      /*min-width:200px;*/
      display: flex;
      /*flex:1;*/
      flex-wrap: wrap;

      .processInput {
        display: flex;
      }

      .el-input {
        width: auto;
      }
    }

    span {
      margin-right: 10px;
    }

    /deep/ .el-input {
      margin-right: 10px;
      margin-bottom: 10px;
      width: auto;
    }

    .el-button {
      max-height: 40px;
    }
  }
  .linkTitle{
    display: flex;
    div{
      width: 178px;
      margin-right: 10px;
      margin-bottom: 10px;
      font-weight: bold;
      text-align: center;
    }
  }

  .spanButton {
    color: #05AAFF;
  }

  .shu {
    margin: 0 10px;
    color: #ccc;
  }

  .spanHeng{
    display: flex;
    align-items: center;
    &::after{
      content:'';
      width: 2px;
      height: 13px;
      background:#ccc;
      display: inline-block;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .huanjie{
    /deep/ .el-dialog__header{
      border-bottom: 1px solid #ccc;
    }
  }
</style>
