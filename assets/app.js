let cities = [];
let select = document.getElementById('citydropdown');
fetch('./assets/city.json')
    .then(res => { return res.json() })
    .then((data) => {
        cities = data;
        console.log(cities);
        cities.forEach((ct) => {
            select.innerHTML += `
            <option value="${ct.name}">${ct.name}</option>
        `;
        });
        select.addEventListener('change', (e) => {
            let { value } = e.target;
            console.log(value);
            cities.forEach((ct) => {
                if (ct.name == value) {
                    console.log(ct);
                    fetchWeatherForCity(ct);
                }
            });
        });
    })
    .catch((error) => {
        console.log(error);
    })
function fetchWeatherForCity(city) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`)
        .then(res => { return res.json() })
        .then((data) => {
            console.log(`Weather in ${city.name}:`);
            console.log(`Temperature: ${data.current_weather.temperature}°C`);
            console.log(`Windspeed: ${data.current_weather.windspeed} km/h`);
            console.log(`Weather code: ${data.current_weather.weathercode}`);
            console.log('---------------------');
            document.getElementById('cityname').innerText=`Whether in :  ${city.name}`;
            document.getElementById('tem').innerText=`Temperature :  ${data.current_weather.temperature}°C`;
            document.getElementById('wind').innerText=`Windspeed :  ${data.current_weather.windspeed} km/h`;
            document.getElementById('wc').innerText=`Weather code :  ${data.current_weather.weathercode}`;
        })
        .catch((error) => {
            console.log(error);
        })
}