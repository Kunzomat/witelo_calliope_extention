namespace pxsim.witelo {

    console.log("SIMULATOR LÄUFT")

    export function clear() {
        console.log("clear() aufgerufen")
    }

    export function drawText(text: string, x: number, y: number) {
        console.log("drawText:", text, x, y)
    }

    export function temperature_bmp280(): number {
        console.log("temperature_bmp280()")
        return 42
    }

}
