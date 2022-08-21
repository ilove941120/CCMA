<template>
    <div>
        <ul>
            <li v-for="item in classA">學生名稱:{{item.name}}---學生班級:{{item.studentClass}}</li>
            <hr>
            <li v-for="item in classB">學生名稱:{{item.name}}---學生班級:{{item.studentClass}}</li>
        </ul>
    </div>
</template>

<script>

export default {
    name:"Student",
    data(){
        return{
            classA:[
                {
                    name:"陳大天",
                    studentClass:"六年甲班"
                },
                {
                    name:"大中天",
                    studentClass:"六年甲班"
                }
            ],
            classB:[
                {
                    name:"張忠義",
                    studentClass:"六年乙班"
                },
                {
                    name:"黃美珍",
                    studentClass:"六年乙班"
                }
            ]
            
        }
    }
}
</script>

<style>

</style>