import React from 'react';
import {
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
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from 'react-router-dom';

import { Appctx } from '../utils/LocalContext';
import { fetchLogin } from '../services/callableFunctions';
import { AuthenticationPaths } from '../config/paths';

function SignIn() {
  const context = React.useContext(Appctx);
  const { token, setToken, logged, setLogged } = context;
  console.log('context: xxxxxxxxxx', token);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const reqPara = {
      email: data.get('email'),
      password: data.get('password'),
      setToken: setToken,
      setLogged: setLogged,
    };

    fetchLogin(reqPara);
    console.log('get token: ', token);
    console.log('logged status: ', logged);
  };

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
          Sign in
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link
                variant="body2"
                underline="hover"
                component={RouterLink}
                to={AuthenticationPaths.SignUp}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
