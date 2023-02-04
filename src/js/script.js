const weatherKey = '4fe4e2d790478e28f3f46a557e23b3fb';
const currentWeatherEndpoint =  'https://api.openweathermap.org/data/2.5/weather?q='
// 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

const forecastWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

const cityInput = document.getElementById('userCity')
const newCityInput =  document.getElementById('previousCityInput')
previousCityInput.innerHTML = cityInput.value

let getCurrentWeather = `${currentWeatherEndpoint}${cityInput}'&appid='${weatherKey}`

let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', getUserCity)

var todayDate = moment().format('l');;
// $('#currentDay').html(todayDate);

function getUserCity (){
  // information from input field
  if (!cityInput.value) {
    return
  }
  // declare the input is valid
  let search = cityInput.value.trim()
  console.log(todayDate);
  // check for the response in the input field
  console.log(search);
  //pass the variable to the next function
  //the variable can be used in the next function if passed
  getCoordinates(search)
}

function getCoordinates (search){
  //add the variable in the parameters to pass it like a hand off
  let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherKey}`

  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //pass the information into the next function
    // take all the data with you and THEN pull out what you need
    getWeatherApi(data[0])
  });
}

//be specific to carry only certain parts of the JSON
async function getWeatherApi (location){
  //deconstruct to properties needed
  let {lat, lon} = location
  let city = location.name
  // console.log(getCurrentWeateather);
  let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`)
    let data = await response.json() 
    console.log(data);
    // need to solve for current and 5 day
    // carry data and split for each
    //carry the data and split to in a funciton
    splitData(city, data);
}

function splitData(city, data){
  //solve for the 2 functions
  //Current
  currentWeather(city,data.list[0],data.city.timezone,);
  //Forecast
  //forecastWeather(data.list);
  // need a for loop 
  // create one card that is then created 5 times
}

function currentWeather(city, list, timezone){
  console.log(city, list, timezone);
  let cityName = city;
  let timeZone = timezone;
  let temp = list.main.temp;
  let wind = list.wind.speed;
  let humidity = list.main.humidity;
  console.log(cityName, timeZone, temp, wind, humidity);

  //pass to html
}

//get the coordinates from the geo API - it puills the first 5 - concerned with the first one