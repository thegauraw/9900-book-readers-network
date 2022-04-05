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
  Paper,
  OutlinedInput,
} from '@mui/material';
import { deepOrange, deepPurple, blue } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManIcon from '@mui/icons-material/Man';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { Appctx } from '../utils/LocalContext';
import { getReader, updateReaderProfile } from '../services/ReaderAPIs';

export default function ProfilePage() {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState(18);
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [isResetPassword, setIsResetPaasword] = React.useState(false);

  const context = React.useContext(Appctx);
  const { token } = context;

  console.log('editing profile: ', isEditing);
  const handleSubmit = () => {
    const reqData = {
      gender: gender,
      age: age,
      token: token,
      password: password,
    };

    updateReaderProfile(reqData).then((msg) => console.log(msg));
    setIsEditing(false);
    setIsResetPaasword(false);
  };

  React.useEffect(() => {
    getReader({ token }).then((data) => {
      const payload = data.payload;
      setEmail(payload.email);
      setUsername(payload.username);
      setGender(payload.gender);
      setAge(payload.age);
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box sx={{ mt: 10 }}>
          <Typography component="h6" variant="h6">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <AccountCircleIcon />
                Username
              </Grid>
              <Grid item xs={6}>
                {' '}
                {username}
              </Grid>
              <Grid item xs={6}>
                <EmailIcon /> Email
              </Grid>
              <Grid item xs={6}>
                {email}
              </Grid>
              <Grid item xs={6}>
                <ManIcon /> Gender
              </Grid>
              <Grid item xs={6}>
                {!isEditing ? (
                  <>{gender}</>
                ) : (
                  <>
                    <OutlinedInput
                      id="gender"
                      disabled={!isEditing}
                      defaultValue={gender}
                      fullWidth={false}
                      multiline
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                <EmojiFoodBeverageIcon /> Age
              </Grid>
              <Grid item xs={6}>
                {!isEditing ? (
                  <>{age}</>
                ) : (
                  <>
                    <OutlinedInput
                      id="age"
                      disabled={!isEditing}
                      defaultValue={age}
                      fullWidth={false}
                      multiline
                      onChange={(e) => {
                        console.log('current age: ', e.target.value);
                        setAge(Number(e.target.value));
                      }}
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                <LocationOnIcon /> Location
              </Grid>
              <Grid item xs={6}>
                Sydney
              </Grid>
              {isEditing ? (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}

              {isResetPassword ? (
                [
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
                  />,
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => {
                      if (password.length < 8 || password.length > 16)
                        alert('Password length must be between 8-16 for security');
                      else {
                        handleSubmit();
                      }
                    }}
                  >
                    Submit
                  </Button>,
                ]
              ) : (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => setIsResetPaasword(true)}
                >
                  Reset Password
                </Button>
              )}
            </Grid>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
