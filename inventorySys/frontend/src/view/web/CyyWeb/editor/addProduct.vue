<script setup>
import { ref, reactive,watchEffect } from "vue";
import { GetMtlItem, GetCyyProduct, AddCyyProduct, UpdateCyyProduct, UpdateCyyProductStatus, DeleteCyyProduct, GetCompanyPhoto} from ':@/api/index'
import pageBar from ':@/components/pageBar.vue';
import alert from ':@/components/alert.vue';
import { useStore } from 'vuex';
const store = useStore();

//#region 編輯頁面開啟關閉
const editShow = ref(false)
const changePage = ref("新增")
function AddForm() {
    changePage.value = "返回"
    editShow.value = true
}
function ReadForm(Id) {
    changePage.value = "返回"
    editObj.action = "read"
    editShow.value = true
    editObj.pageId = Id
}
async function EditForm(Id) {
    changePage.value = "返回"
    editShow.value = true
    formData.Id = Id
    await LoadData('Edit')
    tableData.value.forEach((item)=>{
        formData.CwId = item.CwId
        formData.MtlItemId =  item.MtlItemId
        formData.ProductName = item.ProductName
        formData.ProductAmount = item.ProductAmount
        formData.ProductText = item.ProductText
        formData.GroupSetting = item.GroupSetting
        formData.CpId = item.CpId
        formData.PhotoName = item.PhotoName
        formData.PhotoDesc = item.PhotoDesc
        formData.PhotoHref = item.PhotoHref
    })
}
function CloseForm() {
    changePage.value = "新增"
    editShow.value = false
    resetFormData()
    LoadData()
}
//#endregion

//#region 圖片選擇
const photoInput = ref(null);
const FileClick = (event) => {
    if(formData.MtlItemId <=0){
        store.commit('alertAction', { type: "fail", msg: '請先選擇品號' });
        return
    }
    photoInput.value.click();

    // 当点击目标不是 input 元素时，触发 input 的点击事件
    // if (event.target !== photoInput.value) {
    // }
}
const LocalPhoto = () =>{
    const file = photoInput.value.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (a) => 
    {
        formData.PhotoName = file.name
        formData.PhotoHref = a.target.result;
        formData.photoChange = true
    }
    reader.readAsDataURL(file);
}
//#endregion

