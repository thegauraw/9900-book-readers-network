import React from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { resetReaderPassword } from '../services/readerAPIs';
import { AuthenticationPaths, NavMenuList } from '../config/paths';

function ForgottenPassword() {
  const [error, setError] = React.useState('none');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('email: ', data.get('email'));
    const email = data.get('email');

    if (email !== undefined) {
      resetReaderPassword({ email: email }).then((msg) => setMessage(msg));
    }
  };

  let navigate = useNavigate();

  React.useEffect(() => {
    if (message === 'success') {
      setError('none');
      navigate(AuthenticationPaths.ResetPasswordSuccess);
    } else if (message !== '') {
      setError('block');
    } else {
      setError('none');
    }
  }, [message]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '80%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={() => setMessage('')}
          />
          <Grid item display={error} component="span">
            <Alert severity="error">{message}</Alert>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgottenPassword;
