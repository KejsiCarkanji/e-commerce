import React from 'react';
import NavBars from "../common/components/NavBars";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid2';
import { useProductsContext } from '../store/useProductsContext';
import { useState } from 'react';
import { useCartContext } from '../store/useCartContext';
import SnackBar from '@mui/material/Snackbar';

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    image: string;
}

const Products = () => {
    const { products } = useProductsContext();
    const { addProduct } = useCartContext()
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [open, setOpen] = useState(false);

    const handleClose = ( event: React.SyntheticEvent | Event, reason?: string ) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);
    };

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        setQuantities( { ...quantities, [productId]: newQuantity });
    };

    const handleClick = (product: Product) => {
        const quantity = quantities[product.id] || 1; 
        addProduct(product, quantity);
        setOpen(true);
        setQuantities({ ...quantities, [product.id]: 1 });
    };

    return (
        <>
            <NavBars />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  style={{ padding: '20px' }}>
                {products.length > 0 ? (
                    products.map((product: Product) => (
                        <Grid  size={{ xs: 12, sm: 4, md: 4 }} key={product.id} >
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: 0}}>
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    sx={{height: '65%', maxWidth: '80%', textAlign: 'center'}}   
                                    image={product.image}
                                    title={product.title}
                                />
                                <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography variant="h6">{product.title}</Typography>
                                    <Typography variant="body1" color="textPrimary">
                                        ${product.price}
                                    </Typography>
                                    <TextField type="number" size='small' sx={{width: '30%', marginTop: '8px'}} label="Quantity" value={quantities[product.id] || 1} 
                                    onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}/>
                                </CardContent>
                                <CardActions style={{ marginTop: '10px' }}>
                                    <Button variant="contained" onClick={() => handleClick( product )} color="primary">
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" style={{ textAlign: 'center', width: '100%' }}>
                        No products available.
                    </Typography>
                )}
            </Grid>
            <SnackBar
                open={open}
                autoHideDuration={700}
                onClose={handleClose}
                message="Product added to cart"       
            />    
        </>
    );
};

export default Products;
