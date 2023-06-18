#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const flags = yargs(hideBin(process.argv)).argv;
const log = console.log;

const now = new Date();
const year = flags.year || flags.y;
const month = flags.month || flags.m;
const date = flags.date || flags.d;
const getYear = now.getFullYear();
const getMonth = +now.getMonth() + 1;
const getDate = now.getDate();

const checkAction = (flag) => {
  return flags._.includes(flag);
};

if (checkAction('add')) {
  year && now.setFullYear(getYear + year);
  month && now.setMonth(getMonth + month);
  date && now.setDate(getDate + date);
  log(now.toISOString().substring(0, 10));
} else if (checkAction('sub')) {
  year && now.setFullYear(getYear - year);
  month && now.setMonth(getMonth - month);
  date && now.setDate(getDate - date);
  log(now.toISOString().substring(0, 10));
} else if (year || month || date) {
  year && log('Текущий год', getYear);
  month && log('Текущий месяц', getMonth);
  date && log('Текущий день', getDate);
} else {
  log('Текущая дата', now.toISOString().substring(0, 10));
}
