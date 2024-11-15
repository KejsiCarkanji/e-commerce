import NavBars from "../common/layout/NavBars"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCartContext } from "../store/useCartContext";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";


export default function Checkout() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
    console.log("productsAdded", productsAdded);
    localStorage.setItem("productsOrdered", JSON.stringify(productsAdded));
      setOpen(false);
    };

    const { register, formState: { errors }, getValues } = useForm();
    const { clearCart, calculateTotal, productsAdded, totalProducts } = useCartContext();

    return (
      <>
        <NavBars />
        <form style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '50%', margin: 'auto', marginTop: '2rem' }}>
          <TextField label="First Name" variant="outlined" 
          {...register("firstName", 
          { required: "First name is required"})}
          error={!!errors.firstName}
          helperText={errors.firstName?.message as string}
          />
          <TextField label="Last Name" variant="outlined" 
          {...register("Last name", { required: "Last name is required"})}
          error={!!errors.lastName}
          helperText={errors.lastName?.message as string}
          />
          <TextField label="Address" variant="outlined" 
          {...register("Address", { required: "Address is required"})}
          />
          <TextField label="City" variant="outlined" 
          {...register("City", { required: "City is required"})}
          />
          <TextField label="Postal Code" variant="outlined" 
          {...register("Postal Code", { required: "Postal Code is required"})}
          />
          <TextField label="Country" variant="outlined" 
          {...register("Country", { required: "Country is required"})}
          />
          <Typography variant="h5">Number of products: {totalProducts()} </Typography>
          <Typography variant="h5">Total: {calculateTotal()}€</Typography>
          <Button onClick={handleClickOpen} variant="contained" color="primary" >Place Order</Button>    
        </form>
         
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to place your order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Address: {getValues("Address")}, {getValues("City")}, 
            {getValues("Postal Code")}, {getValues("Country")}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Total: {calculateTotal()}€
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      </>
    )
}