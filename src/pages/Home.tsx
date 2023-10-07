import { BarSalesChart } from "../components/Charts/BarChart";
import { ChartContainer } from "../components/Charts/ChartContainer";
import { Nav } from "../components/nav/Nav";
import { SideBar } from "../components/sidebar/SideBar";
import { ToastContainer } from 'react-toastify';
import "../styles/Home/home.style.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { TopSellingProduct } from "../components/Home/TopSellingProduct";
import ordersIcon from "../assets/form-svgrepo-com.svg"
import userIcon from "../assets/users-svgrepo-com (1).svg"
import profitIcon from "../assets/cash-svgrepo-com.svg"
import { DounutChart, piedata } from "../components/Charts/DounutChart";
import { AdminCard } from "../components/Home/AdminCards";
import { useNavigate } from "react-router-dom";

type topProducts = {
    id: number;
    price: number;
    image: string;
    names: string;
    total_price: string;
    total_quantity: string
}
export const Home = () => {
    const navigate = useNavigate()
    const [topProducts, setTopProduct] = useState<null | topProducts[]>(null)
    let pieData: piedata[] = []
    if (topProducts) {
        topProducts.map((product, i) => {
            if (i > 4) return;
            pieData.push({ name: product.names, value: +product.total_price })
        })
    }
    useEffect(() => {
        const fetchTopProducts = async () => {
            await axios.get("http://localhost:3000/api/top-products", {
                withCredentials: true
            }).then(res => {
                if (res.status == 200) {
                    setTopProduct(res.data)
                }
            }).catch(e => {
                console.log(e.response.data);
            })
        }
        fetchTopProducts();



    }, [])


    return <>
        <Nav />
        <section id="main">
            <SideBar />
            <article id="main-content">
                <div className="cards">
                    <AdminCard
                        name="Orders"
                        icon={ordersIcon}
                        key={1}
                        dataKey="sales"
                    />
                    <AdminCard
                        name="Profits"
                        icon={profitIcon}
                        key={2}
                        dataKey="profit"
                    />
                    <AdminCard
                        name="Users"
                        dataKey="sales"
                        icon={userIcon}
                        key={3}
                    />
                </div>
                <div className="sales-analytics">
                    <ChartContainer>
                        <BarSalesChart />
                    </ChartContainer>
                </div>
                <div className="products-charts">
                    <DounutChart
                        piData={pieData}
                        loading={true}
                        key={1}
                    />
                </div>
                <div className="top-products">
                    <h3>Top Selling Products</h3>
                    <table>
                        <thead>
                            <tr className="top-product">
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Units Sold</th>
                                <th>Total Sales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                topProducts && topProducts.map((product, i) => {
                                    if (i > 4) return;
                                    return <TopSellingProduct
                                        key={i}
                                        rank={(i + 1)}
                                        name={product.names.split(',')[0]}
                                        price={product.price}
                                        units_sold={product.total_quantity}
                                        total_sales={product.total_price}
                                        onClick={() => { navigate(`products/${product.id}`) }}
                                    />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
        <ToastContainer />


    </>


}