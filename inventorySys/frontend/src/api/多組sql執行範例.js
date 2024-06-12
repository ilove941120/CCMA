import {createStore} from 'vuex'
import { reactive } from "@vue/reactivity";
import { GetComponent } from ':@/api/index'

export default createStore({
    state:{
        menuInfo:{
            SystemId:-1,
            ModalId:-1,
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
        }
    },
    mutations:{
        menuChang(state,ComponentNo){
            console.log(ComponentNo)

            try{
                console.log("AQ")
                console.log("AQW")
                const obj =reactive({ComponentNo:ComponentNo})

                console.log(obj)
                var resultComponent = (await GetComponent(obj)).data
            }
            catch(err){

            }
        }
    },
    actions:{

    },
    modules:{

    }
})