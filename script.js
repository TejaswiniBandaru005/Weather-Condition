const ApiKey = "38d69a80e3be8a7c015f79f085b4d119";
const url = `https://api.weatherstack.com/current?access_key=${ApiKey}&units=m&query=`;
let temp = document.querySelector("#temp");
let btn = document.querySelector(".searchbtn");
let wind_speed = document.querySelector('#windspeed');
let current_humidity = document.querySelector('#humidity');
let weather_description = document.querySelector('#weatherdescription');  // Corrected variable name
let image = document.querySelector('#img');

async function fetchApi(city) {
    try {
        let response = await fetch(`${url}${city}`);
        if (!response.ok) {
            throw new Error("Error: City Not Found");
        }
        let data = await response.json();

        if (data.error) {
            throw new Error(data.error.info);
        }

        const temperature = Math.round(data.current.temperature);
        const wind = data.current.wind_speed;
        const humidity = data.current.humidity;
        const condition = data.current.weather_description;

        wind_speed.innerText = `Wind Speed: ${wind} Km/Hr`;
        current_humidity.innerText = `Humidity: ${humidity} %`;
        temp.innerText = `Temperature: ${temperature} °C`;
        weather_description.innerText = `Weather: ${condition}`;

        if (temperature == 10) {
            image.src = "cloudy.png";
        } else if (temperature >= 10 && temperature <= 30) {
            image.src = "rainy.png"; 
        } else {
            image.src = "sunny.png";  // For hot weather (> 30°C)
        }

    } catch (error) {
        console.error(error);
        temp.innerText = "City Not Found ❌";
    }
}

function searchcall() {
    let city = document.querySelector("#cityinput").value.trim();
    if (city === "") {
        temp.innerText = "Please enter a city! ⚠️";
        return;
    }
    fetchApi(city);
}

btn.addEventListener("click", searchcall);
