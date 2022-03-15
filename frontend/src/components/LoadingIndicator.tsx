import { FC } from 'react';
import { CircularProgress } from '@mui/material';

const LoadingIndicator: FC = () => {
  return (
    <CircularProgress
      color="primary"
      sx={{
        display: 'flex',
        margin: 'auto',
      }}
    />
  );
};

export default LoadingIndicator;
