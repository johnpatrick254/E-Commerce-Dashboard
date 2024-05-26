import { useState } from "react"
import { useGetAllProductsQuery } from "../../api/Products.slice"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel"
import { ProductCard } from "./ProductCard"

export const ProductPageCategory: React.FC<{ category: string }> = ({ category }) => {
    const [show, setShow] = useState(false);
    const { data: productData } = useGetAllProductsQuery({ page: "1", category: category })

    return <>
        <div className="product-category">
            <h2>{category}</h2>
            <Carousel className="w-full relative h-52" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <CarouselContent className="-ml-3">
                    {
                        productData?.data.map((product, index) => {
                            return <CarouselItem key={index} className="pl-3 md:basis-1/2 lg:basis-1/3 max-w-52 hover:cursor-pointer">
                                <ProductCard
                                    id={product.id}
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                />
                            </CarouselItem>
                        })
                    }
                </CarouselContent>
                {
                    show
                    &&
                    <>
                        <CarouselPrevious className="absolute left-5 top-12 sm:hidden md:flex hover:cursor-pointer" />
                        <CarouselNext className="absolute right-5 top-12 sm:hidden md:flex hover:cursor-pointer" />
                    </>
                }
            </Carousel>

        </div>
    </>
}

