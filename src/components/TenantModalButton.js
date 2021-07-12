import Button from "./Button";
import TenantModal from "./TenantModal";
import { useState } from "react"

export default function TenantModalButton({ type, tenant, ...props }){
    const [ open, setOpen ] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    return <> 
        <Button type={type} onClick={handleOpen} {...props} />
        <TenantModal open={open} onClose={handleClose} edit={type === "edit"} tenant={tenant} />
    </>
}