import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

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
  console.log('logged: ', context.logged);

  function ListItemLink(props: ListItemLinkProps) {
    const { primary, to } = props;
  
    const renderLink = React.useMemo(
      () =>
        React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
          itemProps,
          ref,
        ) {
          return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
        }),
      [to],
    );
  
    return (
      <li>
        <ListItem button component={renderLink}>
          {primary ? <ListItemIcon><Avatar />{primary}</ListItemIcon> : null}
        </ListItem>
      </li>
    );
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
        {
          context.logged
          ? 
          [<MenuItem key={'Profile'}>
              <Avatar /> Profile
            </MenuItem>,
            <MenuItem key={'My account'}>
                <Avatar /> My account
              </MenuItem>,
          <Divider />,
          <MenuItem key={'Add another account'}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>,
          <MenuItem key={'Settings'}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>,
          <MenuItem key={'Logout'}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
          ]
          : [<MenuItem key={'Sign Up'} >
              <ListItemLink to="/sign-up" primary='Sign Up' />
            </MenuItem>,
            <MenuItem key={'Login'}>
              <ListItemLink to="/sign-in" primary='Sign In' />
            </MenuItem>
            ]
        }
      </Menu>
    </React.Fragment>
  );
}