//#region 彈窗相關
const popViewShow = reactive({
    show:false,
    popViewTitle:``,
    nowView:``
})
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
const OpenPopView = (view) =>{
    switch(view){
        case "MtlItem":
            popViewShow.popViewTitle = `查看品號相關資料`
            break
        case "Photo":
            if(formData.MtlItemId <=0){
                store.commit('alertAction', { type: "fail", msg: '請先選擇品號' });
                return
            }
            popViewShow.popViewTitle = `查看公司圖片庫`
            break
    }
    popViewShow.show = true
    popViewShow.nowView = view
    LoadPopViewData(view)

}
const ClosePopView = (view) =>{
    popViewShow.show = false
    popViewShow.popViewTitle = ''
    popViewShow.nowView = ''
}
const MtlItemObj = reactive({
    MtlItemNo: "",
    MtlItemName: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
const PhotoObj = reactive({
    MtlItemNo: "",
    MtlItemName: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
const PopViewData = ref([])

const LoadPopViewData = async (view) => {
    try{
        let result
        let status
        switch(view){
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



const SelectItem = (MtlItemId,MtlItemName)=>{
    formData.MtlItemId = MtlItemId
    formData.ProductName = MtlItemName
    ClosePopView()
}
const SelectPhoto = (CpId,PhotoName,PhotoDesc,PhotoHref)=>{
    formData.CpId = CpId
    formData.PhotoName = PhotoName
    formData.PhotoDesc = PhotoDesc
    formData.PhotoHref = PhotoHref
    formData.photoChange = true
    ClosePopView()
}
const ClearPhoto = ()=>{
    formData.CpId = -1
    formData.PhotoName = ``
    formData.PhotoDesc = ``
    formData.PhotoHref = ``
}

//#region 品號視窗頁面切換
const ReturnMtlItemPage = (data) => {
    if (data == 1) {
        MtlItemObj.Index = 0
    }
    else {
        MtlItemObj.Index = MtlItemObj.ShowNum * (data - 1)
    }
    LoadMtlItemData()
}
//#endregion

//#region 圖片庫視窗頁面切換
const ReturnPhotoPage = (data) => {
    if (data == 1) {
        PhotoObj.Index = 0
    }
    else {
        PhotoObj.Index = PhotoObj.ShowNum * (data - 1)
    }
    LoadPopViewData('Photo')
}
//#endregion

//#endregion

//#region 頁面筆數顯示,當前第幾頁
const pageObj = reactive({
    PageNo:"addProduct",
    MtlItemId: -1,
    ProductName: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
//#endregion

//#region 頁面資料載入
const tableData = ref([])
const LoadData = async (type) => {
    try{
        let result = await GetCyyProduct(type === 'Edit' ? formData : pageObj);
        result = result.data
        let status = result.status 
        if (status == "success") {
            pageObj.TatolNum = result.data[0].Total
            tableData.value = result.data;
            store.commit('menuChang',pageObj.PageNo);
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
LoadData()
//#endregion

//#region 重製表單
const createFormData = () => {
    return {
        Id:-1,
        CwId: 1,
        MtlItemId: -1,
        ProductName: '',
        ProductAmount: '',
        ProductText: '',
        GroupSetting: false,
        photoChange: false,
        CpId:-1,
        PhotoName: '',
        PhotoDesc: '',
        PhotoHref: '',
    }
};

let formData = reactive(createFormData());

const resetFormData = () => {
    formData.Id = -1
    formData.CwId = 1
    formData.MtlItemId = -1
    formData.ProductName = ''
    formData.ProductAmount = ''
    formData.ProductText = ''
    formData.GroupSetting = false
    formData.photoChange = false
    formData.CpId = -1
    formData.PhotoName = ''
    formData.PhotoDesc = ''
    formData.PhotoHref = ''
};
//#endregion

//#region 儲存表單資料
const Save = async (type) => {
    try {
        let result 
        if(!!!formData.PhotoHref){
            store.commit('alertAction', { type: "fail", msg: '目前未上傳圖片' });
            return
        }
        if(formData.Id<=0){
            result = await AddCyyProduct(formData);
        }
        else{
            result = await UpdateCyyProduct(formData);
        }
        
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            // Load()
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
const DeleteData = async (CpdId) => {
    const obj =reactive({CpdId:CpdId})
    try{
        const result = (await DeleteCyyProduct(obj))
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            LoadData()
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

//#region 狀態切換
const UpdateStatus = async (CpdId) => {
    const obj =reactive({CpdId:CpdId})
    try{
        const result = (await UpdateCyyProductStatus(obj))
        let status = result.data.status 
        let msg = result.data.msg 
        if (status == "success") {
            store.commit('alertAction', { type: "success", msg: msg })
            LoadData()
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
    <div class="head">
        <div class="col">
            <button class="button search" v-if="!editShow">搜尋</button>
            <button class="button add" v-if="editShow" @click="OpenPopView('MtlItem')">品號選擇</button>
        </div>
        <div class="col rightStyle">
            <button class="button" :class="!editShow ? `add`:`info`" @click="!editShow ? AddForm() : CloseForm()">
                {{ changePage }}
            </button>
        </div>
    </div>
    <div class="body">
        <div class="list" v-if="editShow == false">
            <div class="table">
                <div class="card" v-for="item in tableData" :key="item.CpdId">
                    <img :src="item.PhotoHref" :alt="item.PhotoName">
                    <div class="cardTitle">{{ item.ProductName }}</div>
                    <div class="cardSubtitle">${{ item.ProductAmount }}</div>
                    <div class="hoverBlock">
                        <button class="button safe" @click="UpdateStatus(item.CpdId)">{{item.Status == `S` ? `啟用`:`停用`}}</button>
                        <button class="button info" @click="EditForm(item.CpdId)">修改</button>
                        <button class="button clear" @click="DeleteData(item.CpdId)">刪除</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="form" v-if="editShow == true">
            <form action="">
                <div class="localRow">
                    <label for="ProductPhoto">產品圖片</label>
                    <div class="photoBlock">
                        <button v-if="!formData.PhotoHref" class="button add" @click="OpenPopView('Photo')">選擇圖片</button>
                        <button v-if="!formData.PhotoHref" class="button add" @click="FileClick">新增圖片</button>
                        <button v-if="formData.PhotoHref" class="button clear " @click="ClearPhoto">重置</button>

                        <!-- <span v-if="!formData.PhotoHref"><i  class="fa-solid fa-plus"></i>選擇圖片</span> -->
                        <!-- <span v-if="!formData.PhotoHref"><i  class="fa-solid fa-plus"></i>新增圖片</span> -->
                        <img v-if="formData.PhotoHref" :src="formData.PhotoHref" alt="Preview" />
                        <input type="file" ref="photoInput" style="display: none;" @change="LocalPhoto()"/>
                    </div>
                </div>
                <div class="localRow">
                    <label for="productName">產品名稱</label>
                    <input type="text" id="productName" class="inputStyle" v-model="formData.ProductName">
                </div>
                <div class="localRow">
                    <label for="ProductAmount">產品金額</label>
                    <input type="number" id="ProductAmount" class="inputStyle" v-model="formData.ProductAmount">
                </div>
                <div class="localRow">
                    <label for="ProductText">產品文案</label>
                    <textarea  name="" id="ProductText" class="textareaStyle" cols="30" rows="10" v-model="formData.ProductText"></textarea>
                </div>
                <div class="localRow">
                    <label for="GroupSetting">是否納入官網輪播 <input id="GroupSetting" type="checkbox" v-model="formData.GroupSetting"></label>
                </div>
                
            </form>
            <div class="food">
                <div class="col">
                </div>
                <div class="col rightStyle">
                    <button class="button clear" @click="resetFormData">清空</button>
                    <button class="button safe" @click="Save()">儲存</button>
                </div>
            </div>
        </div>
    </div>
    <div class="food">
    </div>
   <div class="popView" v-if="popViewShow.show == true">
    <div class="viewMtlItem" >
        <div class="viewHead">
            <h4>{{popViewShow.popViewTitle}}</h4>
            <button class="viewClose" @click="ClosePopView('MtlItem')"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="viewBody" v-if="popViewShow.nowView == 'MtlItem'">
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
                            <input type="radio" @click="SelectItem(item.MtlItemId,item.MtlItemName)">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="viewBody" v-if="popViewShow.nowView == 'Photo'"> 
            <div class="table">
                <div class="card" v-for="item in PopViewData" @click="SelectPhoto(item.CpId,item.PhotoName,item.PhotoDesc,item.PhotoHref)">
                    <img :src="item.PhotoHref" alt="">
                </div>
            </div>
        </div>
        <div class="viewFooter">
            <pageBar v-if="popViewShow.nowView == 'MtlItem'" :sent="MtlItemObj" @change="ReturnMtlItemPage"></pageBar>
            <pageBar v-if="popViewShow.nowView == 'Photo'" :sent="PhotoObj" @change="ReturnPhotoPage"></pageBar>
        </div>
    </div>
   </div>
</template>

<style scoped>
.head{
    display: flex;
    margin: 10px 0;
}
.rightStyle{
    display: flex;
    justify-content: flex-end;
}
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
.safe{
    background-color: #5bd75f;
}
.addButton:hover {
    background-color: #fcffce;
}
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
.cardTitle{
    margin-top: 20px;
    font-weight: bolder;
}
.cardSubtitle{
    font-size: 22px;
    font-weight: bolder;
    color: #d42020;
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

.localRow{
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}
.inputStyle,.textareaStyle{
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 16px;
    border: 1px solid #00000033;
}
.photoBlock{
    position: relative;
    width: 100%;
    height: 300px;
    margin: auto;
    margin-top: 5px;
    border: 3px #285943 dashed;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px;
}
@media (max-width: 768px){
    .photoBlock{
        height: 200px;
    }
}
.photoBlock:hover{
    background-color: #aedb847a;
}
.photoBlock .clear{
    position: absolute;
    bottom: 0px;
    right:  0px;
}
.photoBlock>img{
    height: 100%;
    object-fit: contain;
}
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
.viewMtlItem{
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
</style>
