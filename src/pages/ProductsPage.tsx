import { ProductPageCategory } from "../components/Products/ProductPageCategory";
import { Nav } from "../components/nav/Nav";
import "../styles/sidebar/sidebar.style.css"
import "../styles/products-page/products-page.style.css"
import { SiderBar } from "../components/sidebar/SideBar";
import { useState } from "react";
import { ProductForm } from "../components/Products/ProductForm";

export const ProductsPage: React.FC = () => {
    const productCategories = [
        "Electronics",
        "Clothing",
        "Home and Kitchen",
        "Sports and Outdoors",
        "Beauty and Personal Care"
        
    ];
    const [displayForm, setDisplayForm] = useState(false);


    return <>
        <Nav />
        <div className="products-page-container">
            <SiderBar />
            <div className="categories">
                <div className="products-header">  <p onClick={()=>{setDisplayForm(true)}}>Add Product</p></div>
                {
                    productCategories.map((category, i) => {
                        return <ProductPageCategory
                            key={i}
                            category={category}
                        />
                    })
                }
        
            </div>
            <ProductForm
            display={displayForm}
            name={""}
            category={""}
            price={0}
            description={""}
            setDisplayForm={setDisplayForm}
        />
        </div> 
    </>
}