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




DeleteData

LoadData

AddForm

//#region 列表欄位宣告
const tableHead = reactive([
    {
        name:`#`,
    },
    {
        name:`所屬系統`,
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

//#region HTML
<tr class="tableHead">
    <th  v-for="(item,index) in tableHead" :style="item.style">{{ item.name}}</th>
</tr>
<tr class="tableItem" v-for="(item, index) in tableData" :key="item.MtlItemId" @mouseover="hoverRow(true, item.MtlItemId)" @mouseout="hoverRow(false, item.MtlItemId)">
                <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }">
                    <div class="coulumName">#</div>
                    <div class="coulumValue">{{ pageObj.Index > 0 ? index + pageObj.Index + 1 : index + 1 }}</div>
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
                    <div class="coulumValue">{{ item.Status }}</div>
                </td>
                <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }">
                    <div class="coulumName">操作</div>
                    <div class="coulumValue">
                        <button @click="ReadForm(item.MtlItemId)">查看</button>
                        <button @click="EditForm(item.MtlItemId)">修改</button>
                        <button @click="DeleteData(item.MtlItemId)">刪除</button>
                    </div>
                </td>
            </tr>
//#endregion

//#region CSS
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
//#endregion
