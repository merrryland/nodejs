import path from 'path';
import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import fse from 'fs-extra';
import util from 'util';

import { fileURLToPath } from 'url';
const log = console.log;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// log(__filename);
// log(__dirname);
// log(path.parse(__filename));
// log(path.join(__dirname, '//package.json'));

const readDirCB = () => {
  const dirContent = fs.readdir('.', (err, res) => log(res));
  log('finished');
};
// readDirCB();

const readDirPromise = async () => {
  const dirContent = await fsp.readdir('.');
  log(dirContent);
  log('finished');
};
// readDirPromise();

const readDirPromisify = async () => {
  const promisified = util.promisify(fs.readdir);
  const dirContent = await promisified('.');
  log(dirContent);
  log('finished');
};
// readDirPromisify();

// ------- stream readable --------
const filePath = path.join(__dirname, 'test.txt');
const readStream = fs.createReadStream(filePath, {
  encoding: 'utf-8',
  highWaterMark: 1,
});

fs.readFile(filePath, (err, res) => log(res));

readStream.on('data', (chunk) => {
  log(`chunk ${chunk.length}`, chunk);
});
readStream.on('end', () => {
  log('finished');
});

// ------- stream writable --------
const writeStream = fs.createWriteStream(filePath);
let data = 'test demo data';
writeStream.write(data, 'UTF8');
writeStream.end();

writeStream.on('finish', () => log('Запись завершена'));
writeStream.on('close', () => log('Поток closed'));
