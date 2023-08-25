import http from 'http';
import 'dotenv/config';

// console.log(process.env.ACCESS_KEY);
const accesKey = process.env.ACCESS_KEY;
let city = 'Moscow';

const url = `http://api.weatherstack.com/current?access_key=${accesKey}&query=${city}`;

http
  .get(url, (res) => {
    const statusCode = res.statusCode;
    if (statusCode !== 200) {
      console.log('Status Code: ', statusCode);
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => (rawData += chunk));
    res.on('end', () => {
      let parsedData = JSON.parse(rawData);
      // console.log(parsedData);
      console.log(
        `Current temperature in ${city}:\n${parsedData.current.temperature} degrees Celsius\nmostly ${parsedData.current.weather_descriptions[0]}\nhumidity level of ${parsedData.current.humidity}%`
      );
    });
  })
  .on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
