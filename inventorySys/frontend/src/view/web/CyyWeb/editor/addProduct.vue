<script setup>
import { ref, reactive,watchEffect } from "vue";
import { GetMtlItem, AddCyyProduct} from ':@/api/index'
import pageBar from ':@/components/pageBar.vue';
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
function EditForm(Id) {
    changePage.value = "返回"
    editObj.action = "edit"
    editShow.value = true
    editObj.pageId = Id
}
function CloseForm() {
    changePage.value = "新增"
    editShow.value = false
}
//#endregion

const tableData = reactive([
    {
        Id:1,
        ProductName:`環保餐具`,
        ProductAmount:1000,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    },
    {
        Id:2,
        ProductName:`環保杯`,
        ProductAmount:1000,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    },
    {
        Id:3,
        ProductName:`環保袋`,
        ProductAmount:1000,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    },
    {
        Id:4,
        ProductName:`環保餐具`,
        ProductAmount:1000,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    },
    {
        Id:5,
        ProductName:`環保杯`,
        ProductAmount:1000,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    },
    {
        Id:6,
        ProductName:`環保袋`,
        ProductAmount:1000,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    },
    {
        Id:7,
        ProductName:`環保餐具`,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    },
    {
        Id:8,
        ProductName:`環保杯`,
        ProductAmount:1000,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    },
    {
        Id:9,
        ProductName:`環保袋`,
        ProductAmount:1000,
        ProductPhoto:`https://s3-alpha-sig.figma.com/img/f5e0/4c4d/1cd35a4276d01f6dd5010f1fdfc23849?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VDk9iFiPcswp3q7b~LUIOh29i1hVrSRVE-BMcQlAGlbTTSP7Mq-deLlLsmzTnQLf1jEM1OafWiNr1REi1HPLiFyPaMxWB0dEE9E1OAXpzUhESeBfykL9J4k6BBezDmjfdbtB-4cA9TKeBeAvt5KPNoB6FxSlXfTN0UDqXCOPHpcmgU0sJC6tnYZ2qUiT9uQRfNCeWqgo5XkxGcnAB4McSMbjblEAf2GfuynNQCxRrRWxtSKdfZtiP6FpfCBu~u1wiYcMx7y2gU8oQirJuIgPWM45R8I2NDRa9LdJppW7kEh42G-INA8nyyyPDHZAAUTb7nPWP00LivvjXvUd4SM43g__`
    }
])

//#region 表單資料相關
const photoInput = ref(null);
const formData = reactive({
    CwId:1,
    MtlItemId:-1,
    ProductName:``,
    ProductAmount:``,
    ProductText:``,
    GroupSetting:false,
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
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (a) => 
    {
        formData.PhotoName = file.name
        formData.PhotoHref = a.target.result;
    }
    reader.readAsDataURL(file);
}

//#endregion

//#region 彈窗相關
const popViewShow = reactive({
    show:false,
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
const MtlItemObj = reactive({
    MtlItemNo: "",
    MtlItemName: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
const MtlItemTableData = ref([])
const LoadMtlItemData = async () => {
    try{
      const result = (await GetMtlItem(MtlItemObj)).data
      let status = result.status 
      if (status == "success") {
        MtlItemObj.TatolNum = result.data[0].Total
        MtlItemTableData.value = result.data;
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
const OpenPopView = (view) =>{
    popViewShow.show = true

    switch(view){
        case "MtlItem":
            popViewShow.nowView = view
            break
    }
    LoadMtlItemData()
}
const ClosePopView = (view) =>{
    popViewShow.show = false
    switch(view){
        case "MtlItem":
            popViewShow.nowView = ''
            break
    }
}
//#region 頁面切換
const ReturnPage = (data) => {
    if (data == 1) {
        MtlItemObj.Index = 0
    }
    else {
        MtlItemObj.Index = MtlItemObj.ShowNum * (data - 1)
    }
    LoadMtlItemData()
}
//#endregion

const SelectItem = (MtlItemId,MtlItemName)=>{
    formData.MtlItemId = MtlItemId
    formData.ProductName = MtlItemName
    ClosePopView('MtlItem')
}
//#endregion

//#region 儲存表單資料
const Save = async (type) => {
    try {
        let result 
        if(!!!formData.PhotoHref){
            store.commit('alertAction', { type: "fail", msg: '目前未上傳圖片' });
            return
        }
        result = await AddCyyProduct(formData);
        
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

</script>

<template>
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
                <div class="card" v-for="item in tableData" :key="Id">
                    <img :src="item.ProductPhoto" alt="">
                    <div class="cardTitle">{{ item.ProductName }}</div>
                    <div class="cardSubtitle">${{ item.ProductAmount }}</div>
                    <button class="deletCard" @click="Delete(item.CpId)"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
        </div>
        <div class="form" v-if="editShow == true">
            <form action="">
                <div class="localRow">
                    <label for="ProductPhoto">產品圖片</label>
                    <div class="photoBlock" @click="FileClick">
                        <span v-if="!formData.PhotoHref"><i  class="fa-solid fa-plus"></i>選擇圖片</span>
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
        </div>
    </div>
   <div class="food">
        <div class="col">
        </div>
        <div class="col rightStyle">
            <button class="button clear">清空</button>
            <button class="button safe" @click="Save()">儲存</button>
        </div>
   </div>
   <div class="popView" v-if="popViewShow.show == true">
    <div class="viewMtlItem" v-if="popViewShow.nowView == 'MtlItem'">
        <div class="viewHead">
            <h4>查看品號相關資料</h4>
            <button class="viewClose" @click="ClosePopView('MtlItem')"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="viewBody">
            <div class="searchBlock">
                <input type="text" class="inputStyle" placeholder="請輸入品號" v-model="MtlItemObj.MtlItemNo">
                <input type="text" class="inputStyle" placeholder="請輸入品名" v-model="MtlItemObj.MtlItemName" style="margin-left: 10px;">
            </div>
            <table>
                <tr class="tableHead">
                    <th  v-for="(item,index) in popMtlItemList">{{ item.name}}</th>
                </tr>
                <tr class="tableItem" v-for="(item, index) in MtlItemTableData" :key="item.MtlItemId" @mouseover="hoverRow(true, item.MtlItemId)" @mouseout="hoverRow(false, item.MtlItemId)">
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
        <div class="viewFooter">
            <pageBar :sent="MtlItemObj" @change="ReturnPage"></pageBar>
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
    margin-bottom: 100px;
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
