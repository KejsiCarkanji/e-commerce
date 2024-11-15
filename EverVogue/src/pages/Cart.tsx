import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NavBars from "../common/layout/NavBars";
import { useCartContext } from "../store/useCartContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


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

export default function Cart() {
  const { productsAdded, addProduct, decreaseQuantity, deleteProduct, 
    clearCart, calculateTotal } = useCartContext();
    const navigate = useNavigate();

  return (
    <Box >
      <NavBars />
      <Box sx={{ mt: 2, padding: 2 }}>
        {productsAdded.length > 0 ? (
          <>
            {productsAdded.map((item: CartItem) => (
              <Box key={item.product.id} sx={{ display: 'flex', marginBottom: 2 }}>
                <img src={item.product.image} alt={item.product.title} style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 16 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.product.title}</Typography>
                  <Typography variant="body1">{item.product.price}€</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={() => addProduct(item.product)} variant="outlined" size="small" sx={{ mr: 1 }}>+</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button onClick={() => decreaseQuantity(item.product)} variant="outlined" size="small" sx={{ ml: 1 }}>–</Button>
                    <IconButton onClick={() => deleteProduct(item.product)} sx={{ ml: 2 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>Total: {calculateTotal()}€</Typography>
            <Button onClick={clearCart} variant="contained" color="secondary" sx={{ mt: 2 }}>
              Clear Cart
            </Button>
            <Button onClick={() => navigate('/checkout')} variant="contained" color="primary" sx={{ mt: 2 }}>Checkout</Button>
          </>
        ) : (
          <Typography variant="h6">Cart is empty</Typography>
        )}
      </Box>
    </Box>
  );
}
