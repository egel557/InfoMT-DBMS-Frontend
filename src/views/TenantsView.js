import DataTable from "components/DataTable";
import { Box, Paper } from "@material-ui/core";
import Button from "components/Button"
import useTenants from "hooks/useTenants";

export default function TenantsView(){
    const query = useTenants()
    return <Box>
        <Box component={Paper} p={2} mb={2} variant="outlined">
            <Button style={{ marginRight: 5 }} type="add" />
            <Button type="edit" />
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
        />
    </Box>
}