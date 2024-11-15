import { createContext, useState, useContext, ReactNode } from "react";
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
    const [products, setProducts] = useState<Product[]>(() => getFromLocalStorage('products')); 
 
    // products supzohej te perdorej nga faqet e tjera qe supozohet te ishin ne sidebar,
    // prandaj e kam vene ne context

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
