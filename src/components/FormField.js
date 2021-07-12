import { TextField } from "@material-ui/core";
import { useField } from "formik"


export default function FormField({ name, type, multiple, value, validate, ...props }){
    const [field, meta] = useField({
        name, type, multiple, value, validate
    })


    return <TextField
        size="small"
        {...field}
        variant="outlined"
        {...props}
        error={Boolean(meta.touched && meta.error)}
        helperText={meta.touched && meta.error}
        type={type}
    />
}