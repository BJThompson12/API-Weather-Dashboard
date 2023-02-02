const weatherKey = '4fe4e2d790478e28f3f46a557e23b3fb';
const currentWeatherEndpoint =  'https://api.openweathermap.org/data/2.5/weather?q='
// 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

const forecastWeatherEndpoint = 'api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}'

const cityInput = document.getElementById('userCity').value.trim()
const newCityInput =  document.getElementById('previousCityInput')
previousCityInput.innerHTML = cityInput.value

let getCurrentWeather = `${currentWeatherEndpoint}${cityInput}'&appid='${weatherKey}`
let lat = ''
let long = ''
// const app  = {
//   init: () => {
//     document.getElementById('searchBtn').addEventListener('click',getWeatherApi )
//   }
// }



function getUserCity (){
  // information from input field

}

async function getWeatherApi (){
  // console.log(getCurrentWeateather);
  let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=4fe4e2d790478e28f3f46a557e23b3fb')
    let data = await response.json() 
    console.log(data);
}

getWeatherApi()

// event listener that triggers a function that captures the inpformation in the input field 