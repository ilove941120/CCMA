<script setup>
import { ref,reactive } from 'vue'
// name : LatestEvents.vue
const cardData = reactive([
  {
    id: 0,
    cardDate:`2023/12/26`,
    cardPhoto:`https://s3-alpha-sig.figma.com/img/5765/7e66/bcb38e842ba6b675422dcd43ceabe476?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qfJb9W74iUqzPyO0iqxj67uGZJLNPKke42b6ZJD0QByU4OztjPMHiLgNmJvEOefLxlPKiFE6TLD9Ry8TTlCDt3Vp1IC0Qzdbe9t0domUyHdFP4ubdjaWeyBXpEOERf40xWneQp8ZCxR4QqTl05hgO3shC1yHR0uBaE9qyZmziXyMzik9DcUxjvke0rKOHrbxWW-O2oxANorwt9g2fV0kTiK7RFWAVRmjAxS64cJwaXZ-jGGT4va0NUxHxoEQQFarbPxqKnQDzGJz4EYUWlTlpid9ZgtQfi8eI-uTpjisBIeFdfR-L7SFu4dmlCMhMVDuWoemBuEYceR3P0plJNYDDw__`,
    cardTitle:`參與台北環保論壇，爭取海洋友善環境`,
    href:`https://www.google.com.tw/?hl=zh_TW`
  },
  {
    id: 1,
    cardDate:`2023/12/25`,
    cardPhoto:`https://s3-alpha-sig.figma.com/img/9365/b58c/1e76384288969b487d9ae8f8ba1f59a7?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aDQ9fAvaQhsFbSB232ZBNqnBGg5iVsKWNF5ha2R9AjRIw2D~inhT4unTodt-eHpugQtgXmdHNFRcGCJHCdaKS11OOQOaPp~SzgEvvkuOhcn1lLDMbQ1QzRLvgm4idhhtASoZwEa8fFJ6SXh88QjjZEuZU5GKMpaEo-NRIqsEsyVMUogEdgtn8AS4XQc3HRcVHUoRcX9obJevliBnp90EOvlSijmt4MVSE7U9kEfrJ0CqBdGLxeBZ-iGCyHNeVJB93Q4QZRIM6RZRB81fLJOIPqsgnjIr0GiCd2HChOLYXBcvQeKxxEkIrEK5SjqXuzskFoqe6ODzQkDZ4D34QUz~qA__`,
    cardTitle:`掃街模式開啟！帶起鯨魚帽來和我一起走！`,
    href:`Events`
  },
  {
    id: 2,
    cardDate:`2023/12/25`,
    cardPhoto:`https://s3-alpha-sig.figma.com/img/fee4/97e0/3887bdb26d2c27508231b870f9787c87?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=msuYKFSKd79UUnFoR5E0U-mLOQ2KwU2SaPDUcK7MWt-KgL~Sr8KAfR8L9OkNzrZ4BrGlPZonAmSD5EFJJaato2iba~H00Kgbf~gIfbHBxdzTYBW8hOIRUjTEtdpgNsI4MscBqJoTbWt5Duggu4qfW4w-plN-v4sWI25tXbilW0dOZNfLzZsR1QTW~sZMtaEhz3AuSevmgn77NiGN6xpND3JnP1x4dPgLR~4k6fKlyxEVLKKz~GOdmwuiMQCyEpMJ-u~2CrEhwwOl9hT2H6A5ADa0I3C2urTr3lWtbFNK~BSY1D7qKHlRd3ggC9bF6QESEBLovFHDdtfEz~Np43llwQ__`,
    cardTitle:`香香的烤魷魚活動！`,
    href:`Events`
  },
  {
    id: 3,
    cardDate:`2023/12/26`,
    cardPhoto:`https://s3-alpha-sig.figma.com/img/5765/7e66/bcb38e842ba6b675422dcd43ceabe476?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qfJb9W74iUqzPyO0iqxj67uGZJLNPKke42b6ZJD0QByU4OztjPMHiLgNmJvEOefLxlPKiFE6TLD9Ry8TTlCDt3Vp1IC0Qzdbe9t0domUyHdFP4ubdjaWeyBXpEOERf40xWneQp8ZCxR4QqTl05hgO3shC1yHR0uBaE9qyZmziXyMzik9DcUxjvke0rKOHrbxWW-O2oxANorwt9g2fV0kTiK7RFWAVRmjAxS64cJwaXZ-jGGT4va0NUxHxoEQQFarbPxqKnQDzGJz4EYUWlTlpid9ZgtQfi8eI-uTpjisBIeFdfR-L7SFu4dmlCMhMVDuWoemBuEYceR3P0plJNYDDw__`,
    cardTitle:`參與台北環保論壇，爭取海洋友善環境`,
    href:`Events`
  },
  {
    id: 4,
    cardDate:`2023/12/25`,
    cardPhoto:`https://civetaf.com/cdn/shop/products/IMG_0600_1024x1024.jpg?v=1626018265`,
    cardTitle:`掃街模式開啟！帶起鯨魚帽來和我一起走！`,
    href:`Events`
  },
  {
    id: 5,
    cardDate:`2023/12/25`,
    cardPhoto:`https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/M01/013/14/M010131437_b_01.jpg&v=61305352k&w=&h=&q=`,
    cardTitle:`香香的烤魷魚活動！`,
    href:`Web/Cyy/Events`
  },
])

// a標籤 結構加上 target="_blank" 可以開啟新視窗
</script>

<template>
   <h1 class="PageTitle">最新活動</h1>
  <div class="content">
    <router-link  class="localCard" :to="item.href"  v-for="item in cardData" :key="item.id">
        <div class="cardDate">{{item.cardDate}}</div>
        <div class="cardPhoto">
          <img  :src="item.cardPhoto" alt="">
        </div>
        <div class="cardTitle">{{item.cardTitle}}</div>
    </router-link>
  </div>

</template>

<style scoped>
.PageTitle{
   text-align: center;
   margin: 50px 0;
   color: #1D3260;
}
.content{
  width: 1280px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
@media(max-width: 1280px){
  .content{
    width: 768px;
  }
}
@media(max-width: 768px){
  .content{
    width: 100%;
    padding: 0 20px;
  }
}
.content .localCard{
  width: 30%;
  text-decoration: unset;
  color: #1D3260;
}
@media(max-width: 768px){
  .content .localCard{
    width: 100%;
  }
}
.localCard,.cardDate{
  font-size: 20px;
  padding-bottom: 10px;
}
.localCard>.cardPhoto{
  width: 100%;
  aspect-ratio: 1 / 1; /* 1:1 的寬高比 */
  overflow: hidden;
  position: relative;
}
.localCard>.cardPhoto>img{
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 使用 CSS 轉換居中 */
}
.localCard,.cardTitle{
  font-size: 24px;
  padding: 20px 0;
  letter-spacing: 5px;
  line-height: 40px;
}
@media(max-width: 1280px){
  .localCard,.cardTitle{
    letter-spacing: 3px;
    line-height: 30px;
  }
}
@media(max-width: 768px){
  .localCard,.cardTitle{
    font-size: 20px;
  }
}
</style>
