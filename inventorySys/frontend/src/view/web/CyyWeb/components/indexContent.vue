<script setup>
import { ref, reactive } from "@vue/reactivity";
import { useStore } from 'vuex';
const store = useStore();
store.commit('EnterWeb', 'Web');

const Banner ="/CyyWebimg/banner.jfif"
const Whale ="/CyyWebimg/whale.png"

const AboutData =reactive({
    title:"關於英渝",
    content:`出生於深海裡的大鳳梨裡。
海洋不再如往日那樣寧靜和清澈，經常有一片漂浮的塑料垃圾，
傷害著我深愛的海洋生物。
被吸管傷害的海龜、吞下塑膠微粒的魚，引發疾病和痛苦。
以及過度捕撈導致許多海洋生物的數量銳減，損害了整個生態。
因時常聽到海哭的聲音，我希望能夠喚起人們對海洋的愛護意識。
還原海洋的面貌，給予海綿寶寶一個乾淨的家園。
只要你幫海，海就會幫你。`,
    photo:`/CyyWebimg/about.jfif`
})
const LatestEventsData = reactive({
    top1:{
        eventData:`2023/12/26`,
        eventPhoto:`/CyyWebimg/LatestEvents1.jfif`,
        eventTitle:`參與台北環保論壇，爭取海洋友善環境`,
        eventContent:`炎炎夏日的周六，我走進了台北環保論壇，
決定要全力宣傳「鯨魚至上」的理念！
我相信，鯨魚在海洋中，
每一隻都應該有自己的 VIP 休憩空間。`,
        href:`Cyy/Events`
    },
    top2:{
        eventData:`2023/12/26`,
        eventPhoto:`/CyyWebimg/LatestEvents2.jfif`,
        eventTitle:`掃街模式開啟！帶起鯨魚帽來和我一起走！`,
        eventContent:`街上氣氛真的很棒，從小孩到大人，甚至有些朋友都穿著
由義大利知名設計師Sit Down Please所打造的經典龍蝦
裝來找我握手，真的太可愛了！這次的活動不僅讓我看到
大家的熱情，更加堅定了我推進「海洋友善環境」政策的
決心。`,
href:`Cyy/Events`
    },
    top3:{
        eventData:`2023/12/26`,
        eventPhoto:`/CyyWebimg/LatestEvents3.png`,
        eventTitle:`香香的烤魷魚活動！`,
        eventContent:`為了推廣海洋生物永續生存的重要，讓更多人一起愛護
海洋，我們舉辦了一場前所未有的「烤魷魚活動」！`,
href:`Cyy/Events`
    }
})
const PolicyIssuesData = reactive({
    top1:{
        IssuesData:`2023/12/26`,
        IssuesPhoto:`/CyyWebimg/IssuesPhoto1.png`,
        IssuesTitle:`為鯨魚謀福利！推動鯨魚保障方案`,
        IssuesContent:`鯨魚在海洋生態系統中扮演著重要的角色，如果它們消失
或減少，將對海洋生態平衡、生物多樣性、氣候和經濟
產生深遠的影響。保護鯨魚是維護海洋健康和全球
生態平衡的關鍵一步。
因此，陳英渝提出鯨魚保障方案，讓牠們生生不息。`,
    },
    top2:{
        IssuesData:`2023/12/26`,
        IssuesPhoto:`/CyyWebimg/IssuesPhoto2.png`,
        IssuesTitle:`減少海洋污染，維護海洋生態系統`,
        IssuesContent:`減少海洋污染並保護海洋生態系統是保護地球生態平衡、
氣候穩定、經濟和文化遺產的必要措施。它需要全球努
力，包括政府、企業和個人的參與，以確保我們的海洋
保持健康、可持續和繁榮
因此，陳英渝提出友善海洋方案，還原海洋的面貌，給
予海綿寶寶一個乾淨的家園。`,
    },
    top3:{
        IssuesData:`2023/12/26`,
        IssuesPhoto:`/CyyWebimg/IssuesPhoto3.png`,
        IssuesTitle:`推廣海洋保護教育，讓愛更加專業`,
        IssuesContent:`海洋教育推廣有助於保護我們的海洋、促進可持續發展，
以及培養新一代的環保者和海洋保護者。這對於維護地球
生態平衡和可持續未來至關重要。
因此，陳英渝提出海洋保護教育方案，提高公眾對海洋的
認識、關心和參與。`,
    },
})

