import NavBars from "../common/layout/NavBars"
import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

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

const History: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Retrieve products with quantities from local storage
    const storedProducts = localStorage.getItem("productsOrdered");
    if (storedProducts) {
        setCartItems(JSON.parse(storedProducts));
    }
}, []);
  return (
    <>
    <NavBars />

    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ padding: 2 }}>
            {cartItems.map((item) => (
                <Grid size={{ xs: 12, sm: 4, md: 4 }} key={item.product.id}>
                    <Card sx={{height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <CardMedia
                            component="img"
                              image={item.product.image}
                            alt={item.product.title}
                            sx={{height: '60%', maxWidth: '50%', textAlign: 'center'}}   

                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {item.product.title}
                            </Typography>
                           
                            <Typography variant="h6" color="primary">
                                ${item.product.price} x {item.quantity}
                            </Typography>
                            
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </>
  )
}

export default History;


