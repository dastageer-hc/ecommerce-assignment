import axios from 'axios';
import { Product } from '../store/useStore';

const API_BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products. Please try again.');
  }
};

export const fetchProduct = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product details. Please try again.');
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories. Please try again.');
  }
};