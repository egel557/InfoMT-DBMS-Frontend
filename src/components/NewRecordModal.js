import ModalBox from "./ModalBox";
import { Card, CardHeader, CardContent, IconButton } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons"
import NewRecordForm from "./NewRecordForm";
import NewPeriodForm from "./NewPeriodForm";
import { NewRecordContext } from "providers/NewRecordProvider"
import { useContext } from "react"
import NewBillTenantForm from "./NewBillTenantForm";

export default function NewRecordModal(){
    const { open, handleClose, modalView, setModalView, type } = useContext(NewRecordContext)

    return <ModalBox open={open} onClose={handleClose}>
    {({ cardProps, cardContentProps }) =>
        <Card {...cardProps}>
            <CardHeader 
                title={<>
                    {modalView !== "NEW_RECORD" && 
                    <IconButton 
                        size="small"
                        onClick={_ => setModalView("NEW_RECORD")}
                    >
                        <ArrowBackIos fontSize="small"/>
                    </IconButton> 
                    }
                    {modalView === "NEW_RECORD" ? "New Record" :
                    modalView === "NEW_PERIOD" ? "New Period" :
                    modalView === "NEW_BILL_TENANT" ? `New ${type === "electric" ? "Electric" : "Water"} Tenant` :
                    ""}
                </>} 
            />
            <CardContent {...cardContentProps}>
                {modalView === "NEW_RECORD" && <NewRecordForm />}
                {modalView === "NEW_PERIOD" && <NewPeriodForm />}
                {modalView === "NEW_BILL_TENANT" && <NewBillTenantForm />}                
            </CardContent>
        </Card>
    }
    </ModalBox>
}