import { Typography } from "@mui/material";

export default function Copyright(props: any) {
  return (
    <Typography variant="inherit" color="text.secondary" align="center" bottom="1vh" left="2vh" position="absolute" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}Day Day Up.  
      {' All rights reserved.'}
    </Typography>
  );
}