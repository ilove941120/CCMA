<script setup>
import { ref, reactive,watch } from "vue";
import { GetMtlItem,GetCompanyPhoto,GetCyyProductPhoto,GetCyyEventPhoto
,AddCyyEventPhoto} from ':@/api/index'
import alert from ':@/components/alert.vue';
import pageBar from ':@/components/pageBar.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useStore } from 'vuex';
const store = useStore();

//#region 基本參數宣告
const sentObj = defineProps({
    sent: {
        type: Object,
        default: () => ({ msg: '尚無資料', color: '尚無資料' })
    }
})
let view
let show
let Id
let CwId

// swiper
const coverflowEffect = {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  };

const modules = [EffectCoverflow, Pagination];
//#endregion

//#region 監控視窗開啟
watch(sentObj.sent, (newValue, oldValue) => {
    view = sentObj.sent.nowView
    show = sentObj.sent.show
    Id = sentObj.sent.Id
    CwId = sentObj.sent.CwId
    switch(view){
        case "MtlItem":
            popViewObj.popViewTitle = `查看品號相關資料`
            break
        case "Photo":
            popViewObj.popViewTitle = `查看公司圖片庫`
            break
        case "ProductPhoto":
            popViewObj.popViewTitle = `查看產品圖片庫`
            break
        case "EventPhoto":
            popViewObj.popViewTitle = `查看活動圖片庫`
            break
    }
    popViewObj.show = show,
    popViewObj.nowView = view
    popViewObj.Id = Id
    popViewObj.CwId = CwId
    LoadPopViewData(popViewObj)
});
//#endregion

//#region 彈窗相關
const popViewObj = reactive({
    show:false,
    popViewTitle:``,
    nowView:``,
    childrenViewShow:false,
    childrenView:``,
    Id:-1
})
const ClosePopView = (view) =>{
    popViewObj.show = false
    popViewObj.popViewTitle = ''
    popViewObj.nowView = ''
    sentObj.sent.show = false
    sentObj.sent.popViewTitle = ``
    sentObj.sent.show = ``
    sentObj.sent.Id = -1
    Return()
}
const popMtlItemList = reactive([
    {
        name:`#`,
    },
    {
        name:`品號代號`,
    },
    {
        name:`品號名稱`,
    },
    {
        name:`品號描述`,
    },
    {
        name:`狀態`,
    },
    {
        name:`操作`,
    }
])
//#endregion

