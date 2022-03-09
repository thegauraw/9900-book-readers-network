import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import AccountCircle from '@mui/icons-material/AccountCircle';

import AccountMenu from './AccountMenu';
import { Appctx } from '../utils/LocalContext';

const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();

  const context = React.useContext(Appctx);
  console.log(context.logged);

  return (
    <AppBar position="static">
      <Toolbar className={classes.headerContainer}>
        <Typography variant="h6" component="div">
          LOGO
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Collections</Button>
          <Button color="inherit">Explore</Button>
        </Box>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;