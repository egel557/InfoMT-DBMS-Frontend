import { FormControlLabel, Switch } from "@material-ui/core";
import { useField } from "formik"


export default function FormSwitch({ name, type, multiple, value, validate, ...props }){
    const [field, meta] = useField({
        name, type, multiple, value, validate
    })

    return <FormControlLabel 
        control={
            <Switch size="small" checked={field.value} {...field} />
        }
        {...props}
        error={Boolean(meta.touched && meta.error)}
        helperText={meta.touched && meta.error}
    />
}