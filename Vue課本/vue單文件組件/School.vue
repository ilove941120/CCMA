<template>
    <div>
        <h1>學校名稱:{{name}}</h1>
        <h1>學校地址:{{address}}</h1>
        <hr>
        <Student></Student>
    </div> 
</template>

<script>
import Student from './Student'

export default {
    name:"School",
    data(){
        return {
            name:"村上國小",
            address:"彰化大村"
        }
    },
    components:{
        Student
    }
}
</script>

<style>

</style>