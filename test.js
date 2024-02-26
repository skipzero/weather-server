import fs from 'fs';

const weather = fs.readFileSync('./weather.json', 'utf8');

console.log(weather, weather.length);