import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router } from "react-router-dom"
import "date-fns"
import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
          <App />
        </Router>
      </MuiPickersUtilsProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
