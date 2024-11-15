import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define types for product and cart item
interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    image: string;
}

interface CartItem {
    product: Product;
    quantity: number;
}

// Define the context type
interface CartContextType {
    productsAdded: CartItem[];
    addProduct: (product: Product, quantity?: number) => void;
    decreaseQuantity: (product: Product) => void;
    deleteProduct: (product: Product) => void;
    totalProducts: () => number;
    clearCart: () => void;
    calculateTotal: () => number;
}

// Create the context with an initial value of undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextProviderProps {
    children: ReactNode;
}

export const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
    const getStoredProducts = (): CartItem[] => {
        const storedProducts = localStorage.getItem("productsAdded");
        return storedProducts ? JSON.parse(storedProducts) : [];
    };

    const [productsAdded, setProductsAdded] = useState<CartItem[]>(() => getStoredProducts());

    useEffect(() => {
        localStorage.setItem("productsAdded", JSON.stringify(productsAdded));
    }, [productsAdded]);

    const addProduct = (product: Product, quantity: number = 1): void => {
        const productFound = productsAdded.find((item) => item.product.id === product.id);
        if (productFound) {
            const updatedProducts = productsAdded.map((item) =>
                item.product.id === productFound.product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
            setProductsAdded(updatedProducts);
        } else {
            setProductsAdded([...productsAdded, { product, quantity }]);
        }
    };

    const decreaseQuantity = (product: Product): void => {
        const productFound = productsAdded.find((item) => item.product.id === product.id);
        if (productFound && productFound.quantity > 1) {
            const updatedProducts = productsAdded.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            );
            setProductsAdded(updatedProducts);
        } else {
            const updatedProducts = productsAdded.filter((item) => item.product.id !== product.id);
            setProductsAdded(updatedProducts);
        }
    };

    const deleteProduct = (product: Product): void => {
        const updatedProducts = productsAdded.filter((item) => item.product.id !== product.id);
        setProductsAdded(updatedProducts);
    };

    const clearCart = (): void => {
        setProductsAdded([]);
        localStorage.removeItem("productsAdded");
    };

    const calculateTotal = (): number => {
        return productsAdded.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const totalProducts = (): number => {
        return productsAdded.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{ productsAdded, addProduct, decreaseQuantity, deleteProduct, totalProducts, clearCart, calculateTotal }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for using the ProductContext
export const useCartContext = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useProductsContext must be used within a ProductContextProvider");
    }
    return context;
};
