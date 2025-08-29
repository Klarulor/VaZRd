import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {SerialPort} from "serialport";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SerialService implements OnModuleInit {
    constructor(private readonly configService: ConfigService) {
    }

    private readonly log = new Logger(SerialService.name)

    private port?: SerialPort;

    onModuleInit(): any {
        this.open(this.configService.get('serial.path') as string, this.configService.get('serial.baudRate') as number);
    }

    private open(path: string, rate: number): Promise<void> {
        this.log.log(`Trying to open serial on ${path} with ${rate} rate..`);
    }
}