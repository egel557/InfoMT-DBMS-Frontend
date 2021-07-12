import Select from "components/Select"
import { useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { useEffect } from "react"
import DataTable from "components/DataTable"
import { Box, Paper, Divider } from "@material-ui/core"
import DocumentForm from "components/DocumentForm"
import NewRecordButton from "components/NewRecordButton"
import { formatDate } from "utils"

export default function MainRecordsView(){
    const [ type, setType ] = useState("")
    const [ year, setYear ] = useState("All")
    const [ month, setMonth ] = useState("All")
    const [ selected, setSelected ] = useState(null)
    const filters = { type, year, month }
    const params = new URLSearchParams(filters)

    const query = useQuery(
        ["main_records", filters],
        () => axios.get("http://localhost:5000/main_records?" + params.toString()).then(res => {
            return res.data.map(record => {
                return {
                    ...record,
                    Period_Start: formatDate(record.Period_Start),
                    Period_End: formatDate(record.Period_End)
                }
            })
        })
    )

    useEffect(_ => {
        setYear("All")
    }, [ type ])

    useEffect(_ => {
        setMonth("All")
    }, [ year ])

    useEffect(_ => {
        setSelected(null)
    }, [ type, year, month ])

    return <Box>
        <Box mb={1}>
            <DocumentForm bill={selected} />
        </Box>
        <Box display="flex">
            <DataTable 
                style={{ flexGrow: 1 }}
                onSelectionModelChange={({ selectionModel }) => 
                    setSelected(
                        selectionModel.length === 0 
                        ? null 
                        : query.data?.find?.(row => row.Bill_ID + row.Period_Start === selectionModel[0])
                    )
                }
                pageSize={5}
                query={query}
                createRows={rows => rows.map(row => {
                    return {
                        ...row,
                        id: row.Bill_ID + row.Period_Start
                    }
                })}
                pageDependencies={[ type, year, month ]}
                columns={[
                    { field: "Bill_ID", width: 150},
                    { field: "Name", width: 200},
                    { field: "Period_Start", width: 200 },
                    { field: "Period_End", width: 200 },
                    { field: "Meter_No", width: 150},
                    { field: "Previous", width: 150, type: "number"},
                    { field: "Current", width: 150, type: "number"},
                    { field: "Consumption", width: 150, type: "number"},
                    { field: "Rate", width: 150, type: "number"},
                    { field: "Total_Amount", width: 150, type: "number"},
                ]}
            />
            <Box width={200} p={2} ml={1} variant="outlined" component={Paper}>
            {[
                <NewRecordButton/>,
                <Divider />,
                <Select
                    fullWidth 
                    name="type" 
                    label="Type" 
                    value={type}
                    options={[
                        { value: "electric", display: "Electric" },
                        { value: "water", display: "Water" }
                    ]}
                    onChange={e => setType(e.target.value)}
                />,
                <Select
                    fullWidth 
                    disabled={!type}
                    name="year" 
                    label="End Year" 
                    value={year}
                    options={[ "All", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010" ]}
                    onChange={e => setYear(e.target.value)}

                />,
                <Select
                    fullWidth 
                    disabled={year === "All"}
                    name="month" 
                    label="End Month" 
                    value={month} 
                    options={[
                        "All",
                        { display: "January", value: 1 },
                        { display: "February", value: 2 },
                        { display: "March", value: 3 },
                        { display: "April", value: 4 },
                        { display: "May", value: 5 },
                        { display: "June", value: 6 },
                        { display: "July", value: 7 },
                        { display: "August", value: 8 },
                        { display: "September", value: 9 },
                        { display: "October", value: 10 },
                        { display: "November", value: 11 },
                        { display: "December", value: 12 },
                    ]}
                    onChange={e => setMonth(e.target.value)}
                />
            ].map((item, index) =>
                <Box key={index} mb={2}>
                    {item}
                </Box>
            )}
            </Box>
        </Box>
    </Box>
}