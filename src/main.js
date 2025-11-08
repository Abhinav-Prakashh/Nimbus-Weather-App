"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var $cityInput = $("#cityInput");
var $getWeatherBtn = $("#getWeatherBtn");
var $weatherScreen = $("#weather-screen");
var $backBtn = $("#backBtn");
var $weatherCity = $("#weather-city");
var $weatherTemp = $("#weather-temp");
var $weatherDesc = $("#weather-desc");
var $mainContainer = $(".main-container");
// API fetch function
function fetchWeather(city) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/getWeather?city=".concat(city))];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        throw new Error("City not found");
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
$("#getWeatherBtn").on("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    function getWeatherImage(description) {
        var desc = description.toLowerCase();
        if (desc.includes("cloud"))
            return "assets/PartlyCloudy.png";
        if (desc.includes("rain"))
            return "assets/rainy.png";
        if (desc.includes("thunder"))
            return "assets/ThunderStorm.png";
        if (desc.includes("clear") || desc.includes("sunny"))
            return "assets/Sunny.png";
        if (desc.includes("snow"))
            return "assets/snow.png";
        if (desc.includes("haze"))
            return "assets/haze.png";
        return "assets/default.png";
    }
    var city, $weatherImg, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                city = $cityInput.val().trim();
                if (city === "") {
                    alert("Please Enter A City!");
                    return [2 /*return*/];
                }
                $weatherImg = $("#weather-img");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetchWeather(city)];
            case 2:
                data = _a.sent();
                $weatherCity.text(data.name);
                $weatherTemp.text("".concat(data.main.temp, "\u00B0C"));
                $weatherDesc.text(data.weather[0].description);
                $weatherImg.attr("src", getWeatherImage(data.weather[0].description));
                // Show weather screen
                $mainContainer.addClass("hidden");
                $weatherScreen.removeClass("hidden");
                //add sakura petals
                createSakuraPetals();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                alert("City not found!");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
$backBtn.on("click", function () {
    $weatherScreen.addClass("hidden");
    $mainContainer.removeClass("hidden");
    $(".sakura-container").empty();
});
function createSakuraPetals() {
    var $container = $(".sakura-container");
    var numPetals = 20;
    $container.empty();
    for (var i = 0; i < numPetals; i++) {
        var $petal = $("<div></div>").addClass("sakura");
        $petal.css({
            left: "".concat(Math.random() * 100, "vw"),
            animationDelay: "".concat(Math.random() * 10, "s"),
            animationDuration: "".concat(8 + Math.random() * 5, "s"),
            width: "".concat(10 + Math.random() * 10, "px"),
            height: "".concat(10 + Math.random() * 10, "px")
        });
        $container.append($petal);
    }
}
