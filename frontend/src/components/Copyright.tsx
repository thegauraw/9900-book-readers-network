import { Box, Typography } from '@mui/material';

export default function Copyright() {
  return (
    <Box
      sx={{
        mt: 'auto',
        pb: 2,
        width: '100%',
      }}
    >
      <Typography variant="subtitle2" align="center">
        {'Copyright © '}
        {new Date().getFullYear()} Day Day Up.
        {' All rights reserved.'}
      </Typography>
    </Box>
  );
}
