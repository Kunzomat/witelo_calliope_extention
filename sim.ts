/***********************
 OLED SIMULATION
************************/

namespace witelo_display {

    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D

    export function init() {

        if (canvas) return

        canvas = document.createElement("canvas")
        canvas.width = 128
        canvas.height = 64

        canvas.style.border = "2px solid white"
        canvas.style.background = "black"
        canvas.style.imageRendering = "pixelated"
        canvas.style.marginBottom = "10px"

        document.body.appendChild(canvas)

        ctx = canvas.getContext("2d")
    }

    export function clear() {

        init()

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, 128, 64)
    }

    export function drawText(text: string, x: number, y: number) {

        init()

        ctx.fillStyle = "white"
        ctx.font = "8px monospace"

        ctx.fillText(text, x, y + 8)
    }

}

/***********************
 SENSOR SIMULATION
************************/

namespace witelo_sim_sensors {

    let temperature = 22
    let humidity = 45
    let pressure = 1013
    let aqi = 80
    let tvoc = 120
    let eco2 = 600

    let initialized = false

    function initUI() {

        if (initialized) return
        initialized = true

        let panel = document.createElement("div")
        panel.style.color = "white"

        document.body.appendChild(panel)

        function slider(name: string, min: number, max: number, value: number, callback: (v: number) => void) {

            let label = document.createElement("div")
            label.innerText = name

            let input = document.createElement("input")

            input.type = "range"
            input.min = min.toString()
            input.max = max.toString()
            input.value = value.toString()

            input.oninput = () => callback(parseInt(input.value))

            panel.appendChild(label)
            panel.appendChild(input)
        }

        slider("Temperatur", -10, 40, temperature, v => temperature = v)
        slider("Luftfeuchte", 0, 100, humidity, v => humidity = v)
        slider("Luftdruck", 950, 1050, pressure, v => pressure = v)
        slider("AQI", 0, 500, aqi, v => aqi = v)
        slider("TVOC", 0, 1000, tvoc, v => tvoc = v)
        slider("eCO2", 400, 2000, eco2, v => eco2 = v)
    }

    export function temperatureValue() {
        initUI()
        return temperature
    }

    export function humidityValue() {
        initUI()
        return humidity
    }

    export function pressureValue() {
        initUI()
        return pressure
    }

    export function apiValue() {
        initUI()
        return aqi
    }

    export function tvocValue() {
        initUI()
        return tvoc
    }

    export function eco2Value() {
        initUI()
        return eco2
    }

}

/***********************
 EXTENSION FUNCTIONS
************************/

namespace witelo {

    export function clear() {
        witelo_display.clear()
    }

    export function update() {
        // Simulator braucht kein update
    }

    export function drawText(text: string, x: number, y: number) {
        witelo_display.drawText(text, x, y)
    }

    export function temperature_aht20(): number {
        return witelo_sim_sensors.temperatureValue()
    }

    export function humidity_aht20(): number {
        return witelo_sim_sensors.humidityValue()
    }

    export function api_ens160(): number {
        return witelo_sim_sensors.apiValue()
    }

    export function tvoc_ens160(): number {
        return witelo_sim_sensors.tvocValue()
    }

    export function eco2_ens160(): number {
        return witelo_sim_sensors.eco2Value()
    }

    export function pressure_bmp280(): number {
        return witelo_sim_sensors.pressureValue()
    }

    export function temperature_bmp280(): number {
        return witelo_sim_sensors.temperatureValue()
    }

    export function SetTemp(temp: number): void {}

    export function SetHumidity(rh: number): void {}

}
