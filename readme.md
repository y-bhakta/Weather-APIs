# Weather App

This project is a simple weather application that allows users to select an Indian city from a dropdown and view its current weather information, including temperature, windspeed, and weather code. The app uses the [Open-Meteo API](https://open-meteo.com/) to fetch real-time weather data.

### File Explanations

#### [index.html](index.html)

- The main HTML file for the app.
- Uses Bootstrap for styling and layout.
- Contains a dropdown (`<select id="citydropdown">`) for city selection.
- Displays weather information in styled `<h4>` and `<h5>` elements.
- Loads CSS from `assets/style.css` and JavaScript from `assets/app.js`.

#### [assets/app.js](assets/app.js)

- Handles fetching city data and weather information.
- Populates the city dropdown from `assets/city.json`.
- Fetches weather data from Open-Meteo API when a city is selected.
- Updates the DOM with the fetched weather details.

**Functions Used:**

- **fetchWeatherForCity(city):**
  - Fetches weather data for the given city using its latitude and longitude.
  - Updates the DOM elements (`cityname`, `tem`, `wind`, `wc`) with the weather data.
  - Handles errors by logging them to the console.

- **Anonymous functions in `.then()` and event listeners:**
  - Used for handling asynchronous fetch responses and dropdown change events.
  - Populate the dropdown and trigger weather fetch on selection.

#### [assets/city.json](assets/city.json)

- Contains an array of major Indian cities with their names, latitude (`lat`), and longitude (`lon`).
- Used to populate the dropdown and provide coordinates for weather API requests.

#### [assets/style.css](assets/style.css)

- Provides custom styles for the app.
- Sets a background image (`img/nature.jpeg`).
- Styles the dropdown, content box, and overall layout for a modern look.

#### [assets/img/nature.jpeg](assets/img/nature.jpeg)

- Background image for the app.

## How It Works

1. **City Dropdown Population:**
   - On page load, `app.js` fetches the list of cities from `city.json`.
   - Each city is added as an option in the dropdown.

2. **Weather Fetching:**
   - When a user selects a city, the app fetches current weather data for that city using the Open-Meteo API.
   - The weather data includes temperature, windspeed, and weather code.

3. **Display:**
   - The fetched data is displayed in the right section of the app, updating the respective DOM elements.

## Function Details

### [`fetchWeatherForCity`](assets/app.js)

Fetches weather data for a selected city and updates the UI.

```js
function fetchWeatherForCity(city) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`)
        .then(res => res.json())
        .then((data) => {
            document.getElementById('cityname').innerText = `Whether in :  ${city.name}`;
            document.getElementById('tem').innerText = `Temperature :  ${data.current_weather.temperature}°C`;
            document.getElementById('wind').innerText = `Windspeed :  ${data.current_weather.windspeed} km/h`;
            document.getElementById('wc').innerText = `Weather code :  ${data.current_weather.weathercode}`;
        })
        .catch((error) => {
            console.log(error);
        });
}