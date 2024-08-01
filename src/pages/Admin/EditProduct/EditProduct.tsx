import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
}

const EditProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (productId) {
      axios.get<Product>(`/api/products/${productId}`)
        .then((response: AxiosResponse<Product>) => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the product!", error);
        });
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productId) {
      axios.put(`/api/products/${productId}`, product)
        .then(() => {
          alert('Product updated successfully');
          navigate('/');
        })
        .catch(error => {
          console.error("There was an error updating the product!", error);
        });
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProduct;
