import { useNavigate } from "react-router-dom"
import { OrderItemData } from "../../Utils/Orders/orders.util"

export const OrderItemCard:React.FC<Partial<OrderItemData> & {number:number}>=({product_id,number,price,productTitle,quantity})=>{
    const navigate =useNavigate();
    return <div className="order-item-card" onClick={()=>{navigate(`/products/${product_id}`)}}>
    <div className="product-number"><p>{number + 1}</p></div>
    <div className="product-name"><p>{productTitle}</p></div>
    <div className="product-quantity"><p>{quantity}pcs</p></div>
    <div className="product-price"><p>${price}</p></div>
    </div>
}