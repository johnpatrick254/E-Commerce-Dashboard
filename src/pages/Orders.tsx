import { Nav } from "../components/nav/Nav";
import "../styles/sidebar/sidebar.style.css";
import "../styles/orders/orders.style.css";
import { SiderBar } from "../components/sidebar/SideBar";
import { useGetAllOrdersQuery } from "../api/Orders.slice";
import { OrderCard } from "../components/Orders/OrderCard";

export const OrdersPage: React.FC = () => {
    const { data: orders, isSuccess } = useGetAllOrdersQuery(1);

    return <>
        <Nav />
        <div className="orders-page-container">
            <SiderBar />
            <div className="orders">
        <h1>Orders</h1>

            <div className="order-card order-card-title">
                    <div className="order">
                        <div className="order-number"><p>#</p></div>
                        <div className="customer-name"><p>Customer Name</p></div>
                        <div className="customer-mail"><p>Customer Email</p></div>
                        <div className="purchase-date"><p>Date Purchased</p></div>
                        <div className="amount"><p>Total</p></div>
                    </div>
                </div>
                {
                    isSuccess && orders.data.map((order, i) => {
                        return <OrderCard
                            id={i}
                            created_at={order.created_at}
                            email={order.email}
                            name={order.name}
                            order_items={order.order_items}
                            total={order.total}
                            key={i}
                        />
                    })
                }
            </div>
        </div>
    </>
}