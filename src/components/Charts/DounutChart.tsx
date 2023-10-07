import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
export type piedata = { name: string; value: number; }
interface PieChartProps {
    piData: piedata[];
    loading: boolean;
}


export const DounutChart: React.FC<PieChartProps> = ({ piData}) => {
    const piRef: any = useRef(null);
    const [piChartInstance, setPiChartInstance] = useState<Chart | null>(null);



    useEffect(() => {
        let newChartInstancePie: any = null;

        if (Object.keys(piData).length > 0 && piRef.current) {
            if (piChartInstance) {
                piChartInstance.destroy();
            }
            const labels: string[] = []
            piData.map((piedata) => {
                for (const key in piedata) {
                    if (key === "name") {
                        labels.push(piedata[key].split(",")[0])
                    }
                }
            })
            const data = Object.values(piData);

            const piDataPie = {
                labels: labels,
                datasets: [
                    {
                        label: "Sold USD",
                        data: data,
                        borderWidth: 0,
                        spacing: 10
                    },
                ],
            };

            const chartOptions = {
                plugins: {
                    legend: {
                        display: false,

                    },
                    title: {
                        display: true,
                        text: "Earning Report",
                        color: "#000000",
                        font: {
                            weight: 700,
                            size: 14,
                            family: " Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"

                        }

                    },
                },
            };

            const ctxPie = piRef.current.getContext("2d");
            newChartInstancePie = new Chart(ctxPie, {
                type: "doughnut",
                data: piDataPie,
                options: chartOptions as any,
            });
        }

        setPiChartInstance(newChartInstancePie);

        return () => {
            if (newChartInstancePie) {
                newChartInstancePie.destroy();
            }
        };
    }, [piData]);

    return (
        <div className='charts' >
            <canvas id="pie-chart" ref={piRef} />
        </div>
    );
};


