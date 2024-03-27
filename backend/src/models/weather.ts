import mongoose, { InferSchemaType, model, Schema} from 'mongoose';

export const weatherSchema: Schema = new Schema({
  dateutc: {type: Date, reqquired: true, index: true},
  tempinf:{type: Number, required: true},
  humidityin:{type: Number, required: true},
  baromrelin:{type: Number, required: true},
  baromabsin:{type: Number, required: true},
  tempf: {type: Number, required: true},
  humidity:{type: Number, required: true},
  winddir: {type: Number, required: true},
  windspeedmph: {type: Number, required: true},
  windgustmph:{type: Number, required: true},
  maxdailygust: {type: Number, required: true},
  hourlyrainin:{type: Number, required: true},
  eventrainin:{type: Number, required: true},
  dailyrainin:{type: Number, required: true},
  weeklyrainin:{type: Number, required: true},
  monthlyrainin:{type: Number, required: true},
  totalrainin:{type: Number, required: true},
  solarradiation:{type: Number, required: true},
  uv:{type: Number, required: true},
  batt_co2: {type: Number, required: true},
  feelslike:{type: Number, required: true},
  dewPoint:{type: Number, required: true},
  feelslinein: {type: Number, required: true},
  dewpointin: {type: Number, required: true},
  lastRain:{type: Date, required: true},
}, { 
  collection: 'weather',
  timestamps: true,
})

type Weather = InferSchemaType<typeof weatherSchema>;

export default model<Weather>("Weather", weatherSchema);

const apiKey = process.env.API_KEY as string;
// const appKey = process.env.APP_KEY as string;



// const api = new AmbientWeatherAPI({
//   apiKey,
//   applicationKey: process.env.API_KEY as string,
// })

// export const startSubscription = () => {
//   api.connect()
//   api.on('connect', () => {
//     console.log('Connected to ambient weather realtime API...')
//   })
//   api.on('subscribed', data => {
//     console.log(`Connect to ${data.devices[0]}...`)
//   })
// }

// api.on('data', data => {
//   console.log(`our data since last data: ${data}`)
// })
// api.subscribe(apiKey)
// export const stopSubscription = () => {
//   api.unsubscribe(apiKey)
// }