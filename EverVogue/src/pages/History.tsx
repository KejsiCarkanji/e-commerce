import NavBars from "../common/components/NavBars"
import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { CartItem } from "../common/types/types.ts";
import { getFromLocalStorage } from "../utils/localStorageUtils.ts";

const History: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getFromLocalStorage('productsOrdered'))
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


