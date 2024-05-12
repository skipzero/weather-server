import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import Weather from '../models/weather'
import {assertIsDefined} from '../utils/assert';


export const getWeather: RequestHandler = async (req, res, next) => {

  try {
    const allWeather = await Weather.find({}).exec();
    res.status(200).json(allWeather);
  }
  catch(err) {
    next(err)
  }
}

export const getWeatherItem: RequestHandler = async (req, res, next) => {
  const wId = req.params.weatherId;  
  try {
    if (!mongoose.isValidObjectId(wId)) {
      throw createHttpError(400, 'Invalid weather ID')
    }
    const weatherItems = await Weather.findOne({wId}).exec();
    res.status(200).json(weatherItems)
  } catch (err) {
    next(err)
  }
}

interface IWeather {
  dateutc: number,
  tempinf: number,
  humidityin: number,
  baromrelin: number,
  baromabsin: number,
  tempf: number,
  humidity: number,
  winddir: number,
  windspeedmph: number,
  windgustmph: number,
  maxdailygust: number,
  hourlyrainin: number,
  eventrainin: number,
  dailyrainin: number,
  weeklyrainin: number,
  monthlyrainin: number,
  totalrainin: number,
  solarradiation: number,
  uv: number,
  batt_co2: number,
  feelsLike: number,
  dewPoint:  number,
  feelsLikein: number,
  dewPointin: number,
  lastRain: string,
  tz: string,
  date: string,
}


export const setWeather: RequestHandler<unknown, unknown, IWeather, unknown> = async (req, res, next) => {
  const {
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
    feelsLike,
    dewPoint,
    feelsLikein,
    dewPointin,
    lastRain,
    tz,
    date,
  } = req.body;

  try {
    console.log('WEATHER-CONTROLLER\n\n\n', req.body);
    const newWeather = await Weather.create({
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
      feelsLike,
      dewPoint,
      feelsLikein,
      dewPointin,
      lastRain,
      tz,
      date,
    })
    console.log('newWeather', newWeather)
    res.status(200).json(newWeather)

  } catch (err) {
    next(err)
  }
}

