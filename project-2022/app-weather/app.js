const request = require('request')
// const url ='http://api.weatherstack.com/current?access_key=937d5ea9172c4a52f0179fb8afa7efe0&query=New York'
// request(url,(error,response) =>{
//     const data1 =JSON.parse(response.body)
//     console.log(data1.request.query)
// })

const getWeatherInfo = (address,callack) =>{
    const url =`http://api.weatherstack.com/current?access_key=937d5ea9172c4a52f0179fb8afa7efe0&query=${address}`

    request({url:url,json:true},(error,response) =>{
        if(error){
            callack(`無法連結天氣伺服器`,undefined)
        }
        else if(response.body.error){
            callack(`無法連結本地伺服器`,undefined)
        }
        else{
            const data = response.body
            callack(undefined,`${data.location.name} weather is ${data.current.weather_descriptions[0]}`)
        }
    })
}

getWeatherInfo('New York',(error,data)=>{
    console.log('Error',error)
    console.log('Data',data)
})