<script setup>
import { reactive } from "@vue/reactivity";
import alert from ':@/components/alert.vue';
import editView from ':@/components/editView.vue';

const editObj = reactive({
    action:"read",
    pageId:-1,
    api:{
        read:"GetTransaction",
        add:"AddTransaction",
        edit:"UpdateTransaction"
    },
    itemGroup:{
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
