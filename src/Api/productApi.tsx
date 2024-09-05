import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import axiosClient from '../Config/ApiConfig';

export const productApi = {
  getAll(): Promise<any> {
    const url = '/products';
    return axiosClient.get(url);
  },
  getByCategory(categoryId: string): Promise<any> {
    const url = `/products/category/${categoryId}`;
    return axiosClient.get(url);
  }
};
