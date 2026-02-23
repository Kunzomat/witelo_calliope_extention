namespace aht2x {

    const ADDR = 0x38
    let initialized = false

    function init() {
        let buf = pins.createBuffer(3)
        buf[0] = 0xBE
        buf[1] = 0x08
        buf[2] = 0x00
        pins.i2cWriteBuffer(ADDR, buf)
        basic.pause(20)
        initialized = true
    }

    function ensureInit() {
        if (!initialized) init()
    }

    function readRaw(): Buffer {

        ensureInit()

        let trigger = pins.createBuffer(3)
        trigger[0] = 0xAC
        trigger[1] = 0x33
        trigger[2] = 0x00
        pins.i2cWriteBuffer(ADDR, trigger)

        basic.pause(80)

        return pins.i2cReadBuffer(ADDR, 6)
    }

    export function temperature(): number {

        let data = readRaw()

        let raw = ((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]
        return (raw * 200 / 1048576) - 50
    }

    export function humidity(): number {

        let data = readRaw()

        let raw = (data[1] << 12) | (data[2] << 4) | (data[3] >> 4)
        return raw * 100 / 1048576
    }
}
