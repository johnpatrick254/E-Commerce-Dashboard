export type OrderItemData ={
    id:number,
    product_id: number,
    productTitle: string,
    price: number,
    original_price: number,
    quantity: number
}
export type OrdersData ={
    id: number,
    name: string,
    email: string,
    total: number,
    created_at: string,
    order_items: OrderItemData[]
}