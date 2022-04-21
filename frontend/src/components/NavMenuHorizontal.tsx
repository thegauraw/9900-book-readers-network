import * as React from 'react';
import { Box, Button } from '@mui/material';
import { VisibleMenuList } from '../config/paths';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Icons from '@mui/icons-material';
const NavMenuHorizontal: React.FC = () => {
  let navigate = useNavigate();
  const NavMenuKeys = Object.keys(VisibleMenuList) as (keyof typeof VisibleMenuList)[];
  const location = useLocation();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'flex-start',
        pl: 2,
      }}
    >
      {NavMenuKeys.map((page) => {
        const color =
          location.pathname === VisibleMenuList[page].path ? 'text.secondary' : 'text.primary';
        const iconName = VisibleMenuList[page].iconName as keyof typeof Icons;
        return (
          <Button
            key={page}
            onClick={() => navigate(`${VisibleMenuList[page].path}`)}
            sx={{ color: color, display: 'flex', typography: 'h3' }}
          >
            {React.createElement(Icons[iconName])}
            {VisibleMenuList[page].display}
          </Button>
        );
      })}
    </Box>
  );
};

export default NavMenuHorizontal;
