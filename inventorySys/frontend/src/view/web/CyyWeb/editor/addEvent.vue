<script setup>
import { ref, reactive,watchEffect } from "vue";
import { GetCyyEvent, AddCyyEvent, UpdateCyyEvent, DeleteCyyEvent ,GetCompanyPhoto} from ':@/api/index'
import alert from ':@/components/alert.vue';
import pageBar from ':@/components/pageBar.vue';
import popView from ':@/view/web/CyyWeb/editor/popView.vue';
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

//#region 列表相關

//#region 列表欄位宣告
const tableHead = reactive([
    {
        name:`#`,
    },
    {
        name:`活動日期`,
    },
    {
        name:`活動名稱`,
    },
    {
        name:`操作`,
    }
])
//#endregion

//#region 頁面比數顯示,當前第幾頁
const pageObj = reactive({
    EventName: "",
    EventDate: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
//#endregion

//#region 列表資料取得
const tableData = ref([])
const LoadData = async () => {
    try{
      const result = (await GetCyyEvent(pageObj)).data
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
//#endregion

//#region 頁面切換
const ReturnPage = (data) => {
    if (data == 1) {
        pageObj.Index = 0
    }
    else {
        pageObj.Index = pageObj.ShowNum * (data - 1)
    }
    LoadData()
}
//#endregion

//#endregion

//#region 表單
const createFormData = () => {
    return {
        Id:-1,
        CwId: 1,
        MtlItemId: -1,
        EventName: '',
        EventText: '',
        EventDate: '',
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
    formData.EventName = ''
    formData.EventText = ''
    formData.EventDate = ''
    formData.GroupSetting = false
    formData.photoChange = false
    formData.CpId = -1
    formData.PhotoName = ''
    formData.PhotoDesc = ''
    formData.PhotoHref = ''
};
//#endregion

//#region 彈窗相關
const OpenPopView = (view,Id) =>{
    popViewObj.show = true
    popViewObj.nowView = view
    popViewObj.Id = Id
}
const popViewObj = reactive({
    show:false,
    popViewTitle:``,
    nowView:``,
    Id:-1
})
const ClearPhoto = ()=>{
    formData.CpId = -1
    formData.PhotoName = ``
    formData.PhotoDesc = ``
    formData.PhotoHref = ``
}
//#endregion

//#region 接受彈窗回傳值
const AcceptPopData = (data) => {
    console.log(data)
    // form[data.datakey] = data.returnValue
}
//#endregion

</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="head">
        <div class="col">
            <button class="button search" v-if="!editShow">搜尋</button>
        </div>
        <div class="col rightStyle">
            <button class="button" :class="!editShow ? `add`:`info`" @click="!editShow ? AddForm() : CloseForm()">
                {{ changePage }}
            </button>
        </div>
    </div>
    <div class="body">
        <div class="list" v-if="editShow == false">
            <table >
                <tr class="tableHead">
                    <th  v-for="(item,index) in tableHead" :style="item.style">{{ item.name}}</th>
                </tr>
                <tr class="tableItem" v-for="(item, index) in tableData" :key="item.MtlItemNo" @mouseover="hoverRow(true, item.CompanyId)"
                    @mouseout="hoverRow(false, item.CompanyId)">
                    <td :style="{ backgroundColor: highlightedRow === item.CompanyId ? '#C8EBFA' : '' }">
                        <div class="coulumName">#</div>
                        <div class="coulumValue">{{ pageObj.Index > 0 ? index + pageObj.Index + 1 : index + 1 }}</div>
                    </td>
                    <td :style="{ backgroundColor: highlightedRow === item.CompanyId ? '#C8EBFA' : '' }">
                        <div class="coulumName">活動日期</div>
                        <div class="coulumValue">{{ item.CompanyNo }}</div>
                    </td>
                    <td :style="{ backgroundColor: highlightedRow === item.CompanyId ? '#C8EBFA' : '' }">
                        <div class="coulumName">活動名稱</div>
                        <div class="coulumValue">{{ item.CompanyName }}</div>
                    </td>
                    <td :style="{ backgroundColor: highlightedRow === item.CompanyId ? '#C8EBFA' : '' }">
                        <div class="coulumName">操作</div>
                        <div class="coulumValue">
                            <button @click="readForm(item.CompanyId)">查看</button>
                            <button @click="editForm(item.CompanyId)">修改</button>
                            <button @click="deleteCompany(item.CompanyId)">刪除</button>
                        </div>
                    </td>
                </tr>
            </table>
            <pageBar :sent="pageObj" @change="ReturnPage"></pageBar>
        </div>
        <div class="form" v-if="editShow == true">
            <form action="">
                <div class="localRow">
                    <label for="ProductPhoto">活動圖片</label>
                    <div class="photoBlock">
                        <button v-if="!formData.PhotoHref" class="button add" @click="OpenPopView('MtlItem')">選擇品號</button>
                        <button v-if="!formData.PhotoHref" class="button add" @click="OpenPopView('Photo')">選擇圖片</button>
                        <button v-if="!formData.PhotoHref" class="button add" @click="OpenPopView('ProductPhoto',18)">選擇產品圖片</button>
                        <button v-if="!formData.PhotoHref" class="button add" @click="FileClick">新增圖片</button>
                        <button v-if="formData.PhotoHref" class="button clear " @click="ClearPhoto">重置</button>
                        <img v-if="formData.PhotoHref" :src="formData.PhotoHref" alt="Preview" />
                        <input type="file" ref="photoInput" style="display: none;" @change="LocalPhoto()"/>
                    </div>
                </div>
                <div class="localRow">
                    <label for="EventName">活動名稱</label>
                    <input type="text" id="EventName" class="inputStyle" v-model="formData.EventName">
                </div>
                <div class="localRow">
                    <label for="EventDate">活動日期</label>
                    <input type="number" id="EventDate" class="inputStyle" v-model="formData.EventDate">
                </div>
                <div class="localRow">
                    <label for="EventText">活動文案</label>
                    <textarea  name="" id="EventText" class="textareaStyle" cols="30" rows="10" v-model="formData.EventText"></textarea>
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
    <popView :sent="popViewObj" @pop="AcceptPopData"></popView>
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

h2 {
    margin: 0;
    margin-bottom: 10px;
}

.content {
    width: 100%;
    background-color: #FFFFFF;
    padding: 20px;
    box-shadow: 0 1px 3px 0px rgba(115, 108, 203, 0.23);
    border-radius: 4px;
    margin: 10px 0;
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

button {
    margin: 5px;
    border-radius: 5px;
    border: 0;
    box-shadow: 0px 0px 2px 1px #a7afa7;
    color: #fff;
    letter-spacing: 5px;
    padding: 5px 5px 5px  10px;
}

button:hover {
    background-color: #fcffce;
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
</style>
