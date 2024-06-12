<script setup>
import { ref, reactive, watch,computed } from 'vue'
import alert from ':@/components/alert.vue';
import { GetLogin } from ':@/api/index'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter()

const LoginForm = reactive({
    StaffNo:"ZY01032",
    PassWord:"1234"
})
const reFrom = reactive({})
const Login = async () => {
    try {
        let result = (await GetLogin(LoginForm)).data;
        let status = result.status 
        if (status == "success") {
            let msg = result.msg 
            let userNo = ""
            let userName = ""
            result.data.forEach((item)=>{
                userNo = item.StaffNo
                userName = item.StaffName
            })
            sessionStorage.setItem("user", JSON.stringify(LoginForm.StaffNo));
            store.commit('alertAction', { type: "success", msg: msg });
            store.commit('loginAction', {status:"A", user:userNo,userName:userName});
            store.commit('EnterWeb', 'Sys');
            router.push('/CompanyManagement');
        } else {
            store.commit('alertAction', { type: "fail", msg: '登入失敗,異常問題' });
        }
    } catch (error) {
        console.log(error)
        let msg = error.response.data.err;
        store.commit('alertAction', { type: "fail", msg: msg });
    }
}

if(store.state.loginInfo.user == -1){
    location.reload();
}
</script>

<template>
    <alert v-if="$store.state.alertMsg.show == true" :msg="$store.state.alertMsg"></alert>
    <div class="loginFrame">
        <div class="formTable">
            <h1>公司營運系統登入</h1>
            <div class="row">
                <label for="">帳號</label>
                <input type="text" name="" id="" v-model="LoginForm.StaffNo">
            </div>
            <div class="row">
                <label for="">密碼</label>
                <input type="text" name="" id=""  v-model="LoginForm.PassWord">
            </div>
            <button class="loginButton" @click="Login">登入</button>
        </div>
    </div>
</template>

<style scoped>
.loginFrame{
    background-color: #6c7c6a;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.formTable{
    width: 500px;
    padding: 50px;
    background-color: #D7FFF1;
    height: 60vh;
    margin-bottom: 200px;
    border-radius: 5px;
}
.row{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}
.row label{
    margin-bottom: 10px;
}
.row input{
    height: 40px;
    font-size: 20px;
    border-radius: 5px;
}
.loginButton{
    display: block;
    text-align: center;
    width: 100%;
    padding: 10px 0;
    font-size: 20px;
    margin-top: 40px;
    border-radius: 5px;
    background-color: #a8dba8;
    color: #3a5134;
}
</style>
