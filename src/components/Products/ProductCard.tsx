import { useNavigate } from "react-router-dom"

interface ProductCardProps {
    name: string,
    id:number,
    image: string,
    price: number,
    onclick?:()=>void
}

export const ProductCard: React.FC<ProductCardProps> = ({name,image,id,price})=>{
  const navigate = useNavigate()
 return <>
<div className="product-card" id={`${id}` } onClick={()=>{navigate(`/products/${id}`)}}>
    <div className="product-card_image">
        <img src={image} alt="product image" />
    </div>
    <div className="product-card_details">
        <h3>{name}</h3>
        <h2>${price}</h2>
    </div>
</div>
 </>
}