let lat = 56.194, lon = 44.0007, town, setlocationText = "Nizhny Novgorod";

const getLocation = async () => {
    const inputValue = document.getElementById('cityInput').value.trim();
    console.log(inputValue);
    try {
        txt = "https://nominatim.openstreetmap.org/search?q=";
        txt = txt + encodeURIComponent(inputValue) + "&format=geocodejson";
        response = await fetch(txt,
        //await говорит о том что данная функция будет выполнятся асинхронно и не будет блокировать выполнение другого кода приложения
        //fetch функция получения данных по api
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'MyTestApp/0.2'
          }
        }
        );
      if (response.ok) { // если HTTP-статус в диапазоне 200-299
        json = await response.json();//представляем ответ в виде json
        console.log("lat lon here");
        town = JSON.stringify(json.features[0].properties.geocoding.name);
        setlocationText = town + ', ' + JSON.stringify(json.features[0].properties.geocoding.label);
        lat = JSON.stringify(json.features[0].geometry.coordinates[1]);//вызываем функцию и передаем разпаршенное значение фунуции
        lon = JSON.stringify(json.features[0].geometry.coordinates[0]);
        console.log(town);
        console.log(setlocationText);
        console.log(lat);
        console.log(lon);
        document.getElementById('locationResultYRNO').textContent = setlocationText;
        document.getElementById('locationResultYRNO2').textContent = setlocationText;
        document.getElementById('locationResultOpenWeather').textContent = setlocationText;
        document.getElementById('locationResultOpenWeather2').textContent = setlocationText;
        document.getElementById('locationResultNinjas').textContent = setlocationText;

      } else {
        console.log("some err in city"); //todo сообщить об ошибке
        flag = true;
      }
    }
    catch (error) {
            console.error(error);
    }
    document.getElementById('cityInput').value = '';
}



function createHourBlock(hour, cloudFraction) {
    const hourBlock = document.createElement('div');
    hourBlock.className = 'hour-block';
    
    const hourLabel = document.createElement('div');
    hourLabel.className = 'hour-label';
    hourLabel.textContent = `+${hour} hour`;
    hourBlock.appendChild(hourLabel);

    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    weatherInfo.innerHTML = `
        <div class="weather-group">
            <div id="temperature_${hour}"></div>
            <span class="unit">°C</span>
        </div>
        
        <div class="weather-group">
            <span class="weather-label">Cloudiness</span>
            <div id="cloud_area_fraction_${hour}">${cloudFraction}</div>
            <span class="unit">%</span>
        </div>
        
        <div class="weather-group">
            <span class="weather-label">Wind speed</span>
            <div id="wind_speed_${hour}"></div>
            <span class="unit">m/s</span>
        </div>
        
        <div class="weather-group">
            <span class="weather-label">Humidity</span>
            <div id="relative_humidity_${hour}"></div>
            <span class="unit">%</span>
        </div>
    `;
    
    hourBlock.appendChild(weatherInfo);
    return hourBlock;
}

let isInitializedYRNO = false;
let isInitializedOW = false;
function initHourBlocks(container, str) {
    if (!isInitializedYRNO && str === 'YRNO') {
        for (let hour = 0; hour <= 12; hour++) {
            const hourBlock = createHourBlock(hour);
            container.appendChild(hourBlock);
        }
        isInitializedYRNO = true; // устанавливаем флажок что блоки уже созданы
    }
    if (!isInitializedOW && str === 'OW') {
        for (let hour = 0; hour <= 12; hour++) {
            const hourBlock = createHourBlock(hour);
            container.appendChild(hourBlock);
        }
        isInitializedOW = true; // устанавливаем флажок что блоки уже созданы
    }
}


