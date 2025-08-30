import {Injectable} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import {DeviceEntity} from "../../../lib/database/entities/DeviceEntity";
import {BaseDevice} from "./devices/base-device.driver";
import {BulbDevice} from "./devices/bulb-device.driver";

@Injectable()
export class DeviceFactory {
    constructor(private readonly moduleRef: ModuleRef) {}
    public async create(prefab: DeviceEntity): Promise<BaseDevice> {
        let device: BaseDevice;
        if(prefab.type.name == "bulb"){
            device = await this.moduleRef.create(BulbDevice);
        }
        else throw new Error("Bad type exception")
        const parameters = await prefab.parameters;
        const config = Object.fromEntries(parameters.map(x => [x.type.name, x.value]));
        device.setup(config);
        return device;
    }
}