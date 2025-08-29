import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DeviceTemplateEntity} from "./DeviceTemplateEntity";
import {ControllerEntity} from "./ControllerEntity";
import {DeviceParameterEntity} from "./DeviceParameterEntity";

@Entity()
export class DeviceEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => DeviceTemplateEntity, x => x.devices, { eager: true })
    public type: DeviceTemplateEntity

    @Column({ type: 'boolean' })
    public isEnabled: boolean;

    @ManyToOne(() => ControllerEntity, x => x.devices, { eager: true })
    public controller: ControllerEntity;

    @OneToMany(() => DeviceParameterEntity, x => x.device, {lazy: true})
    public parameters: Promise<DeviceParameterEntity[]>
}

