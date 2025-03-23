function createHourBlock(hour) {
    const hourBlock = document.createElement('div');
    hourBlock.className = 'hour-block';// основной контейнер
    
    const hourLabel = document.createElement('div');
    hourLabel.className = 'hour-label';// метка часа
    hourLabel.textContent = `+${hour} hour`;
    hourBlock.appendChild(hourLabel);

    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';// контейнер с информацией о погоде
    weatherInfo.innerHTML = `
        <div class="weather-group">
            <div class="weather-icon">
                <img src="img1/climacons-master/SVG/Thermometer-Zero.svg" style="width: 100px; height: 100px;">
            </div>
            <div id="temperature_${hour}"></div>
            <span class="unit">°C</span>
        </div>
        
        <div class="weather-group">
            <div class="weather-icon">
                <img id="SunImg_${hour}">
                <img id="CloudSunImg_${hour}">
                <img id="CloudImg_${hour}">
            </div>
            <span class="weather-label">Cloudiness</span>
            <div id="cloud_area_fraction_${hour}"></div>
            <span class="unit">%</span>
        </div>
        
        <div class="weather-group">
            <div class="weather-icon">
                <img src="img1/climacons-master/SVG/Wind.svg" style="width: 100px; height: 100px;">
            </div>
            <span class="weather-label">Wind speed</span>
            <div id="wind_speed_${hour}"></div>
            <span class="unit">m/s</span>
        </div>
        
        <div class="weather-group">
            <div class="weather-icon">
                <img src="img1/climacons-master/SVG/Cloud-Rain.svg" style="width: 100px; height: 100px;">
            </div>
            <span class="weather-label">Humidity</span>
            <div id="relative_humidity_${hour}"></div>
            <span class="unit">%</span>
        </div>
    `;
    
    hourBlock.appendChild(weatherInfo);
    return hourBlock;
}

function updateWeatherIcon(cloudFraction, hour) {
    let bgImage, iconSrc;

    if (cloudFraction < 20) {
        bgImage = "url('img1/backgr20.jpg')";
        iconSrc = 'img1/climacons-master/SVG/Sun.svg';
        document.getElementById(`SunImg_${hour}`).src = iconSrc;

    } else if (cloudFraction < 50 ) {
        bgImage = "url('img1/backgr20_50.jpg')";
        // document.body.style.background = "url('img1/backgr20_50.jpg')";
        iconSrc = 'img1/climacons-master/SVG/Cloud-Sun.svg';
        document.getElementById(`CloudSunImg_${hour}`).src = iconSrc;

    } else if (cloudFraction < 80) {
        bgImage = "url('img1/backgr50_80.jpg')";
        iconSrc = 'img1/climacons-master/SVG/Cloud-Sun.svg';
        // document.body.style.background = "url('img1/backgr50_80.jpg')";
        document.getElementById(`CloudImg_${hour}`).src = iconSrc;
        
    } else {
        bgImage = "url('img1/backgr801.jpg')";
        iconSrc = 'img1/climacons-master/SVG/Cloud.svg';
        document.getElementById(`CloudSunImg_${hour}`).src = iconSrc;
    }

    if (hour === 0) {// устанавливаем фон только для первого часа
        document.body.style.background = bgImage;
        if (bgImage == "url('img1/backgr20_50.jpg')" || bgImage == "url('img1/backgr50_80.jpg')") {
            document.body.style.backgroundSize = 'auto 120%';
        }
        else {
            document.body.style.backgroundSize = 'auto 160%';
        }
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
    }
}

const getForecast = async () => {
    try {
        //txt = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + lat + "&lon=" + lon;
        txt = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=56.194&lon=44.0007";
        response = await fetch(txt,
        //await говорит о том что данная функция будет выполнятся асинхронно и не будет блокировать выполнение другого кода приложения
        //fetch функция получения данных по api
            {
                method: 'GET', // получаем данные 
                headers: {
                    'Accept': '*/*', // указываем что принимаем все типы 
                    'User-Agent': 'MyTestApp/0.2' // кто запрашивает
                }
            }
        );

        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            json = await response.json();//представляем ответ в виде json
            console.log("json here");
            const container = document.querySelector('.hourly-container');

            for (let hour = 0; hour <= 12; hour++) {// создаем блоки для 12 часов
                const hourBlock = createHourBlock(hour);
                container.appendChild(hourBlock);

                const data = json.properties.timeseries[hour].data.instant.details;
                document.getElementById(`temperature_${hour}`).innerHTML = JSON.stringify(json.properties.timeseries[hour].data.instant.details.air_temperature);
                document.getElementById(`cloud_area_fraction_${hour}`).innerHTML = JSON.stringify(data.cloud_area_fraction);
                document.getElementById(`wind_speed_${hour}`).innerHTML = JSON.stringify(data.wind_speed);
                document.getElementById(`relative_humidity_${hour}`).innerHTML = JSON.stringify(data.relative_humidity);

                updateWeatherIcon(data.cloud_area_fraction, hour);// обновляем иконку погоды
            }
        } else {
            console.log("some err"); //TODO сделать адекватное сообщение об ошибке
        }
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener('DOMContentLoaded', getForecast);