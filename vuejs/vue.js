var app = new Vue({
    el:'#app',
    data:{
        message:'hello word',
        title:'<h2>It is my word</h2>',
        isShow:true,
        arr:["1:Annett萬歲爺- 蜜蜂","2:Control T - 默數三秒","3:Milie - 餘溫"],
        imgName:"./img/Image2.jpg",
        isActive:true,
        i:0

    },
    methods:{
        speak:function(){
            alert("hello word")
        },
        demo1:function(){
            alert("1.大樹公")
        },
        demo2:function(){
            alert("蚵仔麵線")
        },
        add:function(){
            this.i++;
            console.log(this.i)
        }
    },
    // 計算屬性
    computed:{
        strFun:function(){
            if(this.i<5){
                return "1.大樹公"
            }
            else if(this.i<10){
                return "蚵仔麵線"
            }
        }
    }
})