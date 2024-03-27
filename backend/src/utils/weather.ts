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
    const {
      windspeedmph,
      winddir,
      windgustmph,
      maxdailygust,
      date,
    } = data
    console.log(`date: ${date}\n Wind dir: ${winddir}\n Wind speed: ${windspeedmph}\n Wind gust: ${windgustmph}`)
  })
  api.subscribe(apiKey)
}

export const weatherApi = () => {
  return weather();
}