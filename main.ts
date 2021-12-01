function snakeGame () {
    if (!(gameOver)) {
        if (right) {
            if (xy[0][0] < 4) {
                b1 = xy[0][0]
                b2 = xy[0][1]
                xy[0][0] = xy[0][0] + 1
            } else {
                gameOver = true
            }
        } else if (left) {
            if (xy[0][0] > 0) {
                b1 = xy[0][0]
                b2 = xy[0][1]
                xy[0][0] = xy[0][0] - 1
            } else {
                gameOver = true
            }
        } else if (up) {
            if (xy[0][1] < 4) {
                b1 = xy[0][0]
                b2 = xy[0][1]
                xy[0][1] = xy[0][1] + 1
            } else {
                gameOver = true
            }
        } else if (down) {
            if (xy[0][1] > 0) {
                b1 = xy[0][0]
                b2 = xy[0][1]
                xy[0][1] = xy[0][1] - 1
            } else {
                gameOver = true
            }
        }
        if (!(gameOver)) {
            led.plot(xy[0][0], xy[0][1])
            led.unplot(b1, b2)
            for (let index = 0; index <= len - 2; index++) {
                if (index % 2 == 0) {
                    a1 = xy[index + 1][0]
                    a2 = xy[index + 1][1]
                    xy[index + 1][0] = b1
                    xy[index + 1][1] = b2
                    led.unplot(a1, a2)
                } else {
                    b1 = xy[index + 1][0]
                    b2 = xy[index + 1][1]
                    xy[index + 1][0] = a1
                    xy[index + 1][1] = a2
                    led.unplot(b1, b2)
                }
                led.plot(xy[index + 1][0], xy[index + 1][1])
            }
            if (xy[0][0] == fx && xy[0][1] == fy) {
                while (led.point(fx, fy)) {
                    fx = randint(0, 4)
                    fy = randint(0, 4)
                }
                xy.push([b1, b2])
                len = xy.length
                led.plot(xy[len - 1][0], xy[len - 1][1])
            }
            for (let index = 0; index <= len - 2; index++) {
                if (xy[0][0] == xy[index + 1][0] && xy[0][1] == xy[index + 1][1]) {
                    gameOver = true
                }
            }
        }
        if (!(gameOver)) {
            basic.pause(900)
        }
    } else {
        basic.showIcon(IconNames.No)
        basic.showIcon(IconNames.Sad)
    }
}
function compassData () {
    if (input.compassHeading() == -1003 || Cali == true) {
        input.calibrateCompass()
        Cali = false
    } else {
        if (input.compassHeading() >= 337.5 && input.compassHeading() <= 359 || input.compassHeading() >= 0 && input.compassHeading() < 22.5) {
            basic.showArrow(ArrowNames.North)
        } else if (input.compassHeading() >= 22.5 && input.compassHeading() < 67.5) {
            basic.showArrow(ArrowNames.NorthEast)
        } else if (input.compassHeading() >= 67.5 && input.compassHeading() < 112.5) {
            basic.showArrow(ArrowNames.East)
        } else if (input.compassHeading() >= 112.5 && input.compassHeading() < 157.5) {
            basic.showArrow(ArrowNames.SouthEast)
        } else if (input.compassHeading() >= 157.5 && input.compassHeading() < 202.5) {
            basic.showArrow(ArrowNames.South)
        } else if (input.compassHeading() >= 202.5 && input.compassHeading() < 247.5) {
            basic.showArrow(ArrowNames.SouthWest)
        } else if (input.compassHeading() >= 247.5 && input.compassHeading() < 292.5) {
            basic.showArrow(ArrowNames.West)
        } else {
            basic.showArrow(ArrowNames.NorthWest)
        }
    }
    basic.pause(5)
}
function LightData () {
    getValue = [
    Math.map(input.lightLevel(), 0, 51, 0, 255),
    Math.map(input.lightLevel(), 51, 102, 0, 255),
    Math.map(input.lightLevel(), 102, 153, 0, 255),
    Math.map(input.lightLevel(), 153, 204, 0, 255),
    Math.map(input.lightLevel(), 204, 255, 0, 255)
    ]
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= i; j++) {
            led.plotBrightness(i, 4 - j, getValue[i])
        }
    }
    basic.pause(5)
}
input.onButtonPressed(Button.A, function () {
    if (!(switchLock)) {
        if (choice > 0) {
            choice += -1
        } else {
            choice = 4
        }
        if (choice == 0) {
            basic.showString("T")
        } else if (choice == 1) {
            basic.showString("S")
        } else if (choice == 2) {
            basic.showString("L")
        } else if (choice == 3) {
            basic.showString("C")
        } else {
            basic.showString("G")
        }
    }
})
input.onGesture(Gesture.LogoUp, function () {
    if (gameState == true && down == false) {
        left = false
        right = false
        up = true
        down = false
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    if (gameState == true && right == false) {
        left = true
        right = false
        up = false
        down = false
    }
})
function SoundData () {
    getValue = [
    Math.map(input.soundLevel(), 0, 51, 0, 255),
    Math.map(input.soundLevel(), 51, 102, 0, 255),
    Math.map(input.soundLevel(), 102, 153, 0, 255),
    Math.map(input.soundLevel(), 153, 204, 0, 255),
    Math.map(input.soundLevel(), 204, 255, 0, 255)
    ]
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= i; j++) {
            led.plotBrightness(i, 4 - j, getValue[i])
        }
    }
    basic.pause(5)
}
function TemperatureData () {
    getValue = [
    Math.map(input.temperature(), -5, 6, 0, 255),
    Math.map(input.temperature(), 6, 17, 0, 255),
    Math.map(input.temperature(), 17, 28, 0, 255),
    Math.map(input.temperature(), 28, 39, 0, 255),
    Math.map(input.temperature(), 39, 50, 0, 255)
    ]
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= i; j++) {
            led.plotBrightness(i, 4 - j, getValue[i])
        }
    }
    basic.pause(5)
}
input.onButtonPressed(Button.AB, function () {
    if (!(switchLock)) {
        if (choice == 0) {
            temperature = true
        } else if (choice == 1) {
            sound = true
        } else if (choice == 2) {
            light2 = true
        } else if (choice == 3) {
            compass = true
        } else {
            gameState = true
            gameOver = false
            fx = 0
            fy = 0
            xy = [[2, 2]]
        }
        switchLock = true
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(switchLock)) {
        if (choice < 4) {
            choice += 1
        } else {
            choice = 0
        }
        if (choice == 0) {
            basic.showString("T")
        } else if (choice == 1) {
            basic.showString("S")
        } else if (choice == 2) {
            basic.showString("L")
        } else if (choice == 3) {
            basic.showString("C")
        } else {
            basic.showString("G")
        }
    }
})
input.onGesture(Gesture.TiltRight, function () {
    if (gameState == true && left == false) {
        left = false
        right = true
        up = false
        down = false
    }
})
input.onGesture(Gesture.LogoDown, function () {
    if (gameState == true && up == false) {
        left = false
        right = false
        up = false
        down = true
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    control.reset()
})
let compass = false
let light2 = false
let sound = false
let temperature = false
let gameState = false
let fy = 0
let fx = 0
let a2 = 0
let a1 = 0
let len = 0
let b2 = 0
let b1 = 0
let down = false
let up = false
let left = false
let right = false
let gameOver = false
let xy: number[][] = []
let Cali = false
let getValue: number[] = []
let choice = 0
let switchLock = false
switchLock = false
choice = 0
getValue = []
Cali = true
xy = []
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    while (temperature == true) {
        TemperatureData()
    }
    while (sound == true) {
        SoundData()
    }
    while (light2 == true) {
        LightData()
    }
    while (compass == true) {
        compassData()
    }
    while (gameState == true) {
        snakeGame()
    }
})
loops.everyInterval(100, function () {
    if (gameState == true) {
        if (!(gameOver)) {
            led.toggle(fx, fy)
        }
    }
})
