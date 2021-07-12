import { Button as MuiButton } from "@material-ui/core"
import { Add as AddIcon, EditOutlined as EditIcon } from "@material-ui/icons"


export default function Button({ type, ...props }){
    return <MuiButton 
        startIcon={type === "add" ? <AddIcon/> : type === "edit" ? <EditIcon/> : null}
        type={["submit", "button", "reset"].includes(type) ? type : "button"}
        children={type}
        {...props} 
    />
}