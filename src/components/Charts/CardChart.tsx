import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { OrdersData } from "../../Utils/Dashboard/OrdersData";





export const CardChart:React.FC<{data:OrdersData,dataKey:string} > =({data,dataKey})=>{
  const color = "#40F8FF"
  return (
    <ResponsiveContainer height={"98%"} width={"100%"} aspect={1.7}>
    <AreaChart
    data={data as any}
    >
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={color}  stopOpacity={0.8}/>
      <stop offset="95%" stopColor={color}  stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
      <stop offset="95%" stopColor={color} stopOpacity={0}/>
    </linearGradient>
  </defs>
  <Tooltip />
  <Area type="monotone" dataKey={dataKey} stroke={color} fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
</ResponsiveContainer>
  );
}
