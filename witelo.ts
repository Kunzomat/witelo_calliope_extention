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
        return Math.round(aht2x.temperature() * 100) / 100
    }
    //% group="AHT20"
    //% block="Luftfeuchte (％)"
    export function humidity_aht20(): number {
        return Math.round(aht2x.humidity() * 100) / 100
    }
    //% group="ENS160"
    //% block="Luftqualitätsindex"
    export function api_ens160(): number {
        return ENS160.AQI()
    }
    //% group="ENS160"
    //% block="TVOCs (ppb)"
    export function tvoc_ens160(): number {
        return ENS160.TVOC()
    }
    //% group="ENS160"
    //% block="CO2 Äquivalent (ppm)"
    export function eco2_ens160(): number {
        return ENS160.eCO2()
    }
}