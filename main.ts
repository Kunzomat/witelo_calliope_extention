function startpage () {
    witelo.drawText("- Witelo Sensor Test", 0, 0)
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    page += 1
    if (page > 3) {
        page = 0
    }
})
function ENS160_PAGE () {
    witelo.SetHumidity(witelo.humidity_aht20())
    witelo.SetTemp(witelo.temperature_aht20())
    witelo.drawText("ENS160 & AHT20", 0, 0)
    witelo.drawText("Temperatur", 0, 15)
    witelo.drawText(convertToText(witelo.temperature_aht20()), 95, 15)
    witelo.drawText("Luftfeuchte", 0, 25)
    witelo.drawText(convertToText(witelo.humidity_aht20()), 95, 25)
    witelo.drawText("Luftqualität", 0, 35)
    witelo.drawText(convertToText(witelo.api_ens160()), 95, 35)
    witelo.drawText("CO2 Äquivalent", 0, 45)
    witelo.drawText(convertToText(witelo.eco2_ens160()), 95, 45)
    witelo.drawText("TVOCs", 0, 55)
    witelo.drawText(convertToText(witelo.tvoc_ens160()), 95, 55)
}
function ANT20_BPM280_PAGE () {
    witelo.drawText("AHT20 & BMP280", 0, 0)
    witelo.drawText("Temperatur", 0, 15)
    witelo.drawText(convertToText(witelo.temperature_aht20()), 95, 15)
    witelo.drawText("Luftfeuchte", 0, 25)
    witelo.drawText(convertToText(witelo.humidity_aht20()), 95, 25)
    witelo.drawText("Temperatur (BMP)", 0, 35)
    witelo.drawText(convertToText(witelo.temperature_bmp280()), 95, 35)
    witelo.drawText("Luftdruck", 0, 45)
    witelo.drawText(convertToText(witelo.pressure_bmp280()), 85, 45)
}
function ANT20_BPM280_PAGE2 () {
    witelo.drawText("Naechster Sensor", 0, 0)
}
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    page += -1
    if (page < 0) {
        page = 3
    }
})
let page = 0
page = 2
basic.forever(function () {
    witelo.clear()
    if (page == 1) {
        ENS160_PAGE()
    } else if (page == 2) {
        ANT20_BPM280_PAGE()
    } else if (page == 3) {
        ANT20_BPM280_PAGE2()
    } else {
        startpage()
    }
    witelo.update()
})
