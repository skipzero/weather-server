import mongoose, { InferSchemaType, model, Schema} from 'mongoose';

export const weatherSchema: Schema = new Schema({
  dateutc: {type: Date, index: true},
  tempinf:{type: Number},
  humidityin:{type: Number},
  baromrelin:{type: Number},
  baromabsin:{type: Number},
  tempf: {type: Number},
  humidity:{type: Number},
  winddir: {type: Number},
  windspeedmph: {type: Number},
  windgustmph:{type: Number},
  maxdailygust: {type: Number},
  hourlyrainin:{type: Number},
  eventrainin:{type: Number},
  dailyrainin:{type: Number},
  weeklyrainin:{type: Number},
  monthlyrainin:{type: Number},
  totalrainin:{type: Number},
  solarradiation:{type: Number},
  uv:{type: Number},
  batt_co2: {type: Number},
  feelslike:{type: Number},
  dewPoint:{type: Number},
  feelslikein: {type: Number},
  dewpointin: {type: Number},
  lastRain:{type: Date},
  date:{type: Date},
}, { 
  collection: 'weather',
  timestamps: true,
})

type Weather = InferSchemaType<typeof weatherSchema>;

export default model<Weather>("Weather", weatherSchema);

