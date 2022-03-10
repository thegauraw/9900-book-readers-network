import * as React from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavMenuList } from '../config/paths';
import { useNavigate, useLocation } from 'react-router-dom';

const NavMenuVertical: React.FC = () => {
  let navigate = useNavigate();
  const NavMenuKeys = Object.keys(NavMenuList) as (keyof typeof NavMenuList)[];
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState<
    ((element: Element) => Element) | Element | null | undefined
  >(null);
  const handleOpenNavMenu = (event: React.KeyboardEvent | React.MouseEvent) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {NavMenuKeys.map((page) => {
          const color = location.pathname === NavMenuList[page] ? 'text.secondary' : 'text.primary';
          return (
            <MenuItem key={page} onClick={() => navigate(`${NavMenuList[page]}`)}>
              <Typography textAlign="center" sx={{ p: 2, color: color, typography: 'h6' }}>
                {page}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default NavMenuVertical;
