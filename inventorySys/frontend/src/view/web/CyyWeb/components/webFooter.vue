<script setup>
import { reactive } from "@vue/reactivity";

const ContentData = reactive({
    layer1:"陳英渝服務處",
    layer2:{
        address:{
            icon:`<i class="fa-solid fa-location-pin"></i>`,
            content:`海星區聽海大道88號鳳梨大樓3樓`
        },
        phone:{
            icon:`<i class="fa-solid fa-phone"></i>`,
            content:`(02) 878-9487`
        },
        email:{
            icon:`<i class="fa-solid fa-envelope"></i>`,
            content:`meowoffice@linmeow.tw`
        }
    },
    layer3:"服務時間:週一至週五 9:00 - 18:00",
    layer4:"版權聲明：© 2023 陳英渝版權所有"
})
</script>

<template>
    <div class="footer">
        <div class="element">
            <img class="whale" src="https://github.com/Megumilin/2023-thef2e-1/blob/main/img/Tail.png?raw=true">
        </div>
        <!-- <div class="loading">
            <img src="https://raw.githubusercontent.com/Megumilin/2023-thef2e-1/main/img/whale_Matting.png" />
        </div> -->
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
                <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use href="#gentle-wave" x="48" y="7" fill="#1D3260" />
            </g>
        </svg>
        <div class="content">
            <div class="basic">{{ ContentData.layer1 }}</div>
            <div class="basic layer2">
                <div class="layerItem" v-for="(value,key) in ContentData.layer2">
                    <span class="icon" v-html="value.icon"></span>
                    <span>{{ value.content }}</span>
                </div>
            </div>
            <div class="basic">{{ ContentData.layer3 }}</div>
            <div class="basic">{{ ContentData.layer4 }}</div>
        </div>
    </div>
</template>

<style scoped>
.footer{
    position: relative;
    width: 100%;
    overflow: hidden;
    text-align: center;
    color: white;
    background: linear-gradient(to top, #ff4646, white);
}
.content{
    width: 100%;
    background-color: #1D3260;
    padding-top: 50px;
    padding-bottom: 30px;
    margin-top: -10px;
}
.basic{
    padding: 10px 0;
    font-size: 24px;
}
@media (max-width: 768px) {
    .basic{
        width: 90%;
        margin: auto;
        text-align: left;
        font-size: 18px;
    }
}
.layer2{
    display: flex;
    align-items: center;
    justify-content: center;
}
@media (max-width: 1280px) {
    .layer2{
        padding: 0;
        flex-direction: column;
    }
}
.layerItem{
    margin: 0 20px;
}
@media (max-width: 1280px) {
    .layerItem{
        margin:unset;
        margin:  15px;
    }
}
@media (max-width: 768px) {
    .layerItem{
        width: 100%;
        text-align: left;
    }
}
.icon{
    margin-right: 10px;
}



/* 鯨魚 */
.loading img{   
  transition:transform 5s; -webkit-transition:-     webkit-transform 5s;
  position: absolute;
  top: 50px; right: 10px;
}
img:hover{
  transform:rotate(360deg);
} 
/* 鯨魚尾巴 */
.element img{
  width: 300px;
   height: 300px;
  margin-top: 70px;
}
@media (max-width: 1280px) {
    .element img{
        width: 200px;
        height: 200px;
    }
}
@media (max-width: 768px) {
    .element img{
        width: 150px;
        height: 150px;
        margin-top: 90px;
    }
}
 .element {
    width: 20px;
    height: 20vh;
    animation: shake 6s infinite;
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
    100% { transform: translateX(0); }
  }

/* 波浪動畫 */

.waves {
    width: 100%;
    min-height: 100px;
    max-height: 150px;
}
.parallax > use {
    animation: move-forever 2s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0px, 0);
    }
    100% {
        transform: translate3d(90px, 0px, 0);
    }
}

@media (max-width: 768px) {
    .waves {
        height: 40px;
    }
}

</style>
