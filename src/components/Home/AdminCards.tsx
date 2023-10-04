import { useEffect, useState } from "react";
import { CardChart } from "../Charts/CardChart";
import { fetchTotalOrders } from "../../Utils/Dashboard/fetchTotalOrders";
import { fetchTotalUsers } from "../../Utils/Dashboard/fetchTotalUsers";
import { OrdersData } from "../../Utils/Dashboard/OrdersData";
import { fetchTotalOrdersChartData } from "../../Utils/Dashboard/fetchTotalOrdersChartData.1";
import { profitData } from "../../Utils/Dashboard/profitData";
import { fetchProfitData } from "../../Utils/Dashboard/fetchProfitData";

type AdminCardProp = {
    name: string;
    icon: string;
    dataKey:string

}
export const AdminCard: React.FC<AdminCardProp> = ({ name, icon,dataKey }) => {
    const [chartData, setChartData] = useState<OrdersData|profitData[]|null>(null)
    const [totals, setTotals] = useState<number | null>(null)

    useEffect(() => {
        const setCardData = async (name: string) => {
            switch (name) {
                case "Orders":
                    const OrdersData = await fetchTotalOrdersChartData()
                    const totalsData = await fetchTotalOrders()
                    setChartData(OrdersData);
                    setTotals(totalsData)
                    break;
                case "Users":
                    const usersData = await fetchTotalOrdersChartData()
                    const totalsUsers = await fetchTotalUsers()
                    setChartData(usersData);
                    setTotals(totalsUsers)
                    break;
                case "Profits":
                    const profitData = await fetchProfitData()
                    const totalProfit = profitData!.reduce((a,b)=> a + +b.profit,0)
                    const profitChartData:profitData[] =[]
                    profitData!.map((data)=>{
                         profitChartData.push(({
                            date: new Date(data.date).toDateString(),
                            profit:data.profit
                         }))
                    } )
                    
                    setChartData(profitChartData );
                    setTotals(+totalProfit)
                    break;
                default:
                    break;
            }
        }
        setCardData(name)
    }, [])

    return <>
        <div className="admin-card">
            <div className="admin-card-data">
                <div className="text">
                    <h2>{totals && totals}+</h2>
                    <p>Total {name}</p>
                </div>
                <div className="icon">
                    <img src={icon} alt="card icon" />
                </div>
            </div>
            <div className="card-chart-data">
                {chartData && <CardChart dataKey={dataKey} data={chartData as any} />}
            </div>
        </div>


    </>
}