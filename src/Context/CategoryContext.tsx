import React, { createContext, useContext, useState } from 'react';
import { ICategory } from '../interface/category';
import { categoryApi } from '../Api/categoryApi';

// Define the context type
type CategoryContextType = {
  listCategory: ICategory;
  fetchCategory: () => Promise<void>;
};

// Create the context
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Create the provider
export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [category, setCategory] = useState<string>('');
  const [listCategory, setListCategory] = useState<ICategory>([]);

  const fetchCategory = async () => {
    try {
      const response = await categoryApi.getAll();
      setListCategory(['All', ...response]);
    } catch (error) {
      console.log('Failed to fetch category: ', error);
    }
  };

  return (
    <CategoryContext.Provider value={{ listCategory, fetchCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Create the hook
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

export default CategoryContext;