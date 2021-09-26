const notificationElement= document.querySelector(".notification");
const iconElement= document.querySelector(".icon");
const tempElement= document.querySelector(".temperature p");
const descElement= document.querySelector(".temp-info p");
const locationElement= document.querySelector(".location");
const humidityElement= document.querySelector(".humidity p span");
const windElement= document.querySelector(".wind-speed p span");
const AQIElement= document.querySelector(".AQI p span");
const appElement = document.querySelector(".app");
const feelslike = document.querySelector(".feelslike p span");
const pressElemnet = document.querySelector(".pressure p span");
const imageElement = document.querySelector(".arrow img")


const KELVIN=273;
const key="40e7fa5a90f3ed3c6f5021c763322304";

const weather = {};

weather.temperature = {
    unit : "celsius"
}


//checks if geolocation works
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    let airapi = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(resp){
            let data = resp.json();
            return data;
        })
        .then(function(data){
            console.log(data);
            weather.iconId = data.weather[0].icon; 
            weather.temperature = Math.floor(data.main.temp - KELVIN);
            weather.desc = data.weather[0].description;
            weather.feelslike = Math.floor(data.main.feels_like - KELVIN);
            weather.city = data.name;
            weather.country = data.sys.country; 
            weather.humidity = data.main.humidity;
            weather.windspeed = Math.floor(data.wind.speed*3.6);
            weather.pressure = data.main.pressure;
            weather.deg = data.wind.deg;
        })
        .then(function(){
            displayweather();
        })
    
    fetch(airapi)
        .then(function(resp){
            let air = resp.json();
            return air;
        })
        .then(function(air){
            console.log(air);
            weather.aqi = air.list[0].main.aqi;
        })
        .then(function(){
            displayaqi();
        })
}

//function to display weather information
function displayweather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature}<span>° C</span>`;
    descElement.innerHTML = `${weather.desc}`;
    locationElement.innerHTML = `${weather.city}<span>, </span>${weather.country}`;
    humidityElement.innerHTML = `${weather.humidity}<span> %</span>`;
    feelslike.innerHTML = `${weather.feelslike}<span>° C</span>`;
   pressElemnet.innerHTML = `${weather.pressure}<span> mbar</span>`
   imageElement.style.transform = 'rotate(' + weather.deg + 'deg)'
   windElement.innerHTML = `${weather.windspeed} <span> km/h</span>`;
    
}

function displayaqi(){
    AQIElement.innerHTML =`${weather.AQIElement}`;
}


var d = new Date();
var currHour = d.getHours();
if (currHour >= 5 && currHour < 12) {
    appElement.style.background = "linear-gradient(180deg, #8BC9D8 0%, #B3D2DD 5.04%, #CDD6DF 13.03%, #E3D3D4 26.7%, #EDCAC6 30.49%, #EEB9AB 38.9%, #F4A387 46.25%, #F69978 54.45%, #E88D74 62.86%, #D77F70 66.86%, #C36D60 80.52%, #625C62 100%)";
}else if(currHour>=12 &&currHour<17){
    appElement.style.background = "linear-gradient(180deg, #A8E6FF 0%, #75CCF9 18.66%, #4AA8E5 57.06%, #2B86CF 74.72%, #1D69B7 84.37%, #155AA8 94.22%, #0D5197 100%)";
} else if(currHour>=17 && currHour<19){
    appElement.style.background = "linear-gradient(180deg, #B1B2A2 0.52%, #F5D09A 15.1%, #FFD398 18.75%, #FFD587 31.75%, #FD9E61 46.06%, #FC8156 54.32%, #F0644B 64.59%, #E2574B 69.73%, #CE4046 75.24%, #231F36 90.1%, #001121 100%)";
}else if ((currHour >= 19 && currHour < 24) || currHour<5) {
    appElement.style.background = "linear-gradient(0.47deg, #001741 0.21%, #012559 11.6%, #3670AA 27.84%, #3670AA 48.51%, #3670AC 63.41%, #235689 78.3%, #002B61 94.93%)";
}