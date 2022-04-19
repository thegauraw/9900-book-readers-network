import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { iconSizes } from '../config/constants';
import AccountMenu from './AccountMenu';
import NavMenuVertical from './NavMenuVertical';
import NavMenuHorizontal from './NavMenuHorizontal';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const Header: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <NavMenuVertical />
        <MenuBookIcon sx={{ ...iconSizes.logo }} />
        <NavMenuHorizontal />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
