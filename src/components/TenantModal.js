import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import axios from "axios";
import { Form, Formik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Button from "./Button";
import FormField from "./FormField";
import FormSelect from "./FormSelect";
import FormSwitch from "./FormSwitch";
import ModalBox from "./ModalBox";

export default function TenantModal({ edit=false, tenant={}, ...props }){
    const queryClient = useQueryClient()

    const storetypesQuery = useQuery(
        "storetypes",
        () => axios.get("http://localhost:5000/storetypes").then(res => res.data)
    )


    const addTenant = useMutation(
        (values) => axios.post("http://localhost:5000/tenants/new", values), {
            onSuccess: () => {
                queryClient.invalidateQueries("tenants", { refetchActive: true, refetchInactive: true })
                props.onClose?.()
            },
            onError: () => console.log("error")
        }
    )

    const editTenant = useMutation(
        (values) => axios.post("http://localhost:5000/tenants/edit", values), {
            onSuccess: () => {
                queryClient.invalidateQueries("tenants", { refetchActive: true, refetchInactive: true })
                props.onClose?.()
            },
            onError: () => console.log("error")
        }
    )

    return <ModalBox {...props}>
    {({ cardProps, cardContentProps }) => 
        <Formik
            initialValues={{
                Name: "",
                StoreType_ID: "",
                Floor: "",
                ...tenant
            }}
            onSubmit={values => {
                if (edit) editTenant.mutate(values)
                else addTenant.mutate(values)
            }}
        >
        {() => 
            <Form>
                <Card {...cardProps}>
                    <CardHeader 
                        title={edit ? "Edit Tenant" : "New Tenant"}
                    />
                    <CardContent {...cardContentProps}>
                        <Grid container spacing={2} alignItems="center">
                            {edit && 
                            <Grid item xs={4}>
                                <FormField 
                                    fullWidth
                                    disabled
                                    name="Tenant_ID"
                                    label="ID"
                                />
                            </Grid>
                            }
                            <Grid item xs={8}>
                                <FormField 
                                    name="Name"
                                    label="Name"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <FormSelect
                                    name="Floor"
                                    label="Floor"
                                    options={[1, 2, 3]}
                                />
                            </Grid>
                            <Grid item>
                                <FormSelect
                                    name="StoreType_ID"
                                    label="Store Type"
                                    options={storetypesQuery.data?.map?.(type => {
                                        return {
                                            value: type.StoreType_ID,
                                            display: type.Type
                                        }
                                    })}
                                />
                            </Grid>
                            {edit &&
                            <Grid item>
                                <FormSwitch 
                                    name="Status"
                                    label="Active"
                                />
                            </Grid>
                            }
                            <Grid item xs={12}>
                                <Button type="submit"/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Form>
        }
        </Formik>
    }
    </ModalBox>
}