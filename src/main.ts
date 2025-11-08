import { apiKey } from "./apiKey.js";

const $cityInput = $("#cityInput");
const $getWeatherBtn = $("#getWeatherBtn");

const $weatherScreen = $("#weather-screen");
const $backBtn = $("#backBtn");

const $weatherCity = $("#weather-city");
const $weatherTemp = $("#weather-temp");
const $weatherDesc = $("#weather-desc");

const $mainContainer = $(".main-container");

// API fetch function
async function fetchWeather(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    return res.json();
}

$("#getWeatherBtn").on("click", async () => {
    const city = ($cityInput.val() as string).trim();

    if (city === "") {
        alert("Please Enter A City!");
        return;
    }

    const $weatherImg = $("#weather-img");
        function getWeatherImage(description: string): string {
            const desc = description.toLowerCase();

            if (desc.includes("cloud")) return "assets/PartlyCloudy.png";
            if (desc.includes("rain")) return "assets/rainy.png";
            if (desc.includes("thunder")) return "assets/ThunderStorm.png";
            if(desc.includes("clear") || desc.includes("sunny")) return "assets/Sunny.png";
            if(desc.includes("snow")) return "assets/snow.png";
            if(desc.includes("haze")) return "assets/haze.png";
            return "assets/default.png";
        }

    try {
        const data = await fetchWeather(city);

        $weatherCity.text(data.name);
        $weatherTemp.text(`${data.main.temp}°C`);
        $weatherDesc.text(data.weather[0].description);
        $weatherImg.attr("src", getWeatherImage(data.weather[0].description));

        // Show weather screen
        $mainContainer.addClass("hidden");
        $weatherScreen.removeClass("hidden");
        //add sakura petals
        createSakuraPetals();

    } catch (err) {
        alert("City not found!");
    }
});

$backBtn.on("click", () => {
    $weatherScreen.addClass("hidden");
    $mainContainer.removeClass("hidden");
    $(".sakura-container").empty();
});

function createSakuraPetals() {
    const $container = $(".sakura-container");
    const numPetals = 20;

    $container.empty();
    for(let i = 0; i < numPetals; i++) {
        const $petal = $("<div></div>").addClass("sakura");
        $petal.css({
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${8 + Math.random() * 5}s`,
        width: `${10 + Math.random() * 10}px`,
        height: `${10 + Math.random() * 10}px`
        });
        $container.append($petal);
    }
}
