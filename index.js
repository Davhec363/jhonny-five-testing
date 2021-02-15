// Test file for using the Raspberry Pi and Johnny-Five
const five = require('johnny-five');
const { RaspiIO } = require('raspi-io');

// Make a new `Board()` instance and use raspi-io
const board = new five.Board({
    io: new RaspiIO()
});

// Run Board
board.on('ready', function() {

    // LED Pin variable
    const led = new five.Led('P1-7');

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
            led.fade({
                easing: "outSine",
                duration: 1000,
                cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
                keyFrames: [0, 250, 25, 150, 100, 125],
                onstop: function() {
                    console.log("Animation stopped");
                }
            });
        }
    });

    // When this script is stopped, turn the LED off
    // This is just for convenience
    this.on('exit', function() {
        led.stop().off();
    });

});