let data = [20 , 50 , 70]
let total = 0
data.forEach(function(item,index){
    total+=item
})
console.log(total)


let data1 = [ 1,7,12,16,24,27,31,42]
let evenNum = 0
let evenNumTotal = 0
let newData1 =[]
data1.forEach(function(item,index){
    if(item%2==0){
        evenNum+=1
        evenNumTotal+=item
        newData1.push(item)
    }
})
console.log(evenNum,evenNumTotal)
console.log(newData1)

let homeData = [
    {
        name:"Tom",
        sex:"male",
        year:36
    }
    ,
    {
        name:"Mary",
        sex:"woman",
        year:28
    }
    ,
    {
        name:"Peter",
        sex:"male",
        year:26
    }
    ,
    {
        name:"Cindy",
        sex:"woman",
        year:22
    }
    ,
    {
        name:"Alex",
        sex:"male",
        year:42
    }
    ,
]
// let maleNum =0
// let womanNum =0

let newPeopleNum ={
    maleNum :0,
    womanNum :0
}
// let newMale =[]
// let newWoman =[]
let newPeople ={
    male :[],
    woman :[]
}
homeData.forEach(function(item,index){
    if(item.sex == "male"){
        newPeopleNum.maleNum+=1
        newPeople.male.push(item.name)
    }
    else{
        newPeopleNum.womanNum+=1
        newPeople.woman.push(item.name)
    }
})
console.log(`男生${newPeopleNum.maleNum}個,女生${newPeopleNum.womanNum}個`)
console.log(`男生組${newPeople.male}`)
console.log(`女生組${newPeople.woman}`)