const ProductData = reactive({
    top1:`/CyyWebimg/product1.jfif`,
    top2:`/CyyWebimg/product2.jfif`,
    top3:`/CyyWebimg/product3.jfif`,
})
const shopText = ref(`拒絕一次性用品，環保小物可以陪伴你一輩子。選擇可持續，選擇環保。
更多渝渝環保小物，請前往蝦皮賣場參考選購。`)
</script>

<template>
   <section id="section1">
    <img class="banner" :src="Banner" alt="">
   </section>
   <section id="section2">
    <div class="Layer">
        <div class="title">關於英渝</div>
        <img class="photo" :src="AboutData.photo" alt="">
        <div class="about">
            <div class="title">關於英渝</div>
            <div class="content"> <pre>{{ AboutData.content }}</pre></div>
        </div>
    </div>
   </section>
   <section id="section3">
    <div class="LatestEvents" id="">
        <div class="whale">
            <img :src="Whale" alt="">
            <span>最新活動</span>
        </div>
        <div class="cardGroup">
            <router-link class="localCard CardXL" v-for="(value,key) in LatestEventsData" :to="value.href">
                <div class="cardData">{{ value.eventData }}</div>
                <img class="cardPhoto Events" :src="value.eventPhoto" alt="">
                <div class="cardTitle">{{ value.eventTitle }}</div>
                <div class="cardContent"><pre>{{ value.eventContent }}</pre></div>
                <button class="cardKeepRead">繼續閱讀</button>
            </router-link>
        </div>
        <div id="CarouselLatestEvents" class="carousel slide CardM" data-bs-ride="carousel">
            <div class="carousel-indicators" style="bottom: -60px!important;">
                <button type="button" data-bs-target="#CarouselLatestEvents" data-bs-slide-to="0" class="active customized" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#CarouselLatestEvents" data-bs-slide-to="1" class="customized" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#CarouselLatestEvents" data-bs-slide-to="2" class="customized" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item localCard" :class="index==0? `active`:``" v-for="(value,key,index) in LatestEventsData">
                    <div class="cardData">{{ value.eventData }}</div>
                    <img class="cardPhoto Events" :src="value.eventPhoto" alt="">
                    <div class="cardTitle">{{ value.eventTitle }}</div>
                    <div class="cardContent"><pre>{{ value.eventContent }}</pre></div>
                    <button class="cardKeepRead">繼續閱讀</button>
                </div>
            </div>
        </div>
    </div>
    <div class="PolicyIssues" id="">
        <div class="whale">
            <img :src="Whale" alt="">
            <span>政策議題</span>
        </div>
        <div class="cardGroup">
            <div class="localCard CardXL" v-for="(value,key) in PolicyIssuesData">
                <div class="cardData">{{ value.IssuesData }}</div>
                <img class="cardPhoto Issues" :src="value.IssuesPhoto" alt="">
                <div class="cardTitle">{{ value.IssuesTitle }}</div>
                <div class="cardContent"><pre>{{ value.IssuesContent }}</pre></div>
                <button class="cardKeepRead">繼續閱讀</button>
            </div>
        </div>
        <div id="CarouselPolicyIssues" class="carousel slide CardM" data-bs-ride="carousel">
            <div class="carousel-indicators"  style="bottom: -60px!important;">
                <button type="button" data-bs-target="#CarouselPolicyIssues" data-bs-slide-to="0" class="active customized" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#CarouselPolicyIssues" data-bs-slide-to="1" class="customized" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#CarouselPolicyIssues" data-bs-slide-to="2" class="customized" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item localCard" :class="index==1? `active`:``" v-for="(value,key,index) in PolicyIssuesData">
                    <div class="cardData">{{ value.IssuesData }}</div>
                    <img class="cardPhoto Issues" :src="value.IssuesPhoto" alt="">
                    <div class="cardTitle">{{ value.IssuesTitle }}</div>
                    <div class="cardContent"><pre>{{ value.IssuesContent }}</pre></div>
                    <button class="cardKeepRead">繼續閱讀</button>
                </div>
            </div>
        </div>
    </div>
   </section>
   <section id="section4">
    <div class="give-flex">
    </div>
    <div class="earth"></div>

    <div class="Layer">
        <div class="whale">
            <img :src="Whale" alt="">
            <span>渝渝小物</span>
        </div>
        <div class="productGroup CardXL">
            <img class="product" v-for="(value,key) in ProductData" :src="value" alt="">
        </div>
        <div id="CarouselProduct" class="carousel slide CardM" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#CarouselProduct" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#CarouselProduct" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#CarouselProduct" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <img class="carousel-item active product" v-for="(value,key) in ProductData" :src="value" alt="">
            </div>
        </div>
        <div class="content">
            <pre>{{shopText}}</pre>
            <button class="GoShopee" >前往蝦皮賣場</button>
        </div>
    </div>
    <div class="Layer1">
    </div>
   </section>
   <section id="section5">
        <div class="Layer">
            <div class="whale">
                <img :src="Whale" alt="">
                <span>民眾服務</span>
            </div>
            <pre>我們在這裡，為您提供幫助，
