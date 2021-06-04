function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-celcius");
  let cityElement = document.querySelector("#search-city");
  let descirptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  descirptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `icons/${response.data.weather[0].main}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function search(city) {
  let apiKey = "90cc04858e590b27514e091504dac169";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-result");
  search(cityInputElement.value);
}

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

function locationName(response) {
  let apiKey = "90cc04858e590b27514e091504dac169";
  let city = response.data.name;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchLocation(position) {
  let apiKey = "90cc04858e590b27514e091504dac169";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(locationName);
}

function locationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", locationWeather);

function changeDegree() {
  let imageCelcius = document.querySelector("#degree-celcius");
  let loveChange = document.querySelector("#love");
  if (loveChange.innerHTML.trim() === "Love Fahrenheit?") {
    imageCelcius.src = "images/degreef.png";
    let celcius = document.querySelector("#current-celcius");
    let fahrenheit = celcius.innerHTML;
    celcius.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
    loveChange.innerHTML = "Love Celcius?";
  } else {
    imageCelcius.src = "images/degreec.png";
    let fahrenheit = document.querySelector("#current-celcius");
    let celcius = fahrenheit.innerHTML;
    fahrenheit.innerHTML = Math.round(((celcius - 32) * 5) / 9);
    let loveChange = document.querySelector("#love");
    loveChange.innerHTML = "Love Fahrenheit?";
  }
}

let celciusTemperature = null;

let change = document.querySelector("#degree-change");
change.addEventListener("click", changeDegree);

search("London");