const getForecast = async () => {
    try {
        const today = new Date(); // Текущая дата
        const formattedDate = today.toISOString().split('T')[0]; // Берем только дату без времени
        if (lat === 56.194 && lon === 44.0007) {
            txtYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=56.194&lon=44.0007";
            txtOpenWeather = "https://open-weather13.p.rapidapi.com/fivedaysforcast?latitude=56.194&longitude=44.0007&lang=EN";
            txtNinjas = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=56.194&lon=44.0007";
            txtSunYRNO = "https://api.met.no/weatherapi/sunrise/3.0/sun?lat=56.194&lon=44.0007&date=" + formattedDate;

        }
        else { 
            txtYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + lat + "&lon=" + lon;
            // town1 = encodeURIComponent(town.trim());
            txtOpenWeather = "https://open-weather13.p.rapidapi.com/fivedaysforcast?latitude=" + lat + "&longitude=" + lon + '&lang=EN';
            txtNinjas = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=" + lat + "&lon=" + lon;
            txtSunYRNO = "https://api.met.no/weatherapi/sunrise/3.0/sun?lat=" + lat + "&lon=" + lon + "&date=" + formattedDate;
        }

        // responseNinjas = await fetch(txtNinjas,
        //         {
        //             method: 'GET',
        //             headers: {
        //                 'Accept': '*/*',
        //                 'User-Agent': 'MyTestApp/0.2',
        //                 'x-rapidapi-key': 'a40bab086cmsh9796a33d6dcbf58p100155jsn3a9797b5b0e1',
        //                 'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
        //             }
        //         }
        //     );

            responseYRNO = await fetch(txtYRNO,
                {
                    method: 'GET', // получаем данные 
                    headers: {
                        'Accept': '*/*', // указываем что принимаем все типы 
                        'User-Agent': 'MyTestApp/0.2' // кто запрашивает
                    }
                }
            );

            responseSun = await fetch(txtSunYRNO,
            {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'User-Agent': 'MyTestApp/0.2'
                }
            }
        );

        // responseOpenWeather = await fetch(txtOpenWeather,
        //         {
        //         method: 'GET',
        //         headers: {
        //             'x-rapidapi-key': 'a40bab086cmsh9796a33d6dcbf58p100155jsn3a9797b5b0e1',
		//             'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        //             }
        //         }
        //     );


        if (responseYRNO.ok) { // если HTTP-статус в диапазоне 200-299
            json = await responseYRNO.json();//представляем ответ в виде json
            console.log("json here YRNO");
            let num = 0;
            tttYRNO = JSON.stringify(json.properties.timeseries[num].data.instant.details.air_temperature);
            cloud_area_fractionYRNO = JSON.stringify(json.properties.timeseries[num].data.instant.details.cloud_area_fraction);
            wind_speedYRNO = JSON.stringify(json.properties.timeseries[num].data.instant.details.wind_speed);
            relative_humidityYRNO = JSON.stringify(json.properties.timeseries[num].data.instant.details.relative_humidity);

            let temperatureElementYRNO = document.getElementById('temperatureYRNO');
            let cloud_area_fractionElementYRNO = document.getElementById('cloud_area_fractionYRNO');
            let wind_speedElementYRNO = document.getElementById('wind_speedYRNO');
            let relative_humidityElementYRNO = document.getElementById('relative_humidityYRNO');

            temperatureElementYRNO.innerHTML = tttYRNO;
            cloud_area_fractionElementYRNO.innerHTML = cloud_area_fractionYRNO;
            wind_speedElementYRNO.innerHTML = wind_speedYRNO;
            relative_humidityElementYRNO.innerHTML = relative_humidityYRNO;

            // cloud_area_fraction = 22;
            // ttt = -1;

            var weatherIconYRNO = document.getElementById("WeatherIconYRNO");

            if (cloud_area_fractionYRNO < 20) {
                document.body.style.background = "url('img1/backgr20.jpg')";
                document.body.style.backgroundSize = "auto 160%";
                weatherIconYRNO.src = "img1/climacons-master/SVG/Sun.svg";
            }
            if (cloud_area_fractionYRNO > 20 && cloud_area_fractionYRNO < 50) {
                document.body.style.background = "url('img1/backgr20_50.jpg')";
                document.body.style.backgroundSize = "auto 120%";
                weatherIconYRNO.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            if (cloud_area_fractionYRNO > 50 && cloud_area_fractionYRNO < 80) {
                document.body.style.background = "url('img1/backgr50_80.jpg')";
                document.body.style.backgroundSize = "auto 120%";
                weatherIconYRNO.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            if (cloud_area_fractionYRNO > 80 ) {
                document.body.style.background = "url('img1/backgr801.jpg')";
                document.body.style.backgroundSize = "auto 160%";
                weatherIconYRNO.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";

            const container = document.querySelector('.hourly-container');
            let str = 'YRNO';
            initHourBlocks(container, str);

            for (let hour = 0; hour <= 12; hour++) {// создаем блоки для 12 часов
                // const hourBlock = createHourBlock(hour);
                // container.appendChild(hourBlock);

                const data = json.properties.timeseries[hour].data.instant.details;
                document.getElementById(`temperature_${hour}`).innerHTML = JSON.stringify(json.properties.timeseries[hour].data.instant.details.air_temperature);
                document.getElementById(`cloud_area_fraction_${hour}`).innerHTML = JSON.stringify(data.cloud_area_fraction);
                // ttt = JSON.stringify(json.properties.timeseries[hour].data.instant.details.cloud_area_fraction);
                // console.log(ttt);
                document.getElementById(`wind_speed_${hour}`).innerHTML = JSON.stringify(data.wind_speed);
                document.getElementById(`relative_humidity_${hour}`).innerHTML = JSON.stringify(data.relative_humidity);

            }


        } 
        else {
            console.log("some err YRNO"); //TODO сделать адекватное сообщение об ошибке
        }


        if (responseSun.ok) {
            json = await responseSun.json();
            sunriseTime = JSON.stringify(json.properties.sunrise.time);
            sunsetTime = JSON.stringify(json.properties.sunset.time);

            let sunriseTimeElement = document.getElementById('sunrisetimeYRNO');
            let sunsetTimeElement = document.getElementById('sunsettimeYRNO');

            sunriseDate = new Date(JSON.parse(sunriseTime));
            sunsetDate = new Date(JSON.parse(sunsetTime));
            sunriseDate.setUTCHours(sunriseDate.getUTCHours() + 3);
            sunsetDate.setUTCHours(sunsetDate.getUTCHours());
            const options = { hour: 'numeric', minute: 'numeric' };
            const sunriseTimeMoscow = sunriseDate.toLocaleTimeString('ru-RU', options);
            const sunsetTimeMoscow = sunsetDate.toLocaleTimeString('ru-RU', options);
            console.log("json sun here");

            sunriseTimeElement.innerHTML = sunriseTimeMoscow;
            sunsetTimeElement.innerHTML = sunsetTimeMoscow;

        } 
        else {
            console.log("some err YRNO"); //TODO сделать адекватное сообщение об ошибке
        }


        if (responseNinjas.ok) { // если HTTP-статус в диапазоне 200-299
            json = await responseNinjas.json();//представляем ответ в виде json
            console.log("json here Ninjas");
            tttNinjas = JSON.stringify(json.temp);
            cloud_area_fractionNinjas = JSON.stringify(json.cloud_pct);
            wind_speedNinjas = JSON.stringify(json.wind_speed);
            relative_humidityNinjas = JSON.stringify(json.humidity);
            sunriseNinjas = JSON.stringify(json.sunrise);
            sunsetNinjas = JSON.stringify(json.sunset);
            console.log(sunsetNinjas);

            let temperatureElementNinjas = document.getElementById('temperatureNinjas');
            let cloud_area_fractionElementNinjas = document.getElementById('cloud_area_fractionNinjas');
            let wind_speedElementNinjas = document.getElementById('wind_speedNinjas');
            let relative_humidityElementNinjas = document.getElementById('relative_humidityNinjas');
            let sunriseElementNinjas = document.getElementById('sunrisetimeNinjas');
            let sunsetElementNinjas = document.getElementById('sunsettimeNinjas');

            temperatureElementNinjas.innerHTML = tttNinjas;
            cloud_area_fractionElementNinjas.innerHTML = cloud_area_fractionNinjas;
            wind_speedElementNinjas.innerHTML = wind_speedNinjas;
            relative_humidityElementNinjas.innerHTML = relative_humidityNinjas;

            sunriseNinjas = new Date(sunriseNinjas * 1000);
            sunsetNinjas = new Date(sunsetNinjas * 1000);
            const moscowOffset = 3 * 60 * 60 * 1000;
            const sunriseMoscow = new Date(sunriseNinjas.getTime() + moscowOffset);
            const sunsetMoscow = new Date(sunsetNinjas.getTime());
            const sunriseFormatted = sunriseMoscow.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });
            const sunsetFormatted = sunsetMoscow.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });

            sunriseElementNinjas.innerHTML = sunriseFormatted;
            sunsetElementNinjas.innerHTML = sunsetFormatted;

            var weatherIconNinjas = document.getElementById("WeatherIconNinjas");

            if (cloud_area_fractionNinjas < 20) {
                weatherIconNinjas.src = "img1/climacons-master/SVG/Sun.svg";
            }
            if (cloud_area_fractionNinjas > 20 && cloud_area_fractionNinjas < 50) {
                weatherIconNinjas.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            if (cloud_area_fractionNinjas > 50 && cloud_area_fractionNinjas < 80) {
                weatherIconNinjas.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            if (cloud_area_fractionNinjas > 80 ) {
                weatherIconNinjas.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }

        } 
        else {
            throw new Error(`HTTP error Ninjas! Status: ${responseNinjas.status}`);
        }


        if (responseOpenWeather.ok) {
            json = await responseOpenWeather.json();
            console.log("json here OpenWeather");
            tttOpenWeather = JSON.stringify(json.list[0].main.temp);
            cloud_area_fractionOpenWeather = JSON.stringify(json.list[0].clouds.all);
            wind_speedOpenWeather = JSON.stringify(json.list[0].wind.speed);
            relative_humidityOpenWeather = JSON.stringify(json.list[0].main.humidity);
            sunriseOpenWeather = JSON.stringify(json.city.sunrise);
            sunsetOpenWeather = JSON.stringify(json.city.sunset);
            
            let temperatureElementOpenWeather = document.getElementById('temperatureOpenWeather');
            let cloud_area_fractionElementOpenWeather = document.getElementById('cloud_area_fractionOpenWeather');
            let wind_speedElementOpenWeather = document.getElementById('wind_speedOpenWeather');
            let relative_humidityElementOpenWeather = document.getElementById('relative_humidityOpenWeather');
            let sunriseElementOpenWeather = document.getElementById('sunrisetimeOpenWeather');
            let sunsetElementOpenWeather = document.getElementById('sunsettimeOpenWeather');

            sunriseOpenWeather = new Date(sunriseOpenWeather * 1000);
            sunsetOpenWeather = new Date(sunsetOpenWeather * 1000);
            const moscowOffset = 3 * 60 * 60 * 1000;
            const sunriseMoscow = new Date(sunriseOpenWeather.getTime() + moscowOffset);
            const sunsetMoscow = new Date(sunsetOpenWeather.getTime());
            const sunriseFormatted = sunriseMoscow.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });
            const sunsetFormatted = sunsetMoscow.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });

            tttOpenWeather = tttOpenWeather - 273;
            tttOpenWeather = tttOpenWeather.toFixed(2);
            temperatureElementOpenWeather.innerHTML = tttOpenWeather;
            cloud_area_fractionElementOpenWeather.innerHTML = cloud_area_fractionOpenWeather;
            wind_speedElementOpenWeather.innerHTML = wind_speedOpenWeather;
            relative_humidityElementOpenWeather.innerHTML = relative_humidityOpenWeather;
            sunriseElementOpenWeather.innerHTML = sunriseFormatted;
            sunsetElementOpenWeather.innerHTML = sunsetFormatted;

            var weatherIconOpenWeather = document.getElementById("WeatherIconOpenWeather");

            if (cloud_area_fractionOpenWeather < 20) {
                weatherIconOpenWeather.src = "img1/climacons-master/SVG/Sun.svg";
            }
            if (cloud_area_fractionOpenWeather > 20 && cloud_area_fractionOpenWeather < 50) {
                weatherIconOpenWeather.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            if (cloud_area_fractionOpenWeather > 50 && cloud_area_fractionOpenWeather < 80) {
                weatherIconOpenWeather.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            if (cloud_area_fractionOpenWeather > 80 ) {
                weatherIconOpenWeather.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }


            const container = document.querySelector('.hourly-containerOW');
            let str1 = 'OW';
            initHourBlocks(container, str1);

            for (let hour = 0; hour <= 12; hour++) {// создаем блоки для 12 часов

                const data = json.list[hour];
                document.getElementById(`temperature_${hour}`).innerHTML = (JSON.stringify(data.main.temp) - 273).toFixed(2);
                document.getElementById(`cloud_area_fraction_${hour}`).innerHTML = JSON.stringify(data.clouds.all);
                document.getElementById(`wind_speed_${hour}`).innerHTML = JSON.stringify(data.wind.speed);
                document.getElementById(`relative_humidity_${hour}`).innerHTML = JSON.stringify(data.main.humidity);

            }
        } 
        else {
            throw new Error(`HTTP error OpenWeather! Status: ${responseOpenWeather.status}`);
            // document.getElementById('locationResultOpenWeather').textContent = "Sorry, the forecast is currently unavailable, the number of requests in the free version has been exceeded";
        }

    } 
    catch (error) {
        console.error(error);
    } 
}

getForecast();

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('searchButton');
    const inputField = document.getElementById('cityInput');

    if (button && inputField) {
        // button.addEventListener('click', getLocation);
        button.addEventListener('click', async () => {
            await getLocation();
            await getForecast();
        });

        inputField.addEventListener('keydown', async event => {
            if (event.key === 'Enter') {
                await getLocation();
                await getForecast();
            }
        });
    } else {
        console.error('not yet');
    }
});
