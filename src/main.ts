const apiKey = "0d6a1b18fabeca40dbd4353a7034aaa7";

const $cityInput = $("#cityInput");
const $getWeatherBtn = $("#getWeatherBtn");

const $weatherScreen = $("#weather-screen");
const $backBtn = $("#backBtn");

const $weatherCity = $("#weather-city");
const $weatherTemp = $("#weather-temp");
const $weatherDesc = $("#weather-desc");

const $mainContainer = $(".main-container");

// API fetch function
async function fetchWeather(city:string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    return res.json();
}

$("#getWeatherBtn").on("click", async () => {
    const city = ($("#cityInput").val() as string).trim();

    if(city === ""){
        alert("Please Enter A City!");
        return;
    }
    try {
        const data = await fetchWeather(city);
        $weatherCity.text(data.name);
        $weatherTemp.text(`${data.main.temp}°C`);
        $weatherDesc.text(data.weather[0].description);

        // make certain classes remove or hidden
        $(".main-container").addClass("hidden");
        $("#weather-screen").removeClass("hidden");
    }catch (err) {
        alert("City not found!");
    }
});

$("#backBtn").on("click", () => {
    $("#weather-screen").addClass("hidden");
    $(".main-container").removeClass("hidden");
});