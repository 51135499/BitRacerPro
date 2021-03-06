const N76_ADDR = 0x10

//% weight=0 color=#f98020 icon="\uf1ba" block="BitRacerPro"
namespace BitRacerPro {
    export enum Motors {
        //% blockId="left motor" block="left"
        M_R = 0,
        //% blockId="right motor" block="right"
        M_L = 1,
        //% blockId="all motor" block="all"
        All = 2
    }
    export enum IR_Sensors {
        //% blockId="IR1_Sensors" block="IR1"
        IR1 = 0x03,
        //% blockId="IR2_Sensors" block="IR2"
        IR2 = 0x04,
        //% blockId="IR3_Sensors" block="IR3"
        IR3 = 0x05,
        //% blockId="IR4_Sensors" block="IR4"
        IR4 = 0x06,
        //% blockId="IR5_Sensors" block="IR5"
        IR5 = 0x07
    }	
	export enum LineColor {
        //% blockId="White" block="White"
        White = 0x0A,
        //% blockId="Black" block="Black"
        Black = 0x0B
    }
	export enum LEDs {
        //% blockId="LED_right" block="right"
        LED_R = 8,
        //% blockId="LED_left" block="left"
        LED_L = 16
    }
	export enum LEDswitch {
        //% blockId="on" block="on"
        on = 0,
        //% blockId="off" block="off"
        off = 1
    }
    
	//% weight=100
    //% blockId=motor_MotorRun block="motor|%index|PWM value|%PWM"
    //% PWM.min=-1000 PWM.max=1000
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=3
    export function motorRun(index: Motors, PWM: number): void {
        let i2cbuf = pins.createBuffer(3);
        if (index == 0) {
            i2cbuf[0] = 0x02;
            i2cbuf[1] = (PWM >> 8);
            i2cbuf[2] = PWM;
            pins.i2cWriteBuffer(N76_ADDR, i2cbuf);
        }
        if (index == 1) {
            i2cbuf[0] = 0x00;
            i2cbuf[1] = (PWM >> 8);
            i2cbuf[2] = PWM;
            pins.i2cWriteBuffer(N76_ADDR, i2cbuf);
        }
        if (index == 2) {	
            i2cbuf[0] = 0x01;
            i2cbuf[1] = (PWM >> 8);
            i2cbuf[2] = PWM;
            pins.i2cWriteBuffer(N76_ADDR, i2cbuf);
        }
    }
	
	//% weight=90
    //% blockId=sensor_readIR block="read |%SensorID sensor"
    //% SensorID.fieldEditor="gridpicker" SensorID.fieldOptions.columns=3
    export function readIR(SensorID: IR_Sensors): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            SensorID,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.UInt16BE, false)
    }
	//% weight=85
	//% blockId=sensor_readIR2 block="read IRsensor |%SensorID"
	//% SensorIDs.min=0 SensorIDs.max=4
    export function readIR2(SensorIDs: number): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            SensorIDs+3,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.UInt16BE, false)
    }
	//% weight=80
    //% blockId=LED_Set block="LED|%LedPin|%status"
    //% LedPin.fieldEditor="gridpicker" LedPin.fieldOptions.columns=1
    //% status.fieldEditor="gridpicker" status.fieldOptions.columns=1
	export function LED(LedPin: LEDs,status: LEDswitch): void {
        if (LedPin == LEDs.LED_R)
		{
            pins.digitalWritePin(DigitalPin.P8, status)
		}
        else if (LedPin == LEDs.LED_L)
		{
            pins.digitalWritePin(DigitalPin.P16, status)
		}
    }
	
	
	//% color=#2080ff
	//% weight=30
	//% blockId=sensor_StartSampling block="Calibrate Begin"
    export function CalibrateBegin(): void {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x09,
            NumberFormat.UInt8LE,
            false
        )
    }
	
	//% color=#2080ff
	//% weight=29
    //% blockId=sensor_EndSampling block="Calibrate End|%Color (Line)"
    //% Color.fieldEditor="gridpicker" Color.fieldOptions.columns=1
	export function CalibrateEnd(Color: LineColor): void {
        pins.i2cWriteNumber(
            N76_ADDR,
            Color,
            NumberFormat.UInt8LE,
            false
        )
    }
	
	//% color=#2080ff
    //% weight=28
    //% blockId=sensor_Line block="read Line position"
    export function readLine(): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x08,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Int16BE, false) / 1000
    }
    //% color=#3dbf53
    //% weight=20
    //% blockId=Set_Zero_point block="Set Zero point"
    export function SetZeropoint(): void {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x20,
            NumberFormat.UInt8LE,
            false
        )
    }
    //% color=#3dbf53
    //% weight=19
    //% blockId=Read_Angle_Z block="read Angle Z"
    export function ReadAngleZ(): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x21,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Int16BE, false) / 10
    }
    //% color=#3dbf53
    //% weight=18
    //% blockId=Read_Gyro_Z block="read Gyro Z"
    export function ReadGyroZ(): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x22,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Int16BE, false) / 1000
    }
    //% color=#3dbf53
    //% weight=17
    //% blockId=Read_Accel_Y block="read Accel Y"
    export function ReadAccelY(): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x23,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Int16BE, false) / 1000
    }
    //% color=#40994f
    //% weight=16
    //% blockId=Observer_Clear block="Observer Clear"
    export function ObserverClear(): void {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x30,
            NumberFormat.UInt8LE,
            false
        )
    }
    //% color=#40994f
    //% weight=15
    //% blockId=Read_Observer_Distance block="Read Observer Distance"
    export function ReadObserverDistance(): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x31,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Int32BE, false) / 1000
    }
     //% color=#40994f
    //% weight=14
    //% blockId=Read_Observer_Velocity block="Read Observer Velocity"
    export function ReadObserverVelocity(): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x32,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.Int16BE, false) / 100
    }
    //% color=#3dbfa1
    //% weight=0
    //% blockId=readBatteryVoltage block="read Battery Voltage"
    export function readBat(): number {
        pins.i2cWriteNumber(
            N76_ADDR,
            0x2F,
            NumberFormat.UInt8LE,
            false
        )
        return pins.i2cReadNumber(N76_ADDR, NumberFormat.UInt16BE, false) / 1000
    }
}