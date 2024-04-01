import express, {Router} from 'express';
import {
  getWeather, 
  getWeatherItem, 
  setWeather
}  from '../controllers/weather'

const router = Router();

router.get('/', getWeather)
router.get('/:weatherId', getWeatherItem);

router.post('/', setWeather);

export default router;