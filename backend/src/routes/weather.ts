import express, {Router} from 'express';
import * as WeatherController from '../controllers/weather'
const router = Router();

router.get('/', WeatherController.getWeatherItems)
router.get('/:weatherId', WeatherController.getWeather);

router.post('/', WeatherController.setWeather);
router.get('/startWeather', WeatherController.startWeather)


export default router;