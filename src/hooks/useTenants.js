import { useQuery } from "react-query";
import axios from "axios"
import { formatDate } from "utils";


export default function useTenants(){
    return useQuery(
        "tenants",
        _ => axios.get("http://localhost:5000/tenants").then(res => res.data.map(tenant => {
            return {
                ...tenant,
                Creation_Date: formatDate(tenant.Creation_Date)
            }
        }))
    )
}
