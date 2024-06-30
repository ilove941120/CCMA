import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//router -路由套件
import router from './router'; //引入router文件 會自動找尋 index.js
//Vuex -全局状态管理套件
import store from './store'
//ElementPlus -框架套件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min.js'


const app = createApp(App);


app.use(ElementPlus);
app.use(ElementPlusIconsVue);
app.use(store);
app.use(router);

app.mount('#app');