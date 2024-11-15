import NavBars from "../common/components/NavBars";
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import ReusableForm from "../common/components/ReusableForm";
import { saveToLocalStorage } from "../utils/localStorageUtils";

interface Product {
    title: string;
    price: string;
    description: string;
    image: FileList | null; 
}

const AddProduct = () => {
    const form = useForm<Product>({
        defaultValues: {
            title: '',
            price: '',
            description: '',
            image: null,
        },
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: Product) => {
        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const imageFile = data.image ? data.image[0] : null; 

        if (imageFile) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const productData = {
                    id: Date.now().toString(), 
                    ...data,
                    image: reader.result as string, 
                };

                existingProducts.push(productData);

                saveToLocalStorage('products', existingProducts);

                reset({
                    title: '',
                    price: '',
                    description: '',
                    image: null
                });
            };

            reader.readAsDataURL(imageFile);
        } 
    };

    return (
        <>
            <NavBars />
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    backgroundColor: '#e6e6e6',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '55%',
                    margin: '30px auto',
                }}
            >
                <ReusableForm
                formIndex={1}
                form={form}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Product
                </Button>
            </form>
        </>
    );

};
export default AddProduct;
