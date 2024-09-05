import axiosClient from '../Config/ApiConfig';
import {ICategory} from '../interface/category';

export const categoryApi = {
  getAll(): Promise<ICategory> {
    const url = '/products/categories';
    return axiosClient.get(url);
  },
};
