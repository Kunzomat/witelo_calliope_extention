witelo.init()
OLED.clear()
basic.forever(function () {
    for (let Index = 0; Index <= 128; Index++) {
        OLED.drawPixel(Index, 10)
    }
    OLED.update()
})
