import React, {createContext, useContext, useState} from 'react';
import {IProduct, IProductList} from '../interface/product';
import {productApi} from '../Api/productApi';

// Define the context type
type ItemContextType = {
  items: IProduct[];
  setItems: React.Dispatch<React.SetStateAction<IProduct[]>>;
  itemFavorite: IProduct[];
  handleItemToFavorites: (item: IProduct) => void;
  fetchItems: () => Promise<void>;
  fetchItemsByCategory: (category: string) => Promise<void>;
  isItemFavorite: (itemId: number) => boolean;
  fakeSearchItem: () => Promise<void>;
  searchItem: (search: string) => void;
  itemSearch: IProduct[];
  setItemSearch: React.Dispatch<React.SetStateAction<IProduct[]>>;
};

// Create the context
const ItemContext = createContext<ItemContextType | undefined>(undefined);

// Create the provider
export const ItemProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [items, setItems] = useState<IProduct[]>([]);
  const [itemFavorite, setItemFavorite] = useState<IProduct[]>([]);
  const [itemSearch, setItemSearch] = useState<IProduct[]>([]);
  const fetchItems = async () => {
    try {
      const response: IProductList = await productApi.getAll();
      setItems(response);
    } catch (error) {
      console.log('Failed to fetch items: ', error);
    }
  };

  const fetchItemsByCategory = async (category: string) => {
    try {
      const response: IProductList = await productApi.getByCategory(category);
      setItems(response);
    } catch (error) {
      console.log('Failed to fetch items by category: ', error);
    }
  };

  const handleItemToFavorites = (item: IProduct) => {
    const isFavorite = itemFavorite.some(favorite => favorite.id === item.id);
    if (isFavorite) {
      setItemFavorite(itemFavorite.filter(favorite => favorite.id !== item.id));
    } else {
      setItemFavorite([...itemFavorite, item]);
    }
  };

  const isItemFavorite = (itemId: number) => {
    return itemFavorite.some(item => item.id === itemId);
  };
  //fake search item
  const fectchSearchItem = async () => {
    try {
      const response: IProductList = await productApi.getAll();
      setItemSearch(response);
    } catch (error) {
      console.log('Failed to fetch items: ', error);
    }
  };

  const searchItem = (search: string) => {
    const searchItem = itemSearch.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
    setItems(searchItem);
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        itemFavorite,
        handleItemToFavorites,
        fetchItems,
        fetchItemsByCategory,
        isItemFavorite,
        fakeSearchItem: fectchSearchItem,
        searchItem,
        itemSearch,
        setItemSearch,
      }}>
      {children}
    </ItemContext.Provider>
  );
};

// Create the hook
export const useItem = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error('useItem must be used within an ItemProvider');
  }
  return context;
};

export default ItemContext;
