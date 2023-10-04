import { useEffect, useState } from "react";
import { useCreateProductMutation, useUpdateProductMutation } from "../../api/Products.slice";
import { toast } from 'react-toastify';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

type FormData = {
  id?:string;
  display?: boolean;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image?: File | string;
  setDisplayForm: (p: boolean) => void
};

export const ProductForm: React.FC<FormData> = ({
  display,
  setDisplayForm,
  name,
  description,
  price,
  category,
  id
}) => {

  const [updateProduct, _isLoading] = useUpdateProductMutation();
  const[createProduct]= useCreateProductMutation()

  let initialFormData:any = {
    id:id,
    name: name,
    description: description,
    price: price,
    category: category,
  };

  const [formData, setFormData] = useState<any>(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialFormData)
  }, [display])
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

  const handleCancelForm = () => {
    setDisplayForm(!display);
    setFormData(initialFormData);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updates;
   
    if (formData.image) {
      const imageForm = new FormData()
      imageForm.append("image",formData.image)   
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/upload',
        data: imageForm,
        withCredentials: true
      };
      const imageUrl: Promise<string | null> = await axios.request(config)
        .then((response) => {
          return response.data.url;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
      if (imageUrl !== null && imageUrl !== undefined) {
        const { id, ...data } = formData     
        updates = { ...data, ['image']: imageUrl }
      }else{
        toast("Image Upload Failed");
        setLoading(false)
        return;
      }

    } else {
      const { image,id, ...data } = formData
      updates = data
      
    }
    if(id){
      updateProduct({ id:id,body: updates });
    }else{
       const original_price = formData.price -((formData.price * 20) / 100 )
       const body ={
        ...updates,
        ['original_price']: original_price,
      }
      createProduct({body:body})
    }
    setDisplayForm(!display);
    setLoading(false)

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
           { loading ? <ClipLoader className="spinner" color="#000000" size={"1.85rem"} />: <button type="submit" onClick={e=>{e.preventDefault();setLoading(true);handleSubmit(e as any)}}>Submit</button>}
          </form>
        </div>
      )}
    </>
  );
};
