<script setup>
import { ref, computed, reactive } from "@vue/reactivity";
import alert from ':@/components/alert.vue';
import { GetTransaction } from ':@/api/index'
import { useRoute } from 'vue-router';
const route = useRoute();
const searchData = ref(route.params.id)
const tableData = ref([])
const load = async () => {
    let data = (await GetTransaction(searchData.value)).data
    tableData.value = data
}

const highlightedRow = ref('')
const hoverRow = (status, itemId) => {
    if (status) {
        highlightedRow.value = itemId;
    }
    else {
        highlightedRow.value = null;
    }
}


load()
</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <h2>交易明細</h2>
    <div class="content">
        <table>
            <tr>
                <th style="width: 20%;">交易日</th>
                <th style="width: 15%;">交易類型</th>
                <th style="width: 15%;">數量</th>
                <th style="width: 10%;">單價</th>
                <th style="width: 10%;">總金額</th>
            </tr>
            <tr v-for="item in tableData" :key="item.MtId" @mouseover="hoverRow(true, item.MtId)"
                @mouseout="hoverRow(false, item.MtId)">
                <td :style="{ backgroundColor: highlightedRow === item.MtId ? '#C8EBFA' : '' }" style="">{{
                    item.TransactionDate }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.MtId ? '#C8EBFA' : '' }"
                    style="width: 15%;text-align: center;">{{ item.TransactionType }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.MtId ? '#C8EBFA' : '' }"
                    style="width: 15%;text-align: center;">{{ item.Quantity }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.MtId ? '#C8EBFA' : '' }"
                    style="width: 10%;text-align: right;">{{ item.Price }}</td>
                <td :style="{ backgroundColor: highlightedRow === item.MtId ? '#C8EBFA' : '' }"
                    style="width: 10%;text-align: right;">{{ item.Amount }}</td>
                <!-- <td :style="{ backgroundColor: highlightedRow === item.MtlItemId ? '#C8EBFA' : '' }" style="width: 20%;text-align: right;">
                    <router-link class="item" to="/"> <button>交易明細</button></router-link>
                    <router-link class="item" to="/AddNewData"><button>修改</button></router-link>
                    <button @click="deleteMtlItem(item.MtlItemId)">刪除</button>
                </td> -->
            </tr>
        </table>
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

}</style>
