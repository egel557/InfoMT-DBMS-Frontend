import { Paper, Table, Typography, TableContainer, TableRow, TableHead, TableBody, TableCell } from "@material-ui/core"
import moment from "moment"
import numeral from "numeral"

const formatNumber = value => typeof value === "number" ? numeral(value).format("0,0.00") : ""

export default function DocumentForm({ bill }){
    const periodStart = moment(bill?.Period_Start)
    const periodEnd = moment(bill?.Period_End)
    const unit = bill?.type === "electric" ? "kw-h" : bill?.type === "water" ? <>m<sup>3</sup></> : "unit"

    return <TableContainer component={Paper} >
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="caption">
                            {bill?.Bill_ID}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        {bill && <strong>
                            {bill?.type === "electric" ? "ELECTRICITY" : bill?.type === "water" ? "WATER" : ""} CHARGES
                        </strong>}
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="caption" component="div">
                            <strong>
                                League One Inc.
                            </strong>
                        </Typography>
                        <Typography variant="caption" component="div">
                            SOUTHGATE MALL
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell style={{ borderRight: "1px solid lightgray" }} colSpan={2}>
                        <strong>CUT OFF DATE: {bill && `${periodStart.format(periodStart.year() === periodEnd.year() ? "MMMM DD" : "MMMM DD, YYYY")} to ${periodEnd.format("MMMM DD, YYYY")}`}</strong>
                    </TableCell>
                    <TableCell >
                        Tenant: <strong>{bill?.Name}</strong>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} style={{ borderRight: "1px solid lightgray" }}>
                        Meter Number: {bill?.Meter_No}
                    </TableCell>
                    <TableCell>
                        Total Amount Due: {bill && <strong><u>₱{formatNumber(bill?.Total_Amount)}</u></strong>}
                        <br/>
                        Registered Consumption ({unit}): <strong><u>{formatNumber(bill?.Consumption)}</u></strong>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="right" style={{ width: 200, borderRight: "1px solid lightgray" }}>
                        Unit Cost per {unit}:
                        <br/>
                        <strong>
                            {formatNumber(bill?.Rate)}
                        </strong> 
                    </TableCell>
                    <TableCell align="right" style={{ width: 200, borderRight: "1px solid lightgray" }}>
                        Previous Reading:
                        <br/>
                        <strong>
                            {formatNumber(bill?.Previous)}
                        </strong> 
                    </TableCell>
                    <TableCell align="right" style={{ width: 200,}}>
                        Current Reading:
                        <br/>
                        <strong>
                            {formatNumber(bill?.Current)}
                        </strong> 
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}