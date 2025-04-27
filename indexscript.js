// document.getElementById('searchButton').addEventListener('click', getLocation);
let lat = 56.194, lon = 44.0007, ttt1, setlocationText = "Nizhny Novgorod";

const getLocation = async () => {
    const inputValue = document.getElementById('cityInput').value.trim();
    console.log(inputValue);
    try {
        // if (inputValue.length == 0) {
        //     lat = 56.194;
        //     lon = 44.0007;
        //     ttt1; 
        //     setlocationText = "Nizhny Novgorod";
        //     return;
        // }
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
        ttt1 = JSON.stringify(json.features[0].properties.geocoding.name);
        setlocationText = ttt1 + ', ' + JSON.stringify(json.features[0].properties.geocoding.label);
        lat = JSON.stringify(json.features[0].geometry.coordinates[1]);//вызываем функцию и передаем разпаршенное значение фунуции
        lon = JSON.stringify(json.features[0].geometry.coordinates[0]);
        console.log(ttt1);
        console.log(setlocationText);
        console.log(lat);
        console.log(lon);
        document.getElementById('locationResult').textContent = setlocationText;

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

const getForecast = async () => {
    try {
        if (lat == undefined && lat == undefined){
            txt = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=56.194&lon=44.0007";
            // document.getElementById('locationResult').textContent = setlocationText;
        }
        else{
            txt = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + lat + "&lon=" + lon;
        }

        // txt = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + lat + "&lon=" + lon;
        // txt = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=56.194&lon=44.0007";

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
            let num = 0;
            ttt = JSON.stringify(json.properties.timeseries[num].data.instant.details.air_temperature);
            cloud_area_fraction = JSON.stringify(json.properties.timeseries[num].data.instant.details.cloud_area_fraction);
            wind_speed = JSON.stringify(json.properties.timeseries[num].data.instant.details.wind_speed);
            relative_humidity = JSON.stringify(json.properties.timeseries[num].data.instant.details.relative_humidity);

            let temperatureElement = document.getElementById('temperature');
            let cloud_area_fractionElement = document.getElementById('cloud_area_fraction');
            let wind_speedElement = document.getElementById('wind_speed');
            let relative_humidityElement = document.getElementById('relative_humidity');

            temperatureElement.innerHTML = ttt;
            cloud_area_fractionElement.innerHTML = cloud_area_fraction;
            wind_speedElement.innerHTML = wind_speed;
            relative_humidityElement.innerHTML = relative_humidity;

            // cloud_area_fraction = 22;
            // ttt = -1;

            var weatherIcon = document.getElementById("WeatherIcon");

            if (cloud_area_fraction < 20) {
                document.body.style.background = "url('img1/backgr20.jpg')";
                document.body.style.backgroundSize = "auto 160%";
                // var SunImg = document.getElementById("SunImg");
                // SunImg.src = "img1/climacons-master/SVG/Sun.svg";
                // SunImg.style.width = "100px";
                // SunImg.style.height = "100px";
                weatherIcon.src = "img1/climacons-master/SVG/Sun.svg";
            }
            if (cloud_area_fraction > 20 && cloud_area_fraction < 50) {
                document.body.style.background = "url('img1/backgr20_50.jpg')";
                document.body.style.backgroundSize = "auto 120%";
                // var CloudSunImg = document.getElementById("CloudSunImg");
                // CloudSunImg.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
                // CloudSunImg.style.width = "100px";
                // CloudSunImg.style.height = "100px";
                weatherIcon.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            if (cloud_area_fraction > 50 && cloud_area_fraction < 80) {
                document.body.style.background = "url('img1/backgr50_80.jpg')";
                document.body.style.backgroundSize = "auto 120%";
                // var CloudImg = document.getElementById("CloudImg");
                // CloudImg.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
                // CloudImg.style.width = "100px";
                // CloudImg.style.height = "100px";
                weatherIcon.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            if (cloud_area_fraction > 80 ) {
                document.body.style.background = "url('img1/backgr801.jpg')";
                document.body.style.backgroundSize = "auto 160%";
                // var CloudSunImg = document.getElementById("CloudSunImg");
                // CloudSunImg.src = "img1/climacons-master/SVG/Cloud.svg";
                // CloudSunImg.style.width = "100px";
                // CloudSunImg.style.height = "100px";
                weatherIcon.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
            }
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundAttachment = "fixed";

            // document.body.style.backgroundSize = "contain";
        } 
        else {
            console.log("some err"); //TODO сделать адекватное сообщение об ошибке
        }
    } 
    catch (error) {
        console.error(error);
    } 
}

getForecast();

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('searchButton');
    if (button) {
        // button.addEventListener('click', getLocation);
        button.addEventListener('click', async () => {
            await getLocation();
            await getForecast();
        });
    } else {
        console.error('not yet');
    }
});