<script setup>
import { ref, reactive, watch,computed } from 'vue'
import { GetMenuModal, GetSystem } from ':@/api/index'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter()
//#region 接受父層傳送編輯欄位資訊
const sentObj = defineProps({
  sent: {
    type: Boolean,
    default: false,
  }
})
//#endregion

//#region 系統列表讀取
const OptionData = reactive([]);
const isOpen = ref(false)

const Sysload = async () => {
  try{
      const result = (await GetSystem()).data
      let status = result.status 
      if (status == "success") {
        var data = result.data.map(item => ({
          value: item.SystemNo + ' ' + item.SystemName,
          label:　item.SystemName,
          icon: item.IconStyle,
          id: item.SystemId,
          show: true // 添加新的 show 属性
        }));
        OptionData.value = data;
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
Sysload()
//#endregion

//#region 打開下拉選單
const selectOpen = () => {
  isOpen.value = true
}
//#endregion

//#region 下拉選單選擇
const selectedValue = reactive({ value: '', label: '請選擇',icon:'', returnValue: '', dataValue: '' });
const selectOption = (option) => {
  SysObj.SystemId = option.id;
  const inputData = sentObj.sent.dataFrom;
  selectedValue.value = option.value;
  selectedValue.label = option.label;
  selectedValue.icon = option.icon;
  switch (inputData) {
    case "Transaction":
      selectedValue.returnValue = option.value;
      break;
    case "MtlItem":
    case "System":
    case "Modal":
      selectedValue.returnValue = option.id;
      break;
  }
  selectedValue.dataValue = sentObj.sent.datakey;
  isOpen.value = false;
}
//#endregion

//#region 關閉下拉選單
const handleClick = (event) => {
  var className = event.target.className
  if (className != "selectModel" && className != "selectItem") {
    isOpen.value = false;
  }
}
//#endregion

//#region 頁面資料載入
const ModalData = reactive([])
const ComponentData = reactive({})
const SysObj = reactive({
  SystemId: -1,
})
const load = async () => {
  clearMenu()
  let data = (await GetMenuModal(SysObj)).data
  if(data.length>0){
    data.forEach((item) => {
      if (!ComponentData.hasOwnProperty(`${item.ModalName}`)) {
        ModalData[item.ModalName] = {show:false,IconStyle:item.IconStyle}
        ComponentData[item.ModalName] = { [item.ComponentName]: item.ComponentNo }
      }
      else {
        ComponentData[item.ModalName][item.ComponentName] = item.ComponentNo
      }
    })
  }
}
load()
//#endregion

//#region Menu切換模組
const ComponentShow = async (key) => {
  var status = ModalData[key].show 
  closeComponentMenu()

  if (!status) {
    ModalData[key].show = true
  }
  else {
    ModalData[key].show = false
  }
}
//#endregion

//#region 清空menu資料
function clearMenu() {
  ModalData.splice(0)
  Object.keys(ComponentData).forEach(key => {
    delete ComponentData[key]
  })
}
//#endregion

//#region ComponentMenu關閉
function closeComponentMenu() {
  Object.keys(ModalData).forEach((key1) => {
    ModalData[key1].show = false
  })
}
//#endregion

//#region 動態綁定class 90度轉向動畫
const getClass = (key) => {
  return ModalData[key].show ? 'menyA' : 'menyB'
}

const menuStatus = () => {
  const myStyle = reactive({})
  if(sentObj.sent){
    myStyle.width = '15%'
    myStyle.transitionDuration = '1s'
  }
  else{
    myStyle.width = '0%'
    myStyle.transitionDuration = '1s'
  }
  return myStyle
}
//#endregion

//#region 監控系統選單選擇
watch(() => SysObj.SystemId, (newValue, oldValue) => {
  load().then(() => {
  });
});
//#endregion

//#region 監控Menu顯示狀態,false就把ComponentMenu關閉
watch(() => sentObj.sent, (newValue, oldValue) => {
  if (!sentObj.sent) {
    closeComponentMenu()
  }
});
//#endregion

//#region 監控點擊非下拉單範圍就關閉,尚未解決同時開啟狀態
watch(() => isOpen.value, (newValue, oldValue) => {
  if (newValue) {
    window.addEventListener('click', handleClick);
  } else {
    window.removeEventListener('click', handleClick);
  }
});
//#endregion

//#region 監控系統選單選擇
watch(() => store.state.menuInfo.ComponentId, (newValue, oldValue) => {
  var SystemId = store.state.menuInfo.SystemId
  var SystemName = store.state.menuInfo.SystemName
  var SystemIconStyle = store.state.menuInfo.SystemIconStyle
  // var ModalId = store.state.menuInfo.ModalId
  // var ModalIconStyle = store.state.menuInfo.ModalIconStyle
  // var ComponentId = store.state.menuInfo.ComponentId
  SysObj.SystemId =SystemId
  selectedValue.value = SystemId;
  selectedValue.label = SystemName;
  selectedValue.icon = SystemIconStyle;
});
//#endregion

</script>

<template>
  <div class="menu" v-if="sentObj.sent">
    <div class="selectItem"  @click="selectOpen" >
      <span v-html="selectedValue.icon" style="margin-right: 10px;"></span> {{ selectedValue.label }}
      <ul v-show="isOpen === true">
        <li v-for="option in OptionData.value" :key="option.value" @click="selectOption(option)"
          :style="{ 'display': option.show == false ? 'none' : 'block' }">
          <span v-html="option.icon" style="margin-right: 10px;"></span>
          {{ option.label }}
        </li>
      </ul>
    </div>
    
    <div v-for="(value, key) in ComponentData" @click="ComponentShow(key)">
      <div class="Modal">
        <span v-html="ModalData[key].IconStyle" style="margin-right:10px;"></span>
        {{ key }}
        <span style="margin-left:30px;"><i class="fa-solid fa-play" :class="getClass(key)"></i></span>
      </div>
      <div v-if="ModalData[key].show != false">
        <router-link v-for="(value1, key1) in value" class="Component" :to="'/' + value1">{{ key1 }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  width: 25%;
  background-color: #285943;
  position: relative;
  overflow: auto;
}
@media (max-width: 1280px){
  .menu{
    width: 45%;

  }
}
@media (max-width: 768px){
  .menu{
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 2;
  }
}
.menyA{
  transform: rotate(90deg);
  transition-duration:0.5s;
}
.menyB{
  transform: rotate(0deg);
  transition-duration:0.5s;
}
.Modal,
.Component {
  display: block;
  text-decoration: unset;
  color: #fff29b;
  letter-spacing: 2px;
  padding: 15px 30px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 20px;
}

.Modal:hover {
  background-color: #ecd92e6e;
  color: #EAEEF3;
}

.Component {
  padding-left: 70px;
  font-size: 18px;
}

.Component:hover {
  background-color: #ecd92e6e;
  color: #EAEEF3;
}

.selectModel {
  width: 100%;
  cursor: pointer;
}

.selectItem {
  width: 90%;
  padding: 15px 10px;
  border-radius: 5px;
  border: unset;
  cursor: pointer;
  background-color: #C0ECD2;
  margin: auto;
  display: block;
  margin-top: 20px;
  font-weight: bolder;
  font-size: 20px;
  color: #3a5134;
  position: relative;
}

ul {
  width: 100%;
  padding: 0;
  position: absolute;
  z-index: 99;
  background-color: #C0ECD2;
  top: 56px;
  left: 0px;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 0 0 5px 5px;
  cursor: pointer;
}

li {
  list-style-type: none;
  /* 移除 <li> 元素的默认前缀 */
  padding: 10px;
}

li:hover {
  background-color: rgb(238, 255, 227);
}</style>
