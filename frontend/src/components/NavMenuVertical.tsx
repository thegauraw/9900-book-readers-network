import * as React from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { VisibleMenuList } from '../config/paths';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Icons from '@mui/icons-material';
const NavMenuVertical: React.FC = () => {
  let navigate = useNavigate();
  const NavMenuKeys = Object.keys(VisibleMenuList) as (keyof typeof VisibleMenuList)[];
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
      <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
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
          const iconName = VisibleMenuList[page].iconName as keyof typeof Icons;
          const color =
            location.pathname === VisibleMenuList[page].path ? 'text.secondary' : 'text.primary';
          return (
            <MenuItem key={page} onClick={() => navigate(`${VisibleMenuList[page].path}`)}>
              {React.createElement(Icons[iconName])}
              <Typography textAlign="center" sx={{ p: 2, color: color, typography: 'h3' }}>
                {VisibleMenuList[page].display}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default NavMenuVertical;
