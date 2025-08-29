import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DeviceTemplateEntity} from "./DeviceTemplateEntity";
import {DeviceEntity} from "./DeviceEntity";
import {DeviceTemplateParameterEntity} from "./DeviceTemplateParameterEntity";

@Entity()
export class DeviceParameterEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar', length: 10})
    public value: string;

    @ManyToOne(() => DeviceTemplateParameterEntity, x => x.values, { eager: true })
    public type: DeviceTemplateParameterEntity;

    @ManyToOne(() => DeviceEntity, x => x.parameters, {eager: true})
    public device: DeviceEntity;
}