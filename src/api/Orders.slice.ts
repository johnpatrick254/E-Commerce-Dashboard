import { OrdersData } from "../Utils/Orders/orders.util";
import { apiGateWay } from "./ApiSlice.slice";

const OrdersAPI = apiGateWay.injectEndpoints({
    endpoints:(builder)=> ({
        getAllOrders:builder.query<{data:OrdersData[],meta:{total: number,page: number,lastpage: number}},number>({
         query:id=>`/api/orders?page=${id}`
        })    
    }),
})
export const {useGetAllOrdersQuery} = OrdersAPI;