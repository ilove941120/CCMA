<script setup>
import { ref, reactive,watchEffect,onMounted } from "vue";
import alert from ':@/components/alert.vue';
import { GetCyyIndexContent,GetCyyIndexProductSiwper
    ,UpdateCyyWebBanner,DeletCyyWebBanner
    ,UpdateCyyWebAbout,DeletCyyWebAbout
    ,UpdateCyyWebShopText
    ,UpdateCyyWebFooter,DeletCyyWebFooter
 } from ':@/api/index'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useStore } from 'vuex';
const store = useStore();

// swiper
const coverflowEffect = {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  };

const modules = [EffectCoverflow, Pagination];
const ProductList = reactive([])

const BannerInput = ref(null);
const AboutInput = ref(null);
const imageData = reactive(
    {
        BannerInput:``,
        AboutInput:``,
    }
);

const footerFields = reactive(
    [
      { key: 'FootTitle', label: '官網名稱' },
      { key: 'ContactAddress', label: '地址' },
      { key: 'ContactPhone', label: '電話' },
      { key: 'ContactEmail', label: '信箱' },
      { key: 'ServiceTime', label: '服務時間' },
      { key: 'CopyrightNotice', label: '版權聲明' },
    ]
)

const IndexData = reactive({
    CiContentId:1,
    CwId:1,
    Banner: {PhotoName:``,PhotoDesc:``,PhotoHref:``,photoChange:false},
    About: {AboutText:``,PhotoName:``,PhotoDesc:``,PhotoHref:``,textChange:true,photoChange:false},
    Shop: {ShopText:``,textChange:true},
    Web: {PhotoName:``,PhotoDesc:``,PhotoHref:``,photoChange:false},
    Shop:{ShopText:``},
    Footer:{FootTitle:``,ContactAddress:``,ContactPhone:``,ContactEmail:``, ServiceTime:``,CopyrightNotice:``}
})
var form = reactive({
    CiContentId:-1,
    CwId:-1,
})



