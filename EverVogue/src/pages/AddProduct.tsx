import NavBars from "../common/layout/NavBars";
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface Product {
    title: string;
    price: string;
    description: string;
    image: FileList | null; 
}

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>({
        defaultValues: {
            title: '',
            price: '',
            description: '',
            image: null,
        },
    });

    const onSubmit = (data: Product) => {
        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const imageFile = data.image ? data.image[0] : null; 

        if (imageFile) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                // Create the product object with base64 image and a unique id
                const productData = {
                    id: Date.now().toString(), // Add unique id here
                    ...data,
                    image: reader.result as string, // Convert the image file to a base64 string
                };

                existingProducts.push(productData);

                // Save updated products list to local storage
                localStorage.setItem('products', JSON.stringify(existingProducts));

                console.log('Product added:', productData);

                // Reset the form fields using reset()
                reset({
                    title: '',
                    price: '',
                    description: '',
                    image: null, // Reset image to null
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
                    gap: '10px',
                    backgroundColor: '#e6e6e6',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '700px',
                    marginTop: '10px',
                }}
            >
                <TextField
                    label="Title"
                    {...register('title', { required: 'Title is required' })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    fullWidth
                    required
                />
                <TextField
                    label="Price"
                    {...register('price', { required: 'Price is required' })}
                    fullWidth
                    required
                />
                <TextField
                    label="Description"
                    {...register('description', { required: 'Description is required' })}
                    fullWidth
                    required
                />
                <TextField
                    type="file"
                    {...register('image', { required: 'Image is required' })}
                    error={!!errors.image}
                    helperText={errors.image?.message || 'Select an image'}
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Product
                </Button>
            </form>
        </>
    );
};

export default AddProduct;
