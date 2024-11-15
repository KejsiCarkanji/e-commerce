import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { getFromLocalStorage } from "../utils/localStorageUtils";

interface Product {
    id: string; 
    title: string;
    price: number;
    description: string;
    image: string; 
}

interface ProductContextType {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductsContextProviderProps {
    children: ReactNode; 
}

export const ProductsContextProvider = ({ children }: ProductsContextProviderProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
            setProducts(getFromLocalStorage('products'));        
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductsContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductsContext must be used within a ProductsContextProvider');
    }
    return context;
};
