const apiKey = '1482a9aa7c7ed2ca41b9609c0021df47';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const mapApi = 'http://maps.googleapis.com/maps/api/js?sensor=false';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const container = document.querySelector('.weatherContainer');
const minMax = document.querySelector('#minMax');
const feelsLike = document.querySelector('#feelsLike');
const humidityValue = document.querySelector('#humidity');
const wind = document.querySelector('#wind');


const date = new Date();
const hour = date.getHours();


changeBackground();


function onLoadLocation(position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then(response => response.json())
                .then(data => {
                        var city = data.address.city;

                        const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

                        fetch(url)
                                .then(response => {
                                        if (!response.ok) {
                                                throw new Error('Network response was not ok');
                                        }
                                        return response.json();
                                })
                                .then(data => {
                                        locationElement.textContent = data.name;

                                        temperatureElement.textContent = `${Math.round(data.main.temp)}°`;

                                        descriptionElement.textContent = data.weather[0].description;

                                        minMax.textContent = `H: ${Math.round(data.main.temp_min)}°    
                        L: ${Math.round(data.main.temp_max)}° `;

                                        feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;

                                        humidityValue.textContent = data.main.humidity;

                                        wind.textContent = data.wind.speed;
                                })
                                .catch(error => {
                                        console.error('Error fetching weather data:', error);
                                });
                })
                .catch(error => {
                        console.error('Error fetching location:', error);
                });
}

locationInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
                event.preventDefault();
                document.querySelector("#searchButton").click();
        }
});

searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
                fetchWeather(location);
        } else {
                alert('Please enter a location.');
        }
});

function fetchWeather(location) {
        const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url)
                .then(response => {
                        if (!response.ok) {
                                throw new Error('Network response was not ok');
                        }
                        return response.json();
                })
                .then(data => {
                        locationElement.textContent = data.name;

                        temperatureElement.textContent = `${Math.round(data.main.temp)}°`;

                        descriptionElement.textContent = data.weather[0].description;

                        minMax.textContent = `H: ${Math.round(data.main.temp_min)}°    
                        L: ${Math.round(data.main.temp_max)}° `;

                        feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;

                        humidityValue.textContent = data.main.humidity;

                        wind.textContent = data.wind.speed;

                })
                .catch(error => {
                        console.error('Error fetching weather data:', error);
                        alert('Failed to fetch weather data. Please try again later.');
                });
}



//changing background due to the time
function changeBackground() {

        if (hour >= 18 || hour <= 6) {
                container.style.backgroundImage = "url('img/nightx700.jpg')";
        } else if (hour >= 11 && hour < 18) {
                container.style.backgroundImage = "url('img/afternoonx700.jpg')";
        } else if (hour >= 6 && hour < 11) {
                container.style.backgroundImage = "url('img/morningx700.jpg')";
        }


}


//checking geolocation supporting or not
function getLocation() {
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(onLoadLocation, showError);
        } else {
                alert("Geolocation is not supported by this browser.");
        }
}


//Error messages for geolocation
function showError(error) {
        switch (error.code) {
                case error.PERMISSION_DENIED:
                        alert("User denied the request for Geolocation.");
                        break;
                case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.");
                        break;
                case error.TIMEOUT:
                        alert("The request to get user location timed out.");
                        break;
                case error.UNKNOWN_ERROR:
                        alert("An unknown error occurred.");
                        break;
        }
}

getLocation();

