<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div class="addUserContent">
        <el-form ref="varForm" :model="varForm" :rules="rules" class="demo-ruleForm">
          <el-row>
            <el-col :span="10">
              <el-form-item label="变量名称:" prop="varName">
                <el-input size='small' class="searchInput" v-model.trim="varForm.varName" placeholder="变量名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="变 量 值 :" prop="varValue">
                <el-input size='small' class="searchInput" type="textarea" :rows="3" show-word-limit maxlength="500" v-model="varForm.varValue" placeholder="变量值" > </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="备注:" prop="varDesc">
                <el-input v-model="varForm.varDesc"  type="textarea" :rows="3" placeholder="备注" show-word-limit maxlength="2000"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="comparisonList">
                <el-button size="small" type="primary" @click="openAddNode">新建比较符</el-button>
                <el-table :data="varForm.comparisonList"  border :default-expand-all="false">
                  <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
                  <el-table-column label="符号名称 ">
                    <template slot-scope="scope">
                      <span>{{ scope.row.comparisonName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="符号值">
                    <template slot-scope="scope">
                      <span>{{ scope.row.comparisonSymbol}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="比较值表达式">
                    <template slot-scope="scope">
                      <span>{{ scope.row.valueExpression }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="230px">
                    <template slot-scope="scope">
                      <span class="spanButton spanHeng" @click="editorComparison(scope.row,scope.$index)">编辑</span>
                      <span class="spanButton col_red spanHeng" @click="deleteComparison(scope.row,scope.$index)">删除</span>
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
      <el-button size='small' type="primary" v-if="!varId && varId == '' && allowAdd.twoAllow" @click="addVar('varForm')">确定</el-button>
      <el-button size='small' type="primary" v-if="varId" @click="editVar('varForm')">修改</el-button>
      <el-button size='small' @click="cancelSub">取消</el-button>
    </div>

    <el-dialog title="比较符信息" :visible.sync="dialogVisible" width="30%" v-dialogDrag class="huanjie">
      <div>
        <el-form ref="comparisonForm" :model="comparisonForm" :rules="nodeRules" class="demo-ruleForm">
          <el-form-item label=" 符 号 名 称 :" prop="comparisonName" label-width="100">
            <el-input size='small' class="searchInput" v-model.trim="comparisonForm.comparisonName" placeholder="符号名称"></el-input>
          </el-form-item>
          <el-form-item label=" 符  号  值 :" prop="comparisonSymbol" label-width="100">
            <el-input v-model="comparisonForm.comparisonSymbol" size="small"></el-input>
          </el-form-item>
          <el-form-item label="比较值表达式:" prop="valueExpression" label-width="100">
            <el-input v-model="comparisonForm.valueExpression" type="textarea" :rows="3" show-word-limit maxlength="1000"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelNode">取 消</el-button>
        <el-button type="primary" @click="addComparison('comparisonForm')" v-if="comparisonForm.index == undefined">确 定</el-button>
        <el-button type="primary" @click="editComparison('comparisonForm')" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {queryVariableList, createVariable, editVariable, deleteComparisonInfo} from '@/api/conditionVariable'
  var comparisonSymbolList = [
    {comparisonName: "大于", comparisonSymbol: '>', valueExpression: 'INPUT_VALUE'},
    {comparisonName: "大于等于", comparisonSymbol: '>=', valueExpression: 'INPUT_VALUE'},
    {comparisonName: "小于", comparisonSymbol: '<', valueExpression: 'INPUT_VALUE'},
    {comparisonName: "小于等于", comparisonSymbol: '<=', valueExpression: 'INPUT_VALUE'},
    {comparisonName: "等于", comparisonSymbol: '=', valueExpression: 'INPUT_VALUE'},
  ]
  export default {
    data(){
      return{
        varForm: {
          comparisonList: comparisonSymbolList,
        },
        comparisonForm: {},
        rules:{
          varName: [
            {required: true, message: '请输入变量名称', trigger: 'blur'}
          ],
          varValue: [
            {required: true, message: '请输入变量值', trigger: 'blur'}
          ],
          comparisonList: [
            {required: true, message: '请添加比较符号', trigger: 'blur'}
          ],
        },
        nodeRules:{
          comparisonName: [
            {required: true, message: '请输入符号名称', trigger: 'blur'}
          ],
          comparisonSymbol: [
            {required: true, message: '请输入符号值', trigger: 'blur'}
          ],
          valueExpression: [
            {required: true, message: '请输入符比较值表达式', trigger: 'blur'}
          ],
        },
        tableData:[],
        dialogVisible: false,
        varId:'',
        allowGetList: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','POLICY:CONDITION:VARIABLE','POLICY:CONDITION:VARIABLE:LIST'),//变量列表
        allowAdd: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','POLICY:CONDITION:VARIABLE','POLICY:CONDITION:VARIABLE:ADD'),//新增变量
        allowUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','POLICY:CONDITION:VARIABLE','POLICY:CONDITION:VARIABLE:EDIT'),//编辑变量
        allowDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','POLICY:CONDITION:VARIABLE','POLICY:CONDITION:VARIABLE:DELETE'),//删除变量
      }
    },
    mounted() {
      if(this.$route.query.varId){
        this.varId = this.$route.query.varId;
        this.getDetail();
      }
    },
    methods:{

      //获取详情
      getDetail(){
        if(!this.allowGetList.twoAllow){
          this.$message.warning('抱歉，您没有权限获取此详情');
          return;
        }
        let params = {
          page:0,
          pageSize:10,
          varId: this.varId
        }
        queryVariableList(params).then(res=>{
          if(res.code === 200){
            this.varForm = res.data.data[0]
          }else{
            this.$message.warning(res.message)
          }
        })
      },

      //新建变量
      addVar(formName){
        this.varForm.comparisonList.forEach((item,index)=>{
          item.sortNum = index + 1;
        })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.varForm.page = 0
            this.varForm.pageSize = 10
            createVariable(this.varForm).then(res=>{
              if(res.code === 200){
                this.$message.success('新建成功');
                this.$router.push("/backend/conditionVariable")
              }else{
                this.$message.warning(res.message)
              }
            })
          }
        })
      },

      //修改变量
      editVar(formName){
        this.varForm.comparisonList.forEach((item,index)=>{
          item.sortNum = index + 1
        })
        if(!this.allowUpdate.twoAllow){
          this.$message.warning('抱歉，您没有此权限');
          return;
        }
        this.varForm.page = 0
        this.varForm.pageSize = 10
        editVariable(this.varForm).then(res=>{
          if(res.code == 200){
            this.$message.success('修改成功');
            this.$router.push("/backend/conditionVariable")
          } else {
            this.$message.warning(res.message)
          }
        })

      },

      //新建比较符号
      addComparison(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.varForm.comparisonList.push(this.comparisonForm)
            this.varForm.comparisonList.forEach((item, index)=>{
              item.sortNum = index + 1
            })
            this.dialogVisible = false;
          }
        })
      },

      //确定编辑比较符号
      editComparison(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let arr = this.varForm.comparisonList.map((item,index)=>{
              if(index === this.comparisonForm.index){
                item = this.comparisonForm
                delete item.index
              }
              return item
            })
            this.varForm.comparisonList = JSON.parse(JSON.stringify(arr))
            this.dialogVisible = false;
          }
        })
      },

      //  点击编辑符号
      editorComparison(row, index){
        row.index = index;
        this.comparisonForm = JSON.parse(JSON.stringify(row));
        this.dialogVisible = true;
      },

      //打开弹窗
      openAddNode(){
        this.dialogVisible = true;
      },

      //关闭弹窗
      cancelNode(){
        this.dialogVisible = false;
        this.comparisonForm = {};
      },

      // 删除比较符号
      deleteComparison(item, index){
        this.$confirm('是否确定删除此比较符', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(item.comparisonId){
            deleteComparisonInfo({comparisonId: item.comparisonId}).then(res=>{
              if(res.code === 200){
                this.varForm.comparisonList.splice(index,1)
                this.$message.success('删除成功');
              }
            })
          } else {
            this.varForm.comparisonList.splice(index,1)
            this.$message.success('删除成功');
          }
        })
      },

      // 返回
      cancelSub() {
        this.varForm = { comparisonList: comparisonSymbolList }
        this.comparisonForm = {};
        this.$router.push("/backend/conditionVariable")
      }
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
