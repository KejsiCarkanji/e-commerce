import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define the Product type
// Define the Product type
interface Product {
    id: string; // Add this line
    title: string;
    price: number;
    description: string;
    image: string; // Assuming the image is a base64 string or URL
}

// Define the context value type, including both `products` and `setProducts`
interface ProductContextType {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Create the context with a default value of `undefined`
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Define the props for the provider component
interface ProductsContextProviderProps {
    children: ReactNode; // `children` can be any valid React node
}

export const ProductsContextProvider = ({ children }: ProductsContextProviderProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        try {
            // Retrieve products from local storage
            const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
            if (Array.isArray(storedProducts)) {
                setProducts(storedProducts);
            }
        } catch (error) {
            console.error('Failed to parse products from local storage', error);
            setProducts([]);
        }
    }, []);

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

// Create a custom hook for accessing the context
export const useProductsContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductsContext must be used within a ProductsContextProvider');
    }
    return context;
};
