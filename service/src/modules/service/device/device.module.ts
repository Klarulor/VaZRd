import {Module} from "@nestjs/common";
import {DeviceFactory} from "./device-factory";
import {DeviceManagerService} from "./device-manager.service";
import {BulbDeviceDriver} from "./devices/bulb-device.driver";

@Module({
    providers: [DeviceFactory, DeviceManagerService, BulbDeviceDriver]
})
export class DeviceModule {}