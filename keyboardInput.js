const { createReadStream } = require('fs');
const { promises: fs } = require('fs');
const stream = require('stream');
const EventEmitter = require('events');
const path = require('path');

const keyEvents = new EventEmitter();
module.exports.keyEvents = keyEvents;

const keyboardEvents = new stream.PassThrough();

keyboardEvents.on('data', data => {
    if (!Buffer.isBuffer(data)) return;

    const keyPressed = Number(data.toString('hex')[57]) === 1;
    if (!keyPressed) return;

    const keyCode = data.readUInt32LE(12);
    keyEvents.emit('key', keyCode);
});

const keyStreams = [];

const loadKeyboards = async () => {
    keyStreams.forEach(keyStream => keyStream.destroy());

    const inputDevices = await fs.readdir('/dev/input/by-id').catch(() => []);
    const keyboards = inputDevices.filter(id => id.endsWith('kbd'));

    if (!keyboards.length) console.warn('No keyboards loaded!');

    keyboards.forEach(async keyboard => {
        const keyStream = createReadStream(
            path.join('/dev/input/by-id', keyboard)
        );

        keyStreams.push(keyStream);

        keyStream.pipe(keyboardEvents);

        keyStream.on('error', () => setTimeout(loadKeyboards, 2000));

        console.log('Loaded keyboard ' + keyboard);
    });
};

loadKeyboards();

// Reload Signal
process.on('SIGUSR2', () => {
    console.log('Reloading keyboards...');
    loadKeyboards();
});

setInterval(() => {}, 2147483647)
