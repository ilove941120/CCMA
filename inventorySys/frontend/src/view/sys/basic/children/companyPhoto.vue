<script setup>
import { ref,reactive,onMounted,onUnmounted } from 'vue';
import { GetCompanyPhoto, AddCompanyPhoto, DeleteCompanyPhoto } from ':@/api/index'
import pageBar from ':@/components/pageBar.vue';

import { useStore } from 'vuex';
const store = useStore();
//#region 接受父層傳送編輯欄位資訊
const sentObj = defineProps({
    sent: {
        type: Object,
        default: () => ({
            value:``,
            label:``
        })
    }
})
//#endregion

onMounted(() => {
    Load()
});


const photoList = reactive([])
//#region 頁面資料仔載入

//#region 頁面比數顯示,當前第幾頁
const pageObj = reactive({
    PageNo:"companyPhoto",
    PhotoNo: "",
    PhotoName: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
//#endregion

const Load = async () => {
    try{
      photoList.length = 0;
      const result = (await GetCompanyPhoto(pageObj)).data
      let status = result.status 
      if (status == "success") {
        pageObj.TatolNum = result.data[0].Total
        result.data.forEach(item => {
            photoList.push(item);
        });
        // store.commit('menuChang',pageObj.PageNo);
      } else {
          store.commit('alertAction', { type: "fail", msg: '異常問題,刪除失敗' });
      }
    }
    catch(err){
        let status = err.response.data.status
        let errMsg = err.response.data.msg
        if(status == "restart"){
            store.commit('alertAction', { type: "fail", msg: errMsg })
            sessionStorage.removeItem("user");
            store.commit('logoutAction', {status:"S"});
            router.push('/Login');
        }
    }
}
//#endregion

//#region 刪除資料
const Delete = async (CpId) => {
    const obj =reactive({CpId:CpId})
    try{
        const result = (await DeleteCompanyPhoto(obj))
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            Load()
        } else {
            store.commit('alertAction', { type: "fail", msg: '異常問題,刪除失敗' });
        }
    }
    catch(err){
        console.log(err)
        let errMsg = err.response.data.msg
        store.commit('alertAction', { type: "fail", msg: errMsg })
    }
}
//#endregion

//#region 頁面切換
const ReturnPage = (data) => {
    if (data == 1) {
        pageObj.Index = 0
    }
    else {
        pageObj.Index = pageObj.ShowNum * (data - 1)
    }
    Load()
}
//#endregion

const photoInput = ref(null);
const photoData = reactive({
    CwId:1,
    PhotoName:``,
    PhotoDesc:``,
    PhotoHref:``
})

const FileClick = (event) => {
    // 当点击目标不是 input 元素时，触发 input 的点击事件
    if (event.target !== photoInput.value) {
        photoInput.value.click();
    }
}
function LocalPhoto (){
    const file = photoInput.value.files[0];
    console.log(file)
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (a) => 
    {
        photoData.PhotoName = file.name
        photoData.PhotoHref = a.target.result;
    }
    reader.readAsDataURL(file);
}

const popViewShow =ref(false)
function ChangePop(){
    var popNowStatus = popViewShow.value
    if(popNowStatus && !!photoData.PhotoHref){
        for(let key in photoData) {
            photoData[key] = '';
        }
    }
    popViewShow.value = !popNowStatus
}

//#region 儲存表單資料
const Save = async () => {
    try {
        if(!!!photoData.PhotoHref){
            store.commit('alertAction', { type: "fail", msg: '目前未上傳圖片' });
            return
        }
        const result = await AddCompanyPhoto(photoData)
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            ChangePop()
            Load()
            for (let key in photoData) {
                if(key != "CwId"){
                    photoData[key] = '';
                }
            }
        } else {
            store.commit('alertAction', { type: "fail", msg: '異常問題,新增失敗' });
        }
    } catch (error) {
        let errMsg = error.response.data.msg;
        store.commit('alertAction', { type: "fail", msg: errMsg })
    }
}
//#endregion

</script>

<template>
   <div class="content">
    <div class="navbar">
        <div class="col"></div>
        <div class="col rightStyle"><button class="addButton" @click="ChangePop"><i class="fa-solid fa-plus"></i>圖片</button></div>
    </div>
    <div class="cardGroup">
        <div class="card" v-for="item in photoList">
            <button class="deletePhoto" @click="Delete(item.CpId)"><i class="fa-solid fa-xmark"></i></button>
            <img :src="item.PhotoHref" alt="">
        </div>
    </div>
    <pageBar :sent="pageObj" @change="ReturnPage"></pageBar>
   </div>
   <div class="popView" v-if="popViewShow">
    <div class="content inStyle" >
        <div class="contentHead">
        </div>
        <div class="contentBody">
            <div class="photo" @click="FileClick">
                <span v-if="!photoData.PhotoHref"><i  class="fa-solid fa-plus"></i>選擇圖片</span>
                <img v-if="photoData.PhotoHref" :src="photoData.PhotoHref" alt="Preview" />
                <input type="file" ref="photoInput" style="display: none;" @change="LocalPhoto()"/>
            </div>
        </div>
        <div class="contentFoot">
            <button class="addButton" @click="ChangePop">關閉</button>
            <button class="addButton" @click="Save" v-if="photoData.PhotoHref" ><i class="fa-solid fa-floppy-disk"></i>儲存</button>
        </div>
    </div>
   </div>
</template>

<style scoped>
.content {
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px 0px rgba(115, 108, 203, 0.23);
    border-radius: 4px;
    padding: 20px;
}
.navbar{
    margin-bottom: 10px;
}
.addButton{
    margin: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    box-shadow: 0px 0px 2px 1px #a7afa7;
}
.addButton:hover {
    background-color: #fcffce;
}
.rightStyle{
    display:flex;
    justify-content: flex-end;
}
.cardGroup{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 20px;
}
.card{
    width: 18%;
    aspect-ratio: 1/1;
    position: relative;
    padding: 20px 10px;
    margin: 10px;
}
@media (max-width: 1280px){
    .card{
        width: 30%;
    }
}
@media (max-width: 768px){
    .card{
        width: 100%;
        margin: 10px;
    }
}
.card>span{
    text-align: center;
    padding: 5px;
}
.card>img{
    height: 100%;
    object-fit: contain;
}
.deletePhoto{
    position: absolute;
    top: 0px;
    right: 0px;
    border: 0;
    background-color: unset;
}
.deletePhoto:hover{
    color: red;
}
.popView{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 50px;
    background-color: #000000b0;
}
.inStyle{
    width: 70%;
    margin: auto;
    height: 400px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}   
@media (max-width: 768px){
    .inStyle{
        height: 300px;
    }
}
.contentBody{
    width: 100%;
    margin-bottom: 20px;
}
.contentFoot{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
}

.photo{
    width: 95%;
    height: 300px;
    margin: auto;
    border: 3px #285943 dashed;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px;
}
@media (max-width: 768px){
    .photo{
        height: 200px;
    }
}
.photo:hover{
    background-color: #aedb847a;
}
.photo>img{
    height: 100%;
    object-fit: contain;
}

</style>
