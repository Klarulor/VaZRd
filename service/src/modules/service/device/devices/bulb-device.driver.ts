import {Injectable, Logger, Scope} from "@nestjs/common";
import {BaseDevice} from "./base-device.driver";

@Injectable({ scope: Scope.TRANSIENT })
export class BulbDeviceDriver extends BaseDevice {
    private readonly log = new Logger(BulbDeviceDriver.name);

}