請透過表單留下您的聯絡資訊，由專人與您聯繫，謝謝 </pre>
            <div class="content">
                <div class="formTtitle">民眾服務表單</div>
                <div class="form">
                    <div class="localRow">
                        <label for="">姓名 <span>*</span></label>
                        <input type="text">
                    </div>
                    <div class="localRow">
                        <label for="">行動電話 <span>*</span></label>
                        <input type="text">
                    </div>
                    <div class="localRow">
                        <label for="">電子信箱 <span>*</span></label>
                        <input type="text">
                    </div>
                    <div class="localRow" >
                        <label for="">留下您的訊息 <span>*</span></label>
                    </div>
                    <div class="localRow" >
                        <textarea class="messge" name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>
            </div>
            <button class="sent">提交</button>
        </div>
   </section>
</template>

<style scoped>
/* section1 */
.banner{
    width: 100%;
    /* height: 100vh; */
}
/* section2 */

#section2{
    padding: 250px 0;
}
@media (max-width: 1280px) {
    #section2{
        padding: 100px 0px 200px 0; 
    }
}
@media (max-width: 768px) {
    #section2{
        padding: 20px 20px 30% 20px; 
    }
}
#section2>.Layer{
    width: 1280px;
    height: 693px;
    margin: auto;
    position: relative;
}
@media (max-width: 1280px) {
    #section2>.Layer{
        width: 768px;
        position: relative;
    }
}
@media (max-width: 768px) {
    #section2>.Layer{
        width: 100%;
        position: unset;
    }
}
#section2>.Layer>.title{
    display: none;
}
@media (max-width: 768px) {
    #section2>.Layer>.title{
        width: 100%;
        display: block;
        text-align: center;
        font-size: 32px;
        margin-bottom: 10px;
        color: #1D3260;
    }
}
.about{
    position: absolute;
    bottom: 0;
    left: 0;
}
@media (max-width: 1280px) {
    .about{
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
@media (max-width: 768px) {
    .about{
        position: relative;
        bottom: unset;
        left: unset;
    }
}
#section2>.Layer>.photo{
    position: absolute;
    top: 0;
    right: 0;
    width: 636px;
    height: 636px;
    box-shadow: 16px 0px 16px 0px #00000040;
}
@media (max-width: 1280px) {
    #section2>.Layer>.photo{
        width: 450px;
        height: 450px;
        right: 20px;
    }
}
@media (max-width: 768px) {
    #section2>.Layer>.photo{
        position: unset;
        box-shadow:unset;
        width: 100%;
        height: 100vw;
        border-radius: 8px;
    }
}
.about>.title{
    font-size: 32px;
    color: #1D3260;
}
@media (max-width: 1280px) {
    .about>.title{
        font-size: 24px;
        color: #1D3260;
    }
}
@media (max-width: 768px) {
    .about>.title{
        display: none;
    }
}
.about>.content{
    display: inline-block;
    padding: 48px 24px;
    border-radius: 0 100px 0 100px;
    background-color: #ECF5FC;
    font-size: 24px;
    line-height: 50px;
    color: #1D3260;
    font-weight: bold;
    letter-spacing: 2px;
}
@media (max-width: 1280px) {
    .about>.content{
        padding: 10px 30px;
        font-size: 18px;
        line-height: 36px;
        border-radius:0  70px 0 70px ;
    }
}
@media (max-width: 768px) {
    .about>.content{
        width: 100%;
        padding: 20px 20px;
        line-height: 36px;
        border-radius:0  70px 0 70px ;
    }
    .about>.content>pre{
        white-space: normal;
        font-family: sans-serif;
        font-size: 16px;
    }
}
/* section3 */
#section3{
    background: #ECF5FC;
    border-radius: 0 100px 0 100px;
}
@media (max-width: 768px) {
    #section3{
        background: unset;
        border-radius: unset;
        padding-top: 20%;
    }
}
.LatestEvents,.PolicyIssues{
    width: 1280px;
    margin: auto;
    position: relative;
    padding-top: 150px;
}
@media (max-width: 1280px) {
    .LatestEvents,.PolicyIssues{
        width: 768px;
        padding-top: 100px;
    }
}
@media (max-width: 768px) {
    .LatestEvents,.PolicyIssues{
        width: 100%;
    }
}
.LatestEvents{
    margin-bottom: 300px;
}
.PolicyIssues{
    padding-bottom: 80px;
}
@media (max-width: 768px) {
    .LatestEvents{
        margin-bottom: 0px;
    }
}

