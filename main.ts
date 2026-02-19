witelo.init()
witelo.clear()
witelo.drawText("hello worl", 10, 10)
witelo.update()
basic.forever(function () {
    for (let Index = 0; Index <= 120; Index++) {
        oled.drawPixel(Index, 10)
    }
    witelo.update()
})
