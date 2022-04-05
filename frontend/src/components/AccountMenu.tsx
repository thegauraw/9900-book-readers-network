import * as React from 'react';
import { green, pink, yellow, blue } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { Link as RouterLink, LinkProps as RouterLinkProps, useNavigate } from 'react-router-dom';

import { NavMenuList } from '../config/paths';
import { Appctx } from '../utils/LocalContext';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = React.useContext(Appctx);
  const { logged, setLogged, setToken } = context;
  console.log('logged: ', logged);

  let navigate = useNavigate();
  const handlerLogout = () => {
    setToken('xxx');
    setLogged(false);
    navigate(NavMenuList.Home);
  };

  function ListItemLink(props: ListItemLinkProps) {
    const { primary, to } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
          itemProps,
          ref
        ) {
          return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
        }),
      [to]
    );

    return (
      <ListItem button component={renderLink}>
        {primary ? <ListItemIcon sx={{ width: '100%' }}>{primary}</ListItemIcon> : null}
      </ListItem>
    );
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              backgroundColor: 'background.default',
              height: '40%',
              width: '90%',
              borderRadius: '21px',
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="inherit"
          >
            <MenuIcon
              sx={{
                color: 'text.primary',
                height: '16px',
                width: '16px',
              }}
            />
            <Avatar
              sx={{
                ml: 1,
                height: '30px',
                width: '30px',
                backgroundColor: 'text.primary',
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            p: 1,
            minWidth: '200px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {logged
          ? [
              <MenuItem key={'Profile'} sx={{ color: 'text.primary', typography: 'h4' }}>
                <PersonIcon />
                <ListItemLink to={NavMenuList.Profiles} primary="My Profile" />
              </MenuItem>,
              <MenuItem
                key={'Achievements'}
                sx={{ color: 'text.primary', typography: 'h4', mb: 2 }}
                divider={true}
              >
                <MilitaryTechIcon />
                <ListItemLink to={NavMenuList.Achievements} primary="My Achievements" />
              </MenuItem>,
              <MenuItem
                key={'Logout'}
                onClick={handlerLogout}
                sx={{ color: 'text.primary', typography: 'h4' }}
              >
                <LogoutIcon />
                <ListItem>Logout</ListItem>
              </MenuItem>,
            ]
          : [
              <MenuItem key={'Sign Up'} sx={{ color: 'text.primary', typography: 'h4' }}>
                <AppRegistrationIcon />
                <ListItemLink to="/sign-up" primary="Sign Up" />
              </MenuItem>,
              <MenuItem key={'Login'} sx={{ color: 'text.primary', typography: 'h4' }}>
                <LoginIcon />
                <ListItemLink to="/sign-in" primary="Sign In" />
              </MenuItem>,
            ]}
      </Menu>
    </React.Fragment>
  );
}
