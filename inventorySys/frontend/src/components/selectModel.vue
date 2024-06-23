<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
// 控制輸入框欄位可否輸入 閱讀頁:true,編輯頁:採用其欄位設定值決定
let selectStatus 

//接受父層傳送的物件
const sentObj = defineProps({
    sent: {
        type: Object,
        default: () => ({
            type: "normal",
            action:"",
            api: "",
            useFrom: "",
            disabled: false,
            datakey: "",
            dataValue: "",
            parentLayer: "",
            parentLayerId:-1
        })
    }
})


watch(()=>sentObj.sent.parentLayerId, (newData) => {
    Load()
})
if(sentObj.sent.action != "add"){
    watch(() => sentObj.sent.dataValue, (newVal) => {
        Load()
    })
}
else{
    Load()
}

const OptionData = reactive([]);
const searchSetting = ref('')
const searchSetting1 = ref('')
const isOpen = ref(false)

//#region 動態導入api
async function getMethod(name) {
    const importedModule = await import(':@/api/index')
    return importedModule[name]
}
//#endregion

async function Load()  {
    const inputData = sentObj.sent.api
    const methodFunc = await getMethod(inputData)
    if (methodFunc && typeof methodFunc === 'function') {
        try {
            let data = "";
            const action = sentObj.sent.action
            const inputType = sentObj.sent.type
            const ParentLayer = sentObj.sent.parentLayer
            const ParentLayerId = sentObj.sent.parentLayerId
            const dataValue = sentObj.sent.dataValue
            const ParentForm = reactive({})
            if(action == "read"){
                selectStatus = true
            }
            else{
                selectStatus = false
            }
            if (inputType == "normal") {
                searchSetting1.value = false;
                searchSetting.value.readOnly = true; 
            }
            else {
                searchSetting1.value = true;
                searchSetting.value.readOnly = false;
            }
            var result
            if(ParentLayer != undefined && ParentLayerId == -1){
                return
            }
            else if(ParentLayer != undefined && ParentLayerId != -1){
                ParentForm[ParentLayer] = ParentLayerId
                result = await methodFunc(ParentForm)
            }
            else{
                console.log("A")
                result = await methodFunc(sentObj.sent)
            }

            let status = result.data.status
            if (status == "success") {
                OptionData.splice(0)
                selectedValue.label = "請選擇"
                result.data.data.forEach((item) => {
                    if(action == "read" || action == "edit"){
                        if(dataValue == item.SelectId || dataValue == item.SelectNo){
                            selectedValue.label = item.SelectName
                        }
                    }
                    OptionData.push({
                        SelectId:item.SelectId,
                        SelectNo:item.SelectNo,
                        SelectName:item.SelectName,
                        Show:true,
                    })
                })
            }
            else {
                store.commit('alertAction', { type: "fail", msg: '異常問題,刪除失敗' });
            }
        } catch (error) {
            store.commit('alertAction', { type: "fail", msg: error })
        }
    }
    return
   
    setTimeout(() => {
        if (sentObj.sent.dataValue != "") {
            var OptionDataLength = OptionData.value.length
            for(var i = 0; i<OptionDataLength;i++){
                if(OptionData.value[i].id == sentObj.sent.dataValue){
                    selectOption(OptionData.value[i])
                    return
                }
            }
            // OptionData.value.forEach(item=>{
                
            //     console.log(OptionData.value)
            // })
        }
        else{
            selectStatus = false
            $(".selectItem").prop("disabled", false);
        }
    }, 100);
    
}



//選中項目傳送值回父層
const selectedValue = reactive({ SelectNo: '', label: '請選擇', returnValue: ''});
const selectOption = (option) => {
    const SelectNo = option.SelectNo
    const datakey = sentObj.sent.datakey
    selectedValue.datakey = datakey
    selectedValue.SelectNo = SelectNo;
    selectedValue.value = option.SelectId;
    selectedValue.label = option.SelectName;
    switch (SelectNo) {
        case "TypeManagement":
        case "StatusManagement":
            selectedValue.returnValue = option.SelectNo;
            break;
        default:
            selectedValue.returnValue = option.SelectId;
            break;
    }
    //selectedValue.dataValue = sentObj.sent.datakey;
    isOpen.value = false;
}
const emit = defineEmits(['change'])
watch(selectedValue, (newData) => {
    emit('change', newData)
})
//打開下拉選單
const selectOpen = () => {
    isOpen.value = true
}
//關閉下拉選單(監控點擊非下拉單範圍就關閉,尚未解決同時開啟狀態)
const handleClick = (event) => {
    var className = event.target.className
    if (className != "selectModel" && className != "selectItem") {
        isOpen.value = false;
    }
}
watch(() => isOpen.value, (newValue, oldValue) => {
    if (newValue) {
        window.addEventListener('click', handleClick);
    } else {
        window.removeEventListener('click', handleClick);
    }
});


//下拉框值改變篩選
const inputChange = () => {
    const changeText = selectedValue.label
    OptionData.value.forEach(item => {
        if (changeText == '') {
            item.show = true;
            return
        }
        if (!item.label.startsWith(changeText)) {
            item.show = false;
        }
        else {
            item.show = true;
        }
    });
}

</script>

<template>
    <div class="selectModel">
        <input class="selectItem" v-model="selectedValue.label" @click="selectOpen"
            @input="searchSetting1 ? inputChange : null" ref="searchSetting"
            :disabled="selectStatus ? selectStatus :sentObj.sent.disabled ? true : false"
            >
        <ul v-show="isOpen === true">
            <li v-for="option in OptionData" :key="option.SelectId" @click="selectOption(option)"
                :style="{ 'display': option.show == false ? 'none' : 'block' }">
                {{ option.SelectName }}
            </li>
        </ul>
    </div>
</template>

<!--  -->

<style scoped>
.selectModel {
    position: relative;
    width: 100%;
    cursor: pointer;
}

.selectItem {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid rgb(180, 180, 180);
    cursor: pointer;
}

ul {
    width: 100%;
    padding: 0;
    position: absolute;
    z-index: 99;
    background-color: rgb(255, 255, 255);
    top: 40px;
    border: 1px solid rgb(180, 180, 180);
    border-radius: 0 0 5px 5px;
}

li {
    list-style-type: none;
    /* 移除 <li> 元素的默认前缀 */
    padding: 10px;
}

li:hover {
    background-color: rgb(238, 255, 227);
}

input:disabled {
    background-color: #e8f5ec;
}
</style>