//#region 頁面資料仔載入
const BannerData = reactive({

})
const Load = async () => {
    try{
      const result = (await GetCyyIndexContent(IndexData)).data
      let status = result.status 
      if (status == "success") {
        if(result.data.length>0){
            result.data.forEach((item)=>{
                form.CiContentId = item.CiContentId
                form.CwId = item.CwId
                IndexData.Banner.PhotoName = item.BannerPhotoName
                IndexData.Banner.PhotoHref = item.BannerHref
                IndexData.About.AboutText = item.AboutText
                IndexData.About.PhotoName = item.AboutPhotoName
                IndexData.About.PhotoHref = item.AboutHref
                IndexData.Shop.ShopText = item.ShopText
                
                IndexData.Footer.FootTitle = item.FootTitle
                IndexData.Footer.ContactAddress = item.ContactAddress
                IndexData.Footer.ContactPhone = item.ContactPhone
                IndexData.Footer.ContactEmail = item.ContactEmail
                IndexData.Footer.ServiceTime = item.ServiceTime
                IndexData.Footer.CopyrightNotice = item.CopyrightNotice
                LoadProductSiwper()
            })
        }
        else{
            // for (let key in BannerData) {
            //     BannerData[key] = '';
            // }
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
const LoadProductSiwper = async () => {
    try{
      const result = (await GetCyyIndexProductSiwper(IndexData)).data
      let status = result.status 
      if (status == "success") {
        if(result.data.length>0){
            result.data.forEach((item)=>{
                ProductList.push(item.PhotoHref)
            })
        }
        else{
            store.commit('alertAction', { type: "fail", msg: '產品區尚未有產品上架' });
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
const Save = async (type) => {
    try {
        var result 
        switch(type){
            case "Banner":
                if(!IndexData.Banner.photoChange){
                    store.commit('alertAction', { type: "fail", msg: '目前圖片未更換' });
                    return
                }
                if(!!!IndexData.Banner.PhotoHref){
                    store.commit('alertAction', { type: "fail", msg: '目前未上傳圖片' });
                    return
                }
                form.PhotoName = IndexData.Banner.PhotoName;
                form.PhotoDesc = IndexData.Banner.PhotoDesc;
                form.PhotoHref = IndexData.Banner.PhotoHref;
                result = await UpdateCyyWebBanner(form);
                break;
            case "About":
                form.AboutText = IndexData.About.AboutText;
                form.PhotoName = IndexData.About.PhotoName;
                form.PhotoDesc = IndexData.About.PhotoDesc;
                form.PhotoHref = IndexData.About.PhotoHref;
                form.textChange = IndexData.About.textChange;
                form.photoChange = IndexData.About.photoChange;
                result = await UpdateCyyWebAbout(form);
                break;
            case "Shop":
                form.ShopText = IndexData.Shop.ShopText;
                result = await UpdateCyyWebShopText(form);

                break;
            case "Footer":
                const { FootTitle, ContactAddress, ContactPhone, ContactEmail,ServiceTime, CopyrightNotice } = IndexData.Footer;
                form.FootTitle = FootTitle;
                form.ContactAddress = ContactAddress;
                form.ContactPhone = ContactPhone;
                form.ContactEmail = ContactEmail;
                form.ServiceTime = ServiceTime;
                form.CopyrightNotice = CopyrightNotice;
                result = await UpdateCyyWebFooter(form);
                break;
        }
        
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            Load()
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
const Delet = async (type) => { 
    try{
        var result 
        switch(type){
            case "Banner":
                result = (await DeletCyyWebBanner(form))
                break;
            case "About":
                result = (await DeletCyyWebAbout(form))
                break;
            case "Web":
                break;
            case "Footer":
                result = (await DeletCyyWebFooter(form))
                break;
        }
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
        let errMsg = err.response.data.msg
        store.commit('alertAction', { type: "fail", msg: errMsg })
    }
}
//#endregion

//#region 選取照片
const Change = (type) =>{
    switch(type){
        case "Banner":
            BannerInput.value.click()
            break;
        case "About":
            AboutInput.value.click()
            break;
        case "Web":
            break;
    }
}

const previewImage = (Input,name) =>{
    const file = Input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (a) => 
    {
        IndexData[name].PhotoHref = a.target.result;
        IndexData[name].PhotoName = file.name;
        IndexData[name].PhotoDesc = name;
        IndexData[name].photoChange = true
    }
    reader.readAsDataURL(file);
}
//#endregion


onMounted(() => {
    Load()
});

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
                <img v-if="!!IndexData.Banner.PhotoHref" :src="IndexData.Banner.PhotoHref" :alt="IndexData.Banner.PhotoName" />
                <input type="file" ref="BannerInput" @change="previewImage(BannerInput,'Banner')" style="display: none;"/>
            </div>
            <div class="buttonBar">
                <button @click="Save('Banner')">儲存</button>
                <button @click="Change('Banner')">更換</button>
                <button @click="Delet('Banner')">清除</button>
            </div>
        </div>
        <div class="area">
            <h4>首頁-關於我區塊</h4>
            <label for="">內容</label>
            <textarea name="" id="" cols="30" rows="10" v-model="IndexData.About.AboutText"></textarea>
            <div class="photoBlock">
                <img v-if="!!IndexData.About.PhotoHref" :src="IndexData.About.PhotoHref" :alt="IndexData.About.PhotoName" />
                <input type="file" ref="AboutInput" @change="previewImage(AboutInput,'About')" style="display: none;"/>
            </div>
            <div class="buttonBar">
                <button @click="Save('About')">儲存</button>
                <button @click="Change('About')">更換</button>
                <button @click="Delet('About')">清除</button>
            </div>
        </div>
        <div class="area">
            <h4>首頁-渝渝小物區塊</h4>
            <label for="">內容</label>
            <textarea name="" id="" cols="30" rows="10" v-model="IndexData.Shop.ShopText"></textarea>
            <button @click="Save('Shop')">儲存</button>
            <swiper
                effect="coverflow"
                :grabCursor="true"
                :centeredSlides="true"
                slidesPerView="auto"
                :coverflowEffect="coverflowEffect"
                :pagination="true"
                :modules="modules"
                :initialSlide="1"
                :spaceBetween="100"
                class="mySwiper"
            >
                <swiper-slide v-for="img in ProductList" :key="img">
                <img :src="img" />
                </swiper-slide>
            </swiper>
        </div>
        <!-- <div class="area">
            <h4>首頁-民眾服務區塊</h4>
            <label for="">內容</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <button>儲存</button>
        </div>   -->
        <div class="area">
            <h4>首頁-Footer區塊</h4>
            <div class="footerFields" v-for="field in footerFields" :key="field.key">
                <label>{{ field.label }}</label>
                <input type="text" v-model="IndexData.Footer[field.key]">
            </div>
            <div class="buttonBar">
                <button @click="Save('Footer')">儲存</button>
                <button @click="Delet('Footer')">清除</button>
            </div>
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
    .buttonBar{
        display: flex;
        flex-direction: row-reverse;
    }
    button{
        margin-left: 10px;
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
    .footerFields{
        display: flex;
        flex-direction: column;
    }

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 30%!important;
  aspect-ratio: 1/1;

  /* height: 300px!important; */
}

.swiper-slide img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover!important;

}

</style>
