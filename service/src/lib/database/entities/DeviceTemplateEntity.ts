import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DeviceEntity} from "./DeviceEntity";
import {DeviceTemplateParameterEntity} from "./DeviceTemplateParameterEntity";

@Entity()
export class DeviceTemplateEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 32 })
    public name: string;

    @Column({ type: 'varchar', length: 256 })
    public thumbnailUrl: string;

    @OneToMany(() => DeviceEntity, x => x.type, { lazy: true })
    public devices: Promise<DeviceEntity[]>;

    @OneToMany(() => DeviceTemplateParameterEntity, x => x.deviceTemplate, {lazy: true})
    public connectorLines: Promise<DeviceTemplateParameterEntity[]>
}