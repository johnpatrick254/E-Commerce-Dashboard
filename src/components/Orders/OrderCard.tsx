import { useState } from "react";
import { OrdersData } from "../../Utils/Orders/orders.util"
import { OrderItemCard } from "./OrderItemCard"

export const OrderCard:React.FC<OrdersData>=({id,name,email,total,created_at,order_items})=>{
    const [showDropDown, setShowDropDown]= useState(false)
    const date =new Date(created_at);;

    return <div className="order-card" onClick={()=>{setShowDropDown(!showDropDown)}}  style={showDropDown ? {height:"max-content"}:{}}>
    <div className="order">
    <div className="order-number"><p>#{id + 1}</p></div>
    <div className="customer-name"><p>{name}</p></div>
    <div className="customer-mail"><p>{email}</p></div>
    <div className="purchase-date"><p>{date.toDateString()}</p></div>
    <div className="amount"><p>${total}</p></div>
    </div>
    <div className="order-item">
         {order_items.map((item,i)=>{
            return <OrderItemCard
                  price={item.price}
                  productTitle={item.productTitle}
                  quantity={item.quantity}
                  number={i}    
                  key={i}
                  product_id={item.product_id}
            />
         })}
    </div>
    </div>
}