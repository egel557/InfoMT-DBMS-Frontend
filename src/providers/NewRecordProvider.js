import { createContext, useState, useEffect } from "react";

export const NewRecordContext = createContext({})

export default function NewRecordProvider({ open, handleOpen, handleClose, children }){
    
    const [ type, setType ] = useState("")
    const [ Bill_ID, setBill_ID ] = useState("")
    const [ Period_ID, setPeriod_ID ] = useState("")
    const [ Current, setCurrent ] = useState(0)
    const [ Rate, setRate ] = useState(0)
    const [ Meter_No, setMeter_No ] = useState("")
    const [ isInitialRecord, setIsInitialRecord ] = useState(false)
    const [ modalView, setModalView ] = useState("NEW_RECORD")


    useEffect(_ => {
        setType("")
        setBill_ID("")
        setPeriod_ID("")
        setCurrent(0)
        setRate(0)
        setModalView("NEW_RECORD")
        setMeter_No("")
        setIsInitialRecord(false)
    }, [ open ])

    useEffect(_ => {
        setBill_ID("")
    }, [ type ])

    useEffect(_ => {
        setMeter_No("")
        setIsInitialRecord(false)
    }, [Bill_ID])

    return <NewRecordContext.Provider value={{
        open,
        handleOpen, handleClose,
        modalView, setModalView,
        type, setType,
        Bill_ID, setBill_ID,
        Period_ID, setPeriod_ID,
        Current, setCurrent,
        Rate, setRate,
        Meter_No, setMeter_No,
        isInitialRecord, setIsInitialRecord
    }}>
        {children}
    </NewRecordContext.Provider>
}