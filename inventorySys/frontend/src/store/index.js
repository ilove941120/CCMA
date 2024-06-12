import {createStore} from 'vuex'
import { reactive } from "@vue/reactivity";
import { GetComponent } from ':@/api/index'

export default createStore({
    state:{
        menuInfo:{
            SystemId:-1,
            SystemName:-1,
            SystemIconStyle:-1,
            ModalId:-1,
            ModalName:-1,
            ModalIconStyle:-1,
            ComponentId:-1,
        },
        alertMsg:{
            show:false,
            msg:'',
            color: ''
        },
        loginInfo:{
            status:'',
            user:'',
            userName:''
        },
        Location:''
    },
    mutations:{
        async menuChang(state,ComponentNo){
            try{
                const obj =reactive({ComponentNo:ComponentNo})

                var result = (await GetComponent(obj)).data
                let status = result.status 
                if (status == "success") {
                    var SystemId = -1
                    var SystemName = ""
                    var SystemIconStyle = ""
                    var ModalId = -1
                    var ModalName = ""
                    var ModalIconStyle = ""
                    var ComponentId = -1
                    result.data.forEach((item)=>{
                        SystemId = item.SystemId
                        SystemName = item.SystemName
                        SystemIconStyle = item.SystemIconStyle
                        ModalId = item.ModalId
                        ModalName = item.ModalName
                        ModalIconStyle = item.ModalIconStyle
                        ComponentId = item.ComponentId
                    })
                    state.menuInfo.SystemId = SystemId
                    state.menuInfo.SystemName = SystemName
                    state.menuInfo.SystemIconStyle = SystemIconStyle
                    state.menuInfo.ModalId = ModalId
                    state.menuInfo.ModalName = ModalName
                    state.menuInfo.ModalIconStyle = ModalIconStyle
                    state.menuInfo.ComponentId = ComponentId
                } else {
                    commit('alertAction', { type: "fail", msg: '異常問題' });
                }
            }
            catch(err){
                console.error(err);
            }
        }
        ,
        alertAction(state, payload){
            const { type, msg } = payload;
            switch(type)
            {
                case "success":
                    state.alertMsg.color = '#35a065';
                    state.alertMsg.msg = msg;
                    break;
                case "fail":
                    state.alertMsg.color = '#a03535';
                    state.alertMsg.msg = msg;
                    break;
                case "warning":
                    state.alertMsg.color = '#fac45f';
                    state.alertMsg.msg = msg;
                    break;
            }
            state.alertMsg.show = true
            if (state.alertMsg.timer) {
                clearTimeout(state.alertMsg.timer);
            }
            state.alertMsg.timer = setTimeout(() => {
                state.alertMsg.show = false; // 在3秒后关闭提示消息
                state.alertMsg.msg = '';
                state.alertMsg.color = '';
            }, 1000);
        },
        stopTimer(state) { // 停止计时器的 mutation
            if (state.alertMsg.timer) {
                clearTimeout(state.alertMsg.timer);
            }
        },
        startTimer(state) { // 重新开始计时的 mutation
            state.alertMsg.timer = setTimeout(() => {
                state.alertMsg.show = false; 
                state.alertMsg.msg = '';
                state.alertMsg.color = '';
            }, 1000);
        },
        // 登录状态变化的 mutation 方法
        loginAction(state, userInfo) {
            state.loginInfo.status = userInfo.status;
            state.loginInfo.user = userInfo.user;
            state.loginInfo.userName = userInfo.userName;
        },
        // 如果需要的话，你也可以添加一个退出登录的 mutation
        logoutAction(state, userInfo) {
            state.loginInfo.status = userInfo.status;
            state.loginInfo.user = "";
            state.loginInfo.userName = "";
            state.menuInfo.SystemId = -1
            state.menuInfo.SystemName = -1
            state.menuInfo.SystemIconStyle = -1
            state.menuInfo.ModalId = -1
            state.menuInfo.ModalName = -1
            state.menuInfo.ModalIconStyle = -1
            state.menuInfo.ComponentId = -1
        },
        EnterWeb(state,location){
            state.Location= location
        }
    },
    actions:{

    },
    modules:{

    }

})