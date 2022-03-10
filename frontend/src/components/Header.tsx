import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

import AccountMenu from './AccountMenu';
import NavMenuVertical from './NavMenuVertical';
import NavMenuHorizontal from './NavMenuHorizontal';

const Header: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <NavMenuVertical />
        <Typography variant="h5" component="div">
          LOGO
        </Typography>
        <NavMenuHorizontal />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
