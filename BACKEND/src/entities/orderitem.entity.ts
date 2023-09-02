import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productTitle:string

    @Column()
    price:number

    @Column()
    quantity:number
    @ManyToOne(()=>Orders)
    @JoinColumn({
        name:'order_id'
    })
    order:Orders

}