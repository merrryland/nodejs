import EventEmitter from 'events';

const log = console.log;
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('message', () => log('on message'));
myEmitter.on('message', (message) => log(`Message: ${message}`));
myEmitter.on('hello', (message) => log(`Hello: ${message}`));

myEmitter.emit('message', 'my message');
myEmitter.emit('hello', 'Maria');

process.stdout.write('ok');
process.stderr.write('error');
