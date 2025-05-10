
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
        document.getElementById('locationResultOpenWeather').textContent = setlocationText;
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

const getForecast = async () => {
    try {
        if (lat === 56.194 && lon === 44.0007) {
            txtYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=56.194&lon=44.0007";
            txtOpenWeather = "https://openweather43.p.rapidapi.com/weather?appid=da0f9c8d90bde7e619c3ec47766a42f4&q=Nizhny%20Novgorod&units=standard";
            txtNinjas = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=56.194&lon=44.0007";

        }
        else{ 
            txtYRNO = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + lat + "&lon=" + lon;
            town1 = encodeURIComponent(town.trim());
            txtOpenWeather = "https://openweather43.p.rapidapi.com/weather?appid=da0f9c8d90bde7e619c3ec47766a42f4&q=" + town1 + "&units=standard";
            txtNinjas = "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=" + lat + "&lon=" + lon;;
        }
    //-----------------------------------------пример для сайта
    //     try {
    //         txt = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=56.194&lon=44.0007";
    //         response = await fetch(txt,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': '*/*',
    //                 'User-Agent': 'your_project'
    //             }
    //         }
    //     );
    //     responseYRNO = await fetch(txtYRNO,
    //         {
    //             method: 'GET', // получаем данные 
    //             headers: {
    //                 'Accept': '*/*', // указываем что принимаем все типы 
    //                 'User-Agent': 'MyTestApp/0.2' // кто запрашивает
    //             }
    //         }
    //     );
    //     if (response.ok) {
    //         json = await response.json();

    //     }
    //     else {
    //         console.log("some err YRNO"); //TODO сделать адекватное сообщение об ошибке
    //     }
    // }
    //     catch (error) {
    //     console.error(error);
    // }
        //-------------------------------------------------конец примера

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

        // responseOpenWeather = await fetch(txtOpenWeather,
        //         {
        //         method: 'GET',
        //         headers: {
        //             'Accept': '*/*',
        //             'User-Agent': 'MyTestApp/0.2',
        //             'x-rapidapi-key': 'a40bab086cmsh9796a33d6dcbf58p100155jsn3a9797b5b0e1',
		//             'x-rapidapi-host': 'openweather43.p.rapidapi.com'
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

        } 
        else {
            console.log("some err YRNO"); //TODO сделать адекватное сообщение об ошибке
        }



        // if (responseNinjas.ok) { // если HTTP-статус в диапазоне 200-299
        //     json = await responseNinjas.json();//представляем ответ в виде json
        //     console.log("json here Ninjas");
        //     tttNinjas = JSON.stringify(json.temp);
        //     cloud_area_fractionNinjas = JSON.stringify(json.cloud_pct);
        //     wind_speedNinjas = JSON.stringify(json.wind_speed);
        //     relative_humidityNinjas = JSON.stringify(json.humidity);
        //     let temperatureElementNinjas = document.getElementById('temperatureNinjas');
        //     let cloud_area_fractionElementNinjas = document.getElementById('cloud_area_fractionNinjas');
        //     let wind_speedElementNinjas = document.getElementById('wind_speedNinjas');
        //     let relative_humidityElementNinjas = document.getElementById('relative_humidityNinjas');

        //     temperatureElementNinjas.innerHTML = tttNinjas;
        //     cloud_area_fractionElementNinjas.innerHTML = cloud_area_fractionNinjas;
        //     wind_speedElementNinjas.innerHTML = wind_speedNinjas;
        //     relative_humidityElementNinjas.innerHTML = relative_humidityNinjas;

        //     var weatherIconNinjas = document.getElementById("WeatherIconNinjas");

        //     if (cloud_area_fractionNinjas < 20) {
        //         weatherIconNinjas.src = "img1/climacons-master/SVG/Sun.svg";
        //     }
        //     if (cloud_area_fractionNinjas > 20 && cloud_area_fractionNinjas < 50) {
        //         weatherIconNinjas.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
        //     }
        //     if (cloud_area_fractionNinjas > 50 && cloud_area_fractionNinjas < 80) {
        //         weatherIconNinjas.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
        //     }
        //     if (cloud_area_fractionNinjas > 80 ) {
        //         weatherIconNinjas.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
        //     }

        // } 
        // else {
        //     throw new Error(`HTTP error Ninjas! Status: ${responseNinjas.status}`);
        // }


        // if (responseOpenWeather.ok) {
        //     json = await responseOpenWeather.json();
        //     console.log("json here OpenWeather");
        //     tttOpenWeather = JSON.stringify(json.main.temp);
        //     cloud_area_fractionOpenWeather = JSON.stringify(json.clouds.all);
        //     wind_speedOpenWeather = JSON.stringify(json.wind.speed);
        //     relative_humidityOpenWeather = JSON.stringify(json.main.humidity);
            
        //     let temperatureElementOpenWeather = document.getElementById('temperatureOpenWeather');
        //     let cloud_area_fractionElementOpenWeather = document.getElementById('cloud_area_fractionOpenWeather');
        //     let wind_speedElementOpenWeather = document.getElementById('wind_speedOpenWeather');
        //     let relative_humidityElementOpenWeather = document.getElementById('relative_humidityOpenWeather');

        //     tttOpenWeather = tttOpenWeather - 273;
        //     temperatureElementOpenWeather.innerHTML = tttOpenWeather.slice(0, 5);
        //     cloud_area_fractionElementOpenWeather.innerHTML = cloud_area_fractionOpenWeather;
        //     wind_speedElementOpenWeather.innerHTML = wind_speedOpenWeather;
        //     relative_humidityElementOpenWeather.innerHTML = relative_humidityOpenWeather;

        //     var weatherIconOpenWeather = document.getElementById("WeatherIconOpenWeather");

        //     if (cloud_area_fractionOpenWeather < 20) {
        //         weatherIconOpenWeather.src = "img1/climacons-master/SVG/Sun.svg";
        //     }
        //     if (cloud_area_fractionOpenWeather > 20 && cloud_area_fractionOpenWeather < 50) {
        //         weatherIconOpenWeather.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
        //     }
        //     if (cloud_area_fractionOpenWeather > 50 && cloud_area_fractionOpenWeather < 80) {
        //         weatherIconOpenWeather.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
        //     }
        //     if (cloud_area_fractionOpenWeather > 80 ) {
        //         weatherIconOpenWeather.src = "img1/climacons-master/SVG/Cloud-Sun.svg";
        //     }
        // } 
        // else {
        //     throw new Error(`HTTP error OpenWeather! Status: ${responseOpenWeather.status}`);
        //     // document.getElementById('locationResultOpenWeather').textContent = "Sorry, the forecast is currently unavailable, the number of requests in the free version has been exceeded";
        // }

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