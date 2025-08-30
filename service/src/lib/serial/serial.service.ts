import {Injectable, Logger, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {SerialPort} from "serialport";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SerialService implements OnModuleInit, OnModuleDestroy {
    constructor(private readonly configService: ConfigService) {
    }

    private readonly log = new Logger(SerialService.name)

    private port?: SerialPort;
    private buffer: number[] = [];
    private subscribers: ((_: number[]) => any)[] = [];

    onModuleInit(): any {
        this.open(this.configService.get('serial.path') as string, this.configService.get('serial.baudRate') as number);
    }

    onModuleDestroy(): any {
        this.port?.close();
        this.log.log("Serial closed by destroy")
    }

    public subscribeOnMessage(callback: ((_: number[]) => any)): void {
        this.subscribers.push(callback);
    }

    private open(path: string, rate: number): void {
        this.log.log(`Trying to open serial on ${path} with ${rate} rate..`);

        this.port = new SerialPort({ path, baudRate: rate, autoOpen: false });

        this.port.on('error', (e) => this.log.error(e));
        this.port.open((err) => {
            if (err) return this.log.error(`Serial open error: ${err.message}`);
            this.log.log(`Serial opened successfully: ${path} @ ${rate}`);
        });

        this.port.on(`data`, buf => this.onData(buf));
    }

    private onData(buf: Buffer): void {
        while (this.buffer.length > 0) {
            const packetSize = this.buffer[0];
            if (this.buffer.length < packetSize + 1) {
                break;
            }
            const packet = this.buffer.slice(0, packetSize + 1);
            this.buffer = this.buffer.slice(packetSize + 1);
            this.log.debug(`Came packet: ${packet.join(' ')}`)
            for(const x of this.subscribers)
                x(packet);
        }
    }

}