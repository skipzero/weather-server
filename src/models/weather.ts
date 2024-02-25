import mongoose, { Schema, Document} from 'mongoose';
import AmbientWeatherAPI from 'ambient-weather-api';
// import { Weather } from ./interfaces

export interface Weather extends Document {
  id: string;
  date: Date;
  winddir: number;
  windspeedmph: number;
  windgustmph: number;
  maxdailygust: number;
  tempf: number;
  hourlyrainin: number;
  eventrainin: number;
  dailyrainin: number;
  weeklyrainin: number;
  monthlyrainin: number;
  totalrainin: number;
  humidity: number;
  baromabsin: number;
  tempinf: number;
  humidityin: number;
  uv: number;
  solarradiation: number;
  feelslike: number;
  dewPoint: number;
  baromrelin: number;
  windspdmph_avg10m: number;
  lastRain: Date,
  macAddress: string
}

const WeatherSchema: Schema = new mongoose.Schema({
  date: {type: Date, reqquired: true, index: true},
  winddir: {type: Number, required: true},
  windspeedmph: {type: Number, required: true},
  windgustmph:{type: Number, required: true},
  maxdailygust: {type: Number, required: true},
  tempf: {type: Number, required: true},
  hourlyrainin:{type: Number, required: true},
  eventrainin:{type: Number, required: true},
  dailyrainin:{type: Number, required: true},
  weeklyrainin:{type: Number, required: true},
  monthlyrainin:{type: Number, required: true},
  totalrainin:{type: Number, required: true},
  humidity:{type: Number, required: true},
  baromabsin:{type: Number, required: true},
  tempinf:{type: Number, required: true},
  humidityin:{type: Number, required: true},
  uv:{type: Number, required: true},
  solarradiation:{type: Number, required: true},
  feelslike:{type: Number, required: true},
  dewPoint:{type: Number, required: true},
  baromrelin:{type: Number, required: true},
  windspdmph_avg10m:{type: Number, required: true},
  lastRain:{type: Date, required: true},
  macAddress:{type: String},
  authentication: {
    password: {type: String, required: true, select: false},
    salt: {type: String, select: false},
    token: {type: String, select: false}

  }
})

const apiKey = process.env.API_KEY as string;
// const appKey = process.env.APP_KEY as string;

export const WeatherModel =  mongoose.model<Weather>('Weather', WeatherSchema);

export const getAllWeather = () => WeatherModel.find();
export const getWeatherById = (id: string) => WeatherModel.findOne({ id });
export const createNewWeather = (values: Record<string, number>) => new WeatherModel(values).save().then(weather => weather.toObject())
export const deleteWeatherById = (id: string) => WeatherModel.findOneAndDelete({ _id: id});
export const updateWeather = (id: string, values: Record<string, number>) => WeatherModel.findOneAndUpdate({ id, values })

const api = new AmbientWeatherAPI({
  apiKey,
  applicationKey: process.env.API_KEY as string,
})

export const startSubscription = () => {
  api.connect()
  api.on('connect', () => {
    console.log('Connected to ambient weather realtime API...')
  })
  api.on('subscribed', data => {
    console.log(`Connect to ${data.devices[0]}...`)
  })
}

api.on('data', data => {
  console.log(`our data since last data: ${data}`)
})
api.subscribe(apiKey)
export const stopSubscription = () => {
  api.unsubscribe(apiKey)
}