<script setup>
import { ref, computed, reactive } from "@vue/reactivity";
import { GetCompany, DeleteCompany } from ':@/api/index'
import alert from ':@/components/alert.vue';
import editView from ':@/components/editView.vue';
import pageBar from ':@/components/pageBar.vue';
import companyDetail from ':@/view/sys/basic/children/companyDetail.vue';
import companyWeb from ':@/view/sys/basic/children/companyWeb.vue';
import companyPhoto from ':@/view/sys/basic/children/companyPhoto.vue';
import { useStore } from 'vuex';
const store = useStore();

//#region 資料表編輯欄位宣告
const editObj = reactive({
    action: "",
    pageId: -1,
    returnButtonShow:false,
    api: {
        read: "GetCompany",
        add: "AddCompany",
        edit: "UpdateCompany"
    },
    itemGroup: {
        CompanyNo: {
            inputType: "text",
            inputName: "公司代號",
            disabled: false,
            defaultValue: ""
        },
        CompanyName: {
            inputType: "text",
            inputName: "公司名稱",
            disabled: false,
            defaultValue: ""
        },
        CompanyDesc: {
            inputType: "text",
            inputName: "公司描述",
            disabled: false,
            defaultValue: ""
        }
    }
})
//#endregion

//#region 頁面比數顯示,當前第幾頁
const pageObj = reactive({
    PageNo:"CompanyManagement",
    CompanyNo: "",
    CompanyName: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
//#endregion

//#region 編輯頁面開啟關閉
const editShow = ref(false)
const detailShow = reactive(
    {
        value:`companyDetail`,
        label:`公司詳細資料`,
        CompanyId:-1
    }
)
const detailList = reactive([
    {value:`companyDetail`,label:`公司詳細資料`},
    {value:`companyWeb`,label:`官網設定`},
    {value:`companyPhoto`,label:`圖片庫`}
])
const components = {
  companyDetail: companyDetail,
  companyWeb: companyWeb,
  companyPhoto: companyPhoto,
}
const changePage = ref("新增")
function addForm() {
    
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "add"
    editObj.pageId = -1
    detailShow.CompanyId = -1
}
function readForm(Id) {
    
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "read"
    editObj.pageId = Id
    detailShow.CompanyId = Id
}
function editForm(Id) {
    
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "edit"
    editObj.pageId = Id
    detailShow.CompanyId = Id
}
function CloseForm() {
    editShow.value = false
    changePage.value = "新增"
    editObj.action = ""
    editObj.pageId = -1
    detailShow.CompanyId = -1
    load()
}
//#endregion

//#region 刪除資料
const deleteCompany = async (CompanyId) => {
    const obj =reactive({CompanyId:CompanyId})
    try{
        const result = (await DeleteCompany(obj))
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

//#region 頁面資料仔載入
const tableData = ref([])
const load = async () => {
    try{
      const result = (await GetCompany(pageObj)).data
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
    load()
}
//#endregion
//#region Detail頁切換
function DetailChange(item) {
    detailShow.value = item.value
    detailShow.label = item.label
}
//#endregion


const currentComponent = computed(() => components[detailShow.value])



load()

</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="navBar">
        <h2>公司管理</h2>
        <div class="buttonBar">
            <button @click="!editShow ? addForm() : CloseForm()">
                {{ changePage }}
            </button>
        </div>
    </div>
    <div class="content" v-if="editShow == false">
        <table>
            <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 30%;">公司代號</th>
                <th style="width: 30%;">公司名稱</th>
                <th style="width: 35%;">操作</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="item.MtlItemNo" @mouseover="hoverRow(true, item.CompanyId)"
                @mouseout="hoverRow(false, item.CompanyId)">
                <td :style="{ backgroundColor: highlightedRow === item.CompanyId ? '#C8EBFA' : '' }" style="">{{ pageObj.Index > 0 ? index + pageObj.Index + 1 : index + 1 }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.CompanyId ? '#C8EBFA' : '' }" style="width: 15%;text-align: center;">{{ item.CompanyNo }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.CompanyId ? '#C8EBFA' : '' }" style="width: 15%;text-align: center;">{{ item.CompanyName }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.CompanyId ? '#C8EBFA' : '' }" style="width: 20%;text-align: right;">
                    <button @click="readForm(item.CompanyId)">查看</button>
                    <button @click="editForm(item.CompanyId)">修改</button>
                    <button @click="deleteCompany(item.CompanyId)">刪除</button>
                </td>
            </tr>
        </table>
        <pageBar :sent="pageObj" @change="ReturnPage"></pageBar>
    </div>
    <editView v-if="editShow == true" :sent="editObj"></editView>

    <ul class="detailBar" v-if="editShow == true && editObj.pageId>0">
        <li class="item" v-for="item in detailList" :class="detailShow.value == item.value? 'active':''" @click="DetailChange(item)">{{ item.label }}</li>
    </ul>
    <component :is="currentComponent" v-if="editShow && editObj.pageId>0 && currentComponent" :sent="detailShow" />
</template>

<style scoped>
.navBar {
    display: flex;
    justify-content: space-between;
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

.titleBar {
    margin: auto;
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
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    box-shadow: 0px 0px 2px 1px #a7afa7;
}

button:hover {
    background-color: #fcffce;
}

.detailBar{
    display: flex;
    padding: 0;
    margin: 20px 0;
}
.detailBar>.item{
    padding: 10px 20px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px 0px rgba(115, 108, 203, 0.23);
    margin-right: 10px;
    border-radius: 4px;
    cursor: pointer;
}
.detailBar>.item:hover{
    background-color: #76d344;
    color: #fefff6;
    font-weight: bolder;
}
.detailBar>.active{
    background-color: #76d344;
    color: #fefff6;
    font-weight: bolder; 
}
</style>
