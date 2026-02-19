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
}