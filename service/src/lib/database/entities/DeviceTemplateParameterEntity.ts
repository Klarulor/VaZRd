import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DeviceTemplateEntity} from "./DeviceTemplateEntity";
import {DeviceParameterEntity} from "./DeviceParameterEntity";

@Entity()
export class DeviceTemplateParameterEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar', length: 20})
    public name: string;

    @Column({type: 'varchar', length: 20, nullable: true})
    public defaultValue?: string;

    @ManyToOne(() => DeviceTemplateEntity, x => x.parameters, {eager: true})
    public deviceTemplate: DeviceTemplateEntity;

    @OneToMany(() => DeviceParameterEntity, x => x.type, {lazy: true})
    public values: Promise<DeviceParameterEntity[]>;
}