<script setup>
import { ref,reactive } from 'vue'
// name : events.vue

const eventData = reactive({
   eventTitle:`參與台北環保論壇，爭取海洋友善環境！`,
   eventDate:`發表日期：2023/12/26`,
   text:`
在一個美麗的夏日早晨，台北舉辦了一場重要的環保論壇，重點討論如何建立一個海洋友善的環境。這次論壇吸引了來自政府、學術界、環保組織和當地社區的代表，他們都熱衷於保護台灣的海洋生態系統。

陳英渝是這次論壇的主要參與者之一。她一直以來都關心海洋環保議題，並且她提出了相關的法案。當她站在論壇的講台上，她分享了自己的熱情和承諾，以及她的願景，即建立一個海洋友善的台灣。

陳英渝提到了海洋污染、過度捕撈和海洋生態系統的崩壞，並指出這些問題對台灣的經濟和環境都帶來了嚴重影響。她提出了一系列政策建議，包括提高海洋保護區的規模，加強海洋監測和執法，以及推動環保教育。

此外，陳英渝強調了社區參與的重要性，她鼓勵當地社區和環保團體共同參與保護台灣的海洋環境。她分享了一個案例，講述當地一個小漁村如何透過清潔海灘和減少塑料使用，改變了他們的社區，使之變得更加環保友善。

論壇結束後，陳英渝與其他與會者互動，收集了更多意見和建議。她承諾將努力推動相應的法案。她感到非常滿足，因為她知道她不僅參與了一個重要的環保討論，還鼓勵了更多人一同努力，以建立一個更加海洋友善的台灣。這次論壇標誌著一個新的開始，為台灣的海洋環境保護帶來了希望。

   `,
   eventPhoto:[
      {id:0,href:`/CyyWebimg/event-1.png`},
      {id:1,href:`/CyyWebimg/event-2.png`},
      {id:2,href:`/CyyWebimg/event-3.png`},
      {id:3,href:`/CyyWebimg/event-4.png`},
      {id:4,href:`/CyyWebimg/event-5.png`}
   ],
})


</script>

<template>
    
    <section class="section">
        <div class="eventTitle">{{ eventData.eventTitle }}
        </div>
        <div class="eventContent">
            <div class="eventDate">{{ eventData.eventDate }}</div>
            <div class="text">
                <pre>
                  {{ eventData.text }}
                </pre>
            </div>
        </div>
        <div class="eventPhoto">
            <div class="basic" v-for="value in eventData.eventPhoto" :class="'item'+value.id" :key="value.id">
               <img :src="value.href" alt="">
            </div>
            <!-- <div class="basic item1">1</div>
            <div class="basic item2">2</div>
            <div class="basic item3">3</div>
            <div class="basic item4">4</div>
            <div class="basic item5">5</div> -->
        </div>
    </section>

</template>

<style scoped>
    .section{
        width: 1280px;
        margin: auto;
    }
    @media (max-width: 1280px) {
      .section{
         width: 768px;
      }
   }
   @media (max-width: 768px) {
      .section{
         width: 100%;
         padding: 0 20px;
      }
   }
    .eventContent{
        width: 100%;
        color:  #1D3260;
    }
    .eventTitle{
        text-align: center;
        font-weight: bolder;
        font-size: 32px;
        margin: 50px 0;
    }
    .eventDate{
        padding: 10px; /* 添加內邊距 */
        font-size: 24px;
    }
    .text>pre{
        font-size: 24px;
        white-space: pre-wrap; /* 保留格式並自動換行 */
        word-wrap: break-word; /* 為了兼容性，添加這行 */
        padding: 10px; /* 添加內邊距 */
        margin: 0 auto; /* 使容器居中 */
        line-height: 36px;
    }
    .eventPhoto {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        /* grid-template-rows: repeat(2, 100px); */
        gap: 20px; /* 間隔 */
    }
    .basic{
        aspect-ratio: 1 / 1; /* 1:1 的寬高比 */
        border-radius: 16px;
    }
    .basic>img{
      width: 100%;
    }
    .item0 {
      grid-column: span 1;
      grid-row: span 1;
      /* background-color: lightcoral; */
    }
    .item1 {
      grid-column: 2 /2;
      grid-row: 1;
      /* background-color: lightgreen; */
    }
    .item2 {
      grid-column:span 1;
      grid-row:2/2;
      /* background-color: lightblue; */
    }
    .item3 {
      grid-column: span 1;
      grid-row:  2 /2;
      /* background-color: lightgoldenrodyellow; */
    }
    .item4 {
      grid-column: 3/5;
      grid-row: span 2;
      /* background-color: lightpink; */
    }
</style>
