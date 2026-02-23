namespace ens160 {

    const ADDR = 0x53
    let initialized = false

    function getreg(reg: number): number {
        pins.i2cWriteNumber(ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDR, NumberFormat.UInt8BE)
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDR, NumberFormat.UInt16LE)
    }

    export function init() {

        // PART ID prüfen
        pins.i2cWriteNumber(ADDR, 0x00, NumberFormat.UInt8BE)
        let part = pins.i2cReadNumber(ADDR, NumberFormat.UInt16LE)

        if (part != 352) {
            basic.showString("ID ERR")
        }

        // STANDARD MODE (nur 1 Byte!)
        pins.i2cWriteNumber(ADDR, 0x02, NumberFormat.UInt8BE)
        pins.i2cWriteNumber(ADDR, 0x01, NumberFormat.UInt8BE)

        basic.pause(200)

        // ENV Daten setzen (optional)
        let t = Math.round((25 + 273.15) * 64)
        let h = Math.round(50 * 512)

        pins.i2cWriteNumber(ADDR, 0x13, NumberFormat.UInt8BE)
        pins.i2cWriteNumber(ADDR, t, NumberFormat.UInt16LE)
        pins.i2cWriteNumber(ADDR, h, NumberFormat.UInt16LE)

        initialized = true
    }

    function ensureInit() {
        if (!initialized) init()
    }

    export function aqi(): number {
        ensureInit()
        return getreg(0x21)
    }

    export function tvoc(): number {
        ensureInit()
        return getUInt16LE(0x22)
    }

    export function eco2(): number {
        ensureInit()
        return getUInt16LE(0x24)
    }
}