import { useParams } from "react-router-dom"
import { Nav } from "../components/nav/Nav"
import "../styles/productpage/productpage.style.css"
import { useEffect, useState } from "react"
import { ProductData } from "../Utils/ProductPage/ProductData"
import { fetchProductDetail } from "../Utils/ProductPage/fetchProductDetail"

export const ProductPage:React.FC=()=>{
    const {id}  = useParams()
    const [productData, setProductData] = useState<ProductData | null>(null)
    useEffect(()=>{
     const fetchproductData = async (id:number)=>{
         const data = await fetchProductDetail(id)
         setProductData(data)
     }
    fetchproductData(+id!)
    },[])
    return<>
     <Nav/>
     <div className="product-container">
        <div className="product-details_main">
            <div className="title">
                <h1>{productData && productData.name}</h1>
                <button onClick={()=>{window.history.back()}} >Back</button>
            </div>

            <h2>Price: ${productData && productData.price}</h2>
            <p><strong>Category:</strong> {productData && productData.category}</p>
            <div className="product-buttons">
            <button>Delete Product</button>
            <button>Edit Product</button>
            </div>
        </div>
        <div className="product-details_image">
            <img src={productData ? productData.image:''} alt="product image" />
        </div>
        <div className="product-details_secondary">
            <h3>Description</h3>
            <p>
                {productData && productData.description}
            </p>
        </div>        
     </div>
    </>
}