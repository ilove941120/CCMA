<script setup>
import { ref,computed,watch,watchEffect,onMounted,onUnmounted  } from 'vue'
import menuBar from ':@/components/menuBar.vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter()
//監控登入狀態 切換頁面
const logInStatus = computed(() => store.state.loginInfo.status);
const Location = computed(() => store.state.Location);

router.beforeEach((to, from, next) => {
  var toUrl = to.path.split('/')[1]
  var fromUrl = from.path.split('/')[1]
  if(toUrl == "Web"){
    store.commit('EnterWeb', 'Web');
    document.title = to.meta.title
    next() 
  }
  else{
    if (logInStatus.value == "A"){
      if(to.path === '/Login'){
         if(fromUrl == "Web"){
           store.commit('EnterWeb', 'Web');
         }
         else{
          store.commit('EnterWeb', 'Sys');
         }
         next(false) // 若不满足这些条件，则取消导航
      }
      else{
        store.commit('EnterWeb', 'Sys');
        document.title = "公司營運系統"
        next() 
      }
    }
    else{
      if(Location.value != "Login"){
        store.commit('EnterWeb', 'Login');
        LogOut()
      }
      else{
        if(fromUrl == "Login"){
          next(false) 
        }
        else{
          next() 
          document.title = to.meta.title
        }
      }
    }
  }
})


//控制menu顯示
const menuShow = ref(false)
const menuChange = ()=>{
  if(menuShow.value == false){
    menuShow.value = true
  }
  else{
    menuShow.value = false
  }
}
//控制個人資訊欄顯示
const InfoStatus = ref(false)
function OpenInfo(){
  if(InfoStatus.value == false){
    InfoStatus.value = true
  }
}

//登出
function LogOut(){
  sessionStorage.removeItem("user");
  store.commit('logoutAction', {status:"S"});
  router.push('/Login');
}
//開啟滑鼠監控後點擊次數
const handleClickCount = ref(0);
const handleClick = () => {
  handleClickCount.value++;
};

//使用者資訊框開啟 監控滑鼠點擊
watchEffect(()=>{
  if(InfoStatus.value){
    document.addEventListener('click', handleClick);
  }
  if(handleClickCount.value>1){
    document.removeEventListener('click', handleClick);
    InfoStatus.value = false
    handleClickCount.value =0
  }
})


let sessionText = sessionStorage.getItem("user");
if(sessionText != null){
  var sessionObj = JSON.parse(sessionStorage.getItem("user"))
  store.commit('loginAction', {status:"A", user:sessionObj.StaffNo});
}
</script>

<template>
  <div v-if="logInStatus === 'A' && Location === 'Sys'">
    <div class="WebTitle">
      <button class="menuButton" @click="menuChange"><i class="fa-solid fa-bars"></i> </button>
      <h1>公司營運系統</h1>
      <div class="InfoStatus">
        <span>{{ store.state.loginInfo.userName }}</span>
        <i class="fa-regular fa-circle-user" @click="OpenInfo()"></i>
        <div class="userList" v-if="InfoStatus">
          <div class="item"><i class="fa-solid fa-eye"></i> 個人資料</div>
          <div class="item" @click="LogOut"><i class="fa-solid fa-share-from-square"></i> 登出</div>
        </div>
      </div>
    </div>
    <div class="setion">
      <menuBar :sent="menuShow"></menuBar>
      <div class="webContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div v-if="logInStatus === 'S' && Location === 'Login'">
    <router-view name="Login" to="/Login"></router-view>
  </div>
  <router-view v-if="Location === 'Web'" name="CyyWeb" to="/CyyWeb"></router-view>

</template>

<style scoped>
  .WebTitle{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 998;
    background-color: #FFFFFF;
    color: #3a5134;
    margin: 0 auto;
    padding: 10px 20px;
    letter-spacing: 3px;
    display: flex;
    align-items: center;
  }
  .menuButton{
    font-size: 36px;
    background-color: unset;
    color: #3a5134;
    border: unset;
  }
  .WebTitle>h1{
    margin: 0;
    margin-left: 10px;
  }
  .InfoStatus{
    margin-left: auto;
    font-size: 36px;
    position: relative;
  }
  .userList{
    position: absolute;
    width: 150px;
    font-size: 14px;
    top: 50px;
    right: 0px;
    background-color: #fefffe;
    padding: 8px 15px;
    box-shadow: 1px 2px 9px 3px #18521062;
  }
  .userList>.item{
    margin-bottom: 5px;
    cursor: pointer;
  }
  .setion{
    background-color: #EAEEF3;
    min-height: 100vh;
    width: 100%;
    margin-top: 66px;
    display: flex;
  }
  .webContent{
    width: 100%;
    padding: 20px;
  }
  
</style>
