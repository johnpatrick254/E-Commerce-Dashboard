import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Permision } from "./permision.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public name: string;

    @ManyToMany(() => Permision)
    @JoinTable({
        name: 'role_permisition',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permision_id',
            referencedColumnName: 'id'
        }
    })
    permisions: Permision[];
}
