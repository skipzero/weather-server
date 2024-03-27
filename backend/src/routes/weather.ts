import express, {Router} from 'express';
import * as WeatherController from '../controllers/weather'
const router = Router();

router.get('/', WeatherController.getWeather)
router.get('/:weatherId', WeatherController.getWeatherItem);

router.post('/', WeatherController.setWeather);
router.get('/startWeather', WeatherController.startWeather)


export default router;