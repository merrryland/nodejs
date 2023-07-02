#!/usr/bin/env node

import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const log = console.log;
const cmd = readline.createInterface({ input, output });
let attempts = 0;
let hintNumber;

const askQuestion = () => {
  cmd.question('Do you wanna play a game with me? y/n: ', (input) => {
    if (input === 'y' || input === 'yes') {
      startGame();
    } else {
      log('Okay, maybe next time!');
      cmd.close();
    }
  });
};

const startGame = () => {
  let randomNumber = Math.floor(Math.random() * 1000);
  hintNumber = [randomNumber - 20, randomNumber + 20];
  log('I have made a number from 0 to 1000. Try to guess, type a number.');
  cmd.on('line', (attempt) => {
    attempt = Number(attempt);
    if (isNaN(attempt)) {
      log('Please, type in a number');
    } else if (attempt < randomNumber) {
      log('Nope, my number is greater');
      giveHint();
    } else if (attempt > randomNumber) {
      log('Nope, my number is less');
      giveHint();
    } else if (attempt === randomNumber) {
      log('Well done, you won!');
      askQuestion();
    }
  });
};

const giveHint = () => {
  attempts++;
  if (attempts > 5) {
    attempts = 0;
    cmd.question("I think you might need a hint, don't you? y/n:", (input) => {
      if (input === 'y' || input === 'yes') {
        log(
          `Okay, here is a hint fot you. My number is between ${hintNumber[0]} and ${hintNumber[1]}`
        );
      } else {
        return;
      }
    });
  }
};

askQuestion();

cmd.on('close', () => log('See ya!'));
