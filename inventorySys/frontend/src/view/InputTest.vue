<script setup>
import { reactive } from "@vue/reactivity";
import alert from ':@/components/alert.vue';
import editView from ':@/components/editView.vue';

//#region 說明
// * inputType:輸入框類型
//    1.text:文字
//    2.number:數字
//    3.date:日期
//    4.select:下拉選單
// * inputName:輸入框名稱
// * disabled:預設是否要鎖定
// * defaultValue:預設輸入框值
// * selectType:下拉選單類型
//    1.normal:一般純下拉
//    2.search:可搜尋篩選文字下拉
// * selectData:下拉選單資料來源
// * calculate:計算公式
//    1.parameter:會使用到欄位參數陣列
//    2.formula:計算公式
// * IconShowLayer:是否顯示Icon圖示框
//#endregion

const editObj = reactive({
    action:"read",
    pageId:-1,
    api:{
        read:"GetTransaction",
        add:"AddTransaction",
        edit:"UpdateTransaction"
    },
    itemGroup:{
        DocDate:{
            inputType:"date",
            inputName:"單據日",
            disabled:false,
            defaultValue:""
        },
        TransactionDate:{
            inputType:"date",
            inputName:"交易日",
            disabled:false,
            defaultValue:""
        },
        TransactionType:{
            inputType:"select",
            inputName:"交易類型",
            disabled:false,
            defaultValue:"",
            selectType:"normal",
            selectData:"Transaction"
        },
        MtlItemId:{
            inputType:"select",
            inputName:"品號",
            disabled:false,
            defaultValue:"",
            selectType:"search",
            selectData:"MtlItem"
        },
        Quantity:{
            inputType:"number",
            inputName:"數量",
            disabled:false,
            defaultValue:"0"
        },
        Price:{
            inputType:"number",
            inputName:"單價",
            disabled:false,
            defaultValue:"0"
        },
        Discount:{
            inputType:"number",
            inputName:"折扣",
            disabled:false,
            defaultValue:"0"
        },
        TaxRate:{
            inputType:"number",
            inputName:"營業稅率",
            disabled:false,
            defaultValue:"0.8"
        },
        ExchangeRate:{
            inputType:"number",
            inputName:"匯率",
            disabled:false,
            defaultValue:"4"
        },
        Amount:{
            inputType:"number",
            inputName:"總金額",
            disabled:true,
            defaultValue:"0",
            calculate:{
                parameter:['Quantity','Price','Discount','TaxRate'],
                formula:(a,b,c,d)=>{
                    return (a * b - c)*d
                }
            },
        },
        OreAmount:{
            inputType:"number",
            inputName:"匯率換算總金額",
            disabled:true,
            defaultValue:"0",
            calculate:{
                parameter:['Amount','ExchangeRate'],
                formula:(a,b)=>{
                    return a *b
                }
            }
        }
        ,
        IconStyle:{
            inputType: "text",
            inputName: "Icon圖示",
            disabled: false,
            defaultValue: "",
            IconShowLayer:true
        }
    }
})
</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <h2>交易新增</h2>
    <editView :sent="editObj"></editView>
</template>

<style scoped>

h2{
    margin: 0;
    margin-bottom: 10px;
}

</style>
