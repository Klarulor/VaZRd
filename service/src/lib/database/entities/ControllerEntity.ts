import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ControllerEntity {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ type: 'varchar', length: '32' })
    public name?: string;

    @ManyToOne(() => ControllerEntity, x => x.childs, { eager: true })
    public parent?: ControllerEntity;

    @OneToMany(() => ControllerEntity, x => x.parent, { lazy: true })
    public childs?: Promise<ControllerEntity[]>
}