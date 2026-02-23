namespace bmp280 {

    const ADDR = 0x76  // ggf. 0x77
    let initialized = false
    let dig_T1 = 0
    let dig_T2 = 0
    let dig_T3 = 0
    let dig_P1 = 0
    let dig_P2 = 0
    let dig_P3 = 0
    let dig_P4 = 0
    let dig_P5 = 0
    let dig_P6 = 0
    let dig_P7 = 0
    let dig_P8 = 0
    let dig_P9 = 0
    let t_fine = 0

    function ensureInit() {
        if (!initialized) init()
    }

    export function init() {

        // Normal Mode, oversampling x1
        pins.i2cWriteNumber(ADDR, 0xF4 << 8 | 0x27, NumberFormat.UInt16BE)

        // Calibration lesen
        pins.i2cWriteNumber(ADDR, 0x88, NumberFormat.UInt8BE)
        let cal = pins.i2cReadBuffer(ADDR, 24)

        dig_T1 = cal[0] | (cal[1] << 8)
        dig_T2 = (cal[2] | (cal[3] << 8)) << 16 >> 16
        dig_T3 = (cal[4] | (cal[5] << 8)) << 16 >> 16

        dig_P1 = cal[6] | (cal[7] << 8)
        dig_P2 = (cal[8] | (cal[9] << 8)) << 16 >> 16
        dig_P3 = (cal[10] | (cal[11] << 8)) << 16 >> 16
        dig_P4 = (cal[12] | (cal[13] << 8)) << 16 >> 16
        dig_P5 = (cal[14] | (cal[15] << 8)) << 16 >> 16
        dig_P6 = (cal[16] | (cal[17] << 8)) << 16 >> 16
        dig_P7 = (cal[18] | (cal[19] << 8)) << 16 >> 16
        dig_P8 = (cal[20] | (cal[21] << 8)) << 16 >> 16
        dig_P9 = (cal[22] | (cal[23] << 8)) << 16 >> 16

        initialized = true
    }

    function readRaw(): number[] {
        ensureInit()
        pins.i2cWriteNumber(ADDR, 0xF7, NumberFormat.UInt8BE)
        let data = pins.i2cReadBuffer(ADDR, 6)

        let adc_P = (data[0] << 12) | (data[1] << 4) | (data[2] >> 4)
        let adc_T = (data[3] << 12) | (data[4] << 4) | (data[5] >> 4)

        return [adc_T, adc_P]
    }

    export function temperature(): number {
        let raw = readRaw()
        let adc_T = raw[0]

        let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11
        let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14

        t_fine = var1 + var2
        return dig_T1//((t_fine * 5 + 128) >> 8) / 100

    }

    export function pressure(): number {
        temperature()
        let raw = readRaw()
        let adc_P = raw[1]

        let var1 = t_fine - 128000
        let var2 = var1 * var1 * dig_P6
        var2 = var2 + ((var1 * dig_P5) << 17)
        var2 = var2 + (dig_P4 << 35)
        var1 = ((var1 * var1 * dig_P3) >> 8) + ((var1 * dig_P2) << 12)
        var1 = (((1 << 47) + var1) * dig_P1) >> 33

        if (var1 == 0) return 0

        let p = 1048576 - adc_P
        p = (((p << 31) - var2) * 3125) / var1
        var1 = (dig_P9 * (p >> 13) * (p >> 13)) >> 25
        var2 = (dig_P8 * p) >> 19

        p = ((p + var1 + var2) >> 8) + (dig_P7 << 4)

        return p / 256 / 100   // hPa
    }
}
