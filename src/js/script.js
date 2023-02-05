const weatherKey = '4fe4e2d790478e28f3f46a557e23b3fb';
const currentWeatherEndpoint =
  'https://api.openweathermap.org/data/2.5/weather?q=';
// 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

const forecastWeatherEndpoint =
  'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

const cityInput = document.getElementById('userCity');
const newCityInput = document.getElementById('previousCityInput');
previousCityInput.innerHTML = cityInput.value;

let getCurrentWeather = `${currentWeatherEndpoint}${cityInput}'&appid='${weatherKey}`;

let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', getUserCity);

var todayDate = moment().format('l');

function getUserCity() {
  // information from input field
  if (!cityInput.value) {
    return;
  }
  // declare the input is valid
  let search = cityInput.value.trim();
  console.log(todayDate);
  // check for the response in the input field
  console.log(search);
  //pass the variable to the next function
  //the variable can be used in the next function if passed
  getCoordinates(search);
}

function getCoordinates(search) {
  //add the variable in the parameters to pass it like a hand off
  let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //pass the information into the next function
      // take all the data with you and THEN pull out what you need
      getWeatherApi(data[0]);
    });
}

//be specific to carry only certain parts of the JSON
async function getWeatherApi(location) {
  //deconstruct to properties needed
  let { lat, lon } = location;
  let city = location.name;
  // console.log(getCurrentWeateather);
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`
  );
  let data = await response.json();
  console.log(data);
  // need to solve for current and 5 day
  // carry data and split for each
  //carry the data and split to in a funciton
  splitData(city, data);
}

function splitData(city, data) {
  //solve for the 2 functions
  //Current

  currentWeather(city, data.list[0], data.city.timezone);

  // currentWeather(city, data.list[0], data.city.timezone,);
  //Forecast

  forecastWeather(city, data.list);
}

function forecastWeather(city, list) {
  console.log(city, list);
  // need a for loop
  // create one card that is then created 5 times

  for (let index = 1; index <= 5; index++) {
    let cityName = city;
    // let timeZone = timezone;
    let temp = list[index].main.temp;
    let wind = list[index].wind.speed;
    let humidity = list[index].main.humidity;
    let weatherIcon = list[index].weather[0].icon;
    // temp = Math.floor((temp - 273) * 9) / 5 + 32;
    let displayIcon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    const weatherForecastEl = document.getElementById('weather-forecast');
    console.log(cityName, temp, wind, humidity, weatherIcon);

    weatherForecastEl.innerHTML += `<div class="weather-forecast-item w-28">
      <p>${moment().add(1, 'days').format('l')}</p>
      <img src="${displayIcon}" alt="">
      <p id="current-temp">Temp: ${temp}&degF</p>
      <p id="current-wind">Wind: ${wind} MPH</p>
       <p id="current-humidity">Humidity: ${humidity}%</p>
     </div>`;
  }
}

function currentWeather(city, list) {
  console.log(city, list);
  let cityName = city;
  // let timeZone = timezone;
  let temp = list.main.temp;
  let wind = list.wind.speed;
  let humidity = list.main.humidity;
  let weatherIcon = list.weather[0].icon;
  temp = Math.floor((temp - 273) * 9) / 5 + 32;

  console.log(cityName, temp, wind, humidity, weatherIcon);

  //get icon from weather api
  let displayIcon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  //pass to html
  document.getElementById('selected-city').innerHTML = cityName;
  document.getElementById('city-date').innerHTML = `(${todayDate})`;
  document.getElementById('weather-icon').src = displayIcon;
  document.getElementById('current-temp').innerHTML = `Temp: ${temp}&degF`;
  document.getElementById('current-wind').innerHTML = `Wind ${wind} MPH`;
  document.getElementById(
    'current-humidity'
  ).innerHTML = `Humidity ${humidity} %`;
}
function build() {}
//get the coordinates from the geo API - it puills the first 5 - concerned with the first one
