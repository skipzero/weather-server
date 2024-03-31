import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import Weather from '../models/weather'
import AmbientWeatherAPI from 'ambient-weather-api';
import {assertIsDefined} from '../utils/assert';
import {weatherApi} from '../utils/weather';


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

export const stopWeather: RequestHandler = async (req, res, next) => {

  try {

  }
  catch (err) {
    next(err)
  }
}

export const startWeather: RequestHandler = async (req, _res, next) => {

  try {
    console.log('Starting weather', req.params)
    return weatherApi()
  }
  catch(err) {
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

    const newWeather = await Weather.create({
      dateutc:dateutc,
      tempinf: tempinf,
      humidityin: humidityin,
      baromrelin: baromrelin,
      baromabsin: baromabsin,
      tempf: tempf,
      humidity: humidity,
      winddir: winddir,
      windspeedmph: windspeedmph,
      windgustmph: windgustmph,
      maxdailygust: maxdailygust,
      hourlyrainin: hourlyrainin,
      eventrainin: eventrainin,
      dailyrainin: dailyrainin,
      weeklyrainin: weeklyrainin,
      monthlyrainin: monthlyrainin,
      totalrainin: totalrainin,
      solarradiation: solarradiation,
      uv: uv,
      batt_co2: batt_co2,
      feelsLike: feelsLike,
      dewPoint: dewPoint,
      feelsLikein: feelsLikein,
      dewPointin: dewPointin,
      lastRain: lastRain,
      tz: tz,
      date: date,
    })
    console.log('===========',newWeather)
    res.status(200).json(newWeather)

  } catch (err) {
    next(err)
  }
}

