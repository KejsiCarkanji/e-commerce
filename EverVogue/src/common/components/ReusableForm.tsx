import TextField from '@mui/material/TextField';
import { UseFormReturn } from 'react-hook-form'; 
import { FORM_CONFIG } from '../config/formConfig';


interface ReusableFormProps {
    formIndex: number;
    form: UseFormReturn<any>; 
}

const ReusableForm: React.FC<ReusableFormProps> = ({ formIndex, form }) => {
    const { register, formState: { errors } } = form;

    return (
        <>
            {FORM_CONFIG[formIndex].map((field) => (
                <TextField
                    key={field.name}
                    {...register(field.name, { required: field.errorMessage })}
                    label={field.label}
                    type={field.type}
                    variant={field.variant as "outlined" | "filled" | "standard"}
                    error={!!errors[field.name]}
                    helperText={(errors[field.name]?.message as string) || ''}
                    fullWidth
                    required
                />
            ))}
        </>
    );
};

export default ReusableForm;