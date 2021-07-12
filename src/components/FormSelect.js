import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useField } from "formik"

export default function FormSelect({ name, type, multiple, validate, fullWidth, options=[], variant="outlined", ...props }){
    const [field, meta] = useField({
        name, type, multiple, validate
    })

    const error = meta.touched && meta.error

    return <FormControl
        style={{ minWidth: 120 }} 
        size="small"
        {...{fullWidth, variant}}
    >
        <InputLabel>{props.label}</InputLabel>
        <Select
            {...field}
            {...props}
            error={error}
        >
            {options.map(option => 
            <MenuItem
                key={option?.value ?? option}
                value={option?.value ?? option}
                disabled={option?.disabled}
            >
                {option?.display ?? option}
            </MenuItem>
            )}
        </Select>
        <FormHelperText error={Boolean(error)}>
            {error}
        </FormHelperText>
    </FormControl>
}