import * as React from 'react';
import { Box, Button } from '@mui/material';
import { NavMenuList } from '../config/paths';
import { useNavigate, useLocation } from 'react-router-dom';

const NavMenuHorizontal: React.FC = () => {
  let navigate = useNavigate();
  const NavMenuKeys = Object.keys(NavMenuList) as (keyof typeof NavMenuList)[];
  const location = useLocation();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'center',
      }}
    >
      {NavMenuKeys.map((page) => {
        const color = location.pathname === NavMenuList[page] ? 'text.secondary' : 'text.primary';
        return (
          <Button
            key={page}
            onClick={() => navigate(`${NavMenuList[page]}`)}
            sx={{ color: color, display: 'flex', typography: 'h3' }}
          >
            {page}
          </Button>
        );
      })}
    </Box>
  );
};

export default NavMenuHorizontal;
