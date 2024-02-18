import { Document } from "mongoose";

export interface Weather extends Document {
  "id": string;
  "date": Date;
  "winddir": number;
  "windspeedmph": number;
  "windgustmph": number;
  "maxdailygust": number;
  "tempf": number;
  "hourlyrainin": number;
  "eventrainin": number;
  "dailyrainin": number;
  "weeklyrainin": number;
  "monthlyrainin": number;
  "totalrainin": number;
  "humidity": number;
  "baromabsin": number;
  "tempinf": number;
  "humidityin": number;
  "uv": number;
  "solarradiation": number;
  "feelslike": number;
  "dewPoint": number;
  "baromrelin": number;
  "windspdmph_avg10m": number;
  "lastRain": Date,
  "macAddress": string
}