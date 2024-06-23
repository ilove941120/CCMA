<script setup>
import { ref, computed, reactive } from "@vue/reactivity";
import { GetSystem, DeleteSystem } from ':@/api/index'
import alert from ':@/components/alert.vue';
import editView from ':@/components/editView.vue';
import pageBar from ':@/components/pageBar.vue';
import { useStore } from 'vuex';
const store = useStore();

//#region 資料表編輯欄位宣告
const editObj = reactive({
    action: "",
    pageId: -1,
    api: {
        read: "GetSystem",
        add: "AddSystem",
        edit: "UpdateSystem"
    },
    itemGroup: {
        SystemNo: {
            inputType: "text",
            inputName: "系統代號",
            disabled: false,
            defaultValue: "",
        },
        SystemName: {
            inputType: "text",
            inputName: "系統名稱",
            disabled: false,
            defaultValue: ""
        },
        SystemDesc: {
            inputType: "text",
            inputName: "系統描述",
            disabled: false,
            defaultValue: ""
        },
        IconStyle:{
            inputType: "text",
            inputName: "Icon圖示",
            disabled: false,
            defaultValue: "",
            IconShowLayer:true
        }
    }
})
//#endregion

//#region 頁面比數顯示,當前第幾頁
const pageObj = reactive({
    PageNo:"SystemManagement",
    SystemNo: "",
    SystemName: "",
    ShowNum: 10,
    Index: 0,
    TatolNum: 0
})
//#endregion

//#region 編輯頁面開啟關閉
const editShow = ref(false)
const changePage = ref("新增")
function AddForm() {
    changePage.value = "返回"
    editObj.action = "add"
    editShow.value = true
    editObj.pageId = -1
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
    editObj.action = ""
    editShow.value = false
    editObj.pageId = -1
    LoadData()
}
//#endregion

//#region 刪除資料
const DeleteData = async (SystemId) => {
    const obj =reactive({SystemId:SystemId})
    try{
        const result = (await DeleteSystem(obj))
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
//#region 列表欄位宣告
const tableHead = reactive([
    {
        name:`#`,
    },
    {
        name:`系統代號`,
    },
    {
        name:`系統名稱`,
    },
    {
        name:`Icon圖示`,
    },
    {
        name:`操作`,
    }
])
//#endregion

const tableData = ref([])
const LoadData = async () => {
    try{
      const result = (await GetSystem(pageObj)).data
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

</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="navBar">
        <h2>系統管理</h2>
        <div class="buttonBar">
            <button @click="!editShow ? AddForm() : CloseForm()">
                {{ changePage }}
            </button>
        </div>
    </div>
    <editView v-if="editShow == true" :sent="editObj"></editView>
    <div class="content" v-if="editShow == false">
        <table>
            <tr class="tableHead">
                <th  v-for="(item,index) in tableHead" :style="item.style">{{ item.name}}</th>
            </tr>
            <tr class="tableItem" v-for="(item, index) in tableData" :key="item.SystemId" @mouseover="hoverRow(true, item.SystemId)"
                @mouseout="hoverRow(false, item.SystemId)">
                <td :style="{ backgroundColor: highlightedRow === item.SystemId ? '#C8EBFA' : '' }">
                    <div class="coulumName">#</div>
                    <div class="coulumValue">{{ pageObj.Index > 0 ? index + pageObj.Index + 1 : index + 1 }}</div>
                </td>
                <td :style="{ backgroundColor: highlightedRow === item.SystemId ? '#C8EBFA' : '' }">
                    <div class="coulumName">系統代號</div>
                    <div class="coulumValue">{{ item.SystemNo }}</div>
                </td>
                <td :style="{ backgroundColor: highlightedRow === item.SystemId ? '#C8EBFA' : '' }">
                    <div class="coulumName">系統名稱</div>
                    <div class="coulumValue">{{ item.SystemName }}</div>
                </td>
                <td :style="{ backgroundColor: highlightedRow === item.SystemId ? '#C8EBFA' : '' }">
                    <div class="coulumName">Icon圖示</div>
                    <div class="coulumValue" v-html="item.IconStyle"></div>
                </td>
                <td :style="{ backgroundColor: highlightedRow === item.SystemId ? '#C8EBFA' : '' }">
                    <div class="coulumName">操作</div>
                    <div class="coulumValue">
                        <button @click="ReadForm(item.SystemId)">查看</button>
                        <button @click="EditForm(item.SystemId)">修改</button>
                        <button @click="DeleteData(item.SystemId)">刪除</button>
                    </div>
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
