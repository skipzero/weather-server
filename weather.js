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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherApi = exports.weather = void 0;
require('dotenv').config();
const ambient_weather_api_1 = __importDefault(require("ambient-weather-api"));
// helper function
function getName(device) {
    return device.info.name;
}
const weather = () => {
    const apiKey = process.env.API_KEY || 'Put your AW apiKey here';
    const api = new ambient_weather_api_1.default({
        apiKey,
        applicationKey: process.env.APP_KEY || 'Put your AW applicationKey here'
    });
    api.connect();
    api.on('connect', () => console.log('Connected to Ambient Weather Realtime API!'));
    api.on('subscribed', data => {
        console.log('Subscribed to ' + data.devices.length + ' device(s): ');
        console.log(data.devices.map(getName).join(', '));
    });
    api.on('data', data => {
        console.log('==============================++++');
        console.log(new Date().toDateString());
        console.log(data.device);
        const { dateutc, tempinf, humidityin, baromrelin, baromabsin, tempf, humidity, winddir, windspeedmph, windgustmph, maxdailygust, hourlyrainin, eventrainin, dailyrainin, weeklyrainin, monthlyrainin, totalrainin, solarradiation, uv, batt_co2, feelsLike, dewPoint, feelsLikein, dewPointin, lastRain, date, } = data.device.lastData;
        fetch('mongodb+srv://bfalcon510:GKkGLR2buBlT94vBfsclusterzed.uh8mopv.mongodb.net/?retryWrites=true&w=majority&appName=FSClusterZed', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateutc,
                tempinf,
                humidityin,
                baromrelin,
                baromabsin,
                tempf,
                humidity,
                winddir,
                windspeedmph,
                windgustmph,
                maxdailygust,
                hourlyrainin,
                eventrainin,
                dailyrainin,
                weeklyrainin,
                monthlyrainin,
                totalrainin,
                solarradiation,
                uv,
                batt_co2,
                feelsLike: feelsLike,
                dewPoint,
                feelsLikein: feelsLikein,
                dewPointin,
                lastRain,
                date,
            })
        });
        console.log('enddata....');
    });
    api.subscribe(apiKey);
};
exports.weather = weather;
const weatherApi = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.NODE_ENV);
    console.log('weather api called...');
    return (0, exports.weather)();
});
exports.weatherApi = weatherApi;
