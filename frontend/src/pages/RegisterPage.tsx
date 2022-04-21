import React from 'react';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Appctx } from '../utils/LocalContext';
import { AuthenticationPaths } from '../config/paths';
import { RegisterAPI } from '../services/authAPIs';

const RegisterPage: React.FC = () => {
  const context = React.useContext(Appctx);
  const { token, setToken, logged, setLogged } = context;

  const [password, setPassword] = React.useState('');
  const [confirm_password, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [passwordMsg, setPasswordMsg] = React.useState('none');
  const [error, setError] = React.useState('none');
  const [invalidPassword, setInvalidPassword] = React.useState('none');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const reqPara = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      setToken: setToken,
      setLogged: setLogged,
    };

    if (password.length >= 8 && password.length <= 16 && password === confirm_password)
      RegisterAPI(reqPara).then((msg) => msg !== undefined && setMessage(msg));
  };

  console.log('Comming to Sign-Up page');

  let navigate = useNavigate();

  React.useEffect(() => {
    if (password.length !== 0 && confirm_password.length !== 0 && password !== confirm_password)
      setPasswordMsg('block');
    else setPasswordMsg('none');

    if ((password.length !== 0 && password.length < 8) || password.length > 16)
      setInvalidPassword('block');
    else setInvalidPassword('none');
  }, [password, confirm_password]);

  React.useEffect(() => {
    if (message !== undefined && message !== '' && message !== 'success') setError('block');
    else setError('none');
  }, [handleSubmit]);

  React.useEffect(() => {
    message === 'success' && navigate(AuthenticationPaths.SignIn);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} display="none">
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6} display="none">
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} display={invalidPassword}>
              <Alert severity="error">Password length must be between 8-16 for security</Alert>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password_confirm"
                label="Re-enter Password"
                type="password"
                id="password_confirm"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} display={passwordMsg}>
              <Alert severity="error">Invalid password! Please double check!</Alert>
            </Grid>
            <Grid item xs={12} display={error}>
              <Alert severity="error">{message}</Alert>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                underline="hover"
                component={RouterLink}
                to={AuthenticationPaths.SignIn}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
