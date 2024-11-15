export  interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
  }
