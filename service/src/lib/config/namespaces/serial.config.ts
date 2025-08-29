import {registerAs} from "@nestjs/config";
import * as process from "node:process";

export default registerAs('serial', () => ({
    path: process.env.SERIAL_PATH,
    baudRate: process.env.SERIAL_BAUDRATE
}))