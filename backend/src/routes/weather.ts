import express, {Router} from 'express';
import {
  getWeather, 
  getWeatherItem, 
  startWeather, 
  setWeather
}  from '../controllers/weather'

const router = Router();

router.get('/', getWeather)
router.get('/:weatherId', getWeatherItem);

router.post('/', setWeather);
router.get('/startWeather', startWeather)


export default router;