import { FormHelperText, Grid } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import axios from "axios";
import moment from "moment";
import { NewRecordContext } from "providers/NewRecordProvider";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "./Button";


export default function NewPeriodForm(){
    const { setModalView } = useContext(NewRecordContext)
    const [ Period_Start, setPeriod_Start ] = useState(moment())
    const [ Period_End, setPeriod_End ] = useState(moment().add(1, "month"))
    const [ error, setError ] = useState(false)
    const queryClient = useQueryClient()

    const addPeriod = useMutation(
        (newPeriod) => axios.post("http://localhost:5000/periods/new", newPeriod)
    )

    const handleSubmit = () => {
        const payload = {
            Period_Start: Period_Start.format("YYYY-MM-DD"),
            Period_End: Period_End.format("YYYY-MM-DD")
        }
        addPeriod.mutate(payload, {
            onSuccess: () => {
                setModalView("NEW_RECORD")
                queryClient.invalidateQueries("periods", { refetchActive: true, refetchInactive: true })
                setError(false)
            },
            onError: () => setError(true)
        })
    }


    return <Grid container spacing={2}>
        {error && <Grid item xs={12}>
            <FormHelperText error>Something went wrong.</FormHelperText>
        </Grid>}
        <Grid item xs={6}>
            <KeyboardDatePicker
                disableToolbar 
                variant="inline"
                format="YYYY-MM-DD"
                value={Period_Start}
                name="Period_Start"
                label="Period Start"
                onChange={setPeriod_Start}
                inputVariant="outlined"
            />
        </Grid>
        <Grid item xs={6}>
            <KeyboardDatePicker
                disableToolbar 
                variant="inline"
                format="YYYY-MM-DD"
                value={Period_End}
                name="Period_End"
                label="Period End"
                onChange={setPeriod_End}
                inputVariant="outlined"
            />
        </Grid>
        <Grid item xs={12}>
            <Button type="submit" onClick={handleSubmit} />
        </Grid>
    </Grid>
}