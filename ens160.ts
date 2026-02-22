namespace ens160 {

    const ADDR = 0x52
    let initialized = false

    function init() {
        // Set operational mode
        let buf = pins.createBuffer(2)
        buf[0] = 0x02
        buf[1] = 0x01
        pins.i2cWriteBuffer(ADDR, buf)
        basic.pause(10)
        initialized = true
    }

    function ensureInit() {
        if (!initialized) init()
    }

    function readReg8(reg: number): number {
        ensureInit()
        pins.i2cWriteNumber(ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDR, NumberFormat.UInt8BE)
    }

    function readReg16(reg: number): number {
        ensureInit()
        pins.i2cWriteNumber(ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDR, NumberFormat.UInt16LE)
    }

    //% block="Luftqualität (AQI)"
    export function aqi(): number {
        return readReg8(0x21)
    }

    //% block="TVOC (ppb)"
    export function tvoc(): number {
        return readReg16(0x22)
    }

    //% block="eCO2 (ppm)"
    export function eco2(): number {
        return readReg16(0x24)
    }
}
