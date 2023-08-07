#!/usr/bin/env node
import * as fs from 'node:fs';
import readline from 'node:readline';
import path from 'path';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'url';
import 'colors';
import { askQuestion, randomIntFromInterval } from './utils.js';

/* Проанализировтаь данные игры можно вызвав в терминале команду analyze */

const log = console.log;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, 'log-data.txt');
const cmd = readline.createInterface({ input, output });
const questions = {
  1: 'Do you want to continiue playing? y/n:',
  2: 'Would you like to end the game and delete the log file? y/n:',
};
let attempts = 0;
let randomNumber;
let roundResults;

const playGame = () => {
  randomNumber = randomIntFromInterval(0, 1000);
  log(
    'I have made a number from 0 to 1000. Try to guess, type a number. You have 15 attempts.'
      .yellow
  );
};

playGame();

cmd.on('line', (attempt) => {
  attempts++;
  switch (true) {
    case Number.isNaN(attempt) || attempt == 0:
      log('Please, type in a number'.red);
      break;
    case attempt == randomNumber:
      log('Well done, you won this round!'.green);
      attempts = 0;
      roundResults = true;
      writeLogData(roundResults);
      askQuestion(questions[1], playGame, endGame, cmd);
      break;
    case attempts >= 15:
      log('Seems like you have lost this round..'.red);
      attempts = 0;
      roundResults = false;
      writeLogData(roundResults);
      askQuestion(questions[1], playGame, endGame, cmd);
      break;
    case attempt < randomNumber:
      log('Nope, my number is greater');
      giveHint(randomNumber);
      break;
    case attempt > randomNumber:
      log('Nope, my number is less');
      giveHint(randomNumber);
      break;
  }
});

const giveHint = (randomNumber) => {
  let hintNumbers = [
    randomNumber - randomIntFromInterval(0, 20),
    randomNumber + randomIntFromInterval(0, 20),
  ];
  if (attempts === 7) {
    cmd.question(
      "I think you might need a hint, don't you? y/n:".blue,
      (input) => {
        if (input === 'y' || input === 'yes') {
          log(
            'Okay, here is a hint fot you. My number is between' +
              ` ${hintNumbers[0]} and ${hintNumbers[1]}`.cyan
          );
        } else {
          return;
        }
      }
    );
  }
};

const writeLogData = (data) => {
  const writeStream = fs.createWriteStream(logFilePath, { flags: 'a' });
  data = JSON.stringify(data);
  writeStream.write(data + '\n', 'UTF8');
  writeStream.on('close', () => log('Round data has been saved'));
};

const endGame = async () => {
  askQuestion(questions[2], deleteLogs, keepLogs, cmd);
};

const deleteLogs = () => {
  log(
    'Okay, see ya! I have deleted the current log file. For the next game I will generate a new one.'
  );
  fs.unlinkSync(logFilePath);
  cmd.close();
};

const keepLogs = () => {
  log(
    'Okay, see ya! Do not forget to delete the log file before starting the next game.'
  );
  cmd.close();
};
