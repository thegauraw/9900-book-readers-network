import React from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  ListItem,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Appctx } from '../utils/LocalContext';
import { fetchLogin } from '../services/callableFunctions';
import { AuthenticationPaths, NavMenuList } from '../config/paths';

function ForgottenPassword() {
  const [error, setError] = React.useState('none');
  const [message, setMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'));
  };

  let navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Grid item xs={12} display={error}>
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
