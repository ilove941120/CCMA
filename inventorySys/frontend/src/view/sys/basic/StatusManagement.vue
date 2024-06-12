<script setup>
import { ref, computed, reactive } from "@vue/reactivity";
import { GetStatus, DeleteStatus } from ':@/api/index'
import alert from ':@/components/alert.vue';
import editView from ':@/components/editView.vue';
import pageBar from ':@/components/pageBar.vue';
import { useStore } from 'vuex';
const store = useStore();

//#region 資料表編輯欄位宣告
const editObj = reactive({
    action: "read",
    pageId: -1,
    api: {
        read: "GetStatus",
        add: "AddStatus",
        edit: "UpdateStatus"
    },
    itemGroup: {
        StatusNo: {
            inputType: "text",
            inputName: "狀態代號",
            disabled: false,
            defaultValue: "",
        },
        StatusName: {
            inputType: "text",
            inputName: "狀態名稱",
            disabled: false,
            defaultValue: ""
        },
        StatusDesc: {
            inputType: "text",
            inputName: "狀態描述",
            disabled: false,
            defaultValue: ""
        },
        UseFrom:{
            inputType: "text",
            inputName: "使用來源",
            disabled: false,
            defaultValue: ""
        }
    }
})
//#endregion

//#region 頁面比數顯示,當前第幾頁
const pageObj = reactive({
    PageNo:"TypeManagement",
    StatusNo: "",
    StatusName: "",
    UseFrom: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
//#endregion

//#region 編輯頁面開啟關閉
const editShow = ref(false)
const changePage = ref("新增")
function addForm() {
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "edit"
    editObj.pageId = -1
}
function readForm(Id) {
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "read"
    editObj.pageId = Id
}
function editForm(Id) {
    editShow.value = true
    changePage.value = "返回"
    editObj.action = "edit"
    editObj.pageId = Id
}
function CloseForm() {
    editShow.value = false
    changePage.value = "新增"
    load()
}
//#endregion

//#region 刪除資料
const deleteStatus = async (StatusId) => {
    const obj =reactive({StatusId:StatusId})
    try{
        const result = (await DeleteStatus(obj))
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
      const result = (await GetStatus(pageObj)).data
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

load()

</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="navBar">
        <h2>狀態管理</h2>
        <div class="buttonBar">
            <button @click="!editShow ? addForm() : CloseForm()">
                {{ changePage }}
            </button>
        </div>
    </div>
    <editView v-if="editShow == true" :sent="editObj"></editView>
    <div class="content" v-if="editShow == false">
        <table>
            <tr>
                <th style="width: 5%;">#</th>
                <th style="width: 25%;">狀態代號</th>
                <th style="width: 25%;">狀態名稱</th>
                <th style="width: 25%;">使用來源</th>
                <th style="width: 20%;">操作</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="item.MtlItemNo" @mouseover="hoverRow(true, item.StatusId)"
                @mouseout="hoverRow(false, item.StatusId)">
                <td :style="{ backgroundColor: highlightedRow === item.StatusId ? '#C8EBFA' : '' }" style="width:  5%;text-align: center;">{{ pageObj.Index > 0 ? index + pageObj.Index + 1 : index + 1 }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.StatusId ? '#C8EBFA' : '' }" style="width: 25%;text-align: center;">{{ item.StatusNo }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.StatusId ? '#C8EBFA' : '' }" style="width: 25%;text-align: center;">{{ item.StatusName }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.StatusId ? '#C8EBFA' : '' }" style="width: 25%;text-align: center;" v-html="item.UseFrom"></td>
                <td :style="{ backgroundColor: highlightedRow === item.StatusId ? '#C8EBFA' : '' }" style="width: 20%;text-align: right;">
                    <button @click="readForm(item.StatusId)">查看</button>
                    <button @click="editForm(item.StatusId)">修改</button>
                    <button @click="deleteStatus(item.StatusId)">刪除</button>
                </td>
            </tr>
        </table>
        <pageBar :sent="pageObj" @change="ReturnPage"></pageBar>
    </div>
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
}</style>
