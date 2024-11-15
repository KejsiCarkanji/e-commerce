import React from 'react';
import NavBars from "../common/layout/NavBars";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  Button, TextField } from '@mui/material';
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
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);

    const handleClick = (product: Product, quantity: number) => {
        addProduct(product, quantity);
        setOpen(true);

    }

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    return (
        <>
            <NavBars />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  style={{ padding: '20px' }}>
                {products.length > 0 ? (
                    products.map((product: Product, index: number) => (
                        <Grid  size={{ xs: 12, sm: 4, md: 4 }} key={product.id} >
                            <Card sx={{height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <CardMedia
                                    component="img"
                                    alt={product.title}
                                    sx={{height: '65%', maxWidth: '80%', textAlign: 'center'}}   
                                    image={product.image}
                                    title={product.title}
                                />
                                <CardContent sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography variant="h6">{product.title}</Typography>
                                    <Typography variant="body1" color="textPrimary">
                                        ${product.price}
                                    </Typography>
                                    <TextField type="number" size='small' sx={{width: '30%', marginTop: '8px'}} label="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}/>
                                    <Button variant="contained" onClick={() => handleClick( product, quantity)} color="primary" style={{ marginTop: '10px' }} >
                                        Add to Cart
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" style={{ textAlign: 'center', width: '100%' }}>
                        No products available.
                    </Typography>
                )}
            </Grid>
            <div>
      <SnackBar
        open={open}
        autoHideDuration={700}
        onClose={handleClose}
        message="Product added to cart"       
      />
    </div>
        </>
    );
};

export default Products;
