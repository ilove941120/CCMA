<script setup>
// import menu from './components/menu.vue';
// import { Menu } from '@element-plus/icons-vue'
import { ref,computed,watch,watchEffect,onMounted,onUnmounted  } from 'vue'
import MenuBar from ':@/components/MenuBar.vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter()

//監控登入狀態 切換頁面
const logInStatus = computed(() => store.state.loginInfo.status);

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
else{
  if(store.state.loginInfo.status == ''){
    LogOut()
  }
}
</script>

<template>
  <div v-if="logInStatus === 'A'">
    <div class="WebTitle">
      <button class="menuButton" @click="menuChange"><i class="fa-solid fa-bars"></i> </button>
      <h1>客戶公司管理應用程序</h1>
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
      <MenuBar :sent="menuShow"></MenuBar>
      <div class="webContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div v-else>
    <router-view to="/Login"></router-view>
  </div>
</template>

<style scoped>
  .WebTitle{
    background-color: unset;
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
    display: flex;
  }
  .webContent{
    width: 100%;
    padding: 20px;
  }
  
</style>
