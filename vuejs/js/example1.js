var app =new Vue({
    el:"#app",
    data:{
        message:"hello Vue",
        haha:"哈哈",
        hehe:"嘿嘿"

    }
});

var box1 = new Vue({
    el:".box1",
    data:{
        example1:"您好呀",
        example2:"<h1>您好呀<h1/>"
    }
})

var box2 = new Vue({
    el:".box2",
    data:{
        item1:"<h1>隱藏方式<h1/>",
        isShow:false,
    }
})

var box3 = new Vue({
    el:".box3",
    data:{
        text1:"第一次",
        arr:['1.html','2.css','3.javaScript']
    }
})

var box4 = new Vue({
    el:".box4",
    data:{
            name1:"點一下",
            name2:"看一下",
    },
    methods:{
        speak:function(){
            alert("HELLO");
        },
        speak2:function(){
            alert("WORLD");
        }
    }
})

var box5 = new Vue({
    el:".box5",
    data:{
        img1:"圖片1",
        imgLink1:"Image1.jpg"
    }
})

var box6 = new Vue({
    el:".box6",
    data:{
        isActive:false
    }
})

var box7 = new Vue({
    el:".box7",
    data:{
        titleName:"LKB"
    }
})

var box8 = new Vue({
    el:".box8",
    data:{
        i:0
    },
    methods:{
        add:function(){
            this.i++;
            console.log(this.i++)
        }
    },
    computed:{
        clickTime:function(){
            if(this.i<5){
                return "加油你做了下了";
            }
            else if(this.i<15){
                return "15下了不遠了";
            }
            else{
                return "恭喜完成目標";
            }
        }
    }
})