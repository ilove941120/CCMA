<script setup>
import editIndex from ':@/view/web/CyyWeb/editor/editIndex.vue';
import editDonate from ':@/view/web/CyyWeb/editor/editDonate.vue';
import addEvent from ':@/view/web/CyyWeb/editor/addEvent.vue';
import addPolicyIssues from ':@/view/web/CyyWeb/editor/addPolicyIssues.vue';
import addProduct from ':@/view/web/CyyWeb/editor/addProduct.vue';

import { ref, reactive,watchEffect } from "vue";
const blockShow =ref(0)
const contentData = reactive([
    {id:0,
     blockName:`官網資訊`,
    },
    {id:1,
     blockName:`活動列表`,
    },
    {id:2,
     blockName:`議題列表`,
    },
    {id:3,
     blockName:`產品列表`,
    },
])

function openBlock(Id){
    blockShow.value = Id
}
</script>

<template>
   <h2>編輯器</h2>
   <div class="content">
    <div class="contentIn">
        <div class="localNavbar">
            <div class="item" :class="blockShow == item.id ? `active`:``" v-for="item in contentData" @click="openBlock(item.id)">{{ item.blockName }}</div>
        </div>
        <editIndex v-if="blockShow == 0"/>
        <addEvent v-if="blockShow == 1"/>
        <addPolicyIssues v-if="blockShow == 2"/>
        <addProduct v-if="blockShow == 3"/>
    </div>
   </div>
   
 
</template>

<style scoped>
.active{
    color: #db820e;
    font-weight: bolder;
}
.content{
    width: 100%;
    min-height: 80px;
    margin: auto;
    position: relative;
    padding: 25px;
    border:  1px solid #18521062;
    background: linear-gradient(#dfc3c35e 1px, transparent 1px),
                linear-gradient(90deg, #dfc3c35e 1px, transparent 1px);
    background-size:  40px 40px; 
    background-color: #aedb847a;
}

.content::before{
    content: "";
    position: absolute;
    display: block;
    top: -1px;
    left: -1px;
    width: 0;
    height: 0;
    border-width: 30px 30px 0 0;
    border-color: #18521054 transparent transparent transparent;
    border-style: solid;
}
.contentIn::before{
    content: "";
    position: absolute;
    display: block;
    top: -1px;
    left: -1px;
    width: 0;
    height: 0;
    border-width: 28px 28px 0 0 ;
    border-color: #EAEEF3 transparent transparent transparent;
    border-style: solid;
}
.content::after{
    content: "";
    position: absolute;
    display: block;
    bottom: -1px;
    right: -1px;
    width: 0;
    height: 0;
    border-width:  0 0 28px 28px;
    border-color:  transparent transparent #EAEEF3 transparent ;
    border-style: solid;
}
.contentIn::after{
    content: "";
    position: absolute;
    display: block;
    bottom: -1px;
    right: -1px;
    width: 0;
    height: 0;
    border-width: 0 0 30px 30px;
    border-color:  transparent  transparent #18521054 transparent ;
    border-style: solid;
} 

.localNavbar{
    padding-bottom: 15px;
    border-bottom: 3px solid #18521027;
}
.item{
    display: inline;
    width: 100px;
    padding:0 20px;
    border-right: 3px solid #185210c2;
    font-size: 24px;
    cursor: pointer;
}
.item:last-child{
    border-right: none;
}
.item:hover{
    font-weight: bolder;
    color: white;
    text-shadow: 0px 0px 6px #f39d00;
    /* transition-duration: 0.5s; */
}

</style>
