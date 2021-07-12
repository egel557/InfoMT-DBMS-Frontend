import moment from "moment"

export const formatDate = (value) => moment(value).format("YYYY-MM-DD")