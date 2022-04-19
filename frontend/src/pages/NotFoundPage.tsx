import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
interface CustomizedState {
  error: string;
}

const NotFoundPage: FC = () => {
  const location = useLocation();
  const state = location.state as CustomizedState;
  return (
    <Box
      sx={{
        mt: 'auto',
        pb: 2,
        width: '100%',
      }}
    >
      <Typography variant="h3" align="center">
        {state?.error ?? 'Oops, the resource was not found.'}
      </Typography>
    </Box>
  );
};
export default NotFoundPage;