.whale{
    position: absolute;
    top: -18%;
    left: 35%;
    width: 371px;
    height: 231px;
}
.whale>img{
    width: 100%;
    height: 100%;
}
.whale>span{
    position: absolute;
    top: 55%;
    left: 25%;
    color: #ECF5FC;
    font-size: 32px;
}
@media (max-width: 1280px) {
    .whale{
        width: 300px;
        height: 185px;
    }
    .whale>span{
        font-size: 28px;
    }
}
@media (max-width: 768px) {
    .whale{
        position: unset;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: unset;
        background-color: #ECF5FC;
        padding: 10px 25px;
    }
    .whale>span{
        position: unset;
        color: #1D3260;
    }
    .whale>img{
        width: 87px;
        height: 55px;
    }
}
.cardGroup{
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #1D3260;
}
.cardGroup>.localCard{
    position: relative;
}
@media (max-width: 1280px) {
    .cardGroup>.localCard{
        width: 230px;
    }
}
@media (max-width: 768px) {
    .localCard{
        padding: 20px;
    }
}


.cardData{
    font-size: 20px;
    padding: 0 10px;
}
.cardPhoto{
    margin: 10px 0;
    border-radius: 16px;
}
.Events{
    width: 416px;
    height: 416px;
}
.Issues{
    width: 416px;
    height: 590px;
}
@media (max-width: 1280px) {
    .Events{
        width: 230px;
        height: 230px;
    }
    .Issues{
        width: 230px;
        height: 326px;
    }
}
@media (max-width: 768px) {
    .Events{
        width: 100%;
        height: 100vw;
    }
    .Issues{
        width: 100%;
        height: unset;
    }
}
.cardTitle{
    font-size: 20px;
    padding: 10px;
}
.cardContent{
    font-size: 16px;
    line-height: 24px;
    padding: 0px 10px 70px 10px;
}
@media (max-width: 1280px) {
    .cardContent>pre{
        white-space: normal;
        font-family: sans-serif;
    }
}
.cardKeepRead{
    position: absolute;
    bottom: 0;
    left: 23%;
    padding: 8px 58px 8px 58px;
    border-radius: 8px;
    background-color: #1D3260;
    color: #ECF5FC;
}
@media (max-width: 1280px) {
    .cardKeepRead{
        left: 23%;
        padding: 8px 30px 8px 30px;
    }
}
@media (max-width: 768px) {
    .cardKeepRead{
        left: 35%;
    }
}
#section4{
    margin-top: 200px;
    padding: 200px 0 0 0;
    position: relative;
}
@media (max-width: 1280px) {
    #section4{
        margin-top: 150px;
        padding: 150px 0 0 0;
    }
}
@media (max-width: 760px) {
    #section4{
        padding: 30% 0 0 0;
    }
}

/* 地球 */

.earth {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 636px;
    height: 636px;
    border-radius: 50%;
    overflow: hidden;
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/306097/QxUBld.jpg)
        50%
        50% /
        cover;
    animation: earthRotate 6s infinite linear;
    z-index: 2;
}
@media (max-width: 1280px) {
    .earth {
        width: 450px;
        height: 450px;
    }
}
@media (max-width: 760px) {
    .earth {
        width: 100%;
        height: 100vw;
    }
}

