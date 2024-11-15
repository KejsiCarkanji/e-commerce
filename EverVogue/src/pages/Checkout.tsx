import NavBars from "../common/components/NavBars"
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
import ReusableForm from "../common/components/ReusableForm";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorageUtils";
import { useNavigate } from "react-router";

export default function Checkout() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
        console.log("productsAdded", productsAdded);
        const existingOrders = getFromLocalStorage("productsOrdered");
        const updatedOrders = [...existingOrders, ...productsAdded];
        saveToLocalStorage("productsOrdered", updatedOrders);
        setOpen(false);
        clearCart();
        reset();
        navigate('/history');
    };

    const form = useForm();
    const { reset } = form;
    const {  calculateTotal, productsAdded, totalProducts, clearCart } = useCartContext();

    return (
      <>
        <NavBars />
        <form style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '50%', margin: 'auto', marginTop: '2rem', backgroundColor:  '#fff', padding: '2rem', borderRadius: '10px' }}>
          <ReusableForm
          formIndex= {0}
          form={form}
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