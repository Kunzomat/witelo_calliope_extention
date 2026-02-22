basic.forever(function () {
    let pressureRaw = 0
    let id = 0
    witelo.clear()
    witelo.drawText("Birgits witelo Projekt", 0, 0)
    witelo.drawText("Luftfeuchte", 0, 10)
    witelo.drawText(convertToText(aht2x.humidity()), 100, 10)
    witelo.drawText("Temperatur", 0, 20)
    witelo.drawText(convertToText(aht2x.temperature()), 100, 20)
    witelo.drawText("id", 0, 30)
    witelo.drawText(convertToText(id), 100, 30)
    witelo.drawText("raw", 0, 40)
    witelo.drawText(convertToText(pressureRaw), 80, 40)
    witelo.update()
})
