

interface containerprops{
    children:React.ReactNode
}

export const ChartContainer:React.FC<containerprops> = ({children}) => {
    return <>
        <div className="chart-container">
            {children}
        </div>
    </>
}