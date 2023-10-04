import { useParams } from "react-router-dom"
import { Nav } from "../components/nav/Nav"
import "../styles/productpage/productpage.style.css"
import { useDeleteProductMutation, useGetProductByIDQuery } from "../api/Products.slice"
import { useState } from "react"
import { ProductForm } from "../components/Products/ProductForm"

export const ProductPage: React.FC = () => {
    const { id } = useParams();
    const [deleteProduct, _isLoading] = useDeleteProductMutation();
    const { data: productData } = useGetProductByIDQuery(id!);
    const [displayForm, setDisplayForm] = useState(false);

    return <>
        <Nav />
        <div className="product-container">
            <div className="product-details_main">
                <div className="title">
                    <h1>{productData && productData.name}</h1>
                    <button onClick={() => { window.history.back() }} >Back</button>
                </div>
                <h2>Price: ${productData && productData.price}</h2>
                <p><strong>Category:</strong> {productData && productData.category}</p>
                <div className="product-buttons">
                    <button onClick={() => { setDisplayForm(!displayForm) }} >
                        Edit Product</button>
                    <button onClick={() => {
                        deleteProduct(id!);
                        window.history.back()
                    }}>Delete Product</button>
                </div>
            </div>
            <div className="product-details_image">
                <img src={productData ? productData.image : ''} alt="product image" />
            </div>
            <div className="product-details_secondary">
                <h3>Description</h3>
                <p>
                    {productData && productData.description}
                </p>
            </div>
        </div>
        <ProductForm
            id={id!}
            display={displayForm}
            name={productData?.name}
            category={productData?.category}
            price={productData?.price}
            description={productData?.description}
            setDisplayForm={setDisplayForm}
        />


    </>
}