import Button from "./Button";
import { useState } from "react";
import NewRecordProvider from "providers/NewRecordProvider";
import NewRecordModal from "./NewRecordModal";

export default function NewRecordButton(){
    const [ open, setOpen ] = useState(false)

    const handleOpen = _ => setOpen(true)
    const handleClose = _ => setOpen(false)

    return <NewRecordProvider {...{ open, handleOpen, handleClose }}>
        <Button type="add" onClick={handleOpen} />
        <NewRecordModal open={open} onClose={handleClose} />
    </NewRecordProvider>
}