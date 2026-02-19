// Gib deinen Code hier ein
//% color=#000000 icon="\uf108"
namespace witelo {

    //% block="Bildschirm initialisieren"
    export function init() {
        oled.init
    }

    //% block="Bildschirm löschen"
    export function clear() {
        oled.clear
    }

    //% block="Bildschirm aktualiesieren"
    export function update() {
        oled.update
    }

    //% block="draw text %text at x %x y %y"
    export function drawText(text: string, x: number, y: number) {
        oled.drawText(text, x, y)
    }
}