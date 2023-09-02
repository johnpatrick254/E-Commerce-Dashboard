import { Entity, Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public first_name: string;
    @Column()
    public last_name: string;
    @Column({
        unique:true
    })
    public email: string;
    @Column()
    public password: string;

    @ManyToOne(()=>Role)
    @JoinColumn({name:"role_id"})
    role:Role
}