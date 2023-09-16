import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { SalesData, fetchSalesData } from '../../Utils/util';


export const BarSalesChart = () => {
  const [fetchedData, setData] = useState<SalesData[] | []>([]);

  useEffect(
    () => {
      const pullData = async () => {
        const fetched = await fetchSalesData()
        fetched.map((data,i)=>{
          const latestData = (fetched.length - 15)
           if(i > latestData){           
             setData(prev=>{
              return [
               ...prev,
                data
              ]
             })
           }
        })
      }
      pullData()
      return setData([])
    },
    []
  );

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Sales',
        color:"#000000",
        font:{
          weight: 700,
          size: 14,
          family: " Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"

      }
      },
      
    },
    scales: {
      x: {
        border: {
          display: false
        },
        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        }
      },
      y: {
        border: {
          display: false
        },
        grid: {
          display:false,
          drawOnChartArea: false,
          drawTicks: false
        },
      }
    }
  };

  
  const data = {
    labels: (fetchedData as any).map((element:any) => {
      for (const key in element) {
        if (key == 'date') {
          return element[key]
        }
      }

    }),
    datasets: [
      {
        label: 'Sales',
        data: (fetchedData as any).map((element:any) => {
          for (const key in element) {
            if (key !== 'date') {
              return element[key]
            }
          }
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: '#40F8FF',
             
      },

    ],
  };

  return <Bar options={options as any} data={data} style={{ height: "100%", width: '100%' }} />;
}


