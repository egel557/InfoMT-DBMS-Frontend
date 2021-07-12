import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from "@material-ui/core"


export default function Select({ label, name, value, options=[], onChange, ...props }){
    return <FormControl style={{ minWidth: 120 }} size="small" variant="outlined" {...props}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect 
            name={name} 
            label={label}
            value={value}
            onChange={onChange}
        >
            {options.map(option => {
                const { value=option, display=option } = option
                return <MenuItem key={value} value={value}>{display}</MenuItem>
            })}
        </MuiSelect>
    </FormControl>
}