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
import { updateReaderPassword } from '../services/readerAPIs';
import { AuthenticationPaths, NavMenuList } from '../config/paths';

function PasswordResetPage() {
  const [error, setError] = React.useState('none');
  const [passwordMsg, setPasswordMsg] = React.useState('Invalid password! Please double check!');
  const [invalidPassword, setInvalidPassword] = React.useState('none');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('password and password Confirm', password, passwordConfirm);

    // const token = props.match.params.token;
    let url = document.location.href;
    let arr = url.split('/');
    const token = arr[arr.length - 1];
    console.log('token ', token);

    if (password === passwordConfirm && password.length >= 8 && password.length <= 16) {
      const reqPara = {
        password: password,
        token: token,
      };
      updateReaderPassword(reqPara).then((msg) => {
        setPasswordMsg(msg);
        msg !== '' && setError('block');
        msg === 'success' && navigate(AuthenticationPaths.SignIn);
      });
    }
  };

  React.useEffect(() => {
    if (password.length !== 0 && (password.length < 8 || password.length > 16))
      setInvalidPassword('block');
    else setInvalidPassword('none');
    if (password.length !== 0 && passwordConfirm.length !== 0 && password !== passwordConfirm) {
      setError('block');
    } else setError('none');
  }, [password, passwordConfirm]);

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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password_confirm"
            type="password"
            label="Password Confirm"
            name="password_confirm"
            autoComplete="password_confirm"
            autoFocus
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Grid item xs={12} display={invalidPassword}>
            <Alert severity="error">Password length must be between 8-16 for security</Alert>
          </Grid>
          <Grid item xs={12} display={error}>
            <Alert severity="error">{passwordMsg}</Alert>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default PasswordResetPage;
