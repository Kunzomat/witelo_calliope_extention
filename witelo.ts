// Gib deinen Code hier ein
//% color=#000000 icon="\uf108"
namespace witelo {
    export enum UpdateMode {
        //% block="ein"
        On,
        //% block="aus"
        Off
    }
    //% group="OLED"
    //% weight=101
    //% block="Bildschirm löschen"
    export function clear() {
        oled.clear()
    }
    //% group="OLED"
    //% weight=102
    //% block="Bildschirm aktualiesiern"
    export function update() {
        oled.update()
    }
    //% group="OLED"
    //% weight=104
    //% block="zeige Text %text bei x %x y %y || Auto-Update %mode"
    //% text.defl="Hallo"
    //% x.defl=0
    //% y.defl=0
    //% expandableArgumentMode="toggle"
    //% mode.defl=UpdateMode.On
    //% inlineInputMode=inline
    export function drawText(text: string, x: number, y: number, mode?: UpdateMode
    ) {
        oled.drawText(text, x, y)
        if (mode == UpdateMode.On) { oled.update() }
    }
    //% group="AHT20"
    //% block="Temperatur (°C)"
    export function temperature_aht20(): number {
        return aht2x.temperature()
    }
    //% group="AHT20"
    //% block="Luftfeuchte (％)"
    export function humidity_aht20(): number {
        return aht2x.humidity()
    }
    //% group="BMP280"
    //% block="Temperatur (°C)"
    export function temperature_bmp280(): number {
        return bmp280.temperature()
    }
    //% group="BMP280"
    //% block="Luftdruck (hPa)"
    export function pressure_bmp280(): number {
        return 42//bmp280.pressure()
    }
    //% group="ENS160"
    //% block="Luftqualitätsindex (1-)"
    export function api_ens160(): number {
        return ens160.aqi()
    }
    //% group="ENS160"
    //% block="TVOCs (ppb)"
    export function tvoc_ens160(): number {
        return ens160.tvoc()
    }
    //% group="ENS160"
    //% block="CO2 Äquivalent (ppm)"
    export function eco2_ens160(): number {
        return ens160.eco2()
    }
}