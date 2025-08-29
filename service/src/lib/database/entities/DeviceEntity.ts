import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DeviceTemplateEntity} from "./DeviceTemplateEntity";

@Entity()
export class DeviceEntity {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => DeviceTemplateEntity, x => x.devices, { eager: true })
    public type?: DeviceTemplateEntity
}

