import { Response, Request } from "express";
import { connection } from "../../config/ormconfig";
import { Orders } from "../entities/orders.entity";
import { Parser } from "json2csv";

export const fetchAllOrders = async (req: Request, res: Response) => {
    try {
        let pageNumber: number = parseInt(req.query.page as string || "1")
        const take = 15;

        const repository = connection.getRepository(Orders);
        const { "0": orders, "1": totals } = await repository.findAndCount({
            take: take,
            skip: ((pageNumber - 1) * take),
            relations:['order_items']
        })

        res.status(200).send(
            {
                data: orders.map(order=>({
                    name:order.name,
                    email:order.email,
                    total:order.totals,
                    created_at:order.created_at,
                    order_items:order.order_items
                })),
                meta: {
                    total: totals,
                    page: pageNumber,
                    last_page: Math.ceil(totals / take)
                }

            }
        );

    } catch (err) {

        return res.status(502).json({ message: err });
    }
}

export const exportCSV = async(req:Request,res:Response)=>{
   try {
    const parser = new Parser({
        fields:['ID','Name','Email','Product Title','Price','Quantity']
    })
    const repository = connection.getRepository(Orders);
    const orders = await repository.find({
        relations:['order_items']
    })
    
    const json:any = []
    orders.forEach(order=>{
        json.push({
        ID:order.id,
        Name:order.name,
        Email:order.email,
        "Product Title":'',
        Price:'',
        Quantity:'',
    })
    order.order_items.forEach(item=>{
        json.push({
            ID:'',
            Name:'',
            Email:'',
            "Product Title":item.productTitle,
            Price:item.price,
            Quantity:item.price,
        })
    })
    const csv = parser.parse(json)
    res.header("content-type:text/csv");
    res.attachment('orders.csv');
   return res.send(csv)
})
   } catch (error) {
    console.log(error);
    
   }
}

export const chartData = async(req:Request,res:Response)=>{
    const results = await connection.query
    ("SELECT DATE_FORMAT( o.created_at,'%y-%m-%d') AS date, SUM(i.price*i.quantity) as orders_sum FROM orders o JOIN order_item i ON O.id =i.order_id GROUP BY date;")
    res.status(200).send(results);
}