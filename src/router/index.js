import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRouterMap = [
  {
    name: '登陆',
    path: '/login',
    // component: () => import('@/views/login/index'),
    component: resolve => require(['@/views/login/index'], resolve)
    // hidden: true
  },
  {
    name: '注册',
    path: '/register',
    // component: () => import('@/views/register/index'),
    component: resolve => require(['@/views/register/index'], resolve),
    hidden: true
  },
  {
    name: '邀请加入',
    path: '/registerJoin',
    // component: () => import('@/views/register/index'),
    component: resolve => require(['@/views/register/index'], resolve),
    hidden: true
  },
  {
    name: '邀请加入',
    path: '/invitationJoin',
    // component: () => import('@/views/register/invitationJoin'),
    component: resolve => require(['@/views/register/invitationJoin'], resolve),
    hidden: true,
  },
  {
    path: '/404',
    // component: () => import('@/views/404'),
    component: resolve => require(['@/views/404'], resolve),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '成果云后台管理系统',
      component: resolve => require(['@/views/dashboard/home/index'], resolve),
    },{
      path: '/dashboard/policyDetail',
      name: '政策条件',
      // component: () => import('@/views/dashboard/home/policy_detail'),
      component: resolve => require(['@/views/dashboard/home/policy_detail'], resolve),
    }]
  },
  {
    path: '/tips',
    component: Layout,
    redirect: '/tips',
    children: [{
      path: '/tips',
      name: '提示',
      // component: () => import('@/views/tips')
      component: resolve => require(['@/views/tips'], resolve),
    }]
  },

  {
    path: '/userInfo',
    component: Layout,
    redirect: {path: '/userInfo'},
    children: [{
      path: '/userInfo',
      name: '个人信息',
      // component: () => import('@/views/login/userInfo'),
      component: resolve => require(['@/views/login/userInfo'], resolve),
    }]
  },
  {
    path: '/changePhone',
    component: Layout,
    redirect: {path: '/changePhone'},
    children: [{
      path: '/changePhone',
      name: '更换手机号码',
      // component: () => import('@/views/login/changePhone'),
      component: resolve => require(['@/views/login/changePhone'], resolve),
    }]
  },
  {
    path: '/policy',
    component: Layout,
    redirect: { path: '/policy' },
    children: [{
      path: '/policy',
      name: '政策通知',
      // component: () => import('@/views/policy/index')
      component: resolve => require(['@/views/policy/index'], resolve),
    },{
      path: '/policy/addPolicy',
      name: '新建政策通知',
      // component: () => import('@/views/policy/addPolicy')
      component: resolve => require(['@/views/policy/addPolicy'], resolve),
    },{
      path: '/policy/editPolicy',
      name: '编辑政策通知',
      // component: () => import('@/views/policy/addPolicy')
      component: resolve => require(['@/views/policy/addPolicy'], resolve),
    },{
      path: '/policy/detailPolicy',
      name: '政策通知详情',
      // component: () => import('@/views/policy/addPolicy')
      component: resolve => require(['@/views/policy/addPolicy'], resolve),
    },{
      path: '/policy/project/list',
      name: '项目库管理',
      // component: () => import('@/views/policy/projectManage/index')
      component: resolve => require(['@/views/policy/projectManage/index'], resolve),
    },{
      path: '/policy/project/create',
      name: '创建项目',
      // component: () => import('@/views/policy/projectManage/addProject')
      component: resolve => require(['@/views/policy/projectManage/addProject'], resolve),
    },{
      path: '/policy/project/detail',
      name: '查看项目',
      // component: () => import('@/views/policy/projectManage/addProject')
      component: resolve => require(['@/views/policy/projectManage/addProject'], resolve),
    },{
      path: '/policy/project/edit',
      name: '编辑项目',
      // component: () => import('@/views/policy/projectManage/addProject')
      component: resolve => require(['@/views/policy/projectManage/addProject'], resolve),
    },{
      path: '/policy/project/collect',
      name: '进度资料收集',
      // component: () => import('@/views/policy/projectManage/collect')
      component: resolve => require(['@/views/policy/projectManage/collect'], resolve),
    },{
      path: '/policy/project/addFreeOrder',
      name: '创建免费订单-选择企业',
      // component: () => import('@/views/policy/projectManage/collect')
      component: resolve => require(['@/views/policy/projectManage/addFreeOrder'], resolve),
    },{
      path: '/policy/project/matchingCompany',
      name: '匹配企业',
      // component: () => import('@/views/policy/projectManage/collect')
      component: resolve => require(['@/views/policy/projectManage/matchingCompany'], resolve),
    }]
  },
  {
    path: '/approvalCollaborative',
    component: Layout,
    redirect: { path: '/approvalCollaborative' },
    children: [{
      path: '/approvalCollaborative',
      name: '立项管理',
      // component: () => import('@/views/approvalCollaborative/index')
      component: resolve => require(['@/views/approvalCollaborative/index'], resolve),
    },{
      path: '/approvalCollaborative/approvalDetail',
      name: '立项详情',
      component: resolve => require(['@/views/approvalCollaborative/approvalDetail'], resolve),
    },{
      path: '/approvalCollaborative/publicityResult',
      name: '公示结果',
      // component: () => import('@/views/approvalCollaborative/publicityResult/index')
      component: resolve => require(['@/views/approvalCollaborative/publicityResult/index'], resolve),
    },{
      path: '/approvalCollaborative/publicityResult/addPublic',
      name: '新建/编辑公示',
      // component: () => import('@/views/approvalCollaborative/publicityResult/addPublic')
      component: resolve => require(['@/views/approvalCollaborative/publicityResult/addPublic'], resolve),
    },{
      path: '/approvalCollaborative/publicityResult/checkPublic',
      name: '查看公示',
      // component: () => import('@/views/approvalCollaborative/publicityResult/addPublic')
      component: resolve => require(['@/views/approvalCollaborative/publicityResult/addPublic'], resolve),
    }]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: { path: '/customer' },
    children: [{
      path: '/customer',
      name: '客户中心',
      // component: () => import('@/views/customerManage/customerCenter/index')
      component: resolve => require(['@/views/customerManage/customerCenter/index'], resolve),
    },{
      path: '/customer/addCustomer',
      name: '新增企业',
      // component: () => import('@/views/customerManage/customerCenter/addCustomer')
      component: resolve => require(['@/views/customerManage/customerCenter/addCustomer'], resolve),
    },{
      path: '/customer/addCustomerPerson',
      name: '新增个人',
      // component: () => import('@/views/customerManage/customerCenter/addCustomer')
      component: resolve => require(['@/views/customerManage/customerCenter/addCustomer'], resolve),
    },{
      path: '/customer/editCustomer',
      name: '查看/编辑企业',
      // component: () => import('@/views/customerManage/customerCenter/addCustomer')
      component: resolve => require(['@/views/customerManage/customerCenter/addCustomer'], resolve),
    },{
      path: '/customer/certificateForm',
      name: '客户中心-证书详情',
      // component: () => import('@/views/customerManage/customerCenter/addCustomer')
      component: resolve => require(['@/views/customerManage/customerCenter/certificateForm'], resolve),
    },{
      path: '/customer/copyrightForm',
      name: '客户中心-著作权详情',
      // component: () => import('@/views/customerManage/customerCenter/addCustomer')
      component: resolve => require(['@/views/customerManage/customerCenter/copyrightForm'], resolve),
    },{
      path: '/customer/patentForm',
      name: '客户中心-专利详情',
      // component: () => import('@/views/customerManage/customerCenter/addCustomer')
      component: resolve => require(['@/views/customerManage/customerCenter/patentForm'], resolve),
    },{
      path: '/customer/trademarkForm',
      name: '客户中心-商标详情',
      // component: () => import('@/views/customerManage/customerCenter/addCustomer')
      component: resolve => require(['@/views/customerManage/customerCenter/trademarkForm'], resolve),
    },{
      path: '/customer/salesPlan',
      name: '销售计划',
      // component: () => import('@/views/customerManage/salesPlan/index')
      component: resolve => require(['@/views/customerManage/salesPlan/index'], resolve),
    },{
      path: '/customer/salesPlanDetail',
      name: '查看计划',
      // component: () => import('@/views/customerManage/salesPlan/form')
      component: resolve => require(['@/views/customerManage/salesPlan/form'], resolve),
    },{
      path: '/customer/performanceManagement',
      name: '绩效管理',
      // component: () => import('@/views/customerManage/performance_management/list')
      component: resolve => require(['@/views/customerManage/performance_management/list'], resolve),
    },{
      path: '/customer/performanceManagement/form',
      name: '新增绩效',
      // component: () => import('@/views/customerManage/performance_management/form')
      component: resolve => require(['@/views/customerManage/performance_management/form'], resolve),
    },{
      path: '/customer/serviceTrace/list',
      name: '需求投诉',
      // component: () => import('@/views/customerManage/serviceTrace/list')
      component: resolve => require(['@/views/customerManage/serviceTrace/list'], resolve),
    },{
      path: '/customer/serviceTrace/form',
      name: '查看详情',
      // component: () => import('@/views/customerManage/serviceTrace/form')
      component: resolve => require(['@/views/customerManage/serviceTrace/form'], resolve),
    },{
      path: '/customer/cashBackPlan',
      name: '回款计划',
      // component: () => import('@/views/customerManage/cashBackPlan/index')
      component: resolve => require(['@/views/customerManage/cashBackPlan/index'], resolve),
    },{
      path: '/customer/messageMassSend',
      name: '短信群发',
      // component: () => import('@/views/customerManage/cashBackPlan/index')
      component: resolve => require(['@/views/customerManage/messageMassSend/index'], resolve),
    },{
      path: '/customer/messageMassSend/addNewMessage',
      name: '选择发送企业',
      // component: () => import('@/views/customerManage/cashBackPlan/index')
      component: resolve => require(['@/views/customerManage/messageMassSend/addNewMessage'], resolve),
    }]
  },

  {
    path: '/enterprise',
    component: Layout,
    redirect: { path: '/enterprise'},
    children: [
      {
        path: '/enterprise/list',
        name: '基础信息',
        // component: () => import('@/views/project/apply_account/list')
        component: resolve => require(['@/views/enterprise_info/enterprise_msg/list'], resolve),
      },
    ]
  },

  {
    path: '/ipr',
    component: Layout,
    redirect: { path: '/ipr' },
    children: [
      {
        path: '/ipr/patent/list',
        name: '专利列表',
        // component: () => import('@/views/ipr/v2/patent/list')
        component: resolve => require(['@/views/ipr/v2/patent/list'], resolve),
      },
      {
        path: '/ipr/patent/form/add',
        name: '新增专利',
        // component: () => import('@/views/ipr/v2/patent/form')
        component: resolve => require(['@/views/ipr/v2/patent/form'], resolve),
      },
      {
        path: '/ipr/patent/form/edit',
        name: '编辑专利',
        // component: () => import('@/views/ipr/v2/patent/form')
        component: resolve => require(['@/views/ipr/v2/patent/form'], resolve),
      },
      {
        path: '/ipr/patent/form/detail',
        name: '专利详情',
        // component: () => import('@/views/ipr/v2/patent/form')
        component: resolve => require(['@/views/ipr/v2/patent/form'], resolve),
      },
      {
        path: '/ipr/copyright/list',
        name: '著作权',
        // component: () => import('@/views/ipr/v2/copyright/list')
        component: resolve => require(['@/views/ipr/v2/copyright/list'], resolve),
      },
      {
        path: '/ipr/copyright/form/add',
        name: '新增著作权',
        // component: () => import('@/views/ipr/v2/copyright/form')
        component: resolve => require(['@/views/ipr/v2/copyright/form'], resolve),
      },
      {
        path: '/ipr/copyright/form/edit',
        name: '编辑著作权',
        // component: () => import('@/views/ipr/v2/copyright/form')
        component: resolve => require(['@/views/ipr/v2/copyright/form'], resolve),
      },
      {
        path: '/ipr/copyright/form/detail',
        name: '著作权详情',
        // component: () => import('@/views/ipr/v2/copyright/form')
        component: resolve => require(['@/views/ipr/v2/copyright/form'], resolve),
      },
      {
        path: '/ipr/trademark/list',
        name: '商标',
        // component: () => import('@/views/ipr/v2/trademark/list')
        component: resolve => require(['@/views/ipr/v2/trademark/list'], resolve),
      },
      {
        path: '/ipr/trademark/form/add',
        name: '新增商标',
        // component: () => import('@/views/ipr/v2/trademark/form')
        component: resolve => require(['@/views/ipr/v2/trademark/form'], resolve),
      },
      {
        path: '/ipr/trademark/form/edit',
        name: '编辑商标',
        // component: () => import('@/views/ipr/v2/trademark/form')
        component: resolve => require(['@/views/ipr/v2/trademark/form'], resolve),
      },
      {
        path: '/ipr/trademark/form/detail',
        name: '商标详情',
        // component: () => import('@/views/ipr/v2/trademark/form')
        component: resolve => require(['@/views/ipr/v2/trademark/form'], resolve),
      },
      {
        path: '/ipr/certificate/list',
        name: '企业证书',
        // component: () => import('@/views/ipr/v2/certificate/list')
        component: resolve => require(['@/views/ipr/v2/certificate/list'], resolve),
      },
      {
        path: '/ipr/certificate/form/add',
        name: '新增证书',
        // component: () => import('@/views/ipr/v2/certificate/form')
        component: resolve => require(['@/views/ipr/v2/certificate/form'], resolve),
      },
      {
        path: '/ipr/certificate/form/edit',
        name: '编辑证书',
        // component: () => import('@/views/ipr/v2/certificate/form')
        component: resolve => require(['@/views/ipr/v2/certificate/form'], resolve),
      },
      {
        path: '/ipr/certificate/form/detail',
        name: '证书详情',
        // component: () => import('@/views/ipr/v2/certificate/form')
        component: resolve => require(['@/views/ipr/v2/certificate/form'], resolve),
      },
    ]
  },

  {
    path: '/project',
    component: Layout,
    redirect: { path: '/project'},
    children: [
      {
        path: '/project/account/list',
        name: '申报账号管理',
        // component: () => import('@/views/project/apply_account/list')
        component: resolve => require(['@/views/project/apply_account/list'], resolve),
      },
    ]
  },

  {
    path: '/message',
    component: Layout,
    redirect: { path: '/message'},
    children: [
      {
        path: '/message/list',
        name: '消息中心',
        // component: () => import('@/views/enterprise_info/message_center/head_tab')
        component: resolve => require(['@/views/enterprise_info/message_center/head_tab'], resolve),
      },
    ]
  },

  {
    path: '/declareCoordination/orderManage',
    component: Layout,
    redirect: { path: '/declareCoordination/orderManage' },
    children: [{
      path: '/declareCoordination/orderManage',
      name: '订单管理',
      // component: () => import('@/views/declareCoordination/orderManage/index')
      component: resolve => require(['@/views/declareCoordination/orderManage/index'], resolve),
    },{
      path: '/declareCoordination/orderManage/orderDetail',
      name: '查看订单',
      // component: () => import('@/views/declareCoordination/orderManage/orderDetail')
      component: resolve => require(['@/views/declareCoordination/orderManage/orderDetail'], resolve),
    },{
      path: '/declareCoordination/orderArrange',
      name: '订单安排统计',
      // component: () => import('@/views/declareCoordination/orderArrange/index')
      component: resolve => require(['@/views/declareCoordination/orderArrange/index'], resolve),
    },{
      path: '/declareCoordination/orderSigned',
      name: '签单统计',
      // component: () => import('@/views/declareCoordination/orderManage/orderDetail')
      component: resolve => require(['@/views/declareCoordination/orderSigned/index'], resolve),
    },{
      path: '/declareCoordination/orderRepair',
      name: '工单统计',
      // component: () => import('@/views/declareCoordination/orderArrange/index')
      component: resolve => require(['@/views/declareCoordination/orderRepair/index'], resolve),
    }

    ,{
      path: '/declareCoordination/orderSales',
      name: '销售实施统计',
      // component: () => import('@/views/declareCoordination/orderArrange/index')
      component: resolve => require(['@/views/declareCoordination/orderSales/index'], resolve),
    }

  ]
  },

  {
    path: '/statisticsReport/projectReport',
    component: Layout,
    redirect: { path: '/statisticsReport/projectReport' },
    children: [{
      path: '/statisticsReport/projectReport',
      name: '项目进度跟踪报表',
      // component: () => import('@/views/declareCoordination/orderManage/index')
      component: resolve => require(['@/views/statisticsReport/projectReport'], resolve),
    },{
      path: '/statisticsReport/projectSubsidyReport',
      name: '项目补助汇总表',
      // component: () => import('@/views/declareCoordination/orderManage/index')
      component: resolve => require(['@/views/statisticsReport/projectSubsidyReport'], resolve),
    },{
      path: '/statisticsReport/paymentSituationReport',
      name: '回款情况统计表',
      // component: () => import('@/views/declareCoordination/orderManage/index')
      component: resolve => require(['@/views/statisticsReport/paymentSituationReport'], resolve),
    }]
  },

  {
    path: '/file',
    component: Layout,
    redirect: { path: '/file' },
    children: [{
      path: '/file',
      name: '文件库',
      // component: () => import('@/views/fileManage/index')
      component: resolve => require(['@/views/fileManage/index'], resolve),
    },{
      path: '/file/fileType',
      name: '文件分类',
      // component: () => import('@/views/fileManage/fileType/index')
      component: resolve => require(['@/views/fileManage/fileType/index'], resolve),
    },{
      path: '/file/addFileType',
      name: '新建文件分类',
      // component: () => import('@/views/fileManage/fileType/addFileType')
      component: resolve => require(['@/views/fileManage/fileType/addFileType'], resolve),
    },{
      path: '/file/editFileType',
      name: '编辑文件分类',
      // component: () => import('@/views/fileManage/fileType/addFileType')
      component: resolve => require(['@/views/fileManage/fileType/addFileType'], resolve),
    },{
      path: '/file/ossFileManage',
      name: 'oss文件库',
      // component: () => import('@/views/fileManage/ossFileManage')
      component: resolve => require(['@/views/fileManage/ossFileManage'], resolve),
    }]
  },
  {
    path: '/contract',
    component: Layout,
    redirect: { path: '/contract/contractList' },
    children: [{
      path: '/contract',
      name: '合同列表',
      // component: () => import('@/views/contractManage/index')
      component: resolve => require(['@/views/contractManage/index'], resolve),
    },{
      path: '/contract/addContract',
      name: '创建合同',
      // component: () => import('@/views/contractManage/addContract')
      component: resolve => require(['@/views/contractManage/addContract'], resolve),
    },{
      path: '/contract/checkContract',
      name: '查看合同',
      // component: () => import('@/views/contractManage/addContract')
      component: resolve => require(['@/views/contractManage/addContract'], resolve),
    },{
      path: '/contract/paymentRecordDetail',
      name: '查看回款',
      // component: () => import('@/views/contractManage/addContract')
      component: resolve => require(['@/views/contractManage/paymentRecordDetail'], resolve),
    },{
      path: '/contract/paymentRecordEdit',
      name: '编辑回款',
      // component: () => import('@/views/contractManage/addContract')
      component: resolve => require(['@/views/contractManage/paymentRecordDetail'], resolve),
    }]
  },
  {
    path: '/declare',
    component: Layout,
    redirect: { path: '/declare' },
    children: [{
      path: '/declare/list',
      name: '申报管理',
      // component: () => import('@/views/contractManage/index')
      component: resolve => require(['@/views/declare/declareManage/list'], resolve),
    },{
      path: '/declare/editDeclare',
      name: '编辑/查看申报管理',
      // component: () => import('@/views/contractManage/index')
      component: resolve => require(['@/views/declare/declareManage/form'], resolve),
    },{
      path: '/declare/addDeclare',
      name: '新增申报管理',
      // component: () => import('@/views/contractManage/index')
      component: resolve => require(['@/views/declare/declareManage/addForm'], resolve),
    },]
  },
  {
    path: '/backend',
    component: Layout,
    redirect: {path: '/backend/department'},
    children: [{
      path: '/backend/department',
      name: '部门管理',
      // component: () => import('@/views/backend/department/index')
      component: resolve => require(['@/views/backend/department/index'], resolve),
    },
    {
      path: '/backend/consulting',
      name: '留言列表',
      // component: () => import('@/views/backend/department/index')
      component: resolve => require(['@/views/backend/consulting/index'], resolve),
    },
    {
      path: '/backend/contact',
      name: '咨询联系方式',
      // component: () => import('@/views/backend/department/index')
      component: resolve => require(['@/views/backend/contact/index'], resolve),
    },
    {
        path: '/backend/leaveMessage',
        name: '职称咨询',
        component: resolve => require(['@/views/backend/leaveMessage/index'], resolve),
      },
    {
      path: '/backend/userManage',
      name: '用户管理',
      // component: () => import('@/views/backend/userManage/index')
      component: resolve => require(['@/views/backend/userManage/index'], resolve),
    }, {
      path: '/backend/userManage/addUser',
      name: '新建用户',
      // component: () => import('@/views/backend/userManage/addUser')
      component: resolve => require(['@/views/backend/userManage/addUser'], resolve),
    }, {
      path: '/backend/userManage/editUser',
      name: '编辑用户',
      // component: () => import('@/views/backend/userManage/addUser')
      component: resolve => require(['@/views/backend/userManage/addUser'], resolve),
    }, {
      path: '/backend/operatePrivileges',
      name: '操作权限管理',
      // component: () => import('@/views/backend/operatePrivileges/index')
      component: resolve => require(['@/views/backend/operatePrivileges/index'], resolve),
    }, {
      path: '/backend/operatePrivileges/addPrivileges',
      name: '新建权限',
      // component: () => import('@/views/backend/operatePrivileges/addPrivileges')
      component: resolve => require(['@/views/backend/operatePrivileges/addPrivileges'], resolve),
    }, {
      path: '/backend/operatePrivileges/editPrivileges',
      name: '编辑权限',
      // component: () => import('@/views/backend/operatePrivileges/addPrivileges')
      component: resolve => require(['@/views/backend/operatePrivileges/addPrivileges'], resolve),
    }, {
      path: '/backend/operatePrivileges/addSonPrivileges',
      name: '添加子权限',
      // component: () => import('@/views/backend/operatePrivileges/addPrivileges')
      component: resolve => require(['@/views/backend/operatePrivileges/addPrivileges'], resolve),
    },{
        path: '/backend/onlineUser',
        name: '在线用户',
        component: resolve => require(['@/views/backend/onlineUser/index'], resolve),
    },{
      path: '/backend/rolesManage',
      name: '角色管理',
      // component: () => import('@/views/backend/rolesManage/index')
      component: resolve => require(['@/views/backend/rolesManage/index'], resolve),
    }, {
      path: '/backend/addRole',
      name: '新建角色',
      // component: () => import('@/views/backend/rolesManage/addRole')
      component: resolve => require(['@/views/backend/rolesManage/addRole'], resolve),
    }, {
      path: '/backend/addSonRole',
      name: '添加子角色',
      // component: () => import('@/views/backend/rolesManage/addRole')
      component: resolve => require(['@/views/backend/rolesManage/addRole'], resolve),
    }, {
      path: '/backend/editRole',
      name: '编辑角色',
      // component: () => import('@/views/backend/rolesManage/addRole')
      component: resolve => require(['@/views/backend/rolesManage/addRole'], resolve),
    }, {
      path: '/backend/dictionariesManage',
      name: '字典管理',
      // component: () => import('@/views/backend/dictionariesManage/index')
      component: resolve => require(['@/views/backend/dictionariesManage/index'], resolve),
    }, {
      path: '/backend/configManage',
      name: '配置管理',
      // component: () => import('@/views/backend/configManage/index')
      component: resolve => require(['@/views/backend/configManage/index'], resolve),
    }, {
      path: '/backend/changePassword',
      name: '修改密码',
      // component: () => import('@/views/backend/changePassword/index')
      component: resolve => require(['@/views/backend/changePassword/index'], resolve),
    }, {
      path: '/backend/enterpriseList',
      name: '企业列表',
      // component: () => import('@/views/backend/enterpriseMsg/enterpriseList')
      component: resolve => require(['@/views/backend/enterpriseMsg/enterpriseList'], resolve),
    }, {
      path: '/backend/enterpriseDetail',
      name: '企业信息',
      // component: () => import('@/views/backend/enterpriseMsg/enterpriseDetail')
      component: resolve => require(['@/views/backend/enterpriseMsg/enterpriseDetail'], resolve),
    }, {
      path: '/backend/enterprisePay',
      name: '企业支付',
      // component: () => import('@/views/backend/enterpriseMsg/enterprisePay')
      component: resolve => require(['@/views/backend/enterpriseMsg/enterprisePay'], resolve),
    },  {
      path: '/backend/enterpriseEmpower',
      name: '企业授权',
      // component: () => import('@/views/backend/enterpriseMsg/enterprisePay')
      component: resolve => require(['@/views/backend/enterpriseMsg/enterpriseEmpower'], resolve),
    },{
      path: '/backend/changeWarden',
      name: '更换管理员',
      // component: () => import('@/views/backend/enterpriseMsg/changeWarden')
      component: resolve => require(['@/views/backend/enterpriseMsg/changeWarden'], resolve),
    }, {
      path: '/backend/journalManage',
      name: '日志管理',
      // component: () => import('@/views/backend/journalManage/index')
      component: resolve => require(['@/views/backend/journalManage/index'], resolve),
    },{
      path: '/backend/process',
      name: '流程管理',
      // component: () => import('@/views/backend/processManage/index')
      component: resolve => require(['@/views/backend/processManage/index'], resolve),
    },{
      path: '/backend/process/addProcess',
      name: '新建流程',
      // component: () => import('@/views/backend/processManage/addProcess')
      component: resolve => require(['@/views/backend/processManage/addProcess'], resolve),
    },{
      path: '/backend/process/editProcess',
      name: '编辑流程',
      // component: () => import('@/views/backend/processManage/addProcess')
      component: resolve => require(['@/views/backend/processManage/addProcess'], resolve),
    },{
      path: '/backend/process/processDetail',
      name: '查看流程',
      // component: () => import('@/views/backend/processManage/addProcess')
      component: resolve => require(['@/views/backend/processManage/addProcess'], resolve),
    },{
      path: '/backend/conditionVariable',
      name: '申报条件变量',
      component: resolve => require(['@/views/backend/conditionVariable/index'], resolve),
    },{
      path: '/backend/conditionVariable/addVariable',
      name: '新建条件变量',
      component: resolve => require(['@/views/backend/conditionVariable/addVariable'], resolve),
    },{
      path: '/backend/conditionVariable/editVariable',
      name: '编辑条件变量',
      component: resolve => require(['@/views/backend/conditionVariable/addVariable'], resolve),
    },{
      path: '/backend/helpNotes',
      name: '帮助说明管理',
      // component: () => import('@/views/backend/processManage/addProcess')
      component: resolve => require(['@/views/backend/helpNotesManage/index'], resolve),
    },{
      path: '/backend/faq',
      name: '常见问题',
      component: resolve => require(['@/views/faq/index'], resolve),
    },{
      path: '/backend/faq/addFaq',
      name: '新增/编辑常见问题',
      component: resolve => require(['@/views/faq/addFaq'], resolve),
    }]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  base: 'admin',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
