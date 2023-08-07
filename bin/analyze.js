#!/usr/bin/env node
import * as fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

const log = console.log;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, 'log-data.txt');

const analyzeData = (path) => {
  if (!fs.existsSync(logFilePath)) {
    log('To analyze we need some data, first play the game');
    return;
  }
  log("Let's analyse your results...");
  const readStream = fs.createReadStream(path, {
    encoding: 'utf-8',
    highWaterMark: 1,
  });
  let results = '';

  readStream.on('data', (chunk) => {
    results += chunk;
  });

  readStream.on('end', () => {
    results = results.split('\n').slice(0, -1);
    log('results:', results);
    let totalRounds = results.length;
    let winRounds = results.filter((el) => el == 'true').length;
    let lostRounds = totalRounds - winRounds;
    let winPercentage = Math.round((winRounds / totalRounds) * 100, 2);

    log('total amount of rounds = ', totalRounds);
    log('win rounds = ', winRounds);
    log('lost rounds = ', lostRounds);
    log('win round percentage = ', winPercentage, '%');
  });
};

analyzeData(logFilePath);
