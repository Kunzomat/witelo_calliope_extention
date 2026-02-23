namespace oled {

    const WIDTH = 128
    const HEIGHT = 64
    const ADDR = 0x3C

    let buffer = pins.createBuffer(1024)
    let initialized = false

    function cmd(c: number) {
        let b = pins.createBuffer(2)
        b[0] = 0x00
        b[1] = c
        pins.i2cWriteBuffer(ADDR, b)
    }

    function dataBlock(start: number, length: number) {
        let b = pins.createBuffer(length + 1)
        b[0] = 0x40
        for (let i = 0; i < length; i++) {
            b[i + 1] = buffer[start + i]
        }
        pins.i2cWriteBuffer(ADDR, b)
    }

    export function init() {

        cmd(0xAE) // display off
        cmd(0x20) // memory mode
        cmd(0x00) // horizontal addressing

        cmd(0xB0)
        cmd(0xC8)
        cmd(0x00)
        cmd(0x10)
        cmd(0x40)

        cmd(0x81)
        cmd(0x7F)

        cmd(0xA1)
        cmd(0xA6)
        cmd(0xA8)
        cmd(0x3F)

        cmd(0xA4)
        cmd(0xD3)
        cmd(0x00)

        cmd(0xD5)
        cmd(0xF0)

        cmd(0xD9)
        cmd(0x22)

        cmd(0xDA)
        cmd(0x12)

        cmd(0xDB)
        cmd(0x20)

        cmd(0x8D)
        cmd(0x14)

        cmd(0xAF) // display on
        
        initialized = true
        clear()
        update()
    }

    export function clear() {
        if (!initialized) init()
        buffer.fill(0)
    }

    export function update() {
        if (!initialized) init()
        for (let page = 0; page < 8; page++) {
            cmd(0xB0 + page)
            cmd(0x00)
            cmd(0x10)

            dataBlock(page * 128, 128)
        }
    }

    export function drawPixel(x: number, y: number) {
        if (!initialized) init()
        if (x < 0 || x >= WIDTH) return
        if (y < 0 || y >= HEIGHT) return

        let index = x + (Math.idiv(y, 8) * WIDTH)
        buffer[index] |= (1 << (y % 8))
    }

    export function drawText(text: string, x: number, y: number) {
        if (!initialized) init()
        for (let i = 0; i < text.length; i++) {
            drawChar(text.charAt(i), x, y)
            x += 6   // 5 Pixel Zeichen + 1 Pixel Abstand
        }
    }

    function drawChar(c: string, x: number, y: number) {
        let code = c.charCodeAt(0)
        if (code < 32 || code > 127) return
        let charData = font5x7[code - 32]
        for (let col = 0; col < 5; col++) {
            let line = charData[col]
            for (let row = 0; row < 7; row++) {
                if ((line >> row) & 1) {
                    drawPixel(x + col, y + row)
                }
            }
        }
    }

}
