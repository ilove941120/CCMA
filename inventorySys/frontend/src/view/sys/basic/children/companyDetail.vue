<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { GetCompanyDate, DeleteCompanyDate } from ':@/api/index'
import alert from ':@/components/alert.vue';
import editView from ':@/components/editView.vue';
import { useStore } from 'vuex';
const store = useStore();

//#region 接受父層傳送編輯欄位資訊
const sentObj = defineProps({
    sent: {
        type: Object,
        default: () => ({
            value:``,
            label:``
        })
    }
})
//#endregion
const isLoadComplete =ref(false)
//#region 資料表編輯欄位宣告
const editObj = reactive({
    action: "edit",
    pageId: -1,
    returnButtonShow:false,
    api: {
        read: "GetCompanyDate",
        add: "AddCompanyDate",
        edit: "UpdateCompanyDate"
    },
    itemGroup: {
        CompanyFullName: {
            inputType: "text",
            inputName: "公司全名",
            disabled: false,
            defaultValue: ""
        },
        CompanyName: {
            inputType: "text",
            inputName: "公司簡稱",
            disabled: false,
            defaultValue: ""
        },
        CompanyPerson: {
            inputType: "text",
            inputName: "負責人",
            disabled: false,
            defaultValue: ""
        },
        Phone: {
            inputType: "text",
            inputName: "公司電話",
            disabled: false,
            defaultValue: ""
        },
        TaxID: {
            inputType: "text",
            inputName: "統一編號",
            disabled: false,
            defaultValue: ""
        },
        AssetAmount: {
            inputType: "text",
            inputName: "資產金額",
            disabled: true,
            defaultValue: ""
        }
    }
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
function Return(){
    CloseForm()
}
//#endregion

//#region 頁面資料仔載入
const Load = async () => {
    try{
    const obj =reactive({CompanyId:-1})
    obj.CompanyId = sentObj.sent.CompanyId
      const result = (await GetCompanyDate(obj)).data
      let status = result.status 
      if (status == "success") {
        result.data.forEach((item)=>{
            editObj.pageId = item.CpDateId
            isLoadComplete.value = true
        })
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
Load()

onMounted(() => {
    console.log("A1")
});
//#endregion



</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <editView v-if="isLoadComplete" :sent="editObj"></editView>
</template>

<style scoped>
</style>
