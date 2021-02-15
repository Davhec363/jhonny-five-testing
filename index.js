// Test file for using the Raspberry Pi and Johnny-Five
const five = require('johnny-five');
const { RaspiIO } = require('raspi-io');

const johnnyTelegram = require('./libs/telegram/johnny-telegram.js');
const TelegramBot = require('node-telegram-bot-api');

// Make a new `Board()` instance and use raspi-io
const board = new five.Board({
    io: new RaspiIO()
});

// Creates a new Telegram Bot
var bot = new TelegramBot('1668835870:AAHhckIWkGHeujLvyQrECRqoQgtHgHwgkw4', { polling: true });
johnnyTelegram.init(bot);

// Run Board
board.on('ready', function() {

    // LED Pin variable
    const led = new five.Led('P1-7');

    // Adds a peripheral called 'led' to Johnny Telegram
    johnnyTelegram.add('led', led);

    // This will set Johnny Telegram events like receiving a message from Telegram
    johnnyTelegram.bindEvents();

    led.on();

    this.repl.inject({
        on: () => {
            led.on();
        },

        off: () => {
            led.stop().off();
        },

        strobe: () => {
            led.stop().off();
            led.strobe();
        },

        blink: () => {
            led.stop().off();
            led.blink(500);
        },
        fade: () => {
            led.stop().off();
            led.fade({
                easing: "outSine",
                duration: 12000,
                cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
                keyFrames: [0, 250, 25, 150, 100, 125],
                onstop: function() {
                    console.log("Animation stopped");
                }
            });
        },
        fadeIn: () => {
            led.stop().off();
            led.fadeIn(5000);
        },
        fadeOut: () => {
            led.fadeOut(5000);
            led.stop().off();
        }
    });

    // When this script is stopped, turn the LED off
    // This is just for convenience
    this.on('exit', function() {
        led.stop().off();
    });

});