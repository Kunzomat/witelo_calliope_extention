namespace ens160 {

    const ADDR = 0x53
    let initialized = false

    let AQI = 0
    let TVOC = 0
    let ECO2 = 0

    function getreg(reg: number): number {
        pins.i2cWriteNumber(ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDR, NumberFormat.UInt8BE)
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(ADDR, NumberFormat.UInt16LE)
    }

    export function init() {

        // RESET
        pins.i2cWriteNumber(ADDR, 0x02F0, NumberFormat.UInt16BE)
        basic.pause(300)

        // IDLE
        pins.i2cWriteNumber(ADDR, 0x0200, NumberFormat.UInt16BE)
        basic.pause(100)

        // CLEAR COMMAND
        pins.i2cWriteNumber(ADDR, 0x1200, NumberFormat.UInt16BE)
        basic.pause(50)

        // STANDARD MODE
        pins.i2cWriteNumber(ADDR, 0x0201, NumberFormat.UInt16BE)
        basic.pause(500)

        // ENV Daten (25°C / 50%)
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

    function update() {

        ensureInit()

        // Status poll mit Timeout
        let timeout = 100
        let status = 0

        while (timeout > 0) {
            status = getreg(0x20)
            if ((status & 0x04) != 0) break
            basic.pause(20)
            timeout--
        }

        if ((status & 0x04) == 0) return

        // AQI
        AQI = getreg(0x21)

        // TVOC
        TVOC = getUInt16LE(0x22)

        // eCO2
        ECO2 = getUInt16LE(0x24)
    }

    export function aqi(): number {
        update()
        return AQI
    }

    export function tvoc(): number {
        update()
        return TVOC
    }

    export function eco2(): number {
        update()
        return ECO2
    }
}