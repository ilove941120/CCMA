<script setup>
import { ref, reactive, watch, computed } from 'vue'
import alert from ':@/components/alert.vue';
import selectModel from ':@/components/selectModel.vue';
import { useStore } from 'vuex';
const store = useStore();
// 控制輸入框欄位可否輸入 閱讀頁:true,編輯頁:採用其欄位設定值決定
let inputStatus = true

//#region 接受父層傳送編輯欄位資訊
const sentObj = defineProps({
    sent: {
        type: Object,
        default: () => ({ action: '', pageId: -1, api: '', itemGroup: {} })
    }
})
//#endregion
const form = reactive({})
const methodName = ref('')

//#region 根據父層資料判斷 該頁面要進行動作
switch (sentObj.sent.action) {
    case "read":
        inputStatus = true
        methodName.value = sentObj.sent.api.read
        Load()
        break
    case "add":
        inputStatus = false
        methodName.value = sentObj.sent.api.add
        break
    case "edit":
        inputStatus = false
        methodName.value = sentObj.sent.api.read // 先給讀取資料api
        Load()
        methodName.value = sentObj.sent.api.edit // 再給更新資料api
        break
}
//#endregion
//#region 動態導入api
async function getMethod(name) {
    const importedModule = await import(':@/api/index')
    return importedModule[name]
}
//#endregion

//#region 使用父層傳送資料創建欄位表單
async function Load() {
    const methodFunc = await getMethod(methodName.value)
    form.Id = sentObj.sent.pageId
    if (methodFunc && typeof methodFunc === 'function') {
        try {
            const result = await methodFunc(form)

            let status = result.data.status
            if (status == "success") {
                result.data.data.forEach((item) => {
                    for (var i = 0; i <= Object.keys(item).length; i++) {
                        if (Object.keys(form).includes(Object.keys(item)[i])) {
                            form[Object.keys(item)[i]] = item[Object.keys(item)[i]]
                        }
                    }
                })
            }
            else {
                store.commit('alertAction', { type: "fail", msg: '異常問題,刪除失敗' });
            }
        } catch (error) {
            store.commit('alertAction', { type: "fail", msg: error })
        }
    }
}
//#endregion


//#region 動態產生欄位
const sentObjpath = sentObj.sent.itemGroup
const itemGroupLength = Object.keys(sentObjpath).length;
for (var i = 0; i < itemGroupLength; i++) {
    const key = Object.keys(sentObjpath)[i]
    switch (sentObjpath[key].inputType) {
        case "text":
        case "number":
        case "select":
            form[key] = sentObjpath[key].defaultValue;
            break;
        case "date":
            // 初始化为今天的日期
            form[key] = new Date();
            // 新增一个属性来保存格式化的日期
            form[`${key}`] = formatDate(form[key]);
            // 监控日期字段
            watch(() => form[key], (newValue, oldValue) => {
                form[`${key}`] = formatDate(newValue);
            });
            break;
    }
    if (sentObjpath[key].calculate) {
        const formula = sentObjpath[key].calculate.formula
        const parameter = sentObjpath[key].calculate.parameter
        parameter.forEach(param => {
            watch(() => form[param], (newValue, oldValue) => {
                form[key] = formula(...parameter.map(p => form[p]));
            });
        });
    }

}
//#endregion


//#region 儲存表單資料
const Save = async () => {
    const methodFunc = await getMethod(methodName.value)
    form.id = sentObj.sent.pageId
    if (methodFunc && typeof methodFunc === 'function') {
        try {
            const result = await methodFunc(form)
            let status = result.data.status 
            let msg = result.data.msg 
            if (status == "success") {
                store.commit('alertAction', { type: "success", msg: msg })
            } else {
                store.commit('alertAction', { type: "fail", msg: '異常問題,新增失敗' });
            }
        } catch (error) {
            let errMsg = error.response.data.msg;
            store.commit('alertAction', { type: "fail", msg: errMsg })
        }
    }
}
//#endregion

//#region 接受select 回傳值
const changeHandler = (data) => {
    form[data.datakey] = data.returnValue
}
//#endregion

//#region 將日期資料轉換 yyyy-MM-dd格式
function formatDate(dateStr) {
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}
//#endregion

const emit = defineEmits(['return'])

const Return = () => {
    emit('return', false)
}

const icon = ref(`<i class="fa-brands fa-facebook"></i>`)
</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="content">
        <div class="form">
            <div v-for="(value, key) in sentObj.sent.itemGroup" :key="key">
                <div class="row">
                    <label for="">{{ value.inputName }}</label>
                    <input v-if="value.inputType == 'text'" type="text" :placeholder="'請輸入' + value.inputName"
                        v-model="form[key]" :disabled="inputStatus ? inputStatus : value.disabled">
                    <input v-else-if="value.inputType == 'number'" type="number" :placeholder="'請輸入' + value.inputName"
                        v-model="form[key]" :disabled="inputStatus ? inputStatus : value.disabled">
                    <selectModel v-else-if="value.inputType == 'select'"
                        :sent="{ type: value.selectType, 
                                 action:sentObj.sent.action,
                                 dataFrom: value.selectData, 
                                 disabled: value.disabled, 
                                 datakey: key, 
                                 dataValue: form[key],
                                 parentLayer:value.parentLayer,
                                 parentLayerId: value.parentLayer !=''? form[value.parentLayer] != ''? form[value.parentLayer] : -1 :-1 }"
                        @change="changeHandler"></selectModel>
                    <el-date-picker v-if="value.inputType == 'date'" v-model="form[key]" type="date" placeholder="請輸入交易日"
                        :disabled="inputStatus ? inputStatus : value.disabled"></el-date-picker>
                    <div class="IconShowLayer" v-if="value.IconShowLayer == true" v-html="form.IconStyle"></div>
                </div>
            </div>
        </div>
        <div class="formFooter">
            <button @click="Return()">返回</button>
            <button @click="Save()" v-if="!inputStatus">儲存</button>
        </div>
    </div>
</template>

<style scoped>
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

.row {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
}

.row label {
    margin-right: 20px;
    margin-bottom: 10px;
}

input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgb(180, 180, 180);
}

input:disabled {
    background-color: #e8f5ec;
}

button {
    margin-left: 10px;
    margin-top: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    border: 0;
    box-shadow: 1px 1px 1px 1px #a7afa7;
}

button:hover {
    background-color: rgb(195, 241, 143);
}

.IconShowLayer {
    width: 100%;
    padding: 20px;
    background-color: #6998AB;
    border: 5px groove black;
    font-size: 36px;
    color: #FFFFFF;
    margin-top: 10px;
    text-align: center;
}
.formFooter{
    display: flex;
    justify-content: flex-end;
}

</style>
