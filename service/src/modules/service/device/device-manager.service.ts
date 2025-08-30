import {Injectable, Logger, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {DeviceEntity} from "../../../lib/database/entities/DeviceEntity";
import {BaseDevice} from "./devices/base-device.driver";
import {DeviceFactory} from "./device-factory";

@Injectable()
export class DeviceManagerService implements OnModuleInit, OnModuleDestroy {
    constructor(
        @InjectRepository(DeviceEntity) private readonly deviceRepository: Repository<DeviceEntity>,
        private readonly deviceFactory: DeviceFactory
    ) {}

    private readonly log: Logger = new Logger(DeviceManagerService.name);
    private devices: BaseDevice[] = [];

    async onModuleInit(): Promise<any> {
        for(const x of await this.deviceRepository.find({where: {isEnabled: true}})){
            this.log.log(`Creating device driver for (${x.id}) ${x.type.name}`);
            const device = await this.deviceFactory.create(x);
            this.devices.push(device);
            device.start();
        }
    }
    onModuleDestroy(): any {
        for(const x of this.devices){
            x.stop();
        }
        this.devices = [];
    }
}