import express, {Router} from 'express';
import {
  getWeather, 
  getWeatherItem, 
  setWeather,
  // start
}  from '../controllers/weather'

const router = Router();

router.get('/', getWeather)
router.get('/:id', getWeatherItem);

// router.get('/start', start);

router.post('/', setWeather);

export default router;