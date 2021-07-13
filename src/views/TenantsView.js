import DataTable from "components/DataTable";
import { Box, Paper } from "@material-ui/core";
import useTenants from "hooks/useTenants";
import { useState } from "react"
import TenantModalButton from "components/TenantModalButton";

export default function TenantsView(){
    const query = useTenants()
    const [ selected, setSelected ] = useState(null)

    return <Box mb={2}>
        <Box component={Paper} p={2} mb={2}>
            <TenantModalButton style={{ marginRight: 5 }} type="add" />
            <TenantModalButton disabled={!selected} type="edit" tenant={selected} />
        </Box>
        <DataTable
            query={query}
            createRows={rows => rows.map(row => {
                return {
                    ...row,
                    id: row.Tenant_ID
                }
            })}
            columns={[
                { field: "Tenant_ID", width: 150 },
                { field: "Name", width: 200 },
                { field: "Type", width: 150 },
                { field: "Floor", width: 150, type: "number" },
                { field: "Creation_Date", width: 200 },
                { field: "Status", width: 150, type: "boolean" },
            ]}
            onSelectionModelChange={({ selectionModel }) => 
                setSelected(
                    selectionModel.length === 0 
                    ? null 
                    : query.data?.find?.(row => row.Tenant_ID === selectionModel[0])
                )
            }
        />
    </Box>
}