import {createMemoryHistory,createRouter, createWebHashHistory} from 'vue-router'; // 引用vue-router的方法
// import MtlItemManage from ':@/view/MtlItemManage.vue' 
// import Transaction from ':@/view/Transaction.vue' 
// import TransactionRead from ':@/view/TransactionRead.vue' 
// import InventoryManage from ':@/view/InventoryManage.vue' 
// import UnitManage from ':@/view/UnitManage.vue' 

import Login from ':@/view/Login.vue' 
import BackstageManagement from ':@/view/Login.vue' 

import SystemManagement from ':@/view/sys/basic/SystemManagement.vue' 
import ModalManagement from ':@/view/sys/basic/ModalManagement.vue' 
import ComponentManagement from ':@/view/sys/basic/ComponentManagement.vue' 
import TypeManagement from ':@/view/sys/basic/TypeManagement.vue' 
import StatusManagement from ':@/view/sys/basic/StatusManagement.vue' 
import CompanyManagement from ':@/view/sys/basic/CompanyManagement.vue' 
import DevelopUserManagement from ':@/view/sys/basic/DevelopUserManagement.vue' 

import DepartmentManagement from ':@/view/oms/basic/DepartmentManagement.vue' 
import StaffManagement from ':@/view/oms/basic/StaffManagement.vue' 
import WarehouseManagement from ':@/view/oms/basic/WarehouseManagement.vue' 
import UnitManagement from ':@/view/oms/basic/UnitManagement.vue' 
import MtlItemManagement from ':@/view/oms/basic/MtlItemManagement.vue' 

import TestExample from ':@/view/TestExample.vue' 

import CyyWebEditManagement from ':@/view/web/CyyWeb/CyyWebEditManagement.vue' 
import CyyWeb from ':@/view/web/CyyWeb/index.vue' 
import IndexContent from ':@/view/web/CyyWeb/components/indexContent.vue' 
import CardGroup from ':@/view/web/CyyWeb/components/cardGroup.vue' 
import Events from ':@/view/web/CyyWeb/components/events.vue' 
import Issues from ':@/view/web/CyyWeb/components/issues.vue' 
import Donate from ':@/view/web/CyyWeb/components/donate.vue' 

import NotFoundComponent from ':@/view/NotFoundComponent.vue' 

const history = createWebHashHistory();
const router = createRouter({
    history,
    routes:[
        {path:'/',component:SystemManagement},
        {path:'/Login',
            components:{
                Login:Login
            },  
            meta: { title: '公司營運系統登入' }

        },
        //{path:'/Login',component:Login},
        {path:'/SystemManagement',component:SystemManagement},
        {path:'/ModalManagement',component:ModalManagement},
        {path:'/ComponentManagement',component:ComponentManagement},
        {path:'/TypeManagement',component:TypeManagement},
        {path:'/StatusManagement',component:StatusManagement},
        {path:'/CompanyManagement',component:CompanyManagement},
        {path:'/DevelopUserManagement',component:DevelopUserManagement},

        {path:'/DepartmentManagement',component:DepartmentManagement},
        {path:'/MtlItemManagement',component:MtlItemManagement},
        {path:'/StaffManagement',component:StaffManagement},
        {path:'/UnitManagement',component:UnitManagement},
        {path:'/WarehouseManagement',component:WarehouseManagement},

        {path:'/TestExample',component:TestExample},
        {path:'/CyyWebEditManagement',component:CyyWebEditManagement},
        {path:'/Web/Cyy',
            components:{
                CyyWeb: CyyWeb
            },
            children: [
                {
                    path: '',
                    component: IndexContent
                },
                {
                    path: 'IndexContent',
                    component: IndexContent
                }
                ,
                {
                    path: 'CardGroup',
                    component: CardGroup
                }
                ,
                {
                    path: 'Events',
                    component: Events
                }
                ,
                {
                    path: 'Issues',
                    component: Issues
                }
                ,
                {
                    path: 'Donate',
                    component: Donate
                }
            ], 
            meta: { title: '陳英渝立委競選官網' }

        },
        {
            path: '/:catchAll(.*)',
            component: NotFoundComponent,
          },
    ]
    
})
export default router; //輸出對象 router

// {path:'/MtlItemManage',component:MtlItemManage},
//         {path:'/Transaction',component:Transaction},
//         {path:'/TransactionRead/:id',component:TransactionRead},
//         {path:'/InventoryManage',component:InventoryManage},
//         {path:'/UnitManage',component:UnitManage},