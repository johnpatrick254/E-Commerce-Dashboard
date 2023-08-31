import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permision {
    @PrimaryGeneratedColumn()
    public id:number

    @Column()
    public name:string
}