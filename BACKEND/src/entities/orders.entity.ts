import { PrimaryGeneratedColumn,Column, CreateDateColumn, OneToMany, Entity } from "typeorm"
import { OrderItem } from "./orderitem.entity";

@Entity()
export class Orders{
    @PrimaryGeneratedColumn()
    id:number;
     
    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
    email:string;

    @CreateDateColumn()
    created_at:string;

    @OneToMany(()=>OrderItem,OrderItem=>OrderItem.order)
    order_items:OrderItem[]


    get name ():string{
        return this.email + " " + this.last_name
    }

    get totals():number{
        return this.order_items.reduce((a,b)=>a + (b.price * b.quantity),0)
    }
    get profits():number{
        const salesPrice= this.order_items.reduce((a,b)=>a + (b.price * b.quantity),0)
        const OgPrice = this.order_items.reduce((a,b)=>a + (b.original_price * b.quantity),0)
        const profit = salesPrice -OgPrice
        return profit
    }
}