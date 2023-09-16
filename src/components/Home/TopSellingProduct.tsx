interface TopProductProps {
    name?:string;
    price?:number;
    total_sales?:string;
    rank?:number;
    units_sold?:string;
    onClick:()=>void
}

export const TopSellingProduct: React.FC<TopProductProps> = ({name,price,total_sales,rank,units_sold,onClick})=>{

 return <>
 <tr className="top-product" onClick={onClick}>
    <td>{rank}.</td>
    <td className="td-name">{name}</td>
    <td>${price}</td>
    <td>{units_sold}</td>
    <td>${total_sales}</td>
 </tr>
 </>
}