@keyframes star{
  50%{
    opacity: 0
  }
}


@keyframes earthRotate {
  100% {
    background-position: 250% 50%;
  }
}

#section4>.Layer1{
    width: 100%;
    background: #ECF5FC;
    border-radius:  0 100px 0 100px;
    padding: 50px 0;
    position: absolute;
    bottom: 0;
    height: 70%;
    z-index: 1;
}
@media (max-width: 1280px) {
    #section4>.Layer1{
        border-radius:0  70px 0 70px ;
    }
}
@media (max-width: 768px) {
    #section4>.Layer1{
        display: none;
    }
}
#section4>.Layer>.whale{
    position: absolute;
    top: -50%;
    left: 37%;
    z-index: 4;
    width: 371px;
    height: 231px;
}
#section4>.Layer>.whale>img{
    width: 100%;
    height: 100%;
}
@media (max-width: 1280px) {
    #section4>.Layer>.whale{
        top: -55%;
        left: 35%;
        width: 300px;
        height: 185px;
    }
}
@media (max-width: 768px) {
    #section4>.Layer>.whale{
        position: absolute;
        top: -80%;
        left: 0;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: unset;
        background-color: unset;
        padding: 10px 25px;
        margin-bottom: 20px;
        background-color: #ECF5FC;
    }
    #section4>.Layer>.whale>img{
        width: 87px;
        height: 55px;
    }
} 

#section4>.Layer{
    width: 1280px;
    margin: auto;
    padding: 50px 0;
    position: relative;
    z-index: 3;
    /* background-color: #ff0000; */
}
@media (max-width: 1280px) {
    #section4>.Layer{
        width: 768px;
    }
}
@media (max-width: 768px) {
    #section4>.Layer{
        width: 100%;
    }
}
.productGroup{
    display: flex;
    justify-content: space-between;
    margin: auto;
    z-index: 3;
}
@media (max-width: 1280px) {
    .productGroup{
        width: 768px;
    }
}

.product{
    width: 416px;
    height: 280px;
}
@media (max-width: 1280px) {
    .product{
        width: 230px;
        height: 154px;
    }
}
@media (max-width: 768px) {
    .product{
        width: 100%;
        height: 50vw;
        padding: 0 20px;
    }
    #CarouselProduct>.carousel-indicators{
        bottom: -30%;
    }
    #CarouselProduct>.carousel-indicators>button{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #1D3260;
    }
}
#section4>.Layer>.content{
    width: 1280px;
    display: flex;
    margin: auto;
    z-index: 3;
    font-size: 24px;
    align-items: center;
    justify-content: space-between;
    color: #1D3260;
    margin-top: 30px;
}
@media (max-width: 1280px) {
    #section4>.Layer>.content{
        width: 768px;
        font-size: 18px;
        padding: 0 20px;
    }
}
@media (max-width: 768px) {
    #section4>.Layer>.content{
        width: 100%;
        position: absolute;
        bottom: -40%;
        flex-direction: column;
    }
    #section4>.Layer>.content>pre{
        white-space: normal;
        font-family: sans-serif;
    }
}
@media (max-width: 480px) {
    #section4>.Layer>.content{
        width: 100%;
        position: absolute;
        bottom: -50%;
        flex-direction: column;
    }
    #section4>.Layer>.content>pre{
        white-space: normal;
        font-family: sans-serif;
    }
}
.GoShopee{
    background-color: #1D3260;
    padding: 15px 60px;
    color: #ECF5FC;
    border-radius: 8px;
    border: unset;
    font-size: 24px;
}
@media (max-width: 1280px) {
    .GoShopee{
        background-color: #1D3260;
        padding: 15px 15px;
        color: #ECF5FC;
        border-radius: 8px;
        border: unset;
        font-size: 18px;
    }
}


#section5{
    padding: 300px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
