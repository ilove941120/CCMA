<script setup>
import { ref, computed, reactive } from "@vue/reactivity";
import { GetWarehouse, DeleteWarehouse } from ':@/api/index'
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
        read: "GetWarehouse",
        add: "AddWarehouse",
        edit: "UpdateWarehouse"
    },
    itemGroup: {
        WarehouseNo: {
            inputType: "text",
            inputName: "庫別代號",
            disabled: false,
            defaultValue: "",
        },
        WarehouseName: {
            inputType: "text",
            inputName: "庫別名稱",
            disabled: false,
            defaultValue: ""
        },
        WarehouseDesc: {
            inputType: "text",
            inputName: "庫別描述",
            disabled: false,
            defaultValue: ""
        }
    }
})
//#endregion

//#region 頁面比數顯示,當前第幾頁
const pageObj = reactive({
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
const deleteWarehouse = async (WarehouseId) => {
    DeleteWarehouse(WarehouseId).then(res => {
        if (res.status == 200) {
            store.commit('alertAction', { type: "success", msg: "執行成功" });
            load()
        }
    })

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
    let data = (await GetWarehouse(pageObj)).data
    pageObj.TatolNum = data[0].Total
    tableData.value = data
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
        <h2>庫別管理</h2>
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
                <th style="width: 20%;">庫別代號</th>
                <th style="width: 20%;">庫別名稱</th>
                <th style="width: 20%;">庫別描述</th>
                <th style="width: 15%;">操作</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="item.MtlItemNo" @mouseover="hoverRow(true, item.WarehouseId)"
                @mouseout="hoverRow(false, item.WarehouseId)">
                <td :style="{ backgroundColor: highlightedRow === item.WarehouseId ? '#C8EBFA' : '' }" style="width:  5%;text-align: center;">{{ pageObj.Index > 0 ? index + pageObj.Index + 1 : index + 1 }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.WarehouseId ? '#C8EBFA' : '' }" style="width: 20%;text-align: center;">{{ item.WarehouseNo }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.WarehouseId ? '#C8EBFA' : '' }" style="width: 20%;text-align: center;">{{ item.WarehouseName }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.WarehouseId ? '#C8EBFA' : '' }" style="width: 20%;text-align: center;">{{ item.WarehouseDesc }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.WarehouseId ? '#C8EBFA' : '' }" style="width: 15%;text-align: right;">
                    <button @click="readForm(item.WarehouseId)">查看</button>
                    <button @click="editForm(item.WarehouseId)">修改</button>
                    <button @click="deleteWarehouse(item.WarehouseId)">刪除</button>
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
