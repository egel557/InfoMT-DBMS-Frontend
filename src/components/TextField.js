import { TextField as MuiTextField } from "@material-ui/core"

export default function TextField(props){
    return <MuiTextField size="small" variant="outlined" {...props} />
}