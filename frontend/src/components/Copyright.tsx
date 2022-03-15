import { Typography } from '@mui/material';

export default function Copyright(props: any) {
  return (
    <Typography
      variant="inherit"
      color="text.secondary"
      align="center"
      marginTop="-50px"
      {...props}
    >
      {'Copyright © '}
      {new Date().getFullYear()} Day Day Up.
      {' All rights reserved.'}
    </Typography>
  );
}