//#region 頁面資料取得
//#region 各視窗頁面列表條件
const MtlItemObj = reactive({
    MtlItemNo: "",
    MtlItemName: "",
    ShowNum: 1,
    Index: 0,
    TatolNum: 0
})
const PhotoObj = reactive({
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
const ProductPhotoObj = reactive({
    CpdId:-1,
    ShowNum: 10,
    Index: 0,
    TatolNum: 0 
})
const EventPhotoObj = reactive({
    CeId:-1,
    ShowNum: 10,
    Index: 0,
    TatolNum: 0 
})
//#endregion

const PopViewData = ref([])
const PopChildrenViewData = ref([])
const LoadPopViewData = async (popViewObj) => {
    try{
        let nowView = popViewObj.nowView
        let viewId = popViewObj.Id
        let childrenViewShow = popViewObj.childrenViewShow
        let childrenView = popViewObj.childrenView
        let result
        let status
        if(!childrenViewShow){
            switch(nowView){
                case "MtlItem":
                    result = (await GetMtlItem(MtlItemObj)).data
                    status = result.status 
                    if (status == "success") {
                        MtlItemObj.TatolNum = result.data[0].Total
                        PopViewData.value = result.data;
                    } else {
                        store.commit('alertAction', { type: "fail", msg: '異常問題,讀取失敗' });
                    }
                    break;
                case "Photo":
                    result = (await GetCompanyPhoto(PhotoObj)).data
                    status = result.status 
                    if (status == "success") {
                        PhotoObj.TatolNum = result.data[0].Total
                        PopViewData.value = result.data;    
                    } else {
                        store.commit('alertAction', { type: "fail", msg: '異常問題,讀取失敗' });
                    }
                    break;
                case "ProductPhoto":
                    ProductPhotoObj.CpdId = viewId
                    result = (await GetCyyProductPhoto(ProductPhotoObj)).data
                    status = result.status 
                    if (status == "success") {
                        ProductPhotoObj.TatolNum = result.data[0].Total
                        PopViewData.value = result.data;
                    } else {
                        store.commit('alertAction', { type: "fail", msg: '異常問題,讀取失敗' });
                    }
                    break;
                case "EventPhoto":
                    EventPhotoObj.CeId = viewId
                    result = (await GetCyyEventPhoto(EventPhotoObj)).data
                    status = result.status 
                    if (status == "success") {
                        EventPhotoObj.TatolNum = result.data[0].Total
                        PopViewData.value = result.data;
                    } else {
                        store.commit('alertAction', { type: "fail", msg: '異常問題,讀取失敗' });
                    }
                    break;
            }
        }
        else{
            switch(childrenView){
                case "Photo":
                    result = (await GetCompanyPhoto(PhotoObj)).data
                    status = result.status 
                    if (status == "success") {
                        PhotoObj.TatolNum = result.data[0].Total
                        PopChildrenViewData.value = result.data;    
                    } else {
                        store.commit('alertAction', { type: "fail", msg: '異常問題,讀取失敗' });
                    }
                    break;
            }
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

//#region 頁面切換相關
//#region 品號視窗頁面切換
const ReturnMtlItemPage = (data) => {
    console.log(data)
    if (data == 1) {
        MtlItemObj.Index = 0
    }
    else {
        MtlItemObj.Index = MtlItemObj.ShowNum * (data - 1)
    }
    LoadPopViewData(popViewObj)
}
//#endregion

//#region 公司圖片庫視窗頁面切換
const ReturnPhotoPage = (data) => {
    if (data == 1) {
        PhotoObj.Index = 0
    }
    else {
        PhotoObj.Index = PhotoObj.ShowNum * (data - 1)
    }
    LoadPopViewData(popViewObj)
}
//#endregion



//#region 產品圖片庫視窗頁面切換
const ReturnProductPhotoPage = (data) => {
    if (data == 1) {
        ProductPhotoObj.Index = 0
    }
    else {
        ProductPhotoObj.Index = ProductPhotoObj.ShowNum * (data - 1)
    }
    LoadPopViewData(popViewObj)
}
//#endregion

//#region 活動圖片庫視窗頁面切換
const ReturnEventPhotoPage = (data) => {
    if (data == 1) {
        EventPhotoObj.Index = 0
    }
    else {
        EventPhotoObj.Index = EventPhotoObj.ShowNum * (data - 1)
    }
    LoadPopViewData(popViewObj)
}
//#endregion

//#endregion

//#region 選擇項目相關
//#region 品號
const ChooseMtlItem = (MtlItemId,MtlItemName)=>{
    for(let key in ChooseData) {
        delete ChooseData[key];
    }
    ChooseData.MtlItemId = MtlItemId
    ChooseData.ProductName = MtlItemName
    ClosePopView()
}
//#endregion

//#region 公司圖片
const ChoosePhoto = (CpId,PhotoName,PhotoDesc,PhotoHref)=>{
    for(let key in ChooseData) {
        delete ChooseData[key];
    }
    ChooseData.CpId = CpId
    ChooseData.PhotoName = PhotoName
    ChooseData.PhotoDesc = PhotoDesc
    ChooseData.PhotoHref = PhotoHref
    ChooseData.photoChange = true
    ClosePopView()
}
//#endregion

//#endregion

//#region 選中項目傳送值回父層
const ChooseData = reactive({})
const emit = defineEmits(['pop'])
watch(ChooseData, (newData) => {
    emit('pop', newData)
})
//#endregion

//#region 功能區
//#region 滑鼠移動列表項目變色
const highlightedRow = ref('')
const hoverRow = (status, itemId) => {
    if (status) {
        highlightedRow.value = itemId;
    }
    else {
        highlightedRow.value = null;
    }
}
//#endregion

//#region 圖片選擇
const EditShow = ref(false)
const formPhoto = reactive([])
const photoInput = ref(null);
const FileClick = (event) => {
    photoInput.value.click();
}
const LocalPhoto = () =>{
    const files = photoInput.value.files;

    if (!files) return;
    for(let i=0;i<files.length;i++){
        let file = files[i];
        const reader = new FileReader();
        let obj = {}
        reader.onload = (a) => 
        {
            obj.PhotoName = file.name
            obj.PhotoHref = a.target.result;
            formPhoto.push(obj)

        }
        reader.readAsDataURL(file);
    }
    EditShow.value = true
}
const ClearPhoto = () =>{
    formPhoto.splice(0, formPhoto.length);
}
//#endregion

//#region 圖片上傳
const SavePhoto = async () => {
    try {
        let result 
        let obj = reactive({})
        if(formPhoto.length<=0){
            store.commit('alertAction', { type: "fail", msg: '目前未選擇圖片' });
            return
        }
        obj.CeId = Id
        obj.data = formPhoto
        result = await AddCyyEventPhoto(obj);
        
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            // Load()
            Return()
        } else {
            store.commit('alertAction', { type: "fail", msg: '異常問題,新增失敗' });
        }
    } catch (error) {
        let errMsg = error.response.data.msg;
        store.commit('alertAction', { type: "fail", msg: errMsg })
    }
}
//#endregion


const SelectCompanyPhoto = () =>{
    popViewObj.childrenViewShow = true
    popViewObj.childrenView = 'Photo' 
    LoadPopViewData(popViewObj)
}

const Return = ()=>{
    EditShow.value = false
    popViewObj.childrenView = ""
    popViewObj.childrenViewShow = false
    LoadPopViewData(popViewObj)
    formPhoto.splice(0, formPhoto.length);
}


//#endregion

</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="popView" v-if="popViewObj.show == true">
        <div class="popViewIn" >
            <div class="viewHead">
                <h4>{{popViewObj.popViewTitle}}</h4>
                <button class="viewClose" @click="ClosePopView()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="viewBody" v-if="popViewObj.nowView == 'MtlItem'">
                <div class="searchBlock">
                    <input type="text" class="inputStyle" placeholder="請輸入品號" v-model="MtlItemObj.MtlItemNo">
                    <input type="text" class="inputStyle" placeholder="請輸入品名" v-model="MtlItemObj.MtlItemName" style="margin-left: 10px;">
                </div>
                <table>
                    <tr class="tableHead">
                        <th  v-for="(item,index) in popMtlItemList">{{ item.name}}</th>
                    </tr>
                    <tr class="tableItem" v-for="(item, index) in PopViewData" :key="item.MtlItemId" @mouseover="hoverRow(true, item.MtlItemId)" @mouseout="hoverRow(false, item.MtlItemId)">
                        <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }">
                            <div class="coulumName">#</div>
                            <div class="coulumValue">{{ MtlItemObj.Index > 0 ? index + MtlItemObj.Index + 1 : index + 1 }}</div>
                        </td>
                        <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }">
                            <div class="coulumName">品號代號</div>
                            <div class="coulumValue">{{ item.MtlItemNo }}</div>
                        </td>
                        <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }">
                            <div class="coulumName">品號名稱</div>
                            <div class="coulumValue">{{item.MtlItemName}}</div>
                        </td>
                        <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }">
                            <div class="coulumName">品號描述</div>
                            <div class="coulumValue">{{item.MtlItemDesc}}</div>
                        </td>
                        <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }">
                            <div class="coulumName">狀態</div>
                            <div class="coulumValue">{{ item.Status == `A` ? `啟用`:`未啟用` }}</div>
                        </td>
                        <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }">
                            <div class="coulumName">操作</div>
                            <div class="coulumValue">
                                <input type="radio" @click="ChooseMtlItem(item.MtlItemId,item.MtlItemName)">
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="viewBody" v-if="popViewObj.nowView == 'Photo'"> 
                <div class="table">
                    <div class="card" v-for="item in PopViewData" @click="ChoosePhoto(item.CpId,item.PhotoName,item.PhotoDesc,item.PhotoHref)">
                        <img :src="item.PhotoHref" alt="">
                    </div>
                </div>
            </div>
            <div class="viewBody" v-if="popViewObj.nowView == 'ProductPhoto'"> 
                <div class="table">
                    <div class="card" :class="item.MainSeting == `Y`?`mainPhoto`:``" v-for="item in PopViewData">
                        <img :src="item.PhotoHref" alt="">
                        <div class="hoverBlock" v-if="item.MainSeting == `N`">
                            <button class="button safe"  @click="UpdateProductPhotoMain(item.CpdPhotoId)">主圖片</button>
                            <button class="button clear" @click="DeleteProductPhoto(item.CpdPhotoId)">刪除</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="viewBody" v-if="popViewObj.nowView == 'EventPhoto'"> 
                <div class="head">
                    <div class="col">
                        <button class="button add" @click="FileClick">
                            新增
                        </button>
                        <input type="file" ref="photoInput" style="display: none;" @change="LocalPhoto()" multiple/>
                    </div>
                    <div class="col rightStyle">
                        <button class="button add" @click="SelectCompanyPhoto('photo')" v-if="EditShow == false  && popViewObj.childrenViewShow == false">
                            公司圖片庫選擇
                        </button>
                        <button class="button info" @click="Return" v-if="EditShow == true || popViewObj.childrenViewShow == true" >
                                    退回
                        </button>
                    </div>
                </div>
                <div class="table" v-if="EditShow == false">
                    <div class="card" :class="item.MainSeting == `Y`?`mainPhoto`:``" v-for="item in PopViewData" v-if="popViewObj.childrenViewShow == false">
                        <img :src="item.PhotoHref" alt="">
                        <div class="hoverBlock" v-if="item.MainSeting == `N`">
                            <button class="button safe"  @click="UpdateProductPhotoMain(item.CpdPhotoId)">主圖片</button>
                            <button class="button clear" @click="DeleteProductPhoto(item.CpdPhotoId)">刪除</button>
                        </div>
                    </div>
                    <div class="card" :class="item.MainSeting == `Y`?`mainPhoto`:``" v-for="item in PopChildrenViewData" v-if="popViewObj.childrenViewShow == true">
                        <img :src="item.PhotoHref" alt="">
                        <div class="hoverBlock" v-if="item.MainSeting == `N`">
                            <button class="button safe"  @click="UpdateProductPhotoMain(item.CpdPhotoId)">主圖片</button>
                            <button class="button clear" @click="DeleteProductPhoto(item.CpdPhotoId)">刪除</button>
                        </div>
                    </div>
                </div>
                <div class="addView"  v-if="EditShow == true">
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
                <swiper-slide v-for="(img,index) in formPhoto" :key="img">
                <img :src="img.PhotoHref" />
                </swiper-slide>
            </swiper>
                </div>
                <div class="foot">
                    <div class="col">
                    </div>
                    <div class="col rightStyle">
                        <button class="button save" @click="SavePhoto" v-if="EditShow == true">
                            儲存
                        </button>
                    </div>
                </div>
            </div>
            <div class="viewFooter" v-if="EditShow == false">
                <div v-if="popViewObj.childrenViewShow == false">
                    <pageBar v-if="popViewObj.nowView == 'MtlItem'" :sent="MtlItemObj" @change="ReturnMtlItemPage"></pageBar>
                    <pageBar v-if="popViewObj.nowView == 'Photo'" :sent="PhotoObj" @change="ReturnPhotoPage"></pageBar>
                    <pageBar v-if="popViewObj.nowView == 'ProductPhoto'" :sent="ProductPhotoObj" @change="ReturnProductPhotoPage"></pageBar>
                    <pageBar v-if="popViewObj.nowView == 'EventPhoto'" :sent="EventPhotoObj" @change="ReturnPhotoPage"></pageBar>
                </div>
                <div v-if="popViewObj.childrenViewShow == true">
                    <pageBar v-if="popViewObj.childrenView == 'Photo'" :sent="PhotoObj" @change="ReturnPhotoPage"></pageBar>
                </div>
            </div>
        </div>
   </div>
