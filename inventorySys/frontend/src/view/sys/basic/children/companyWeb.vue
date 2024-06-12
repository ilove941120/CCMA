<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { GetCompanyWeb, DeleteCompanyWeb } from ':@/api/index'
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
    api: {
        read: "GetCompanyWeb",
        add: "AddCompanyWeb",
        edit: "UpdateCompanyWeb"
    },
    itemGroup: {
        WebNo: {
            inputType: "text",
            inputName: "官網代號",
            disabled: false,
            defaultValue: ""
        },
        WebName: {
            inputType: "text",
            inputName: "官網名稱",
            disabled: false,
            defaultValue: ""
        },
        WebDesc: {
            inputType: "text",
            inputName: "官網描述",
            disabled: false,
            defaultValue: ""
        }
    }
})
//#endregion

//#region 頁面比數顯示,當前第幾頁
const pageObj = reactive({
    PageNo:"CompanyWeb",
    WebNo: "",
    WebName: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
//#endregion

//#region 編輯頁面開啟關閉
const editShow = ref(false)
const changePage = ref("新增")
function AddForm() {
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "add"
    editObj.pageId = -1
}
function ReadForm(Id) {
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "read"
    editObj.pageId = Id
}
function EditForm(Id) {
    
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "edit"
    editObj.pageId = Id
}
function CloseForm() {
    editShow.value = false
    changePage.value = "新增"
    editObj.action = ""
    editObj.pageId = -1
    Load()
}
//#endregion

//#region 刪除資料
const Delete = async (CompanyId) => {
    const obj =reactive({CompanyId:CompanyId})
    try{
        const result = (await DeleteCompanyWeb(obj))
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
const Load = async () => {
    try{
      const result = (await GetCompanyWeb(pageObj)).data
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
    Load()
}
//#endregion


onMounted(() => {
    Load()
});

</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="content" v-if="editShow == false">
        <div class="navbar">
            <div class="col"></div>
            <div class="col" style="display: flex;justify-content: flex-end;"><button class="addButton" @click="AddForm()"><i class="fa-solid fa-plus"></i>{{ changePage }}</button></div>
        </div>
        <table>
            <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 30%;">官網代號</th>
                <th style="width: 30%;">官網名稱</th>
                <th style="width: 35%;">操作</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="item.CwId" @mouseover="hoverRow(true, item.CwId)"
                @mouseout="hoverRow(false, item.CwId)">
                <td :style="{ backgroundColor: highlightedRow === item.CwId ? '#C8EBFA' : '' }" style="">{{ pageObj.Index > 0 ? index + pageObj.Index + 1 : index + 1 }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.CwId ? '#C8EBFA' : '' }" style="width: 15%;text-align: center;">{{ item.WebNo }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.CwId ? '#C8EBFA' : '' }" style="width: 15%;text-align: center;">{{ item.WebName }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.CwId ? '#C8EBFA' : '' }" style="width: 20%;text-align: right;">
                    <button @click="ReadForm(item.CwId)">查看</button>
                    <button @click="EditForm(item.CwId)">修改</button>
                    <button @click="Delete(item.CwId)">刪除</button>
                </td>
            </tr>
        </table>
        <pageBar :sent="pageObj" @change="ReturnPage"></pageBar>
    </div>
    <editView v-if="editShow == true" :sent="editObj" @return="CloseForm"></editView>

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
