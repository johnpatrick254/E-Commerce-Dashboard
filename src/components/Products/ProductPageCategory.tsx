import { useGetAllProductsQuery } from "../../api/Products.slice"
import { ProductCard } from "./ProductCard"

export const ProductPageCategory: React.FC<{ category: string }> = ({ category }) => {

    const { data: productData} = useGetAllProductsQuery({ page: "1", category: category })

    return <>
        <div className="product-category">
            <h2>{category}</h2>
            <div className="products">
                {
                    productData?.data.map(product => {
                        return <ProductCard
                           id={product.id}
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    })
                }
            </div>

        </div>
    </>
}