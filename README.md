# Smart Safety Helmet

An IoT-based safety helmet designed for industrial workers to monitor environmental conditions, detect hazards, and ensure safety compliance in real-time.

## Features
- **Real-time Monitoring**: Tracks Temperature, Humidity, Gas levels (ppm), and G-Force.
- **Hazard Detection**: Automatically detects:
  - **High Impact**: Abnormal G-force readings (falls or collisions).
  - **Gas Leaks**: High concentrations of combustible gases (MQ2).
  - **Extreme Heat**: High ambient temperature.
  - **Compliance**: Detects if the helmet is being worn using an IR sensor.
- **Visual & Audible Alerts**: On-board LED and Buzzer for immediate feedback.
- **Web Dashboard**: An integrated web interface served directly from the ESP32 to visualize sensor data in real-time.

## Hardware Requirements
- **Microcontroller**: ESP32 (DevKit V1)
- **Sensors**:
  - **MPU6050**: 3-axis Accelerometer & Gyroscope (Impact detection).
  - **DHT22**: Temperature and Humidity sensor.
  - **MQ2**: Gas sensor (Smoke, LPG, CO).
  - **IR Sensor**: Proximity detection (Helmet worn status).
- **Outputs**:
  - Active Buzzer
  - LED Indicator

## Project Structure
- `EL.ino`: Main Arduino/ESP32 source code.
- `data/`: Web assets (HTML, CSS, JS) served via LittleFS.
  - `index.html`: Main dashboard UI.
  - `style.css`: Dashboard styling.
  - `script.js`: Charting and data fetching logic.

## Setup & Installation

### 1. Arduino IDE Setup
- Install the [Arduino IDE](https://www.arduino.cc/en/software).
- Add the ESP32 board support: `File > Preferences > Additional Boards Manager URLs` and add:
  `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
- Install the ESP32 boards from `Tools > Board > Boards Manager`.

### 2. Library Installation
Install the following libraries via the Arduino Library Manager:
- `DHT sensor library` by Adafruit
- `Adafruit Unified Sensor` by Adafruit
- `MPU6050` by Jeff Rowberg (or `MPU6050_tockn`)
- `LittleFS` (Included in ESP32 core)

### 3. Hardware Connections
| Component | ESP32 Pin |
|-----------|-----------|
| DHT22     | GPIO 14   |
| IR Sensor | GPIO 27   |
| Buzzer    | GPIO 25   |
| LED       | GPIO 26   |
| MQ2 (Ana) | GPIO 36 (VP) |
| MPU6050 SDA | GPIO 19 |
| MPU6050 SCL | GPIO 18 |

### 4. Uploading Code
- Open `EL.ino` in Arduino IDE.
- Select your ESP32 board and the correct COM port.
- Click **Upload**.

### 5. Uploading Data Folder (LittleFS)
- You must upload the `data` folder to the ESP32's flash memory.
- Use the **ESP32 Sketch Data Upload** tool (available for Arduino IDE 1.8.x or via CLI/PlatformIO).
- Ensure the upload method is set to **LittleFS**.

## Usage
1. Power up the helmet.
2. Connect your phone/PC to the WiFi network: **"SmartHelmet_AP"** (Password: `helmet123`).
3. Open a browser and navigate to `http://192.168.4.1`.
4. Monitor the real-time safety metrics!

## License
This project is open-source and available under the MIT License.
