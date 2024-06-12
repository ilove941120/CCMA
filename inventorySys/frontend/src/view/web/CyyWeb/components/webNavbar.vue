<script setup>
import { ref, reactive,watchEffect } from "vue";

import { useStore } from 'vuex';
const store = useStore();
store.commit('EnterWeb', 'Web');
const menuShow = ref(false)
function opMenu(){
    menuShow.value = true
}
//#region 關閉下拉選單
const clickNum =ref(0)
const handleClick = (event) => {
    if(clickNum.value !=0){
        var className = event.target.className
        console.log(className)
        if (className != "menu") {
            menuShow.value = false;
        }
    }
    clickNum.value+=1
}

//使用者資訊框開啟 監控滑鼠點擊
watchEffect(()=>{
  if(menuShow.value){
    document.addEventListener('click', handleClick);
  }
  else{
    clickNum.value =0
    document.removeEventListener('click', handleClick);
  }
})
//#endregion
const itemData = reactive([
        {
            id:0,
            itemName:`最新活動`,
            href:`/Web/Cyy/CardGroup`
        },
        {
            id:1,
            itemName:`政策議題`,
            href:``
        },
        {
            id:2,
            itemName:`民眾服務`,
            href:``
        },
        {
            id:3,
            itemName:`小額捐款`,
            href:``
        },
        
    ]
)
const communityGroupData = reactive({
    Ig:{
        icon:`<i class="fa-brands fa-facebook"></i>`,
        href:``
    },
    FB:{
        icon:`<i class="fa-brands fa-instagram"></i>`,
        href:``
    },
    LINE:{
        icon:`<i class="fa-brands fa-line"></i>`,
        href:``
    },
    YouTube:{
        icon:`<i class="fa-brands fa-youtube"></i>`,
        href:``
    },
})
const favicon ="/CyyWebimg/navbar.png"
</script>

<template>
    <div class="navBar">
        <div class="content">
            <router-link class="basic webTitle" :to="'/Web/Cyy'">
                <img style="height: 80px;" :src="favicon" alt="">
                <span style="margin-left: 10px;">陳英渝</span> 
            </router-link>
            <div class="basic itemGroup">
                <router-link  class="item" v-for="item in itemData" :to="item.href" >
                    {{ item.itemName }}
                </router-link>
            </div>
            <div class="basic communityGroup">
                <div  class="item icon" v-for="(item,key) in communityGroupData" v-html="item.icon">
                </div>
            </div>
            <div class="menuButton"  @click="opMenu">
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class="menu" v-if="menuShow == true">
                <i class="fa-solid fa-bars"></i>
                <div  class="item" v-for="(item,key) in itemData" >
                    {{ item }}
                </div>
                <div  class="item icon" v-for="(item,key) in communityGroupData" v-html="item.icon">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navBar{
    width: 100%;
    padding: 10px 0;
    background: linear-gradient(to right, #1D3260 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%);
}
.content{
    width: 1280px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
@media (max-width: 1280px) {
    .content{
        width: 100%;
        padding: 0 20px;
    }
}
.basic{
    display: flex;
    align-items: center;
    color: #ECF5FC;
    font-size: 24px;
}
.menuButton{
    display: none;
}
@media (max-width: 1280px) {
    .itemGroup,.communityGroup{
        display: none;
    }
    .menuButton{
        display: block;
        font-size: 48px;
        color: #ECF5FC;
    }
}
.menu{
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #1D3260;
    color: #ECF5FC;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    z-index: 99;
    padding: 20px 40px;
    overflow: scroll;
}
.menu:hover{
    background: linear-gradient(to right, #1D3260 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%);
}
.menu>i{
    font-size: 48px;
    margin-bottom: 30px;
    margin-left: 50px;
}
.menu>.item{
    margin-bottom: 25px;
    text-decoration: unset;
}
.item{
    margin: 0 15px;
    color: #ECF5FC;    
}
.icon{
    font-size: 40px;
}

</style>
