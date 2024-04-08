require('dotenv').config()
import AmbientWeatherApi from 'ambient-weather-api'

// helper function
function getName (device: any) {
  return device.info.name
}

export const weather = () => {
  const apiKey = process.env.API_KEY || 'Put your AW apiKey here'
  const api = new AmbientWeatherApi({
    apiKey,
    applicationKey: process.env.APP_KEY || 'Put your AW applicationKey here'
  })

  api.connect()
  api.on('connect', () => console.log('Connected to Ambient Weather Realtime API!'))

  api.on('subscribed', data => {
    console.log('Subscribed to ' + data.devices.length + ' device(s): ')
    console.log(data.devices.map(getName).join(', '))
  })
  api.on('data', data => {
    console.log('==============================++++')
    console.log(new Date().toDateString())
    console.log(data.device)
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
      date,
    } = data.device.lastData

  
    fetch('mongodb://localhost:27017/api/weather/', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      feelsLike: feelsLike,
      dewPoint,
      feelsLikein: feelsLikein,
      dewPointin,
      lastRain,
      date,
    })
  })
    console.log('enddata....')
  })
  api.subscribe(apiKey)
}

export const weatherApi = async () => {
  console.log(process.env.NODE_ENV)
  console.log('weather api called...')
  return weather();
}