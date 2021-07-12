import Header from "components/Header"
import { Box, Toolbar, Container, Typography, List, ListItem } from "@material-ui/core"
import { Link as RouterLink, Switch, Route, useLocation, Redirect } from "react-router-dom"
import MainRecordsView from "views/MainRecordsView"
import TenantsView from "views/TenantsView"
import FormView from "views/FormView"

export default function App(){
  const { pathname } = useLocation()

  return <Box>
    <Header />
    <Toolbar variant="dense"/>
    <Box display="flex" height="100%" >
      <Box p={2} width={220} height="100%">
        <List>
          {[
            { label: "Main Records", path: "/main_records" },
            { label: "Tenants", path: "/tenants" },
          ].map(item => 
          <ListItem 
            key={item.label} 
            selected={pathname.includes(item.path)}
            button 
            component={RouterLink} 
            to={item.path}
          >
            <Typography>
              {item.label}
            </Typography>
          </ListItem>
          )}
        </List>
      </Box>
      <Box flexGrow={1} mt={1} overflow="scroll">
        <Container>
          <Switch>
            <Route exact path="/main_records" component={MainRecordsView} />
            <Route exact path="/tenants" component={TenantsView} />
            <Route exact path="/form" component={FormView} />
            <Route exact path="/">
              <Redirect to="/main_records" />
            </Route>
            <Route path="/">
              404
            </Route>
          </Switch>
        </Container>
      </Box>
    </Box>
  </Box>
}