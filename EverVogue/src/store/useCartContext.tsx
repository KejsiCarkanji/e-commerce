import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { CartItem, Product } from "../common/types/types";
import { saveToLocalStorage } from "../utils/localStorageUtils";

interface CartContextType {
    productsAdded: CartItem[];
    addProduct: (product: Product, quantity?: number) => void;
    decreaseQuantity: (product: Product) => void;
    deleteProduct: (product: Product) => void;
    totalProducts: () => number;
    clearCart: () => void;
    calculateTotal: () => number;
}

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
        saveToLocalStorage("productsAdded", productsAdded);
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

export const useCartContext = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useProductsContext must be used within a ProductContextProvider");
    }
    return context;
};
