import { FormHelperText, Grid } from "@material-ui/core";
import axios from "axios";
import useTenants from "hooks/useTenants";
import { NewRecordContext } from "providers/NewRecordProvider";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Button from "./Button";
import Select from "./Select";


export default function NewBillTenantForm(){
    const { type, setModalView } = useContext(NewRecordContext)
    const { data: tenants = [] } = useTenants()
    const [ Tenant_ID, setTenant_ID ] = useState("")
    const [ error, setError ] = useState(false)

    const queryClient = useQueryClient()

    const addBillTenant = useMutation(
        (value) => axios.post("http://localhost:5000/type-tenants/new", value)
    )

    const handleSubmit = () => {
        const payload = { Tenant_ID, type }

        addBillTenant.mutate(payload, {
            onSuccess: () => {
                setModalView("NEW_RECORD")
                queryClient.invalidateQueries("type_tenants", { refetchActive: true, refetchInactive: true })
                setError(false)
            },
            onError: () => setError(true),
        })
        console.log(payload)
    }

    return <Grid container spacing={2}>
        {error && <Grid item xs={12}>
            <FormHelperText error>Something went wrong.</FormHelperText>
        </Grid>}
        <Grid item>
            <Select 
                name="tenants"
                label="Tenants"
                options={tenants.map(tenant => {
                    return {
                        value: tenant.Tenant_ID,
                        display: tenant.Name
                    }
                })}
                value={Tenant_ID}
                onChange={e => setTenant_ID(e.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
            <Button type="submit" onClick={handleSubmit} />
        </Grid>
    </Grid>
}