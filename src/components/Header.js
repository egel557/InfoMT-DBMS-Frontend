import { AppBar, Toolbar, Typography, Box } from "@material-ui/core"

export default function Header(){
  return <AppBar color="primary">
    <Toolbar variant="dense">
        <Box mr={10}>
          <Typography variant="h6">
              LEAGUE ONE INC.
          </Typography>
        </Box>
        <Typography align="center">
          Electric and Water Billing Database Management System
        </Typography>
    </Toolbar>
</AppBar>
}