</template>

<style scoped>
/* 彈窗基本架構*/
.popView{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #131313b1;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.popViewIn{
    width: 80%;
    margin-bottom: 0px;
    border-radius: 5px;
    background-color: #FFFFFF;
    overflow: auto;
}
.viewHead{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #00000034;
}
.viewHead>h4{
    padding-top: 10px;
    padding-left: 10px;
}
.viewBody{
    min-height: 450px;
    padding: 20px 20px;
}
.viewFooter{
    border-top: 1px solid #00000034;
    padding: 10px 20px;
}
.pagBar{
    margin: 0;
}
.viewClose{
    border: unset;
    background-color: unset;
    font-size: 24px;
    padding-right: 10px;
}
.searchBlock{
    margin-bottom: 20px;
}
.inputStyle,.textareaStyle{
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 16px;
    border: 1px solid #00000033;
}
.head{
    display: flex;
    margin: 0px 0;
}
.rightStyle{
    display: flex;
    justify-content: flex-end;
}
/* 卡片格式 */
.table{
    display: flex;
    flex-wrap: wrap;
}
.card{
    width: 18%;
    aspect-ratio: 1/1;
    position: relative;
    padding: 20px 10px;
    margin: 10px;
}
.card>img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.mainPhoto{
    border: 2px solid #65d47966;
}   
.deletCard{
    position: absolute;
    top: 0px;
    right: 0px;
    border: 0;
    background-color: unset;
}
.deletCard:hover{
    color: red;
}
.hoverBlock{
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000f273e;
}
.card:hover .hoverBlock{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
/* 列表格式 */
table {
    border-collapse: collapse;
    width: 100%;
    border-radius: 5px;

}

th,
td {
    padding: 5px 10px;
    border: 1px solid #dddddd;
}

th {
    background-color: #fcffce;
}

td {
    background-color: #fefff6;

}
.tableItem>td,.tableHead>th{
    text-align: center;
}
.tableItem>td>.coulumName{
    display: none;
}
@media (max-width: 768px) {
    .tableHead{
        display: none;
    }
    .tableItem{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    .tableItem>td{
        display: flex;
        align-items: center;
        padding: 10px 0;
        width: 100%;
    }
    .tableItem>td>.coulumName{
        display: block;
        width: 30%;
    }
    .tableItem>td>.coulumValue{
        width: 70%;
        text-align: left;
    }
}

/* 按鈕 */
.button{
    margin: 5px;
    padding: 5px 5px 5px  10px;
    border-radius: 5px;
    border: 0;
    box-shadow: 0px 0px 2px 1px #a7afa7;
    letter-spacing: 5px;
    color: #f0f8ff;
}
.button:hover {
    background-color: #fcffce;
    color: #000f27;
}
.info{
    color: #000f27;
}
.search{
    background-color: #784fff;
}
.add{
    background-color: #4990ff;
}
.clear{
    background-color: #d42020;
}
.save{
    background-color: #5bd75f;
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