@media (max-width: 768px) {
    #section5{
        margin-top: 20%;
        padding: 200px 0 0 0;
        flex-direction: column;
    }
}
@media (max-width: 480px) {
    #section5{
        margin-top: 10%;
        padding: 230px 0 0 0;
    }
}
#section5>.Layer{
    width: 1280px;
    padding: 100px 0;
    background: #ECF5FC;
    border-radius:0  100px 0 100px ;
}
@media (max-width: 1280px) {
    #section5>.Layer{
        width: 768px;
        border-radius:0  70px 0 70px ;
        padding: 80px 0;
    }
}
@media (max-width: 768px) {
    #section5>.Layer{
        width: 100%;
        height: unset;
        padding:  40px 20px ;
        background-color: unset;
    }
}

#section5>.Layer>.whale{
    position: absolute;
    top: 10%;
    left: 50%;
    width: 371px;
    height: 231px;
    transform: translate(-50%, 0%);
}
#section5>.Layer>.whale>img{
    width: 100%;
    height: 100%;
}
@media (max-width: 1280px) {
    #section5>.Layer>.whale{
        top: 14%;
        width: 300px;
        height: 185px;
    }
}
@media (max-width: 768px) {
    #section5>.Layer>.whale{
        width: unset;
        height: unset;
        width: 100%;
    }
    #section5>.Layer>.whale>img{
        width: 87px;
        height: 55px;
    }
}

#section5>.Layer>pre{
    font-size: 32px;
    text-align: center;
    line-height: 50px;
    color: #1D3260;
}
@media (max-width: 1280px) {
    #section5>.Layer>pre{
        line-height: 36px;
        font-size: 24px;
    }
}
@media (max-width: 768px) {
    #section5>.Layer>pre{
        white-space: normal;
        font-family: sans-serif;
        font-size: 20px;
        padding: 0 0px;
        text-align: left;
    }
}
#section5>.Layer>.content{
    width: 854px;
    margin: auto;
    border-radius:0  100px 0 100px ;
    border: 10px solid #ffffff;
    padding: 20px 50px;
}
@media (max-width: 1280px) {
    #section5>.Layer>.content{
        width: 700px;
        border-radius:0  70px 0 70px ;
    }
}
@media (max-width: 768px) {
    #section5>.Layer>.content{
        width: 100%;
        background-color: #ECF5FC;
        border: unset;
        padding: 50px 20px;
    }
}
.form{
    width: 635px;
    margin: auto;
}
@media (max-width: 1280px) {
    .form{
        width: 550px;
    }
}
@media (max-width: 768px) {
    .form{
        width: 100%;
    }
}
.formTtitle{
    text-align: center;
    font-size: 32px;
    margin-bottom: 20px;
    color: #1D3260;
}
@media (max-width: 1280px) {
    .formTtitle{
        font-size: 28px;
        margin-bottom: 30px;
    }
}
.form>.localRow{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
@media (max-width: 768px) {
    .form>.localRow{
        align-items: unset;
        flex-direction: column;
    }
}
.form>.localRow>label{
    font-size: 24px;
    color: #1D3260;
}
@media (max-width: 1280px) {
    .form>.localRow>label{
        font-size: 20px;
    }
}
@media (max-width: 768px) {
    .form>.localRow>label{
        margin-bottom: 10px;
    }
}
.form>.localRow>label>span{
    color: #ff0000;
}
.form>.localRow>input{
    width: 416px;
    height: 56px;
    border: unset;
    border-radius: 8px;
    font-size: 24px;
    color: #1D3260;
    padding: 10px 10px;
}
@media (max-width: 1280px) {
    .form>.localRow>input{
        width: 350px;
        height: 50px;
        font-size: 20px;
    }
}
@media (max-width: 768px) {
    .form>.localRow>input{
        width: 100%;
        height: 50px;
        font-size: 20px;
    }
}
.messge{
    width: 100%;
    height: 150px;
    border: unset;
    border-radius: 8px;
    font-size: 24px;
    padding: 10px 10px;
    color: #1D3260;
}
.sent{
    display: block;
    width: 200px;
    font-size: 16px;
    border-radius: 8px;
    padding: 8px 0;
    margin: auto;
    margin-top: 30px;
    background: #1D3260;
    color: #ECF5FC;
    border: unset;
}
.customized{
    width: 10px!important;
    height: 10px!important;
    background-color: #1D3260!important;
    border-radius: 50%;
}

.CardM{
    display: none;
}
@media (max-width: 768px) {
    .CardXL{
        display: none;
    }
    .CardM{
        display: block;
    }
}

</style>
