import Button from "./Button";
import { useContext, useState,  } from "react";
import { Add as AddIcon } from "@material-ui/icons"
import { Grid, FormHelperText, IconButton } from "@material-ui/core";
import Select from "./Select";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import TextField from "./TextField";
import { NewRecordContext } from "providers/NewRecordProvider"
import { formatDate } from "utils"

export default function NewRecordForm(){
    const { 
        handleClose, 
        setModalView,
        type, setType,
        Bill_ID, setBill_ID,
        Period_ID, setPeriod_ID,
        Current, setCurrent,
        Rate, setRate,
        Meter_No, setMeter_No,
        // isInitialRecord, setIsInitialRecord
    } = useContext(NewRecordContext)

    const [ error, setError ] = useState(false)

    const queryClient = useQueryClient()

    const periodsQuery = useQuery(
        "periods",
        () => axios.get(`http://localhost:5000/periods`).then(res => {
            const data = res.data
            return data.map(period => {
                return {
                    ...period,
                    Period_Start: formatDate(period.Period_Start),
                    Period_End: formatDate(period.Period_End),
                }
            })
        })
    )

    const tenantsQuery = useQuery(
        [ "type_tenants", { type } ], 
        () => axios.get(`http://localhost:5000/type-tenants?type=${type}`).then(res => res.data)
    )
    const meterQuery = useQuery(
        [ "tenant_meter_details", { Bill_ID } ],
        () => axios.get(`http://localhost:5000/tenant-meter-details?Bill_ID=${Bill_ID}`).then(res => res.data),
        {
            onSuccess: (data) => setMeter_No(data.Meter_No),
        }
    )

    
    const addRecord = useMutation((payload) => 
    axios.post("http://localhost:5000/main_records/new", payload)
    )
    
    const Previous = meterQuery.data?.Previous || 0
    const Consumption =  Math.round((Current - Previous )* 100)/100
    const Total_Amount = Math.round(Rate * Consumption * 100)/100
    const isInitialRecord = meterQuery.data?.isInitialRecord
    
    const handleSubmit = _ => {
        const payload = { Bill_ID, Meter_No, Period_ID: Number(Period_ID), Rate: Number(Rate), Total_Amount, Previous, Current: Number(Current), Consumption }
        addRecord.mutate(payload, 
            {
                onSuccess: _ => {
                    setError(false)
                    handleClose()
                    queryClient.invalidateQueries("main_records", { refetchActive: true, refetchInactive: true })
                },
                onError: _ => setError(true)
            }    
        )
    }

    return <Grid container spacing={2} alignItems="center" >
        {error && <Grid item xs={12}>
            <FormHelperText error>Something went wrong.</FormHelperText>
        </Grid>}
        <Grid item>
            <Select 
                name="type"
                label="Bill Type"
                value={type}
                options={[
                    { value: "electric", display: "Electric" },
                    { value: "water", display: "Water" }
                ]}
                onChange={e => setType(e.target.value)}
            />
        </Grid>
        <Grid item>
            <Select 
                name="Bill_ID"
                label="Tenant"
                disabled={!type}        
                options={tenantsQuery.data?.map?.(tenant => {
                    return { 
                        value: tenant[`${type === "electric" ? "E" : "W"}_BILL_ID`],
                        display: tenant.Name
                    }
                }) || []}
                value={Bill_ID}
                onChange={e => setBill_ID(e.target.value)}
            />
        </Grid>
        <Grid item xs={4}>
        <Grid item xs={8}>
            <IconButton 
                disabled={!type}
                size="small"
                onClick={_ => setModalView("NEW_BILL_TENANT")}
            >
                <AddIcon fontSize="small" />
            </IconButton>
        </Grid>
        </Grid>
        <Grid item xs={4}>
            <Select
                disabled={!Bill_ID}
                fullWidth 
                name="period"
                label="Billing Period"
                options={periodsQuery.data?.map?.(period => {
                    return {
                        value: period.Period_ID,
                        display: `${period.Period_Start} to ${period.Period_End}`
                    }
                }) || []}
                value={Period_ID}
                onChange={e => setPeriod_ID(e.target.value)}
            />
        </Grid>
        <Grid item xs={8}>
            <IconButton 
                disabled={!Bill_ID}
                size="small"
                onClick={_ => setModalView("NEW_PERIOD")}
            >
                <AddIcon fontSize="small" />
            </IconButton>
        </Grid>

        <Grid item xs={6}>
            <TextField 
                disabled={!Bill_ID || !isInitialRecord}
                fullWidth
                label="Meter No"
                value={Meter_No}
                onChange={e => setMeter_No(e.target.value)}
            />
        </Grid>
        <Grid item xs={6}/>
        <Grid item xs={4}>
            <TextField 
                disabled
                fullWidth
                label="Previous Reading"
                value={Previous}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
                disabled={!Bill_ID}
                fullWidth
                name="current"
                label="Current Reading"
                value={Current}
                onChange={e => setCurrent(e.target.value)}
                type="number"
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
                disabled
                fullWidth
                label="Consumption"
                value={Consumption}
            />
        </Grid>
        <Grid item xs={3}>
            <TextField 
                disabled={!Bill_ID}
                fullWidth
                name="rate"
                label="Rate"
                value={Rate}
                onChange={e => setRate(e.target.value)}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField 
                disabled
                fullWidth
                label="Total Amount"
                value={Total_Amount}
            />
        </Grid>
        <Grid item xs={12}>
            <Button onClick={handleSubmit} type="submit" />
        </Grid>
    </Grid>
}