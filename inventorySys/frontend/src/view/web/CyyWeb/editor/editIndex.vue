<script setup>
import { ref, reactive,watchEffect,onMounted } from "vue";
import alert from ':@/components/alert.vue';
import { GetImg,AddImg,DeletImg,GetCompanyPhoto, AddCompanyPhoto, UpdateCompanyPhoto, DeleteCompanyPhoto  } from ':@/api/index'
import { useStore } from 'vuex';
const store = useStore();

const BannerInput = ref(null);
const AboutInput = ref(null);
const imageData = reactive(
    {
        BannerInput:``,
        AboutInput:``,
    }
);

const BannerObj = reactive({
})

const form = reactive({
    CwId:1,
    PhotoName:``,
    PhotoDesc:``,
    PhotoHref:``
})


function previewImage (Input,name){
    const file = Input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (a) => 
    {
        imageData[name] = a.target.result;
        form.PhotoName = file.name
        form.PhotoDesc = name
        form.PhotoHref = a.target.result;
    }
    reader.readAsDataURL(file);
}

//#region 頁面資料仔載入
const BannerData = reactive({

})
const load = async () => {
    try{
      const result = (await GetCompanyPhoto()).data
      let status = result.status 
      if (status == "success") {
        if(result.data.length>0){
            result.data.forEach((item)=>{
                BannerData.ImgName = item.ImgName
                BannerData.ImgSpec = item.ImgSpec
                BannerData.href = item.href
                BannerData.Id = item.CyyImgId
            })
        }
        else{
            for (let key in BannerData) {
                BannerData[key] = '';
            }
            store.commit('alertAction', { type: "fail", msg: 'Banner區尚未有圖片' });
        }
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

//#region 儲存表單資料
const Save = async () => {
    try {
        if(!!!form.PhotoHref){
            store.commit('alertAction', { type: "fail", msg: '目前未上傳圖片' });
            return
        }
        console.log("執行")
        const result = await AddCompanyPhoto(form)
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            load()
            // for (let key in form) {
            //     form[key] = '';
            // }
        } else {
            store.commit('alertAction', { type: "fail", msg: '異常問題,新增失敗' });
        }
    } catch (error) {
        let errMsg = error.response.data.msg;
        store.commit('alertAction', { type: "fail", msg: errMsg })
    }
}
//#endregion

//#region 刪除資料
const Delet = async () => { 
    try{
        const result = (await DeleteCompanyPhoto(BannerData))
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            load()
        } else {
            store.commit('alertAction', { type: "fail", msg: '異常問題,刪除失敗' });
        }
    }
    catch(err){
        let errMsg = err.response.data.msg
        store.commit('alertAction', { type: "fail", msg: errMsg })
    }
}
//#endregion


</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="form">
        <div class="formTitle">
            <div class="col"><div>當前版本</div></div>
            <div class="col end">
                <button class="add">新版本</button>
                <button class="add">發佈</button>
            </div>
        </div>
        <div class="area">
            <h4>首頁-Banner區塊</h4>
            <div class="photoBlock">
                <img v-if="!!BannerData.href" :src="BannerData.href" :alt="BannerData.ImgSpec" />
                選取圖片
                <img v-if="imageData.BannerInput" :src="imageData.BannerInput" alt="Preview" />
                <input type="file" ref="BannerInput" @change="previewImage(BannerInput,'BannerInput')" />
            </div>
            <button @click="Delet">刪除</button>
            <button @click="load">讀取</button>
            <button @click="Save">儲存</button>
        </div>
        <div class="area">
            <h4>首頁-關於我區塊</h4>
            <label for="">內容</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div class="photoBlock">
                <img v-if="imageData.AboutInput" :src="imageData.AboutInput" alt="Preview" />
                <input type="file" ref="AboutInput" @change="previewImage(AboutInput,'AboutInput')" />
            </div>
            <button>儲存</button>
        </div>
        <div class="area">
            <h4>首頁-渝渝小物區塊</h4>
            <label for="">內容</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <div class="productBlock">商品區域</div>
            <button>儲存</button>
        </div>
        <div class="area">
            <h4>首頁-民眾服務區塊</h4>
            <label for="">內容</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button>儲存</button>
        </div>
        <div class="area">
            <h4>首頁-Footer區塊</h4>
            <label for="">官網名稱</label>
            <input type="text">
            <label for="">地址</label>
            <input type="text">
            <label for="">電話</label>
            <input type="text">
            <label for="">信箱</label>
            <input type="text">
            <label for="">服務時間</label>
            <input type="text">
            <label for="">版權聲明</label>
            <input type="text">
            <button>儲存</button>
        </div>
    </div>
</template>

<style scoped>
    .form{
        padding:20px 0;
    }
    .col{
        display: flex;
    }
    .end{
        flex-direction: row-reverse;
    }
    .end>button{
        margin-left: 10px;
    }

    .area{
        width: 100%;
        padding: 20px;
        position: relative;
        background-color: #fcfbf4;
        border-radius: 5px;
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
    }
    button{
        display: inline-block;
        margin-left: auto;
        margin-top: 30px;
        padding: 8px 30px;
        border-radius: 4px;
        border: unset;
        background-color: #57ca5d;
        color: #fcfbf4;
    }
    .area>button:hover{
        background-color: #a835a2;
        transition-duration: 0.5s;
    }
    .formTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .add{
        background-color: #5776ca;
        margin: 0;
    }
    .add:hover{
        background-color: #a88935;
        transition-duration: 0.5s;
    }
    .photoBlock{
        width: 100%;
        border: 1px solid #18521027;
        display:flex;
        justify-content: center;
        padding: 30px 0;
        flex-direction: column;
        align-items: center;
    }
    .photoBlock>img{
        display: inline-block;
        width:50%;
        border: 1px solid #18521027;
    }
    .productBlock{
        width: 100%;
        height: 500px;
        border: 1px solid #18521027; 
    }
    h4{
        padding: 0;
        margin: 10px 0 ;
        font-weight: bolder;
    }
    textarea,input {
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgb(180, 180, 180);
    }
</style>
