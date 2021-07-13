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
import "index.css"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { CssBaseline } from "@material-ui/core"

const queryClient = new QueryClient()
const theme = createMuiTheme({
  palette: {
    background: {
      // default: "#ff0000",
      default: "#f6f6f6"
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <App />
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
