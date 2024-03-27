import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import Weather from '../models/weather'
import AmbientWeatherAPI from 'ambient-weather-api';
import {assertIsDefined} from '../utils/assert';
import {weatherApi} from '../utils/weather';


export const getWeather: RequestHandler = async (req, res, next) => {

  try {
    console.log('Starting weather', req.params)
    return weatherApi()
  }
  catch(err) {
    next(err)
  }
}

export const getWeatherItems: RequestHandler = async (req, res, next) => {
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

export const startWeather: RequestHandler = async (req, _res, next) => {

  try {
    console.log('Starting weather', req.params)
    return weatherApi()
  }
  catch(err) {
    next(err)
  }
}

export const setWeather: RequestHandler = async (req, res, next) => {
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
    maxdailygustin,
    hourlyrainin,
    eventrainin,
    dailyrainin,
    weeklyrainin,
    monthlyrainin,
    totalrainin,
    solarradiation,
    uv,
    batt_co2,
    feelslike,
    dewpoint,
    feelslikein,
    dewpointin,
    lastrain,
    date,
  } = req.params;
}