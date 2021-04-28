<template>
  <div class="app-container">
    <el-card class="box-card box-margin">
      <div slot="header" class="clearfix headerTop">
        <span>企业支付</span>
      </div>
      <div class="addUserContent">
        <el-form ref="payForm" :model="payForm" :rules="rules" class="demo-ruleForm">
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业名称:" prop="companyName">
                <span>{{payForm.companyName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="原价:" prop="costPrice">
                <el-input size='small' type="number" v-model="payForm.costPrice" placeholder="请输入原价" @input.native="inputXz">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="现价:" prop="salePrice">
                <el-input size='small' type="number" v-model="payForm.salePrice" placeholder="请输入现价" @input.native="inputXz">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="年数:" prop="buyYears">
                <el-input size='small' v-model="payForm.buyYears" placeholder="请输入年数" maxlength="2"
                          @keyup.native="handleInput(0)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="折扣:" prop="discountDecimal">
                <el-input size='small' v-model="payForm.discountDecimal" placeholder="请输入折扣" maxlength="3" @input.native="inputXz($event,1)">
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="应付款:" prop="payableMoney">
<!--                <el-input size='small' type="number" v-model="payForm.payableMoney" placeholder="请输入应付款" @input.native="inputXz">-->
<!--                  <template slot="append">元</template>-->
<!--                </el-input>-->
                <span>
                  {{isNaN(payForm.salePrice * payForm.buyYears * (payForm.discountDecimal / 100)) ? 0 : payForm.salePrice * payForm.buyYears * (payForm.discountDecimal / 100)}}元
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="实际支付款:" prop="payMoney">
                <el-input size='small' type="number" v-model="payForm.payMoney" placeholder="请输入实际支付款" @input.native="inputXz">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="业务员:" prop="salenameUserId">
                <el-select size='small' v-model="payForm.salenameUserId" filterable placeholder="请选择业务员" @change="saleChange" clearable>
                  <el-option
                    v-for="items in saleList"
                    :key="items.userId"
                    :label="items.userName"
                    :value="items.userId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开发票:" prop="isMakeInvoice">
                <el-select size='small' v-model="payForm.isMakeInvoice" placeholder="请选择" clearable>
                  <el-option
                    v-for="items in invoiceList"
                    :key="items.id"
                    :label="items.invName"
                    :value="items.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="支付方式:" prop="payType">
                <el-select size='small' v-model="payForm.payType" placeholder="请选择支付方式" clearable>
                  <el-option
                    v-for="items in payList"
                    :key="items.dictValue"
                    :label="items.dictName"
                    :value="items.dictValue">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="支付账号:" prop="payAccount">
                <el-input size='small' v-model="payForm.payAccount" placeholder="请输入支付账号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="促销活动:" prop="salePromotion">
<!--                <el-input size='small' type="textarea" :rows="4" v-model="payForm.salePromotion" placeholder="请输入促销活动"></el-input>-->
                <EditorText :id="editor1" :value="payForm.salePromotion" ref="editor" @changeValue="changeValue($event,0)"></EditorText>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注:" prop="payDesc">
<!--                <el-input size='small' type="textarea" :rows="4" v-model="payForm.payDesc" placeholder="请输入备注"></el-input>-->
                <EditorText :id="editor2" :value="payForm.payDesc" ref="editor2" @changeValue="changeValue($event,1)"></EditorText>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btnList">
          <el-button size="small" type="primary" @click="addPayData('payForm')" v-if="allowPay.twoAllow">确定</el-button>
          <el-button size="small" @click="cancelSub">取消</el-button>
        </div>
      </div>
      <div class="addUserContent">
        <h3 style="font-weight: normal;font-size:16px;color:#818181;">{{payForm.companyName}}历史支付信息</h3>
        <el-table :data="payRordList" v-loading="listLoading" border fit highlight-current-row>
          <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
          <el-table-column align="center" min-width="100px" label="支付时间" prop="payTime">
            <template slot-scope="scope">
              <span>{{scope.row.payTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="原价" prop="costPrice">
            <template slot-scope="scope">
              <span v-if="!scope.row.inputShow">{{scope.row.costPrice}}元</span>
              <el-input v-else size='small' type="number" v-model="scope.row.costPrice" placeholder="请输入原价" @input.native="inputXz">
                <template slot="append">元</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="现价" prop="companyCode">
            <template slot-scope="scope">
              <span v-if="!scope.row.inputShow">{{scope.row.salePrice}}元</span>
              <el-input v-else size='small' type="number" v-model="scope.row.salePrice" placeholder="请输入现价" @input.native="inputXz">
                <template slot="append">元</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="年数" prop="buyYears">
            <template slot-scope="scope">
              <span v-if="!scope.row.inputShow">{{scope.row.buyYears}}</span>
              <el-input v-else size='small' v-model="scope.row.buyYears" placeholder="请输入年数" @keyup.native="handleInput(1,scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="折扣" prop="discountDecimal">
            <template slot-scope="scope">
              <span v-if="!scope.row.inputShow">{{scope.row.discountDecimal}}%</span>
              <el-input v-else size='small' v-model="scope.row.discountDecimal" placeholder="请输入折扣" @input.native="inputXz($event,1,scope.row)">
                <template slot="append">%</template>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="金额" prop="payMoney">
            <template slot-scope="scope">
              <span>{{scope.row.salePrice * scope.row.buyYears * (scope.row.discountDecimal / 100)}}元</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="业务员" prop="salemanUserName">
            <template slot-scope="scope">
              <span v-if="!scope.row.inputShow">{{scope.row.salemanUserName}}</span>
              <el-select v-else size='small' v-model="scope.row.salenameUserId" filterable placeholder="请选择业务员" @change="saleChange" clearable>
                <el-option
                  v-for="items in saleList"
                  :key="items.userId"
                  :label="items.userName"
                  :value="items.userId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="开发票" prop="isMakeInvoice">
            <template slot-scope="scope">
              <span v-if="!scope.row.inputShow">{{scope.row.isMakeInvoice == 1 ? '已开票' : scope.row.isMakeInvoice == 2 || scope.row.isMakeInvoice == null ? '未开票' : ''}}</span>
              <el-select v-else size='small' v-model="scope.row.isMakeInvoice" placeholder="请选择" clearable>
                <el-option
                  v-for="items in invoiceList"
                  :key="items.id"
                  :label="items.invName"
                  :value="items.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="100px" label="审核状态" prop="isMakeInvoice">
            <template slot-scope="scope">
              <span>{{scope.row.isConfirm == 0 || scope.row.isConfirm == null ? '未审核' : scope.row.isConfirm == 1 ? '通过' : scope.row.isConfirm == 2 ? '不通过' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200px" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <span class="spanButton col_skyblue" @click="handleExamine(scope.row)" v-if="scope.row.isConfirm == 0 || scope.row.isConfirm == null">审核</span>
              <span class="shu" v-if="scope.row.isConfirm == 0 || scope.row.isConfirm == null">|</span>
              <div style="display: inline-block" v-if="scope.row.isConfirm != 1  && allowPayUpdate.twoAllow">
                <span v-if="!scope.row.inputShow" class="spanButton col_skyblue" @click="eidtRecord(scope.row)">编辑</span>
                <span v-else class="spanButton col_skyblue" @click="confirmEdit(scope.row)">确定</span>
                <span class="shu" v-if="scope.row.inputShow">|</span>
                <span v-if="scope.row.inputShow" class="spanButton col_red" @click="cancelEdit(scope.row)">取消</span>
              </div>
              <span class="shu" v-if="(scope.row.isConfirm == 0 || scope.row.isConfirm == null) && allowPayDelete.twoAllow">|</span>
              <el-popconfirm
                v-if="(scope.row.isConfirm == 0 || scope.row.isConfirm == null) && allowPayDelete.twoAllow"
                @onConfirm="deleteRecord(scope.row)"
                confirmButtonText='好的'
                cancelButtonText='取消'
                icon="el-icon-info"
                iconColor="red"
                title="是否确定删除？"
              >
                <span class="spanButton col_red" slot="reference">删除</span>
              </el-popconfirm>
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
                         :current-page="page"
                         :page-size="pageSize"
                         :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {savePay,queryhistorypay,deletePay,confirmPay,notconfirm,updatePay} from '@/api/enterpriseMsg'
  import {queryUserRoleByCompanyId,commonDict} from '@/api/utils'
  import EditorText from '@/components/EditorText/index'

  export default {
    components: {
      EditorText,
    },
    data(){
      return{
        payForm:{
          companyId:'',
          companyName:'',
        },
        listLoading:false,
        saleList:[
          {userId:1,userName:'至秦'}
        ],
        payList:[
          {dictValue:1,dictName:'现金'},
          {dictValue:2,dictName:'微信'},
          {dictValue:3,dictName:'支付宝'},
          {dictValue:4,dictName:'银行转账'},
          {dictValue:5,dictName:'其他'}
        ],
        invoiceList:[
          {id:1,invName:'已开票'},
          {id:2,invName:'未开票'}
        ],
        rules:{
          companyName: [
            {required: true, message: '公司名称不能为空', trigger: 'blur'},
          ],
          costPrice: [
            {required: true, message: '原价不能为空', trigger: 'blur'},
          ],
          salePrice: [
            {required: true, message: '现价不能为空', trigger: 'blur'},
          ],
          buyYears: [
            {required: true, message: '年数不能为空', trigger: 'blur'},
          ],
          discountDecimal: [
            {required: true, message: '折扣数不能为空', trigger: 'blur'},
          ],
          // payableMoney: [
          //   {required: true, message: '应付款不能为空', trigger: 'blur'},
          // ],
          payMoney: [
            {required: true, message: '实际支付款不能为空', trigger: 'blur'},
          ],
          salenameUserId: [
            {required: true, message: '业务员不能为空', trigger: 'blur'},
          ],
          payType: [
            {required: true, message: '支付方式不能为空', trigger: 'blur'},
          ],
        },

        payRordList:[],
        page:1,
        pageSize:3,
        total:10,
        editor1:'editor1',
        editor2:'editor2',
        allowPay: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:COMAPNY:LISTMENU','SYSTEM:COMPANY:PAYMENT:PAY'),
        allowPayUpdate: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:COMAPNY:LISTMENU','SYSTEM:COMPANY:PAYMENT:UPDATE'),
        allowPayConfirm: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:COMAPNY:LISTMENU','SYSTEM:COMPANY:PAYMENT:CONFIRM'),
        allowPayNotConfirm: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:COMAPNY:LISTMENU','SYSTEM:COMPANY:PAYMENT:NOTCONFIRM'),
        allowPayDelete: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:COMAPNY:LISTMENU','SYSTEM:COMPANY:PAYMENT:DELETE'),
        allowPayHistory: this.authorityControl('SYSTEM:BACKGROUND:MANAGE','SYSTEM:COMAPNY:LISTMENU','SYSTEM:COMPANY:PAYMENT:QUERYHISTORY'),
      }
    },
    activated() {
      this.payForm.companyId = this.$route.query.companyId;
      this.payForm.companyName = this.$route.query.companyName;
      this.getSaleList();
      this.getCommonData();
      if(this.allowPayHistory.twoAllow){
        this.getRordList();
      }

      this.$refs.editor.initCKEditor()
      this.$refs.editor2.initCKEditor()

    },
    methods:{
      //接收和更新富文本值
      changeValue($event,num) {
        if(num == 0){
          this.payForm.salePromotion = $event
        }else{
          this.payForm.payDesc = $event
        }
      },
      //获取业务员列表
      getSaleList(){
        var params = {
          roleName:'业务员',
          companyId: this.$store.getters.companyId
        }
        queryUserRoleByCompanyId(params).then(res=>{
          if(res.code == 200){
            this.saleList = res.data;
          } else {
            this.$message({type: 'warning', message: res.message})
          }
        })
      },
      //获取字典数据
      getCommonData() {
        var params = {
          keyList: 'DICT:PAY_TYPE',
        };
        commonDict(params).then(res => {
          if (res.code == 200) {
            this.payList = res.data['DICT:PAY_TYPE']
          } else {
            this.$message({type: 'error', message: res.message});
          }
        })
      },
      //新建支付
      addPayData(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.payForm.payableMoney = this.payForm.salePrice * this.payForm.buyYears * (this.payForm.discountDecimal / 100)
            let params = {
              companyId:this.payForm.companyId,
              companyName:this.payForm.companyName,
              buyYears:this.payForm.buyYears,
              costPrice:this.payForm.costPrice,
              discountDecimal:this.payForm.discountDecimal,
              isMakeInvoice:this.payForm.isMakeInvoice,
              payAccount:this.payForm.payAccount,
              payDesc:this.payForm.payDesc,
              payMoney:this.payForm.payMoney,
              payType:this.payForm.payType,
              payableMoney:this.payForm.payableMoney,
              salePrice:this.payForm.salePrice,
              salePromotion:this.payForm.salePromotion,
              salemanUserName:this.payForm.salemanUserName,
              salenameUserId:this.payForm.salenameUserId
            }

            savePay(params).then(res=>{
              if (res.code == 200) {
                this.$message({type: 'success', message: '新建成功'});
                this.payForm = {};
                this.$refs.editor.destroyEditor();
                this.$refs.editor2.destroyEditor();
                this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route,'/backend/enterpriseList');
              } else {
                this.$message({type: 'warning', message: res.message})
              }
            })
          }
        })
      },

      //获取历史支付列表
      getRordList(){
        var params = {
          companyId: this.payForm.companyId,
          page:this.page,
          pageSize:this.pageSize
        }
        queryhistorypay(params).then(res=>{
          if (res.code == 200) {
            this.payRordList = res.data.data;
            this.payRordList.forEach(item=>{
              item.inputShow = false;
            })
            this.total = Number(res.data.total);
            this.page = res.data.pageNum
            this.pageSize = res.data.pageSize
          } else {
            this.$message({type: 'warning', message: res.message})
          }
        })
      },

      // 审核
      handleExamine(row) {
        this.$confirm('你确定审核通过吗？确定后即可生效。', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '通过',
          cancelButtonText: '不通过',
          type: 'warning',
          closeOnClickModal: false,
        }).then(() => {
          if(this.allowPayConfirm.twoAllow){
            var params = {
              companyId: row.companyId,
              payId: row.payId
            }
            confirmPay(params).then(res=>{
              if (res.code == 200) {
                this.$message({type: 'success', message: '审核通过'});
                this.getRordList();
              } else {
                this.$message({type: 'warning', message: res.message})
              }
            })
          }else{
            this.$message.warning('抱歉，您没有此操作权限')
          }
        }).catch((action) => {
          if(action != 'close'){
            if(this.allowPayNotConfirm.twoAllow){
              var params = {
                companyId: row.companyId,
                payId: row.payId
              }
              notconfirm(params).then(res=>{
                if (res.code == 200) {
                  this.$message({type: 'warning', message: '审核不通过'});
                  this.getRordList();
                } else {
                  this.$message({type: 'warning', message: res.message})
                }
              })
            }else{
              this.$message.warning('抱歉，您没有此操作权限')
            }
          }
        })
      },

      //修改记录
      eidtRecord(row){
        row.inputShow = true;
      },

      //取消修改
      cancelEdit(row){
        row.inputShow = false;
        this.getRordList();
      },

      //确定修改
      confirmEdit(row){
        row.companyId = this.payForm.companyId;
        updatePay(row).then(res=>{
          if (res.code == 200) {
            this.$message({type: 'success', message: '修改成功'});
            this.getRordList();
          } else {
            this.$message({type: 'warning', message: res.message})
          }
        })
      },

      //删除支付记录
      deleteRecord(row){
        var params = {
          payId: row.payId
        }
        deletePay(params).then(res=>{
          if (res.code == 200) {
            this.$message({type: 'success', message: '删除成功'});
            this.getRordList();
          } else {
            this.$message({type: 'warning', message: res.message})
          }
        })
      },

      saleChange(e){
        this.saleList.forEach(item=>{
          if(item.userId == e){
            this.payForm.salemanUserName = item.userName
          }
        })
      },

      //限制输入 num:1 折扣
      inputXz(e,num,row){
        if(num == 1){
          if(e.target.value >= 100){
            e.target.value = 100;
          }
          if(row){
            if(e.target.value >= 100){
              row.discountDecimal = 100
            }
          }
        }
        e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      },

      //限制首位字符不能为0和-号
      handleInput(num,row) {
        if(num == 0){
          let str = '' + this.payForm.buyYears;
          if(str.indexOf('0') == 0){
            this.payForm.buyYears = '';
          }
          if(str.indexOf('-') == 0){
            this.payForm.buyYears = '';
          }
          if (str.indexOf('.') != -1) {
            let arr = str.split('');
            arr.splice(arr.length - 1);
            let str2 = arr.join('');
            this.payForm.buyYears = +str2;
          }
        }else{
          let str = '' + row.buyYears;
          if(str.indexOf('0') == 0){
            row.buyYears = '';
          }
          if(str.indexOf('-') == 0){
            row.buyYears = '';
          }
          if (str.indexOf('.') != -1) {
            let arr = str.split('');
            arr.splice(arr.length - 1);
            let str2 = arr.join('');
            row.buyYears = +str2;
          }
        }
      },

      // 分页 -- 改变每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.getRordList();
      },

      // 分页 -- 改变当前页码
      handleCurrentChange(val) {
        this.page = val
        this.getRordList();
      },

      // 返回
      cancelSub() {
        this.payForm = {};
        this.$refs.editor.destroyEditor();
        this.$refs.editor2.destroyEditor();
        this.closeCurrent(this.$store.state.tagsView.visitedViews, this.$route);
      }
    }
  }
</script>

<style scoped>
  /*修改列表页面表格样式*/
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

  /deep/ .el-form-item {
    display: flex;
    margin-right: 115px;
  }

  /deep/ .el-form-item__content {
    flex: 1;
    width: 100%;
    display: flex;
  }

  /deep/ .el-form-item__label {
    min-width: 127px;
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

  .addRoleDept {
    display: flex;
  }

  .otherDept {
    border: 1px solid #C0C4CC;
    padding: 10px;
    border-radius: 4px;
    flex: 1;
    margin-right: 15px;
    display: flex;
    flex-wrap: wrap;
  }

  .chooseBox {
    background: #FD903C;
    color: #fff;
    line-height: normal;
    padding: 5px 10px;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .chooseBox:last-child {
    margin-right: 0;
  }

  .chooseBox i {
    cursor: pointer;
  }

  .addBtn {
    height: 35px;
    font-size: 16px;
  }

  .text-right {
    text-align: right;
  }
</style>
