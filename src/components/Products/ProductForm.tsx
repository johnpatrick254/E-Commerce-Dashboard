import { useEffect, useState } from "react";
import { useUpdateProductMutation } from "../../api/Products.slice";

type FormData = {
  display: boolean;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image?: File | string;
  setDisplayForm:(p:boolean)=>void
};

export const ProductForm: React.FC<FormData> = ({
  display,
  setDisplayForm,
  name,
  description,
  price,
  category,
}) => {

  const [updateProduct, _isLoading] = useUpdateProductMutation()

  const initialFormData = {
    name: name,
    description: description,
    price: price,
    category: category,
  };

  const [formData, setFormData] = useState<any>(initialFormData);
useEffect(()=>{
setFormData(initialFormData)
},[display])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file !== undefined) {
      setFormData({
        ...formData,
        ['image']: file,
      });
    }

  }; 

  const handleCancelForm =()=>{
    setDisplayForm(!display);
    setFormData(initialFormData);
  }
  const handleSubmit = () => {
    updateProduct({ body: formData })
  }
  return (
    <>
      {display && (
        <div className="product-form">
          <form onSubmit={handleSubmit}>
            <button className="cancel" onClick={handleCancelForm}>Cancel</button>
            <div className="header">
              <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="product-name"
                value={formData.name}
                onChange={handleInputChange}
              />
              </div>
              <div>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
              />
              </div>
            </div>
            <div className="textarea">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              cols={30}
              rows={10}
              value={formData.description}
              id="description"
              onChange={handleInputChange}
              placeholder="Enter Description"
            >
            </textarea>
            </div>
            <div className="footer">
              <div>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
              />
              </div>
              <div>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              </div>
            </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      )}
    </>
  );
};
