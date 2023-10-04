import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Repository } from "typeorm";
import { Orders } from "./orders.entity";
import { Product } from "./product.entity";
import { randomInt } from "crypto";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    product_id: Number

    @Column()
    productTitle: string

    @Column()
    price: number
    @Column()
    original_price: number
   
    @Column()
    quantity: number
    @ManyToOne(() => Orders)
    @JoinColumn({
        name: 'order_id'
    })
    order: Orders;

    public async setPrice(repo: Repository<Product>) {
        const price = await repo.findOne({ where: { id: +this.product_id } })
        if (price) {
            this.price = price.price
            this.original_price =price.original_price
        }else{
            this.price = randomInt(100,250);
            this.original_price = randomInt(100,250);
        }

    }


} 

