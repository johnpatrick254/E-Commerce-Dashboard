import { useNavigate } from "react-router-dom"

interface ProductCardProps {
    name: string,
    id: number,
    image: string,
    price: number,
    onclick?: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, image, id, price }) => {
    const navigate = useNavigate()
    return <>
        <div className="w-full h-full flex flex-col space-y-2 py-2" id={`${id}`} onClick={() => { navigate(`/products/${id}`) }}>
            <div className="w-full h-[60%]">
                <img src={image} className="w-full h-full" alt="product image" />
            </div>
            <div className="product-card_details space-y-2">
                <p className="text-sm font-bold">{name}</p>
                <p className="text-xs font-semibold">${price}</p>
            </div>
        </div>
    </>
}