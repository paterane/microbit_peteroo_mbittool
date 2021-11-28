function LightData () {
    getValue = [
    Math.map(input.lightLevel(), 0, 51, 0, 255),
    Math.map(input.lightLevel(), 52, 102, 0, 255),
    Math.map(input.lightLevel(), 103, 153, 0, 255),
    Math.map(input.lightLevel(), 154, 204, 0, 255),
    Math.map(input.lightLevel(), 205, 255, 0, 255)
    ]
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= i; j++) {
            led.plotBrightness(i, 4 - j, getValue[i])
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (choice > 0) {
        choice += -1
    } else {
        choice = 2
    }
})
function SoundData () {
    getValue = [
    Math.map(input.soundLevel(), 0, 51, 0, 255),
    Math.map(input.soundLevel(), 52, 102, 0, 255),
    Math.map(input.soundLevel(), 103, 153, 0, 255),
    Math.map(input.soundLevel(), 154, 204, 0, 255),
    Math.map(input.soundLevel(), 205, 255, 0, 255)
    ]
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= i; j++) {
            led.plotBrightness(i, 4 - j, getValue[i])
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    if (choice == 0) {
        temperature = true
    } else if (choice == 1) {
        sound = true
    } else {
        light2 = true
    }
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    if (choice < 2) {
        choice += 1
    } else {
        choice = 0
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    temperature = false
    sound = false
    light2 = false
    choice = 0
})
let light2 = false
let sound = false
let temperature = false
let getValue: number[] = []
let choice = 0
choice = 0
getValue = []
basic.forever(function () {
    if (choice == 0) {
        basic.showString("T")
    } else if (choice == 1) {
        basic.showString("S")
    } else {
        basic.showString("L")
    }
    while (sound == true) {
        SoundData()
        basic.pause(5)
    }
    while (light2 == true) {
        LightData()
        basic.pause(5)
    }
})
