const weatherKey = '4fe4e2d790478e28f3f46a557e23b3fb';
const currentWeatherEndpoint =
  'https://api.openweathermap.org/data/2.5/weather?q=';

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
  // check for the response in the input field
  console.log(search);

  let cityChoiceArray =
    JSON.parse(window.localStorage.getItem('previousCities')) || [];

  let input = document.getElementById('userCity').value;
  //   //set to local storage
  //  localStorage.setItem('city', input);
  // add the score to the array
  cityChoiceArray.push(search);
  // when sending to local systme must stringify and then set it
  window.localStorage.setItem('previousCities', JSON.stringify(cityChoiceArray));

  //pass the variable to the next function
  //the variable can be used in the next function if passed
  getCoordinates(search);
}

var setSavedSearches = function (city, savedSearches) {
  var savedSearches = {
    city,
    displayIcon,
    currentTemp,
    currentWind,
    currentHumidity,
  };
  console.log(city);
  console.log(savedSearches);
  //stingify to convert forecast objects to string
  localStorage.setItem(city, JSON.stringify(savedSearches));
};
//  function storeInLocalStorage(savedSearches, search) {
//     var data = localStorage.getItem('savedSearches');

//     data = data ? JSON.parse(data) : [];

//     data.push(search);

//     localStorage.setItem(search, JSON.stringify(data));
//   }

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
  console.log(location);
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`
  );
  let data = await response.json();
  console.log(data);
  // need to solve for current and 5 day
  // carry data and split for each
  //carry the data and split to in a funciton
  forecastWeather(city, data.list);
}

// function splitData(city, data) {
//   //solve for the 2 functions
//   console.log(city, data);
//   //Current

//   // currentWeather(city, data.list[0], data.city.timezone);

//   // 5 day Forecast
//   forecastWeather(city, data.list);
// }

function forecastWeather(city, list) {
  console.log(city, list);
  // need a for loop
  // create one card that is then created 5 times
  const currentWeatherEL = document.getElementById('current-weather');
  const weatherForecastEl = document.getElementById('weather-forecast');

  //clear the html element to replace with new html
  weatherForecastEl.innerHTML = '';
  for (let index = 0; index <= 5; index++) {
    let temp = list[index].main.temp;
    let wind = list[index].wind.speed;
    let humidity = list[index].main.humidity;
    let weatherIcon = list[index].weather[0].icon;
    // temp = Math.floor((temp - 273) * 9) / 5 + 32;
    let displayIcon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    if (index === 0) {
      currentWeatherEL.innerHTML = `<div class="flex flex-1 items-center">
     <div id="selected-city" class="text-2xl font-bold  mr-2">${city}</div>
       <div id="city-date" class="text-2xl font-bold mr-2">${todayDate}</div>
       <div class="h-8 w-8">
         <img id="weather-icon" class="" src="${displayIcon}" alt="">
       </div>
     </div>
   <div id="current-temp" class="">Temp: ${temp}&degF</div>
   <div id="current-wind" class="">Wind: ${wind} MPH</div>
   <div id="current-humidity" class="">Humidity: ${humidity} %</div>`;
    }

    if (index > 0) {
      weatherForecastEl.innerHTML += `<div id="" class="weather-forecast-item bg-slate-800 text-white text-sm min-w-28 w-36 py-1 pl-1 pr-3 pb-4">
      <div class="font-bold my-2">${moment()
        .add(index, 'days')
        .format('l')}</div>
      <div class="my-3">
        <img class="h-9 w-8" src="${displayIcon}" alt="">
      </div>
      <div class="my-3" id="current-temp">Temp: ${temp} &degF</div>
      <div class="my-3" id="current-wind">Wind: ${wind} MPH</div>
      <div class="my-3" id="current-humidity">Humidity: ${humidity}%</div>
    </div>`;
    }
  }
}

function clearStorage() {
  localStorage.clear();
  reload();
}
