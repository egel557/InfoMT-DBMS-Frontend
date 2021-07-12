import { DataGrid } from "@material-ui/data-grid"
import { useState } from "react"
import { useEffect } from "react"

const dateValueGetter = ({ row, field }) => {
    return (row[field].substring(0, 10))
}


export default function DataTable({ pageSize=10, pageDependencies=[], query={ isLoading: false, data: [] }, columns=[], createRows=rows => rows, ...props }){
    const [page, setPage] = useState(0)

    useEffect(_ => {
        window.scrollTo(0,0)
    }, [page])

    useEffect(_ => {
        setPage(0)
        // eslint-disable-next-line
    }, pageDependencies)

    return  <DataGrid
        disableColumnSelector
        headerHeight={38}
        rowHeight={38}
        page={page}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        onPageChange={params => setPage(params.page)}
        loading={query.isLoading}
        autoHeight
        columns={columns.map(col => {
            return {
                ...col,
                valueGetter: col.type === "date" ? dateValueGetter : null
            }
        })}
        rows={createRows(query.data || [])}
        {...props}
    />
}