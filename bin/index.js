#!/usr/bin/env node
import http from 'http';
import 'dotenv/config';
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import 'colors';

/* To start the program, type in "weather" in the terminal*/

const accesKey = process.env.ACCESS_KEY;
const cmd = readline.createInterface({ input, output });

cmd.question(
  'Would you like to check the weather in Moscow? y/n :'.yellow,
  (input) => {
    if (input === 'y' || input === 'yes') {
      getWether('Moscow');
      cmd.close();
    } else {
      console.log(
        'Okay,maybe in another city? Please, type in the city name '.green
      );
      cmd.on('line', (city) => {
        getWether(city);
        cmd.close();
      });
    }
  }
);

const getWether = (city) => {
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
        console.log(
          `Current temperature in ${city}:` +
            `\n${parsedData.current.temperature} degrees Celsius`.magenta +
            `\nmostly ${parsedData.current.weather_descriptions[0]}`.cyan +
            `\nhumidity level of ${parsedData.current.humidity}%`.gray
        );
      });
    })
    .on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });
};
